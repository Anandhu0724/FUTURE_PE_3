import express from "express";
import path from "path";
import dns from "dns";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load local environment variables if development, allowing overrides (like our written .env)
dotenv.config({ override: true });

// Ensure DNS doesn't map localhost to 127.0.0.1 in a weird way
dns.setDefaultResultOrder?.("ipv4first");

const app = express();
app.use(express.json({ limit: "15mb" }));

const PORT = 3000;

// Initialize GoogleGenAI SDK on server-side
let aiClient: GoogleGenAI | null = null;
let activeApiKey: string | null = null;

function getAiClient(): GoogleGenAI {
  // prioritize the user's provided key specifically to bypass rate-limiting and quota errors
  const currentKey = process.env.GEMINI_API_KEY || "";
  if (!aiClient || activeApiKey !== currentKey) {
    activeApiKey = currentKey;
    aiClient = new GoogleGenAI({
      apiKey: currentKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Resilient API Call Helper with retries and progressive model fallbacks
async function generateContentWithRetry(params: {
  contents: any;
  config: any;
}) {
  const modelsToTry = [
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
  ];
  
  let lastError: any = null;
  const ai = getAiClient();
  
  for (const model of modelsToTry) {
    let retries = 2; // Try up to 2 times per model
    while (retries >= 0) {
      try {
        console.log(`[Gemini API] Requesting model: ${model} (${retries} attempts remaining before model shift)`);
        const response = await ai.models.generateContent({
          model: model,
          contents: params.contents,
          config: params.config,
        });
        
        if (response && response.text) {
          return response;
        }
        throw new Error("Empty response from model");
      } catch (err: any) {
        lastError = err;
        
        // Extract status / error codes cleanly
        const statusVal = err?.status || err?.code || (err as any)?.statusCode;
        const errStr = String(err?.message || err);
        let errMsg = "";
        try {
          errMsg = typeof err === "object" && err ? JSON.stringify(err) : String(err);
        } catch (_) {
          errMsg = errStr;
        }
        
        const isQuotaOrTemporary = 
          statusVal === 429 || 
          statusVal === 503 || 
          errStr.includes("429") || 
          errStr.includes("503") || 
          errStr.includes("RESOURCE_EXHAUSTED") || 
          errStr.includes("UNAVAILABLE") ||
          errMsg.includes("429") ||
          errMsg.includes("503") ||
          errMsg.includes("RESOURCE_EXHAUSTED") ||
          errMsg.includes("UNAVAILABLE");
        
        if (isQuotaOrTemporary && retries > 0) {
          const delay = (3 - retries) * 1500;
          console.log(`[Gemini API] Received temporary status ${statusVal || 'code'}. Retrying attempt in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          retries--;
        } else {
          console.log(`[Gemini API] Shift to next available model from ${model} due to exhaustion or non-retryable response`);
          break; // Fallback to next model
        }
      }
    }
  }
  
  console.error("[Gemini API Fatal] All configured model attempts and fallback paths were completely exhausted.", lastError);
  throw lastError || new Error("Failed to generate content with fallback models");
}

// 1. Generate SEO Strategy Schema
const StrategyResponseSchema = {
  type: Type.OBJECT,
  properties: {
    pillar: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "Highly engaging title of the Core Pillar Page." },
        primaryKeyword: { type: Type.STRING, description: "High-volume, highly relevant general keyword targeting the user niche." },
        searchIntent: { type: Type.STRING, description: "Explanation of Search Intent (e.g. Informational + Commercial Investigation)." },
        secondaryKeywords: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "4-5 closely related semantic LSI keywords."
        },
        briefSummary: { type: Type.STRING, description: "Detailed strategy scope for this core page." }
      },
      required: ["title", "primaryKeyword", "searchIntent", "secondaryKeywords", "briefSummary"]
    },
    clusters: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "Short alphanumeric slug like 'cluster-1'." },
          title: { type: Type.STRING, description: "Catchy blog title satisfying support-level query." },
          primaryKeyword: { type: Type.STRING, description: "Specific long-tail search query." },
          searchIntent: { type: Type.STRING, description: "Intent categorization: Informational, Transactional, Local etc." },
          secondaryKeywords: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          briefSummary: { type: Type.STRING, description: "What subtopic area this post covers to build Topical Authority." },
          internalLinkingAngle: { type: Type.STRING, description: "Natural contextual way to link to / from the core pillar page." }
        },
        required: ["id", "title", "primaryKeyword", "searchIntent", "secondaryKeywords", "briefSummary", "internalLinkingAngle"]
      },
      description: "4 to 6 supporting educational or commercial subtopics."
    },
    localPlanning: {
      type: Type.OBJECT,
      properties: {
        isLocal: { type: Type.BOOLEAN, description: "True if location was provided and local SEO applied." },
        location: { type: Type.STRING },
        localAngleExplanation: { type: Type.STRING, description: "How local landmarks, citations, or community elements were integrated." }
      },
      required: ["isLocal", "location", "localAngleExplanation"]
    }
  },
  required: ["pillar", "clusters", "localPlanning"]
};

// 2. Generate Fully Written Article Schema
const ArticleResponseSchema = {
  type: Type.OBJECT,
  properties: {
    metadata: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        primaryKeyword: { type: Type.STRING },
        searchIntent: { type: Type.STRING },
        secondaryKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
        targetAudience: { type: Type.STRING },
        localOptimizationNotes: { type: Type.STRING }
      },
      required: ["title", "primaryKeyword", "searchIntent", "secondaryKeywords", "targetAudience"]
    },
    outline: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          heading: { type: Type.STRING, description: "Heading standard with tag like 'H2: Understanding X'." },
          points: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["heading", "points"]
      }
    },
    contentMarkdown: {
      type: Type.STRING,
      description: "The complete written blog post content in highly styled GitHub Flavored Markdown (including H1, H2, H3, paragraphs, checklist, tables, bold text). Must be rich, long-form (~1000 words), human-sounding, addressing Experience, Expertise, Authoritativeness, and Trust (EEAT) metrics. Write beautifully without robotic formulas!"
    },
    internalLinkingSuggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          sourceTextContext: { type: Type.STRING, description: "The sentence or anchor phrase in the post to attach the link." },
          recommendedAnchor: { type: Type.STRING, description: "Pristine anchor text to use for link hygiene." },
          targetPageDescription: { type: Type.STRING, description: "Where is this linking to (e.g. Core Pillar or specific subtopic)." }
        },
        required: ["sourceTextContext", "recommendedAnchor", "targetPageDescription"]
      }
    },
    ctaRecommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, description: "E.g., Lead Magnet, Appointment Booking, Newsletter." },
          text: { type: Type.STRING, description: "Copy of the CTA button." },
          placement: { type: Type.STRING, description: "Where in the blog to stick it (e.g., introduction, mid-point, final hook)." }
        },
        required: ["type", "text", "placement"]
      }
    },
    eeatJustification: {
      type: Type.STRING,
      description: "Brief reasoning of how experience signs, expert quotes/logic, authoritative guidelines, and trust signals are embedded."
    }
  },
  required: ["metadata", "outline", "contentMarkdown", "internalLinkingSuggestions", "ctaRecommendations", "eeatJustification"]
};

// 3. Optimize Text Schema
const OptimizeResponseSchema = {
  type: Type.OBJECT,
  properties: {
    originalIntentMatching: { type: Type.STRING, description: "Assessment of how well original draft satisfies the specified Search Intent." },
    readabilityScore: { type: Type.STRING, description: "Grade of readability (e.g. Conversational, High Expert, Academic, Clear Secondary School)." },
    analyzedKeywords: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          keyword: { type: Type.STRING },
          frequency: { type: Type.INTEGER },
          status: { type: Type.STRING, description: "Under-used, optimal density, or stuffed (>3.5%)." }
        },
        required: ["keyword", "frequency", "status"]
      }
    },
    structuralIssues: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of H1, H2 violations, missing paragraphs, or poor headings."
    },
    semanticSuggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Suggested high-value contextually-related words to weave in."
    },
    optimizedContentMarkdown: { type: Type.STRING, description: "A beautifully restructured edition of the draft solving the problems, maintaining true human flavor." },
    nextSteps: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lead generation or schema markup suggestions." }
  },
  required: ["originalIntentMatching", "readabilityScore", "analyzedKeywords", "structuralIssues", "semanticSuggestions", "optimizedContentMarkdown", "nextSteps"]
};

// 4. Generate Local SEO Playbook Schema (For GrowthSpark / Local SEO Experts)
const LocalPlaybookResponseSchema = {
  type: Type.OBJECT,
  properties: {
    businessName: { type: Type.STRING },
    location: { type: Type.STRING },
    service: { type: Type.STRING },
    nearbyAreas: { type: Type.ARRAY, items: { type: Type.STRING } },
    keywordOpportunities: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          keyword: { type: Type.STRING },
          intent: { type: Type.STRING },
          volume: { type: Type.STRING },
          relevance: { type: Type.STRING }
        },
        required: ["keyword", "intent", "volume", "relevance"]
      }
    },
    landingPageOutline: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          sectionTitle: { type: Type.STRING },
          contentBrief: { type: Type.STRING },
          keywordsToTarget: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["sectionTitle", "contentBrief", "keywordsToTarget"]
      }
    },
    googleBusinessProfileSuggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    schemaMarkup: { type: Type.STRING, description: "Formatted JSON-LD string wrapped nicely representing the LocalBusiness schema config." },
    localFAQs: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          answer: { type: Type.STRING }
        },
        required: ["question", "answer"]
      }
    },
    hyperlocalKeywords: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          neighborhood: { type: Type.STRING },
          keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["neighborhood", "keywords"]
      }
    }
  },
  required: [
    "businessName",
    "location",
    "service",
    "nearbyAreas",
    "keywordOpportunities",
    "landingPageOutline",
    "googleBusinessProfileSuggestions",
    "schemaMarkup",
    "localFAQs",
    "hyperlocalKeywords"
  ]
};

// 5. Generate SEO Metadata Schema
const MetadataResponseSchema = {
  type: Type.OBJECT,
  properties: {
    topic: { type: Type.STRING },
    titles: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Engaging SEO Title complying with length rules and CTR modifiers." },
          length: { type: Type.INTEGER },
          reasonForCtr: { type: Type.STRING }
        },
        required: ["title", "length", "reasonForCtr"]
      }
    },
    metaDescriptions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          description: { type: Type.STRING, description: "120-160 characters description with an option for a Call to Action (CTA)." },
          length: { type: Type.INTEGER },
          reasonForCtr: { type: Type.STRING }
        },
        required: ["description", "length", "reasonForCtr"]
      }
    },
    urlSlugs: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    openGraphTitles: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    openGraphDescriptions: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
  },
  required: [
    "topic",
    "titles",
    "metaDescriptions",
    "urlSlugs",
    "openGraphTitles",
    "openGraphDescriptions"
  ]
};

// HEALTH CHECK
app.get("/api/health", (req, res) => {
  const currentKey = process.env.GEMINI_API_KEY || "";
  res.json({ status: "ok", sdk: "google-genai", keyAvailable: !!currentKey });
});

// ENDPOINT -1: GENERATE SEO METADATA DYNAMICALLY
app.post("/api/generate-metadata", async (req, res) => {
  try {
    const { topic } = req.body;
    
    if (!topic) {
      return res.status(400).json({ error: "Missing required topic field." });
    }

    const ai = getAiClient();

    const systemPrompt = `You are a Senior SEO Strategy Consultant and CTR (Click-Through Rate) optimization expert.
Your goal is to generate high-performance SEO metadata for the specified topic.
You must output:
1. 10 SEO Titles that target major search queries, adhere strictly to length guidelines (50-60 characters ideal), use power verbs, and leverage Google CTR modifiers (e.g. bracketed tags, numbers, current years like 2026, or trust markers).
2. 10 Meta Descriptions with 120-160 characters, containing a highly compelling active voice with an actionable CTA or search relevance marker.
3. 5 URL Slugs: clean, lowercase, semantic, hyphen-separated, and highly optimized for keyword density without spamming.
4. 5 Open Graph (OG) Titles: conversational, intriguing, and share-optimized (e.g., for Facebook/LinkedIn/Twitter).
5. 5 Open Graph (OG) Descriptions: social media hooks that capture reader interest instantly.

Adhere strictly to Google CTR best practices. Provide the target response in JSON format.`;

    const promptText = `Generate custom high-performance SEO metadata for this topic:
Topic: ${topic}

Please ensure that you create exactly:
- 10 distinct, highly clickable, and professional SEO Titles (ideal length 55-60 chars).
- 10 complementary, persuasive Meta Descriptions (ideal length 130-155 chars).
- 5 clean URL Slugs.
- 5 highly engaging Open Graph Titles.
- 5 Open Graph Descriptions.

Keep the tone expert, clean, and commercial yet helpful. Ensure maximum local relevant terms if the topic is geography-focused.`;

    const response = await generateContentWithRetry({
      contents: promptText,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: MetadataResponseSchema,
        temperature: 0.7,
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response generated from Gemini API.");
    }
    const data = JSON.parse(resultText);

    res.json({ success: true, metadata: data });
  } catch (error: any) {
    console.error("SEO Metadata generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate SEO Metadata." });
  }
});

// ENDPOINT 0: GENERATE LOCAL SEO PLAYBOOK DYNAMICALLY
app.post("/api/generate-local-playbook", async (req, res) => {
  try {
    const { businessName, location, service, nearbyAreas } = req.body;
    
    if (!businessName || !location || !service) {
      return res.status(400).json({ error: "Missing required businessName, location, or service fields." });
    }

    const ai = getAiClient();
    const areasStr = Array.isArray(nearbyAreas) ? nearbyAreas.join(", ") : "Kochi, Ernakulam";

    const systemPrompt = `You are a Local SEO Expert and Veteran SEO Strategist focusing on regional geographic dominance.
Your goal is to build an exhaustive, elite-class Local SEO Playbook containing:
1. Location-specific keyword opportunities (with Search Intent, Est. Vol, Relevance).
2. Local landing page content outline (including key sections, briefs, targeted keywords).
3. Google Business Profile (GBP) optimization suggestions.
4. Local Schema Markup recommendation (complete valid JSON-LD structure).
5. FAQ content for local searches.
6. Hyperlocal keyword ideas (targeting specific neighborhoods/landmark regions of the specified area).

For location ${location} and nearby areas like ${areasStr}, deliver high-EEAT localized value with references to real district structures, landmarks, and high-intent local services search queries. Return this in strict JSON format.`;

    const promptText = `Generate a high-performance Local SEO Playbook with these inputs:
Business: ${businessName}
Location: ${location}
Service: ${service}
Nearby Areas to Target: ${areasStr}

Please create local keywords, landing page structures, and optimize the Google Business Profile parameters beautifully. Use actual landmarks and regions present in ${location} and ${areasStr} to make it incredibly authentic.`;

    const response = await generateContentWithRetry({
      contents: promptText,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: LocalPlaybookResponseSchema,
        temperature: 0.7,
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response generated from Gemini API.");
    }
    const data = JSON.parse(resultText);

    res.json({ success: true, playbook: data });
  } catch (error: any) {
    console.error("Local playbook generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate Local SEO Playbook." });
  }
});

// ENDPOINT 1: PLAN TOPICAL AUTHORITY PILLAR-CLUSTER STRATEGY
app.post("/api/generate-strategy", async (req, res) => {
  try {
    const { businessName, niche, targetAudience, coreOfferings, city, targetIntentFocus } = req.body;

    if (!niche || !coreOfferings) {
      return res.status(400).json({ error: "Missing required niche or coreOfferings parameters." });
    }

    const ai = getAiClient();
    const isLocal = !!city && city.trim().length > 0;

    const systemPrompt = `You are a Senior SEO Strategist and Content Marketing Consultant specializing in building comprehensive pillar-cluster seo architectures.
Your goal is to turn a business's description into a highly structured topical authority map.
Create one central core "Pillar" page concept and 5 supporting "Cluster" subtopic concepts that satisfy topical coverage of the depth.

Rules:
1. Prioritize Search Intent (Informational vs. Commercial Investigation vs. Local vs. Transactional).
2. Use Topical Authority Principles: Cover the broad topic comprehensively on the Pillar page, then build specific long-tail posts that deep dive into details.
3. Incorporate local search accents if local SEO context (a city) is specified.
4. Output must match the specified JSON schema exactly.`;

    const promptText = `Generate a Pillar-Cluster Strategy for this business:
Business Name: ${businessName || "Generic Business"}
Primary Niche/Industry: ${niche}
Core Services/Offerings: ${coreOfferings}
Target Audience: ${targetAudience || "General buyers looking for expert service"}
Primary Search Intent Accent: ${targetIntentFocus || "Mixed Informational & Commercial"}
Local SEO City: ${isLocal ? city : "None (National/Global SEO)"}

Map out the core pillar query and the supporting clusters. Target high search volume concepts but frame them with true EEAT value.`;

    const response = await generateContentWithRetry({
      contents: promptText,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: StrategyResponseSchema,
        temperature: 0.7,
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response generated from Gemini API.");
    }
    const data = JSON.parse(resultText);

    res.json({ success: true, strategy: data });
  } catch (error: any) {
    console.error("Strategy generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate SEO strategy." });
  }
});


// ENDPOINT 2: WRITE SEO-OPTIMIZED, EEAT支持 SUPPORTING BLOG OR PILLAR PAGE
app.post("/api/generate-article", async (req, res) => {
  try {
    const {
      topicTitle,
      primaryKeyword,
      secondaryKeywords,
      searchIntent,
      businessContext,
      city,
      tonePreset,
      isPillar,
      briefSummary
    } = req.body;

    if (!topicTitle || !primaryKeyword) {
      return res.status(400).json({ error: "Missing article title or primaryKeyword." });
    }

    const ai = getAiClient();
    const localContextStr = city ? `This article must be heavily customized for local SEO in the city of ${city}. Naturally invoke neighborhood names, climate/regional factors, local regulations, community vibe, and geographical landmarks where logical to drive local user trust. Do not make it sound spammy.` : "This is a general, nationwide or global SEO topic.";

    const systemPrompt = `You are a veteran Senior SEO Strategist and Award-Winning Content Creator specializing in building high-EEAT (Experience, Expertise, Authoritativeness, Trustworthiness) blog articles.
You write in a professional, highly readable, engaging, and conversational tone that bridges high-expert knowledge with understandable human advice.

Strict Rules:
1. Always prioritize search intent: write the draft to satisfy the specific Search Intent of '${searchIntent}'.
2. Write in a clear, semantic hierarchy using elegant headers (H1 for title, nested H2s, H3s) naturally.
3. Natural Semantic weaving: Weave in the primary keyword and secondary keywords fluidly, never stuffing (suggested density is around 1-1.5% naturally).
4. Build Real Lead-Boosting Trust: Proactively suggest CTA buttons that solve query friction (e.g. download list, quick pricing calculator, consultation request).
5. Suggest internal links: Map out precise internal link locations where the reader will naturally benefit from other reading material (and anchor text).
6. Local depth: If a local city is specified, leverage true regional knowledge to build intense local relevance.
7. Length: The written markdown body should be a thorough, comprehensive blueprint (~800 to 1200 words), avoiding empty paragraphs. Deliver deep value first.

Output must be returned strictly in the specified JSON schema format.`;

    const promptText = `Please draft an incredible article/page based on this input parameters:
Title Idea: ${topicTitle}
Is this the core Pillar Page? ${isPillar ? "Yes (needs massive comprehensive overview scope)" : "No, this is a supporting Cluster Article"}
Primary Target Keyword: ${primaryKeyword}
Secondary Keywords: ${Array.isArray(secondaryKeywords) ? secondaryKeywords.join(", ") : "SEO, high quality content"}
Focus Search Intent: ${searchIntent || "Informational"}
Summary of Topic Scope: ${briefSummary || ""}
Tone Option: ${tonePreset || "Expert yet Warm & Conversational"}
Business Profile/Context: ${JSON.stringify(businessContext || {})}
Local SEO Target City: ${city || "None"}

Regional parameters: ${localContextStr}

Please generate the complete, fully formed text inside the "contentMarkdown" property. Do not use placeholders or summaries in the article body — write the actual real, high-quality, long-form content. Include formatting, lists, bold keywords, bold stats, or custom comparisons where they serve user trust.`;

    const response = await generateContentWithRetry({
      contents: promptText,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: ArticleResponseSchema,
        temperature: 0.7,
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No draft text produced by Gemini.");
    }
    const data = JSON.parse(resultText);

    res.json({ success: true, article: data });
  } catch (error: any) {
    console.error("Article draft generation error:", error);
    res.status(500).json({ error: error.message || "Failed to draft optimized article." });
  }
});


// ENDPOINT 3: ANALYZE AND OPTIMIZE USER WRITTEN DRAFT LIVE
app.post("/api/optimize-text", async (req, res) => {
  try {
    const { userText, targetKeywords, focusIntent, city } = req.body;

    if (!userText || userText.trim().length === 0) {
      return res.status(400).json({ error: "Missing content text to analyze." });
    }

    const ai = getAiClient();

    const systemPrompt = `You are an elite SEO Content Auditor and Link-Building Strategist.
Analyze user-submitted text against focus target keywords, search intent, and structural standards.
Calculate keyword frequencies, identify poor heading hierarchies (missing H2/H3s), detect key-stuffing, verify readability tone, and generate an beautifully optimized humanized Markdown rewrite of their text that integrates target keywords and LSI helpers beautifully.

Ensure the output conforms exactly to the JSON response schema.`;

    const promptText = `Analyze and optimize the following content:
Original Text:
---
${userText}
---
Target Primary & Secondary Keywords: ${Array.isArray(targetKeywords) ? targetKeywords.join(", ") : (targetKeywords || "Not specified")}
Desired Search Intent: ${focusIntent || "Informational/Commercial"}
Target Local City Context: ${city || "None"}

Please evaluate structural issues, keyword count, readability tone, semantic keywords to enrich, and deliver the complete polished Markdown file inside the "optimizedContentMarkdown" field. Be constructive, helpful, and highly detailed.`;

    const response = await generateContentWithRetry({
      contents: promptText,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: OptimizeResponseSchema,
        temperature: 0.6,
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response from Content Auditor.");
    }
    const data = JSON.parse(resultText);

    res.json({ success: true, optimized: data });
  } catch (error: any) {
    console.error("Content optimization error:", error);
    res.status(500).json({ error: error.message || "Failed to audit and optimize post." });
  }
});


// FRONTEND EMBEDDING AND DEV VITE ENGINE SERVER

if (!process.env.VERCEL) {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    import("vite").then(async (Vite) => {
      const vite = await Vite.createServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    }).catch((err) => {
      console.error("Vite server initialization error:", err);
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Start Server strictly on port 3000
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SEO Content Architect] Server is listening on http://0.0.0.0:${PORT}`);
  });
}

export default app;
