import React, { useState, useEffect } from 'react';
import { BrowserTask } from '../../types/task';
import { ResearchDataset } from '../../types/research';
import { QATestReport } from '../../types/testing';
import { ParallelWorkerStatus } from './ParallelWorkerStatus';
import { BrowserPreview } from './BrowserPreview';
import { WorkerTimeline } from './WorkerTimeline';
import { 
  Square, 
  ArrowLeft, 
  ExternalLink, 
  Table, 
  FileCheck, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface LiveExecutionWorkspaceProps {
  task: BrowserTask;
  dataset?: ResearchDataset;
  testReport?: QATestReport;
  onCancelTask: (taskId: string) => void;
  onNavigate: (view: string) => void;
}

export const LiveExecutionWorkspace: React.FC<LiveExecutionWorkspaceProps> = ({
  task,
  dataset,
  testReport,
  onCancelTask,
  onNavigate
}) => {
  const [elapsedSec, setElapsedSec] = useState(0);

  useEffect(() => {
    if (task.status === 'completed' || task.status === 'cancelled' || task.status === 'failed') {
      if (task.completedAt && task.startedAt) {
        setElapsedSec(Math.round((task.completedAt - task.startedAt) / 1000));
      }
      return;
    }

    const interval = setInterval(() => {
      if (task.startedAt) {
        setElapsedSec(Math.floor((Date.now() - task.startedAt) / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [task.status, task.startedAt, task.completedAt]);

  const formatElapsed = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const getStatusBadge = () => {
    switch (task.status) {
      case 'running':
        return (
          <span className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            RUNNING
          </span>
        );
      case 'verifying':
        return (
          <span className="flex items-center gap-1.5 text-xs text-indigo-400 font-mono">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            VERIFYING
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            COMPLETED
          </span>
        );
      case 'partial':
        return (
          <span className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
            <AlertTriangle className="w-3.5 h-3.5" />
            PARTIAL RESULT
          </span>
        );
      case 'cancelled':
        return (
          <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            CANCELLED
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono uppercase">
            {task.status}
          </span>
        );
    }
  };

  const isLive = task.status === 'running' || task.status === 'planning' || task.status === 'verifying';
  const latestEvent = task.events[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Workspace Header Bar */}
      <div className="bg-[#0d1017] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={() => onNavigate('dashboard')}
              className="hover:text-slate-200 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-slate-500">{task.id}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{task.mode} Mode</span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-slate-100 truncate">
            {task.title}
          </h2>
        </div>

        {/* Live Controls and Status */}
        <div className="flex items-center flex-wrap gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-4 bg-[#121622] px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs">
            <div>{getStatusBadge()}</div>
            <span className="text-slate-700">|</span>
            <div className="font-mono text-slate-300 tabular-nums flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{formatElapsed(elapsedSec)}</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="font-mono text-cyan-300">
              {task.workers.length} Workers
            </div>
          </div>

          {isLive ? (
            <button
              onClick={() => onCancelTask(task.id)}
              className="px-3 py-1.5 text-xs font-medium text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop Task</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {task.mode === 'research' && dataset && (
                <button
                  onClick={() => onNavigate('research')}
                  className="px-3 py-1.5 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>View Research Dataset ({dataset.items.length})</span>
                </button>
              )}
              {task.mode === 'testing' && testReport && (
                <button
                  onClick={() => onNavigate('testing')}
                  className="px-3 py-1.5 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>View QA Report ({testReport.summary.totalChecks} checks)</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Partial / Blocked Notice if applicable */}
      {task.progress.blocked > 0 && (
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-3.5 flex items-start gap-3 text-xs text-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-amber-300">
              Partial Task Execution Notice:
            </span>
            <p className="text-amber-200/90 leading-relaxed">
              {task.progress.completed} sources were successfully verified, but {task.progress.blocked} destination websites enforced bot mitigation challenges (WAF/CAPTCHA). In accordance with integrity rules, verified findings are preserved without fabricating missing entries.
            </p>
          </div>
        </div>
      )}

      {/* Parallel Workers Concurrency Grid */}
      <ParallelWorkerStatus workers={task.workers} progress={task.progress} />

      {/* Split Workspace View: Browser Preview + Real-time Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Primary Browser Worker Viewport</span>
            <span className="font-mono text-[11px] text-slate-500">Encrypted Chromium Context</span>
          </div>
          <BrowserPreview
            currentUrl={latestEvent?.url || 'https://google.com'}
            activeAction={latestEvent?.action || 'Executing plan...'}
            viewport={task.config.viewport}
            screenshotUrl="/src/assets/images/browser_viewport_audit_1791084657841.jpg"
          />
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
            <span>Live Action Stream</span>
            <span className="font-mono text-[11px] text-cyan-400">Streaming</span>
          </div>
          <WorkerTimeline events={task.events} />
        </div>
      </div>
    </div>
  );
};
