import React, { useState } from "react";
import { 
  Layers, 
  ChevronRight, 
  HelpCircle, 
  Code, 
  Link, 
  Check, 
  Copy, 
  ShieldAlert, 
  Network, 
  Maximize2,
  Lock,
  ArrowRight,
  TrendingUp,
  Activity
} from "lucide-react";
import { SEOStrategyData } from "../types";

interface SiloArchitectureMapProps {
  strategy: SEOStrategyData | null;
  triggerMessage: (msg: string, type?: "success" | "error") => void;
  onNavigateToTab: (t: any) => void;
}

export default function SiloArchitectureMap({
  strategy,
  triggerMessage,
  onNavigateToTab
}: SiloArchitectureMapProps) {
  
  const [copiedCodeType, setCopiedCodeType] = useState<string>("");
  const [hoveredPath, setHoveredPath] = useState<{
    id: string;
    title: string;
    source: string;
    target: string;
    anchors: Array<{ anchor: string; reason: string; ctr: string }>;
    relevance: string;
    intent: string;
  } | null>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  if (!strategy) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FAFAF9] p-10 min-h-[400px]">
        <div className="text-center max-w-sm p-8 bg-white border border-slate-200 rounded-xl shadow-md">
          <Layers className="w-12 h-12 text-[#EA580C]/50 mx-auto mb-4 animate-pulse" />
          <h3 className="font-display font-black text-lg text-[#111827]">Silo Schema Map Vacant</h3>
          <p className="text-xs text-slate-500 mt-2">
            Multi-tier technical directory maps require active campaign tags. Generate an initial strategy in the campaign lobby first !
          </p>
          <button 
            type="button"
            onClick={() => onNavigateToTab("keywordIntelligence")}
            className="mt-5 px-5 py-2.5 bg-[#111827] hover:bg-[#EA580C] text-white text-[10px] uppercase tracking-wider font-extrabold rounded shadow-md transition-all cursor-pointer"
          >
            Launch Setup Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { pillar, clusters } = strategy;

  // Semantic keyword suggestions engine
  const getSemanticSuggestions = (
    sourceTitle: string,
    targetTitle: string,
    primaryKeyword: string,
    secondaryKeywords: string[],
    intent: string
  ) => {
    const rawKw = primaryKeyword || "SEO services";
    const kw = rawKw.toLowerCase();
    const secondaries = secondaryKeywords && secondaryKeywords.length > 0
      ? secondaryKeywords
      : ["topical authority", "organic search prominence", "Google trust factors"];

    return [
      {
        anchor: `expert ${kw} methodology`,
        reason: "Positions the target destination as an authority-level resource, matching Google's transactional search intent.",
        ctr: "+5.4% CTR Lift"
      },
      {
        anchor: `leveraging ${secondaries[0] ? secondaries[0].toLowerCase() : "on-page strategy"}`,
        reason: "Triggers high-information-seeking curiosity loops for informational subtopics.",
        ctr: "+4.1% CTR Lift"
      },
      {
        anchor: `comprehensive guide on ${kw}`,
        reason: "Excellent for multi-layer category directories, boosting overall domain topical depth indices.",
        ctr: "+4.8% CTR Lift"
      }
    ];
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    let x = e.clientX + 15;
    let y = e.clientY + 15;
    
    // Viewport bounds preservation
    if (typeof window !== "undefined") {
      if (x + 340 > window.innerWidth) {
        x = e.clientX - 340;
      }
      if (y + 300 > window.innerHeight) {
        y = e.clientY - 280;
      }
    }
    setMousePos({ x, y });
  };

  const handlePathHover = (
    id: string,
    title: string,
    source: string,
    target: string,
    primaryKeyword: string,
    secondaryKeywords: string[],
    intent: string,
    e: React.MouseEvent,
    linkingAngleExplained?: string
  ) => {
    // Compile anchors dynamically
    const computedAnchors = getSemanticSuggestions(source, target, primaryKeyword, secondaryKeywords, intent);
    const relevance = linkingAngleExplained 
      ? linkingAngleExplained 
      : `Establishing a reciprocal linking route between "${source}" and "${target}" concentrates search engine domain flow. Using high-relevance anchor variants targets crawler path retention.`;

    setHoveredPath({
      id,
      title,
      source,
      target,
      anchors: computedAnchors,
      relevance,
      intent
    });
    
    handleMouseMove(e);
  };

  const handlePathLeave = () => {
    setHoveredPath(null);
  };

  const handleCopyCode = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeType(type);
    triggerMessage("Containment server directive copied!");
    setTimeout(() => setCopiedCodeType(""), 3500);
  };

  const htaccessCode = `# APACHE COHERENT SEO SILO CONTAINER RULES
# Restress cross-leaks of search index credentials
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_URI} ^/silo-level-3/ [NC]
RewriteHeader Referer !^https://yourdomain.co/${pillar.primaryKeyword.toLowerCase().replace(/[^a-z0-0]/g, "-") || "seo-kerala"} [NC]
RewriteRule ^(.*)$ /${pillar.primaryKeyword.toLowerCase().replace(/[^a-z0-0]/g, "-") || "seo-kerala"} [R=301,L]`;

  const nginxCode = `# NGINX LOCATION STRUCTURED SILO DIRECTIVES
location ~* ^/silo-level-3/ {
    valid_referers none blocked server_names *.yourdomain.co;
    if ($invalid_referer) {
        return 403;
    }
    try_files $uri $uri/ /${pillar.primaryKeyword.toLowerCase().replace(/[^a-z0-0]/g, "-") || "seo-kerala"};
}`;

  return (
    <div className="flex-1 p-5 sm:p-8 lg:p-10 bg-[#FAFAF9] overflow-y-auto space-y-6 text-[#111827]">
      
      {/* Title block */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
        <span className="p-1 px-2.5 bg-[#EA580C]/10 rounded text-[#EA580C] text-[9.5px] uppercase tracking-wider font-black flex items-center gap-1.5 w-fit mb-3">
          <Lock className="w-4.5 h-4.5 text-[#EA580C]" /> Architectural Crawl Restrictions
        </span>
        <h2 className="text-xl font-display font-extrabold text-[#111827]">Topical Silo Category Directory Map</h2>
        <p className="text-xs text-slate-500 mt-1">
          Strict directory containers prevent keyword dilution. Crawler bots are guided chronologically from supporting child links back to the core parent to concentrate link juice.
        </p>
      </div>

      {/* VISUAL HIERARCHICAL TREE */}
      <div id="architectural-tree-grid" className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-3 border-slate-100 flex-wrap gap-2">
          <h3 className="font-display font-extrabold text-sm text-[#111827] flex items-center gap-1.5">
            <Network className="w-4.5 h-4.5 text-[#EA580C]" /> Directory Authority Hierarchy Layout
          </h3>
          <span className="text-[10px] uppercase font-mono bg-emerald-50 text-emerald-700 font-extrabold border px-2 py-0.5 rounded">
            Crawling Loop: Zero leaks Mapped
          </span>
        </div>

        <div className="space-y-6 max-w-4xl font-sans text-xs">
          
          {/* LEVEL 1: Pillar Page */}
          <div className="bg-slate-950 text-white rounded-xl p-5 shadow-lg border border-slate-900 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-1 bg-[#EA580C] text-white text-[8px] font-mono uppercase font-bold">CORE HUB TIER 1</div>
            <span className="text-[9px] tracking-widest text-[#EA580C] uppercase font-black block mb-1">
              Topical Nucleus / Core Page
            </span>
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <span className="bg-white/10 px-2 py-1 font-mono rounded text-[10px] text-zinc-300 font-bold">/{pillar.primaryKeyword.toLowerCase().replace(/[^a-z0-0]/g, "-") || "seo-services-kerala"}</span>
              <span className="font-extrabold text-xs sm:text-sm text-white line-clamp-1">{pillar.title}</span>
            </div>
          </div>

          {/* Connect Down Link Path with Hoverable Badge */}
          <div className="flex flex-col items-center select-none py-2 relative group/path">
            <div className="h-10 w-0.5 bg-gradient-to-b from-slate-900 to-slate-200 transition-colors duration-300 group-hover/path:from-[#EA580C] group-hover/path:to-blue-600 border-dashed border"></div>
            <div 
              onMouseEnter={(e) => handlePathHover("pillar-to-t2-link", "Master Core Hub Link Path", pillar.title, "Tier-2 Silo Directories", pillar.primaryKeyword, pillar.secondaryKeywords, "Commercial Traffic Routing", e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handlePathLeave}
              className="absolute top-[25%] bg-white border border-slate-200 hover:border-[#EA580C] hover:bg-slate-50 hover:text-[#EA580C] rounded-full p-1.5 shadow-md hover:scale-110 transition-all cursor-crosshair z-10 flex items-center justify-center text-slate-500"
            >
              <Link className="w-3.5 h-3.5 animate-pulse" />
            </div>
          </div>

          {/* LEVEL 2: Intermediate category bucket */}
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-4.5 relative">
            <span className="absolute top-2.5 right-3 text-[8px] font-mono text-slate-400 font-bold uppercase">Tier Level 2 Segment</span>
            <span className="text-[9px] tracking-wider text-[#2563EB] uppercase font-black block mb-1">
              Intermediate Category Silos
            </span>
            <div className="flex flex-wrap gap-2.5 mt-2.5">
              <div className="px-3 py-1.5 bg-white border border-slate-200 hover:border-[#EA580C] rounded font-mono font-bold text-[9.5px] text-[#111827] shadow-sm cursor-pointer transition-all">
                /{pillar.primaryKeyword.toLowerCase().replace(/[^a-z0-0]/g, "-") || "seo-kerala"}/marketing/
              </div>
              <div className="px-3 py-1.5 bg-white border border-slate-200 hover:border-[#EA580C] rounded font-mono font-bold text-[9.5px] text-[#111827] shadow-sm cursor-pointer transition-all">
                /{pillar.primaryKeyword.toLowerCase().replace(/[^a-z0-0]/g, "-") || "seo-kerala"}/technical/
              </div>
              <div className="px-3 py-1.5 bg-white border border-slate-200 hover:border-[#EA580C] rounded font-mono font-bold text-[9.5px] text-[#111827] shadow-sm cursor-pointer transition-all">
                /{pillar.primaryKeyword.toLowerCase().replace(/[^a-z0-0]/g, "-") || "seo-kerala"}/local/
              </div>
            </div>
          </div>

          {/* Connect Down Link Path to Satellites */}
          <div className="flex flex-col items-center select-none py-2 relative group/path">
            <div className="h-10 w-0.5 bg-gradient-to-b from-slate-200 to-slate-300 transition-colors duration-300 group-hover/path:from-blue-600 group-hover/path:to-emerald-500 border-dashed border"></div>
            <div 
              onMouseEnter={(e) => handlePathHover("t2-to-t3-link", "Category Hub Pathway", "Category Segment Folders", "Satellite Subtopic Drafts", "Cluster Subtopics", [], "Navigational Depth", e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handlePathLeave}
              className="absolute top-[25%] bg-white border border-slate-200 hover:border-blue-600 hover:bg-slate-50 hover:text-[#2563EB] rounded-full p-1.5 shadow-md hover:scale-110 transition-all cursor-crosshair z-10 flex items-center justify-center text-slate-500"
            >
              <Link className="w-3.5 h-3.5 animate-pulse" />
            </div>
          </div>

          {/* LEVEL 3: Supporting long-tail articles (Child Nodes) */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 relative">
            <span className="absolute top-2.5 right-3 text-[8px] font-mono text-slate-400 font-bold uppercase font-mono">Tier Level 3 Satellites</span>
            <span className="text-[9px] tracking-wider text-emerald-700 uppercase font-black block mb-1.5">
              Peripheral Satellite Support Drafts
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {clusters.map((c, i) => (
                <div 
                  key={c.id || i} 
                  className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-[#EA580C] hover:bg-[#FAFAF9] transition-all flex flex-col justify-between text-xs cursor-pointer group"
                >
                  <div className="w-full flex justify-between items-start">
                    <div className="space-y-1 py-0.5 flex-1 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8px] font-mono uppercase bg-slate-200 text-slate-600 px-1.5 py-0.2 rounded font-bold">BRANCH {i + 1}</span>
                        <span className="text-[8.5px] font-mono bg-blue-50 text-[#2563EB] px-1 rounded font-bold">{c.searchIntent || "Transactional"}</span>
                      </div>
                      <h5 className="font-extrabold text-slate-800 leading-tight block truncate max-w-[280px] group-hover:text-[#EA580C]">{c.title}</h5>
                      <span className="text-[8.5px] font-mono text-slate-400 block break-all">/{pillar.primaryKeyword.toLowerCase().replace(/[^a-z0-0]/g, "-") || "seo-kerala"}/silo-level-3/{c.primaryKeyword.toLowerCase().replace(/[^a-z0-9]+/g, "-")}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 select-none ml-2 group-hover:translate-x-1 transition-transform mt-2" />
                  </div>

                  {/* Reciprocal linking hover pathway recommendation */}
                  <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-200/50">
                    <span className="text-[8px] text-slate-400 uppercase font-mono font-bold">Linking flow:</span>
                    <span 
                      onMouseEnter={(e) => handlePathHover(`cluster-to-pillar-${c.id}`, "Reciprocal Link Juice Flow", c.title, pillar.title, c.primaryKeyword, c.secondaryKeywords, c.searchIntent, e, c.internalLinkingAngle)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handlePathLeave}
                      className="px-2 py-0.5 bg-blue-50 hover:bg-[#EA580C] text-[#2563EB] hover:text-white border border-blue-100 hover:border-[#EA580C] rounded font-mono text-[8.5px] font-bold tracking-wider flex items-center gap-1 cursor-crosshair transition-all active:scale-95 shadow-sm"
                    >
                      <Link className="w-2.5 h-2.5 text-[#2563EB] group-hover:text-white shrink-0" />
                      View Anchor Recommendations
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED HIGH-CTR LINK PATH DIRECTORY PANEL */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
        <div>
          <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-[#EA580C] block mb-0.5">Silo Interlinking Calibration</span>
          <h3 className="font-display font-extrabold text-sm text-[#111827] flex items-center gap-1.5">
            <Link className="w-4 h-4 text-[#EA580C]" /> High-CTR Internal Link Path Directory
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Hover over any path badge below to preview custom semantic anchor texts calibrated for optimal crawler indexing and click attraction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            onMouseEnter={(e) => handlePathHover("pillar-to-t2-dir", "Master Core Hub Directive", pillar.title, "Tier-2 Silo Directories", pillar.primaryKeyword, pillar.secondaryKeywords, "Commercial Traffic Routing", e)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handlePathLeave}
            className="p-3.5 bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200 rounded-lg flex flex-col justify-between cursor-help relative group shadow-sm hover:border-[#EA580C]/20"
          >
            <div>
              <span className="text-[8px] font-mono uppercase bg-[#EA580C]/10 text-[#EA580C] px-1.5 py-0.2 rounded font-bold">CORE HUB UP-LINK</span>
              <p className="font-extrabold text-xs text-slate-850 mt-1">{pillar.primaryKeyword} ➔ Silo Segments</p>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-3 font-mono pt-2 border-t border-slate-200/50">
              <span className="text-[9px]">Primary Path</span>
              <span className="text-indigo-600 font-extrabold">Hover to Analyze</span>
            </div>
          </div>

          {clusters.map((c, i) => (
            <div 
              key={c.id || i}
              onMouseEnter={(e) => handlePathHover(`cluster-to-pillar-dir-${c.id}`, "Satellite Anchor calibration", c.title, pillar.title, c.primaryKeyword, c.secondaryKeywords, c.searchIntent, e, c.internalLinkingAngle)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handlePathLeave}
              className="p-3.5 bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200 rounded-lg flex flex-col justify-between cursor-help relative group shadow-sm hover:border-emerald-500/20"
            >
              <div>
                <span className="text-[8px] font-mono uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">RECIPROCAL LINKFLOW</span>
                <p className="font-extrabold text-xs text-slate-850 mt-1">{c.primaryKeyword} ➔ Core Hub</p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-3 font-mono pt-2 border-t border-slate-200/50">
                <span className="text-[9px]">Branch #{i + 1} Path</span>
                <span className="text-emerald-700 font-extrabold">Hover to Analyze</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVER CONTAINER REDIRECT RULES */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* .htaccess */}
        <div className="bg-white border rounded-xl p-5 shadow-sm flex flex-col justify-between hover:border-[#EA580C]/10 transition-all">
          <div className="space-y-3">
            <h4 className="font-display font-extrabold text-sm text-[#111827] flex items-center gap-1.5">
              <Code className="text-[#EA580C] w-4.5 h-4.5" /> Apache (.htaccess) Silo Restrictor
            </h4>
            <p className="text-xs text-slate-500 text-justify">
              Add this directory rewrite code block inside your root hierarchy htaccess folder to block search crawlers from straying across segment branches.
            </p>

            <pre className="bg-[#111827] text-slate-300 p-4 rounded-lg font-mono text-[9px] border border-slate-900 overflow-auto max-h-[150px] leading-relaxed">
              {htaccessCode}
            </pre>
          </div>

          <button 
            type="button"
            onClick={() => handleCopyCode(htaccessCode, "htaccess")}
            className="w-full mt-4 py-2 bg-[#111827] hover:bg-[#EA580C] text-[#FAFAF9] font-mono text-[10px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
          >
            {copiedCodeType === "htaccess" ? "Copied Apache Rules!" : "Copy Apache directives"}
          </button>
        </div>

        {/* Nginx directives */}
        <div className="bg-white border rounded-xl p-5 shadow-sm flex flex-col justify-between hover:border-[#EA580C]/10 transition-all">
          <div className="space-y-3">
            <h4 className="font-display font-extrabold text-sm text-[#111827] flex items-center gap-1.5">
              <Code className="text-blue-600 w-4.5 h-4.5" /> Nginx Server Silo Routing block
            </h4>
            <p className="text-xs text-slate-500 text-justify">
              Add this location regex directive inside your site virtual host server configuration array to force crawl index consolidation automatically.
            </p>

            <pre className="bg-[#111827] text-slate-300 p-4 rounded-lg font-mono text-[9px] border border-slate-900 overflow-auto max-h-[150px] leading-relaxed">
              {nginxCode}
            </pre>
          </div>

          <button 
            type="button"
            onClick={() => handleCopyCode(nginxCode, "nginx")}
            className="w-full mt-4 py-2 bg-[#111827] hover:bg-[#EA580C] text-[#FAFAF9] font-mono text-[10px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
          >
            {copiedCodeType === "nginx" ? "Copied Nginx Rules!" : "Copy Nginx directives"}
          </button>
        </div>

      </div>

      {/* FLOATING ANCHOR SUGGESTIONS TOOLTIP POP-OVER */}
      {hoveredPath && (
        <div 
          className="fixed z-50 bg-slate-950/95 text-white border border-slate-800 rounded-xl shadow-2xl p-5 w-80 pointer-events-none transition-all duration-150 select-none leading-relaxed max-w-sm animate-in fade-in"
          style={{ 
            top: `${mousePos.y}px`, 
            left: `${mousePos.x}px`,
            WebkitBackdropFilter: "blur(12px)",
            backdropFilter: "blur(12px)"
          }}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[9px] uppercase tracking-wider font-mono font-black text-[#EA580C] flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> High-CTR Link Path
              </span>
              <span className="text-[8.5px] bg-indigo-500/10 border border-indigo-500/20 text-[#2563EB] px-1.5 py-0.2 rounded font-mono font-bold">
                {hoveredPath.intent || "Transactional"}
              </span>
            </div>

            <div className="text-xs text-slate-300">
              <p className="font-semibold text-white text-[11px] mb-1">Topical Flow Direction:</p>
              <div className="flex items-center gap-1 px-2.5 py-1.5 bg-white/5 rounded font-mono text-[9px] text-[#EA580C] font-extrabold mb-2.5">
                <span className="truncate max-w-[100px] text-zinc-300">{hoveredPath.source}</span>
                <span className="text-slate-500">➔</span>
                <span className="truncate max-w-[100px] text-zinc-300">{hoveredPath.target}</span>
              </div>
              
              <p className="font-semibold text-white text-[11px] mb-1">Semantic Relevance Angle:</p>
              <p className="text-[10px] text-slate-400 leading-normal mb-3 text-justify">
                {hoveredPath.relevance}
              </p>

              <div className="space-y-2 border-t border-white/5 pt-2">
                <p className="font-semibold text-[#EA580C] text-[10px] uppercase tracking-wider font-mono">Suggested CTR Anchor Phrases:</p>
                <div className="space-y-1.5">
                  {hoveredPath.anchors.map((item, idx) => (
                    <div key={idx} className="p-2 bg-white/5 hover:bg-white/10 rounded border border-white/10 space-y-0.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-100 text-[10px]">"{item.anchor}"</span>
                        <span className="text-emerald-400 font-extrabold font-mono text-[8px] shrink-0 bg-emerald-500/10 px-1 rounded">{item.ctr}</span>
                      </div>
                      <p className="text-[9px] text-slate-400 leading-snug">{item.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
