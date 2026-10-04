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
  X,
  BookOpen
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentView,
  onNavigate
}) => {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-xs flex" onClick={onClose}>
      <div 
        className="w-72 bg-[#090b0e] border-r border-slate-800 h-full p-4 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span className="text-sm font-bold text-white">Operant AI</span>
            </div>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-md">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-cyan-300 font-semibold border border-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
          <div className="text-[11px] text-slate-400 mb-1">Operant Autonomous Engine</div>
          <div className="text-[10px] text-slate-400 font-mono">v2.8.4-prod · Chromium 134</div>
        </div>
      </div>
    </div>
  );
};
