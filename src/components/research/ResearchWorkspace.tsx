import React, { useState } from 'react';
import { ResearchDataset, CompetitorComparisonItem, ResearchEvidence } from '../../types/research';
import { 
  Download, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Filter, 
  FileText, 
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { exportResearchToCSV, exportResearchToJSON, exportResearchToMarkdown, triggerDownload } from '../../services/exportService';

interface ResearchWorkspaceProps {
  dataset: ResearchDataset;
  isDemo?: boolean;
  onInspectEvidence: (evidence: ResearchEvidence) => void;
  onNewResearch: () => void;
}

export const ResearchWorkspace: React.FC<ResearchWorkspaceProps> = ({
  dataset,
  isDemo = false,
  onInspectEvidence,
  onNewResearch
}) => {
  const [search, setSearch] = useState('');
  const [filterConfidence, setFilterConfidence] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<CompetitorComparisonItem | null>(dataset.items[0] || null);

  const filteredItems = dataset.items.filter(item => {
    const matchesSearch = 
      item.competitor.toLowerCase().includes(search.toLowerCase()) ||
      item.pricing.toLowerCase().includes(search.toLowerCase()) ||
      item.targetCustomer.toLowerCase().includes(search.toLowerCase()) ||
      item.mainFeatures.some(f => f.toLowerCase().includes(search.toLowerCase()));

    const matchesConfidence = 
      filterConfidence === 'all' ? true : item.confidence === filterConfidence;

    return matchesSearch && matchesConfidence;
  });

  const handleExport = (format: 'csv' | 'json' | 'md') => {
    if (format === 'csv') {
      const csv = exportResearchToCSV(dataset);
      triggerDownload(csv, `operant-research-${dataset.id}.csv`, 'text/csv');
    } else if (format === 'json') {
      const json = exportResearchToJSON(dataset);
      triggerDownload(json, `operant-research-${dataset.id}.json`, 'application/json');
    } else {
      const md = exportResearchToMarkdown(dataset);
      triggerDownload(md, `operant-research-${dataset.id}.md`, 'text/markdown');
    }
  };

  const renderConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Verified
          </span>
        );
      case 'Likely':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] text-cyan-400 font-medium">
            <ShieldCheck className="w-3 h-3" />
            Likely
          </span>
        );
      case 'Not publicly available':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <HelpCircle className="w-3 h-3" />
            Not Available
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-medium">
            <AlertTriangle className="w-3 h-3" />
            Conflicting
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Workspace Header */}
      <div className="bg-[#0d1017] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Web Research Workspace</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-cyan-400">{dataset.items.length} Candidates Analyzed</span>
              <span aria-hidden="true">·</span>
              <span>{dataset.sourcesVerified} Sources Verified</span>
              {isDemo && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-400 font-mono text-[11px]">Interactive Sample Dataset</span>
                </>
              )}
            </div>

            <h1 className="text-lg sm:text-xl font-bold text-slate-100">
              {dataset.title}
            </h1>
            <p className="text-xs text-slate-400">
              Prompt: "{dataset.query}"
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
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

            <button
              onClick={onNewResearch}
              className="px-3.5 py-1.5 text-xs font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Research</span>
            </button>
          </div>
        </div>

        {/* Executive Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-800/60 text-xs">
          <div className="bg-[#121622] p-3 rounded-lg border border-slate-800/80">
            <div className="text-slate-400 mb-0.5">Discovered Price Range</div>
            <div className="font-semibold text-slate-200">{dataset.summary.priceRange}</div>
          </div>
          <div className="bg-[#121622] p-3 rounded-lg border border-slate-800/80">
            <div className="text-slate-400 mb-0.5">Dominant Pricing Model</div>
            <div className="font-semibold text-slate-200">{dataset.summary.dominantModel}</div>
          </div>
          <div className="bg-[#121622] p-3 rounded-lg border border-slate-800/80 md:col-span-2">
            <div className="text-slate-400 mb-0.5">Market Synthesis & Recommendation</div>
            <div className="text-slate-300 leading-snug">{dataset.summary.recommendation}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search competitor, price, or target segment..."
            className="w-full bg-[#0d1017] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-[#0d1017] border border-slate-800 rounded-lg text-xs self-start sm:self-auto">
          <button
            onClick={() => setFilterConfidence('all')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              filterConfidence === 'all' ? 'bg-slate-800 text-slate-100 shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({dataset.items.length})
          </button>
          <button
            onClick={() => setFilterConfidence('Verified')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              filterConfidence === 'Verified' ? 'bg-slate-800 text-emerald-400 shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Verified Only
          </button>
          <button
            onClick={() => setFilterConfidence('Likely')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              filterConfidence === 'Likely' ? 'bg-slate-800 text-cyan-400 shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Likely
          </button>
        </div>
      </div>

      {/* Main High-Density Data Workspace Grid */}
      <div className="bg-[#0b0e14] border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-[#0e121a] text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Competitor</th>
                <th className="py-3 px-4">Monthly Rate</th>
                <th className="py-3 px-4">Annual Rate</th>
                <th className="py-3 px-4">Free Plan</th>
                <th className="py-3 px-4">Target Customer</th>
                <th className="py-3 px-4">Main Capabilities</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4 text-right">Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredItems.map((item) => (
                <tr 
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`hover:bg-slate-800/40 cursor-pointer transition-colors ${
                    selectedItem?.id === item.id ? 'bg-slate-800/30' : ''
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                      <span>{item.competitor}</span>
                    </div>
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] font-mono text-cyan-400/80 hover:text-cyan-300 flex items-center gap-1 mt-0.5"
                    >
                      {item.website.replace('https://', '')}
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </td>

                  <td className="py-3 px-4 font-mono font-medium text-slate-200 tabular-nums">
                    {item.pricing}
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-400 tabular-nums">
                    {item.annualPrice}
                  </td>

                  <td className="py-3 px-4">
                    <span className={item.freePlan === 'Yes' ? 'text-emerald-400' : 'text-slate-400'}>
                      {item.freePlan}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-slate-300 max-w-xs truncate">
                    {item.targetCustomer}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-slate-300 max-w-xs truncate">
                      {item.mainFeatures.slice(0, 2).join(' · ')}
                      {item.mainFeatures.length > 2 && (
                        <span className="text-slate-500 text-[10px]">+{item.mainFeatures.length - 2} more</span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    {renderConfidenceBadge(item.confidence)}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onInspectEvidence(item.evidence);
                      }}
                      className="px-2.5 py-1 text-[11px] font-medium text-cyan-300 hover:text-white bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 rounded transition-colors inline-flex items-center gap-1"
                    >
                      <span>Evidence</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No matching competitors found for "{search}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Item Quick Inspection Footer Panel */}
      {selectedItem && (
        <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <span className="text-xs text-slate-400">Deep Profile:</span>
              <h3 className="text-sm font-bold text-slate-100">{selectedItem.competitor}</h3>
            </div>
            <button
              onClick={() => onInspectEvidence(selectedItem.evidence)}
              className="px-3 py-1.5 text-xs font-medium text-cyan-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Inspect Source Evidence Record</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block mb-1 font-medium">Core Value Proposition & Strengths</span>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                {selectedItem.strengths.map((str, idx) => (
                  <li key={idx}>{str}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-slate-400 block mb-1 font-medium">Competitive Weaknesses</span>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                {selectedItem.weaknesses.map((w, idx) => (
                  <li key={idx}>{w}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-slate-400 block mb-1 font-medium">Source Verification Meta</span>
              <div className="space-y-1 text-slate-400 font-mono text-[11px]">
                <div>Confidence: <span className="text-emerald-400">{selectedItem.confidence}</span></div>
                <div>Pricing URL: <a href={selectedItem.pricingUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{selectedItem.pricingUrl}</a></div>
                <div>Last Checked: {new Date(selectedItem.lastChecked).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
