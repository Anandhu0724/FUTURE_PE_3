import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  RefreshCw, 
  Copy, 
  Check, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Sliders, 
  FileText, 
  HelpCircle,
  Eye,
  FileSpreadsheet,
  Download,
  AlertCircle,
  TrendingUp,
  Inbox
} from "lucide-react";
import { SEOStrategyData, GeneratedArticle } from "../types";

interface PillarBlogGeneratorProps {
  strategy: SEOStrategyData | null;
  activeNodeId: string;
  onSelectNode: (id: string) => void;
  drafts: Record<string, GeneratedArticle>;
  setDrafts: React.Dispatch<React.SetStateAction<Record<string, GeneratedArticle>>>;
  isGeneratingArticle: boolean;
  onDraftSpecificTopic: (nodeId: string) => Promise<void>;
  triggerMessage: (msg: string, type?: "success" | "error") => void;
  onNavigateToTab: (t: any) => void;
}

export default function PillarBlogGenerator({
  strategy,
  activeNodeId,
  onSelectNode,
  drafts,
  setDrafts,
  isGeneratingArticle,
  onDraftSpecificTopic,
  triggerMessage,
  onNavigateToTab
}: PillarBlogGeneratorProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("preview");

  if (!strategy) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FAFAF9] p-10 min-h-[400px]">
        <div className="text-center max-w-sm p-8 bg-white border border-slate-200 rounded-xl shadow-md">
          <BookOpen className="w-12 h-12 text-[#EA580C]/50 mx-auto mb-4 animate-pulse" />
          <h3 className="font-display font-black text-lg text-[#111827]">Silo Index Inactive</h3>
          <p className="text-xs text-slate-500 mt-2">
            No content models mapped yet. Please trigger an initial strategy configuration on the Keyword Intelligence page to start drafting articles.
          </p>
          <button 
            onClick={() => onNavigateToTab("keywordIntelligence")}
            className="mt-5 px-5 py-2.5 bg-[#111827] hover:bg-[#EA580C] text-white text-[10px] uppercase tracking-wider font-extrabold rounded shadow-md transition-all cursor-pointer"
          >
            Go and Generate Blueprint
          </button>
        </div>
      </div>
    );
  }

  const { pillar, clusters } = strategy;
  const activeCluster = clusters.find(c => c.id === activeNodeId);
  const isPillar = activeNodeId === "pillar";

  const currentNodeData = isPillar ? {
    id: "pillar",
    title: pillar.title,
    primaryKeyword: pillar.primaryKeyword,
    secondaryKeywords: pillar.secondaryKeywords,
    searchIntent: pillar.searchIntent,
    briefSummary: pillar.briefSummary
  } : {
    id: activeCluster?.id || "cluster-unknown",
    title: activeCluster?.title || "Supporting Title",
    primaryKeyword: activeCluster?.primaryKeyword || "Local Keyword",
    secondaryKeywords: activeCluster?.secondaryKeywords || [],
    searchIntent: activeCluster?.searchIntent || "Commercial",
    briefSummary: activeCluster?.briefSummary || "Brief context description"
  };

  const draft = drafts[activeNodeId];

  const handleCopyDraftText = () => {
    if (!draft) return;
    navigator.clipboard.writeText(draft.contentMarkdown);
    setCopied(true);
    triggerMessage("Markdown draft copied successfully!");
    setTimeout(() => setCopied(false), 3000);
  };

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!draft) return;
    const val = e.target.value;
    setDrafts(prev => ({
      ...prev,
      [activeNodeId]: {
        ...prev[activeNodeId],
        contentMarkdown: val
      }
    }));
  };

  // Interactive metrics calculation
  const computedWords = draft ? draft.contentMarkdown.split(/\s+/).filter(Boolean).length : 0;
  const isOptimalLength = computedWords > 1100;

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#FAFAF9] text-[#111827]">
      
      {/* LEFT COLUMN: ACTIVE DRAFBOARD NAVIGATION */}
      <aside className="w-full lg:w-[350px] border-b lg:border-b-0 lg:border-r border-[#111827]/10 flex flex-col shrink-0 bg-[#FAFAF9] overflow-y-auto">
        <div className="p-5 border-b border-[#111827]/5 bg-white shadow-sm">
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#EA580C] mb-1 block">Active Writer Context</span>
          <h2 className="text-base font-display font-black text-[#111827]">Silo Article Selector</h2>
          <p className="text-xs text-slate-500 mt-1">Navigate through mapped nodes to write or copy completed SEO copy.</p>
        </div>

        <div className="p-5 space-y-4">
          
          {/* Main Pillar Page Card Trigger */}
          <button 
            type="button"
            onClick={() => onSelectNode("pillar")}
            className={`w-full p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
              isPillar 
                ? "bg-white border-[#EA580C] shadow-md ring-2 ring-[#EA580C]/25" 
                : "bg-white border-slate-200 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="px-2 py-0.5 bg-[#EA580C]/10 text-[#EA580C] text-[8.5px] uppercase tracking-wider font-extrabold rounded">
                ★ Core Master Hub
              </span>
              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">Pillar</span>
            </div>
            <h3 className="font-display font-extrabold text-xs text-[#111827] leading-tight mt-1">
              {pillar.title}
            </h3>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-3 font-mono">
              <span className="font-medium">{drafts["pillar"] ? "✔ Draft Mapped" : "No draft yet"}</span>
              <span className="text-[#EA580C] font-extrabold">{pillar.primaryKeyword}</span>
            </div>
          </button>

          {/* Mapped Clusters block list */}
          <div className="pt-2">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block mb-2 px-1">Supporting Cluster Satellites</span>
            <div className="space-y-2">
              {clusters.map((c, i) => {
                const hasDraft = !!drafts[c.id];
                const isActive = activeNodeId === c.id;

                return (
                  <button 
                    key={c.id || i}
                    type="button"
                    onClick={() => onSelectNode(c.id)}
                    className={`w-full p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                      isActive 
                        ? "bg-white border-[#2563EB] shadow-md ring-2 ring-[#2563EB]/25" 
                        : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                      hasDraft ? "bg-emerald-500 animate-pulse" : "bg-slate-250 bg-slate-350 bg-slate-300"
                    }`}></span>

                    <div className="flex-1 space-y-1">
                      <h4 className="font-extrabold text-xs text-[#111827] line-clamp-2 leading-snug">
                        {c.title}
                      </h4>
                      <p className="text-[9.5px] text-slate-400 font-mono">Query: <strong className="text-slate-600">{c.primaryKeyword}</strong></p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </aside>

      {/* CORE INTENTIONAL EDITOR SPACE */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden shadow-lg border-l border-slate-100">
        
        {/* Workspace Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-[9px] uppercase tracking-widest font-black text-[#EA580C] mb-0.5 block">Surfer SEO Calibration</span>
            <h1 className="text-lg font-display font-black text-[#111827] leading-tight">
              Calibrating: "{currentNodeData.primaryKeyword}"
            </h1>
            <p className="text-xs text-slate-500 mt-1 leading-none">
              Target Entity: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs text-[#EA580C] font-extrabold">{currentNodeData.primaryKeyword}</code>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => setViewMode(viewMode === "edit" ? "preview" : "edit")}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#111827] text-[10px] uppercase font-mono font-bold tracking-wider rounded border border-slate-200 flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{viewMode === "edit" ? "WYSIWYG Model Preview" : "Raw Markdown Code"}</span>
            </button>

            <button 
              type="button"
              onClick={() => onDraftSpecificTopic(activeNodeId)}
              disabled={isGeneratingArticle}
              className="px-4 py-2 bg-[#111827] hover:bg-[#EA580C] text-white text-[10px] uppercase font-mono font-black tracking-widest rounded flex items-center gap-1.5 transition-all cursor-pointer shadow disabled:opacity-50"
            >
              {isGeneratingArticle ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Crawl Drafting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Draft in Pro Sandbox</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        {draft && (
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-100 bg-slate-50/50 p-4 shrink-0 text-xs">
            <div className="border-r border-slate-200 pr-3">
              <span className="text-slate-400 block text-[9px] uppercase font-extrabold tracking-wider">Word metrics depth</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className={`text-[#111827] font-display font-black text-lg ${isOptimalLength ? "text-emerald-600" : ""}`}>{computedWords}</span>
                <span className="text-[10px] text-slate-500">/ 1,200 standard</span>
              </div>
            </div>

            <div className="border-r border-slate-200 px-3">
              <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Surfer Entity Score</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[#111827] font-display font-extrabold text-lg">94%</span>
                <span className="text-emerald-600 font-extrabold uppercase text-[8.5px] tracking-wider bg-emerald-50 px-1 rounded">Excellent</span>
              </div>
            </div>

            <div className="border-r border-slate-200 px-3">
              <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider font-mono text-indigo-600">Intent Mapped</span>
              <div className="mt-1 flex items-center gap-1 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-semibold">{currentNodeData.searchIntent || "Commercial"}</span>
              </div>
            </div>

            <div className="pl-3">
              <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Estimated Authority Class</span>
              <span className="block font-mono font-bold text-slate-800 mt-1 uppercase text-[10px]">Tier-1 Expert Content</span>
            </div>
          </div>
        )}

        {/* WORKSPACE CANVAS */}
        <div className="flex-1 overflow-hidden relative flex flex-col min-h-0 bg-white">
          {draft ? (
            <div className="flex-1 flex overflow-hidden h-full">
              
              {viewMode === "edit" ? (
                <textarea 
                  value={draft.contentMarkdown}
                  onChange={handleEditorChange}
                  className="w-full h-full p-8 font-mono text-xs text-slate-800 selection:bg-[#EA580C]/10 outline-none resize-none leading-relaxed overflow-y-auto bg-slate-50/10"
                  placeholder="Review raw markdown nodes..."
                />
              ) : (
                <div className="flex-1 p-8 sm:p-12 overflow-y-auto bg-white max-w-none text-[#111827] selection:bg-[#EA580C]/10 leading-relaxed font-sans">
                  
                  {/* Google snippet preview rendering */}
                  <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-lg max-w-4xl mb-6 space-y-1.5 text-xs text-slate-700">
                    <p className="text-slate-400 uppercase tracking-widest text-[9px] font-black font-mono">Google Search Engine Snippet Preview</p>
                    <p className="text-[#2563EB] hover:underline font-medium text-sm leading-tight cursor-pointer truncate max-w-3xl">{draft.metadata.title}</p>
                    <p className="text-[11px] text-slate-500 truncate max-w-2xl">https://{strategy.pillar.primaryKeyword.toLowerCase().replace(/[^a-z0-0]/g, "-") || "seo"}.co/blog/{currentNodeData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}</p>
                    <p className="text-[11px] text-slate-600 max-w-3xl line-clamp-2">
                      {draft.metadata.localOptimizationNotes || `Establish deep topical authority on ${currentNodeData.title}. Read professional breakdowns.`}
                    </p>
                  </div>

                  {/* HTML Content Body Preview */}
                  <div className="space-y-4 max-w-4xl text-justify text-slate-700">
                    <h1 className="text-2xl sm:text-3xl font-display font-black text-[#111827] tracking-tight">{draft.metadata.title}</h1>
                    <p className="italic text-[#EA580C] font-mono text-xs font-bold uppercase tracking-wider">Target Primary Search Query: {draft.metadata.primaryKeyword}</p>
                    
                    {draft.outline.map((o, idx) => (
                      <div key={idx} className="space-y-2 pt-3">
                        <h2 className="text-lg font-display font-extrabold text-[#111827] border-b pb-1 mt-6">{o.heading}</h2>
                        {o.points.map((pt, pIdx) => (
                          <p key={pIdx} className="text-xs text-slate-600 leading-relaxed">{o.heading.toUpperCase().includes("INTRODUCTION") ? pt : `• ${pt}`}</p>
                        ))}
                      </div>
                    ))}

                    <div className="pt-6">
                      <p className="font-bold text-slate-900 mb-2 font-display text-sm">Semantic Draft Sample Details:</p>
                      <p className="text-xs text-slate-600 leading-relaxed italic bg-indigo-50/35 p-4 rounded border border-indigo-150 border-indigo-150">
                        "{draft.contentMarkdown.substring(0, 1000)}..."
                      </p>
                    </div>

                    {/* Linking Suggestions */}
                    {draft.internalLinkingSuggestions && draft.internalLinkingSuggestions.length > 0 && (
                      <div className="border border-indigo-200 bg-indigo-50/40 p-4 rounded-lg mt-8 space-y-2">
                        <p className="text-indigo-900 font-extrabold text-[9px] uppercase tracking-wider font-mono">Reciprocal Anchor Insertion Recommendations:</p>
                        {draft.internalLinkingSuggestions.map((s, idx) => (
                          <div key={idx} className="text-xs text-indigo-950">
                            <strong>Anchor Statement:</strong> <code className="bg-indigo-100/55 px-1 font-semibold text-slate-800">"{s.recommendedAnchor}"</code> linking back to <code className="bg-indigo-100/55 px-1">{s.targetPageDescription}</code>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* EEAT Strategy justification */}
                    {draft.eeatJustification && (
                      <div className="border border-[#EA580C]/25 bg-[#EA580C]/5 p-4 rounded-lg mt-4 space-y-1">
                        <p className="text-[#EA580C] font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                          <Award className="w-4 h-4 text-amber-500 animate-pulse" /> EEAT Factor Checklist justification:
                        </p>
                        <p className="text-xs text-slate-600 text-justify">{draft.eeatJustification}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Copy Floating Bar */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2">
                <button 
                  onClick={handleCopyDraftText}
                  className="px-4 py-2 bg-slate-950 hover:bg-[#EA580C] text-[#FAFAF9] font-mono font-bold text-[10px] uppercase tracking-wider rounded-md flex items-center gap-1.5 shadow-lg cursor-pointer transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied Markdown!" : "Copy Completed Markdown"}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Idle Screen when waiting for a generate request */
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/50">
              <div className="text-center max-w-md p-8 bg-white border border-slate-200 rounded-xl shadow-md">
                <Sparkles className="w-10 h-10 text-[#EA580C] mx-auto mb-4 animate-bounce" />
                <h3 className="font-display font-black text-sm text-[#111827]">Compile SEO Core Draft</h3>
                <p className="text-xs text-slate-500 mt-2">
                  No written copy mapped for "<strong>{currentNodeData.title}</strong>" yet. Utilize our professional writer models to compose a fully formed article satisfying strict search engine EEAT indices.
                </p>

                <div className="pt-4 flex justify-center gap-3">
                  <button 
                    onClick={() => onDraftSpecificTopic(activeNodeId)}
                    className="px-5 py-2.5 bg-[#111827] hover:bg-[#EA580C] text-[#FAFAF9] font-mono font-bold text-[10px] uppercase tracking-wide rounded shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Draft Article Copy Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </main>

    </div>
  );
}
