import React, { useState } from 'react';
import { OPERANT_MCP_TOOLS } from '../../data/mcpTools';
import { McpToolDefinition } from '../../types/mcp';
import { 
  Cpu, 
  Terminal, 
  Play, 
  Copy, 
  Check, 
  Sparkles, 
  Code, 
  Layers, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const McpArchitectureView: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<McpToolDefinition>(OPERANT_MCP_TOOLS[0]);
  const [testPayload, setTestPayload] = useState<string>(
    JSON.stringify(OPERANT_MCP_TOOLS[0].exampleCall, null, 2)
  );
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectTool = (tool: McpToolDefinition) => {
    setSelectedTool(tool);
    setTestPayload(JSON.stringify(tool.exampleCall, null, 2));
    setSimulatedResponse(null);
  };

  const handleExecuteSimulation = () => {
    setIsExecuting(true);
    setSimulatedResponse(null);
    setTimeout(() => {
      setIsExecuting(false);
      setSimulatedResponse(JSON.stringify(selectedTool.exampleResponse, null, 2));
    }, 600);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-[#0d1017] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Protocol Architecture</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-cyan-400">Model Context Protocol (MCP) Standard</span>
            <span aria-hidden="true">·</span>
            <span>ChatGPT & Claude Native</span>
          </div>

          <h1 className="text-lg sm:text-xl font-bold text-slate-100">
            MCP & ChatGPT Workforce Server
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Expose autonomous browser workers directly to AI agents, ChatGPT custom actions, or Anthropic MCP clients with guaranteed structured output and evidence provenance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg font-mono text-xs bg-slate-900 border border-slate-800 text-slate-300">
            Endpoint: <span className="text-cyan-400">mcp.operant.ai/v1/sse</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Tool Catalog (Left) + Interactive Runner & Response (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Tools List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold text-slate-300 pb-1">
            Registered MCP Tools ({OPERANT_MCP_TOOLS.length})
          </div>

          <div className="space-y-2">
            {OPERANT_MCP_TOOLS.map((tool) => {
              const isSelected = selectedTool.name === tool.name;
              return (
                <button
                  key={tool.name}
                  onClick={() => handleSelectTool(tool)}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/50 shadow-md shadow-cyan-950/20'
                      : 'bg-[#0e121a] border-slate-800/80 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-semibold text-slate-100">
                      {tool.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {tool.parameters.length} params
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {tool.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Tool Specification, Payload Tester & Schema */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold font-mono text-cyan-300">{selectedTool.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedTool.description}</p>
              </div>

              <button
                onClick={() => handleCopy(JSON.stringify(selectedTool, null, 2))}
                className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-md transition-colors flex items-center gap-1 self-start sm:self-auto"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Tool Schema'}</span>
              </button>
            </div>

            {/* Parameters Matrix */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300">Tool Parameters</span>
              <div className="border border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead className="bg-[#121622] text-slate-400 text-[11px]">
                    <tr>
                      <th className="p-2.5">Name</th>
                      <th className="p-2.5">Type</th>
                      <th className="p-2.5">Required</th>
                      <th className="p-2.5">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
                    {selectedTool.parameters.map((p) => (
                      <tr key={p.name}>
                        <td className="p-2.5 text-cyan-300 font-semibold">{p.name}</td>
                        <td className="p-2.5 text-slate-400">{p.type}</td>
                        <td className="p-2.5 text-slate-400">{p.required ? 'Yes' : 'No'}</td>
                        <td className="p-2.5 font-sans text-slate-300">{p.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive Call Tester */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Interactive Call Simulator</span>
                </span>
                <button
                  onClick={handleExecuteSimulation}
                  disabled={isExecuting}
                  className="px-3.5 py-1.5 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isExecuting ? 'Calling Worker...' : 'Execute Tool Call'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] font-mono text-slate-400 mb-1">INPUT JSON ARGUMENTS:</div>
                  <textarea
                    rows={8}
                    value={testPayload}
                    onChange={(e) => setTestPayload(e.target.value)}
                    className="w-full bg-[#080a0f] border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-200 outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <div className="text-[10px] font-mono text-slate-400 mb-1">MCP STRUCTURED RESPONSE:</div>
                  <div className="w-full h-[184px] bg-[#080a0f] border border-slate-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-y-auto whitespace-pre">
                    {simulatedResponse || (
                      <span className="text-slate-600">
                        // Click "Execute Tool Call" to trigger worker execution and receive structured result.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
