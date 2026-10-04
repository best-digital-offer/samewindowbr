import React, { useState } from 'react';
import { BrowserTask, TaskConfig } from './types/task';
import { ResearchDataset, ResearchEvidence } from './types/research';
import { QATestReport } from './types/testing';
import { ReusableWorkflow } from './types/workflow';
import { BrowserProfile } from './types/browser';

import { DEMO_RESEARCH_DATASET, DEMO_QA_REPORT, DEMO_WORKFLOWS, DEMO_BROWSER_PROFILES } from './data/demoData';
import { startBrowserTask, cancelTask } from './services/browserWorkerEngine';

import { TopNav } from './components/common/TopNav';
import { Sidebar } from './components/common/Sidebar';
import { MobileDrawer } from './components/common/MobileDrawer';
import { EvidenceDrawer } from './components/common/EvidenceDrawer';
import { ConfirmationModal } from './components/common/ConfirmationModal';
import { SearchModal } from './components/common/SearchModal';

import { DashboardHome } from './components/dashboard/DashboardHome';
import { LiveExecutionWorkspace } from './components/execution/LiveExecutionWorkspace';
import { ResearchWorkspace } from './components/research/ResearchWorkspace';
import { TestingWorkspace } from './components/testing/TestingWorkspace';
import { WorkflowsWorkspace } from './components/workflows/WorkflowsWorkspace';
import { BrowserProfilesView } from './components/profiles/BrowserProfilesView';
import { McpArchitectureView } from './components/mcp/McpArchitectureView';
import { ReportsView } from './components/reports/ReportsView';
import { SettingsView } from './components/settings/SettingsView';
import { BlogView } from './components/marketing/BlogView';
import { LandingPage } from './components/marketing/LandingPage';

export default function App() {
  // Navigation & View state
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [evidenceDrawerOpen, setEvidenceDrawerOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<ResearchEvidence | null>(null);

  const [confirmModalState, setConfirmModalState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    isDestructive?: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  // Task & Data states
  const [activeTasks, setActiveTasks] = useState<BrowserTask[]>([]);
  const [recentTasks, setRecentTasks] = useState<BrowserTask[]>([]);
  const [currentExecutionTask, setCurrentExecutionTask] = useState<BrowserTask | null>(null);

  // Research datasets & QA reports
  const [researchDatasets, setResearchDatasets] = useState<ResearchDataset[]>([DEMO_RESEARCH_DATASET]);
  const [activeResearch, setActiveResearch] = useState<ResearchDataset>(DEMO_RESEARCH_DATASET);
  const [isViewingDemoResearch, setIsViewingDemoResearch] = useState(true);

  const [qaReports, setQaReports] = useState<QATestReport[]>([DEMO_QA_REPORT]);
  const [activeQA, setActiveQA] = useState<QATestReport>(DEMO_QA_REPORT);

  // Workflows & Browser Profiles
  const [workflows, setWorkflows] = useState<ReusableWorkflow[]>(DEMO_WORKFLOWS);
  const [browserProfiles, setBrowserProfiles] = useState<BrowserProfile[]>(DEMO_BROWSER_PROFILES);

  // Handle new task initiation from Command Box
  const handleStartTask = (prompt: string, config: TaskConfig) => {
    // If user prompt has side effect, we check config.safeModeOnly
    const taskId = startBrowserTask(prompt, config, (updatedTask, newDataset, newTestReport) => {
      // Update execution state
      setCurrentExecutionTask({ ...updatedTask });

      setActiveTasks((prev) => {
        const isFinished = updatedTask.status === 'completed' || updatedTask.status === 'cancelled' || updatedTask.status === 'failed' || updatedTask.status === 'partial';
        if (isFinished) {
          return prev.filter(t => t.id !== updatedTask.id);
        }
        const exists = prev.some(t => t.id === updatedTask.id);
        if (exists) {
          return prev.map(t => t.id === updatedTask.id ? { ...updatedTask } : t);
        }
        return [{ ...updatedTask }, ...prev];
      });

      if (updatedTask.status === 'completed' || updatedTask.status === 'partial') {
        setRecentTasks((prev) => [{ ...updatedTask }, ...prev.filter(t => t.id !== updatedTask.id)]);
      }

      if (newDataset && newDataset.items.length > 0) {
        setResearchDatasets((prev) => {
          const exists = prev.some(d => d.id === newDataset.id);
          if (exists) {
            return prev.map(d => d.id === newDataset.id ? { ...newDataset } : d);
          }
          return [{ ...newDataset }, ...prev];
        });
        setActiveResearch({ ...newDataset });
        setIsViewingDemoResearch(false);
      }

      if (newTestReport && (newTestReport.bugs.length > 0 || newTestReport.summary.passed > 0)) {
        setQaReports((prev) => {
          const exists = prev.some(r => r.id === newTestReport.id);
          if (exists) {
            return prev.map(r => r.id === newTestReport.id ? { ...newTestReport } : r);
          }
          return [{ ...newTestReport }, ...prev];
        });
        setActiveQA({ ...newTestReport });
      }
    });

    setCurrentView('live-execution');
  };

  // Handle stopping a running task
  const handleCancelTask = (taskId: string) => {
    setConfirmModalState({
      isOpen: true,
      title: 'Stop Browser Worker Task?',
      message: 'Active headless Chromium instances will be terminated. All partially gathered research records, DOM evidence, and logs will be safely preserved.',
      confirmLabel: 'Stop Workers',
      isDestructive: true,
      onConfirm: () => {
        cancelTask(taskId);
        setConfirmModalState(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // Handle running a workflow now
  const handleRunWorkflow = (workflowId: string) => {
    const wf = workflows.find(w => w.id === workflowId);
    if (!wf) return;

    handleStartTask(wf.instruction, {
      task: wf.instruction,
      mode: (wf.taskConfig.mode as any) || 'research',
      workers: wf.taskConfig.workers || 4,
      browserProfileId: 'prof-res',
      viewport: 'desktop',
      outputFormat: 'table',
      evidenceLevel: 'full',
      timeoutSeconds: 300,
      safeModeOnly: true
    });
  };

  // Inspect evidence drawer
  const handleInspectEvidence = (evidence: ResearchEvidence) => {
    setSelectedEvidence(evidence);
    setEvidenceDrawerOpen(true);
  };

  // Save QA as regression workflow
  const handleSaveAsRegressionWorkflow = (report: QATestReport) => {
    const newWorkflow: ReusableWorkflow = {
      id: `wf-qa-${Date.now()}`,
      title: `Regression Test: ${new URL(report.targetUrl).pathname || 'Signup'} Flow`,
      description: `Automated test suite maintaining zero-regression invariants for ${report.targetUrl}.`,
      instruction: report.objective,
      schedule: 'daily',
      status: 'active',
      taskConfig: {
        mode: 'testing',
        startingUrl: report.targetUrl,
        workers: 2,
        evidenceLevel: 'full',
        safeModeOnly: true
      },
      runsCount: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      runs: [
        {
          id: `run-${Date.now()}`,
          workflowId: `wf-qa-${Date.now()}`,
          startedAt: report.createdAt,
          completedAt: report.createdAt + report.durationSeconds * 1000,
          status: 'completed',
          itemsProcessed: report.summary.totalChecks,
          changesDetectedCount: report.bugs.length,
          changes: report.bugs.map((b) => ({
            id: `ch-${b.id}`,
            entityName: b.issue,
            sourceUrl: b.url,
            previousValue: 'Baseline: Check passed',
            currentValue: `Failed: ${b.actual}`,
            deltaSummary: `Regression identified: ${b.issue}`,
            detectedAt: Date.now(),
            evidenceSnippet: b.evidence.extractedSnippet
          }))
        }
      ]
    };

    setWorkflows([newWorkflow, ...workflows]);
    setCurrentView('workflows');
  };

  return (
    <div className="min-h-screen bg-[#08090c] text-slate-100 flex flex-col antialiased selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Universal Top Navigation Contract */}
      <TopNav
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNewTask={() => setCurrentView('dashboard')}
        onToggleMobileDrawer={() => setIsMobileDrawerOpen(true)}
        activeTasksCount={activeTasks.length}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      {/* Main Container Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar (hidden when on public landing page) */}
        {currentView !== 'landing' && (
          <Sidebar
            currentView={currentView}
            onNavigate={setCurrentView}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        )}

        {/* Primary Viewport Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {currentView === 'landing' && (
            <LandingPage
              onEnterWorkspace={() => setCurrentView('dashboard')}
              onSelectUseCase={(prompt, mode) => {
                handleStartTask(prompt, {
                  task: prompt,
                  mode,
                  workers: 4,
                  browserProfileId: 'prof-dev',
                  viewport: 'desktop',
                  outputFormat: 'table',
                  evidenceLevel: 'full',
                  timeoutSeconds: 300,
                  safeModeOnly: true
                });
              }}
            />
          )}

          {currentView === 'dashboard' && (
            <DashboardHome
              activeTasks={activeTasks}
              recentTasks={recentTasks}
              demoResearch={DEMO_RESEARCH_DATASET}
              demoQA={DEMO_QA_REPORT}
              workflows={workflows}
              onSubmitTask={handleStartTask}
              onSelectTask={(task) => {
                setCurrentExecutionTask(task);
                setCurrentView('live-execution');
              }}
              onCancelTask={handleCancelTask}
              onOpenResearch={(dataset, isDemo) => {
                setActiveResearch(dataset);
                setIsViewingDemoResearch(isDemo);
                setCurrentView('research');
              }}
              onOpenQA={(report) => {
                setActiveQA(report);
                setCurrentView('testing');
              }}
              onOpenWorkflows={() => setCurrentView('workflows')}
            />
          )}

          {currentView === 'live-execution' && (
            currentExecutionTask ? (
              <LiveExecutionWorkspace
                task={currentExecutionTask}
                dataset={activeResearch}
                testReport={activeQA}
                onCancelTask={handleCancelTask}
                onNavigate={setCurrentView}
              />
            ) : (
              <div className="text-center py-20 space-y-4">
                <div className="text-xs text-slate-400">No active browser worker running currently.</div>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="px-4 py-2 text-xs font-semibold text-black bg-cyan-400 rounded-lg hover:bg-cyan-300"
                >
                  Create New Web Task
                </button>
              </div>
            )
          )}

          {currentView === 'research' && (
            <ResearchWorkspace
              dataset={activeResearch}
              isDemo={isViewingDemoResearch}
              onInspectEvidence={handleInspectEvidence}
              onNewResearch={() => setCurrentView('dashboard')}
            />
          )}

          {currentView === 'testing' && (
            <TestingWorkspace
              report={activeQA}
              onInspectEvidence={handleInspectEvidence}
              onSaveAsRegressionWorkflow={handleSaveAsRegressionWorkflow}
              onNewTest={() => setCurrentView('dashboard')}
            />
          )}

          {currentView === 'automate' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-100">Browser Automation Tasks</h2>
                <p className="text-xs text-slate-400">
                  Assign open-ended web automation tasks to autonomous browser workers.
                </p>
              </div>
              <DashboardHome
                activeTasks={activeTasks}
                recentTasks={recentTasks}
                demoResearch={DEMO_RESEARCH_DATASET}
                demoQA={DEMO_QA_REPORT}
                workflows={workflows}
                onSubmitTask={handleStartTask}
                onSelectTask={(task) => {
                  setCurrentExecutionTask(task);
                  setCurrentView('live-execution');
                }}
                onCancelTask={handleCancelTask}
                onOpenResearch={(dataset, isDemo) => {
                  setActiveResearch(dataset);
                  setIsViewingDemoResearch(isDemo);
                  setCurrentView('research');
                }}
                onOpenQA={(report) => {
                  setActiveQA(report);
                  setCurrentView('testing');
                }}
                onOpenWorkflows={() => setCurrentView('workflows')}
              />
            </div>
          )}

          {currentView === 'workflows' && (
            <WorkflowsWorkspace
              workflows={workflows}
              onRunWorkflow={handleRunWorkflow}
              onNewWorkflow={() => setCurrentView('dashboard')}
              onToggleStatus={(id) => {
                setWorkflows(workflows.map(w => w.id === id ? { ...w, status: w.status === 'active' ? 'paused' : 'active' } : w));
              }}
            />
          )}

          {currentView === 'runs' && (
            <div className="max-w-5xl mx-auto space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-100">Execution Runs Ledger</h2>
                <p className="text-xs text-slate-400">Historical records of all parallel worker batches.</p>
              </div>
              <ReportsView
                researchDatasets={researchDatasets}
                qaReports={qaReports}
                onOpenResearch={(res) => {
                  setActiveResearch(res);
                  setIsViewingDemoResearch(false);
                  setCurrentView('research');
                }}
                onOpenQA={(qa) => {
                  setActiveQA(qa);
                  setCurrentView('testing');
                }}
              />
            </div>
          )}

          {currentView === 'reports' && (
            <ReportsView
              researchDatasets={researchDatasets}
              qaReports={qaReports}
              onOpenResearch={(res) => {
                setActiveResearch(res);
                setIsViewingDemoResearch(false);
                setCurrentView('research');
              }}
              onOpenQA={(qa) => {
                setActiveQA(qa);
                setCurrentView('testing');
              }}
            />
          )}

          {currentView === 'profiles' && (
            <BrowserProfilesView
              profiles={browserProfiles}
              onAddProfile={(newProfile) => {
                const p: BrowserProfile = {
                  id: `prof-${Date.now()}`,
                  name: newProfile.name || 'New Profile',
                  type: newProfile.type || 'research',
                  description: newProfile.description || 'Isolated browser environment',
                  cookiesCount: 0,
                  localStorageKeys: 0,
                  status: 'connected',
                  lastUsed: Date.now(),
                  isIsolated: true,
                  userAgent: newProfile.userAgent || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
                  proxyLocation: newProfile.proxyLocation || 'US-East'
                };
                setBrowserProfiles([p, ...browserProfiles]);
              }}
            />
          )}

          {currentView === 'mcp' && <McpArchitectureView />}

          {currentView === 'blog' && (
            <BlogView onBackToApp={() => setCurrentView('dashboard')} />
          )}

          {currentView === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Global Evidence Inspector Drawer */}
      <EvidenceDrawer
        evidence={selectedEvidence}
        isOpen={evidenceDrawerOpen}
        onClose={() => {
          setEvidenceDrawerOpen(false);
          setSelectedEvidence(null);
        }}
      />

      {/* Universal Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAction={(view) => setCurrentView(view)}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModalState.isOpen}
        title={confirmModalState.title}
        message={confirmModalState.message}
        confirmLabel={confirmModalState.confirmLabel}
        isDestructive={confirmModalState.isDestructive}
        onConfirm={confirmModalState.onConfirm}
        onCancel={() => setConfirmModalState(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
