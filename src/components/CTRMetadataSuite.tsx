import React, { useState } from "react";
import { 
  Eye, 
  RefreshCw, 
  Sparkles, 
  Copy, 
  Check, 
  HelpCircle, 
  ExternalLink,
  BookOpen,
  Sliders,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { SEOMetadataResult } from "../types";

interface CTRMetadataSuiteProps {
  metadataTopic: string;
  setMetadataTopic: (v: string) => void;
  metadataResult: SEOMetadataResult | null;
  isGeneratingMetadata: boolean;
  onGenerateMetadata: () => Promise<void>;
  triggerMessage: (msg: string, type?: "success" | "error") => void;
  onNavigateToTab: (t: any) => void;
}

export default function CTRMetadataSuite({
  metadataTopic,
  setMetadataTopic,
  metadataResult,
  isGeneratingMetadata,
  onGenerateMetadata,
  triggerMessage,
  onNavigateToTab
}: CTRMetadataSuiteProps) {
  
  const [selectedTitleIdx, setSelectedTitleIdx] = useState<number>(0);
  const [selectedDescIdx, setSelectedDescIdx] = useState<number>(0);
  const [selectedSlugIdx, setSelectedSlugIdx] = useState<number>(0);
  const [copiedText, setCopiedText] = useState<string>("");

  const handleCopyText = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(identifier);
    triggerMessage(`Metadata copied safely!`);
    setTimeout(() => setCopiedText(""), 3000);
  };

  if (!metadataResult) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FAFAF9] p-10 min-h-[400px]">
        <div className="text-center max-w-sm p-8 bg-white border border-slate-200 rounded-xl shadow-md">
          <Eye className="w-12 h-12 text-[#EA580C]/50 mx-auto mb-4 animate-pulse" />
          <h3 className="font-display font-black text-lg text-[#111827]">Metadata Suite Inactive</h3>
          <p className="text-xs text-slate-500 mt-2">
            CTR structures require active topical inputs. Fill out a focus target and trigger compile controls.
          </p>
          <button 
            type="button"
            onClick={onGenerateMetadata}
            disabled={isGeneratingMetadata}
            className="mt-5 px-5 py-2.5 bg-[#111827] hover:bg-[#EA580C] text-white text-[10px] uppercase tracking-widest font-black rounded-md shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 mx-auto disabled:opacity-50 animate-pulse"
          >
            {isGeneratingMetadata ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
            <span>Compile CTR Suite</span>
          </button>
        </div>
      </div>
    );
  }

  const activeTitle = metadataResult.titles[selectedTitleIdx]?.title || "SEO Services";
  const activeDesc = metadataResult.metaDescriptions[selectedDescIdx]?.description || "Description details";
  const activeSlug = metadataResult.urlSlugs[selectedSlugIdx] || "seo-services-kerala";

  const titleLen = activeTitle.length;
  const descLen = activeDesc.length;

  const isTitleOptimal = titleLen >= 50 && titleLen <= 60;
  const isDescOptimal = descLen >= 120 && descLen <= 160;

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#FAFAF9] text-[#111827]">
      
      {/* SEED CONTROLS CONTROL PANEL */}
      <aside className="w-full lg:w-[350px] border-b lg:border-b-0 lg:border-r border-[#111827]/10 flex flex-col shrink-0 bg-white overflow-y-auto">
        <div className="p-5 border-b border-[#111827]/5 bg-[#FAFAF9]">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 px-1.5 bg-[#EA580C]/10 rounded text-[#EA580C]"><Sliders className="w-4 h-4" /></span>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#EA580C]">SERP controls</span>
          </div>
          <h2 className="text-base font-display font-bold text-[#111827]">CTR Parameter Suite</h2>
          <p className="text-xs text-slate-500 mt-1">Configure organic search signals to compile meta schemas.</p>
        </div>

        <div className="p-5 space-y-4 flex-1">
          <div>
            <label className="text-[9px] uppercase tracking-[0.1em] font-bold text-slate-500 block mb-1">Topical Focus Keyword</label>
            <input 
              type="text" 
              value={metadataTopic}
              onChange={(e) => setMetadataTopic(e.target.value)}
              className="w-full bg-slate-50 focus:bg-white border text-xs px-3 py-2 border-slate-250 focus:border-[#EA580C] rounded outline-none transition-all font-semibold"
              placeholder="e.g. SEO services in Kerala"
            />
          </div>

          <button 
            type="button" 
            onClick={onGenerateMetadata}
            disabled={isGeneratingMetadata}
            className="w-full py-3 bg-[#111827] hover:bg-[#EA580C] text-[#FAFAF9] font-mono font-bold text-[10px] uppercase tracking-widest rounded transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-md"
          >
            {isGeneratingMetadata ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Calibrating Metadata...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Rebuild CTR Suite</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* SEARCH SERP EMULATION CONTAINER */}
      <main className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
        
        {/* Step Context row */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-[9.5px] uppercase font-mono font-bold tracking-widest text-[#EA580C] block mb-1">
            Google SERP Desktop Simulation
          </span>
          <h2 className="text-lg font-display font-extrabold text-[#111827]">Visual Search Performance Index</h2>
          <p className="text-xs text-slate-500 mt-1">
            Review Title variants and Metadata Descriptions below. The visual Google SERP simulator card updates immediately!
          </p>

          {/* GOOGLE DESKTOP SEARCH EMULATOR */}
          <div className="border border-slate-205 border-slate-200 bg-white p-6 rounded-xl mt-5 shadow-inner max-w-3xl font-sans text-left">
            <div className="flex items-center gap-1.8 text-xs text-slate-400 select-none pb-1 border-b border-dashed border-slate-100 mb-3">
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-500/15 px-2 py-0.5 rounded text-[8.5px] font-mono font-extrabold uppercase tracking-wider">CTR Rank Booster Active</span>
              <span className="text-[10px] font-mono">https://www.google.com/search</span>
            </div>

            <div className="space-y-1">
              {/* URL Slug Path */}
              <div className="text-[14px] text-[#202124] flex items-center gap-1 translate-y-0.5 line-clamp-1 truncate select-all">
                <span>https://yourdomain.co</span>
                <span className="text-slate-400 font-bold">›</span>
                <span className="text-[#EA580C] font-semibold font-mono text-[11px]">{activeSlug}</span>
              </div>

              {/* Title Tag */}
              <h3 className="text-[20px] text-[#1a0dab] font-normal hover:underline cursor-pointer leading-tight line-clamp-1 truncate select-all font-sans font-medium">
                {activeTitle}
              </h3>

              {/* Description snippet */}
              <p className="text-[14px] text-[#4d5156] leading-relaxed line-clamp-2 max-w-[600px] select-all font-normal">
                {activeDesc}
              </p>
            </div>
          </div>

          {/* STATS RADIAL PROGRESS GRAPHS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-w-3xl">
            {/* Title metric length */}
            <div className="p-3 bg-[#FAFAF9] border border-slate-200 rounded-lg text-xs space-y-1.5">
              <div className="flex justify-between items-center text-slate-500 font-extrabold uppercase text-[9px] tracking-wider font-mono">
                <span>Title Length Gauge</span>
                <span className={isTitleOptimal ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                  {titleLen} / 60 char limit
                </span>
              </div>
              <div className="w-full bg-slate-205 bg-slate-200 h-2 rounded overflow-hidden">
                <div 
                  className={`h-full transition-all duration-350 ${isTitleOptimal ? "bg-emerald-500" : "bg-amber-500"}`}
                  style={{ width: `${Math.min((titleLen / 60) * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-slate-400 block italic leading-none font-medium">
                {isTitleOptimal ? "Perfect desktop length index!" : "Lengths should fall between 50-60 characters for SERPs."}
              </span>
            </div>

            {/* Description metric length */}
            <div className="p-3 bg-[#FAFAF9] border border-slate-200 rounded-lg text-xs space-y-1.5">
              <div className="flex justify-between items-center text-slate-500 font-extrabold uppercase text-[9px] tracking-wider font-mono">
                <span>Meta Description snippet size</span>
                <span className={isDescOptimal ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                  {descLen} / 160 char limit
                </span>
              </div>
              <div className="w-full bg-slate-205 bg-slate-200 h-2 rounded overflow-hidden">
                <div 
                  className={`h-full transition-all duration-350 ${isDescOptimal ? "bg-emerald-500" : "bg-amber-500"}`}
                  style={{ width: `${Math.min((descLen / 160) * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-slate-400 block italic leading-none font-medium">
                {isDescOptimal ? "Optimal snippet metadata size!" : "Keep metadata under 160 characters to prevent clip dots."}
              </span>
            </div>
          </div>

        </div>

        {/* 10 TITLES LISTS */}
        <div id="ctr-titles-deck" className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="font-display font-extrabold text-base text-[#111827]">
              High-Clickthrough (CTR) Title Options
            </h3>
            <p className="text-xs text-slate-500 leading-none">Click any title to load it into the Google SERP desktop browser simulator above.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metadataResult.titles.map((t, idx) => {
              const isSelected = selectedTitleIdx === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedTitleIdx(idx)}
                  className={`border p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected 
                      ? "bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-[#EA580C]/20" 
                      : "border-slate-200/80 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 font-bold">
                      <span>VARIANT #{idx + 1}</span>
                      <span className={t.title.length <= 60 ? "text-emerald-500" : "text-[#EA580C]"}>
                        {t.title.length} chars
                      </span>
                    </div>
                    <h4 className={`font-extrabold text-xs leading-snug font-sans ${isSelected ? "text-white" : "text-[#111827]"}`}>
                      {t.title}
                    </h4>
                    <p className={`text-[11px] leading-snug ${isSelected ? "text-slate-350" : "text-slate-500"}`}>
                      <strong>Leverage CTR modifier:</strong> {t.reasonForCtr}
                    </p>
                  </div>

                  <div className="border-t border-slate-100/10 pt-2.5 mt-4 flex items-center justify-between text-[11px]">
                    <span className="text-[10px] text-[#EA580C] font-mono font-bold">LOCKED AT SIMULATOR</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyText(t.title, `title-${idx}`);
                      }}
                      className="text-blue-500 hover:underline font-bold flex items-center gap-1 font-mono text-[10px]"
                    >
                      {copiedText === `title-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-300" />}
                      <span>{copiedText === `title-${idx}` ? "Copied" : "Copy Title"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 10 Meta descriptions */}
        <div id="ctr-descriptions-deck" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="font-display font-extrabold text-base text-[#111827]">
              Compelling Snippets & Meta Descriptions
            </h3>
            <p className="text-xs text-slate-500 leading-none">Click any description card to load it in the viewport.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metadataResult.metaDescriptions.map((d, idx) => {
              const isSelected = selectedDescIdx === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedDescIdx(idx)}
                  className={`border p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected 
                      ? "bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-[#EA580C]/25" 
                      : "border-slate-200/80 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 font-bold">
                      <span>VARIANT #{idx + 1}</span>
                      <span className={d.description.length <= 160 ? "text-emerald-500" : "text-[#EA580C]"}>
                        {d.description.length} chars
                      </span>
                    </div>
                    <p className={`font-medium text-xs leading-relaxed font-sans ${isSelected ? "text-slate-200" : "text-slate-700"}`}>
                      {d.description}
                    </p>
                    <p className={`text-[11px] leading-snug ${isSelected ? "text-slate-350" : "text-slate-500"}`}>
                      <strong>Target Benefit:</strong> {d.reasonForCtr}
                    </p>
                  </div>

                  <div className="border-t border-slate-100/10 pt-2.5 mt-4 flex items-center justify-between text-[11px]">
                    <span className="text-[10px] text-emerald-500 font-mono font-bold">ACTIVE SIM</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyText(d.description, `desc-${idx}`);
                      }}
                      className="text-emerald-500 hover:underline font-bold flex items-center gap-1 font-mono text-[10px]"
                    >
                      {copiedText === `desc-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy Snippet</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* URL SLUGS GRID AND SOCIAL OPEN GRAPH */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          <div className="bg-white border rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="font-display font-extrabold text-sm text-[#111827]">
              Clean URL Slug Targets
            </h3>
            
            <div className="space-y-2">
              {metadataResult.urlSlugs.map((slug, idx) => {
                const isSelected = selectedSlugIdx === idx;
                return (
                  <div 
                    key={idx}
                    onClick={() => setSelectedSlugIdx(idx)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all flex justify-between items-center text-xs ${
                      isSelected ? "bg-[#EA580C]/10 border-[#EA580C] text-[#EA580C] font-bold" : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-mono text-slate-800 font-semibold truncate max-w-[200px]">/{slug}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase text-slate-400 font-mono">Var #{idx + 1}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyText(slug, `slug-${idx}`);
                        }}
                        className="text-[#EA580C] font-extrabold text-[10px]"
                      >
                        {copiedText === `slug-${idx}` ? "Saved" : "Copy"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* OPEN GRAPH CARDS */}
          <div className="bg-slate-950 text-white p-5 rounded-xl shadow-lg space-y-4">
            <h4 className="font-display font-bold text-sm text-white border-b border-white/5 pb-2">
              Social sharing Open Graph Cards
            </h4>

            <div className="border border-white/10 bg-white/5 rounded-lg p-4 text-xs font-sans text-left relative overflow-hidden">
              <span className="text-[8px] font-mono tracking-widest opacity-60">LINKEDIN / SLACK DIRECT PREVIEW</span>
              
              <div className="border-l-2 border-[#EA580C] pl-3 py-1.5 mt-2 space-y-1">
                <span className="text-[#EA580C] font-mono uppercase text-[9px] font-black tracking-wider block">OG Title tag:</span>
                <p className="font-extrabold text-sm leading-tight text-white line-clamp-1">{metadataResult.openGraphTitles[0]}</p>
                <span className="text-slate-400 block text-[10px] leading-relaxed line-clamp-2 mt-1">{metadataResult.openGraphDescriptions[0]}</span>
              </div>

              <div className="border-t border-white/5 pt-2 mt-4 flex items-center justify-between text-[10px] text-slate-400 font-mono font-bold">
                <span>META_IMAGE: verified_rendered</span>
                <span className="text-[#EA580C]">PRO CTR TARGET</span>
              </div>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
