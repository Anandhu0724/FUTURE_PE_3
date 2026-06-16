import React, { useState } from "react";
import { 
  MapPin, 
  RefreshCw, 
  Sparkles, 
  Check, 
  Map, 
  Navigation, 
  Maximize2, 
  AlertCircle,
  HelpCircle,
  Building,
  ListTodo,
  Code,
  Activity,
  Award
} from "lucide-react";
import { LocalSEOPlaybookData } from "../types";

interface LocalSEOPlaybookProps {
  businessName: string;
  setBusinessName: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  primaryService: string;
  setPrimaryService: (v: string) => void;
  playbook: LocalSEOPlaybookData | null;
  isGeneratingPlaybook: boolean;
  onGeneratePlaybook: () => Promise<void>;
  triggerMessage: (msg: string, type?: "success" | "error") => void;
  onNavigateToTab: (t: any) => void;
}

export default function LocalSEOPlaybook({
  businessName, setBusinessName,
  location, setLocation,
  primaryService, setPrimaryService,
  playbook,
  isGeneratingPlaybook,
  onGeneratePlaybook,
  triggerMessage,
  onNavigateToTab
}: LocalSEOPlaybookProps) {
  
  const [selectedGeoPin, setSelectedGeoPin] = useState<string>("central");
  const [copiedSchema, setCopiedSchema] = useState<boolean>(false);

  const localPins = [
    { id: "central", label: "Central District Hub", coords: { x: 180, y: 150 }, volume: "High", density: "46%" },
    { id: "sub-coastal", label: "Coastal Retail Row", coords: { x: 100, y: 220 }, volume: "Medium", density: "32%" },
    { id: "tech-park", label: "Kakkanad Digital Node", coords: { x: 280, y: 190 }, volume: "Hyper", density: "78%" },
    { id: "north-bypass", label: "North Bypass Area", coords: { x: 220, y: 80 }, volume: "Low", density: "19%" }
  ];

  const handleCopySchema = () => {
    if (!playbook) return;
    navigator.clipboard.writeText(playbook.schemaMarkup);
    setCopiedSchema(true);
    triggerMessage("JSON-LD Schema code copied successfully!");
    setTimeout(() => setCopiedSchema(false), 3000);
  };

  if (!playbook) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FAFAF9] p-10 min-h-[400px]">
        <div className="text-center max-w-sm p-8 bg-white border border-slate-200 rounded-xl shadow-md">
          <MapPin className="w-12 h-12 text-[#EA580C]/50 mx-auto mb-4 animate-pulse" />
          <h3 className="font-display font-black text-lg text-[#111827]">Local Playbook Vacant</h3>
          <p className="text-xs text-slate-500 mt-2">
            Regional proximity engines require local geocoded terms. Provide base coordinates and trigger the playbook synthesis.
          </p>
          <div className="pt-4 flex flex-col gap-2">
            <button 
              onClick={onGeneratePlaybook}
              disabled={isGeneratingPlaybook}
              className="px-5 py-2.5 bg-[#111827] hover:bg-[#EA580C] text-white text-[10px] uppercase tracking-widest font-black rounded shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {isGeneratingPlaybook ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />}
              <span>Generate Local Plan</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const serviceCityCombos = [
    { query: `${primaryService} in ${location}`, intent: "Transactional Commercial", difficulty: "Low" },
    { query: `Best ${primaryService} near ${location}`, intent: "Local Maps Intent", difficulty: "Medium" },
    { query: `Affordable ${primaryService} ${location} cost`, intent: "Investigative Pricing", difficulty: "Low-Hanging" },
    { query: `${location} ${primaryService} company phone`, intent: "Local Direct", difficulty: "Very Easy" }
  ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#FAFAF9] text-[#111827]">
      
      {/* LOCAL PARAMETERS PANEL */}
      <aside className="w-full lg:w-[350px] border-b lg:border-b-0 lg:border-r border-[#111827]/10 flex flex-col shrink-0 bg-white overflow-y-auto">
        <div className="p-5 border-b border-[#111827]/5 bg-[#FAFAF9]">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 px-1.5 bg-[#EA580C]/10 rounded text-[#EA580C]"><MapPin className="w-4 h-4" /></span>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#EA580C]">Geotargeting Core</span>
          </div>
          <h2 className="text-base font-display font-bold text-[#111827]">Local Parameter Hub</h2>
          <p className="text-xs text-slate-500 mt-1">Configure physical location buffers to structure custom local SEO guides.</p>
        </div>

        <div className="p-5 space-y-4 flex-1 bg-white">
          {/* Business Name */}
          <div>
            <label className="text-[9px] uppercase tracking-[0.1em] font-bold text-slate-500 block mb-1">Business Name Entity</label>
            <input 
              type="text" 
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full bg-slate-50 focus:bg-white border text-xs px-3 py-2 border-slate-250 focus:border-[#EA580C] rounded outline-none transition-all font-semibold"
              placeholder="e.g. GrowthSpark"
            />
          </div>

          {/* Location City */}
          <div>
            <label className="text-[9px] uppercase tracking-[0.1em] font-bold text-slate-500 block mb-1">Target base city</label>
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-50 focus:bg-white border text-xs px-3 py-2 border-slate-250 focus:border-[#EA580C] rounded outline-none transition-all font-black text-[#111827]"
              placeholder="e.g. Kochi, Kerala"
            />
          </div>

          {/* Primary service */}
          <div>
            <label className="text-[9px] uppercase tracking-[0.1em] font-bold text-slate-500 block mb-1">Core Targeted Service</label>
            <input 
              type="text" 
              value={primaryService}
              onChange={(e) => setPrimaryService(e.target.value)}
              className="w-full bg-slate-50 focus:bg-white border text-xs px-3 py-2 border-slate-250 focus:border-[#EA580C] rounded outline-none transition-all font-semibold"
              placeholder="e.g. SEO services, web design"
            />
          </div>

          {/* Trigger rebuilding button */}
          <button 
            type="button" 
            onClick={onGeneratePlaybook}
            disabled={isGeneratingPlaybook}
            className="w-full py-3 bg-[#111827] hover:bg-[#EA580C] disabled:bg-slate-400 text-white font-mono font-bold text-[10px] uppercase tracking-widest rounded transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
          >
            {isGeneratingPlaybook ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Crawling Local Indices...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Rebuild Local Matrix</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* DETAILED CONTENT HUB */}
      <main className="flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10 space-y-6">
        
        {/* Header section info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-[#EA580C]">Geotargeting Pro Scorecard</span>
            <h1 className="text-xl sm:text-2xl font-display font-black text-[#111827] leading-tight">
              Local SEO Playbook: {location} Domain
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Optimized targets verified for brand <strong className="font-bold text-[#EA580C]">"{businessName}"</strong>.
            </p>
          </div>
          <span className="text-[10px] font-mono border border-slate-200 rounded-full px-3.5 py-1.5 bg-white text-slate-500 flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-sm font-semibold">
            <Map className="w-3.5 h-3.5 text-[#2563EB]" /> Google Map-3 Pack Enabled
          </span>
        </div>

        {/* TWO-COLUMN VIEWPORT: RADAR VECTORS & GBP PROFILE EXPORTS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* MAP-BASED VECTOR RADAR */}
          <div className="bg-slate-950 border border-slate-900 p-6 rounded-xl flex flex-col justify-between shadow-2xl text-white min-h-[380px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#EA580C] font-bold flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 animate-pulse text-[#EA580C]" /> Live Coordinate Proximity Board
                </span>
                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[9px] font-mono rounded font-bold">
                  RADAR LOCKED
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Click targeted geo-pins inside the responsive boundary canvas to inspect local density search indexes.
              </p>
            </div>

            {/* INTERACTIVE COORDINATE MATRIX */}
            <div className="w-full h-[200px] relative border border-white/10 bg-slate-900/50 rounded-lg overflow-hidden flex items-center justify-center my-4">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-35"></div>

              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
                <path d="M 100 50 Q 150 100 190 120 T 240 190" stroke="#EA580C" strokeWidth="2.5" strokeDasharray="3,3" fill="none" />
                <path d="M 80 200 C 120 180 220 220 260 170" stroke="#2563EB" strokeWidth="1.5" fill="none" />
              </svg>

              {/* Pins iteration */}
              {localPins.map(pin => {
                const isSelected = selectedGeoPin === pin.id;
                return (
                  <button 
                    key={pin.id}
                    onClick={() => setSelectedGeoPin(pin.id)}
                    style={{ left: `${pin.coords.x}px`, top: `${pin.coords.y}px` }}
                    className="absolute group transition-all"
                  >
                    <span className={`w-4 h-4 rounded-full absolute -top-2 -left-2 ${
                      isSelected ? "bg-[#EA580C] animate-ping" : "bg-[#2563EB]/40"
                    }`}></span>
                    <span className={`w-2.5 h-2.5 rounded-full absolute -top-1 -left-1 ${
                      isSelected ? "bg-[#EA580C] border border-white" : "bg-blue-600 hover:bg-[#EA580C]"
                    }`}></span>
                  </button>
                );
              })}

              <span className="absolute bottom-4 right-4 text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5 bg-slate-950/60 p-1 px-2 border border-white/5 rounded">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-ping"></span> SIGNAL ACTIVE
              </span>
            </div>

            {/* Selected Info readout */}
            <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-xs grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10">
              <div>
                <span className="text-slate-500 block text-[8px] uppercase font-mono font-bold">Focus region</span>
                <span className="font-extrabold text-slate-100">
                  {localPins.find(p => p.id === selectedGeoPin)?.label}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[8px] uppercase font-mono font-bold">Search Intensity</span>
                <span className="font-black text-[#EA580C] uppercase">
                  {localPins.find(p => p.id === selectedGeoPin)?.volume} Volume
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[8px] uppercase font-mono font-bold">Competition Effort</span>
                <span className="font-bold text-emerald-400">
                  {localPins.find(p => p.id === selectedGeoPin)?.density} KD
                </span>
              </div>
            </div>
          </div>

          {/* GBP DIRECTIVES CHECKLIST */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col justify-between shadow-sm hover:border-[#EA580C]/20 transition-all">
            <div>
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h3 className="font-display font-extrabold text-sm text-[#111827] flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#EA580C]" /> Google Business Profile Directives
                </h3>
                <span className="text-[9px] font-mono uppercase bg-[#EA580C]/10 text-[#EA580C] font-extrabold px-2 py-0.5 rounded border border-[#EA580C]/15">
                  MAP 3-PACK MATCH
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-650">
                {playbook.googleBusinessProfileSuggestions.map((s, idx) => (
                  <li key={idx} className="flex gap-2 text-slate-600">
                    <span className="p-0.5 bg-emerald-50 text-emerald-800 rounded mt-0.5 h-fit shrink-0 border border-emerald-500/15">
                      <Check className="w-3 h-3 font-bold stroke-[3]" />
                    </span>
                    <span className="leading-snug text-justify">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-3.5 mt-5">
              <p className="text-[10px] text-slate-400 italic font-medium leading-relaxed">
                Consistency is King: Ensure address formatting, telephone markers, and operational timings exactly reflect indices on national registries.
              </p>
            </div>
          </div>

        </div>

        {/* NEIGHBORHOODS & LOCATION LANDINGS GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h3 className="font-display font-extrabold text-sm text-[#111827] border-b pb-3 mb-4 flex items-center gap-2">
              <ListTodo className="w-4.5 h-4.5 text-[#2563EB]" /> Hyperlocal Neighborhood Keywords Target Set
            </h3>

            <div className="divide-y divide-slate-100 divide-dashed">
              {playbook.hyperlocalKeywords.map((group, idx) => (
                <div key={idx} className="py-3 first:pt-0 last:pb-0 font-sans">
                  <span className="text-[10px] uppercase font-mono font-extrabold tracking-wider text-[#EA580C] block mb-2">
                    Region Center: {group.neighborhood}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.keywords.map((kw, kwIdx) => (
                      <span key={kwIdx} className="px-2 py-1 bg-slate-50 border hover:border-[#EA580C] transition-all text-[10px] rounded text-slate-700 font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-4">
            <h3 className="font-display font-extrabold text-sm text-[#111827] border-b pb-3 flex items-center gap-2">
              <Building className="w-4.5 h-4.5 text-emerald-600" /> Regional Landing Page Blueprint Silos
            </h3>

            <div className="space-y-4 text-xs divide-y divide-slate-150">
              {playbook.landingPageOutline.map((sec, idx) => (
                <div key={idx} className="space-y-2 first:pt-0 pt-4.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#111827]">{sec.sectionTitle}</span>
                    <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">Section {idx + 1}</span>
                  </div>
                  <p className="text-slate-500 leading-relaxed text-[11px] text-justify">{sec.contentBrief}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-2 text-[9.5px]">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[8.5px] font-mono pt-1">Keywords:</span>
                    {sec.keywordsToTarget.map((kw, i) => (
                      <span key={i} className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-mono font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COMBOS INDEX & JSON-LD VIEW CHANNELS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm xl:col-span-2">
            <h3 className="font-display font-extrabold text-sm text-[#111827] border-b pb-3 mb-4">
              Search Authority Modifiers (Service + Region)
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 uppercase tracking-widest font-mono text-[9px] border-b">
                    <th className="py-3 px-3">Keyword Angle Target</th>
                    <th className="py-3 px-3">Target Intent</th>
                    <th className="py-3 px-3 text-right">Difficulty Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {serviceCityCombos.map((combo, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                      <td className="py-3 px-3 font-semibold text-slate-800">{combo.query}</td>
                      <td className="py-3 px-3">
                        <span className="bg-blue-50 text-[#2563EB] border border-blue-100 font-extrabold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">
                          {combo.intent}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right text-emerald-600 font-extrabold font-mono uppercase tracking-wider text-[10px]">{combo.difficulty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col justify-between hover:border-[#EA580C]/20 transition-all">
            <div className="space-y-3.5">
              <h3 className="font-display font-black text-sm text-[#111827] flex items-center gap-1.5 mt-0.5 leading-tight">
                <Code className="w-4 h-4 text-[#EA580C]" /> JSON-LD LocalBusiness Schema
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Copy and embed this structural markup code template inside the main layout page of your localized folder to index perfectly on search algorithms.
              </p>

              <div className="bg-slate-900 text-slate-305 text-emerald-400 p-3.5 rounded font-mono text-[8.5px] border border-slate-800 line-clamp-5 leading-normal overflow-x-auto max-h-[130px]">
                {playbook.schemaMarkup}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button 
                onClick={handleCopySchema}
                className="w-full py-2 bg-[#111827] hover:bg-[#EA580C] text-[#FAFAF9] font-mono font-bold text-[10px] uppercase tracking-wider rounded transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5 text-indigo-300" />}
                <span>{copiedSchema ? "Saved to Clipboard!" : "Copy Schema Tag"}</span>
              </button>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
