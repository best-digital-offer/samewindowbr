import React, { useState } from 'react';
import { TaskMode, TaskConfig } from '../../types/task';
import { 
  Compass, 
  FileCheck, 
  PlaySquare, 
  Layers, 
  Sliders, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Users, 
  ShieldAlert,
  Clock,
  Laptop
} from 'lucide-react';

interface TaskCommandBoxProps {
  onSubmitTask: (prompt: string, config: TaskConfig) => void;
  isSubmitting?: boolean;
}

export const TaskCommandBox: React.FC<TaskCommandBoxProps> = ({ onSubmitTask, isSubmitting = false }) => {
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<TaskMode>('research');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Advanced config state
  const [startingUrl, setStartingUrl] = useState('');
  const [workers, setWorkers] = useState<number>(4);
  const [browserProfileId, setBrowserProfileId] = useState('prof-dev');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [outputFormat, setOutputFormat] = useState<'table' | 'json' | 'csv' | 'markdown'>('table');
  const [evidenceLevel, setEvidenceLevel] = useState<'full' | 'standard' | 'minimal'>('full');
  const [timeoutSeconds, setTimeoutSeconds] = useState<number>(300);
  const [safeModeOnly, setSafeModeOnly] = useState(true);

  const suggestions = [
    {
      label: 'Research 20 AI SaaS competitors and compare pricing',
      mode: 'research' as TaskMode,
      prompt: 'Find 20 AI SaaS competitors and compare pricing.',
      url: 'https://google.com'
    },
    {
      label: 'Find problems in my signup flow and mobile layout',
      mode: 'testing' as TaskMode,
      prompt: 'Find problems in my signup flow. Check validation, empty states, mobile layout, and console errors.',
      url: 'https://example-saas-app.dev/signup'
    },
    {
      label: 'Extract pricing tables and feature limits from directory',
      mode: 'automation' as TaskMode,
      prompt: 'Extract all software tiers, prices, and feature quotas into a clean structured table.',
      url: 'https://saas-directory.sample/tools'
    },
    {
      label: 'Weekly competitor price tracker with change detection',
      mode: 'workflow' as TaskMode,
      prompt: 'Check our competitors pricing pages every Monday and highlight any price or plan changes.',
      url: 'https://competitors-list.sample'
    }
  ];

  const handleSelectSuggestion = (sug: typeof suggestions[0]) => {
    setPrompt(sug.prompt);
    setMode(sug.mode);
    if (sug.url) setStartingUrl(sug.url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isSubmitting) return;

    const config: TaskConfig = {
      task: prompt,
      startingUrl: startingUrl.trim() || undefined,
      mode,
      workers,
      browserProfileId,
      viewport,
      outputFormat,
      evidenceLevel,
      timeoutSeconds,
      safeModeOnly
    };

    onSubmitTask(prompt, config);
  };

  return (
    <div className="w-full bg-[#0d1017] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mode Selector Segmented Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2 pb-1">
          <div className="flex items-center gap-1 p-1 bg-[#121622] rounded-lg border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setMode('research')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                mode === 'research'
                  ? 'bg-slate-800 text-cyan-300 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Research</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('testing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                mode === 'testing'
                  ? 'bg-slate-800 text-cyan-300 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>AI QA & Testing</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('automation')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                mode === 'automation'
                  ? 'bg-slate-800 text-cyan-300 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <PlaySquare className="w-3.5 h-3.5" />
              <span>Automate</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('workflow')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                mode === 'workflow'
                  ? 'bg-slate-800 text-cyan-300 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Workflow</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showAdvanced ? 'Hide Options' : 'Task Options'}</span>
          </button>
        </div>

        {/* Large Command Input Box */}
        <div className="relative">
          <label htmlFor="task-prompt-input" className="sr-only">
            What do you want me to do on the web?
          </label>
          <textarea
            id="task-prompt-input"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              mode === 'research'
                ? 'What do you want me to research on the web? (e.g., Find 20 AI SaaS competitors and compare pricing)'
                : mode === 'testing'
                ? 'What website or flow should I test? (e.g., Test https://example.com/signup for validation, mobile issues, and errors)'
                : mode === 'automation'
                ? 'Describe the browser task to complete (e.g., Download monthly ledger report from portal and format table)'
                : 'Define recurring workflow (e.g., Check competitor pricing tables every week and report changes)'
            }
            className="w-full bg-[#121622] border border-slate-800 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 resize-none transition-all outline-none"
          />

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono text-cyan-400 font-medium">
                {mode === 'research' ? '4 Parallel Workers' : mode === 'testing' ? 'Autonomous QA Explorer' : 'Stealth Chromium'}
              </span>
              <span aria-hidden="true">·</span>
              <span>Evidence-backed extraction</span>
            </div>

            <button
              type="submit"
              disabled={!prompt.trim() || isSubmitting}
              className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 disabled:hover:bg-cyan-400 text-black font-semibold text-xs rounded-lg transition-all flex items-center gap-2 shadow-sm"
            >
              <span>{isSubmitting ? 'Allocating Workers...' : 'Start Browser Task'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Collapsible Advanced Config */}
        {showAdvanced && (
          <div className="p-4 bg-[#10141e] border border-slate-800 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs animate-in fade-in duration-100">
            <div>
              <label className="block text-slate-400 mb-1.5 font-medium">Starting URL (Optional)</label>
              <div className="relative">
                <Globe className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                <input
                  type="url"
                  value={startingUrl}
                  onChange={(e) => setStartingUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-[#0a0d14] border border-slate-800 rounded-md pl-8 pr-2.5 py-1.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1.5 font-medium">Parallel Browser Workers</label>
              <div className="relative">
                <Users className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                <select
                  value={workers}
                  onChange={(e) => setWorkers(Number(e.target.value))}
                  className="w-full bg-[#0a0d14] border border-slate-800 rounded-md pl-8 pr-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value={1}>1 Worker (Sequential)</option>
                  <option value={2}>2 Workers</option>
                  <option value={4}>4 Workers (Recommended)</option>
                  <option value={8}>8 Workers (Turbo)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1.5 font-medium">Target Viewport</label>
              <div className="relative">
                <Laptop className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                <select
                  value={viewport}
                  onChange={(e) => setViewport(e.target.value as any)}
                  className="w-full bg-[#0a0d14] border border-slate-800 rounded-md pl-8 pr-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="desktop">Desktop (1440x900)</option>
                  <option value="mobile">Mobile (390x844 iPhone)</option>
                  <option value="tablet">Tablet (768x1024)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1.5 font-medium">Safety Boundary</label>
              <div className="flex items-center gap-2 pt-1.5">
                <input
                  type="checkbox"
                  id="safe-mode-toggle"
                  checked={safeModeOnly}
                  onChange={(e) => setSafeModeOnly(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
                />
                <label htmlFor="safe-mode-toggle" className="text-slate-300 cursor-pointer">
                  Require confirmation for write actions
                </label>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Suggested Quick Starters */}
      <div className="pt-2 border-t border-slate-800/60">
        <div className="text-[11px] text-slate-400 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Quick Examples</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((sug, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSuggestion(sug)}
              className="text-left text-xs bg-[#121622] hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors truncate max-w-full"
            >
              {sug.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
