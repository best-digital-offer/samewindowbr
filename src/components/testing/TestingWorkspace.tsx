import React, { useState } from 'react';
import { QATestReport, QABug, VisualDiffCheck } from '../../types/testing';
import { ResearchEvidence } from '../../types/research';
import { VisualRegressionModal } from './VisualRegressionModal';
import { 
  FileCheck, 
  Download, 
  AlertTriangle, 
  CheckCircle2, 
  Bug, 
  Eye, 
  Terminal, 
  Smartphone, 
  Monitor, 
  Layers, 
  Plus, 
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { exportQAToCSV, exportQAToJSON, exportQAToMarkdown, triggerDownload } from '../../services/exportService';

interface TestingWorkspaceProps {
  report: QATestReport;
  onInspectEvidence: (evidence: ResearchEvidence) => void;
  onSaveAsRegressionWorkflow?: (report: QATestReport) => void;
  onNewTest: () => void;
}

export const TestingWorkspace: React.FC<TestingWorkspaceProps> = ({
  report,
  onInspectEvidence,
  onSaveAsRegressionWorkflow,
  onNewTest
}) => {
  const [activeTab, setActiveTab] = useState<'bugs' | 'visual' | 'flows' | 'console'>('bugs');
  const [selectedVisualDiff, setSelectedVisualDiff] = useState<VisualDiffCheck | null>(null);

  const handleExport = (format: 'csv' | 'json' | 'md') => {
    if (format === 'csv') {
      const csv = exportQAToCSV(report);
      triggerDownload(csv, `operant-qa-report-${report.id}.csv`, 'text/csv');
    } else if (format === 'json') {
      const json = exportQAToJSON(report);
      triggerDownload(json, `operant-qa-report-${report.id}.json`, 'application/json');
    } else {
      const md = exportQAToMarkdown(report);
      triggerDownload(md, `operant-qa-report-${report.id}.md`, 'text/markdown');
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="text-[11px] font-mono font-bold text-rose-400">CRITICAL</span>;
      case 'HIGH':
        return <span className="text-[11px] font-mono font-bold text-rose-300">HIGH</span>;
      case 'MEDIUM':
        return <span className="text-[11px] font-mono font-bold text-amber-400">MEDIUM</span>;
      case 'LOW':
        return <span className="text-[11px] font-mono font-medium text-cyan-400">LOW</span>;
      default:
        return <span className="text-[11px] font-mono font-medium text-slate-400">INFO</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Workspace Header */}
      <div className="bg-[#0d1017] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>AI QA Engineer Audit</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-cyan-400">{report.summary.totalChecks} Checks Executed</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{report.durationSeconds}s Duration</span>
            </div>

            <h1 className="text-lg sm:text-xl font-bold text-slate-100">
              QA Audit: {report.targetUrl}
            </h1>
            <p className="text-xs text-slate-400">
              Objective: "{report.objective}"
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="relative group">
              <button
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700/80 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Report</span>
              </button>
              <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-[#121622] border border-slate-800 rounded-lg shadow-xl py-1 w-36 z-20">
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80"
                >
                  Download CSV
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80"
                >
                  Download JSON
                </button>
                <button
                  onClick={() => handleExport('md')}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80"
                >
                  Download Markdown
                </button>
              </div>
            </div>

            {onSaveAsRegressionWorkflow && (
              <button
                onClick={() => onSaveAsRegressionWorkflow(report)}
                className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Save as Regression Workflow</span>
              </button>
            )}

            <button
              onClick={onNewTest}
              className="px-3.5 py-1.5 text-xs font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Run New Test</span>
            </button>
          </div>
        </div>

        {/* Engineering Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/60 text-xs font-mono">
          <div className="bg-[#121622] p-3 rounded-lg border border-slate-800/80">
            <div className="text-slate-400 text-[11px] mb-0.5">CHECKS PASSED</div>
            <div className="text-lg font-bold text-emerald-400 tabular-nums">
              {report.summary.passed} <span className="text-xs text-slate-400 font-normal">/ {report.summary.totalChecks}</span>
            </div>
          </div>

          <div className="bg-[#121622] p-3 rounded-lg border border-slate-800/80">
            <div className="text-slate-400 text-[11px] mb-0.5">FAILED CHECKS</div>
            <div className="text-lg font-bold text-rose-400 tabular-nums">
              {report.summary.failed}
            </div>
          </div>

          <div className="bg-[#121622] p-3 rounded-lg border border-slate-800/80">
            <div className="text-slate-400 text-[11px] mb-0.5">HIGH SEVERITY</div>
            <div className="text-lg font-bold text-rose-300 tabular-nums">
              {report.summary.highIssues}
            </div>
          </div>

          <div className="bg-[#121622] p-3 rounded-lg border border-slate-800/80">
            <div className="text-slate-400 text-[11px] mb-0.5">MEDIUM SEVERITY</div>
            <div className="text-lg font-bold text-amber-400 tabular-nums">
              {report.summary.mediumIssues}
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Section Navigation */}
      <div className="flex items-center gap-1 p-1 bg-[#0d1017] border border-slate-800 rounded-lg text-xs w-fit">
        <button
          onClick={() => setActiveTab('bugs')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
            activeTab === 'bugs'
              ? 'bg-slate-800 text-rose-400 shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bug className="w-3.5 h-3.5" />
          <span>Discovered Issues ({report.bugs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('visual')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
            activeTab === 'visual'
              ? 'bg-slate-800 text-cyan-300 shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Visual Regressions ({report.visualDiffs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('console')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
            activeTab === 'console'
              ? 'bg-slate-800 text-amber-300 shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Console Observers ({report.consoleErrors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('flows')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
            activeTab === 'flows'
              ? 'bg-slate-800 text-slate-100 shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Audited Flows ({report.flowsTested.length})</span>
        </button>
      </div>

      {/* Tab 1: Discovered Issues / Bugs */}
      {activeTab === 'bugs' && (
        <div className="space-y-4">
          {report.bugs.map((bug, idx) => (
            <div 
              key={bug.id}
              className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 space-y-4 shadow-md"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-slate-500">#{idx + 1}</span>
                  <div>{getSeverityBadge(bug.severity)}</div>
                  <h3 className="text-sm font-bold text-slate-100">{bug.issue}</h3>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span>Page: <code className="text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded">{bug.page}</code></span>
                  <span aria-hidden="true">·</span>
                  <span>{bug.viewport === 'mobile' ? '390px Mobile' : 'Desktop'}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {bug.description}
              </p>

              {/* Steps to Reproduce */}
              <div className="bg-[#121622] p-3.5 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                <div className="font-semibold text-slate-200 text-[11px] uppercase tracking-wider">
                  Steps to Reproduce:
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 font-mono text-[11px]">
                  {bug.stepsToReproduce.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              </div>

              {/* Expected vs Actual */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#080a0f] p-3 rounded-lg border border-slate-800">
                  <div className="text-[11px] font-semibold text-emerald-400 mb-1">Expected Behavior</div>
                  <div className="text-slate-300">{bug.expected}</div>
                </div>
                <div className="bg-[#080a0f] p-3 rounded-lg border border-slate-800">
                  <div className="text-[11px] font-semibold text-rose-400 mb-1">Actual Observed Behavior</div>
                  <div className="text-slate-300">{bug.actual}</div>
                </div>
              </div>

              {/* Suggested Fix and Evidence Button */}
              <div className="pt-2 border-t border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="text-slate-300">
                  <span className="font-semibold text-cyan-400">Suggested Fix: </span>
                  <code className="text-[11px] font-mono bg-slate-900 px-2 py-0.5 rounded text-slate-200">
                    {bug.suggestedFix}
                  </code>
                </div>

                <button
                  onClick={() => onInspectEvidence(bug.evidence)}
                  className="px-3 py-1.5 text-xs font-medium text-cyan-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <span>Inspect DOM Evidence</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {report.bugs.length === 0 && (
            <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-12 text-center text-xs text-slate-400">
              All form validations and flow boundaries passed cleanly without anomalies.
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Visual Regressions */}
      {activeTab === 'visual' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.visualDiffs.map((diff) => (
            <div 
              key={diff.id}
              onClick={() => setSelectedVisualDiff(diff)}
              className="bg-[#0e121a] border border-slate-800 rounded-xl p-4 space-y-3 cursor-pointer hover:border-slate-700 transition-colors shadow-md"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-slate-200">{diff.name}</h4>
                {diff.status === 'regression_detected' ? (
                  <span className="text-[11px] font-mono text-rose-400 font-semibold">
                    REGRESSION ({diff.diffPercentage}%)
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                    PASSED ({diff.diffPercentage}%)
                  </span>
                )}
              </div>

              <div className="rounded-lg overflow-hidden border border-slate-800 aspect-video relative bg-black">
                <img
                  src={diff.currentScreenshotUrl}
                  alt={diff.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-2">
                {diff.highlightedRegionText}
              </p>

              <button className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 pt-1">
                <span>View Before / After Comparison</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Console & Runtime Errors */}
      {activeTab === 'console' && (
        <div className="bg-[#080a0f] border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-3">
          <div className="text-slate-400 pb-2 border-b border-slate-800 flex items-center justify-between">
            <span>Browser Console Observer</span>
            <span>{report.consoleErrors.length} Captured Logs</span>
          </div>

          <div className="space-y-2">
            {report.consoleErrors.map((err, i) => (
              <div key={i} className="p-3 bg-[#0d1017] border border-slate-800 rounded-lg space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className={err.type === 'error' ? 'text-rose-400 font-bold' : 'text-amber-400 font-bold'}>
                    [{err.type.toUpperCase()}]
                  </span>
                  <span className="text-slate-500 tabular-nums">
                    {new Date(err.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-slate-200">{err.message}</div>
                <div className="text-[10px] text-slate-400 truncate">{err.source}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Tested Flows */}
      {activeTab === 'flows' && (
        <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 space-y-3 text-xs">
          <h4 className="font-semibold text-slate-200 pb-2 border-b border-slate-800">
            Explored Heuristic Test Flows ({report.flowsTested.length})
          </h4>
          <div className="divide-y divide-slate-800/60">
            {report.flowsTested.map((flow, i) => (
              <div key={i} className="py-2.5 flex items-center gap-2.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{flow}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visual Diff Modal */}
      <VisualRegressionModal
        diff={selectedVisualDiff}
        isOpen={!!selectedVisualDiff}
        onClose={() => setSelectedVisualDiff(null)}
      />
    </div>
  );
};
