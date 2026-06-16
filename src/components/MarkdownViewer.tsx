import React from "react";

interface MarkdownViewerProps {
  value: string;
}

export default function MarkdownViewer({ value }: MarkdownViewerProps) {
  if (!value) {
    return <p className="text-slate-400 italic">No drafted content yet. Click "Draft" on a topic to generate copy.</p>;
  }

  // Parse lines into high-quality semantic HTML representation
  const lines = value.split("\n");
  let inList = false;
  let listItems: string[] = [];
  const renderedElements: React.ReactNode[] = [];

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      renderedElements.push(
        <ul key={`ul-${key}`} className="list-disc list-inside ml-6 my-4 space-y-2 text-slate-300">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-slate-300 leading-relaxed">
              {parseInlineFormatting(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  // Basic inline formatter for bold **keyword** and highlighted items
  const parseInlineFormatting = (text: string): React.ReactNode[] => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const clean = part.substring(2, part.length - 2);
        return (
          <strong key={index} className="text-emerald-400 font-semibold bg-emerald-950/40 px-1 rounded-sm border border-emerald-900/50">
            {clean}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  let elementCounter = 0;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (line.startsWith("- ") || line.startsWith("* ")) {
      inList = true;
      listItems.push(line.substring(2));
      continue;
    } else {
      if (inList) {
        flushList(elementCounter++);
      }
    }

    if (line.startsWith("### ")) {
      renderedElements.push(
        <h3 key={elementCounter++} className="text-lg font-semibold text-slate-100 mt-6 mb-3 tracking-tight flex items-center">
          <span className="w-1.5 h-4 bg-emerald-500 rounded-sm mr-2 inline-block"></span>
          {parseInlineFormatting(line.substring(4))}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      renderedElements.push(
        <h2 key={elementCounter++} className="text-xl font-bold text-slate-50 mt-8 mb-4 tracking-tight border-b border-slate-800 pb-2">
          {parseInlineFormatting(line.substring(3))}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      renderedElements.push(
        <h1 key={elementCounter++} className="text-3xl font-extrabold text-white mt-10 mb-6 tracking-tight leading-tight">
          {parseInlineFormatting(line.substring(2))}
        </h1>
      );
    } else if (line === "") {
      // empty lines generate spacing
      continue;
    } else if (line.startsWith("> ")) {
      renderedElements.push(
        <blockquote key={elementCounter++} className="border-l-4 border-emerald-500 bg-slate-850/60 p-4 rounded-r-md my-4 italic text-slate-300 shadow-inner">
          {parseInlineFormatting(line.substring(2))}
        </blockquote>
      );
    } else {
      // Paragraph format
      renderedElements.push(
        <p key={elementCounter++} className="text-slate-300 leading-relaxed mb-4 text-base antialiased">
          {parseInlineFormatting(line)}
        </p>
      );
    }
  }

  // Final flush in case list is at the very end of the markdown text
  if (inList) {
    flushList(elementCounter++);
  }

  return (
    <div className="prose max-w-none text-slate-300 space-y-1">
      {renderedElements}
    </div>
  );
}
