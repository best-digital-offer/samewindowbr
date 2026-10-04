import React from 'react';
import { Search, Plus, Menu, Globe, Shield, Terminal, ArrowUpRight } from 'lucide-react';

interface TopNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenSearch: () => void;
  onNewTask: () => void;
  onToggleMobileDrawer: () => void;
  activeTasksCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onNewTask,
  onToggleMobileDrawer,
  activeTasksCount
}) => {
  return (
    <header className="h-14 border-b border-slate-800/80 bg-[#090b0e]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileDrawer}
          className="p-1.5 text-slate-400 hover:text-slate-100 rounded-md lg:hidden hover:bg-slate-800/60"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={() => onNavigate('dashboard')}
          className="text-base font-bold tracking-tight text-white hover:text-cyan-400 transition-colors flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
          Operant
        </button>
      </div>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`hover:text-slate-100 transition-colors ${currentView === 'dashboard' ? 'text-white' : ''}`}
        >
          Workforce
        </button>
        <button
          onClick={() => onNavigate('research')}
          className={`hover:text-slate-100 transition-colors ${currentView === 'research' ? 'text-white' : ''}`}
        >
          Web Research
        </button>
        <button
          onClick={() => onNavigate('testing')}
          className={`hover:text-slate-100 transition-colors ${currentView === 'testing' ? 'text-white' : ''}`}
        >
          AI Testing
        </button>
        <button
          onClick={() => onNavigate('workflows')}
          className={`hover:text-slate-100 transition-colors ${currentView === 'workflows' ? 'text-white' : ''}`}
        >
          Workflows
        </button>
        <button
          onClick={() => onNavigate('mcp')}
          className={`hover:text-slate-100 transition-colors ${currentView === 'mcp' ? 'text-white' : ''}`}
        >
          MCP API
        </button>
        <button
          onClick={() => onNavigate('landing')}
          className={`hover:text-slate-100 transition-colors flex items-center gap-1 ${currentView === 'landing' ? 'text-white' : ''}`}
        >
          Overview
          <ArrowUpRight className="w-3 h-3 opacity-60" />
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenSearch}
          className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-400 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-lg transition-colors whitespace-nowrap"
          aria-label="Universal Search"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span>Search</span>
          <kbd className="font-mono text-[10px] bg-slate-800 px-1 py-0.5 rounded text-slate-400">⌘K</kbd>
        </button>

        {activeTasksCount > 0 && (
          <button
            onClick={() => onNavigate('live-execution')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 rounded-lg hover:bg-cyan-900/50 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{activeTasksCount} Active</span>
          </button>
        )}

        <button
          onClick={onNewTask}
          className="px-3 py-1.5 text-xs font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>New Task</span>
        </button>

        <button
          onClick={() => onNavigate('settings')}
          className="w-8 h-8 rounded-lg overflow-hidden border border-slate-700/80 hover:border-slate-500 transition-colors shrink-0 ml-1"
          aria-label="User Profile Settings"
        >
          <img
            src="/src/assets/images/workspace_user_avatar_1791084677782.jpg"
            alt="Workspace user profile"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </button>
      </div>
    </header>
  );
};
