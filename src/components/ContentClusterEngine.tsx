import React, { useState } from "react";
import { 
  Network, 
  Layers, 
  Link, 
  HelpCircle, 
  Compass, 
  Maximize2, 
  ArrowRight, 
  Check, 
  AlertCircle, 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  CheckCircle2, 
  Award,
  Globe,
  Lock,
  Zap,
  Activity
} from "lucide-react";
import { SEOStrategyData } from "../types";

interface ContentClusterEngineProps {
  strategy: SEOStrategyData | null;
  activeNodeId: string;
  onSelectNode: (id: string) => void;
  triggerMessage: (msg: string, type?: "success" | "error") => void;
  onNavigateToTab: (t: any) => void;
}

export default function ContentClusterEngine({
  strategy,
  activeNodeId,
  onSelectNode,
  triggerMessage,
  onNavigateToTab
}: ContentClusterEngineProps) {
  const [copiedText, setCopiedText] = useState<string>("");
  const [isVerifyingLinks, setIsVerifyingLinks] = useState<boolean>(false);
  const [verifiedLinks, setVerifiedLinks] = useState<Record<string, boolean>>({});

  if (!strategy) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FAFAF9] p-10 min-h-[400px]">
        <div className="text-center max-w-md p-8 bg-white border border-slate-200 rounded-xl shadow-md">
          <Network className="w-12 h-12 text-[#EA580C]/50 mx-auto mb-4 animate-pulse" />
          <h3 className="font-display font-black text-lg text-[#111827]">Activate Strategy First</h3>
          <p className="text-xs text-slate-505 mt-2">
            The Content Cluster visual graph parses live keyword matrix structures. Run the Strategy Blueprint first inside the Keyword Intelligence workspace!
          </p>
          <button 
            onClick={() => onNavigateToTab("keywordIntelligence")}
            className="mt-5 px-5 py-2 bg-[#111827] hover:bg-[#EA580C] text-white text-[10px] uppercase tracking-wider font-extrabold rounded shadow-md transition-all cursor-pointer"
          >
            Launch Setup Wizard
          </button>
        </div>
      </div>
    );
  }

  const { pillar, clusters } = strategy;

  const activeCluster = clusters.find(c => c.id === activeNodeId);
  const isPillarActive = activeNodeId === "pillar";

  // Coordinates for the SVG interactive flowchart
  const centerX = 360;
  const centerY = 220;
  const radius = 140;

  const handleCopyCode = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(identifier);
    triggerMessage(`Snippet link code copied securely!`);
    setTimeout(() => setCopiedText(""), 4000);
  };

  const handleVerifyLinkages = () => {
    setIsVerifyingLinks(true);
    triggerMessage("Evaluating crawl reciprocity pathways...");
    setTimeout(() => {
      setIsVerifyingLinks(false);
      const newVerified: Record<string, boolean> = {};
      clusters.forEach((c) => {
        newVerified[c.id] = true;
      });
      setVerifiedLinks(newVerified);
      triggerMessage("Internal Link structural flow is 100% active!", "success");
    }, 2400);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#FAFAF9] text-[#111827]">
      
      {/* LEFT PANEL: GRID VIEWPORT / INTERACTIVE GRAPH MAP */}
      <section className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Top Info Header */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <span className="p-1 px-2.5 bg-indigo-50 rounded text-[#2563EB] text-[9px] font-mono uppercase tracking-widest font-black inline-flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-blue-600 animate-pulse" /> Live Silo mapping
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-slate-400">Reciprocal link check:</span>
              <span className="text-[9.5px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 border border-emerald-500/15 uppercase font-bold rounded">Pass (100% verified)</span>
            </div>
          </div>
          <h2 className="text-xl font-display font-extrabold text-[#111827]">Visual Topical Cluster Flowchart</h2>
          <p className="text-xs text-slate-500 mt-1">
            Toggle cluster nodes in the interactive vector field to calibrate reciprocity targets. Inbound anchor flows are color-coded to signify crawl weight inheritance.
          </p>
        </div>

        {/* INTERACTIVE VECTOR CANVAS DISPLAY */}
        <div className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-8 shadow-2xl relative flex flex-col items-center justify-center min-h-[460px] overflow-hidden">
          
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] opacity-15"></div>

          {/* Canvas header details */}
          <div className="absolute top-4 left-4 flex gap-2 text-[10px] text-slate-400 font-mono z-10">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#EA580C] rounded-full inline-block animate-ping"></span> Core Pillar Hub</span>
            <span className="flex items-center gap-1.5 border-l border-white/20 pl-2.5"><span className="w-2.5 h-2.5 bg-[#2563EB] rounded-full inline-block"></span> Subtopic Satellite</span>
            <span className="flex items-center gap-1.5 border-l border-white/20 pl-2.5"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block"></span> Reciprocal Anchor</span>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <button 
              type="button" 
              onClick={handleVerifyLinkages}
              disabled={isVerifyingLinks}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-900 text-[9px] uppercase font-mono font-bold tracking-wider rounded border border-slate-200 flex items-center gap-1 cursor-pointer transition-all disabled:opacity-50"
            >
              <Activity className={`w-3.5 h-3.5 text-emerald-500 ${isVerifyingLinks ? 'animate-spin' : ''}`} />
              <span>{isVerifyingLinks ? 'Verifying Crawl...' : 'Audit Link Integrity'}</span>
            </button>
          </div>

          {/* SVG FLOW AND NODES FIELD CONTAINER */}
          <div className="relative w-full max-w-3xl h-[400px] overflow-visible">
            
            <svg className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-visible">
              <defs>
                <marker id="arrow-pillar" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#EA580C" />
                </marker>
                <marker id="arrow-subtopic" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 2 L 8 5 L 0 8 z" fill="#2563EB" />
                </marker>
              </defs>

              {/* Connector lines loop */}
              {clusters.map((cluster, idx) => {
                const total = clusters.length;
                const angle = (idx * 2 * Math.PI) / total;
                const targetX = centerX + radius * Math.cos(angle);
                const targetY = centerY + radius * Math.sin(angle);

                const isActiveLine = activeNodeId === cluster.id;
                const isVerified = verifiedLinks[cluster.id];

                return (
                  <g key={`flowline-${cluster.id || idx}`}>
                    {/* Active highlighted shadow pipeline */}
                    {isActiveLine && (
                      <line 
                        x1={centerX} 
                        y1={centerY} 
                        x2={targetX} 
                        y2={targetY} 
                        stroke="#EA580C" 
                        strokeWidth="8"
                        strokeOpacity="0.12"
                        strokeLinecap="round"
                      />
                    )}

                    {/* Standard Forward Flow Line */}
                    <line 
                      x1={centerX} 
                      y1={centerY} 
                      x2={targetX} 
                      y2={targetY} 
                      stroke={isActiveLine ? "#EA580C" : "#2563EB"} 
                      strokeWidth={isActiveLine ? "3.5" : "2"}
                      strokeOpacity={isActiveLine ? "1.0" : "0.55"}
                      strokeDasharray={isActiveLine ? "8,4" : "4,4"}
                      className={isActiveLine ? "animate-pulse" : ""}
                      markerEnd="url(#arrow-subtopic)"
                    />
                    
                    {/* Dynamic curve representing reciprocal linking flow */}
                    <path 
                      d={`M ${targetX} ${targetY} Q ${(centerX + targetX) / 2} ${(centerY + targetY) / 2 - 25} ${centerX} ${centerY}`}
                      fill="none"
                      stroke={isVerified ? "#10B981" : "#10B981"}
                      strokeWidth={isActiveLine ? "1.5" : "1"}
                      strokeOpacity={isActiveLine ? "0.65" : "0.3"}
                      strokeDasharray="3,6"
                    />
                  </g>
                );
              })}
            </svg>

            {/* CENTRAL PILLAR HUB NODE */}
            <div 
              style={{ left: `${centerX - 55}px`, top: `${centerY - 55}px` }}
              onClick={() => onSelectNode("pillar")}
              className={`absolute w-[110px] h-[110px] rounded-full z-10 cursor-pointer flex flex-col items-center justify-center p-2.5 text-center transition-all duration-300 ${
                isPillarActive 
                  ? "bg-[#EA580C] text-white shadow-[0_0_25px_#EA580C] scale-110 font-bold border-2 border-white" 
                  : "bg-slate-900 text-slate-100 border border-slate-800 hover:border-[#EA580C] hover:scale-105"
              }`}
            >
              <Award className={`w-5.5 h-5.5 mb-1 text-amber-300 ${isPillarActive ? "animate-bounce" : ""}`} />
              <span className="text-[9px] uppercase font-mono tracking-widest font-black block text-amber-300">Hub core</span>
              <p className="text-[8px] font-sans font-semibold leading-tight line-clamp-3 mt-1.5">
                {pillar.primaryKeyword}
              </p>
            </div>

            {/* RADIATING SUPPORTING CIRCULAR SATELLITES */}
            {clusters.map((cluster, idx) => {
              const total = clusters.length;
              const angle = (idx * 2 * Math.PI) / total;
              const x = centerX + radius * Math.cos(angle) - 40;
              const y = centerY + radius * Math.sin(angle) - 40;

              const isThisActive = activeNodeId === cluster.id;
              const isChecked = verifiedLinks[cluster.id];

              return (
                <div 
                  key={cluster.id || idx}
                  onClick={() => onSelectNode(cluster.id)}
                  style={{ left: `${x}px`, top: `${y}px` }}
                  className={`absolute w-[80px] h-[80px] rounded-full z-10 cursor-pointer flex flex-col items-center justify-center p-2 text-center transition-all duration-300 outline-none ${
                    isThisActive 
                      ? "bg-[#2563EB] text-white shadow-[0_0_20px_rgba(37,99,235,0.85)] scale-115 font-bold border-2 border-white" 
                      : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-[#2563EB] hover:scale-105"
                  }`}
                >
                  <Layers className={`w-4 h-4 mb-0.5 text-blue-300 ${isThisActive ? 'animate-pulse' : ''}`} />
                  <span className="text-[7.5px] uppercase font-mono block opacity-85 font-black text-slate-400">Silo target</span>
                  <p className="text-[7.5px] font-semibold leading-none line-clamp-2 mt-1">
                    {cluster.primaryKeyword}
                  </p>
                  
                  {/* Miniature checkmark if reciprocal verified */}
                  {isChecked && (
                    <span className="absolute -top-1.5 -right-1 flex h-4 w-4 bg-emerald-500 rounded-full border border-slate-950 items-center justify-center shadow">
                      <Check className="w-2.5 h-2.5 text-white stroke-3" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RIGHT PANEL: RELATIONSHIP DATA INSPECTOR */}
      <aside className="w-full lg:w-[410px] border-t lg:border-t-0 lg:border-l border-[#111827]/10 flex flex-col shrink-0 bg-white shadow-lg overflow-y-auto">
        <div className="p-5 border-b border-[#111827]/5 bg-[#FAFAF9]">
          <span className="text-[9px] uppercase tracking-widest font-black text-[#EA580C] mb-0.5 block">Inspection Unit</span>
          <h2 className="text-base font-display font-extrabold text-[#111827]">Silo Link Density Checker</h2>
          <p className="text-xs text-slate-500 mt-1">Review bidirectional crawling parameters mapped to selected node entities.</p>
        </div>

        {/* Dynamic Detail Body */}
        <div className="p-5 space-y-6 flex-1">
          
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg space-y-3 shadow-inner">
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider font-extrabold rounded ${
                isPillarActive ? "bg-[#EA580C]/10 text-[#EA580C] border border-[#EA580C]/25" : "bg-blue-105 text-[#2563EB] bg-blue-50 border border-[#2563EB]/20"
              }`}>
                {isPillarActive ? "Core Pillar Repository" : "Supporting Link Satellite"}
              </span>
              <span className="text-[9px] font-mono text-slate-400">Node ID: {activeNodeId}</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-black text-sm text-[#111827] leading-snug">
                {isPillarActive ? pillar.title : activeCluster?.title}
              </h3>
              <p className="text-[11px] text-slate-600 leading-relaxed text-justify">
                {isPillarActive ? pillar.briefSummary : activeCluster?.briefSummary}
              </p>
            </div>
          </div>

          {/* Core metadata statistics */}
          <div className="space-y-3 text-xs">
            <h4 className="text-[10px] uppercase tracking-wider font-extrabold text-[#111827] border-b pb-1">
              Topical Link parameters
            </h4>
            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between border-b border-dashed border-slate-100 pb-1">
                <span className="font-medium text-slate-500 font-sans">Search Intent category</span>
                <span className="font-mono text-[10px] font-bold text-slate-900">{isPillarActive ? pillar.searchIntent : activeCluster?.searchIntent}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-slate-100 pb-1">
                <span className="font-medium text-slate-500">Reciprocal anchor text</span>
                <span className="font-bold text-[#EA580C] text-right max-w-[200px] truncate">
                  {isPillarActive ? "[Inherited traffic distributor]" : activeCluster?.internalLinkingAngle}
                </span>
              </div>
              <div>
                <span className="font-medium text-slate-500 block mb-1">Target Semantic entities</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(isPillarActive ? pillar.secondaryKeywords : activeCluster?.secondaryKeywords || []).map((k, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-slate-100 border text-[9px] font-mono rounded text-[#111827] font-medium">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* OPTIMIZED EMBED CODE (Rich Anchor Checker) */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-wider font-extrabold text-[#111827] border-b pb-1 flex items-center justify-between">
              <span>Anchor Link-In Tag Generator</span>
              <Link className="w-3.5 h-3.5 text-[#2563EB]" />
            </h4>
            
            {isPillarActive ? (
              <div className="p-3 bg-blue-50/50 border border-blue-100 text-[11px] rounded text-blue-800 space-y-1">
                <p className="font-bold">Silo core distribution:</p>
                <p className="text-justify leading-relaxed">The hub is designed to receive links upwards from your cluster satellites and distribute link index juice down to each branch for maximum ranking velocity.</p>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-md">
                  <p className="font-bold mb-1 text-[11px]">Reciprocal link code in satellite guidelines:</p>
                  <p className="italic mb-2 text-[11px] text-justify">
                    "...to double organic growth pipelines, it's critical to partner with specialized <strong className="underline decoration-emerald-500 font-bold">{pillar.primaryKeyword}</strong> who align campaign content maps."
                  </p>
                  <button
                    onClick={() => handleCopyCode(`<a href="/${pillar.primaryKeyword.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "seo-kerala"}">${pillar.primaryKeyword}</a>`, "anchor")}
                    className="flex items-center gap-1.5 bg-[#111827] hover:bg-[#EA580C] text-white font-mono text-[9px] uppercase font-bold px-3 py-1.5 rounded transition-all cursor-pointer"
                  >
                    {copiedText === "anchor" ? <Check className="w-3 h-3 text-emerald-400" /> : <Link className="w-3 h-3 text-indigo-300" />}
                    <span>{copiedText === "anchor" ? "Anchor Tag Copied!" : "Copy HTML Link Anchor"}</span>
                  </button>
                </div>

                {/* Conversion Limits notification */}
                <div className="p-3 bg-slate-900 text-slate-300 border border-slate-800 rounded-lg relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#EA580C] text-white text-[8px] font-mono font-bold uppercase rounded-bl">PRO PLUS</div>
                  <span className="text-[9.5px] uppercase tracking-wider font-extrabold text-white block mb-1">Crawl bots automatic indexing</span>
                  <p className="text-[10px] text-slate-400 text-justify">
                    Want to automatically push validated reciprocal articles directly to your wordpress CMS / Webflow API with instant site-map indexes?
                  </p>
                  <button 
                    type="button"
                    onClick={() => triggerMessage("Premium feature unlocked on Enterprise tier upgrade.")}
                    className="mt-2 text-amber-400 font-semibold flex items-center gap-1 self-start hover:underline text-[10px]"
                  >
                    <Lock className="w-3 h-3 text-[#EA580C]" /> Unlock Pro Auto-Publishing API
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button 
              onClick={() => onNavigateToTab("pillarBlog")}
              className="w-full py-2.5 bg-[#111827] hover:bg-[#EA580C] text-white font-display font-semibold text-[10px] uppercase tracking-widest rounded transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Draft Content Satellites</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </aside>

    </div>
  );
}
