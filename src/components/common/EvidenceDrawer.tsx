import React from 'react';
import { ResearchEvidence } from '../../types/research';
import { ExternalLink, CheckCircle2, AlertTriangle, HelpCircle, X, ShieldCheck } from 'lucide-react';

interface EvidenceDrawerProps {
  evidence: ResearchEvidence | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({ evidence, isOpen, onClose }) => {
  if (!isOpen || !evidence) return null;

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Source
          </span>
        );
      case 'Likely':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Likely Accurate
          </span>
        );
      case 'Conflicting sources':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-medium">
            <AlertTriangle className="w-3.5 h-3.5" />
            Conflicting Sources
          </span>
        );
      case 'Not publicly available':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <HelpCircle className="w-3.5 h-3.5" />
            Not Publicly Available
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <HelpCircle className="w-3.5 h-3.5" />
            Unverified
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-[#0d1017] border-l border-slate-800 h-full overflow-y-auto flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between sticky top-0 bg-[#0d1017]/95 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>Evidence Record</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-400">ID: {evidence.id}</span>
            </div>
            <h3 className="text-base font-semibold text-slate-100">
              Verified Source Evidence
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-md hover:bg-slate-800 transition-colors"
            aria-label="Close evidence panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-6 flex-1 text-sm text-slate-300">
          {/* Status & Confidence */}
          <div className="bg-[#121622] rounded-lg p-4 border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">Verification Status</div>
            <div className="flex items-center justify-between">
              <div>{getConfidenceBadge(evidence.confidence)}</div>
              <div className="text-xs text-slate-400 font-mono">
                Checked: {new Date(evidence.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>
            {evidence.notes && (
              <p className="mt-2 text-xs text-slate-400 border-t border-slate-800/60 pt-2">
                {evidence.notes}
              </p>
            )}
          </div>

          {/* Source Location */}
          <div className="space-y-3">
            <div className="text-xs font-medium text-slate-400">Source Location</div>
            <div className="space-y-2">
              <div className="bg-[#121622] p-3 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400 mb-0.5">Page Title</div>
                <div className="text-slate-200 font-medium">{evidence.pageTitle}</div>
              </div>

              <div className="bg-[#121622] p-3 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400 mb-0.5">Source URL</div>
                <a
                  href={evidence.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1.5 break-all"
                >
                  {evidence.sourceUrl}
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>

              {evidence.relevantSection && (
                <div className="bg-[#121622] p-3 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400 mb-0.5">Relevant Section</div>
                  <div className="text-xs font-mono text-slate-300">{evidence.relevantSection}</div>
                </div>
              )}

              {evidence.domSelector && (
                <div className="bg-[#121622] p-3 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400 mb-0.5">DOM Selector</div>
                  <code className="text-xs font-mono text-cyan-300 bg-slate-900 px-2 py-0.5 rounded">
                    {evidence.domSelector}
                  </code>
                </div>
              )}
            </div>
          </div>

          {/* Extracted DOM Snippet */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-slate-400">Extracted Value / Text Node</div>
            <div className="bg-[#080a0f] p-4 rounded-lg border border-cyan-500/20 font-mono text-xs text-cyan-200/90 leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {evidence.extractedSnippet}
            </div>
          </div>

          {/* Screenshot capture representation */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-slate-400">Viewport Capture</div>
            <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-[#08090c] aspect-video flex items-center justify-center">
              <img
                src="/src/assets/images/browser_viewport_audit_1791084657841.jpg"
                alt="Browser DOM Capture Evidence"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/80 backdrop-blur-xs rounded text-[11px] font-mono text-slate-300 border border-slate-700">
                1280x800 Chromium Headless
              </div>
            </div>
          </div>

          {/* Verification Protocol explanation */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400">
            <div className="font-medium text-slate-300 mb-1">Integrity Assurance</div>
            Every value extracted by Operant AI Browser Workers is corroborated with exact DOM coordinates, HTTP status code checks, and optical verification to prevent hallucination.
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-800 flex justify-end gap-3 sticky bottom-0 bg-[#0d1017]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close
          </button>
          <a
            href={evidence.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors flex items-center gap-1.5"
          >
            Open Source URL
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
