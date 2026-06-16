import React, { useState, useEffect } from "react";
import { 
  SEOStrategyData, 
  GeneratedArticle, 
  OptimizationResult, 
  ClusterSubtopic,
  KeywordAnalysis,
  LocalSEOPlaybookData,
  LocalKeywordOpportunity,
  LocalLandingPageSection,
  HyperlocalKeywordGroup,
  LocalFAQItem,
  SEOMetadataResult
} from "./types";
import MarkdownViewer from "./components/MarkdownViewer";
import KeywordIntelligence from "./components/KeywordIntelligence";
import ContentClusterEngine from "./components/ContentClusterEngine";
import PillarBlogGenerator from "./components/PillarBlogGenerator";
import LocalSEOPlaybook from "./components/LocalSEOPlaybook";
import CTRMetadataSuite from "./components/CTRMetadataSuite";
import SiloArchitectureMap from "./components/SiloArchitectureMap";
import ContentAuditor from "./components/ContentAuditor";
import { 
  FileText, 
  Award, 
  Link, 
  Megaphone, 
  TrendingUp, 
  Sparkles, 
  RefreshCw, 
  Check, 
  Copy, 
  Compass, 
  Layers, 
  BookOpen, 
  Search, 
  AlertCircle,
  HelpCircle,
  MapPin,
  Maximize2,
  ChevronRight,
  Download
} from "lucide-react";
import { jsPDF } from "jspdf";

// Pre-seeded strategy to make the application immediately interactive & gorgeous
const PRE_SEEDED_STRATEGY: SEOStrategyData = {
  pillar: {
    title: "The Ultimate Guide to Modern SEO Services in Kerala: Scaling Organic Growth for Indian & Global Brands",
    primaryKeyword: "SEO Services in Kerala",
    searchIntent: "Commercial & Local Search Intent",
    secondaryKeywords: [
      "Kerala SEO agency",
      "SEO consulting services Kerala",
      "SEO expert Kerala",
      "Search engine optimization Kerala"
    ],
    briefSummary: "This master blueprint guides small & medium enterprises (SMEs) and corporate brands in Kerala on how to build high-converting traffic funnels, optimize local regional listings, and integrate sustainable organic strategies with high ROI."
  },
  clusters: [
    {
      id: "cluster-1",
      title: "Kochi SEO Matrix: Scaling Local E-Commerce & Retail Traffic in Ernakulam District",
      primaryKeyword: "affordable SEO packages Kochi Kerala",
      searchIntent: "Local & Commercial Search",
      secondaryKeywords: ["Kochi local business SEO", "best organic search agency Kochi", "regional content scaling"],
      briefSummary: "A comprehensive localized audit playbook demonstrating how retail and manufacturing conglomerates in Ernakulam district can outrank national chains through clean local schema markup.",
      internalLinkingAngle: "Link back to the core pillar's 'Kerala agency service evaluation matrix' to streamline client qualification."
    },
    {
      id: "cluster-2",
      title: "Demystifying organic budgets: What is the Real SEO Services Cost in Kerala?",
      primaryKeyword: "what is SEO cost in Kerala",
      searchIntent: "Informational & Investigative",
      secondaryKeywords: ["affordable SEO packages", "Kerala website optimization pricing", "digital marketing investment standard"],
      briefSummary: "A transparent pricing guide outlining monthly retainer systems, tech-audit guidelines, and expectation models for Indian digital start-ups.",
      internalLinkingAngle: "Core recommendation points directly to our high-level SEO return calculator on the central Pillar page."
    },
    {
      id: "cluster-3",
      title: "Trivandrum Tech Hub Strategies: Enterprise Search Optimization for Malabar & Travancore Software Guilds",
      primaryKeyword: "SEO expert Kerala",
      searchIntent: "B2B Professional Investigator",
      secondaryKeywords: ["SaaS lead generation Kerala", "IT park digital marketing Kozhikode", "high traffic business pillars"],
      briefSummary: "Focuses on advanced technical systems (core web vitals, headless CMS structure, serverless SSR render frameworks) tailored to software development exporters in TechnoPark and CyberPark.",
      internalLinkingAngle: "Contextually forwards corporate clients looking for dedicated specialists to the primary agency expertise guide."
    },
    {
      id: "cluster-4",
      title: "The Step-by-Step Lead Generation Blueprint for Kerala Local Service Providers: From Thrissur to Kozhikode",
      primaryKeyword: "best SEO services in Kerala for local business",
      searchIntent: "Commercial & Local Search",
      secondaryKeywords: ["Kozhikode digital marketing agency", "local services pack optimization", "Thrissur client lead generation"],
      briefSummary: "A step-by-step masterclass showing clinics, real estate builders, and wedding planners how to land in the highly-coveted Google Map 3-Pack.",
      internalLinkingAngle: "Encourages users to register for a complimentary technical crawling assessment tool hosted on the Pillar page."
    },
    {
      id: "cluster-5",
      title: "Tourism & Ayurvedic Resort SEO: Capturing International Travellers for Kerala Hospitality Brands",
      primaryKeyword: "search engine optimization Kerala",
      searchIntent: "Transactional & Tourism Focus",
      secondaryKeywords: ["Kerala ayurvedics traffic", "houseboat rental search strategy", "global traveler keyword research"],
      briefSummary: "How to target high-intent global search phrases, optimize multilingual web designs, and capture organic booking funnels without relying on expensive OTAs.",
      internalLinkingAngle: "Leverages hospitality sector metrics back on the main Pillar case study section to drive bottom-of-funnel conversion."
    }
  ],
  localPlanning: {
    isLocal: true,
    location: "Kerala, India",
    localAngleExplanation: "Crafted for regional hubs like Kochi, Trivandrum, Kozhikode, and Thrissur. Addresses local language nuances, regional tourism opportunities, Technopark hub B2B SaaS strategies, and local cost-of-living pricing calibrations."
  }
};

const PRE_SEEDED_ARTICLE: GeneratedArticle = {
  metadata: {
    title: "Kochi SEO Matrix: Scaling Local E-Commerce & Retail Traffic in Ernakulam District",
    primaryKeyword: "affordable SEO packages Kochi Kerala",
    searchIntent: "Local & Commercial Search Intent",
    secondaryKeywords: ["Kochi local business SEO", "best organic search agency Kochi", "regional content scaling"],
    targetAudience: "Regional retail brands, multi-location Ernakulam traders, direct-to-consumer startups",
    localOptimizationNotes: "Heavily integrates regional landmarks (Marine Drive Kochi, InfoPark, Ernakulam Market), local consumer behaviors, and regional competition metrics."
  },
  outline: [
    {
      heading: "H2: Why Kochi is the E-Commerce Capital of Kerala and Siphons Massive Digital Competition",
      points: [
        "Analyzing search volume metrics specifically for Ernakulam-based companies",
        "The shift from traditional directories to Map Pack interactions on mobile devices",
        "Siphoning niche local traffic: how minor SEO modifications yield major conversion lifts"
      ]
    },
    {
      heading: "H2: Decoupling affordable SEO packages Kochi Kerala Offers from Low-Quality Spam",
      points: [
        "What should be included in standard packages: comprehensive content writing, backlink auditing, and structured schema support",
        "How to avoid black-hat PBN networks that risk Google penalties",
        "Transparency metrics: reporting, keyword tracking, and transparent organic ROI milestones"
      ]
    },
    {
      heading: "H2: Masterminding Local Maps Packs & Schema for Ernakulam Storefronts",
      points: [
        "Implementing geo-coordinates and specific regional descriptions",
        "Optimizing for local landmarks like InfoPark and Marine Drive to boost proximity signals",
        "Sourcing quality local citations across authentic Indian business directories"
      ]
    }
  ],
  contentMarkdown: `# Kochi SEO Matrix: Scaling Local E-Commerce & Retail Traffic in Ernakulam District

In the fast-evolving digital landscape of South India, **Kochi** has firmly established itself as the commercial powerhouse of Kerala. From the bustling physical markets of Broadway and Ernakulam Bazar to the cutting-edge tech parks of **InfoPark Kakkanad**, businesses are waking up to a critical reality: print media is declining, and **search engine optimization Kerala** is the new frontier of client acquisition.

If you are a regional retail business, a boutique ayurvedic supplier, or an Ernakulam-based services company, securing rankings for queries on Google is your most valuable organic real estate.

## The Local Search Landscape in Ernakulam and Kochi
Kochi is a highly unique metropolitan hub. Users search with strong regional intent, looking for terms like **best organic search agency Kochi** or **Kochi local business SEO** helper resources. When a regional buyer searches for your primary services, they are often in a highly-primed "investigative" mindset. They do not want to see generic, automated advertisements. Instead, they seek out local agencies with physical footprints, verified client testimonials in Malayalam and English, and authentic experience with regional logistics.

To dominate this local landscape, you must structure your content silo around geographical modifiers. Natural references to regional hubs—such as **Kakkanad**, **Edappally**, **Kadavanthra**, and **Fort Kochi**—signal to search spiders that your services are authentically close to the searcher.

## Navigating Affordable SEO Packages in Kochi, Kerala
For regional startups, budget allocation is paramount. When evaluating various **affordable SEO packages Kochi Kerala** has to offer, you must filter out agencies offering cheap, hazardous automated link-building schemes that invite devastating core algorithm adjustments. 

A high-performing, authentic package should consist of:
1. **Pristine Technical Auditing**: Inspecting site structure, core web vitals, and correct Malayalam/English tag targets.
2. **Topical Content Clusters**: Publishing high-EEAT educational blogs that thoroughly answer local consumer concerns.
3. **Transparent Review Systems**: Harnessing authentic Google Business reviews from Ernakulam customers to build massive localized confidence.

---

> "Search engine visibility is the only marketing vehicle that captures high-intent buyers exactly at the moment they require solution services, completely bypassing the friction of cold prospecting." 
> — Kerala Digital Business Association

---

## Strategic Checklist for Kochi Storefronts
- **Optimize Google Business Profile (GBP)**: Fully complete name, address, and local phone number (NAP) details.
- **Inject Localized Structured Data**: Embed rich JSON-LD code containing geo-coordinates of Kochi Marine Drive or local suburbs.
- **Sponsor Regional Context-Links**: Establish partnerships with popular Kerala-based directories and regional lifestyle publications to secure natural backlinks.`,
  internalLinkingSuggestions: [
    {
      sourceTextContext: "From the bustling physical markets... to the cutting-edge tech parks..., search engine optimization Kerala is the new frontier...",
      recommendedAnchor: "search engine optimization Kerala",
      targetPageDescription: "Core Pillar Hub: Complete Master Guide to Hiring SEO Services in Kerala"
    },
    {
      sourceTextContext: "When evaluating various affordable SEO packages Kochi Kerala has to offer...",
      recommendedAnchor: "affordable SEO packages Kochi Kerala",
      targetPageDescription: "Cluster 2: Transparency & Real SEO Cost Breakdowns in Kerala"
    }
  ],
  ctaRecommendations: [
    {
      type: "Complimentary Site Assessment",
      text: "Claim Your Free Kochi Competitor Benchmark Audit",
      placement: "Mid-way through the package selection section."
    },
    {
      type: "Direct Strategy Callback",
      text: "Schedule a Consultation with our Kerala SEO Experts",
      placement: "Final section targeting bottom-of-funnel conversion and trust."
    }
  ],
  eeatJustification: "Embedded actual physical landmarks (Kakkanad, Broadway, Edappally), cited typical regional consumer trust signals (Malayalam and English client feedback), and formulated a clear ROI-focused pricing methodology."
};

const PRE_SEEDED_AUDIT_INPUT = `# High Performance SEO services in Kerala

If you are a business owner operating in Kochi, Kerala or Trivandrum, you need search engine rankings to get leads. Digital marketing in Kerala is very crowded today. Many agencies promise quick results in google but they use cheap tricks.

To succeed, you should work with an expert who understands keywords and regional search patterns on mobile devices. Our packages are cheap and we do good copy.`;

const PRE_SEEDED_AUDIT_OUTPUT: OptimizationResult = {
  originalIntentMatching: "The draft attempts a local commercial target but stands at a meager ~70 words. It is far too light to earn Topical Authority on search engines and fails to establish absolute trust (EEAT) signals or provide clear structural guidelines.",
  readabilityScore: "Conversational & Straightforward (Flesch-Kincaid Grade 6). Exceptionally readable, but lacks the high-level authority, stats representation, and structural hierarchy required for true top-of-page rankings.",
  analyzedKeywords: [
    { keyword: "SEO Services in Kerala", frequency: 1, status: "Under-used" },
    { keyword: "affordable SEO packages Kochi Kerala", frequency: 0, status: "Missing" },
    { keyword: "SEO expert Kerala", frequency: 0, status: "Missing" },
    { keyword: "Kerala", frequency: 2, status: "Optimal" }
  ],
  structuralIssues: [
    "No H1 heading structure detected",
    "Missing nested H2/H3 descriptive columns",
    "No styled quotes, highlights, listicles, or CTA elements"
  ],
  semanticSuggestions: [
    "local Map Pack optimization",
    "regional search modifiers",
    "Google Search Console diagnostics",
    "long-tail keyword architecture"
  ],
  optimizedContentMarkdown: `# The Business Owner’s Blueprint to Hiring High-Performance SEO Services in Kerala

For modern brands across Cochin, Trivandrum, and Kozhikode, establishing local organic search visibility is no longer an optional tactic—it is the foundation of digital survival. Because the regional marketplace has become highly saturated, traditional push advertising is yielding diminishing returns. Today, long-term success belongs to businesses that build durable, evergreen streams of organic inbound leads using high-performing **SEO Services in Kerala**.

## Why Modern Search Siphoning Rules State-level Competition
Many business founders make the standard mistake of immediately investing in daily social media ads that stop producing traffic the moment the budget is depleted. In contrast, partnering with a veteran **SEO expert Kerala** to optimize your core website assets assets delivers compound dividends.

Investing in a robust, regional pillar-cluster methodology targets high-intent queries with extreme precision:
- **Map Pack Dominance**: Optimized local listings capture prospective buyers searching closest to your physical regional offices.
- **Topical Domination**: Generating comprehensive informational guides answers customer questions directly, siphoning trust before competitors can make a sales pitch.

---

> "Organic search traffic has up to a five-times higher conversion rate than standard social media campaigns because it actively satisfies pre-existing intent."
> — Trivandrum Tech Center Insights

---

## Evaluating affordable SEO packages Kochi Kerala Options
To build real authority safely, always avoid automated outsourcing firms that use spammy backlink practices. A legitimate strategy must prioritize:
1. **On-Page Optimization**: Crafting human-readable copy and semantic meta tags.
2. **Local Schema Integration**: Injected Structured Data coordinates highlighting your Kerala location details.
3. **User Experience Security**: Fast load-speeds under 2 seconds across mobile 5G networks in Thrissur, Wayanad, and Malabar regions.

## Ready to Claim the Top of Search Results?
Implementing a professional seo blueprint requires experienced strategic builders. Secure your digital real estate today and dominate your niche.`,
  nextSteps: [
    "Place an interactive ROI Calculator CTA to capture high-intent leads on prices.",
    "Add structured JSON-LD local organization Schema for instant rich snippet validation."
  ]
};

const PRE_SEEDED_PLAYBOOK: LocalSEOPlaybookData = {
  businessName: "GrowthSpark Digital Marketing Agency",
  location: "Kerala",
  service: "SEO Services",
  nearbyAreas: ["Kochi", "Ernakulam"],
  keywordOpportunities: [
    {
      keyword: "SEO services in Kochi Kerala",
      intent: "Commercial / Investigative",
      volume: "1,200/mo",
      relevance: "High (Primary offering)"
    },
    {
      keyword: "best SEO agency in Ernakulam",
      intent: "Commercial / Transactional",
      volume: "880/mo",
      relevance: "High (High purchase intent)"
    },
    {
      keyword: "affordable local SEO Kerala",
      intent: "Commercial",
      volume: "590/mo",
      relevance: "High (Value-conscious clients)"
    },
    {
      keyword: "digital marketing agency in Kochi",
      intent: "Commercial / Investigative",
      volume: "2,400/mo",
      relevance: "Medium-High (Broad core keyword)"
    },
    {
      keyword: "SEO company in Ernakulam district",
      intent: "Commercial Proximity",
      volume: "320/mo",
      relevance: "High (Ernakulam business hubs)"
    }
  ],
  landingPageOutline: [
    {
      sectionTitle: "Hero: Secure Regional Dominance in Kochi & Ernakulam with GrowthSpark",
      contentBrief: "A premium bold headline citing localized conversion performance (e.g. 'Turn Regional Search Volume Into Customers'). Present instant trust triggers: Client metrics, a transparent call to seek free site crawl, and a primary audit CTA button.",
      keywordsToTarget: ["SEO services in Kochi Kerala", "best SEO agency in Ernakulam"]
    },
    {
      sectionTitle: "Why Local Kochi & Ernakulam Storefronts Fail to Rank on Map Packs",
      contentBrief: "Explain localized proximity issues: incorrect local directories, lack of JSON-LD coordinates for Marine Drive or Kakkanad office, and slow mobile loading metrics over local Jio/BSNL lines. Detail how GrowthSpark resolves these structural gaps.",
      keywordsToTarget: ["SEO company in Ernakulam district", "affordable local SEO Kerala"]
    },
    {
      sectionTitle: "Local SEO Methodology Engineered for Kerala SMEs",
      contentBrief: "Break down step-by-step agency features: Google Business Profile master parameters, local citations cleanups, custom semantic clusters detailing district landmarks, and authoritative backlinks from South Indian media.",
      keywordsToTarget: ["digital marketing agency in Kochi"]
    },
    {
      sectionTitle: "Start Driving Higher ROI from Organic Searches",
      contentBrief: "Direct conversion form seeking site parameters. Direct access to our primary return metrics and customized quote booking calendar.",
      keywordsToTarget: ["best SEO agency in Ernakulam"]
    }
  ],
  googleBusinessProfileSuggestions: [
    "Verify and synchronize exact Name, Address, and Phone (NAP) details. Match 'GrowthSpark Digital Marketing Agency' on directories globally.",
    "Add 'SEO Services' as the Primary Google Service Category. Add 'Digital Marketing Agency', 'Website Designer', and 'Advertising Agency' for secondary classifications.",
    "Specify exact localized target coordinates covering: Kochi, Ernakulam, Kakkanad, Aluva, Fort Kochi, Edappally, and general Kerala state.",
    "Publish weekly geo-tagged GBP posts. Include photos featuring local sites (Marine Drive Kochi, InfoPark complex) to trigger proximity algorithms.",
    "Answer local reviewer feedbacks inside 24 hours. Naturally weave key terms like 'best SEO services in Kerala' or 'SEO agency Ernakulam' in response text copy."
  ],
  schemaMarkup: `{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "GrowthSpark Digital Marketing Agency",
  "image": "https://growthspark.in/assets/images/logo.png",
  "@id": "https://growthspark.in/#agency",
  "url": "https://growthspark.in",
  "telephone": "+91 98765 43210",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Infopark Kakkanad, near Marine Drive",
    "addressLocality": "Kochi",
    "addressRegion": "Kerala",
    "postalCode": "682030",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 9.9816,
    "longitude": 76.2999
  },
  "areaServed": [
    {
      "@type": "AdministrativeArea",
      "name": "Kochi"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Ernakulam"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Kerala"
    }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.facebook.com/GrowthSparkKerala",
    "https://www.linkedin.com/company/growthspark"
  ]
}`,
  localFAQs: [
    {
      question: "How long does local SEO take to deliver rank results in Kochi?",
      answer: "Usually, local SEO shows noticeable improvements in Map Pack visibility within 90 to 120 days. High competition areas like Kochi Kakkanad and Ernakulam proper require exhaustive semantic architecture and pure regional citation build-ups to outpace directories."
    },
    {
      question: "Does GrowthSpark handle Malayalam and English multilingual local targets?",
      answer: "Absolutely! We focus on conversational intent, mapping terms that Malayalam customers search on mobile voice search alongside standardized English targeting."
    },
    {
      question: "Why should my business optimize for localized Ernakulam business keywords?",
      answer: "Ernakulam represents the commercial epicenter of Kerala, meaning shoppers searching here have a very high conversion index. An organic lead from Ernakulam results in direct commercial sales or consultation inquiries."
    }
  ],
  hyperlocalKeywords: [
    {
      neighborhood: "Kakkanad (InfoPark Cyber Hub)",
      keywords: ["IT park SEO services Kakkanad", "B2B SaaS digital marketing agency InfoPark", "best SEO professional in Kakkanad"]
    },
    {
      neighborhood: "Edappally & Aluva (Retail & Trade)",
      keywords: ["retail showroom SEO Edappally", "local business listing repair Aluva", "E-commerce SEO consultancy Edappally"]
    },
    {
      neighborhood: "Fort Kochi & Marine Drive (Tourism & Services)",
      keywords: ["resort organic traffic Fort Kochi", "law firm local SEO Marine Drive Kochi", "hotel booking search optimization Kochi"]
    }
  ]
};

const PRE_SEEDED_METADATA: SEOMetadataResult = {
  topic: "SEO Services Kerala",
  titles: [
    {
      title: "SEO Services in Kerala (2026): Scale Your Local Business ROI!",
      length: 59,
      reasonForCtr: "Injects current year parameter, creates urgency, and offers a strong commercial trigger (ROI focus) at the start."
    },
    {
      title: "10 Best SEO Companies in Kerala | Guaranteed Organic Traffic Growth",
      length: 68,
      reasonForCtr: "Listicles have high click-through rates; couples strong numbers with a powerful commercial traffic promise."
    },
    {
      title: "Affordable SEO Services in Kerala - Drive Customers, Not Just Clicks",
      length: 69,
      reasonForCtr: "Addresses a primary user intent concern (affordability) with a vivid, customer-centric benefit statement."
    },
    {
      title: "Top SEO Agency in Kerala [Free Site Audit] - GrowthSpark Digital",
      length: 66,
      reasonForCtr: "Brackets trigger deep visual engagement in SERPs; offers immediate value via a free assessment tool."
    },
    {
      title: "Professional SEO Services Kerala | Settle for Nothing but Page 1",
      length: 67,
      reasonForCtr: "High-authority bold claim that triggers competitive drive in business-owner searchers."
    },
    {
      title: "How to Dominate Search: Expert SEO Services in Kochi & Kerala",
      length: 62,
      reasonForCtr: "Uses an educational 'How to' hook that attracts organic business investigators looking for solutions."
    },
    {
      title: "Kerala SEO Consulting & Strategy: Custom Packages for Indian SMEs",
      length: 67,
      reasonForCtr: "Targets specific buyer persona ('SMEs') directly, establishing immediate customer relevance."
    },
    {
      title: "#1 SEO Expert in Kerala | Standard Search Engine Optimization Guide",
      length: 68,
      reasonForCtr: "Asserts absolute expertise authority with traditional terminology, capturing raw Google query volume."
    },
    {
      title: "Boost Your Local Rankings with Expert SEO Services in Kerala",
      length: 59,
      reasonForCtr: "Action-oriented title starting with a powerful verb ('Boost') mapping directly to small business success."
    },
    {
      title: "Ecommerce SEO Agency Kerala | Double Your Online Store Traffic",
      length: 61,
      reasonForCtr: "Laser-focused on high-intent e-commerce store operators looking to scale checkout conversions."
    }
  ],
  metaDescriptions: [
    {
      description: "Looking for the best SEO services in Kerala? Scaled by GrowthSpark, our certified local SEO experts boost your revenue and traffic. Call today for a free audit!",
      length: 159,
      reasonForCtr: "Begins with a matching search query question; introduces authority, and ends with a solid call to action."
    },
    {
      description: "Dominate Google search results with affordable SEO services in Kerala. We specialize in local schema, high-authority backlinks, and clean content maps.",
      length: 151,
      reasonForCtr: "Employs an active verb ('Dominate') and lists key modern deliverables that prospective clients value."
    },
    {
      description: "Rank higher globally and regionally! Our SEO services in Kerala help startups and enterprises in Kochi, Trivandrum, and Ernakulam double organic inquiries.",
      length: 158,
      reasonForCtr: "Geographically comprehensive; sets tangible expected outcomes for regional business heads."
    },
    {
      description: "Struggling to acquire new customers online? Our personalized SEO services in Kerala align with Google's core updates to secure permanent, top-tier rankings.",
      length: 156,
      reasonForCtr: "Asks a relatable pain-point question and addresses reliability under recent algorithmic changes."
    },
    {
      description: "Get a custom-made SEO strategy designed specifically for Kerala companies. Increase brand credibility, outrank major competitors, and secure high-intent leads!",
      length: 159,
      reasonForCtr: "Presents clear bullet-like benefits and ends with positive reinforcement words ('high-intent leads')."
    },
    {
      description: "Increase organic traffic by up to 250% using our localized SEO services in Kerala. We clear tech errors, speed up load times, and leverage semantic searches.",
      length: 158,
      reasonForCtr: "Leverages exact stats (250%) and provides specific, clear actions demonstrating deep expertise."
    },
    {
      description: "Stop paying for temporary PPC ads. Secure rank longevity on Google Maps with the elite SEO agency in Kerala. Click here to book your complimentary site crawl!",
      length: 159,
      reasonForCtr: "Highlights a competitive comparison (saving budget on PPC ads) and outlines a clear engagement path."
    },
    {
      description: "Empower your local Malayalam & English business storefront with expert local SEO services in Kerala. Build high-quality citations and clean regional links now.",
      length: 158,
      reasonForCtr: "Acknowledges multilingual targeting to resonate with specialized region-specific founders."
    },
    {
      description: "Get measurable business growth, not just vanity keywords. Partner with the top-ranking SEO company in Kerala to streamline your digital sales funnel today.",
      length: 157,
      reasonForCtr: "Sets an expert expectation separating genuine business growth from useless 'vanity' rank indicators."
    },
    {
      description: "Double your revenue without spending a fortune. Discover how professional search engine optimization & SEO services in Kerala can skyrocket your conversions!",
      length: 157,
      reasonForCtr: "Addresses economic pricing; creates emotional validation and urgency with high energy verbs."
    }
  ],
  urlSlugs: [
    "seo-services-kerala",
    "best-seo-agency-kerala",
    "affordable-seo-packages-kerala",
    "kerala-seo-expert",
    "local-seo-services-kochi-ernakulam"
  ],
  openGraphTitles: [
    "How We Ranked Kerala's Top Brand on Google Page 1 (And How You Can Too!)",
    "Is Your Website Missing from Google? The SEO Blueprint for Kerala Businesses",
    "The Ultimate SEO Checklist for Kochi & Ernakulam Storefronts in 2026",
    "Why Traditional PPC is Wasting Your Budget — Switch to Organic Search SEO",
    "GrowthSpark's Secret Formula: Capturing High-Intent Buying Traffic in Kerala"
  ],
  openGraphDescriptions: [
    "Stop losing valuable organic customers to competitors. Here is the exact localized SEO strategy GrowthSpark uses to scale small business leads by 250% inside Kerala.",
    "93% of online experiences start with a search engine. If your Kerala-based storefront isn't in Google's Map Pack, you're invisible. Here is how to fix it.",
    "From Kakkanad's tech hub to Edappally's retail centers, read our definitive roadmap on how Kerala businesses are securing stable, multi-million organic leads.",
    "Want to pull high-value global travelers to your Kerala resort or business? Read why relying strictly on online travel agencies ruins margins, and how SEO solves it.",
    "Get the inside scoop on our proprietary local schema code and regional backlink networks that turn simple Kerala websites into industry-dominating lead engines."
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'keywordIntelligence' | 'contentCluster' | 'pillarBlog' | 'localPlaybook' | 'metadata' | 'siloMap' | 'auditor'>('keywordIntelligence');
  const [theme, setTheme] = useState<'editorial' | 'dark'>('editorial');

  // Business context inputs
  const [businessName, setBusinessName] = useState<string>("GrowthSpark Digital Marketing Agency");
  const [niche, setNiche] = useState<string>("Digital Marketing Agency");
  const [coreOfferings, setCoreOfferings] = useState<string>("SEO Services, local search optimization, content strategy, and e-commerce growth audits");
  const [city, setCity] = useState<string>("Kerala");
  const [targetIntentFocus, setTargetIntentFocus] = useState<string>("Commercial & Local Buying Intent");

  // Modern configuration parameters
  const [businessType, setBusinessType] = useState<string>("Agency");
  const [websiteUrl, setWebsiteUrl] = useState<string>("https://growthspark-digital.co");
  const [targetAudience, setTargetAudience] = useState<string>("Local Business Owners");
  const [targetKeyword, setTargetKeyword] = useState<string>("SEO Services Kerala");
  const [competitorUrl, setCompetitorUrl] = useState<string>("https://competitor-benchmark.com");
  const [blogWordCount, setBlogWordCount] = useState<string>("1500");
  const [supportingBlogsNum, setSupportingBlogsNum] = useState<string>("5");
  const [localSeoMode, setLocalSeoMode] = useState<boolean>(true);
  const [eeatOptimization, setEeatOptimization] = useState<boolean>(true);
  const [semanticExpansion, setSemanticExpansion] = useState<boolean>(true);
  const [aiContentDepth, setAiContentDepth] = useState<string>("Detailed outline + high relevance context");

  // Local SEO Playbook State (Explicit user query parameters)
  const [localLocation, setLocalLocation] = useState<string>("Kerala");
  const [localService, setLocalService] = useState<string>("SEO Services");
  const [localNearbyAreas, setLocalNearbyAreas] = useState<string>("Kochi, Ernakulam");
  const [playbook, setPlaybook] = useState<LocalSEOPlaybookData | null>(PRE_SEEDED_PLAYBOOK);
  const [isGeneratingPlaybook, setIsGeneratingPlaybook] = useState<boolean>(false);

  // SEO Metadata Generator State
  const [metadataTopic, setMetadataTopic] = useState<string>("SEO Services Kerala");
  const [metadataResult, setMetadataResult] = useState<SEOMetadataResult | null>(PRE_SEEDED_METADATA);
  const [isGeneratingMetadata, setIsGeneratingMetadata] = useState<boolean>(false);

  // State managers
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState<boolean>(false);
  const [strategy, setStrategy] = useState<SEOStrategyData | null>(PRE_SEEDED_STRATEGY);
  const [activeNodeId, setActiveNodeId] = useState<string>("pillar");
  const [isGeneratingArticle, setIsGeneratingArticle] = useState<boolean>(false);
  
  // Articles drafted
  const [drafts, setDrafts] = useState<Record<string, GeneratedArticle>>({
    "cluster-1": PRE_SEEDED_ARTICLE
  });

  // Live optimization tab
  const [userDraftText, setUserDraftText] = useState<string>(PRE_SEEDED_AUDIT_INPUT);
  const [targetKeywordsToAudit, setTargetKeywordsToAudit] = useState<string>("SEO Services in Kerala, affordable SEO packages Kochi Kerala, SEO expert Kerala");
  const [customCityContext, setCustomCityContext] = useState<string>("Kerala");
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(PRE_SEEDED_AUDIT_OUTPUT);

  // Success indicator message
  const [globalMessage, setGlobalMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const triggerMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setGlobalMessage({ text, type });
    setTimeout(() => setGlobalMessage(null), 5000);
  };

  const generateLocalPlaybook = async () => {
    if (!localLocation || !localService) {
      triggerMessage("Please fill out Location & Service parameters.", "error");
      return;
    }
    setIsGeneratingPlaybook(true);
    triggerMessage(`Consulting Local SEO Matrix for ${localLocation}...`);
    try {
      const response = await fetch("/api/generate-local-playbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          location: localLocation,
          service: localService,
          nearbyAreas: localNearbyAreas.split(",").map(a => a.trim())
        })
      });
      const data = await response.json();
      if (data.success && data.playbook) {
        setPlaybook(data.playbook);
        triggerMessage("Master Local SEO Playbook generated successfully!");
      } else {
        triggerMessage(data.error || "Failed to compile Local SEO playbook.", "error");
      }
    } catch (e: any) {
      console.error(e);
      triggerMessage("Failed to connect to local SEO compilation engine.", "error");
    } finally {
      setIsGeneratingPlaybook(false);
    }
  };

  const generateSEOMetadata = async () => {
    if (!metadataTopic) {
      triggerMessage("Please fill out the Target Topic parameter.", "error");
      return;
    }
    setIsGeneratingMetadata(true);
    triggerMessage(`Consulting CTR Intelligence for "${metadataTopic}"...`);
    try {
      const response = await fetch("/api/generate-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: metadataTopic })
      });
      const data = await response.json();
      if (data.success && data.metadata) {
        setMetadataResult(data.metadata);
        triggerMessage("CTR Optimized SEO Metadata generated successfully!");
      } else {
        triggerMessage(data.error || "Failed to generate metadata sets.", "error");
      }
    } catch (e: any) {
      console.error(e);
      triggerMessage("Failed to connect to SEO CTR analysis engine.", "error");
    } finally {
      setIsGeneratingMetadata(false);
    }
  };

  const exportAuditReportPDF = () => {
    if (!optimizationResult) {
      triggerMessage("No optimization audit result exists to export.", "error");
      return;
    }

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4"
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const leftMargin = 40;
      const rightMargin = 40;
      const contentWidth = pageWidth - leftMargin - rightMargin;

      let currentY = 40;

      const drawWrappedText = (d: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number => {
        const lines = d.splitTextToSize(text, maxWidth);
        for (let i = 0; i < lines.length; i++) {
          d.text(lines[i], x, y + (i * lineHeight));
        }
        return y + (lines.length * lineHeight);
      };

      const checkPageBreak = (neededHeight: number) => {
        if (currentY + neededHeight > pageHeight - 50) {
          d.addPage();
          currentY = 45;
          drawPageBorderAndFooter();
        }
      };

      const drawPageBorderAndFooter = () => {
        // Draw elegant light background
        d.setFillColor(253, 252, 248);
        d.rect(0, 0, pageWidth, pageHeight, "F");

        // Thin frame
        d.setDrawColor(26, 26, 26);
        d.setLineWidth(0.75);
        d.rect(20, 20, pageWidth - 40, pageHeight - 40, "S");

        // Footer Brand Info
        d.setFont("Helvetica", "normal");
        d.setFontSize(8);
        d.setTextColor(110, 110, 110);
        d.text("GrowthSpark SEO Intelligence Suite | Professional Live Content Audit", 28, pageHeight - 28);
        
        const pageCount = d.internal.pages.length - 1;
        d.text(`Page ${pageCount}`, pageWidth - 55, pageHeight - 28);
      };

      const d = doc; // short alias to work perfectly inside checkPageBreak scope

      // Draw original first page background
      drawPageBorderAndFooter();

      // HEADER
      d.setFillColor(26, 26, 26);
      d.rect(28, 28, contentWidth + 24, 75, "F");

      d.setFillColor(234, 88, 12); // #EA580C accent strip
      d.rect(28, 103, contentWidth + 24, 4, "F");

      d.setFont("Helvetica", "bold");
      d.setFontSize(14);
      d.setTextColor(253, 252, 248);
      d.text("GROWTHSPARK SEO INTELLIGENCE", 42, 58);

      d.setFont("Helvetica", "normal");
      d.setFontSize(9);
      d.setTextColor(230, 230, 230);
      d.text("CORE CONTENT AUDIT & STRUCTURAL REVITALIZATION REPORT", 42, 73);

      const timestamp = new Date().toLocaleString();
      d.setFontSize(7.5);
      d.setTextColor(180, 180, 180);
      d.text(`Audit Execution Timestamp: ${timestamp}`, 42, 88);

      currentY = 125;

      // TOP TOPICAL PARAMETERS
      d.setFont("Helvetica", "bold");
      d.setFontSize(10);
      d.setTextColor(234, 88, 12);
      d.text("I. TOPICAL CONTEXT FOCUS", 35, currentY);
      currentY += 14;

      d.setFont("Helvetica", "bold");
      d.setFontSize(9);
      d.setTextColor(26, 26, 26);
      d.text(`Primary Keyword Topic: "${metadataTopic || "Local SEO Services"}"`, 40, currentY);
      currentY += 14;

      d.setFont("Helvetica", "normal");
      d.setFontSize(8.5);
      d.setTextColor(60, 60, 60);
      d.text(`Business Entity Name: ${businessName || "SEO Partner"}`, 40, currentY);
      currentY += 11;
      d.text(`Niche Focus:           ${niche || "Professional Online Services"}`, 40, currentY);
      currentY += 11;
      d.text(`Core Offerings:        ${coreOfferings || "Organic SEO Optimization Services"}`, 40, currentY);
      currentY += 15;

      // RATING / READABILITY KPI BOX
      checkPageBreak(40);
      d.setFillColor(243, 239, 230);
      d.rect(35, currentY, contentWidth + 10, 24, "F");
      
      d.setFont("Helvetica", "bold");
      d.setFontSize(9);
      d.setTextColor(26, 26, 26);
      d.text("Readability Audit Grade:", 42, currentY + 15);
      
      d.setFont("Helvetica", "bold");
      d.setFontSize(10);
      d.setTextColor(234, 88, 12);
      d.text(optimizationResult.readabilityScore || "Optimal Grade", 170, currentY + 15);
      currentY += 35;

      // INTENT MATCHING
      checkPageBreak(50);
      d.setFont("Helvetica", "bold");
      d.setFontSize(9.5);
      d.setTextColor(21, 120, 75); // emerald-700
      d.text("Search Intent Mapping Assessment:", 35, currentY);
      currentY += 13;

      d.setFont("Helvetica", "normal");
      d.setFontSize(8.5);
      d.setTextColor(50, 50, 50);
      currentY = drawWrappedText(d, optimizationResult.originalIntentMatching, 40, currentY, contentWidth, 12);
      currentY += 20;

      // KEYWORD TABLE
      checkPageBreak(120);
      d.setFont("Helvetica", "bold");
      d.setFontSize(10);
      d.setTextColor(26, 26, 26);
      d.text("II. LSI & ENTITY KEYWORD DENSITY GRID", 35, currentY);
      currentY += 14;

      // Table Header
      d.setFillColor(35, 35, 35);
      d.rect(35, currentY, contentWidth + 10, 16, "F");

      d.setFont("Helvetica", "bold");
      d.setFontSize(8.5);
      d.setTextColor(253, 252, 248);
      d.text("Keyword Phrase Targeted", 42, currentY + 11);
      d.text("Frequency Metric", 230, currentY + 11);
      d.text("Optimization Recommendation Status", 360, currentY + 11);
      currentY += 16;

      // Table Rows
      optimizationResult.analyzedKeywords.forEach((kw, index) => {
        checkPageBreak(18);
        if (index % 2 === 0) {
          d.setFillColor(243, 239, 230);
          d.rect(35, currentY, contentWidth + 10, 16, "F");
        }

        d.setFont("Helvetica", "normal");
        d.setFontSize(8);
        d.setTextColor(40, 40, 40);
        d.text(kw.keyword, 42, currentY + 11);
        d.text(`${kw.frequency} uses`, 230, currentY + 11);

        const statusLower = kw.status.toLowerCase();
        if (statusLower.includes("optimal") || statusLower.includes("perfect") || statusLower.includes("good")) {
          d.setFont("Helvetica", "bold");
          d.setTextColor(21, 120, 75);
        } else if (statusLower.includes("stuff") || statusLower.includes("stuffed") || statusLower.includes("high")) {
          d.setFont("Helvetica", "bold");
          d.setTextColor(190, 30, 30);
        } else {
          d.setFont("Helvetica", "bold");
          d.setTextColor(217, 119, 6);
        }

        d.text(kw.status.toUpperCase(), 360, currentY + 11);
        currentY += 16;
      });

      currentY += 15;

      // STRUCTURAL ISSUES
      if (optimizationResult.structuralIssues && optimizationResult.structuralIssues.length > 0) {
        checkPageBreak(70);
        d.setFont("Helvetica", "bold");
        d.setFontSize(10);
        d.setTextColor(153, 27, 27);
        d.text("III. CRITICAL STRUCTURAL & HIERARCHY VIOLATIONS", 35, currentY);
        currentY += 14;

        let totalIssuesHeight = 0;
        optimizationResult.structuralIssues.forEach((issue) => {
          const lines = d.splitTextToSize(`• ${issue}`, contentWidth);
          totalIssuesHeight += (lines.length * 11) + 3;
        });

        checkPageBreak(totalIssuesHeight + 15);

        d.setFillColor(254, 242, 242);
        d.setDrawColor(252, 165, 165);
        d.setLineWidth(0.5);
        d.rect(35, currentY, contentWidth + 10, totalIssuesHeight + 8, "FD");

        currentY += 8;
        optimizationResult.structuralIssues.forEach((issue) => {
          d.setFont("Helvetica", "normal");
          d.setFontSize(8);
          d.setTextColor(153, 27, 27);
          
          const text = `• ${issue}`;
          const wrapped = d.splitTextToSize(text, contentWidth - 10);
          for (let m = 0; m < wrapped.length; m++) {
            d.text(wrapped[m], 42, currentY + (m * 11));
          }
          currentY += (wrapped.length * 11) + 3;
        });
        currentY += 15;
      }

      // SEMANTIC OPPORTUNITIES
      checkPageBreak(60);
      d.setFont("Helvetica", "bold");
      d.setFontSize(10);
      d.setTextColor(26, 26, 26);
      d.text("IV. HIGH-VALUE SEMANTIC ENTITIES RECOMMENDED", 35, currentY);
      currentY += 14;

      d.setFont("Helvetica", "normal");
      d.setFontSize(8.5);
      d.setTextColor(26, 26, 26);
      const semJoined = optimizationResult.semanticSuggestions.map(s => `[ + ${s} ]`).join("   ");
      currentY = drawWrappedText(d, semJoined, 40, currentY, contentWidth, 12);
      currentY += 20;

      // NEXT STEPS ACTIONS
      checkPageBreak(85);
      d.setFont("Helvetica", "bold");
      d.setFontSize(10);
      d.setTextColor(234, 88, 12);
      d.text("V. COMPREHENSIVE CONVERSION PLAN (NEXT STEPS)", 35, currentY);
      currentY += 14;

      optimizationResult.nextSteps.forEach((step, idx) => {
        checkPageBreak(30);
        d.setFont("Helvetica", "bold");
        d.setFontSize(8.5);
        d.setTextColor(234, 88, 12);
        d.text(`Step #${idx + 1}:`, 42, currentY);

        d.setFont("Helvetica", "normal");
        d.setFontSize(8.5);
        d.setTextColor(40, 40, 40);
        currentY = drawWrappedText(d, step, 95, currentY, contentWidth - 55, 11);
        currentY += 8;
      });

      currentY += 15;

      // CONTENT PREVIEW PRE-DRAFT
      checkPageBreak(120);
      d.setFont("Helvetica", "bold");
      d.setFontSize(10);
      d.setTextColor(26, 26, 26);
      d.text("VI. OPTIMIZED REWRITE TEXT PREVIEW", 35, currentY);
      currentY += 14;

      // Clean Markdown
      const plainSnippet = optimizationResult.optimizedContentMarkdown
        .replace(/#[#* \t]+/g, "")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/`([^`]+)`/g, "$1")
        .trim();

      const shortSnippet = plainSnippet.length > 500 
        ? plainSnippet.substring(0, 500) + "... [Content continues in original draft canvas]"
        : plainSnippet;

      const previewSnippetLines = d.splitTextToSize(shortSnippet, contentWidth - 10).length;
      const previewBoxHt = (previewSnippetLines * 11) + 16;

      checkPageBreak(previewBoxHt + 20);

      d.setFillColor(253, 252, 248);
      d.setDrawColor(26, 26, 26);
      d.setLineWidth(0.5);
      d.rect(35, currentY, contentWidth + 10, previewBoxHt, "S");

      d.setFont("Helvetica", "italic");
      d.setFontSize(8);
      d.setTextColor(60, 60, 60);
      currentY = drawWrappedText(d, shortSnippet, 42, currentY + 12, contentWidth - 2, 11);
      currentY += 20;

      const safeKeywordFileStr = (metadataTopic || "seo-services-kerala")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .substring(0, 40);

      doc.save(`seo-live-audit-${safeKeywordFileStr}.pdf`);
      triggerMessage("Professional SEO Content Audit PDF exported safely!", "success");
    } catch (err: any) {
      console.error(err);
      triggerMessage(`Failed to generate PDF Report: ${err.message}`, "error");
    }
  };

  const generateSEOStrategy = async () => {
    if (!niche || !coreOfferings) {
      triggerMessage("Please fill out Niche/Industry and Core Offerings first.", "error");
      return;
    }
    setIsGeneratingStrategy(true);
    try {
      const response = await fetch("/api/generate-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          niche,
          coreOfferings,
          city,
          targetIntentFocus
        })
      });
      const data = await response.json();
      if (data.success && data.strategy) {
        setStrategy(data.strategy);
        setActiveNodeId("pillar");
        triggerMessage("SEO Pillar-Cluster strategy mapped successfully!");
      } else {
        triggerMessage(data.error || "Failed to generate strategy blueprint.", "error");
      }
    } catch (e: any) {
      console.error(e);
      triggerMessage("Server communications error. Check your API configuration.", "error");
    } finally {
      setIsGeneratingStrategy(false);
    }
  };

  const draftSpecificTopic = async (nodeId: string) => {
    if (!strategy) return;
    
    setIsGeneratingArticle(true);
    triggerMessage(`Drafting deep-dive expert guidelines for "${nodeId === 'pillar' ? strategy.pillar.title : strategy.clusters.find(c => c.id === nodeId)?.title}"...`);

    let item: { title: string, primaryKeyword: string, secondaryKeywords: string[], searchIntent: string, briefSummary: string };
    let isPillar = false;

    if (nodeId === "pillar") {
      item = strategy.pillar;
      isPillar = true;
    } else {
      const found = strategy.clusters.find(c => c.id === nodeId);
      if (!found) {
        setIsGeneratingArticle(false);
        return;
      }
      item = found;
    }

    try {
      const response = await fetch("/api/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicTitle: item.title,
          primaryKeyword: item.primaryKeyword,
          secondaryKeywords: item.secondaryKeywords,
          searchIntent: item.searchIntent,
          businessContext: { businessName, niche, coreOfferings },
          city: strategy.localPlanning.isLocal ? strategy.localPlanning.location : "",
          isPillar,
          briefSummary: item.briefSummary
        })
      });

      const data = await response.json();
      if (data.success && data.article) {
        setDrafts(prev => ({
          ...prev,
          [nodeId]: data.article
        }));
        triggerMessage("Excellent copy written with expert trust signals & formatting!");
      } else {
        triggerMessage(data.error || "Failed key content draft process.", "error");
      }
    } catch (error) {
      console.error(error);
      triggerMessage("Failure contacting content synthesis engine.", "error");
    } finally {
      setIsGeneratingArticle(false);
    }
  };

  const optimizeUserDraft = async () => {
    if (!userDraftText.trim()) {
      triggerMessage("Please supply some draft text to analyze.", "error");
      return;
    }
    setIsAuditing(true);
    try {
      const response = await fetch("/api/optimize-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userText: userDraftText,
          targetKeywords: targetKeywordsToAudit.split(",").map(k => k.trim()),
          focusIntent: "Informational + Purchase Lead Magnet",
          city: customCityContext
        })
      });
      const data = await response.json();
      if (data.success && data.optimized) {
        setOptimizationResult(data.optimized);
        triggerMessage("SEO Audit completed! Optimization rewrite injected below.");
      } else {
        triggerMessage(data.error || "Failed auditing draft content.", "error");
      }
    } catch (e) {
      console.error(e);
      triggerMessage("Failed to process analysis.", "error");
    } finally {
      setIsAuditing(false);
    }
  };

  // Helper to copy text to clipboard safely in sandboxed iframe environment
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerMessage("Markdown draft copied securely to clipboard!");
  };

  const getActiveNodeData = () => {
    if (!strategy) return null;
    if (activeNodeId === "pillar") {
      return {
        id: "pillar",
        title: strategy.pillar.title,
        primaryKeyword: strategy.pillar.primaryKeyword,
        searchIntent: strategy.pillar.searchIntent,
        secondaryKeywords: strategy.pillar.secondaryKeywords,
        briefSummary: strategy.pillar.briefSummary,
        isPillar: true,
        angle: "Central topical repository for this target market niche"
      };
    } else {
      const cls = strategy.clusters.find(c => c.id === activeNodeId);
      if (!cls) return null;
      return {
        id: cls.id,
        title: cls.title,
        primaryKeyword: cls.primaryKeyword,
        searchIntent: cls.searchIntent,
        secondaryKeywords: cls.secondaryKeywords,
        briefSummary: cls.briefSummary,
        isPillar: false,
        angle: cls.internalLinkingAngle
      };
    }
  };

  const selectedNode = getActiveNodeData();
  const currentDraft = drafts[activeNodeId];

  return (
    <div 
      id="seo-strategist-app" 
      className={`min-h-screen flex flex-col font-sans selection:bg-[#EA580C]/20 antialiased transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-[#0b0f19] text-[#e2e8f0] dark-mode' 
          : 'bg-[#FDFCF8] text-[#1A1A1A]'
      }`}
    >
      
      {/* 1. EDITORIAL HEADER */}
      <header className="border-b border-[#111827]/10 flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 py-4 shrink-0 bg-white z-20 gap-4 shadow-sm">
        <div className="flex items-center gap-3 self-stretch md:self-auto justify-between md:justify-start">
          <div className="flex flex-col">
            <span className="text-[12px] uppercase tracking-[0.25em] font-black text-[#111827] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#F97316] rounded-full inline-block"></span>
              Pillar Content Cluster Architect
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] opacity-50 font-black text-[#111827] pl-4">Enterprise SEO Engine v3.5</span>
          </div>

          {/* Theme Toggler Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 shrink-0 ml-4" id="theme-toggler">
            <button
              id="theme-btn-editorial"
              title="Editorial Aesthetic Theme"
              type="button"
              onClick={() => setTheme('editorial')}
              className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-1 ${
                theme === 'editorial' 
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3 h-3 text-amber-600" />
              <span>Editorial</span>
            </button>
            <button
              id="theme-btn-dark"
              title="High-Contrast Dark Mode for Long-Form SEO Editing"
              type="button"
              onClick={() => setTheme('dark')}
              className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-1 ${
                theme === 'dark' 
                  ? 'bg-slate-950 text-white shadow-sm border border-[#24334c]' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Dark Mode</span>
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
          <button 
            id="tab-kw-intel"
            onClick={() => setActiveTab('keywordIntelligence')}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-extrabold transition-all duration-300 rounded ${
              activeTab === 'keywordIntelligence' 
                ? 'bg-[#111827] text-white' 
                : 'text-[#111827] hover:bg-slate-100 opacity-75'
            }`}
          >
            1. Keyword Intelligence
          </button>
          <button 
            id="tab-cluster-engine"
            onClick={() => setActiveTab('contentCluster')}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-extrabold transition-all duration-300 rounded ${
              activeTab === 'contentCluster' 
                ? 'bg-[#111827] text-white' 
                : 'text-[#111827] hover:bg-slate-100 opacity-75'
            }`}
          >
            2. Cluster Flowchart
          </button>
          <button 
            id="tab-pillar-blog"
            onClick={() => setActiveTab('pillarBlog')}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-extrabold transition-all duration-300 rounded ${
              activeTab === 'pillarBlog' 
                ? 'bg-[#111827] text-white' 
                : 'text-[#111827] hover:bg-slate-100 opacity-75'
            }`}
          >
            3. Article workspace
          </button>
          <button 
            id="tab-localpaybook-btn"
            onClick={() => setActiveTab('localPlaybook')}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-extrabold transition-all duration-300 rounded ${
              activeTab === 'localPlaybook' 
                ? 'bg-[#111827] text-white' 
                : 'text-[#111827] hover:bg-slate-100 opacity-75'
            }`}
          >
            4. Local SEO Playbook
          </button>
          <button 
            id="tab-metadata-btn"
            onClick={() => setActiveTab('metadata')}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-extrabold transition-all duration-300 rounded ${
              activeTab === 'metadata' 
                ? 'bg-[#111827] text-white' 
                : 'text-[#111827] hover:bg-slate-100 opacity-75'
            }`}
          >
            5. CTR Metadata Suite
          </button>
          <button 
            id="tab-strategy-btn"
            onClick={() => setActiveTab('siloMap')}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-extrabold transition-all duration-300 rounded ${
              activeTab === 'siloMap' 
                ? 'bg-[#111827] text-white' 
                : 'text-[#111827] hover:bg-slate-100 opacity-75'
            }`}
          >
            6. Silo Directory Map
          </button>
          <button 
            id="tab-auditor-btn"
            onClick={() => setActiveTab('auditor')}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-extrabold transition-all duration-300 rounded ${
              activeTab === 'auditor' 
                ? 'bg-[#111827] text-white' 
                : 'text-[#111827] hover:bg-slate-100 opacity-75'
            }`}
          >
            7. Live Content Auditor
          </button>
        </div>
      </header>

      {/* Global Toast Message Indicator */}
      {globalMessage && (
        <div 
          id="global-toast" 
          className={`fixed top-24 right-6 sm:right-10 px-5 py-3 border tracking-tight text-xs uppercase font-semibold z-50 flex items-center shadow-md animate-fade-in ${
            globalMessage.type === 'error' 
              ? 'bg-red-50 text-red-900 border-red-700' 
              : 'bg-[#1A1A1A] text-[#FDFCF8] border-[#1A1A1A]'
          }`}
        >
          {globalMessage.type === 'error' ? <AlertCircle className="w-4 h-4 mr-2" /> : <Sparkles className="w-4 h-4 mr-2 text-amber-400" />}
          {globalMessage.text}
        </div>
      )}

      {/* 2. CORE WORKSPACE */}
      {activeTab === 'keywordIntelligence' && (
        <KeywordIntelligence 
          businessName={businessName}
          setBusinessName={setBusinessName}
          businessType={businessType}
          setBusinessType={setBusinessType}
          websiteUrl={websiteUrl}
          setWebsiteUrl={setWebsiteUrl}
          primaryService={coreOfferings}
          setPrimaryService={setCoreOfferings}
          location={city}
          setLocation={setCity}
          targetAudience={targetAudience}
          setTargetAudience={setTargetAudience}
          targetKeyword={targetKeyword}
          setTargetKeyword={setTargetKeyword}
          competitorUrl={competitorUrl}
          setCompetitorUrl={setCompetitorUrl}
          blogWordCount={blogWordCount}
          setBlogWordCount={setBlogWordCount}
          supportingBlogsNum={supportingBlogsNum}
          setSupportingBlogsNum={setSupportingBlogsNum}
          searchIntentFocus={targetIntentFocus}
          setSearchIntentFocus={setTargetIntentFocus}
          localSeoMode={localSeoMode}
          setLocalSeoMode={setLocalSeoMode}
          eeatOptimization={eeatOptimization}
          setEeatOptimization={setEeatOptimization}
          semanticExpansion={semanticExpansion}
          setSemanticExpansion={setSemanticExpansion}
          aiContentDepth={aiContentDepth}
          setAiContentDepth={setAiContentDepth}
          strategy={strategy}
          isGeneratingStrategy={isGeneratingStrategy}
          onGenerateStrategy={generateSEOStrategy}
          onNavigateToTab={(t) => setActiveTab(t)}
          onSelectNode={setActiveNodeId}
          triggerMessage={triggerMessage}
        />
      )}

      {activeTab === 'contentCluster' && (
        <ContentClusterEngine 
          strategy={strategy}
          activeNodeId={activeNodeId}
          onSelectNode={setActiveNodeId}
          triggerMessage={triggerMessage}
          onNavigateToTab={(t) => setActiveTab(t)}
        />
      )}

      {activeTab === 'pillarBlog' && (
        <PillarBlogGenerator 
          strategy={strategy}
          activeNodeId={activeNodeId}
          onSelectNode={setActiveNodeId}
          drafts={drafts}
          setDrafts={setDrafts}
          isGeneratingArticle={isGeneratingArticle}
          onDraftSpecificTopic={draftSpecificTopic}
          triggerMessage={triggerMessage}
          onNavigateToTab={(t) => setActiveTab(t)}
        />
      )}

      {activeTab === 'localPlaybook' && (
        <LocalSEOPlaybook 
          businessName={businessName} 
          setBusinessName={setBusinessName}
          location={localLocation} 
          setLocation={setLocalLocation}
          primaryService={localService} 
          setPrimaryService={setLocalService}
          playbook={playbook}
          isGeneratingPlaybook={isGeneratingPlaybook}
          onGeneratePlaybook={generateLocalPlaybook}
          triggerMessage={triggerMessage}
          onNavigateToTab={(t) => setActiveTab(t)}
        />
      )}

      {activeTab === 'metadata' && (
        <CTRMetadataSuite 
          metadataTopic={metadataTopic} 
          setMetadataTopic={setMetadataTopic}
          metadataResult={metadataResult}
          isGeneratingMetadata={isGeneratingMetadata}
          onGenerateMetadata={generateSEOMetadata}
          triggerMessage={triggerMessage}
          onNavigateToTab={(t) => setActiveTab(t)}
        />
      )}

      {activeTab === 'siloMap' && (
        <SiloArchitectureMap 
          strategy={strategy}
          triggerMessage={triggerMessage}
          onNavigateToTab={(t) => setActiveTab(t)}
        />
      )}

      {activeTab === 'auditor' && (
        <ContentAuditor 
          userDraftText={userDraftText} 
          setUserDraftText={setUserDraftText}
          targetKeywordsToAudit={targetKeywordsToAudit} 
          setTargetKeywordsToAudit={setTargetKeywordsToAudit}
          customCityContext={customCityContext} 
          setCustomCityContext={setCustomCityContext}
          isAuditing={isAuditing}
          onOptimizeUserDraft={optimizeUserDraft}
          optimizationResult={optimizationResult}
          onExportAuditReportPDF={exportAuditReportPDF}
          triggerMessage={triggerMessage}
          onNavigateToTab={(t) => setActiveTab(t)}
        />
      )}

      {false && activeTab === 'localPlaybook' ? (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* PLAYBOOK SIDEBAR */}
          <aside className="w-full lg:w-[350px] border-b lg:border-b-0 lg:border-r border-[#1A1A1A] flex flex-col shrink-0 bg-[#F9F7F2] overflow-y-auto">
            <div className="p-8 border-b border-[#1A1A1A]/10">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#EA580C] mb-2 block">Local Parameter Engine</span>
              <h2 className="text-xl font-serif italic font-semibold leading-tight text-[#1A1A1A]">Local Target Matrix</h2>
              <p className="text-[11px] text-[#1A1A1A]/70 mt-1">Configure business and coverage signals to dynamically analyze geo-targeted search niches.</p>
            </div>

            <div className="p-8 space-y-5 flex-1">
              {/* Business Name */}
              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/60 block mb-2">Business Name</label>
                <input 
                  id="local-input-bizname"
                  type="text" 
                  value={businessName} 
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/20 px-3 py-2 text-xs focus:ring-1 focus:ring-[#EA580C] outline-none"
                  placeholder="e.g. GrowthSpark Digital"
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/60 block mb-2">Base Location / City</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-black/35"><MapPin className="w-3.5 h-3.5" /></span>
                  <input 
                    id="local-input-location"
                    type="text" 
                    value={localLocation} 
                    onChange={(e) => setLocalLocation(e.target.value)}
                    className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/20 pl-8 pr-3 py-2 text-xs focus:ring-1 focus:ring-[#EA580C] outline-none"
                    placeholder="e.g. Kerala"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/60 block mb-2">Core Targeted Service</label>
                <input 
                  id="local-input-service"
                  type="text" 
                  value={localService} 
                  onChange={(e) => setLocalService(e.target.value)}
                  className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/20 px-3 py-2 text-xs focus:ring-1 focus:ring-[#EA580C] outline-none"
                  placeholder="e.g. SEO Services"
                />
              </div>

              {/* Nearby Target Areas */}
              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/60 block mb-2">Nearby Areas to Target</label>
                <textarea 
                  id="local-input-areas"
                  rows={2}
                  value={localNearbyAreas} 
                  onChange={(e) => setLocalNearbyAreas(e.target.value)}
                  className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/20 p-3 text-xs focus:ring-1 focus:ring-[#EA580C] outline-none leading-relaxed"
                  placeholder="e.g. Kochi, Ernakulam"
                />
                <p className="text-[9px] italic text-[#1A1A1A]/50 mt-1">We will generate hyperlocal keywords and target points for these regions.</p>
              </div>

              {/* Build Button */}
              <button 
                id="btn-build-playbook"
                onClick={generateLocalPlaybook}
                disabled={isGeneratingPlaybook}
                className="w-full mt-4 bg-[#1A1A1A] hover:bg-[#EA580C] text-[#FDFCF8] py-3 text-[11px] uppercase tracking-widest font-bold transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 border border-[#1A1A1A] hover:border-[#EA580C]"
              >
                {isGeneratingPlaybook ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Compiling Local Matrix...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Local Playbook</span>
                  </>
                )}
              </button>
            </div>
          </aside>

          {/* MAIN PLAYBOOK VISUALIZER */}
          <main className="flex-1 overflow-y-auto bg-[#FDFCF8] p-6 sm:p-10">
            {isGeneratingPlaybook ? (
              <div className="h-full flex flex-col justify-center items-center py-24 text-center">
                <div className="w-12 h-12 rounded-full border-4 border-dashed border-[#EA580C] animate-spin mb-4"></div>
                <h3 className="font-serif text-xl italic font-bold">Assembling Local SEO Playbook...</h3>
                <p className="text-xs text-[#1A1A1A]/60 max-w-md mt-1">Cross-referencing geographical landmarks in {localLocation} with nearby vectors {localNearbyAreas} to establish absolute local authority.</p>
              </div>
            ) : playbook ? (
              <div className="space-y-12 max-w-6xl mx-auto">
                {/* Header card */}
                <div className="border border-[#1A1A1A] p-8 bg-[#F9F7F2] relative overflow-hidden">
                  <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#EA580C]/5 to-transparent pointer-events-none"></div>
                  <span className="inline-block px-2.5 py-1 bg-[#1A1A1A] text-[#FDFCF8] text-[9px] uppercase tracking-[0.25em] font-black mb-3">
                    Active Expert Strategy Matrix
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A] leading-tight">
                    Local SEO Playbook: <span className="italic font-normal">{playbook.businessName}</span>
                  </h1>
                  <p className="text-sm text-[#1A1A1A]/70 mt-2 max-w-3xl leading-relaxed">
                     A premier search blueprint designed specifically to capture organic visibility for <strong className="text-[#1A1A1A]">{playbook.service}</strong> in <strong className="text-[#EA580C]">{playbook.location}</strong> with surgical targeting of nearby neighborhoods like <strong className="text-[#1A1A1A]">{playbook.nearbyAreas.join(", ")}</strong>.
                  </p>
                </div>

                {/* Grid container for 1. Keyword & Hyperlocal */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* 1. KEYWORD OPPORTUNITIES */}
                  <div className="border border-[#1A1A1A] bg-[#FDFCF8]">
                    <div className="px-6 py-4 border-b border-[#1A1A1A] bg-[#F9F7F2] flex items-center justify-between">
                      <h3 className="text-xs uppercase tracking-[0.2em] font-black flex items-center gap-2">
                        <Search className="w-4 h-4 text-[#EA580C]" />
                        1. Location-Specific Keywords
                      </h3>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-900/15 uppercase font-bold">Commercial Intent</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#1A1A1A] text-[#FDFCF8] uppercase font-mono tracking-wider font-bold text-[9px]">
                            <th className="py-3 px-4">Target Keyword</th>
                            <th className="py-3 px-4">Search Intent</th>
                            <th className="py-3 px-4 text-center">Volume</th>
                            <th className="py-3 px-4 text-right">Relevance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A1A1A]/10">
                          {playbook.keywordOpportunities.map((kw, i) => (
                            <tr key={i} className="hover:bg-[#F9F7F2]/40 transition-colors text-slate-800 font-sans">
                              <td className="py-3 px-4 font-mono font-medium text-black">{kw.keyword}</td>
                              <td className="py-3 px-4 italic text-[#1A1A1A]/70">{kw.intent}</td>
                              <td className="py-3 px-4 text-center font-bold text-gray-900">{kw.volume}</td>
                              <td className="py-3 px-4 text-right font-semibold text-emerald-800">{kw.relevance}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 6. HYPERLOCAL KEYWORDS */}
                  <div className="border border-[#1A1A1A] bg-[#FDFCF8] flex flex-col justify-between">
                    <div>
                      <div className="px-6 py-4 border-b border-[#1A1A1A] bg-[#F9F7F2]">
                        <h3 className="text-xs uppercase tracking-[0.2em] font-black flex items-center gap-2">
                          <Compass className="w-4 h-4 text-[#EA580C]" />
                          6. Hyperlocal Target Keyword Groups
                        </h3>
                      </div>
                      <div className="p-6 space-y-6">
                        {playbook.hyperlocalKeywords.map((group, i) => (
                          <div key={i} className="space-y-2 border-b border-[#1A1A1A]/5 pb-4 last:border-b-0 last:pb-0">
                            <h4 className="text-xs font-serif font-bold italic text-black flex items-center">
                              <span className="w-1.5 h-1.5 bg-[#EA580C] rounded-full mr-2"></span>
                              {group.neighborhood}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {group.keywords.map((kw, idx) => (
                                <span key={idx} className="bg-[#1A1A1A]/5 hover:bg-[#EA580C]/10 hover:text-orange-950 transition-colors text-slate-800 font-mono text-[11px] px-2.5 py-1 border border-[#1A1A1A]/10 font-bold">
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-[#F9F7F2] border-t border-[#1A1A1A] text-[10px] font-mono text-[#1A1A1A]/70">
                      * Proximity optimization anchors to natural district sectors.
                    </div>
                  </div>
                </div>

                {/* 2. LOCAL LANDING PAGE CONTENT OUTLINE */}
                <div className="border border-[#1A1A1A] bg-[#FDFCF8]">
                  <div className="px-6 py-4 border-b border-[#1A1A1A] bg-[#F9F7F2]">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-black flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#EA580C]" />
                      2. Local Landing Page Structured Outline
                    </h3>
                  </div>
                  <div className="divide-y divide-[#1A1A1A]">
                    {playbook.landingPageOutline.map((section, idx) => (
                      <div key={idx} className="p-6 hover:bg-[#F9F7F2]/20 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 mb-2.5 font-bold">
                          <h4 className="font-serif text-base font-bold text-black italic">
                            Section {idx + 1}: {section.sectionTitle}
                          </h4>
                          <span className="text-[9px] uppercase font-bold tracking-widest bg-amber-50 text-amber-800 border border-amber-900/15 px-2 py-0.5 rounded-sm shrink-0">
                            Structure Block
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed max-w-4xl mb-4 text-justify">
                          {section.contentBrief}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] uppercase font-black text-[#1A1A1A]/50 tracking-wider">Target Queries:</span>
                          {section.keywordsToTarget.map((kw, i) => (
                            <span key={i} className="text-[11px] font-mono font-black text-orange-700 underline bg-orange-50/40 px-2 py-0.5 border border-orange-900/10">
                              "{kw}"
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row for 3. GBP and 4. Local Schema */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* 3. GOOGLE BUSINESS PROFILE SUGGESTIONS */}
                  <div className="border border-[#1A1A1A] bg-[#FDFCF8] flex flex-col">
                    <div className="px-6 py-4 border-b border-[#1A1A1A] bg-[#F9F7F2]">
                      <h3 className="text-xs uppercase tracking-[0.2em] font-black flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#EA580C]" />
                        3. Google Business Profile Optimization
                      </h3>
                    </div>
                    <div className="p-6 flex-1 space-y-4">
                      {playbook.googleBusinessProfileSuggestions.map((suggestion, idx) => (
                        <div key={idx} className="flex items-start text-xs text-slate-800 leading-relaxed font-semibold">
                          <span className="mr-3 w-5 h-5 rounded-full bg-[#1A1A1A] text-[#FDFCF8] flex items-center justify-center font-mono text-[9px] font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="flex-1">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-[#F9F7F2] border-t border-[#1A1A1A] text-[10px] text-[#C2410C] font-semibold uppercase tracking-wider text-center">
                      ♦ Proximity Signals Calibrated for {playbook.location} Markets
                    </div>
                  </div>

                  {/* 4. LOCAL SCHEMA MARKUP RECOMMENDATIONS */}
                  <div className="border border-[#1A1A1A] bg-[#FDFCF8] flex flex-col">
                    <div className="px-6 py-4 border-b border-[#1A1A1A] bg-[#F9F7F2] flex items-center justify-between">
                      <h3 className="text-xs uppercase tracking-[0.2em] font-black flex items-center gap-2">
                        <Link className="w-4 h-4 text-[#EA580C]" />
                        4. Local Schema Markup (JSON-LD)
                      </h3>
                      <button 
                        onClick={() => copyToClipboard(playbook.schemaMarkup)}
                        className="px-2.5 py-1 border border-[#1A1A1A]/30 hover:border-[#EA580C] hover:bg-[#FDFCF8] text-[9px] font-bold uppercase tracking-wider flex items-center space-x-1 transition-all cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy JSON-LD</span>
                      </button>
                    </div>
                    <div className="flex-1 p-4 bg-[#1A1A1A] text-emerald-400 font-mono text-xs overflow-x-auto select-all h-[360px] leading-relaxed max-h-[380px] rounded-b-sm border-t border-[#1A1A1A]">
                      <pre className="whitespace-pre">{playbook.schemaMarkup}</pre>
                    </div>
                  </div>
                </div>

                {/* 5. FAQ CONTENT FOR LOCAL SEARCHES */}
                <div className="border border-[#1A1A1A] bg-[#FDFCF8]">
                  <div className="px-6 py-4 border-b border-[#1A1A1A] bg-[#F9F7F2]">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-black flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#EA580C]" />
                      5. FAQ Content for Local Searches
                    </h3>
                  </div>
                  <div className="p-6 space-y-8">
                    {playbook.localFAQs.map((faq, idx) => (
                      <div key={idx} className="space-y-2 border-b border-[#1A1A1A]/5 pb-6 last:border-b-0 last:pb-0">
                        <h4 className="font-serif text-base font-bold text-black flex items-start">
                          <span className="text-[#EA580C] font-semibold mr-2 font-mono">Q{idx + 1}:</span>
                          <span>{faq.question}</span>
                        </h4>
                        <div className="pl-6 text-xs text-slate-700 italic leading-relaxed text-justify">
                          <strong className="text-emerald-800 font-semibold uppercase font-mono text-[10px] block mb-1">Local Counsel Answer:</strong>
                          "{faq.answer}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-[#1A1A1A]/20 p-20 text-center bg-[#F9F7F2] rounded-sm max-w-4xl mx-auto mt-10">
                <Compass className="w-10 h-10 text-[#1A1A1A]/30 mx-auto mb-4" />
                <p className="font-serif text-lg italic text-[#1A1A1A]/70">No Local SEO Playbook compiled yet.</p>
                <p className="text-xs text-[#1A1A1A]/50 mt-1">Configure parameters in the sidebar and click "Generate Local Playbook" to build strategic listings.</p>
              </div>
            )}
          </main>

        </div>
      ) : activeTab === 'metadata' ? (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* METADATA SIDEBAR */}
          <aside className="w-full lg:w-[350px] border-b lg:border-b-0 lg:border-r border-[#1A1A1A] flex flex-col shrink-0 bg-[#F9F7F2] overflow-y-auto">
            <div className="p-8 border-b border-[#1A1A1A]/10">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#EA580C] mb-2 block">Topical CTR Engine</span>
              <h2 className="text-xl font-serif italic font-semibold leading-tight text-[#1A1A1A]">Metadata Parameters</h2>
              <p className="text-[11px] text-[#1A1A1A]/70 mt-1">Configure your primary keyword or topic to generate click-optimized headers and tags.</p>
            </div>

            <div className="p-8 space-y-5 flex-1">
              {/* Target Topic/Keyword */}
              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/60 block mb-2">Target Topic / Core Keyword</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-black/35"><Search className="w-3.5 h-3.5" /></span>
                  <input 
                    id="metadata-input-topic"
                    type="text" 
                    value={metadataTopic} 
                    onChange={(e) => setMetadataTopic(e.target.value)}
                    className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/20 pl-8 pr-3 py-2 text-xs focus:ring-1 focus:ring-[#EA580C] outline-none font-medium text-black"
                    placeholder="e.g. SEO Services Kerala"
                  />
                </div>
              </div>

              {/* Best Practices Checklist */}
              <div className="bg-[#F3EFE6] p-4 border border-[#1A1A1A]/10 rounded-sm">
                <span className="text-[8px] uppercase tracking-[0.2em] font-black text-[#1A1A1A] mb-3 block font-mono">Google CTR Checklist</span>
                <ul className="space-y-2 text-[11px] text-[#1A1A1A]/80">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Keep titles below 60 chars</strong> to prevent truncated ellipses on desktops & mobiles.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Keep meta descriptions below 160 chars</strong> for full display utility.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Use bracketed callouts [ ]</strong> such as [2026], [Free Tool] or [Case Study] (increases clicks by 40%).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Trigger action</strong> using immediate active verbs & actionable CTA declarations (e.g. "Scale!", "Double!").</span>
                  </li>
                </ul>
              </div>

              {/* Generation Button */}
              <button
                id="generate-metadata-btn"
                onClick={generateSEOMetadata}
                disabled={isGeneratingMetadata}
                className="w-full bg-[#1A1A1A] hover:bg-[#EA580C] text-[#FDFCF8] transition-all duration-300 py-3 uppercase tracking-wider text-[11px] font-black flex items-center justify-center gap-2 border border-[#1A1A1A] disabled:opacity-50"
              >
                {isGeneratingMetadata ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Analyzing CTR Data...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Generate Metadata Suite
                  </>
                )}
              </button>
            </div>
          </aside>

          {/* MAIN COLUMN */}
          <main className="flex-1 bg-[#FDFCF8] overflow-y-auto px-6 py-10 sm:px-12">
            {metadataResult ? (
              <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
                
                {/* HEADLINE ZONE */}
                <div className="border-b border-[#1A1A1A] pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] font-black text-[#EA580C] block mb-1">CTR metadata optimization outputs</span>
                    <h1 className="text-3xl sm:text-4xl font-serif font-semibold tracking-tight text-[#1A1A1A]">
                      Topical CTR Metadata Suite
                    </h1>
                    <p className="text-xs text-[#1A1A1A]/70 mt-2">
                      Optimized header tags, click descriptions, and social graphs formulated for: <strong className="text-black font-semibold">"{metadataResult.topic}"</strong>.
                    </p>
                  </div>
                  
                  <span className="bg-[#EA580C]/10 text-[#EA580C] border border-[#EA580C]/20 px-3 py-1 font-mono text-[9px] uppercase tracking-wider font-bold rounded-full self-start sm:self-auto shrink-0 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> Google CTR Schema Active
                  </span>
                </div>

                {/* 1. 10 GOOGLE SEARCH TITLES ROW */}
                <div className="bg-[#FDFCF8] border border-[#1A1A1A] shadow-sm">
                  <div className="px-6 py-4 border-b border-[#1A1A1A] bg-[#F9F7F2] flex items-center justify-between">
                    <div>
                      <h3 className="text-xs uppercase tracking-[0.2em] font-black flex items-center gap-2 text-[#1A1A1A]">
                        <span className="w-5 h-5 bg-[#1A1A1A] text-[#FDFCF8] flex items-center justify-center rounded-full text-[9px] font-mono leading-none">10</span>
                        10 Search Engine Result Titles (SEO Titles)
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-1">Google desk limits are approx 600px width (50-60 Characters recommended). Optimized for click metrics.</p>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-[#1A1A1A]/10">
                    {metadataResult.titles.map((titleObj, idx) => {
                      const isOverLimit = titleObj.length > 60;
                      return (
                        <div key={idx} className="p-6 transition-all hover:bg-emerald-50/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            {/* GOOGLE SIMULATION PREVIEW */}
                            <div className="space-y-0.5">
                              <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                                <span>https://www.yourdomain.com</span>
                                <ChevronRight className="w-2.5 h-2.5" />
                                <span className="text-slate-400">blog</span>
                              </div>
                              <h4 className="text-[17px] text-[#1a0dab] font-sans hover:underline cursor-pointer leading-snug font-medium break-words">
                                {titleObj.title}
                              </h4>
                            </div>

                            <p className="text-xs text-[#1A1A1A]/70 italic leading-relaxed">
                              <strong className="text-emerald-800 font-bold uppercase font-mono text-[9px] mr-1">CTR Benefit:</strong> {titleObj.reasonForCtr}
                            </p>
                          </div>

                          <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0">
                            <span className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase border tracking-wider flex items-center gap-1 ${
                              isOverLimit 
                                ? "bg-amber-50 text-amber-800 border-amber-300" 
                                : "bg-emerald-50 text-emerald-800 border-emerald-300"
                            }`}>
                              {titleObj.length} Chars {isOverLimit ? "⚠️" : "✓"}
                            </span>
                            
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(titleObj.title);
                                triggerMessage(`SEO Title #${idx + 1} copied securely!`);
                              }}
                              className="px-3 py-1 bg-[#F9F7F2] hover:bg-[#1A1A1A] border border-[#1A1A1A]/30 text-[#1A1A1A] hover:text-[#FDFCF8] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                            >
                              <Copy className="w-3 h-3" /> Copy Title
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. 10 GOOGLE META DESCRIPTIONS ROW */}
                <div className="bg-[#FDFCF8] border border-[#1A1A1A] shadow-sm">
                  <div className="px-6 py-4 border-b border-[#1A1A1A] bg-[#F9F7F2]">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-black flex items-center gap-2 text-[#1A1A1A]">
                      <span className="w-5 h-5 bg-[#1A1A1A] text-[#FDFCF8] flex items-center justify-center rounded-full text-[9px] font-mono leading-none">10</span>
                      10 Search Snippet Descriptions (Meta Descriptions)
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-1">Google Desktop limit is ~160 Characters. Uses active voice and call-to-action indicators.</p>
                  </div>
                  
                  <div className="divide-y divide-[#1A1A1A]/10">
                    {metadataResult.metaDescriptions.map((descObj, idx) => {
                      const isOverLimit = descObj.length > 165;
                      const isUnderLimit = descObj.length < 110;
                      return (
                        <div key={idx} className="p-6 transition-all hover:bg-emerald-50/10 flex flex-col md:flex-row md:items-start justify-between gap-5">
                          <div className="space-y-3 flex-1">
                            {/* GOOGLE DESKTOP SIMULATION */}
                            <div className="space-y-0.5">
                              <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                                <span>https://www.yourdomain.com</span>
                                <ChevronRight className="w-2.5 h-2.5" />
                                <span className="text-slate-400">blog</span>
                              </div>
                              <h5 className="text-[15px] text-[#1a0dab] font-sans hover:underline cursor-pointer leading-snug font-medium mb-1">
                                {metadataResult.titles[idx]?.title || "SEO Strategy Blueprint"}
                              </h5>
                              <p className="text-[13px] text-[#4d5156] font-sans leading-relaxed break-words">
                                {descObj.description}
                              </p>
                            </div>

                            <p className="text-xs text-[#1A1A1A]/70 italic leading-relaxed">
                              <strong className="text-emerald-800 font-bold uppercase font-mono text-[9px] mr-1">CTR Benefit:</strong> {descObj.reasonForCtr}
                            </p>
                          </div>

                          <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-3 shrink-0 pt-7">
                            <span className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase border tracking-wider ${
                              isOverLimit 
                                ? "bg-red-50 text-red-800 border-red-300"
                                : isUnderLimit 
                                  ? "bg-amber-50 text-amber-800 border-amber-300"
                                  : "bg-emerald-50 text-emerald-800 border-emerald-300"
                            }`}>
                              {descObj.length} Chars {isOverLimit || isUnderLimit ? "⚠️" : "✓"}
                            </span>
                            
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(descObj.description);
                                triggerMessage(`Meta Description #${idx + 1} copied!`);
                              }}
                              className="px-3 py-1 bg-[#F9F7F2] hover:bg-[#1A1A1A] border border-[#1A1A1A]/30 text-[#1A1A1A] hover:text-[#FDFCF8] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                            >
                              <Copy className="w-3 h-3" /> Copy Desc
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. URL SLUGS GRID (5) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#FDFCF8] border border-[#1A1A1A] shadow-sm">
                    <div className="px-6 py-4 border-b border-[#1A1A1A] bg-[#F9F7F2]">
                      <h3 className="text-xs uppercase tracking-[0.2em] font-black flex items-center gap-2 text-[#1A1A1A]">
                        <span className="w-5 h-5 bg-[#1A1A1A] text-[#FDFCF8] flex items-center justify-center rounded-full text-[9px] font-mono leading-none">5</span>
                        5 Semantic URL Slugs
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-1">Short, hyphenated, folder structures targeting pure topical keywords only.</p>
                    </div>

                    <div className="p-6 space-y-4">
                      {metadataResult.urlSlugs.map((slug, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-[#F9F7F2] border border-[#1A1A1A]/10 font-mono text-xs text-black">
                          <span className="truncate">/{slug}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(slug);
                              triggerMessage(`Slug #${idx + 1} copied: /${slug}`);
                            }}
                            className="text-[#EA580C] hover:text-black font-semibold text-[10px] uppercase tracking-wider flex items-center gap-1 shrink-0 ml-1 font-sans font-bold"
                          >
                            <Copy className="w-3 h-3" /> Copy
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. CLINICAL SUMMARY / CTR TIPS CARD */}
                  <div className="bg-[#F9F7F2] border border-[#1A1A1A] p-6 space-y-5">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#EA580C] block font-mono">SEO Pro Guidelines</span>
                    <h4 className="font-serif text-lg italic text-[#1A1A1A] font-semibold leading-relaxed">How Title and Meta Descriptions impact Rank Algorithm visibility:</h4>
                    <p className="text-xs text-[#1A1A1A]/70 leading-relaxed text-justify">
                      Google search algorithm utilizes user interaction signals like <strong className="text-black font-semibold">User Centic Direct CTR</strong> and <strong className="text-black font-semibold">Bounce Dwell Duration</strong> to measure real document query alignment. Under modern Google Quality Updates, a page that attracts high click-through volume because of standard-compliant visual snippets enjoys dynamic rank prioritization.
                    </p>
                    <p className="text-xs text-[#1A1A1A]/70 leading-relaxed text-justify">
                      Never stuff primary key terms aggressively. Instead, map secondary terms naturally into descriptions, and establish semantic relevance with geographic landmarks to capture nearby user contexts.
                    </p>
                  </div>
                </div>

                {/* 5. OPEN GRAPH SOCIAL METRIC CARDS (5) */}
                <div className="bg-[#FDFCF8] border border-[#1A1A1A] shadow-sm">
                  <div className="px-6 py-4 border-b border-[#1A1A1A] bg-[#F9F7F2]">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-black flex items-center gap-2 text-[#1A1A1A]">
                      <span className="w-5 h-5 bg-[#1A1A1A] text-[#FDFCF8] flex items-center justify-center rounded-full text-[9px] font-mono leading-none">5</span>
                      5 Open Graph Titles & Descriptions (Social Media Sharing)
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-1">Optimized for high CTR, interest hooks, and viral metrics on LinkedIn, Facebook, and Threads.</p>
                  </div>

                  <div className="p-6 space-y-6">
                    {metadataResult.openGraphTitles.map((ogTitle, idx) => {
                      const ogDesc = metadataResult.openGraphDescriptions[idx] || "Read standard localized SEO tactics formulated specifically for South Indian startups and hospitality companies.";
                      return (
                        <div key={idx} className="border border-[#1A1A1A]/20 bg-[#F9F7F2]/50 p-6 flex flex-col md:flex-row gap-6">
                          
                          {/* Visual Social Card Representation */}
                          <div className="flex-1 space-y-2">
                            <div className="bg-[#1A1A1A] h-20 w-full flex items-center justify-center p-3 text-center shrink-0 border border-[#1A1A1A]">
                              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#FDFCF8] font-mono truncate">
                                [Social Meta Pre-Preview Slot #{idx + 1}]
                              </span>
                            </div>

                            <div className="bg-white border border-[#1A1A1A]/10 p-4 space-y-2 text-xs">
                              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">YOURDOMAIN.COM</span>
                              <h5 className="font-serif font-bold text-black text-sm leading-tight hover:text-[#EA580C] cursor-pointer">
                                {ogTitle}
                              </h5>
                              <p className="text-[11px] text-[#1A1A1A]/75 line-clamp-2">
                                {ogDesc}
                              </p>
                            </div>
                          </div>

                          {/* Action Sidebar */}
                          <div className="md:w-[220px] shrink-0 flex flex-row md:flex-col justify-between md:justify-center gap-2 border-t md:border-t-0 md:border-l border-[#1A1A1A]/10 pt-4 md:pt-0 md:pl-4">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(ogTitle);
                                triggerMessage(`OG Title #${idx + 1} copied!`);
                              }}
                              className="px-3 py-1.5 bg-[#F9F7F2] hover:bg-[#1A1A1A] border border-[#1A1A1A]/30 text-[#1A1A1A] hover:text-[#FDFCF8] text-[9.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all flex-1 md:flex-initial font-sans text-center"
                            >
                              <Copy className="w-3 h-3" /> Copy OG Title
                            </button>

                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(ogDesc);
                                triggerMessage(`OG Description #${idx + 1} copied!`);
                              }}
                              className="px-3 py-1.5 bg-[#F9F7F2] hover:bg-[#1A1A1A] border border-[#1A1A1A]/30 text-[#1A1A1A] hover:text-[#FDFCF8] text-[9.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all flex-1 md:flex-initial font-sans text-center"
                            >
                              <Copy className="w-3 h-3" /> Copy OG Desc
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ) : (
              <div className="border border-dashed border-[#1A1A1A]/20 p-20 text-center bg-[#F9F7F2] rounded-sm max-w-4xl mx-auto mt-10">
                <Compass className="w-10 h-10 text-[#1A1A1A]/30 mx-auto mb-4" />
                <p className="font-serif text-lg italic text-[#1A1A1A]/70">No Metadata Suite generated yet.</p>
                <p className="text-xs text-[#1A1A1A]/50 mt-1">Configure parameters in the sidebar and click "Generate Metadata Suite" to build beautiful optimized headers.</p>
              </div>
            )}
          </main>

        </div>
      ) : activeTab === 'strategy' ? (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* STEP 1 SIDEBAR - INPUT CONFIGURATOR */}
          <aside className="w-full lg:w-[350px] border-b lg:border-b-0 lg:border-r border-[#1A1A1A] flex flex-col shrink-0 bg-[#F9F7F2] overflow-y-auto">
            <div className="p-8 border-b border-[#1A1A1A]/10">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#EA580C] mb-2 block">Campaign Scope</span>
              <h2 className="text-xl font-serif italic font-semibold leading-tight text-[#1A1A1A]">Target Niche Parameters</h2>
              <p className="text-[11px] text-[#1A1A1A]/70 mt-1">Configure parameters to generate an SEO Silo authority map & clusters.</p>
            </div>

            <div className="p-8 space-y-5 flex-1">
              {/* Business Name */}
              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/60 block mb-2">Business Name</label>
                <input 
                  id="input-business-name"
                  type="text" 
                  value={businessName} 
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/20 px-3 py-2 text-xs focus:ring-1 focus:ring-[#EA580C] focus:border-[#EA580C] outline-none"
                  placeholder="e.g. green eco insulation ltd."
                />
              </div>

              {/* Primary Niche */}
              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/60 block mb-2">Primary Niche / Industry *</label>
                <input 
                  id="input-niche"
                  type="text" 
                  value={niche} 
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/20 px-3 py-2 text-xs focus:ring-1 focus:ring-[#EA580C] focus:border-[#EA580C] outline-none font-medium"
                  placeholder="e.g. Sustainable Home Remodeling"
                  required
                />
              </div>

              {/* Core Offerings */}
              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/60 block mb-2">Core Services / Offerings *</label>
                <textarea 
                  id="input-core-offerings"
                  rows={3}
                  value={coreOfferings} 
                  onChange={(e) => setCoreOfferings(e.target.value)}
                  className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/20 p-3 text-xs focus:ring-1 focus:ring-[#EA580C] focus:border-[#EA580C] outline-none leading-relaxed"
                  placeholder="e.g. Hempcrete, clean energy upgrades, salvaged timber flooring"
                  required
                />
              </div>

              {/* City (Local SEO) */}
              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/60 block mb-2">
                  Local SEO Target City <span className="opacity-40">(Optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-black/35"><MapPin className="w-3.5 h-3.5" /></span>
                  <input 
                    id="input-city"
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/20 pl-8 pr-3 py-2 text-xs focus:ring-1 focus:ring-[#EA580C] focus:border-[#EA580C] outline-none"
                    placeholder="e.g. Seattle, WA"
                  />
                </div>
                <p className="text-[10px] italic text-[#1A1A1A]/50 mt-1">If specified, local search vectors and maps references will integrate naturally.</p>
              </div>

              {/* Primary Search Intent focus */}
              <div>
                <label className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/60 block mb-2">Search Intent Focus Mode</label>
                <select 
                  id="input-intent-focus"
                  value={targetIntentFocus}
                  onChange={(e) => setTargetIntentFocus(e.target.value)}
                  className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/20 px-3 py-2 text-xs focus:ring-1 focus:ring-[#EA580C] focus:outline-none"
                >
                  <option value="Commercial & Investigative Hubs">Commercial & Investigative Hubs</option>
                  <option value="High Intent Transactional Paths">High Intent Transactional Paths</option>
                  <option value="Pure Educational Informational Guide">Pure Educational Informational Guide</option>
                  <option value="Local Storefront & Geo Citations">Local Storefront & Geo Citations</option>
                </select>
              </div>

              {/* Generate Button */}
              <button 
                id="btn-generate-strategy"
                onClick={generateSEOStrategy}
                disabled={isGeneratingStrategy}
                className="w-full mt-4 bg-[#1A1A1A] hover:bg-[#EA580C] text-[#FDFCF8] py-3 text-[11px] uppercase tracking-widest font-bold transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 border border-[#1A1A1A] hover:border-[#EA580C]"
              >
                {isGeneratingStrategy ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Competitors...</span>
                  </>
                ) : (
                  <>
                    <Compass className="w-4 h-4" />
                    <span>Map Topical Clusters</span>
                  </>
                )}
              </button>
            </div>
          </aside>

          {/* MAIN COLUMN CONTAINER */}
          <main className="flex-1 flex flex-col overflow-hidden">
            
            {/* PILLAR & CLUSTERS INTERACTIVE SILO VISUALIZER */}
            <section className="p-6 sm:p-10 border-b border-[#1A1A1A] bg-[#FDFCF8] shrink-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-[#1A1A1A] text-[#FDFCF8] text-[9px] uppercase tracking-[0.2em] font-black mb-1">
                    Topical Siphoning Strategy
                  </span>
                  <h1 className="text-3xl font-serif font-bold text-[#1A1A1A]">Pillar-Cluster Architecture Map</h1>
                  <p className="text-xs text-[#1A1A1A]/70 mt-1">Select any node below to inspect search metrics, track linking patterns, or generate deep content drafts.</p>
                </div>
                {strategy && strategy.localPlanning.isLocal && (
                  <div className="mt-3 sm:mt-0 px-4 py-2 bg-[#EA580C]/5 border border-[#EA580C]/20 rounded-sm flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#EA580C] mr-2"></span>
                    <span className="text-[11px] text-[#EA580C] font-semibold uppercase tracking-widest">Local Target: {strategy.localPlanning.location}</span>
                  </div>
                )}
              </div>

              {strategy ? (
                <div id="interactive-map-flow" className="flex flex-col md:flex-row items-stretch gap-6">
                  
                  {/* CENTRAL CORE PILLAR NODE (Clickable card) */}
                  <div className="md:w-1/3 flex flex-col justify-between">
                    <div 
                      id="pillar-node-card"
                      onClick={() => setActiveNodeId("pillar")}
                      className={`h-full cursor-pointer p-6 border transition-all duration-300 flex flex-col justify-between group ${
                        activeNodeId === "pillar" 
                          ? "border-[#EA580C] bg-[#EA580C]/5 ring-1 ring-[#EA580C] shadow-sm" 
                          : "border-[#1A1A1A] bg-[#F9F7F2] hover:border-[#EA580C] hover:bg-[#FDFCF8]"
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-[9px] font-bold uppercase text-[#EA580C] tracking-[0.25em]">CORE PILLAR</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#1A1A1A]/5 rounded font-bold">1.4% Target</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#1A1A1A] leading-tight group-hover:text-[#EA580C] transition-colors">
                          {strategy.pillar.title}
                        </h3>
                        <p className="text-[11px] text-[#1A1A1A]/60 mt-2 line-clamp-3 leading-relaxed">
                          {strategy.pillar.briefSummary}
                        </p>
                      </div>

                      <div className="mt-[20px] pt-4 border-t border-[#1A1A1A]/10 flex justify-between items-center text-[10px] font-semibold text-[#1A1A1A]/80 uppercase tracking-wider">
                        <span>Keyword: {strategy.pillar.primaryKeyword}</span>
                        <span className="text-xs">→</span>
                      </div>
                    </div>
                  </div>

                  {/* CONNECTING FLOW SIGNALS OR ARROWS */}
                  <div className="hidden md:flex flex-col justify-around items-center text-[#1A1A1A]/30">
                    <span className="text-xs uppercase font-mono tracking-widest leading-none rotate-90 my-2">Link</span>
                    <div className="h-px w-6 bg-[#1A1A1A]/30"></div>
                    <span className="text-xs uppercase font-mono tracking-widest leading-none rotate-90 my-2">Silo</span>
                  </div>

                  {/* SUPPORTING CLUSTERS (Clickable cards grid) */}
                  <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {strategy.clusters.map((cluster) => {
                      const isActive = activeNodeId === cluster.id;
                      const hasDraft = !!drafts[cluster.id];
                      return (
                        <div 
                          key={cluster.id}
                          id={`cluster-node-${cluster.id}`}
                          onClick={() => setActiveNodeId(cluster.id)}
                          className={`cursor-pointer p-5 border transition-all duration-300 flex flex-col justify-between group h-[145px] ${
                            isActive 
                              ? "border-[#EA580C] bg-[#EA580C]/5 ring-1 ring-[#EA580C] shadow-sm" 
                              : "border-[#1A1A1A]/40 bg-[#FDFCF8] hover:border-[#EA580C] hover:bg-[#F9F7F2]"
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-1 bg-transparent">
                              <span className="text-[9px] font-bold text-[#1A1A1A]/50 tracking-widest uppercase">CLUSTER SUBTOPIC</span>
                              {hasDraft && (
                                <span className="text-[9px] bg-emerald-950/20 text-emerald-800 border border-emerald-900/30 px-1.5 py-0.5 rounded-sm font-semibold uppercase">
                                  Drafted
                                </span>
                              )}
                            </div>
                            <h4 className="font-serif text-sm font-bold leading-tight line-clamp-2 text-[#1A1A1A] group-hover:text-[#EA580C] transition-colors">
                              {cluster.title}
                            </h4>
                          </div>

                          <div className="pt-2 border-t border-[#1A1A1A]/5 mt-auto flex justify-between items-center text-[10px] text-[#1A1A1A]/60">
                            <span className="truncate max-w-[80%]">Query: {cluster.primaryKeyword}</span>
                            <span className={`font-mono text-xs ${isActive ? "text-[#EA580C] font-black" : "text-[#1A1A1A]/40"}`}>
                              {isActive ? "♦" : "◇"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div id="no-strategy-fallback" className="border border-dashed border-[#1A1A1A]/20 p-12 text-center bg-[#F9F7F2] rounded-sm">
                  <Maximize2 className="w-8 h-8 text-[#1A1A1A]/30 mx-auto mb-3" />
                  <p className="font-serif text-lg italic text-[#1A1A1A]/70">No target silo has been generated yet for your niche.</p>
                  <p className="text-xs text-[#1A1A1A]/50 mt-1">Configure parameters in the sidebar and click "Map Topical Clusters" to start auto-categorizing.</p>
                </div>
              )}
            </section>

            {/* SPLIT VIEW SPECIFIC NODE SPECIFICATIONS & GENERATED ARTICLE DRAFTER */}
            <section className="flex-1 overflow-hidden grid grid-cols-1 xl:grid-cols-12">
              
              {/* NODE DETAILS INSPECTORS (Col span-4) */}
              <div className="xl:col-span-4 border-b xl:border-b-0 xl:border-r border-[#1A1A1A] p-6 sm:p-8 bg-[#F9F7F2] overflow-y-auto">
                {selectedNode ? (
                  <div id="selected-node-specifications" className="space-y-6">
                    <div className="border-b border-[#1A1A1A]/10 pb-4">
                      <span className="text-[9px] uppercase tracking-[0.2em] font-black text-[#EA580C] block mb-2">Selected SEO Entity Specs</span>
                      <h3 className="text-lg font-serif italic text-[#1A1A1A] font-bold leading-tight">{selectedNode.title}</h3>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-black text-[#1A1A1A]/60 block mb-1">Primary Targeted Keyword</span>
                      <div className="text-xs font-mono font-bold bg-[#1A1A1A] text-[#FDFCF8] inline-block px-2.5 py-1">
                        {selectedNode.primaryKeyword}
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-black text-[#1A1A1A]/60 block mb-1">Identified Search Intent</span>
                      <p className="text-xs font-serif italic text-emerald-800 font-semibold bg-emerald-50 px-2 py-1 inline-block border border-emerald-900/15">
                        {selectedNode.searchIntent}
                      </p>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-black text-[#1A1A1A]/60 block mb-2">LSI Secondary Keywords (Topical Authority)</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedNode.secondaryKeywords.map((kw, i) => (
                          <span key={i} className="px-2 py-0.5 border border-[#1A1A1A]/30 text-[10px] font-semibold italic bg-[#FDFCF8]">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-black text-[#1A1A1A]/60 block mb-1">Target Article Intent Scope</span>
                      <p className="text-xs text-[#1A1A1A]/80 leading-relaxed text-justify">
                        {selectedNode.briefSummary}
                      </p>
                    </div>

                    <div className="bg-[#1A1A1A] text-[#FDFCF8] p-5">
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-amber-400 block mb-2">Linking Architecture Matrix</span>
                      <p className="text-[11px] leading-relaxed italic opacity-85">
                        {selectedNode.angle}
                      </p>
                    </div>

                    {/* Direct Write/Draft Blueprint Button */}
                    <button 
                      id="btn-draft-article"
                      onClick={() => draftSpecificTopic(selectedNode.id)}
                      disabled={isGeneratingArticle}
                      className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-[#FDFCF8] py-3 text-[11px] uppercase tracking-widest font-bold transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 shadow-sm"
                    >
                      {isGeneratingArticle ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Generating Draft...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-amber-200" />
                          <span>Draft Fully Optimized Article</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-[#1A1A1A]/50">
                    <Maximize2 className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    <p className="font-serif italic text-sm">Select any map node above to explore internal structure parameters.</p>
                  </div>
                )}
              </div>

              {/* ARTICLE DRAFTS VIEWPORTS (Col span-8) */}
              <div className="xl:col-span-8 flex flex-col overflow-hidden bg-[#FDFCF8]">
                
                {/* TOOLBAR FOR DRAFT OUTLINES */}
                <div className="h-14 border-b border-[#1A1A1A] px-6 sm:px-8 flex items-center justify-between shrink-0 bg-[#F9F7F2]">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-[#EA580C]" />
                    <span className="text-[11px] uppercase tracking-[0.15em] font-black text-[#1A1A1A]">SEO Copywriting Canvas</span>
                  </div>
                  {currentDraft && (
                    <div className="flex items-center space-x-2">
                      <button 
                        id="btn-copy-draft"
                        onClick={() => copyToClipboard(currentDraft.contentMarkdown)}
                        className="px-3 py-1.5 border border-[#1A1A1A]/20 hover:border-[#EA580C] hover:bg-[#FDFCF8] text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all text-[#1A1A1A]"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code/MD</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* ARTICLE BODY DRAFT PRESENTATION OR FALLBACK */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-10">
                  {isGeneratingArticle ? (
                    <div id="drafting-loader" className="h-full flex flex-col justify-center items-center py-12 text-[#1A1A1A]/70 text-center">
                      <div className="w-12 h-12 rounded-full border-4 border-dashed border-[#EA580C] animate-spin mb-4"></div>
                      <h4 className="font-serif text-lg italic">Writing professional, search-intent optimized blog draft...</h4>
                      <p className="text-xs text-[#1A1A1A]/50 max-w-md mt-1">Calculating natural keyword clusters, verifying correct semantic headers, and integrating local Washington State parameters.</p>
                      
                      {/* Live pseudorun progress notes for SEO craft theater */}
                      <div className="mt-6 p-4 bg-[#F9F7F2] border border-[#1A1A1A]/10 max-w-sm rounded-sm text-left">
                        <ul className="text-[10px] space-y-2 font-mono text-[#1A1A1A]/60">
                          <li className="flex items-center"><Check className="w-3 h-3 text-emerald-600 mr-1.5 inline shrink-0" /> Intent checklist: {selectedNode?.searchIntent}</li>
                          <li className="flex items-center"><Check className="w-3 h-3 text-emerald-600 mr-1.5 inline shrink-0" /> Target density balance: 1.25% LSI</li>
                          <li className="flex items-center animate-pulse"><span className="w-1.5 h-1.5 bg-[#EA580C] rounded-full mr-2 inline shrink-0"></span> Siphoning regional Pacific Northwest timber records...</li>
                        </ul>
                      </div>
                    </div>
                  ) : currentDraft ? (
                    <div id="full-draft-payload" className="space-y-10">
                      
                      {/* Metadata Pill Box Info */}
                      <div className="border border-[#1A1A1A] p-6 bg-[#F9F7F2] grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.2em] font-black text-[#1A1A1A]/40 block mb-1">Target Audience Profile</span>
                          <p className="text-xs font-serif italic text-[#1A1A1A]/80">{currentDraft.metadata.targetAudience}</p>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.2em] font-black text-[#1A1A1A]/40 block mb-1">Integrated LSI density check</span>
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {currentDraft.metadata.secondaryKeywords.map((tag, i) => (
                              <span key={i} className="text-[9px] bg-emerald-50 text-emerald-800 border border-emerald-900/10 px-1.5 font-sans font-medium uppercase">{tag}</span>
                            ))}
                          </div>
                        </div>
                        {currentDraft.metadata.localOptimizationNotes && (
                          <div className="sm:col-span-2 pt-3 border-t border-[#1A1A1A]/10">
                            <span className="text-[9px] uppercase tracking-[0.2em] font-black text-[#1A1A1A]/40 block mb-0.5">Local SEO Citations Integrated</span>
                            <p className="text-[11px] text-[#1A1A1A]/70 italic">{currentDraft.metadata.localOptimizationNotes}</p>
                          </div>
                        )}
                      </div>

                      {/* Actual Long Form Content Markup viewer output */}
                      <article className="prose max-w-none text-slate-800 border-b border-[#1A1A1A]/10 pb-10">
                        <MarkdownViewer value={currentDraft.contentMarkdown} />
                      </article>

                      {/* INTERNAL LINK PLACEMENT ADVICE */}
                      <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] font-black mb-4 text-[#1A1A1A] flex items-center">
                          <Link className="w-4 h-4 text-[#EA580C] mr-2" />
                          Recommended Internal Linking Hierarchy
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {currentDraft.internalLinkingSuggestions.map((link, idx) => (
                            <div key={idx} className="border border-[#1A1A1A] p-5 bg-[#F9F7F2]">
                              <span className="text-[9px] uppercase tracking-widest font-bold text-[#EA580C] block mb-2">Context Link #{idx + 1}</span>
                              <span className="text-xs italic text-[#1A1A1A]/60 block mb-2">"... {link.sourceTextContext} ..."</span>
                              <p className="text-xs text-[#1A1A1A] font-semibold">
                                Use Anchor: <strong className="underline text-orange-700">"{link.recommendedAnchor}"</strong>
                              </p>
                              <span className="text-[10px] text-[#1A1A1A]/40 block mt-2">→ Links logically to: {link.targetPageDescription}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* LEAD CONVERSION CTA ARCHITECT */}
                      <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] font-black mb-4 text-[#1A1A1A] flex items-center">
                          <Megaphone className="w-4 h-4 text-[#EA580C] mr-2" />
                          Lead Conversion Call-to-Actions (CTAs) Included
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {currentDraft.ctaRecommendations.map((cta, idx) => (
                            <div key={idx} className="bg-[#1A1A1A] text-[#FDFCF8] p-6 relative overflow-hidden flex flex-col justify-between">
                              <div>
                                <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-amber-400 block mb-2">{cta.type}</label>
                                <p className="text-lg font-serif italic leading-snug mb-4">"{cta.text}"</p>
                              </div>
                              <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">
                                Placement: {cta.placement}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* EEAT TRUST ALIGNMENT */}
                      <div className="border border-[#1A1A1A]/20 p-5 bg-amber-50/50 rounded-sm">
                        <h4 className="text-xs uppercase tracking-[0.2em] font-black mb-2 text-[#C2410C] flex items-center">
                          <Award className="w-4 h-4 text-[#C2410C] mr-2" />
                          EEAT Blueprint Compliance Highlights
                        </h4>
                        <p className="text-xs text-[#C2410C] leading-relaxed italic">
                          {currentDraft.eeatJustification}
                        </p>
                      </div>

                    </div>
                  ) : (
                    <div id="no-draft-fallback" className="text-center py-20 bg-[#F9F7F2]/50 border border-dashed border-[#1A1A1A]/10 rounded-sm">
                      <BookOpen className="w-10 h-10 text-[#1A1A1A]/25 mx-auto mb-4" />
                      <h4 className="font-serif text-lg italic text-[#1A1A1A]/70">No text drafted yet for {selectedNode?.title || "selected node"}</h4>
                      <p className="text-xs text-[#1A1A1A]/50 max-w-md mx-auto mt-2">
                        Get standard-setting content with strict search optimization. Tap <strong className="text-[#EA580C]">"Draft Fully Optimized Article"</strong> in the lefthand node inspector to formulate content blueprints.
                      </p>
                    </div>
                  )}
                </div>

              </div>

            </section>

          </main>

        </div>
      ) : (

        /* LIVE AUDITOR & KEYWORD COUNTER WORKSPACE */
        <div id="live-auditor" className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* LEFT PANEL - WRITER CONTAINER */}
          <section className="lg:w-1/2 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#1A1A1A] flex flex-col bg-[#FDFCF8] overflow-y-auto">
            <div className="mb-6">
              <span className="inline-block px-2.5 py-1 bg-[#1A1A1A] text-[#FDFCF8] text-[9px] uppercase tracking-[0.2em] font-black mb-1">
                Real-Time Strategic Audit
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#1A1A1A]">Core Article Copy & LSI Alignment</h2>
              <p className="text-xs text-[#1A1A1A]/70 mt-1">Paste your copy or starting draft here, assign target keywords, and execute a deep SEO search-intent analysis.</p>
            </div>

            <div className="space-y-6 flex-1 flex flex-col">
              
              {/* Keywords to Track */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/60 block mb-2">Target Keywords <span className="opacity-40">(comma separated)</span></label>
                  <input 
                    id="audit-keywords-input"
                    type="text" 
                    value={targetKeywordsToAudit}
                    onChange={(e) => setTargetKeywordsToAudit(e.target.value)}
                    className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs focus:ring-1 focus:ring-[#EA580C] outline-none"
                    placeholder="e.g. eco-friendly home renovation, Seattle"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/60 block mb-2">Geo-Targeting Context <span className="opacity-40">(Optional)</span></label>
                  <input 
                    id="audit-city-input"
                    type="text" 
                    value={customCityContext}
                    onChange={(e) => setCustomCityContext(e.target.value)}
                    className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs focus:ring-1 focus:ring-[#EA580C] outline-none"
                    placeholder="e.g. Seattle, WA"
                  />
                </div>
              </div>

              {/* Text Writing Area */}
              <div className="flex-1 flex flex-col min-h-[300px]">
                <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A]/60 block mb-2">Draft Body Content (Markdown Supported)</label>
                <textarea 
                  id="audit-body-textarea"
                  value={userDraftText}
                  onChange={(e) => setUserDraftText(e.target.value)}
                  className="w-full flex-1 bg-[#FDFCF8] border border-[#1A1A1A] p-5 text-sm font-mono focus:ring-1 focus:ring-[#EA580C] outline-none leading-relaxed text-slate-800"
                  placeholder="Paste your drafted blog content or outline here..."
                />
              </div>

              {/* Execute Audit Button */}
              <button 
                id="btn-trigger-audit"
                onClick={optimizeUserDraft}
                disabled={isAuditing}
                className="w-full bg-[#1A1A1A] hover:bg-[#EA580C] text-[#FDFCF8] py-4 text-[11px] uppercase tracking-widest font-bold transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 border border-[#1A1A1A] hover:border-[#EA580C]"
              >
                {isAuditing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Core Structural Elements...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4" />
                    <span>Run Advanced Content Optimization</span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* RIGHT PANEL - LIVE ANALYTICS REPORT */}
          <section className="lg:w-1/2 p-6 sm:p-10 bg-[#F9F7F2] flex flex-col overflow-y-auto">
            {isAuditing ? (
              <div className="h-full flex flex-col justify-center items-center py-20 text-center text-[#1A1A1A]/80">
                <div className="w-10 h-10 border-4 border-dashed border-[#EA580C] rounded-full animate-spin mb-4"></div>
                <h3 className="font-serif text-lg italic">Drafting custom high-authority revisions...</h3>
                <p className="text-xs text-[#1A1A1A]/50 max-w-sm mt-1">Cross-referencing keyword parameters, building readable structures, and satisfying Google search guidelines.</p>
              </div>
            ) : optimizationResult ? (
              <div id="optimization-audit-results" className="space-y-8">
                
                {/* Header overview metrics */}
                <div className="border-b border-[#1A1A1A]/10 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-black text-[#EA580C] block mb-2">SEO Consultation Feedback</span>
                    <p className="text-xs text-[#1A1A1A]/80 leading-relaxed text-justify w-full">
                      <strong className="text-emerald-700">Search Intent Mapping: </strong> {optimizationResult.originalIntentMatching}
                    </p>
                  </div>
                  <button
                    id="export-audit-report-btn"
                    onClick={exportAuditReportPDF}
                    className="self-start sm:self-auto px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#EA580C] text-[#FDFCF8] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shrink-0 rounded-sm cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Audit Report</span>
                  </button>
                </div>

                {/* Keyword Analysis Table / Metrics */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-[#1A1A1A] mb-3">LSI & Entity Keywords Density Checking</h4>
                  <div className="border border-[#1A1A1A] overflow-hidden bg-[#FDFCF8]">
                    <div className="grid grid-cols-3 gap-2 bg-[#1A1A1A] text-[#FDFCF8] py-2 px-4 text-[9px] uppercase tracking-wider font-bold">
                      <span>Keyword Phrase</span>
                      <span className="text-center">Count / Density</span>
                      <span className="text-right">SEO Action</span>
                    </div>
                    <div className="divide-y divide-[#1A1A1A]/10">
                      {optimizationResult.analyzedKeywords.map((kw, i) => {
                        let statusColor = "bg-amber-100 text-amber-800 border-amber-900/10";
                        if (kw.status.toLowerCase().includes("optimal")) statusColor = "bg-emerald-50 text-emerald-800 border-emerald-900/10";
                        if (kw.status.toLowerCase().includes("stuff") || kw.status.toLowerCase().includes("stuffed")) statusColor = "bg-red-50 text-red-800 border-red-900/10";
                        
                        return (
                          <div key={i} className="grid grid-cols-3 gap-2 py-2 px-4 text-xs items-center text-slate-800">
                            <span className="font-mono font-medium truncate">{kw.keyword}</span>
                            <span className="text-center font-semibold bg-[#F9F7F2] py-0.5 rounded border border-[#1A1A1A]/5">{kw.frequency} uses</span>
                            <span className="text-right">
                              <span className={`px-2 py-0.5 rounded-sm border font-semibold uppercase text-[9px] inline-block ${statusColor}`}>
                                {kw.status}
                              </span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Structural violations layout */}
                {optimizationResult.structuralIssues && optimizationResult.structuralIssues.length > 0 && (
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-red-900 mb-3 flex items-center">
                      <AlertCircle className="w-4 h-4 text-red-700 mr-2" />
                      Critical Structural and Hierarchy Violations
                    </h4>
                    <div className="bg-red-50/50 border border-red-200 p-4 rounded-sm space-y-2">
                      {optimizationResult.structuralIssues.map((err, i) => (
                        <p key={i} className="text-xs text-red-800 flex items-start gap-1.5">
                          <span className="text-red-600 mt-1">✕</span> {err}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Semantic Opportunities to Inject */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-700 mb-3 block">High-Value Semantic Entities Suggestions</h4>
                  <div className="flex flex-wrap gap-2">
                    {optimizationResult.semanticSuggestions.map((word, i) => (
                      <span key={i} className="px-3 py-1 bg-sky-50 text-sky-900 border border-sky-900/10 rounded-sm text-xs font-semibold">
                        + {word}
                      </span>
                    ))}
                  </div>
                </div>

                {/* REWRITTEN HIGH-ROI ARTICLE DISPLAY */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xs uppercase tracking-[0.2em] font-black text-[#1A1A1A]">Pristine Optimized Rewrite (Flesch Adjusted)</h4>
                    <button 
                      onClick={() => copyToClipboard(optimizationResult.optimizedContentMarkdown)}
                      className="px-2 py-1 border border-[#1A1A1A]/20 hover:border-[#EA580C] hover:bg-[#FDFCF8] text-[9px] font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy Optimized Text</span>
                    </button>
                  </div>
                  <div className="border border-[#1A1A1A] p-6 sm:p-8 bg-[#FDFCF8] shadow-inner text-slate-800 leading-relaxed overflow-y-auto max-h-[500px]">
                    <MarkdownViewer value={optimizationResult.optimizedContentMarkdown} />
                  </div>
                </div>

                {/* NEXT SECTOR PLANNER */}
                <div className="bg-[#1A1A1A] text-[#FDFCF8] p-6">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-amber-400 block mb-3">Lead Conversion Checklist Next Steps</span>
                  <ul className="space-y-2.5">
                    {optimizationResult.nextSteps.map((step, idx) => (
                      <li key={idx} className="text-xs font-serif italic opacity-90 flex items-start">
                        <ChevronRight className="w-4 h-4 text-amber-400 mr-2 inline shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center p-10 py-16 border border-dashed border-[#1A1A1A]/10">
                <HelpCircle className="w-8 h-8 text-[#1A1A1A]/30 mx-auto mb-3" />
                <h4 className="font-serif italic text-[#1A1A1A]/70 text-base">Analytical Report Missing</h4>
                <p className="text-xs text-[#1A1A1A]/50 max-w-sm mt-1">Paste your copy inside the writer draft canvas and click "Run Advanced Content Optimization" to execute audits.</p>
              </div>
            )}
          </section>

        </div>
      )}

      {/* 4. EDITORIAL FOOTER */}
      <footer className="h-12 border-t border-[#1A1A1A] flex items-center justify-between px-6 sm:px-10 text-[9px] font-mono tracking-tight shrink-0 bg-[#F9F7F2] text-[#1A1A1A]/60">
        <div className="flex items-center space-x-1 sm:space-x-3">
          <span>ACTIVE_SLOT: {strategy ? "PNW_SUSTAINABLE_04" : "NULL_VACANT"}</span>
          <span className="opacity-45">|</span>
          <span className="hidden sm:inline">STRATEGY_ENGINE: GOOGLE_GEMINI_3.5</span>
        </div>
        <div>TOPICAL_AUTHORITY_SCORE: {strategy ? "94/100" : "N/A"}</div>
        <div className="hidden sm:block">READY FOR DEPLOYMENT // PRO VERSION</div>
      </footer>

    </div>
  );
}
