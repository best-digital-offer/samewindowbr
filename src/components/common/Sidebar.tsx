import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  FileCheck, 
  PlaySquare, 
  Layers, 
  History, 
  FileText, 
  Fingerprint, 
  Cpu, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isCollapsed,
  onToggleCollapse
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'research', label: 'Web Research', icon: Compass },
    { id: 'testing', label: 'AI QA Testing', icon: FileCheck },
    { id: 'automate', label: 'Browser Tasks', icon: PlaySquare },
    { id: 'workflows', label: 'Workflows & Diffs', icon: Layers },
    { id: 'runs', label: 'Execution Runs', icon: History },
    { id: 'reports', label: 'Reports & Exports', icon: FileText },
    { id: 'profiles', label: 'Browser Profiles', icon: Fingerprint },
    { id: 'mcp', label: 'MCP & ChatGPT API', icon: Cpu },
    { id: 'blog', label: 'Technical Docs', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`hidden lg:flex flex-col border-r border-slate-800/80 bg-[#090b0e] transition-all duration-200 shrink-0 z-20 ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Workspace Banner */}
      <div className={`p-4 border-b border-slate-800/60 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <div>
            <div className="text-xs font-semibold text-slate-200">Main Engineering</div>
            <div className="text-[11px] text-slate-400 font-mono">Workspace: prod-east</div>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-slate-800/80 text-cyan-300 font-semibold border border-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              } ${isCollapsed ? 'justify-center px-2' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </div>

      {/* Profile & Security status footer */}
      <div className="p-3 border-t border-slate-800/60 text-xs">
        {!isCollapsed ? (
          <div className="bg-[#10141e] p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 text-[11px] text-slate-300 font-medium mb-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Session Isolation Active</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Zero plaintext credential leakage. Read/Write boundary enforced.
            </p>
          </div>
        ) : (
          <div className="flex justify-center" title="Session Isolation Active">
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
        )}
      </div>
    </aside>
  );
};
