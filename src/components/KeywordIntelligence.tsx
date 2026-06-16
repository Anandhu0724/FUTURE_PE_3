import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { 
  BarChart4, 
  HelpCircle, 
  MapPin, 
  Search, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle, 
  Globe, 
  Settings, 
  TrendingUp, 
  Zap, 
  Gauge, 
  ShieldCheck, 
  Users,
  Compass,
  Layers,
  Award,
  DollarSign,
  Briefcase,
  Lock,
  ChevronRight,
  Info
} from "lucide-react";
import { SEOStrategyData } from "../types";
import CompetitorGapChart from "./CompetitorGapChart";

interface KeywordIntelligenceProps {
  businessName: string;
  setBusinessName: (v: string) => void;
  businessType: string;
  setBusinessType: (v: string) => void;
  websiteUrl: string;
  setWebsiteUrl: (v: string) => void;
  primaryService: string;
  setPrimaryService: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  targetAudience: string;
  setTargetAudience: (v: string) => void;
  targetKeyword: string;
  setTargetKeyword: (v: string) => void;
  competitorUrl: string;
  setCompetitorUrl: (v: string) => void;
  blogWordCount: string;
  setBlogWordCount: (v: string) => void;
  supportingBlogsNum: string;
  setSupportingBlogsNum: (v: string) => void;

  // Advanced settings
  searchIntentFocus: string;
  setSearchIntentFocus: (v: string) => void;
  localSeoMode: boolean;
  setLocalSeoMode: (v: boolean) => void;
  eeatOptimization: boolean;
  setEeatOptimization: (v: boolean) => void;
  semanticExpansion: boolean;
  setSemanticExpansion: (v: boolean) => void;
  aiContentDepth: string;
  setAiContentDepth: (v: string) => void;

  // Strategy & loading
  strategy: SEOStrategyData | null;
  isGeneratingStrategy: boolean;
  onGenerateStrategy: () => Promise<void>;
  onNavigateToTab: (tab: any) => void;
  onSelectNode: (nodeId: string) => void;
  triggerMessage: (msg: string, type?: "success" | "error") => void;
}

export default function KeywordIntelligence({
  businessName, setBusinessName,
  businessType, setBusinessType,
  websiteUrl, setWebsiteUrl,
  primaryService, setPrimaryService,
  location, setLocation,
  targetAudience, setTargetAudience,
  targetKeyword, setTargetKeyword,
  competitorUrl, setCompetitorUrl,
  blogWordCount, setBlogWordCount,
  supportingBlogsNum, setSupportingBlogsNum,
  searchIntentFocus, setSearchIntentFocus,
  localSeoMode, setLocalSeoMode,
  eeatOptimization, setEeatOptimization,
  semanticExpansion, setSemanticExpansion,
  aiContentDepth, setAiContentDepth,
  strategy,
  isGeneratingStrategy,
  onGenerateStrategy,
  onNavigateToTab,
  onSelectNode,
  triggerMessage
}: KeywordIntelligenceProps) {
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [generationStep, setGenerationStep] = useState(0);
  
  // Interactive Onboarding states
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [activeKeywordIndex, setActiveKeywordIndex] = useState<number | null>(0);
  const [chartView, setChartView] = useState<"traffic" | "value">("traffic");

  // Simulated live loading checklist steps
  const steps = [
    "Analyzing competitor link graphs...",
    "Querying local intent densities near " + (location || "Kerala") + "...",
    "Extracting semantic LSI co-occurrences...",
    "Drafting EEAT content blueprints..."
  ];

  // SaaS Mock metrics / pricing model helpers
  const wordCountMultiplier = Number(blogWordCount) || 1500;
  const numBlogs = Number(supportingBlogsNum) || 5;
  const estimatedCampaignVolume = 1200 + (numBlogs * 480);
  const totalCampaignValue = estimatedCampaignVolume * 2.85;

  const handleGenerateClick = async () => {
    setGenerationStep(0);
    const interval = setInterval(() => {
      setGenerationStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 2800);

    try {
      if (isOnboardingOpen) {
        setIsOnboardingOpen(false);
      }
      await onGenerateStrategy();
    } finally {
      clearInterval(interval);
    }
  };

  // Simulated chart data representing organic growth traffic projections (premium 6-month curves)
  const forecastData = [
    { month: "Current", baseline: 250, projected: 250, valueBaseline: 712, valueProjected: 712 },
    { month: "Month 1", baseline: 280, projected: 410, valueBaseline: 798, valueProjected: 1168 },
    { month: "Month 2", baseline: 310, projected: 820, valueBaseline: 883, valueProjected: 2337 },
    { month: "Month 3", baseline: 330, projected: 1450, valueBaseline: 940, valueProjected: 4132 },
    { month: "Month 4", baseline: 340, projected: 2100, valueBaseline: 969, valueProjected: 5985 },
    { month: "Month 5", baseline: 360, projected: 2900, valueBaseline: 1026, valueProjected: 8265 },
    { month: "Month 6", baseline: 380, projected: 3950, valueBaseline: 1083, valueProjected: 11257 },
  ];

  // Premium Keyword intelligence deck elements representing Ahrefs style detail cards
  const keywordsDeck = [
    { 
      keyword: targetKeyword || "SEO Services Kerala", 
      volume: 1200, 
      kd: 42, 
      cpc: 2.45, 
      intent: "Commercial", 
      opp: "High Quickwin",
      features: ["Sitelinks", "Local Map Pack", "Organic Snippet"],
      connectingAngle: "Targets regional standard pricing retainers and agency qualifications."
    },
    { 
      keyword: "affordable SEO packages Kochi Kerala", 
      volume: 880, 
      kd: 28, 
      cpc: 3.10, 
      intent: "Transactional", 
      opp: "Highly Profitable",
      features: ["Local Map Pack", "Reviews Rating"],
      connectingAngle: "Highlights local direct SME booking and ROI calculator funnels."
    },
    { 
      keyword: "SEO expert Kerala", 
      volume: 595, 
      kd: 34, 
      cpc: 1.85, 
      intent: "Investigative", 
      opp: "E-E-A-T Native",
      features: ["People Also Ask", "Organic Snippet"],
      connectingAngle: "Positions personal branding, portfolios, and individual credentials."
    },
    { 
      keyword: "best organic search agency Kochi", 
      volume: 420, 
      kd: 19, 
      cpc: 4.15, 
      intent: "Commercial", 
      opp: "Immediate Conversion",
      features: ["Sitelinks", "Local Map Pack"],
      connectingAngle: "Targets multi-location retail hubs and enterprise traders in Kochi."
    },
    { 
      keyword: "what is SEO cost in Kerala", 
      volume: 310, 
      kd: 12, 
      cpc: 1.50, 
      intent: "Informational", 
      opp: "Low-Hanging Fruit",
      features: ["FAQ Snippet", "Organic Snippet"],
      connectingAngle: "Presents transparent, clean cost tables to build bottom-of-funnel trust."
    }
  ];

  const activeDeckKW = activeKeywordIndex !== null ? keywordsDeck[activeKeywordIndex] : null;

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#FAFAF9] text-[#111827]">
      
      {/* 1. CONTROL PANEL SIDEBAR */}
      <aside className="w-full lg:w-[410px] border-b lg:border-b-0 lg:border-r border-[#111827]/10 flex flex-col shrink-0 bg-white shadow-lg overflow-y-auto z-10">
        
        {/* Onboarding Assistant Launch Strip */}
        <div className="bg-[#111827] text-white p-4 flex items-center justify-between gap-2 border-b border-[#EA580C]/25">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EA580C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F97316]"></span>
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono tracking-widest text-[#F97316] font-bold uppercase">SaaS Launch Assist</span>
              <span className="text-xs text-slate-300 font-medium">Onboarding flow diagnostic</span>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => {
              setOnboardingStep(1);
              setIsOnboardingOpen(true);
            }} 
            className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white font-display font-medium text-[10px] uppercase tracking-wider py-1.5 px-3 rounded shadow transition-all duration-300 cursor-pointer"
          >
            Launch Wizard
          </button>
        </div>

        {/* Regular Configuration Body */}
        <div className="p-5 border-b border-[#111827]/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 px-1.5 bg-[#F97316]/10 rounded text-[#F97316]">
              <Settings className="w-4 h-4" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#F97316]">Targeting Settings</span>
          </div>
          <h2 className="text-lg font-display font-bold leading-tight text-[#111827]">SEO Campaign Matrix</h2>
          <p className="text-[11px] text-[#111827]/60 mt-0.5">Customize properties parsed directly by our high-level Gemini analysis core.</p>
        </div>

        <div className="p-5 space-y-4 flex-1">
          {/* Brand & Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#111827]/60 block mb-1">Business Name</label>
              <input 
                type="text" 
                value={businessName} 
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-[#F97316] rounded px-2.5 py-1.5 text-xs text-[#111827] outline-none transition-all font-medium"
                placeholder="e.g. GrowthSpark"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#111827]/60 block mb-1 font-sans">Business Type</label>
              <input 
                type="text" 
                value={businessType} 
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-[#F97316] rounded px-2.5 py-1.5 text-xs text-[#111827] outline-none transition-all font-medium"
                placeholder="e.g. Digital Agency"
              />
            </div>
          </div>

          <div className="grid grid-cols-1">
            <div>
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#111827]/60 block mb-1">Website Domain URL</label>
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-[#111827]/40"><Globe className="w-3.5 h-3.5" /></span>
                <input 
                  type="url" 
                  value={websiteUrl} 
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#F97316] pl-8 pr-2.5 py-1.5 rounded text-xs text-[#111827] outline-none transition-all font-medium"
                  placeholder="https://growthspark-digital.co"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#111827]/60 block mb-1">Core Service / Topical Angle</label>
            <input 
              type="text" 
              value={primaryService} 
              onChange={(e) => setPrimaryService(e.target.value)}
              className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#F97316] rounded px-2.5 py-1.5 text-xs text-[#111827] outline-none transition-all font-medium"
              placeholder="e.g. SEO services, local search optimization"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#111827]/60 block mb-1">Geotarget City</label>
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-[#111827]/40"><MapPin className="w-3.5 h-3.5" /></span>
                <input 
                  type="text" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#F97316] pl-8 pr-2.5 py-1.5 rounded text-xs text-[#111827] outline-none transition-all font-medium"
                  placeholder="e.g. Kerala, India"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#111827]/60 block mb-1">Primary Keyword</label>
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-[#111827]/40"><Search className="w-3.5 h-3.5" /></span>
                <input 
                  type="text" 
                  value={targetKeyword} 
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#F97316] pl-8 pr-2.5 py-1.5 rounded text-xs text-[#111827] outline-none transition-all font-semibold"
                  placeholder="e.g. SEO Services Kerala"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#111827]/60 block mb-1 font-sans">Ideal Buyer Profile</label>
            <input 
              type="text" 
              value={targetAudience} 
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#F97316] rounded px-2.5 py-1.5 text-xs text-[#111827] outline-none transition-all font-medium"
              placeholder="e.g. Regional retail brands, multi-location traders"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#111827]/60 block mb-1">Competitor Benchmark Domain</label>
              <input 
                type="url" 
                value={competitorUrl} 
                onChange={(e) => setCompetitorUrl(e.target.value)}
                className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#F97316] rounded px-2.5 py-1.5 text-xs text-[#111827] outline-none transition-all font-medium"
                placeholder="https://competitor.com"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#111827]/60 block mb-1">Target Blog Words</label>
              <select 
                value={blogWordCount} 
                onChange={(e) => setBlogWordCount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-[#111827] outline-none transition-all font-medium"
              >
                <option value="1500">1,500 words (Standard)</option>
                <option value="2500">2,500 words (Pillar)</option>
                <option value="4000">4,000 words (Authority Guide)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1">
            <div>
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#111827]/60 block mb-1">Cluster Size (Supporting Articles)</label>
              <select 
                value={supportingBlogsNum} 
                onChange={(e) => setSupportingBlogsNum(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-[#111827] outline-none transition-all font-medium"
              >
                <option value="4">4 Supporting (SME Starter)</option>
                <option value="6">6 Supporting (Standard Silo)</option>
                <option value="8">8 Supporting (Topical Domination)</option>
              </select>
            </div>
          </div>

          {/* ADVANCED CALIBRATION TOGGLES */}
          <div className="border-t border-slate-100 pt-3">
            <button 
              type="button" 
              onClick={() => setShowAdvanced(!showAdvanced)} 
              className="flex items-center justify-between w-full text-[10px] uppercase tracking-wider font-extrabold text-[#111827]/65 mb-2 hover:text-[#EA580C]"
            >
              <span>SaaS Semantic Overlays</span>
              <span className="font-mono text-xs">{showAdvanced ? "−" : "+"}</span>
            </button>

            {showAdvanced && (
              <div className="space-y-3 bg-[#FAFAF9] p-3 rounded-lg border border-[#111827]/5 text-xs">
                <div>
                  <label className="text-[9px] uppercase tracking-wider font-bold text-slate-500 block mb-0.5">Search Intent Focus Scale</label>
                  <select 
                    value={searchIntentFocus} 
                    onChange={(e) => setSearchIntentFocus(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs text-[#111827] outline-none font-medium"
                  >
                    <option value="Commercial & Local Buying Intent">Commercial & Local Buying Intent</option>
                    <option value="High Intent Transactional Search">High Intent Transactional Search</option>
                    <option value="Pure Educational Informational Guides">Pure Educational Informational Guides</option>
                    <option value="Navigational & Authoritative Entity Signals">Navigational & Authoritative Entity Signals</option>
                  </select>
                </div>

                {/* Local SEO mode switch */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>Geo-Target Proximity Schema</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={localSeoMode}
                    onChange={(e) => setLocalSeoMode(e.target.checked)}
                    className="accent-[#F97316] w-3.5 h-3.5 cursor-pointer"
                  />
                </div>

                {/* EEAT Optimization switch */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>Strict Trust & E-E-A-T Anchoring</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={eeatOptimization}
                    onChange={(e) => setEeatOptimization(e.target.checked)}
                    className="accent-blue-600 w-3.5 h-3.5 cursor-pointer"
                  />
                </div>

                {/* Semantic Expansion switch */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Deep Cluster Link Density</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={semanticExpansion}
                    onChange={(e) => setSemanticExpansion(e.target.checked)}
                    className="accent-emerald-600 w-3.5 h-3.5 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-wider font-bold text-slate-500 block mb-0.5">Model Optimization Engine</label>
                  <select 
                    value={aiContentDepth} 
                    onChange={(e) => setAiContentDepth(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs text-[#111827] outline-none font-medium"
                  >
                    <option value="Hyper-Focused Competitor Analysis">Hyper-Focused Competitor Analysis</option>
                    <option value="Deep Network Structure Modeling">Deep Network Structure Modeling</option>
                    <option value="Balanced Speedy Layout">Balanced Balanced Layout</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* GENERATE STRATEGY BUTTON */}
          <button 
            type="button"
            onClick={handleGenerateClick}
            disabled={isGeneratingStrategy}
            className="w-full bg-[#111827] hover:bg-[#EA580C] disabled:bg-slate-400 text-white font-display font-semibold uppercase tracking-wider text-xs py-3 rounded transition-all duration-300 flex items-center justify-center gap-2 shadow-md relative cursor-pointer"
          >
            {isGeneratingStrategy ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Injecting Semantic Graph...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Execute Strategy Blueprint</span>
              </>
            )}
          </button>

          {/* Simulated progress state indicators */}
          {isGeneratingStrategy && (
            <div className="mt-2 p-3 bg-slate-50 border border-[#111827]/10 rounded space-y-2 animate-pulse text-[11px]">
              <div className="flex justify-between items-center text-slate-600 font-medium">
                <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-[#EA580C] animate-pulse" /> Active crawler process</span>
                <span>{generationStep * 25 + 25}%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded overflow-hidden">
                <div 
                  className="bg-[#EA580C] h-full transition-all duration-[2800ms]"
                  style={{ width: `${generationStep * 25 + 25}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-500 italic">Task: {steps[generationStep]}</p>
            </div>
          )}
        </div>
      </aside>

      {/* 2. CHIEF CONTENT VIEWPORT */}
      <main className="flex-1 bg-[#FAFAF9] overflow-y-auto p-5 sm:p-8 space-y-6">
        
        {/* PREMIUM METADATA BAR / HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[9px] font-mono tracking-widest uppercase bg-[#EA580C]/15 text-[#EA580C] font-black border border-[#EA580C]/25">
                ACTIVE PLAN: PROFESSIONAL $99/Mo
              </span>
              <span className="text-[10px] font-mono text-slate-400">Campaign UUID: 365d-24e0</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-display font-extrabold text-[#111827] tracking-tight mt-1 flex items-center gap-2">
              SaaS Strategic Hub
              {strategy && <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 border border-emerald-500/20 uppercase rounded">Live Strategy Set</span>}
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto font-sans">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded bg-blue-50 text-[#2563EB] border border-[#2563EB]/20">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> E-E-A-T Verified
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded bg-slate-950 text-white shadow-sm border border-slate-900">
              <Briefcase className="w-3.5 h-3.5 text-[#EA580C]" /> Agency Mode
            </span>
          </div>
        </div>

        {/* ----------------------------------------------------
            NEW PREMIUM BENTO GRID KPIs (Conversion features lock / credit limit sliders)
            ---------------------------------------------------- */}
        <div id="saas-metrics-deck" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* KPI 1 : Topical Authority Concentration */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-[#EA580C]/25 transition-all">
            <div className="flex justify-between items-start mb-1.5">
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500">Topical Coverage index</span>
              <span className="p-1 px-1.5 bg-[#EA580C]/10 rounded text-[#EA580C] font-mono text-[9px] font-extrabold">Layer-1</span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-display font-black text-[#111827]">{strategy ? "94.8%" : "81.4%"}</span>
              <span className="text-[10px] text-slate-500">/ 100</span>
            </div>
            {/* Custom mini Concentric ring progress bar visually */}
            <div className="w-full bg-slate-100 h-1.5 mt-3 rounded overflow-hidden">
              <div className="bg-[#EA580C] h-full transition-all duration-700" style={{ width: strategy ? "94.8%" : "81.4%" }}></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Corresponds to deep LSI coverage across Kerala.</p>
          </div>

          {/* KPI 2 : Estimating organic value yield */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm group hover:border-emerald-500/25 transition-all">
            <div className="flex justify-between items-start mb-1.5">
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500">Est. Search Traffic Volume</span>
              <span className="p-1 bg-emerald-50 text-emerald-700 rounded"><TrendingUp className="w-3.5 h-3.5" /></span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-display font-black text-emerald-700">+{estimatedCampaignVolume.toLocaleString()}</span>
              <span className="text-[10px] text-slate-500">Clicks/mo</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block"></span>
              CPC value potential: ${totalCampaignValue.toLocaleString()}/mo
            </p>
          </div>

          {/* KPI 3 : Keyword Effort Quotient */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm group hover:border-amber-500/25 transition-all">
            <div className="flex justify-between items-start mb-1.5">
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500">Keyword Entry difficulty</span>
              <span className="p-1 bg-amber-50 rounded text-amber-600"><BarChart4 className="w-3.5 h-3.5" /></span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-display font-black text-[#111827]">38%</span>
              <span className="text-[10px] text-amber-600 font-mono font-bold uppercase tracking-wider">MEDIUM EFFORT</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 mt-3 rounded overflow-hidden">
              <div className="bg-amber-500 h-full w-[38%]"></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Highly accessible for newly calibrated domains.</p>
          </div>

          {/* KPI 4 : SaaS Credit Balance meter (Conversion-Focused UX) */}
          <div className="bg-slate-950 text-white border border-slate-900 rounded-xl p-4 shadow-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-1 bg-[#EA580C]/20 border-b border-l border-[#EA580C]/30 text-[8px] font-mono uppercase font-bold text-[#F97316]">PRO TIER</div>
            <div className="flex justify-between items-start mb-1.5">
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">Content Draft Credits</span>
              <span className="p-0.5 text-amber-400 border border-amber-400/20 bg-amber-400/5 rounded font-mono text-[9px]">9.2k used</span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-display font-black tracking-tight text-white">{numBlogs} / 10</span>
              <span className="text-[9px] text-slate-400 uppercase font-mono">Articles Left</span>
            </div>
            <div className="w-full bg-slate-800 h-1 mt-2.5 rounded overflow-hidden">
              <div className="bg-[#EA580C] h-full" style={{ width: `${(numBlogs/10)*100}%` }}></div>
            </div>
            <p className="text-[9px] text-neutral-400 mt-2 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer">
              Upgrade to Unlimited drafts <ChevronRight className="w-3 h-3 text-[#EA580C]" />
            </p>
          </div>
        </div>

        {/* ----------------------------------------------------
            PRO-VISUALIZATION: AREA CHART (Ranking Potential Forecast)
            ---------------------------------------------------- */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 border-slate-100 gap-3">
            <div>
              <span className="px-2 py-0.5 rounded text-[8.5px] font-mono font-bold tracking-wider uppercase bg-[#2563EB]/10 text-[#2563EB]">
                Ranking Potential & Growth Forecast
              </span>
              <h3 className="font-display font-bold text-base text-[#111827] mt-1">
                6-Month Predictive Organic SEO Traffic Yield
              </h3>
              <p className="text-[11px] text-slate-500">
                A projection model contrasting status-quo PPC baseline searches versus implementing custom structured semantic Silo blocks.
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200">
              <button 
                onClick={() => setChartView("traffic")}
                className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded transition-all cursor-pointer ${chartView === "traffic" ? "bg-white text-slate-900 shadow-sm font-bold border border-slate-200/50" : "text-slate-500"}`}
              >
                Organic Traffic (Clicks)
              </button>
              <button 
                onClick={() => setChartView("value")}
                className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded transition-all cursor-pointer ${chartView === "value" ? "bg-white text-slate-900 shadow-sm font-bold border border-slate-200/50" : "text-slate-500"}`}
              >
                Traffic Value (USD)
              </button>
            </div>
          </div>

          <div className="h-[280px] w-full font-sans text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EA580C" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#EA580C" stopOpacity={0.01}/>
                  </linearGradient>
                  <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#111827", color: "#f8fafc", borderRadius: "8px", border: "none" }}
                  labelStyle={{ fontWeight: "bold", color: "#ea580c" }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "10px", marginTop: "10px" }} />
                
                <Area 
                  name="Evergreen Pillar-Cluster Execution" 
                  type="monotone" 
                  dataKey={chartView === "traffic" ? "projected" : "valueProjected"} 
                  stroke="#EA580C" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorProjected)" 
                />
                <Area 
                  name="Status-Quo PPC Baseline" 
                  type="monotone" 
                  dataKey={chartView === "traffic" ? "baseline" : "valueBaseline"} 
                  stroke="#2563EB" 
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fillOpacity={0.2} 
                  fill="url(#colorBaseline)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competitor Gap Analysis Chart using D3.js */}
        <CompetitorGapChart 
          websiteUrl={websiteUrl}
          competitorUrl={competitorUrl}
          targetKeyword={targetKeyword}
        />

        {/* ----------------------------------------------------
            NEW VISUALIZATION: SECTION ON TOPICAL AUTHORITY PROGRESS DIAGRAM
            ---------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Concentric Authority Graph representation */}
          <div className="bg-[#111827] text-white p-5 rounded-xl shadow-lg flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#EA580C] block">Topical Authority Layers</span>
              <h4 className="text-base font-display font-black text-white mt-1 leading-snug">
                Concentric Link Authority Calibration
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed mt-2 text-justify">
                Our semantic model visualizes authority as nested directories. Linking every peripheral child node directly back to your high-level Pillar core constructs an impenetrable search ranking buffer.
              </p>
            </div>

            {/* Concentric rings SVG Graphic */}
            <div className="flex items-center justify-center py-2">
              <svg width="140" height="140" className="overflow-visible">
                {/* Outermost ring */}
                <circle cx="70" cy="70" r="60" fill="none" stroke="#2a354f" strokeWidth="4" />
                <circle cx="70" cy="70" r="60" fill="none" stroke="#2563EB" strokeWidth="4" strokeDasharray="180, 370" />
                
                {/* Middle ring */}
                <circle cx="70" cy="70" r="45" fill="none" stroke="#37312f" strokeWidth="4" />
                <circle cx="70" cy="70" r="45" fill="none" stroke="#EA580C" strokeWidth="4" strokeDasharray="130, 280" />

                {/* Inner ring */}
                <circle cx="70" cy="70" r="30" fill="none" stroke="#1d2d31" strokeWidth="4" />
                <circle cx="70" cy="70" r="30" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="95, 190" />

                <circle cx="70" cy="70" r="14" fill="#111827" stroke="#EA580C" strokeWidth="2" />
                <text x="70" y="73" fill="#ea580c" fontSize="9" fontWeight="bold" textAnchor="middle">CORE</text>
              </svg>
            </div>

            <div className="space-y-1.5 text-[10px] text-slate-300 border-t border-white/5 pt-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#2563EB]"></span> Satellite link reciprocity</span>
                <span className="font-mono font-bold text-white">92.4% Optimal</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#EA580C]"></span> LSI keyword co-occurrence</span>
                <span className="font-mono font-bold text-white">88% Saturated</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#10b981]"></span> Technical local schema link</span>
                <span className="font-mono font-bold text-white">100% Validated</span>
              </div>
            </div>
          </div>

          {/* Master Recommendation Pillar Card (Major SEO opportunity list) */}
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm lg:col-span-2 space-y-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-[#EA580C]/10 text-[#EA580C] text-[9px] uppercase tracking-wider font-extrabold rounded-full inline-block">
                  ★ Primary Organic Lead-Generator
                </span>
                <span className="text-[10px] font-mono text-slate-400">PILLAR TIER LEVEL 1</span>
              </div>

              <div className="mt-2 space-y-1">
                <h3 className="text-base font-display font-extrabold text-[#111827] leading-snug max-w-lg">
                  {strategy ? strategy.pillar.title : "The Ultimate Guide to Modern SEO Services in Kerala: Scaling Organic Growth for Indian & Global Brands"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">
                  {strategy ? strategy.pillar.briefSummary : "This comprehensive guide serves as an authoritative industry reference, addressing major core search signals and positioning local service providers as market leaders."}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs leading-none">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider mb-1">Search Intent</span>
                <span className="font-semibold text-slate-700">{strategy ? strategy.pillar.searchIntent : "Commercial Setup"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider mb-1">Primary Keyword</span>
                <span className="font-mono text-[9px] font-semibold text-[#EA580C]">{strategy ? strategy.pillar.primaryKeyword : "SEO Services Kerala"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider mb-1">Estimated Traffic</span>
                <span className="font-semibold text-emerald-600">+{wordCountMultiplier + 3200} Clicks/mo</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider mb-1">Competition</span>
                <span className="font-semibold text-amber-600">High Trust / Low KD</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-50">
              <button 
                onClick={() => {
                  onSelectNode("pillar");
                  onNavigateToTab("contentCluster");
                  triggerMessage("Pillar Node targeted in visual linking flowchart.");
                }}
                className="px-4 py-2 bg-slate-950 hover:bg-[#EA580C] text-white text-[10px] uppercase font-display tracking-wider font-bold rounded flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Flowchart Link-Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <button 
                onClick={() => {
                  onSelectNode("pillar");
                  onNavigateToTab("pillarBlog");
                  triggerMessage("Pillar Node engaged in Article draft space.");
                }}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 text-[10px] uppercase font-display tracking-wider border border-slate-200 font-bold rounded transition-all cursor-pointer"
              >
                Draft Pillar Article
              </button>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------
            NEW VISUALIZATION: KEYWORD INTELLIGENCE CARDS (Interactive Table/Deck)
            ---------------------------------------------------- */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div>
            <span className="bg-slate-100 text-slate-600 font-mono text-[9px] px-2.5 py-0.5 rounded font-black border uppercase">
              SEMrush & Ahrefs Companion
            </span>
            <h3 className="font-display font-extrabold text-base text-[#111827] mt-1">
              Topical Opportunity Intelligence Deck
            </h3>
            <p className="text-xs text-slate-500">
              Interactive target queries formulated with real-time estimated search volumes, difficulty score ratios, and target SERP rich snippet requirements. Click any keyword below to configure semantic angles instantly!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Interactive Cards Column */}
            <div className="lg:col-span-2 space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {keywordsDeck.map((kw, idx) => {
                const isActive = activeKeywordIndex === idx;
                const difficultyColor = kw.kd < 20 ? "text-emerald-600 bg-emerald-50 border-emerald-500/15" : kw.kd < 35 ? "text-amber-600 bg-amber-50 border-amber-500/15" : "text-orange-600 bg-orange-50 border-orange-500/15";
                
                return (
                  <div 
                    key={idx}
                    onClick={() => setActiveKeywordIndex(idx)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between gap-4 ${isActive ? 'bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-[#EA580C]/40' : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'}`}
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-[#EA580C]">#{idx + 1}</span>
                        <h4 className={`font-display font-bold text-xs ${isActive ? 'text-white' : 'text-slate-900'}`}>{kw.keyword}</h4>
                        <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-mono font-bold ${difficultyColor}`}>
                          {kw.opp}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400">
                        <span>Intent: <strong className={isActive ? "text-white" : "text-slate-700 font-semibold"}>{kw.intent}</strong></span>
                        <span>CPC: <strong className="text-emerald-500 font-semibold">${kw.cpc}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 text-right">
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-slate-400">Vol/mo</span>
                        <span className="text-xs font-mono font-extrabold">{kw.volume.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-mono">KD Indicator</span>
                        <span className={`text-xs font-mono font-extrabold ${kw.kd < 25 ? 'text-emerald-500' : 'text-orange-500'}`}>{kw.kd}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Keyword details / Action panel */}
            <div className="bg-[#111827] text-white p-5 rounded-xl flex flex-col justify-between space-y-4">
              {activeDeckKW ? (
                <div className="space-y-4">
                  <div>
                    <span className="text-[8.5px] font-mono tracking-widest text-[#EA580C] uppercase font-bold">On-Page Optimization Rules</span>
                    <h4 className="text-sm font-display font-extrabold text-white mt-1 leading-snug">
                      "{activeDeckKW.keyword}"
                    </h4>
                    <p className="text-[11px] text-slate-300 italic mt-2">
                      {activeDeckKW.connectingAngle}
                    </p>
                  </div>

                  {/* SERP Features needed list */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono">Desired SERP Targets:</span>
                    <div className="flex flex-wrap gap-1">
                      {activeDeckKW.features.map((feat, i) => (
                        <span key={i} className="bg-white/10 text-white font-mono text-[9px] px-2 py-0.5 rounded border border-white/5 font-semibold">
                          ✦ {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estimated Lift</span>
                      <span className="text-emerald-400 font-bold">+18.4% CTR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">CPC average rating</span>
                      <span className="text-white font-bold">${activeDeckKW.cpc} USD</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <Info className="w-8 h-8 text-slate-500 mb-2" />
                  <p className="text-xs text-slate-400">Select any target keyword opportunity on the left to review metrics.</p>
                </div>
              )}

              <button 
                type="button"
                onClick={() => {
                  if (activeDeckKW) {
                    setTargetKeyword(activeDeckKW.keyword);
                    triggerMessage(`Primary targeted search term updated: "${activeDeckKW.keyword}"`);
                  }
                }}
                className="w-full bg-[#EA580C] hover:bg-white hover:text-[#111827] text-white text-[10px] uppercase font-mono tracking-wider py-2 rounded font-bold transition-all"
              >
                Hook As Dominant Keyword
              </button>
            </div>

          </div>
        </div>

        {/* ----------------------------------------------------
            NEW VISUALIZATION: DETAILED LIST OF SATELLITE ARTICLES
            ---------------------------------------------------- */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 border-b border-slate-100 pb-3 gap-2">
            <div>
              <h3 className="font-display font-extrabold text-base text-[#111827]">
                Cluster Supporting Articles Draftboard
              </h3>
              <p className="text-xs text-slate-500">
                LSI intent satellites structured specifically to link directly back to your central Pillar hub to distribute crawled authority.
              </p>
            </div>
            <span className="bg-slate-50 text-slate-500 font-mono text-[10px] px-3 py-1 border rounded-md font-bold shrink-0 self-start sm:self-auto">
              Total Silo Branches: {strategy ? strategy.clusters.length : 5}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {(strategy?.clusters || []).map((cluster, i) => (
              <div 
                key={cluster.id || i}
                onClick={() => {
                  onSelectNode(cluster.id);
                  triggerMessage(`Active Draft node: "${cluster.title}"`);
                }}
                className="border border-slate-200 hover:border-[#EA580C] hover:bg-[#FAFAF9] p-4 rounded-lg cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500 group-hover:bg-[#EA580C]/5 group-hover:text-[#EA580C] font-extrabold">
                      Cluster Node {i + 1}
                    </span>
                    <span className="px-1.5 py-0.5 text-[8.5px] font-mono uppercase bg-blue-50 text-[#2563EB] font-bold rounded">
                      {cluster.searchIntent || "Transactional"}
                    </span>
                  </div>
                  <h4 className="font-display font-extrabold text-xs text-[#111827] line-clamp-2 leading-snug">
                    {cluster.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    {cluster.briefSummary}
                  </p>
                </div>

                <div className="border-t border-slate-100/80 pt-2.5 mt-3.5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Primary keyword target: <strong className="font-mono text-[9px] text-[#EA580C]">{cluster.primaryKeyword}</strong></span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectNode(cluster.id);
                      onNavigateToTab("pillarBlog");
                    }}
                    className="text-[#EA580C] font-bold hover:underline flex items-center gap-0.5"
                  >
                    Draft <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* ----------------------------------------------------
          INTERACTIVE ONBOARDING FLOW MODAL WIZARD
          ---------------------------------------------------- */}
      {isOnboardingOpen && (
        <div id="onboarding-modal-overlay" className="fixed inset-0 bg-[#111827]/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          
          <div id="onboarding-modal-panel" className="bg-white border-2 border-slate-900 rounded-xl max-w-lg w-full shadow-2xl relative overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-[#111827] text-white p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-display font-extrabold text-sm tracking-tight text-white uppercase">SaaS Campaign Calibration</h3>
                  <p className="text-[10px] text-slate-400 lowercase font-mono">enterprise onboarding portal v3.5</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setIsOnboardingOpen(false)} 
                className="text-slate-400 hover:text-white font-mono text-xs p-1"
              >
                ✕ Close
              </button>
            </div>

            {/* Progress indicator bar */}
            <div className="w-full bg-slate-100 h-1 flex">
              <div className="bg-[#EA580C] h-full transition-all duration-300" style={{ width: `${(onboardingStep / 4) * 100}%` }}></div>
            </div>

            <div className="p-6 space-y-4 flex-1">
              
              {/* Step 1: Core Entity details */}
              {onboardingStep === 1 && (
                <div className="space-y-4">
                  <span className="text-[8.5px] font-mono tracking-widest text-[#EA580C] uppercase font-bold">Step 1 of 4: Brand Alignment</span>
                  <p className="text-xs text-slate-600">Enter your business identifier parameters. This establishes entity matching rules parsed on Google knowledge graphs.</p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 block mb-1">Business Name ID</label>
                      <input 
                        type="text" 
                        value={businessName} 
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs outline-none"
                        placeholder="e.g. GrowthSpark Digital"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 block mb-1">Company Classification Type</label>
                      <input 
                        type="text" 
                        value={businessType} 
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs outline-none"
                        placeholder="e.g. Agency, E-commerce, B2B SaaS"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Location and service targets */}
              {onboardingStep === 2 && (
                <div className="space-y-4">
                  <span className="text-[8.5px] font-mono tracking-widest text-[#EA580C] uppercase font-bold">Step 2 of 4: Geotargeting Modifiers</span>
                  <p className="text-xs text-slate-600">Calibrate regional vectors. Local landing page models will map neighboring districts based on this proximity.</p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 block mb-1">Core Targeted Service</label>
                      <input 
                        type="text" 
                        value={primaryService} 
                        onChange={(e) => setPrimaryService(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs outline-none"
                        placeholder="e.g. SEO services, web design audits"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 block mb-1">Primary Base City / Target Region</label>
                      <input 
                        type="text" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs outline-none"
                        placeholder="e.g. Kochi, Kerala"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Primary Keyword and Competitors */}
              {onboardingStep === 3 && (
                <div className="space-y-4">
                  <span className="text-[8.5px] font-mono tracking-widest text-[#EA580C] uppercase font-bold">Step 3 of 4: Keyword Calibration</span>
                  <p className="text-xs text-slate-600">Determine your dominant targeted query and benchmark parameters against existing rank competitors.</p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 block mb-1">Dominant Targeted Search Term</label>
                      <input 
                        type="text" 
                        value={targetKeyword} 
                        onChange={(e) => setTargetKeyword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs outline-none font-semibold"
                        placeholder="e.g. SEO services in Kerala"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 block mb-1">Competitor Benchmark URL</label>
                      <input 
                        type="url" 
                        value={competitorUrl} 
                        onChange={(e) => setCompetitorUrl(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs outline-none"
                        placeholder="https://competitor-domain.com"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirm and Launch */}
              {onboardingStep === 4 && (
                <div className="space-y-4">
                  <span className="text-[8.5px] font-mono tracking-widest text-[#EA580C] uppercase font-bold">Step 4 of 4: Verify Blueprint</span>
                  <p className="text-xs text-slate-600">Your SaaS parameters have successfully validated. Read through the structural checklist below before activating strategy crawls:</p>
                  
                  <div className="bg-[#111827] text-white p-4 rounded-lg space-y-2 text-xs font-mono">
                    <div className="flex justify-between border-b border-slate-800 pb-1 text-[11px]">
                      <span className="text-slate-400">Business:</span>
                      <span className="text-[#EA580C] truncate max-w-[200px] font-bold">{businessName}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1 text-[11px]">
                      <span className="text-slate-400">Service:</span>
                      <span className="text-white truncate max-w-[200px]">{primaryService}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1 text-[11px]">
                      <span className="text-slate-400">Target Keyword:</span>
                      <span className="text-[#EA580C] truncate max-w-[200px]">{targetKeyword}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Crawl Target Size:</span>
                      <span className="text-[#10B981] font-bold">{supportingBlogsNum} supporting nodes</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <span className="text-[10px] text-slate-400 font-mono">Step {onboardingStep} of 4</span>
              
              <div className="flex items-center gap-1.5">
                {onboardingStep > 1 && (
                  <button 
                    type="button" 
                    onClick={() => setOnboardingStep(onboardingStep - 1)}
                    className="p-2 border border-slate-200 bg-white text-slate-700 rounded text-xs hover:bg-slate-50 font-medium cursor-pointer"
                  >
                    Back
                  </button>
                )}
                {onboardingStep < 4 ? (
                  <button 
                    type="button" 
                    onClick={() => {
                      if (onboardingStep === 1 && !businessName) {
                        triggerMessage("Please fill business name to progress.", "error");
                        return;
                      }
                      if (onboardingStep === 2 && !primaryService) {
                        triggerMessage("Please supply service keywords.", "error");
                        return;
                      }
                      setOnboardingStep(onboardingStep + 1);
                    }}
                    className="bg-[#111827] hover:bg-[#EA580C] text-white select-none px-4 py-2 font-display uppercase tracking-widest text-[10px] font-black rounded cursor-pointer"
                  >
                    Continue
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={handleGenerateClick}
                    className="bg-[#EA580C] hover:bg-emerald-600 text-white select-none px-5 py-2 font-display uppercase tracking-widest text-[10px] font-black rounded flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Map</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
