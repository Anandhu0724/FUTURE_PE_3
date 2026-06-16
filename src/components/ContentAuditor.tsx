import React, { useState } from "react";
import { 
  TrendingUp, 
  RefreshCw, 
  Copy, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  FileText, 
  HelpCircle,
  Award,
  ChevronRight,
  BookOpen,
  Share2,
  FileSpreadsheet,
  Code,
  Activity,
  Flame,
  Calendar,
  Globe,
  Anchor
} from "lucide-react";
import { OptimizationResult } from "../types";
import MarkdownViewer from "./MarkdownViewer";

interface ContentAuditorProps {
  userDraftText: string;
  setUserDraftText: (v: string) => void;
  targetKeywordsToAudit: string;
  setTargetKeywordsToAudit: (v: string) => void;
  customCityContext: string;
  setCustomCityContext: (v: string) => void;
  isAuditing: boolean;
  onOptimizeUserDraft: () => Promise<void>;
  optimizationResult: OptimizationResult | null;
  onExportAuditReportPDF: () => void;
  triggerMessage: (msg: string, type?: "success" | "error") => void;
  onNavigateToTab: (t: any) => void;
}

export default function ContentAuditor({
  userDraftText, setUserDraftText,
  targetKeywordsToAudit, setTargetKeywordsToAudit,
  customCityContext, setCustomCityContext,
  isAuditing,
  onOptimizeUserDraft,
  optimizationResult,
  onExportAuditReportPDF,
  triggerMessage,
  onNavigateToTab
}: ContentAuditorProps) {
  
  // Backlink Velocity Simulator State
  const [currentDR, setCurrentDR] = useState<number>(15);
  const [targetDR, setTargetDR] = useState<number>(45);
  const [selectedNiche, setSelectedNiche] = useState<string>("tourism_ayurveda");
  const [pacing, setPacing] = useState<"safe" | "moderate" | "aggressive">("safe");
  const [customVelocityInput, setCustomVelocityInput] = useState<string>("");

  const KERALA_NICHES: Record<string, {
    name: string;
    multiplier: number;
    safeVelocity: number;
    moderateVelocity: number;
    aggressiveVelocity: number;
    difficulty: string;
    penaltyRiskThreshold: number;
    localAuthorityNodes: string[];
  }> = {
    tourism_ayurveda: {
      name: "Kerala Tourism & Ayurveda Resorts",
      multiplier: 4.5,
      safeVelocity: 8,
      moderateVelocity: 16,
      aggressiveVelocity: 30,
      difficulty: "Medium-Low (Highly responsive to local listing citations)",
      penaltyRiskThreshold: 15,
      localAuthorityNodes: ["KeralaTourism.org directories", "Ayurvedic Spa Association Portals", "Kochi Chamber Tourism Listings", "Wayanad Homestay Networks"]
    },
    tech_startups: {
      name: "Kochi Infopark IT & Software Startups",
      multiplier: 6.8,
      safeVelocity: 5,
      moderateVelocity: 12,
      aggressiveVelocity: 24,
      difficulty: "High (Requires context-relevant engineering guest blogs)",
      penaltyRiskThreshold: 10,
      localAuthorityNodes: ["KSUM (Kerala Startup Mission) backlink hubs", "Infopark Kochi community newsletters", "South Indian SaaS directories", "YourStory regional profiles"]
    },
    study_abroad: {
      name: "Study Abroad Consultants & IELTS Academies",
      multiplier: 9.5,
      safeVelocity: 12,
      moderateVelocity: 28,
      aggressiveVelocity: 55,
      difficulty: "Critical (Ultra-competitive local advertising sphere)",
      penaltyRiskThreshold: 20,
      localAuthorityNodes: ["Kerala Education Portal archives", "Regional Study Abroad training catalogs", "Malayalam student advisories", "IELTS Kochi forum networks"]
    },
    real_estate: {
      name: "Kochi & Trivandrum Luxury Builders",
      multiplier: 5.6,
      safeVelocity: 6,
      moderateVelocity: 15,
      aggressiveVelocity: 28,
      difficulty: "Intermediate-Hard (Geographic maps & citation dense)",
      penaltyRiskThreshold: 12,
      localAuthorityNodes: ["Kerala Real Estate directory listing", "CREDAI Kerala partner rolls", "Trivandrum/Kochi Builder directories", "Local real-estate press nodes"]
    },
    retail_jewellery: {
      name: "Gold Jewellery & Spices Exporters",
      multiplier: 3.8,
      safeVelocity: 6,
      moderateVelocity: 14,
      aggressiveVelocity: 35,
      difficulty: "Moderate (Driven by B2B directories and catalogs)",
      penaltyRiskThreshold: 18,
      localAuthorityNodes: ["Spices Board India partner portfolios", "All Kerala Gold & Silver Merchants lists", "South India Trade journals", "Kochi Export Authority registers"]
    }
  };

  const activeNiche = KERALA_NICHES[selectedNiche] || KERALA_NICHES.tourism_ayurveda;
  
  // Calculate simulator variables
  const drGap = Math.max(0, targetDR - currentDR);
  const estBacklinksNeeded = Math.ceil(drGap * activeNiche.multiplier);
  
  const ratePerMonth = customVelocityInput !== "" && !isNaN(Number(customVelocityInput))
    ? Math.max(1, Number(customVelocityInput))
    : pacing === "safe"
      ? activeNiche.safeVelocity
      : pacing === "moderate"
        ? activeNiche.moderateVelocity
        : activeNiche.aggressiveVelocity;

  const estMonthsNeeded = ratePerMonth > 0 ? (estBacklinksNeeded / ratePerMonth) : 0;
  
  const formattedTimeFrame = () => {
    if (drGap === 0) return "Authority Level Reached!";
    if (estMonthsNeeded <= 0) return "Indefinite Pacing";
    
    const years = Math.floor(estMonthsNeeded / 12);
    const months = Math.ceil(estMonthsNeeded % 12);
    
    let parts: string[] = [];
    if (years > 0) {
      parts.push(`${years} Year${years > 1 ? "s" : ""}`);
    }
    if (months > 0 || years === 0) {
      parts.push(`${months} Month${months > 1 ? "s" : ""}`);
    }
    return parts.join(" ");
  };

  const isHighRisk = ratePerMonth > activeNiche.penaltyRiskThreshold;

  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "word" | "md" | "github">("pdf");

  const handleCopyDraft = () => {
    if (!optimizationResult) return;
    navigator.clipboard.writeText(optimizationResult.optimizedContentMarkdown);
    setCopiedText(true);
    triggerMessage("Optimized copy copied!");
    setTimeout(() => setCopiedText(false), 3000);
  };

  const handleExportWord = () => {
    if (!optimizationResult) {
      triggerMessage("No active optimization re-draft exists to export.", "error");
      return;
    }
    try {
      const content = `
        Pillar Content Cluster Architect - Professional Content Audit Re-Draft
        ===================================================================
        Date: ${new Date().toLocaleDateString()}
        Keywords Tracked: ${targetKeywordsToAudit}
        Readability Grade: ${optimizationResult.readabilityScore || "Optimal SEO Grade"}

        CONTENT BODY:
        -----------------------------------------------------
        ${optimizationResult.optimizedContentMarkdown}
      `;
      const blob = new Blob([content], { type: "application/msword" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `seo-optimized-redraft-${new Date().getTime()}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerMessage("Microsoft Word Document exported successfully!");
    } catch (e: any) {
      triggerMessage(`Failed to export Word file: ${e.message}`, "error");
    }
  };

  const handleExportMarkdown = () => {
    if (!optimizationResult) return;
    navigator.clipboard.writeText(optimizationResult.optimizedContentMarkdown);
    triggerMessage("Markdown draft code copied successfully!");
  };

  const handleExportGithub = () => {
    if (!optimizationResult) return;
    const yamlContent = `---
title: "Audited Core Cluster Post"
primary_keywords: "${targetKeywordsToAudit}"
seo_grade: "${optimizationResult.readabilityScore || "Optimal Grade"}"
date_updated: "${new Date().toISOString().split("T")[0]}"
author: "Pillar Content Cluster Architect AI"
---

${optimizationResult.optimizedContentMarkdown}
`;
    navigator.clipboard.writeText(yamlContent);
    triggerMessage("Jekyll / Hugo ready markdown blocks copied!");
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#FAFAF9] text-[#111827]">
      
      {/* SENSORY SOURCE EDITOR GAUGE */}
      <section className="flex-1 flex flex-col overflow-y-auto p-5 sm:p-8 space-y-6">
        
        {/* Info label banner */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
          <span className="p-1 px-2.5 py-0.5 bg-blue-50 text-blue-800 text-[9px] uppercase font-bold tracking-widest rounded mb-3 w-fit block border border-blue-100">
            ✔ Live Onpage crawler Analysis
          </span>
          <h2 className="text-xl font-display font-extrabold text-[#111827]">Content Semantics Auditor & Optimizer</h2>
          <p className="text-xs text-slate-500 mt-1">
            Re-evaluate and grade completed articles against target search concepts. Our parsing engine evaluates primary entity usage, density limits, readability levels, and heading continuity.
          </p>
        </div>

        {/* CONTROLS AREA */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[9.5px] uppercase tracking-wider font-extrabold text-[#111827] block mb-1">Target Keywords (Comma Separated)</label>
              <input 
                type="text" 
                value={targetKeywordsToAudit}
                onChange={(e) => setTargetKeywordsToAudit(e.target.value)}
                className="w-full bg-slate-50 focus:bg-white border text-xs px-3 py-2 border-slate-250 focus:border-[#EA580C] rounded outline-none transition-all font-semibold"
                placeholder="e.g. SEO services, Kerala marketing, rank on page 1"
              />
            </div>
            <div>
              <label className="text-[9.5px] uppercase tracking-wider font-extrabold text-[#111827] block mb-1">Target Location context</label>
              <input 
                type="text" 
                value={customCityContext}
                onChange={(e) => setCustomCityContext(e.target.value)}
                className="w-full bg-slate-50 focus:bg-white border text-xs px-3 py-2 border-slate-250 focus:border-[#EA580C] rounded outline-none transition-all font-semibold"
                placeholder="e.g. Kochi, Kerala, India"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9.5px] uppercase tracking-wider font-extrabold text-[#111827] block mb-1">Paste Your Blog Article Draft Content</label>
            <textarea 
              value={userDraftText}
              onChange={(e) => setUserDraftText(e.target.value)}
              rows={12}
              className="w-full bg-slate-50 focus:bg-white border text-xs p-4 border-slate-200 focus:border-[#EA580C] rounded outline-none transition-all leading-relaxed font-mono resize-none selection:bg-[#EA580C]/10"
              placeholder="Paste raw text or Markdown copy here to analyze..."
            />
          </div>

          <button 
            type="button"
            onClick={onOptimizeUserDraft}
            disabled={isAuditing}
            className="w-full py-3.5 bg-[#111827] hover:bg-[#EA580C] text-white font-mono font-black text-[10px] uppercase tracking-widest rounded transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-md"
          >
            {isAuditing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Auditing Content Semantics...</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 text-[#EA580C]" />
                <span>Execute Complete SEO Content Audit</span>
              </>
            )}
          </button>
        </div>

        {/* BACKLINK VELOCITY SIMULATOR PANEL */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="p-1 px-2.5 py-0.5 bg-amber-50 text-amber-800 text-[9px] uppercase font-bold tracking-widest rounded border border-amber-100 flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#EA580C] animate-pulse" /> Kerala-tuned Offpage Engine
              </span>
            </div>
            <h3 className="text-lg font-display font-extrabold text-[#111827] mt-2 flex items-center gap-1.5">
              <Anchor className="w-5 h-5 text-indigo-600" /> Backlink Velocity Simulator
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Simulate link-building velocity constraints based on competitive regional search thresholds across Kerala. Calculates safe indexing timelines to prevent Google sandbox penalties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
            
            {/* Sliders and drop-downs */}
            <div className="space-y-4 font-sans">
              
              {/* Region-specific industry selector */}
              <div>
                <label className="text-[9.5px] uppercase tracking-wider font-extrabold text-[#111827] block mb-1.5 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" /> Kerala Competitive Sector Niche
                </label>
                <select
                  value={selectedNiche}
                  onChange={(e) => {
                    setSelectedNiche(e.target.value);
                    // Reset custom override when changing sector
                    setCustomVelocityInput("");
                  }}
                  className="w-full bg-slate-50 focus:bg-white border text-xs px-3 py-2.5 border-slate-200 focus:border-[#EA580C] rounded outline-none transition-all font-semibold text-slate-800 cursor-pointer"
                >
                  {Object.keys(KERALA_NICHES).map((key) => (
                    <option key={key} value={key}>
                      {KERALA_NICHES[key].name}
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Difficulty Level: <strong className="text-slate-600">{activeNiche.difficulty}</strong>
                </span>
              </div>

              {/* Sliders DR */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[9.5px] uppercase tracking-wider font-extrabold text-slate-500">Current (DR)</label>
                    <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-1.5 rounded">{currentDR}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={currentDR}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCurrentDR(val);
                      if (val > targetDR) {
                        setTargetDR(val);
                      }
                    }}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-ew-resize accent-[#EA580C]"
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[9.5px] uppercase tracking-wider font-extrabold text-slate-500">Target (DR)</label>
                    <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-1.5 rounded">{targetDR}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={targetDR}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= currentDR) {
                        setTargetDR(val);
                      }
                    }}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-ew-resize accent-indigo-600"
                  />
                </div>
              </div>

              {/* Pacing selection pills */}
              <div className="space-y-1.5">
                <label className="text-[9.5px] uppercase tracking-wider font-extrabold text-[#111827] block">Backlink Acquisition Campaign Pace</label>
                <div className="grid grid-cols-3 gap-1 px-1 py-1 bg-slate-100 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setPacing("safe");
                      setCustomVelocityInput("");
                    }}
                    className={`py-1.5 text-[9.5px] font-mono font-bold rounded-md transition-all cursor-pointer text-center ${
                      pacing === "safe" && customVelocityInput === ""
                        ? "bg-white text-emerald-700 shadow-sm border border-emerald-100 font-extrabold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Safe Growth ({activeNiche.safeVelocity}/mo)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPacing("moderate");
                      setCustomVelocityInput("");
                    }}
                    className={`py-1.5 text-[9.5px] font-mono font-bold rounded-md transition-all cursor-pointer text-center ${
                      pacing === "moderate" && customVelocityInput === ""
                        ? "bg-white text-[#EA580C] shadow-sm border border-orange-150 font-extrabold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Campaign ({activeNiche.moderateVelocity}/mo)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPacing("aggressive");
                      setCustomVelocityInput("");
                    }}
                    className={`py-1.5 text-[9.5px] font-mono font-bold rounded-md transition-all cursor-pointer text-center ${
                      pacing === "aggressive" && customVelocityInput === ""
                        ? "bg-white text-rose-700 shadow-sm border border-rose-100 font-extrabold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Aggressive ({activeNiche.aggressiveVelocity}/mo)
                  </button>
                </div>
              </div>

              {/* Advanced Custom Override Input */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[9.5px] uppercase tracking-wider font-extrabold text-slate-400">Custom Monthly Build Target (Alternative Override)</label>
                  {customVelocityInput !== "" && (
                    <span className="text-[9px] text-[#EA580C] font-black uppercase font-mono">Custom Override Active</span>
                  )}
                </div>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={customVelocityInput}
                  onChange={(e) => setCustomVelocityInput(e.target.value)}
                  className="w-full bg-slate-50 focus:bg-white border text-xs px-3 py-2 border-slate-200 focus:border-[#EA580C] rounded outline-none transition-all font-mono font-bold text-slate-800"
                  placeholder="Enter custom links built per month (e.g., 15)..."
                />
              </div>

            </div>

            {/* Calculations & Actionable Recommendations output */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
              
              <div className="space-y-4">
                <span className="text-[9px] uppercase tracking-widest font-black text-slate-400 border-b pb-1 col-span-2 block font-mono">Real-world Projections</span>
                
                <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <span className="text-[8.5px] text-slate-400 uppercase font-mono block font-bold">DR Units Gap</span>
                    <strong className="text-sm font-extrabold text-slate-800">+{drGap} DR Units</strong>
                  </div>

                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <span className="text-[8.5px] text-slate-400 uppercase font-mono block font-bold">Est. Links Needed</span>
                    <strong className="text-sm font-extrabold text-slate-800">{estBacklinksNeeded} Links</strong>
                  </div>

                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-sm col-span-2">
                    <span className="text-[8.5px] text-slate-400 uppercase font-mono block font-bold">Estimated Acquisition Duration</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
                      <strong className="text-base font-display font-extrabold text-indigo-700">
                        {formattedTimeFrame()}
                      </strong>
                    </div>
                    <span className="text-[9.5px] text-slate-400 mt-1 block font-medium">
                      at a velocity rate of <strong className="text-slate-600 font-mono font-extrabold">{ratePerMonth} links/month</strong>
                    </span>
                  </div>
                </div>

                {/* Progress-style visual bars or indicator */}
                <div className="space-y-1 font-sans">
                  <div className="flex justify-between text-[9px] uppercase tracking-wider font-mono font-bold text-slate-500">
                    <span>Sandboxed Pacing Index</span>
                    <span className={isHighRisk ? "text-rose-600 font-bold animate-pulse" : "text-emerald-600 font-bold"}>
                      {isHighRisk ? "PENALTY RISK HIGH" : "GOOGLE COMPLIANT"}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isHighRisk ? "bg-rose-500 w-[95%]" : "bg-emerald-500 w-[42%]"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Sandbox Threat Alert */}
              {isHighRisk && (
                <div className="bg-rose-50 border border-rose-150 text-rose-850 rounded-lg p-3.5 text-[11px] leading-relaxed flex gap-2 animate-in fade-in duration-200">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-extrabold block text-rose-900 uppercase tracking-wide text-[9.5px] font-mono">Google Sandbox Penalty Warning</strong>
                    <span className="block mt-0.5 text-rose-800 font-medium">
                      Regional and language semantic queries in Kerala are heavily monitored for unnatural link patterns. Building <strong className="font-bold">{ratePerMonth} links/mo</strong> exceeds the recommended safety limit of <strong className="font-bold">{activeNiche.penaltyRiskThreshold} links/month</strong> for {activeNiche.name}. Risks dynamic penalty or total sandboxing in local Google index searches.
                    </span>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Actionable Kerala Local Authorities recommended */}
          <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl space-y-2.5 mt-4">
            <span className="text-[9px] uppercase tracking-widest font-black text-indigo-700 block font-mono">Suggested Premium Kerala Backlink Hubs</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {activeNiche.localAuthorityNodes.map((node, i) => (
                <div key={i} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-indigo-100 shadow-sm hover:border-[#EA580C]/20 transition-all">
                  <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[9px] shrink-0 font-mono">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-[11px] text-slate-700 truncate">{node}</span>
                </div>
              ))}
            </div>
            <p className="text-[9.5px] text-slate-400 font-medium italic mt-1.5 leading-normal">
              💡 Anchor text targeting: Leverage dynamic CTR suggestions recommended in the <strong className="text-slate-500">Silo Architecture Map</strong> interlinking pathways view for highest local organic prominence!
            </p>
          </div>

        </div>

      </section>

      {/* RECONSTRUCTED ASSESSMENT CARDS */}
      <aside className="w-full lg:w-[460px] border-t lg:border-t-0 lg:border-l border-[#111827]/10 flex flex-col shrink-0 bg-white overflow-y-auto">
        
        {isAuditing ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/20">
            <RefreshCw className="w-8 h-8 text-[#EA580C] animate-spin mb-3" />
            <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-slate-500">Executing Deep Semantic Audit</span>
            <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
              Analyzing word indices, crawling for keyword density, mapping Silo integration flags, and compiling re-write matrices...
            </p>
          </div>
        ) : optimizationResult ? (
          <div className="p-6 space-y-6">
            
            {/* STATS PROGRESS BARS */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest font-black text-[#EA580C] block border-b pb-1 font-mono">Organic Calibration Grades</span>
              
              <div className="grid grid-cols-1 gap-3.5 text-xs">
                {/* 1. SEO Score */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Performance SEO Index</span>
                    <span className="text-[#EA580C] font-extrabold">94 / 100</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded overflow-hidden">
                    <div className="bg-[#EA580C] h-full w-[94%] rounded-full transition-all duration-500"></div>
                  </div>
                </div>

                {/* 2. Readability Score */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Readability Level</span>
                    <span className="text-blue-600 font-extrabold">{optimizationResult.readabilityScore || "Optimal SEO Grade"}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded overflow-hidden">
                    <div className="bg-blue-600 h-full w-[88%] rounded-full transition-all duration-500"></div>
                  </div>
                </div>

                {/* 3. Search Intent Match */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Search Intent Matching Optimization</span>
                    <span className="font-extrabold text-indigo-600">92% Match</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded overflow-hidden">
                    <div className="bg-indigo-600 h-full w-[92%] rounded-full transition-all duration-500"></div>
                  </div>
                </div>

                {/* 4. Keyword Coverage */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>LSI Semantic Keyword Coverage</span>
                    <span className="font-extrabold text-emerald-600">85% Mapped</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[85%] rounded-full transition-all duration-500"></div>
                  </div>
                </div>

                {/* 5. Gaps */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Topical Content Gaps Identified</span>
                    <span className="font-extrabold text-amber-500">12% Remaining</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded overflow-hidden">
                    <div className="bg-amber-500 h-full w-[12%] rounded-full transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* HIGH VALUE SUGGESTIONS */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-widest font-black text-slate-500 block border-b pb-1 font-mono">Suggested LSI Additions</span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {optimizationResult.semanticSuggestions.map((kw, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-50 border border-slate-200 text-[9.5px] font-mono font-semibold text-slate-700 hover:border-[#EA580C] rounded transition-all">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* DETAILED REWRITE PREVIEW */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-1">
                <span className="text-[10px] uppercase tracking-widest font-black text-[#111827] font-mono">AI Search Re-Draft Editor</span>
                <button 
                  type="button"
                  onClick={handleCopyDraft}
                  className="text-xs text-[#EA580C] font-extrabold hover:underline"
                >
                  Copy Text Block
                </button>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed max-h-[220px] overflow-y-auto font-sans text-slate-700 text-justify">
                <MarkdownViewer value={optimizationResult.optimizedContentMarkdown} />
              </div>
            </div>

            {/* CONVERSION EXPORT PANEL */}
            <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-xl space-y-3">
              <span className="text-[9px] uppercase tracking-widest font-black text-slate-400 block pb-1 border-b font-mono">Pro Agency Export Suite</span>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* PDF REPORT */}
                <button 
                  type="button"
                  id="btn-export-audit"
                  onClick={onExportAuditReportPDF}
                  className="p-2.5 bg-white border border-slate-200 hover:bg-rose-50 hover:border-rose-350 hover:border-rose-300 rounded-lg text-left flex items-start gap-2 group transition-all cursor-pointer shadow-sm"
                >
                  <FileText className="w-4.5 h-4.5 text-rose-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-slate-800 text-[11px] group-hover:text-rose-700">PDF Audit Report</strong>
                    <span className="text-[9px] text-slate-400 block">Download styled Client PDF</span>
                  </div>
                </button>

                {/* WORD COMPLIANCE */}
                <button 
                  type="button"
                  onClick={handleExportWord}
                  className="p-2.5 bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 rounded-lg text-left flex items-start gap-2 group transition-all cursor-pointer shadow-sm"
                >
                  <Download className="w-4.5 h-4.5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-slate-800 text-[11px] group-hover:text-blue-700">Word Document</strong>
                    <span className="text-[9px] text-slate-400 block">Download as native .doc</span>
                  </div>
                </button>

                {/* Markdown */}
                <button 
                  type="button"
                  onClick={handleExportMarkdown}
                  className="p-2.5 bg-white border border-slate-200 hover:bg-amber-50 hover:border-amber-300 rounded-lg text-left flex items-start gap-2 group transition-all cursor-pointer shadow-sm"
                >
                  <Share2 className="w-4.5 h-4.5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-slate-800 text-[11px] group-hover:text-amber-700">Markdown Code</strong>
                    <span className="text-[9px] text-slate-400 block">Copy raw markdown text</span>
                  </div>
                </button>

                {/* GitHub Ready */}
                <button 
                  type="button"
                  onClick={handleExportGithub}
                  className="p-2.5 bg-slate-950 text-white hover:bg-[#EA580C] rounded-lg text-left flex items-start gap-2 group transition-all cursor-pointer shadow-md"
                >
                  <Code className="w-4.5 h-4.5 text-white mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-white text-[11px]">Jekyll Frontmatter</strong>
                    <span className="text-[9px] text-slate-200 block">Copy Hugo blogs template</span>
                  </div>
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/20">
            <HelpCircle className="w-10 h-10 text-slate-300 mb-3 animate-pulse" />
            <span className="text-xs font-bold text-slate-500 uppercase">Analysis report vacant</span>
            <p className="text-[11px] text-slate-400 max-w-xs mt-1.5 leading-relaxed">
              Please paste your draft copy in the editor slot and execute an initial audit check to pull metrics.
            </p>
          </div>
        )}

      </aside>

    </div>
  );
}
