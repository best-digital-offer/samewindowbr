import React, { useState } from 'react';
import { 
  Compass, 
  FileCheck, 
  PlaySquare, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Terminal, 
  Search, 
  Eye, 
  TrendingUp, 
  Download, 
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface LandingPageProps {
  onEnterWorkspace: () => void;
  onSelectUseCase: (prompt: string, mode: 'research' | 'testing' | 'automation') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterWorkspace, onSelectUseCase }) => {
  const [heroTab, setHeroTab] = useState<'execution' | 'matrix'>('execution');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Operant differ from standard AI chatbots or browser extension recorders?',
      a: 'Chatbots have no web execution runtime and hallucinate past facts. Traditional browser extension recorders break as soon as a CSS selector or DOM layout shifts. Operant deploys independent Chromium workers that reason about user goals, navigate dynamic JavaScript applications, inspect DOM nodes, and corroborate every extracted fact with screenshot and URL evidence.'
    },
    {
      q: 'How do parallel browser workers operate under the hood?',
      a: 'When you ask for 20 competitors, Operant decomposes the goal into independent entity queues. Worker 1 takes candidates 1-5, Worker 2 takes 6-10, and so forth. Each worker runs in an isolated headless browser context with separate proxy channels, streaming real-time events back to an aggregator that normalizes, deduplicates, and validates the findings.'
    },
    {
      q: 'What happens when a website blocks automation or enforces CAPTCHA?',
      a: 'Operant enforces absolute transparency. If a website presents a Cloudflare Turnstile challenge, login wall, or WAF block that cannot be resolved safely, the worker flags the source as blocked with exact HTTP details. It never invents false data or marks blocked steps as successful. Partial results are always preserved.'
    },
    {
      q: 'Can Operant be triggered from ChatGPT or custom agent frameworks?',
      a: 'Yes. Operant exposes standard Model Context Protocol (MCP) endpoints for tools like research_web, test_website, and run_workflow. ChatGPT Custom Actions, Claude Desktop, and CLI scripts can invoke workers and receive guaranteed structured JSON responses.'
    },
    {
      q: 'How are sensitive corporate credentials protected in persistent sessions?',
      a: 'Credentials and session cookies are sealed inside encrypted browser context enclaves. Operant applies automated real-time redaction to remove authentication tokens, passwords, and private parameters from all logs, timelines, and captured screenshots.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#08090c] text-slate-200">
      {/* 1. HERO SECTION */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Next-Generation AI Browser Worker
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100 text-balance leading-tight">
            Give it a web task.<br />
            Get the finished result.
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Research the web, test your product, and automate browser workflows with intelligent workers that browse, verify, and return evidence.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={onEnterWorkspace}
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-md flex items-center gap-2"
            >
              <span>Launch Worker Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('how-it-works');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
            >
              See How It Works
            </button>
          </div>
        </div>

        {/* Hero Interactive Execution / Research Table Showcase */}
        <div className="bg-[#0d1017] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
          {/* Top Bar */}
          <div className="bg-[#121622] px-4 py-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-mono text-cyan-400 font-semibold">TASK:</span>
              <span className="text-slate-200 font-medium">Find 20 AI SaaS competitors and compare pricing</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 p-0.5 bg-[#080a0f] rounded border border-slate-800 text-[11px]">
                <button
                  onClick={() => setHeroTab('execution')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    heroTab === 'execution' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'
                  }`}
                >
                  Live Execution (4 Workers)
                </button>
                <button
                  onClick={() => setHeroTab('matrix')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    heroTab === 'matrix' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'
                  }`}
                >
                  Verified Comparison Matrix
                </button>
              </div>
            </div>
          </div>

          {/* Hero Content View */}
          {heroTab === 'execution' ? (
            <div className="p-6 space-y-5 bg-[#0b0e14]">
              {/* Concurrency Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="bg-[#121622] p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">CANDIDATE SOURCES</div>
                  <div className="text-sm font-bold text-slate-100">20 Targets Discovered</div>
                </div>
                <div className="bg-[#121622] p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">SOURCES VERIFIED</div>
                  <div className="text-sm font-bold text-emerald-400">14 / 20 Complete</div>
                </div>
                <div className="bg-[#121622] p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">PARALLEL WORKERS</div>
                  <div className="text-sm font-bold text-cyan-400">4 Active Chromium</div>
                </div>
                <div className="bg-[#121622] p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">WAF / BOT BLOCKED</div>
                  <div className="text-sm font-bold text-amber-400">1 Blocked (Reported)</div>
                </div>
              </div>

              {/* Viewport & Live Stream Split */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-7 rounded-lg overflow-hidden border border-slate-800 aspect-video relative bg-black">
                  <img
                    src="/src/assets/images/browser_viewport_audit_1791084657841.jpg"
                    alt="Autonomous Browser Viewport"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[10px] font-mono text-cyan-400 rounded border border-cyan-500/30">
                    Worker 2: Inspecting #pricing-table at cognitiveflow.io
                  </div>
                </div>

                <div className="md:col-span-5 bg-[#090b10] border border-slate-800 rounded-lg p-3 space-y-2 font-mono text-[11px] overflow-hidden">
                  <div className="text-slate-400 text-[10px] pb-1 border-b border-slate-800">
                    PARALLEL EVENT LOG:
                  </div>
                  <div className="text-cyan-300">
                    &gt; [Worker 1] Extracted: Starter $29/mo (DOM: .price-card)
                  </div>
                  <div className="text-cyan-300">
                    &gt; [Worker 2] Verified: Synthetix Cloud $49/mo
                  </div>
                  <div className="text-amber-400">
                    &gt; [Worker 3] Target hyperscrape.dev blocked by Cloudflare (Handled)
                  </div>
                  <div className="text-emerald-400">
                    &gt; [Verifier] Deduplicated 20 candidates. Merging matrix...
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-[#0b0e14] overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-mono">
                    <th className="p-2.5">Competitor</th>
                    <th className="p-2.5">Pricing</th>
                    <th className="p-2.5">Annual</th>
                    <th className="p-2.5">Free Tier</th>
                    <th className="p-2.5">Confidence</th>
                    <th className="p-2.5">Evidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-100">CognitiveFlow AI</td>
                    <td className="p-2.5 font-mono">$29/seat/mo</td>
                    <td className="p-2.5 font-mono text-slate-400">$24/seat/mo</td>
                    <td className="p-2.5 text-emerald-400">Yes</td>
                    <td className="p-2.5 text-emerald-400">Verified</td>
                    <td className="p-2.5 text-cyan-400 font-mono text-[10px]">DOM #pricing-table</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-100">Synthetix Cloud</td>
                    <td className="p-2.5 font-mono">$49/mo</td>
                    <td className="p-2.5 font-mono text-slate-400">$39/mo</td>
                    <td className="p-2.5 text-slate-400">Free Trial</td>
                    <td className="p-2.5 text-emerald-400">Verified</td>
                    <td className="p-2.5 text-cyan-400 font-mono text-[10px]">DOM .plans-container</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-100">BrowsePulse Engine</td>
                    <td className="p-2.5 font-mono">$19/mo</td>
                    <td className="p-2.5 font-mono text-slate-400">$15/mo</td>
                    <td className="p-2.5 text-emerald-400">Yes</td>
                    <td className="p-2.5 text-emerald-400">Verified</td>
                    <td className="p-2.5 text-cyan-400 font-mono text-[10px]">DOM span.price</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* 2. ONE BROWSER WORKER. MANY JOBS */}
      <section className="py-20 border-t border-slate-800/80 bg-[#0a0d14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              One browser worker. Many jobs.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Operant replaces brittle RPA scripts, unreliable scrapers, and hallucinated search summaries with an autonomous web workforce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 w-fit">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">RESEARCH</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Find information across the web. Discover candidate companies, read pricing matrices, check features, and build structured comparison tables.
              </p>
            </div>

            <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">TEST</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Test websites and find problems. Autonomous exploratory QA tests form validation, authentication, 390px mobile viewports, and console errors.
              </p>
            </div>

            <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 w-fit">
                <PlaySquare className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">AUTOMATE</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Let an AI worker complete complex multi-step browser tasks. Handles navigation, typing, file downloads, retries, and bounded recovery.
              </p>
            </div>

            <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 w-fit">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">WORKFLOWS</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Save browser tasks and run them on a schedule. Features delta change detection: see exactly what changed from last week's run.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PARALLEL WORKERS & EVIDENCE */}
      <section className="py-20 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
                CONCURRENCY ARCHITECTURE
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 leading-tight">
                Parallel browser workers that divide and conquer
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Traditional bots navigate sequentially, stalling for minutes. Operant shards requests across 4 to 8 concurrent Chromium workers, navigates in parallel, and merges findings into an immutable evidence ledger.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Sub-second task startup and parallel DOM dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Resilient against anti-bot challenges with graceful partial reporting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Bounded retry logic that never hangs or loops endlessly</span>
                </div>
              </div>
            </div>

            {/* Visual Concurrency Card */}
            <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 space-y-3 font-mono text-xs shadow-xl">
              <div className="text-slate-400 pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>CONCURRENT WORKER POOL</span>
                <span className="text-cyan-400">4 Active Nodes</span>
              </div>
              <div className="space-y-2">
                <div className="bg-[#121622] p-2.5 rounded border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-200">Worker 1 &rarr; Competitors 1-5</span>
                  <span className="text-emerald-400">Done (5/5)</span>
                </div>
                <div className="bg-[#121622] p-2.5 rounded border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-200">Worker 2 &rarr; Competitors 6-10</span>
                  <span className="text-cyan-400">Extracting (4/5)</span>
                </div>
                <div className="bg-[#121622] p-2.5 rounded border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-200">Worker 3 &rarr; Competitors 11-15</span>
                  <span className="text-amber-400">1 Blocked / 4 Done</span>
                </div>
                <div className="bg-[#121622] p-2.5 rounded border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-200">Worker 4 &rarr; Competitors 16-20</span>
                  <span className="text-cyan-400">Verifying (5/5)</span>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 text-center">
                Merge &rarr; Normalize &rarr; Deduplicate &rarr; Verify &rarr; Generate Report
              </div>
            </div>
          </div>

          {/* Evidence Guarantee */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 space-y-3 shadow-xl order-2 lg:order-1">
              <div className="text-xs font-semibold text-slate-200 flex items-center justify-between border-b border-slate-800 pb-2">
                <span>Verified Source Evidence</span>
                <span className="text-emerald-400 font-mono text-[11px]">HTTP 200 · Verified</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">EXTRACTED VALUE:</span>
                  <div className="p-2 rounded bg-black/60 font-mono text-cyan-300 border border-slate-800">
                    $29/month (Starter Tier with 500k tokens)
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">DOM ANCHOR:</span>
                  <div className="text-slate-300 font-mono text-[11px]">
                    #pricing-table .card-starter .price-value
                  </div>
                </div>
                <div className="rounded overflow-hidden border border-slate-800 aspect-video">
                  <img
                    src="/src/assets/images/browser_viewport_audit_1791084657841.jpg"
                    alt="Evidence Viewport Snapshot"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 order-1 lg:order-2">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
                ZERO HALLUCINATIONS
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 leading-tight">
                Every factual claim has inspectable evidence
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Operant never invents pricing or product specifications. If a competitor hides rates behind a demo request form, it reports "Not publicly available". If two pages disagree, it notes "Conflicting sources". Every result is clickable with full DOM provenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISUAL REGRESSION & AI QA */}
      <section className="py-20 border-t border-slate-800/80 bg-[#0a0d14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
              ENGINEERING QUALITY ASSURANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Autonomous AI QA that explores like an engineer
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Give it a signup or checkout URL. Operant tests validation boundaries, unhandled exceptions, z-index occlusions, and mobile layout shifts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold">PREVIOUS BUILD (v2.4.0)</span>
                <span className="text-emerald-400">PASSED</span>
              </div>
              <div className="rounded-lg overflow-hidden border border-slate-800 aspect-video">
                <img
                  src="/src/assets/images/browser_viewport_audit_1791084657841.jpg"
                  alt="Baseline screenshot"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-slate-400">
                Signup button responsive; error messages properly padded.
              </p>
            </div>

            <div className="bg-[#0e121a] border border-rose-500/40 rounded-xl p-5 space-y-3 shadow-lg shadow-rose-950/20">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-200 font-bold">CANDIDATE BUILD (v2.4.1)</span>
                <span className="text-rose-400 font-bold">NEW REGRESSION DETECTED</span>
              </div>
              <div className="rounded-lg overflow-hidden border border-rose-500/50 aspect-video">
                <img
                  src="/src/assets/images/qa_regression_diff_1791084668202.jpg"
                  alt="Regression screenshot"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-rose-300">
                Submit button vertical padding clipped; button remains disabled on keystroke without blur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section className="py-20 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Transparent, capacity-based pricing
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Pay for parallel browser worker capacity and execution minutes. No hidden seats or inflated tokens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Free */}
            <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs text-slate-400">For evaluation</div>
                <h3 className="text-lg font-bold text-slate-100">Free Tier</h3>
                <div className="text-2xl font-bold text-slate-100 font-mono">$0</div>
                <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <div>· 60 browser minutes/mo</div>
                  <div>· 1 parallel worker</div>
                  <div>· 5 research tasks</div>
                  <div>· CSV & JSON export</div>
                </div>
              </div>
              <button
                onClick={onEnterWorkspace}
                className="w-full py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Developer */}
            <div className="bg-[#0e121a] border border-cyan-500/50 rounded-xl p-5 flex flex-col justify-between space-y-6 relative shadow-lg shadow-cyan-950/20">
              <div className="space-y-3">
                <div className="text-xs text-cyan-400 font-semibold">Recommended for builders</div>
                <h3 className="text-lg font-bold text-slate-100">Developer</h3>
                <div className="text-2xl font-bold text-slate-100 font-mono">$39<span className="text-xs text-slate-400">/mo</span></div>
                <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div>· 1,200 browser minutes/mo</div>
                  <div>· 4 parallel workers</div>
                  <div>· Unlimited research & QA tasks</div>
                  <div>· MCP server access & API keys</div>
                  <div>· Weekly scheduled workflows</div>
                </div>
              </div>
              <button
                onClick={onEnterWorkspace}
                className="w-full py-2 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
              >
                Start Developer Trial
              </button>
            </div>

            {/* Pro */}
            <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs text-slate-400">For scaling operations</div>
                <h3 className="text-lg font-bold text-slate-100">Pro</h3>
                <div className="text-2xl font-bold text-slate-100 font-mono">$89<span className="text-xs text-slate-400">/mo</span></div>
                <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <div>· 4,000 browser minutes/mo</div>
                  <div>· 8 parallel workers</div>
                  <div>· Change detection engine</div>
                  <div>· Visual regression testing</div>
                  <div>· Hourly workflow crons</div>
                </div>
              </div>
              <button
                onClick={onEnterWorkspace}
                className="w-full py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Upgrade to Pro
              </button>
            </div>

            {/* Team */}
            <div className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs text-slate-400">For engineering teams</div>
                <h3 className="text-lg font-bold text-slate-100">Team / Custom</h3>
                <div className="text-2xl font-bold text-slate-100 font-mono">$199<span className="text-xs text-slate-400">/mo</span></div>
                <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <div>· 15,000+ browser minutes</div>
                  <div>· Dedicated residential proxies</div>
                  <div>· Custom browser profiles enclave</div>
                  <div>· Multi-member workspace RBAC</div>
                  <div>· Priority WAF bypass lanes</div>
                </div>
              </div>
              <button
                onClick={onEnterWorkspace}
                className="w-full py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Contact Team Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRANSPARENCY & WEB AUTOMATION LIMITATIONS */}
      <section className="py-16 border-t border-slate-800/80 bg-[#0a0d14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs font-mono">
            <AlertTriangle className="w-4 h-4" />
            <span>AUTHENTICITY GUARANTEE & LIMITATIONS POLICY</span>
          </div>
          <h3 className="text-lg font-bold text-slate-100">
            Real websites fail in predictable ways. We report reality.
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Websites periodically change selectors, block scrapers with CAPTCHAs, hide pricing behind sales forms, or time out. Rather than silently fabricating false data or pretending 100% success, Operant flags blocked targets, records HTTP codes, distinguishes partial results from complete results, and preserves every verified artifact.
          </p>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-20 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-100">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400">Technical details on how Operant executes web work.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-[#0e121a] border border-slate-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full text-left p-4 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200 hover:text-white"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-20 border-t border-slate-800/80 bg-[#0a0d14] text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
            Ready to give web tasks to intelligent browser workers?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Start free without credit card. Run parallel research, exploratory QA, and automated regression workflows in seconds.
          </p>
          <button
            onClick={onEnterWorkspace}
            className="px-6 py-3 text-xs sm:text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors inline-flex items-center gap-2 shadow-md"
          >
            <span>Launch Workforce Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
