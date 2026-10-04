import React, { useState } from 'react';
import { ReusableWorkflow, WorkflowRunRecord, PriceChangeDetection } from '../../types/workflow';
import { 
  Layers, 
  Play, 
  Pause, 
  Clock, 
  History, 
  AlertCircle, 
  TrendingUp, 
  ExternalLink, 
  Plus, 
  MoreVertical,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface WorkflowsWorkspaceProps {
  workflows: ReusableWorkflow[];
  onRunWorkflow: (workflowId: string) => void;
  onNewWorkflow: () => void;
  onToggleStatus: (workflowId: string) => void;
}

export const WorkflowsWorkspace: React.FC<WorkflowsWorkspaceProps> = ({
  workflows,
  onRunWorkflow,
  onNewWorkflow,
  onToggleStatus
}) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<ReusableWorkflow>(workflows[0] || null);
  const [selectedRun, setSelectedRun] = useState<WorkflowRunRecord | null>(
    workflows[0]?.runs[0] || null
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-[#0d1017] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Automation Hub</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-cyan-400">{workflows.length} Active Workflows</span>
            <span aria-hidden="true">·</span>
            <span>Delta Change Detection Active</span>
          </div>

          <h1 className="text-lg sm:text-xl font-bold text-slate-100">
            Reusable Browser Workflows
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Save research tasks and QA audits as recurring jobs. Operant continuously tracks DOM deltas, detects competitor price shifts, and alerts on regression breaches.
          </p>
        </div>

        <button
          onClick={onNewWorkflow}
          className="px-3.5 py-2 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs shrink-0 self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Workflow</span>
        </button>
      </div>

      {/* Main Grid: Workflows List (Left) + Selected Workflow History & Change Detections (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Workflows Catalog */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Saved Workflows</span>
            <span className="text-[11px] font-mono text-slate-500">Autonomous Cadence</span>
          </div>

          <div className="space-y-3">
            {workflows.map((wf) => {
              const isSelected = selectedWorkflow?.id === wf.id;
              const latestRun = wf.runs[0];

              return (
                <div
                  key={wf.id}
                  onClick={() => {
                    setSelectedWorkflow(wf);
                    setSelectedRun(wf.runs[0] || null);
                  }}
                  className={`bg-[#0e121a] border rounded-xl p-4 space-y-3 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-cyan-500/50 bg-slate-900/60 shadow-lg shadow-cyan-950/20'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-bold text-slate-100">{wf.title}</h3>
                        <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                          wf.status === 'active' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {wf.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {wf.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRunWorkflow(wf.id);
                        }}
                        className="p-1.5 bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-300 rounded border border-cyan-500/30 transition-colors"
                        title="Run Now"
                      >
                        <Play className="w-3 h-3 fill-current" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span className="capitalize">{wf.schedule} schedule</span>
                    </div>

                    {latestRun && (
                      <div className="text-slate-300">
                        {latestRun.changesDetectedCount > 0 ? (
                          <span className="text-amber-400 font-semibold">
                            {latestRun.changesDetectedCount} Changes Detected
                          </span>
                        ) : (
                          <span className="text-slate-500">No Changes</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Workflow Details, Change Detection Log & Run History */}
        {selectedWorkflow && (
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-0.5">
                    <span>Workflow Inspector</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-cyan-400">{selectedWorkflow.schedule}</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-100">{selectedWorkflow.title}</h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleStatus(selectedWorkflow.id)}
                    className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    {selectedWorkflow.status === 'active' ? (
                      <>
                        <Pause className="w-3 h-3" />
                        <span>Pause Schedule</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3" />
                        <span>Resume Schedule</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onRunWorkflow(selectedWorkflow.id)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run Now</span>
                  </button>
                </div>
              </div>

              {/* Instruction description */}
              <div className="text-xs text-slate-300 bg-[#121622] p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-medium text-slate-400 text-[11px] block">Autonomous Prompt Instruction:</span>
                <p className="leading-relaxed">{selectedWorkflow.instruction}</p>
              </div>

              {/* Highlighted Feature: CHANGE DETECTION ENGINE */}
              {selectedRun && selectedRun.changes.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-amber-400" />
                      <h3 className="text-xs font-bold text-slate-200">
                        Detected Changes vs Previous Run ({selectedRun.changes.length})
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      Diff Date: {new Date(selectedRun.completedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {selectedRun.changes.map((ch) => (
                      <div 
                        key={ch.id}
                        className="bg-[#121622] border border-amber-500/30 rounded-lg p-3.5 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-100">{ch.entityName}</span>
                          <span className="text-[11px] font-mono text-amber-400 font-medium">PRICE / TIER CHANGED</span>
                        </div>

                        {/* Value comparison Before vs Current */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                          <div className="bg-[#080a0f] p-2 rounded border border-slate-800">
                            <span className="text-[10px] text-slate-500 block mb-0.5">PREVIOUS RUN</span>
                            <span className="text-slate-300">{ch.previousValue}</span>
                          </div>
                          <div className="bg-[#080a0f] p-2 rounded border border-amber-500/40">
                            <span className="text-[10px] text-amber-400 block mb-0.5">CURRENT RUN</span>
                            <span className="text-emerald-300 font-semibold">{ch.currentValue}</span>
                          </div>
                        </div>

                        <p className="text-slate-300 text-xs">
                          {ch.deltaSummary}
                        </p>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px] text-slate-400">
                          <span className="font-mono text-slate-500 truncate max-w-xs">{ch.evidenceSnippet}</span>
                          <a
                            href={ch.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                          >
                            <span>Inspect Source</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Historical Execution Log */}
              <div className="space-y-2 pt-3 border-t border-slate-800">
                <div className="text-xs font-semibold text-slate-300">
                  Execution Run History ({selectedWorkflow.runs.length} runs recorded)
                </div>

                <div className="divide-y divide-slate-800/60 text-xs">
                  {selectedWorkflow.runs.map((run) => (
                    <div 
                      key={run.id}
                      onClick={() => setSelectedRun(run)}
                      className={`py-2.5 px-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                        selectedRun?.id === run.id ? 'bg-slate-800/40 text-white' : 'hover:bg-slate-800/20 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <div>
                          <span className="text-slate-200 font-medium">
                            {new Date(run.startedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="text-[11px] text-slate-500 block">
                            {run.itemsProcessed} entities checked
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-[11px]">
                        {run.changesDetectedCount > 0 ? (
                          <span className="text-amber-400">{run.changesDetectedCount} changes</span>
                        ) : (
                          <span className="text-slate-500">No changes</span>
                        )}
                        <span className="text-emerald-400 uppercase">{run.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
