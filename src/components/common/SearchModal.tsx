import React, { useState, useEffect } from 'react';
import { Search, X, Compass, FileCheck, Layers, Cpu, ChevronRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (view: string, targetId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectAction }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickItems = [
    { id: '1', title: 'Find 20 AI SaaS competitors and compare pricing', category: 'Research Workspace', type: 'research', view: 'research' },
    { id: '2', title: 'Audit SaaS Signup flow and mobile form validation', category: 'QA Test Report', type: 'testing', view: 'testing' },
    { id: '3', title: 'Weekly Competitor Pricing & Tier Tracker', category: 'Scheduled Workflow', type: 'workflow', view: 'workflows' },
    { id: '4', title: 'Model Context Protocol (MCP) Live Sandbox', category: 'Developer Tools', type: 'mcp', view: 'mcp' },
    { id: '5', title: 'Isolated Stealth Chromium Profile', category: 'Browser Sessions', type: 'profile', view: 'profiles' }
  ];

  const filtered = query.trim() === ''
    ? quickItems
    : quickItems.filter(i => i.title.toLowerCase().includes(query.toLowerCase()) || i.category.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-start justify-center pt-20 p-4" onClick={onClose}>
      <div 
        className="w-full max-w-xl bg-[#0e121a] border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks, evidence, test reports, workflows, or MCP tools..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-100 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-2 max-h-80 overflow-y-auto divide-y divide-slate-800/40">
          <div className="px-3 py-2 text-xs font-medium text-slate-400">
            {query ? 'Matching Results' : 'Suggested Workspaces & Reports'}
          </div>
          {filtered.map(item => (
            <button
              key={item.id}
              onClick={() => {
                onSelectAction(item.view);
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-800/60 flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-cyan-400">
                  {item.type === 'research' && <Compass className="w-4 h-4" />}
                  {item.type === 'testing' && <FileCheck className="w-4 h-4" />}
                  {item.type === 'workflow' && <Layers className="w-4 h-4" />}
                  {item.type === 'mcp' && <Cpu className="w-4 h-4" />}
                  {item.type === 'profile' && <Compass className="w-4 h-4" />}
                </div>
                <div className="truncate">
                  <div className="text-xs text-slate-200 group-hover:text-cyan-300 font-medium truncate">{item.title}</div>
                  <div className="text-[11px] text-slate-400">{item.category}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-300 shrink-0 ml-2" />
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-xs text-slate-400">
              No matching records found for "{query}".
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 border-t border-slate-800/80 bg-[#090b10] flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Navigate with ↵ or click</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
