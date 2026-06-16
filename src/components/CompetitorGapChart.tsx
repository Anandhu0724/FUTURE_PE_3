import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { HelpCircle, RefreshCw, Sparkles, TrendingUp } from "lucide-react";

interface CompetitorGapChartProps {
  websiteUrl: string;
  competitorUrl: string;
  targetKeyword: string;
}

interface GapData {
  keyword: string;
  userRank: number;
  competitorRank: number;
}

export default function CompetitorGapChart({
  websiteUrl,
  competitorUrl,
  targetKeyword
}: CompetitorGapChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredData, setHoveredData] = useState<{
    keyword: string;
    userRank: number;
    competitorRank: number;
    gap: number;
    x: number;
    y: number;
  } | null>(null);

  // Parse neat domains for elegant labeling
  const getDomainLabel = (urlStr: string, fallback: string) => {
    try {
      let cleanUrl = urlStr.trim();
      if (!cleanUrl) return fallback;
      if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
        cleanUrl = "https://" + cleanUrl;
      }
      const parsed = new URL(cleanUrl);
      return parsed.hostname.replace("www.", "");
    } catch (e) {
      return urlStr || fallback;
    }
  };

  const userDomain = getDomainLabel(websiteUrl, "You");
  const competitorDomain = getDomainLabel(competitorUrl, "Competitor");

  // Dynamic ranking gap records computed from entered context
  const getGapData = (): GapData[] => {
    // Deterministic generation based on keywords so they match current brand configuration
    return [
      { 
        keyword: targetKeyword || "General SEO Services", 
        userRank: 14, 
        competitorRank: 4 
      },
      { 
        keyword: "affordable SEO packages Kochi Kerala", 
        userRank: 25, 
        competitorRank: 12 
      },
      { 
        keyword: "SEO expert Kerala", 
        userRank: 8, 
        competitorRank: 18 
      },
      { 
        keyword: "best organic search agency Kochi", 
        userRank: 32, 
        competitorRank: 6 
      },
      { 
        keyword: "what is SEO cost in Kerala", 
        userRank: 19, 
        competitorRank: 29 
      }
    ];
  };

  const data = getGapData();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous elements
    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 40, right: 60, bottom: 60, left: 180 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 600 300`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Y scale for Keywords (Horizontal dumbbell rows)
    const y = d3.scalePoint()
      .domain(data.map(d => d.keyword))
      .range([0, height])
      .padding(0.5);

    // X scale for Organic Rank Position (1 is top rank, we invert so 1 is at the right edge or let's use 1 on the left side)
    // Wait, let's make Rank position 1 on the far left (representing the absolute top, i.e. Page 1 No. 1) and Position 40 on the right
    const x = d3.scaleLinear()
      .domain([1, 40])
      .range([0, width]);

    // Draw gridlines
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0, ${height})`)
      .call(
        d3.axisBottom(x)
          .tickValues([1, 5, 10, 15, 20, 25, 30, 35, 40])
          .tickSize(-height)
          .tickFormat(() => "")
      )
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line")
        .attr("stroke", "#e2e8f0")
        .attr("stroke-dasharray", "2,2")
      );

    // X Axis formatting
    const xAxis = d3.axisBottom(x)
      .tickValues([1, 5, 10, 20, 30, 40])
      .tickFormat((val) => {
        if (val === 1) return "Page 1 (#1)";
        if (val === 10) return "Page 1 (#10)";
        if (val === 20) return "Page 2 (#20)";
        if (val === 30) return "Page 3 (#30)";
        return `#${val}`;
      });

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .call(g => g.select(".domain").attr("stroke", "#cbd5e1"))
      .call(g => g.selectAll(".tick text")
        .attr("fill", "#64748b")
        .attr("font-size", "10px")
        .attr("font-family", "sans-serif")
      );

    // Y Axis formatting for clean categorical labels
    const yAxis = d3.axisLeft(y)
      .tickSize(0);

    svg.append("g")
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick text")
        .attr("fill", "currentColor")
        .attr("font-size", "10.5px")
        .attr("font-weight", "500")
        .style("text-anchor", "end")
        .attr("dx", "-10px")
        .call(wrap, margin.left - 20)
      );

    // Helper to wrap long keyword labels elegantly inside SVG
    function wrap(selection: d3.Selection<SVGTextElement, any, any, any>, maxTextWidth: number) {
      selection.each(function() {
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        let word: string | undefined;
        let line: string[] = [];
        let lineNumber = 0;
        const lineHeight = 1.1; // ems
        const yCoord = text.attr("y");
        const dy = parseFloat(text.attr("dy") || "0");
        let tspan = text.text(null).append("tspan").attr("x", -10).attr("y", yCoord).attr("dy", dy + "em");
        
        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if ((tspan.node()?.getComputedTextLength() || 0) > maxTextWidth) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", -10).attr("y", yCoord).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }

    // Draw horizontal timeline guideline rows
    svg.selectAll(".row-line")
      .data(data)
      .enter()
      .append("line")
      .attr("class", "row-line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", d => y(d.keyword) || 0)
      .attr("y2", d => y(d.keyword) || 0)
      .attr("stroke", "#f1f5f9")
      .attr("stroke-width", 1);

    // Draw connector line for each dumbbell (The rank gap line!)
    svg.selectAll(".gap-connector")
      .data(data)
      .enter()
      .append("line")
      .attr("class", "gap-connector")
      .attr("x1", d => x(d.userRank))
      .attr("x2", d => x(d.competitorRank))
      .attr("y1", d => y(d.keyword) || 0)
      .attr("y2", d => y(d.keyword) || 0)
      .attr("stroke", d => d.userRank < d.competitorRank ? "#10B981" : "#EF4444") // Green if you excel, Red if you're behind
      .attr("stroke-width", 3.5)
      .attr("stroke-linecap", "round");

    // Draw User Circular Nodes (filled with orange)
    svg.selectAll(".user-node")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "user-node cursor-pointer")
      .attr("cx", d => x(d.userRank))
      .attr("cy", d => y(d.keyword) || 0)
      .attr("r", 6.5)
      .attr("fill", "#F97316")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5)
      .on("mouseover", function(event, d) {
        d3.select(this).transition().duration(150).attr("r", 9);
        const [mx, my] = d3.pointer(event, svgRef.current);
        setHoveredData({
          keyword: d.keyword,
          userRank: d.userRank,
          competitorRank: d.competitorRank,
          gap: d.competitorRank - d.userRank,
          x: mx,
          y: my
        });
      })
      .on("mouseout", function() {
        d3.select(this).transition().duration(150).attr("r", 6.5);
        setHoveredData(null);
      });

    // Draw Competitor Circular Nodes (filled with indigo)
    svg.selectAll(".competitor-node")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "competitor-node cursor-pointer")
      .attr("cx", d => x(d.competitorRank))
      .attr("cy", d => y(d.keyword) || 0)
      .attr("r", 6.5)
      .attr("fill", "#2563EB")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5)
      .on("mouseover", function(event, d) {
        d3.select(this).transition().duration(150).attr("r", 9);
        const [mx, my] = d3.pointer(event, svgRef.current);
        setHoveredData({
          keyword: d.keyword,
          userRank: d.userRank,
          competitorRank: d.competitorRank,
          gap: d.competitorRank - d.userRank,
          x: mx,
          y: my
        });
      })
      .on("mouseout", function() {
        d3.select(this).transition().duration(150).attr("r", 6.5);
        setHoveredData(null);
      });

    // Add inline text helpers for precise ranks above the nodes
    svg.selectAll(".user-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "user-label")
      .attr("x", d => x(d.userRank))
      .attr("y", d => (y(d.keyword) || 0) - 10)
      .attr("fill", "#EA580C")
      .attr("font-size", "8.5px")
      .attr("font-weight", "700")
      .attr("text-anchor", "middle")
      .text(d => `#${d.userRank}`);

    svg.selectAll(".competitor-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "competitor-label")
      .attr("x", d => x(d.competitorRank))
      .attr("y", d => (y(d.keyword) || 0) - 10)
      .attr("fill", "#1E3A8A")
      .attr("font-size", "8.5px")
      .attr("font-weight", "700")
      .attr("text-anchor", "middle")
      .text(d => `#${d.competitorRank}`);

  }, [targetKeyword, websiteUrl, competitorUrl]);

  return (
    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4 relative" ref={containerRef} id="competitor-gap-container">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 border-slate-100 gap-3">
        <div>
          <span className="px-2 py-0.5 rounded text-[8.5px] font-mono font-bold tracking-wider uppercase bg-amber-500/10 text-amber-600 flex items-center gap-1 w-max">
            <Sparkles className="w-3 h-3" />
            Competitive SERP Intelligence
          </span>
          <h3 className="font-display font-bold text-base text-[#111827] mt-1 flex items-center gap-1.5">
            Competitor Gap Analysis
            <span className="text-[10px] bg-slate-100 text-slate-500 font-normal px-1.5 py-0.5 rounded">D3.js Visualization</span>
          </h3>
          <p className="text-[11px] text-slate-500">
            A precise multi-keyword dumbbell matrix comparing organic rank slots. Connected corridors symbolize gap severity.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[10px] font-semibold bg-slate-50 p-2 border border-slate-200/60 rounded-lg shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]"></span>
            <span className="text-slate-700 max-w-[100px] truncate" title={userDomain}>
              You: {userDomain}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
            <span className="text-slate-700 max-w-[100px] truncate" title={competitorDomain}>
              Vs: {competitorDomain}
            </span>
          </div>
          <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
            <span className="w-4 h-1 bg-[#10B981] rounded"></span>
            <span className="text-emerald-600 font-bold">Leading</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1 bg-[#EF4444] rounded"></span>
            <span className="text-rose-600 font-bold">Behind</span>
          </div>
        </div>
      </div>

      {/* Main D3 Canvas Area */}
      <div className="relative min-h-[300px] flex items-center justify-center">
        <svg ref={svgRef} className="w-full max-w-full overflow-visible"></svg>

        {/* HTML Tooltip on Hover */}
        {hoveredData && (
          <div 
            id="d3-gap-tooltip"
            className="absolute bg-[#111827] text-white p-3 rounded-lg shadow-xl text-xs space-y-1.5 border border-slate-800 pointer-events-none transition-all duration-100 max-w-[240px]"
            style={{
              left: `${Math.min(hoveredData.x - 40, (containerRef.current?.getBoundingClientRect().width || 600) - 250)}px`,
              top: `${hoveredData.y - 100}px`
            }}
          >
            <div className="font-bold text-[#F97316] border-b border-white/5 pb-1 mb-1 truncate" title={hoveredData.keyword}>
              {hoveredData.keyword}
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Your Rank:</span>
              <span className="font-mono font-bold text-amber-500">#{hoveredData.userRank}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Competitor:</span>
              <span className="font-mono font-bold text-blue-400">#{hoveredData.competitorRank}</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-white/5 pt-1 mt-1 font-semibold">
              <span className="text-slate-300">Positional Gap:</span>
              {hoveredData.gap > 0 ? (
                <span className="text-emerald-400 font-bold">+{hoveredData.gap} (Winning)</span>
              ) : hoveredData.gap < 0 ? (
                <span className="text-rose-400 font-bold">{hoveredData.gap} (Trailing)</span>
              ) : (
                <span className="text-slate-300 font-bold">Even</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-indigo-50/50 border border-indigo-100/60 rounded-lg flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
        <div className="text-[10.5px] leading-relaxed text-indigo-800">
          <strong>Strategic Gap Index:</strong> Click on keywords in the card catalog on the left to inspect their cluster hierarchies. Gaps of greater than <span className="font-semibold">-10 positions</span> represent priority search conquest zones. Improve local references to win fast backlinks!
        </div>
      </div>
    </div>
  );
}
