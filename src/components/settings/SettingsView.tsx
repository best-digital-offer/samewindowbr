import React, { useState } from 'react';
import { 
  Key, 
  Shield, 
  User, 
  Sliders, 
  Bell, 
  Cpu, 
  Trash2, 
  Copy, 
  Check, 
  Plus, 
  Clock, 
  AlertTriangle,
  HardDrive
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'keys' | 'security' | 'usage' | 'notifications'>('keys');

  // API Keys state
  const [apiKeys, setApiKeys] = useState([
    {
      id: 'key-1',
      name: 'Production MCP Integration',
      prefix: 'op_live_8f9c...',
      created: 'Sept 24, 2026',
      lastUsed: '14 minutes ago',
      status: 'active'
    },
    {
      id: 'key-2',
      name: 'Local Dev CLI Worker',
      prefix: 'op_test_3b2a...',
      created: 'Oct 01, 2026',
      lastUsed: '2 hours ago',
      status: 'active'
    }
  ]);

  const [newKeyName, setNewKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const rawSecret = `op_live_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
    const newEntry = {
      id: `key-${Date.now()}`,
      name: newKeyName.trim(),
      prefix: `${rawSecret.substring(0, 11)}...`,
      created: 'Just now',
      lastUsed: 'Never',
      status: 'active'
    };

    setApiKeys([newEntry, ...apiKeys]);
    setGeneratedKey(rawSecret);
    setNewKeyName('');
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-[#0d1017] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Workspace Controls</span>
            <span aria-hidden="true">·</span>
            <span>Security & API Configuration</span>
          </div>

          <h1 className="text-lg sm:text-xl font-bold text-slate-100">
            Settings & Access Control
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Manage developer API tokens, security isolation parameters, usage quotas, and event dispatch webhooks.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#0d1017] border border-slate-800 rounded-lg text-xs w-fit">
        <button
          onClick={() => setActiveTab('keys')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
            activeTab === 'keys' ? 'bg-slate-800 text-cyan-300 shadow-xs' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>API Keys</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
            activeTab === 'security' ? 'bg-slate-800 text-cyan-300 shadow-xs' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Security & Redaction</span>
        </button>

        <button
          onClick={() => setActiveTab('usage')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
            activeTab === 'usage' ? 'bg-slate-800 text-cyan-300 shadow-xs' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Usage Quotas</span>
        </button>
      </div>

      {/* Tab: API Keys */}
      {activeTab === 'keys' && (
        <div className="space-y-4">
          {/* Create Key Box */}
          <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Create New Access Token
            </h3>

            <form onSubmit={handleCreateKey} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Token name (e.g. GitHub Action CI Worker)"
                className="flex-1 bg-[#121622] border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={!newKeyName.trim()}
                className="px-4 py-2 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 justify-center"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Generate Secret Key</span>
              </button>
            </form>

            {/* Secret Reveal Banner (Shown only once) */}
            {generatedKey && (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-lg p-4 space-y-2 text-xs animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Key Generated. Store this secret immediately; it will not be displayed again.
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedKey);
                      setCopiedKey(true);
                      setTimeout(() => setCopiedKey(false), 2000);
                    }}
                    className="px-2.5 py-1 text-xs font-medium text-emerald-300 hover:text-white bg-emerald-900/60 rounded flex items-center gap-1"
                  >
                    {copiedKey ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
                  </button>
                </div>
                <code className="block font-mono text-xs text-emerald-200 bg-black/60 p-2.5 rounded border border-emerald-500/20 select-all break-all">
                  {generatedKey}
                </code>
              </div>
            )}
          </div>

          {/* Active Keys Table */}
          <div className="bg-[#0e121a] border border-slate-800 rounded-xl overflow-hidden shadow-md">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#121622] text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Key Token</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4">Last Used</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {apiKeys.map((k) => (
                  <tr key={k.id} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-semibold text-slate-200">{k.name}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{k.prefix}</td>
                    <td className="py-3 px-4 text-slate-400">{k.created}</td>
                    <td className="py-3 px-4 text-slate-400 font-mono">{k.lastUsed}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleRevokeKey(k.id)}
                        className="px-2.5 py-1 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded transition-colors"
                      >
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Security & Redaction */}
      {activeTab === 'security' && (
        <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-6 space-y-6 text-xs text-slate-300">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-100">Confidentiality & Web Automation Safeguards</h3>
            <p className="text-slate-400">
              Operant enforces strict isolation boundaries to safeguard sensitive sessions and user identity.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-[#121622] p-4 rounded-lg border border-slate-800 space-y-2">
              <span className="font-semibold text-slate-200 block">Automatic Log & Screenshot Redaction</span>
              <p className="text-slate-400 leading-relaxed">
                Any string resembling passwords, bearer authentication headers, credit card sequences, or JWTs is scrubbed before streaming to the timeline or persistent storage.
              </p>
            </div>

            <div className="bg-[#121622] p-4 rounded-lg border border-slate-800 space-y-2">
              <span className="font-semibold text-slate-200 block">Read / Write Side-Effect Gates</span>
              <p className="text-slate-400 leading-relaxed">
                By default, browser workers operate in READ-ONLY mode. Destructive actions (e.g. form submissions that change database state, checkout actions, or email transmissions) require an explicit task permission parameter.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Usage Quotas */}
      {activeTab === 'usage' && (
        <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-6 space-y-6 text-xs">
          <h3 className="text-sm font-bold text-slate-100">Workspace Operational Dimensions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            <div className="bg-[#121622] p-4 rounded-lg border border-slate-800 space-y-1">
              <div className="text-slate-400 text-[11px]">BROWSER MINUTES</div>
              <div className="text-lg font-bold text-cyan-400">42.8 / 3,000</div>
              <div className="text-[10px] text-slate-500">Resets in 27 days</div>
            </div>
            <div className="bg-[#121622] p-4 rounded-lg border border-slate-800 space-y-1">
              <div className="text-slate-400 text-[11px]">PARALLEL WORKERS</div>
              <div className="text-lg font-bold text-slate-200">Up to 8 concurrent</div>
              <div className="text-[10px] text-slate-500">Developer tier limit</div>
            </div>
            <div className="bg-[#121622] p-4 rounded-lg border border-slate-800 space-y-1">
              <div className="text-slate-400 text-[11px]">RESEARCH JOBS</div>
              <div className="text-lg font-bold text-slate-200">18 completed</div>
              <div className="text-[10px] text-slate-500">100% verified sources</div>
            </div>
            <div className="bg-[#121622] p-4 rounded-lg border border-slate-800 space-y-1">
              <div className="text-slate-400 text-[11px]">SCHEDULED RUNS</div>
              <div className="text-lg font-bold text-emerald-400">50 runs nominal</div>
              <div className="text-[10px] text-slate-500">Zero dropped crons</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
