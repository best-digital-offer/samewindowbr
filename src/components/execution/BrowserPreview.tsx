import React from 'react';
import { Lock, RotateCw, Monitor, Smartphone, ExternalLink } from 'lucide-react';

interface BrowserPreviewProps {
  currentUrl?: string;
  activeAction?: string;
  viewport?: 'desktop' | 'mobile' | 'tablet';
  screenshotUrl?: string;
}

export const BrowserPreview: React.FC<BrowserPreviewProps> = ({
  currentUrl = 'https://pricing-directory.internal/matrix',
  activeAction = 'Inspecting pricing DOM container',
  viewport = 'desktop',
  screenshotUrl = '/src/assets/images/browser_viewport_audit_1791084657841.jpg'
}) => {
  return (
    <div className="bg-[#0b0e14] border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-lg">
      {/* Chrome Window Header */}
      <div className="bg-[#121622] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between gap-3 text-xs">
        {/* Window controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
        </div>

        {/* Address bar */}
        <div className="flex-1 max-w-xl mx-auto bg-[#080a0f] border border-slate-800 rounded-md px-3 py-1 flex items-center gap-2 text-slate-400 font-mono text-[11px] truncate">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="truncate text-slate-300">{currentUrl}</span>
        </div>

        {/* Viewport & Controls */}
        <div className="flex items-center gap-2 text-slate-400">
          <div className="flex items-center gap-1 font-mono text-[11px] bg-slate-800/80 px-2 py-0.5 rounded">
            {viewport === 'mobile' ? (
              <>
                <Smartphone className="w-3 h-3 text-cyan-400" />
                <span>390px Mobile</span>
              </>
            ) : (
              <>
                <Monitor className="w-3 h-3 text-cyan-400" />
                <span>1440px Desktop</span>
              </>
            )}
          </div>
          <button className="p-1 hover:text-slate-200" title="Reload browser session">
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Viewport Frame */}
      <div className="relative bg-[#07090d] min-h-[340px] max-h-[460px] flex items-center justify-center overflow-hidden group">
        <img
          src={screenshotUrl}
          alt="Live Headless Browser Viewport"
          className="w-full h-full object-cover object-top opacity-90 transition-opacity"
          referrerPolicy="no-referrer"
        />

        {/* Interactive DOM inspection highlight overlay */}
        <div className="absolute inset-x-8 top-12 border-2 border-cyan-400 bg-cyan-500/10 rounded pointer-events-none p-3 shadow-lg shadow-cyan-500/10">
          <div className="inline-block bg-cyan-400 text-black font-mono text-[10px] font-bold px-1.5 py-0.5 rounded mb-1">
            DOM_TARGET: section#pricing-tier-starter
          </div>
          <div className="text-[11px] font-mono text-cyan-200 bg-black/80 p-1.5 rounded max-w-sm">
            {activeAction}
          </div>
        </div>

        {/* Live status badge on top right */}
        <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-xs border border-slate-700/80 px-2.5 py-1 rounded text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>Worker Session Active</span>
        </div>
      </div>
    </div>
  );
};
