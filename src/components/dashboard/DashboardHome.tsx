import React from 'react';
import { BrowserTask, TaskConfig } from '../../types/task';
import { ResearchDataset } from '../../types/research';
import { QATestReport } from '../../types/testing';
import { ReusableWorkflow } from '../../types/workflow';
import { TaskCommandBox } from './TaskCommandBox';
import { 
  Play, 
  Square, 
  ArrowRight, 
  Compass, 
  FileCheck, 
  Layers, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface DashboardHomeProps {
  activeTasks: BrowserTask[];
  recentTasks: BrowserTask[];
  demoResearch: ResearchDataset;
  demoQA: QATestReport;
  workflows: ReusableWorkflow[];
  onSubmitTask: (prompt: string, config: TaskConfig) => void;
  onSelectTask: (task: BrowserTask) => void;
  onCancelTask: (taskId: string) => void;
  onOpenResearch: (dataset: ResearchDataset, isDemo: boolean) => void;
  onOpenQA: (report: QATestReport) => void;
  onOpenWorkflows: () => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  activeTasks,
  recentTasks,
  demoResearch,
  demoQA,
  workflows,
  onSubmitTask,
  onSelectTask,
  onCancelTask,
  onOpenResearch,
  onOpenQA,
  onOpenWorkflows
}) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Welcome Greeting & Mission Statement */}
      <div className="space-y-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
          OPERANT WORKFORCE CONSOLE
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
          What would you like to accomplish on the web?
        </h1>
        <p className="text-xs text-slate-400">
          Assign goals to autonomous browser workers. Research competitors, test apps for bugs, and run evidence-verified workflows.
        </p>
      </div>

      {/* Prominent Task Command Box */}
      <TaskCommandBox onSubmitTask={onSubmitTask} />

      {/* Active Tasks In Progress (if any) */}
      {activeTasks.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Active Browser Tasks ({activeTasks.length})
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeTasks.map((t) => (
              <div 
                key={t.id}
                onClick={() => onSelectTask(t)}
                className="bg-[#0e121a] border border-cyan-500/40 rounded-xl p-4 space-y-3 cursor-pointer hover:border-cyan-400 transition-all shadow-lg shadow-cyan-950/20"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase">
                      {t.mode} Mode · {t.workers.length} Workers
                    </span>
                    <h4 className="text-xs font-bold text-slate-100 truncate">{t.title}</h4>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCancelTask(t.id);
                    }}
                    className="p-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 rounded text-xs transition-colors shrink-0"
                    title="Stop Task"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 text-[11px] font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>{t.progress.completed} of {t.progress.total} Sources</span>
                    <span className="text-cyan-400">{t.progress.percent}%</span>
                  </div>
                  <div className="w-full bg-[#121622] rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-cyan-400 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${t.progress.percent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <span className="truncate">{t.events[0]?.action || 'Executing...'}</span>
                  <span className="text-cyan-400 font-medium shrink-0 flex items-center gap-1">
                    Live Stream <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Column Section: Recent Real Runs & Interactive Sample Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Demo Workspaces (Labeled clearly) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Evidence-Backed Intelligence Workspaces</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Sample Data</span>
          </div>

          {/* Research Demo Workspace Card */}
          <div 
            onClick={() => onOpenResearch(demoResearch, true)}
            className="bg-[#0e121a] border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-3 cursor-pointer transition-all shadow-md group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-cyan-400">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {demoResearch.title}
                    </h4>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {demoResearch.totalCandidates} candidates · {demoResearch.sourcesVerified} sources verified
                  </div>
                </div>
              </div>

              <span className="text-xs text-cyan-400 flex items-center gap-1 font-medium shrink-0">
                <span>Inspect Workspace</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Price matrix across 20 SaaS competitors, monthly/annual fees, free tiers, target customer profiles, and DOM evidence snapshots.
            </p>

            <div className="bg-[#121622] p-2.5 rounded-lg border border-slate-800 text-[11px] font-mono flex items-center justify-between text-slate-300">
              <span>Median Rate: <span className="text-cyan-300 font-semibold">$39/mo</span></span>
              <span>Dominant: <span className="text-slate-400">Seat-based SaaS</span></span>
              <span className="text-emerald-400">100% Sourced</span>
            </div>
          </div>

          {/* QA Demo Report Card */}
          <div 
            onClick={() => onOpenQA(demoQA)}
            className="bg-[#0e121a] border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-3 cursor-pointer transition-all shadow-md group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    SaaS Signup & Auth Flow QA Audit
                  </h4>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {demoQA.summary.totalChecks} checks · 1 high issue · 2 medium issues
                  </div>
                </div>
              </div>

              <span className="text-xs text-cyan-400 flex items-center gap-1 font-medium shrink-0">
                <span>View QA Report</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Exploratory testing covering empty form validation, disabled button lock states, unhandled TypeErrors, and 390px mobile viewport clipping.
            </p>

            <div className="bg-[#121622] p-2.5 rounded-lg border border-slate-800 text-[11px] font-mono flex items-center justify-between text-slate-300">
              <span>Passed: <span className="text-emerald-400 font-semibold">{demoQA.summary.passed}/37</span></span>
              <span>Top Bug: <span className="text-rose-400 font-semibold">Disabled Submit State</span></span>
              <span className="text-slate-400">Repro Steps Logged</span>
            </div>
          </div>
        </div>

        {/* Right: Saved Recurring Workflows & Change Detections */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Scheduled Workflows</span>
            </h3>
            <button
              onClick={onOpenWorkflows}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View All ({workflows.length})
            </button>
          </div>

          <div className="space-y-3">
            {workflows.map((wf) => {
              const latestRun = wf.runs[0];
              return (
                <div 
                  key={wf.id}
                  onClick={onOpenWorkflows}
                  className="bg-[#0e121a] border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-2.5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-100 truncate">{wf.title}</span>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-500/20">
                      {wf.schedule}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {wf.description}
                  </p>

                  {latestRun && latestRun.changesDetectedCount > 0 && (
                    <div className="bg-amber-950/30 border border-amber-500/30 rounded p-2 text-[11px] flex items-center justify-between text-amber-300">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                        <span>{latestRun.changesDetectedCount} Pricing Changes Detected</span>
                      </span>
                      <span className="font-mono text-slate-400 text-[10px]">Oct 1</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Web Limiting Disclosure Banner */}
          <div className="bg-[#10141f] border border-slate-800 rounded-xl p-4 space-y-1.5 text-xs text-slate-400">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Authentic Web Execution Standard</span>
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Real browser automation encounters WAF challenges, login walls, and DOM shifts. Operant clearly flags blocked destinations without fabricating data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
