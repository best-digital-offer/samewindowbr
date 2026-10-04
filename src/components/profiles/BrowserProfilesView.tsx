import React, { useState } from 'react';
import { BrowserProfile } from '../../types/browser';
import { 
  Fingerprint, 
  ShieldCheck, 
  Lock, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  Globe, 
  HardDrive, 
  Cookie,
  AlertCircle
} from 'lucide-react';

interface BrowserProfilesViewProps {
  profiles: BrowserProfile[];
  onAddProfile: (profile: Partial<BrowserProfile>) => void;
}

export const BrowserProfilesView: React.FC<BrowserProfilesViewProps> = ({ profiles, onAddProfile }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileType, setNewProfileType] = useState<BrowserProfile['type']>('research');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;

    onAddProfile({
      name: newProfileName.trim(),
      type: newProfileType,
      description: 'Custom user-provisioned browser context profile.',
      cookiesCount: 0,
      localStorageKeys: 0,
      status: 'connected',
      lastUsed: Date.now(),
      isIsolated: true,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/134.0.0.0 Safari/537.36',
      proxyLocation: 'US-East (Direct)'
    });

    setNewProfileName('');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-[#0d1017] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Identity & Isolation</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-cyan-400">{profiles.length} Profiles Configured</span>
            <span aria-hidden="true">·</span>
            <span>Zero Credential Leakage Enclave</span>
          </div>

          <h1 className="text-lg sm:text-xl font-bold text-slate-100">
            Persistent Browser Profiles
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Maintain isolated session states, cookies, and local storage without exposing sensitive credentials. Workers execute inside secure sandbox contexts.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-3.5 py-2 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs shrink-0 self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Browser Profile</span>
        </button>
      </div>

      {/* Security Principles Banner */}
      <div className="bg-[#10141e] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs">
        <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
          <Lock className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-slate-200">Autonomous Security & Redaction Standard</h4>
          <p className="text-slate-400 leading-relaxed">
            Operant automatically redacts passwords, session tokens, bearer authorization headers, and payment fields from all captured execution logs, network recordings, and evidence screenshots. Read and write privileges are strictly segregated.
          </p>
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <div 
            key={profile.id}
            className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 space-y-4 hover:border-slate-700 transition-colors shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-cyan-400">
                  <Fingerprint className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-100">{profile.name}</h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{profile.type} environment</span>
                </div>
              </div>

              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {profile.status}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed min-h-10">
              {profile.description}
            </p>

            {/* Profile Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60 text-[11px] font-mono">
              <div className="bg-[#121622] p-2 rounded border border-slate-800 flex items-center gap-2">
                <Cookie className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-300">{profile.cookiesCount} Cookies</span>
              </div>
              <div className="bg-[#121622] p-2 rounded border border-slate-800 flex items-center gap-2">
                <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-300">{profile.localStorageKeys} Storage Keys</span>
              </div>
            </div>

            <div className="space-y-1 text-[11px] text-slate-400 font-mono pt-1">
              <div className="truncate">Proxy: <span className="text-slate-300">{profile.proxyLocation || 'Direct'}</span></div>
              <div>Last Active: <span className="text-slate-300">{new Date(profile.lastUsed).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form 
            onSubmit={handleCreate}
            className="w-full max-w-md bg-[#0d1017] border border-slate-800 rounded-xl p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100">Create Persistent Browser Profile</h3>
              <button 
                type="button" 
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Profile Name</label>
                <input
                  type="text"
                  required
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  placeholder="e.g. B2B Research Crawler"
                  className="w-full bg-[#121622] border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Isolation Type</label>
                <select
                  value={newProfileType}
                  onChange={(e) => setNewProfileType(e.target.value as any)}
                  className="w-full bg-[#121622] border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
                >
                  <option value="research">Research (Anti-detection)</option>
                  <option value="testing">Testing (Clean Slate Sandbox)</option>
                  <option value="work">Work (Enterprise SSO Cookie Store)</option>
                  <option value="isolated">Isolated (Strict Disposable)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
              >
                Create Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
