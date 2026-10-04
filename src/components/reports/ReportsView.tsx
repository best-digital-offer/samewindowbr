import React, { useState } from 'react';
import { ResearchDataset } from '../../types/research';
import { QATestReport } from '../../types/testing';
import { 
  FileText, 
  Download, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Compass, 
  FileCheck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { exportResearchToCSV, exportResearchToJSON, exportResearchToMarkdown, exportQAToCSV, exportQAToJSON, exportQAToMarkdown, triggerDownload } from '../../services/exportService';

interface ReportsViewProps {
  researchDatasets: ResearchDataset[];
  qaReports: QATestReport[];
  onOpenResearch: (dataset: ResearchDataset) => void;
  onOpenQA: (report: QATestReport) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  researchDatasets,
  qaReports,
  onOpenResearch,
  onOpenQA
}) => {
  const [filterType, setFilterType] = useState<'all' | 'research' | 'qa'>('all');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-[#0d1017] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Intelligence Repository</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-cyan-400">{researchDatasets.length + qaReports.length} Reports Archived</span>
            <span aria-hidden="true">·</span>
            <span>Evidence Preserved</span>
          </div>

          <h1 className="text-lg sm:text-xl font-bold text-slate-100">
            Reports & Artifact Archive
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Export structured findings in CSV, JSON, and Markdown. Every report includes immutable source links, DOM selectors, and confidence timestamps.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1 p-1 bg-[#121622] border border-slate-800 rounded-lg text-xs self-start md:self-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filterType === 'all' ? 'bg-slate-800 text-slate-100 shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Reports
          </button>
          <button
            onClick={() => setFilterType('research')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filterType === 'research' ? 'bg-slate-800 text-cyan-300 shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Web Research ({researchDatasets.length})
          </button>
          <button
            onClick={() => setFilterType('qa')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filterType === 'qa' ? 'bg-slate-800 text-cyan-300 shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            QA Audits ({qaReports.length})
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {(filterType === 'all' || filterType === 'research') && researchDatasets.map((res) => (
          <div 
            key={res.id}
            className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-cyan-400 font-medium">
                  <Compass className="w-3.5 h-3.5" />
                  Web Research
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-500">{new Date(res.createdAt).toLocaleDateString()}</span>
                <span aria-hidden="true">·</span>
                <span>{res.sourcesVerified} sources verified</span>
              </div>

              <h3 className="text-sm font-bold text-slate-100">{res.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-1">{res.query}</p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => {
                  const csv = exportResearchToCSV(res);
                  triggerDownload(csv, `${res.id}.csv`, 'text/csv');
                }}
                className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                title="Download CSV"
              >
                CSV
              </button>
              <button
                onClick={() => {
                  const json = exportResearchToJSON(res);
                  triggerDownload(json, `${res.id}.json`, 'application/json');
                }}
                className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                title="Download JSON"
              >
                JSON
              </button>
              <button
                onClick={() => {
                  const md = exportResearchToMarkdown(res);
                  triggerDownload(md, `${res.id}.md`, 'text/markdown');
                }}
                className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                title="Download Markdown"
              >
                MD
              </button>

              <button
                onClick={() => onOpenResearch(res)}
                className="px-3 py-1.5 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1 ml-1"
              >
                <span>Inspect</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {(filterType === 'all' || filterType === 'qa') && qaReports.map((qa) => (
          <div 
            key={qa.id}
            className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <FileCheck className="w-3.5 h-3.5" />
                  AI QA Audit
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-500">{new Date(qa.createdAt).toLocaleDateString()}</span>
                <span aria-hidden="true">·</span>
                <span className="text-rose-400 font-mono font-medium">{qa.summary.failed} Issues</span>
              </div>

              <h3 className="text-sm font-bold text-slate-100">{qa.targetUrl}</h3>
              <p className="text-xs text-slate-400 line-clamp-1">{qa.objective}</p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => {
                  const csv = exportQAToCSV(qa);
                  triggerDownload(csv, `${qa.id}.csv`, 'text/csv');
                }}
                className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                title="Download CSV"
              >
                CSV
              </button>
              <button
                onClick={() => {
                  const json = exportQAToJSON(qa);
                  triggerDownload(json, `${qa.id}.json`, 'application/json');
                }}
                className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                title="Download JSON"
              >
                JSON
              </button>
              <button
                onClick={() => {
                  const md = exportQAToMarkdown(qa);
                  triggerDownload(md, `${qa.id}.md`, 'text/markdown');
                }}
                className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                title="Download Markdown"
              >
                MD
              </button>

              <button
                onClick={() => onOpenQA(qa)}
                className="px-3 py-1.5 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1 ml-1"
              >
                <span>Inspect</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
