import React from 'react';
import { VisualDiffCheck } from '../../types/testing';
import { X, Layers, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface VisualRegressionModalProps {
  diff: VisualDiffCheck | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VisualRegressionModal: React.FC<VisualRegressionModalProps> = ({ diff, isOpen, onClose }) => {
  if (!isOpen || !diff) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-4xl bg-[#0d1017] border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0e121a]">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-0.5">
              <span>Visual Regression Comparison</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-cyan-400">{diff.url}</span>
            </div>
            <h3 className="text-base font-bold text-slate-100">{diff.name}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          {/* Status strip */}
          <div className="bg-[#121622] p-4 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {diff.status === 'regression_detected' ? (
                <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Visual Regression Detected ({diff.diffPercentage}% pixel shift)</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pixel Diff Within Tolerance (No Regression)</span>
                </div>
              )}
            </div>
            <span className="text-slate-400 font-mono">Tolerance: &lt; 0.5%</span>
          </div>

          {/* Visual Diff Trio: Before / After / Diff Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>PREVIOUS (Baseline Build)</span>
                <span className="font-mono text-[10px] text-slate-500">v2.4.0</span>
              </div>
              <div className="rounded-lg overflow-hidden border border-slate-800 bg-black aspect-video relative">
                <img
                  src={diff.previousScreenshotUrl}
                  alt="Previous Baseline Screenshot"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>CURRENT (Candidate Build)</span>
                <span className="font-mono text-[10px] text-rose-400">v2.4.1 [Regression]</span>
              </div>
              <div className="rounded-lg overflow-hidden border border-rose-500/50 bg-black aspect-video relative shadow-lg shadow-rose-950/20">
                <img
                  src={diff.currentScreenshotUrl}
                  alt="Current Candidate Screenshot"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 bg-rose-950/90 border border-rose-500/40 text-rose-300 px-2 py-0.5 rounded text-[10px] font-mono">
                  Shift: +16px
                </div>
              </div>
            </div>
          </div>

          {/* Diff Analysis */}
          <div className="bg-[#121622] p-4 rounded-lg border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-slate-200">Optical Diff Findings</div>
            <p className="text-slate-300 leading-relaxed">
              {diff.highlightedRegionText}
            </p>
            <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/80">
              Note: {diff.notes}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#0e121a] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Dismiss View
          </button>
        </div>
      </div>
    </div>
  );
};
