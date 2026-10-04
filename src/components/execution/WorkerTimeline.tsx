import React from 'react';
import { TaskExecutionEvent } from '../../types/task';
import { CheckCircle2, AlertTriangle, Info, Clock, ExternalLink, ShieldAlert } from 'lucide-react';

interface WorkerTimelineProps {
  events: TaskExecutionEvent[];
  onOpenEvidence?: (selector?: string, snippet?: string, url?: string) => void;
}

export const WorkerTimeline: React.FC<WorkerTimelineProps> = ({ events }) => {
  const getEventIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />;
      case 'error':
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Info className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-4 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <h4 className="text-xs font-semibold text-slate-200">Execution Timeline</h4>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          {events.length} Events Streamed
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[460px]">
        {events.map((ev) => (
          <div 
            key={ev.id}
            className="flex items-start gap-2.5 text-xs text-slate-300 group hover:bg-slate-800/30 p-2 rounded-lg transition-colors border border-transparent hover:border-slate-800"
          >
            <div className="mt-0.5 shrink-0">
              {getEventIcon(ev.status)}
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-slate-200 text-[11px]">
                  {ev.workerName}
                </span>
                <span className="font-mono text-[10px] text-slate-500 tabular-nums">
                  {new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>

              <p className="text-slate-300 leading-snug text-xs">
                {ev.action}
              </p>

              {ev.url && (
                <div className="text-[10px] font-mono text-cyan-400/80 truncate">
                  {ev.url}
                </div>
              )}

              {ev.domSelector && (
                <div className="pt-0.5">
                  <code className="text-[10px] font-mono text-slate-400 bg-[#090b10] px-1.5 py-0.5 rounded border border-slate-800">
                    {ev.domSelector}
                  </code>
                </div>
              )}

              {ev.extractedSnippet && (
                <div className="text-[11px] font-mono text-emerald-400/90 bg-emerald-950/20 border border-emerald-500/20 p-1.5 rounded mt-1">
                  {ev.extractedSnippet}
                </div>
              )}
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <div className="py-8 text-center text-xs text-slate-500">
            Awaiting worker launch signals...
          </div>
        )}
      </div>
    </div>
  );
};
