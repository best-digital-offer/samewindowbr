import React from 'react';
import { WorkerInstance } from '../../types/task';
import { Cpu, CheckCircle2, AlertTriangle, Clock, Ban } from 'lucide-react';

interface ParallelWorkerStatusProps {
  workers: WorkerInstance[];
  progress: {
    total: number;
    completed: number;
    running: number;
    blocked: number;
    queued: number;
    percent: number;
  };
}

export const ParallelWorkerStatus: React.FC<ParallelWorkerStatusProps> = ({ workers, progress }) => {
  const getWorkerBadge = (state: string) => {
    switch (state) {
      case 'running':
        return (
          <span className="flex items-center gap-1 text-[11px] text-cyan-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            ACTIVE
          </span>
        );
      case 'blocked':
        return (
          <span className="flex items-center gap-1 text-[11px] text-amber-400 font-mono">
            <Ban className="w-3 h-3" />
            BLOCKED
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
            <CheckCircle2 className="w-3 h-3" />
            DONE
          </span>
        );
      case 'waiting':
        return (
          <span className="flex items-center gap-1 text-[11px] text-indigo-400 font-mono">
            <Clock className="w-3 h-3" />
            VERIFYING
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            IDLE
          </span>
        );
    }
  };

  return (
    <div className="space-y-3">
      {/* High-Level Parallel Progress Header */}
      <div className="bg-[#0e121a] border border-slate-800 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="text-xs text-slate-400">Parallel Worker Concurrency</div>
          <div className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <span>{workers.length} Headless Chromium Workers Active</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-mono text-cyan-400 text-xs">{progress.percent}% Completed</span>
          </div>
        </div>

        {/* Clean unboxed stats (Zero-pill discipline) */}
        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
          <div>
            <span className="text-slate-200 font-semibold tabular-nums">{progress.total}</span> Total
          </div>
          <span aria-hidden="true" className="text-slate-700">/</span>
          <div>
            <span className="text-emerald-400 font-semibold tabular-nums">{progress.completed}</span> Complete
          </div>
          <span aria-hidden="true" className="text-slate-700">/</span>
          <div>
            <span className="text-cyan-400 font-semibold tabular-nums">{progress.running}</span> Running
          </div>
          <span aria-hidden="true" className="text-slate-700">/</span>
          <div>
            <span className="text-amber-400 font-semibold tabular-nums">{progress.blocked}</span> Blocked
          </div>
          <span aria-hidden="true" className="text-slate-700">/</span>
          <div>
            <span className="text-slate-400 font-semibold tabular-nums">{progress.queued}</span> Queued
          </div>
        </div>
      </div>

      {/* Parallel Workers Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {workers.map((worker) => (
          <div 
            key={worker.id}
            className="bg-[#10141f] border border-slate-800 rounded-lg p-3 space-y-2 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-semibold text-slate-200">{worker.name}</span>
              </div>
              {getWorkerBadge(worker.state)}
            </div>

            <div className="text-[11px] text-slate-400 line-clamp-2 min-h-8">
              {worker.currentAction}
            </div>

            {worker.currentUrl && (
              <div className="text-[10px] font-mono text-cyan-400/80 truncate bg-[#090b10] px-2 py-1 rounded border border-slate-800/80">
                {worker.currentUrl}
              </div>
            )}

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[11px] text-slate-400 font-mono">
              <span>Processed</span>
              <span className="text-slate-300 font-semibold tabular-nums">
                {worker.itemsProcessed} / {worker.itemsAssigned}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
