export type TaskMode = 'research' | 'testing' | 'automation' | 'workflow';

export type TaskStatus = 
  | 'queued' 
  | 'planning' 
  | 'running' 
  | 'verifying' 
  | 'completed' 
  | 'partial' 
  | 'failed' 
  | 'cancelled';

export type ResultType = 'real' | 'demo' | 'partial' | 'failed';

export type WorkerState = 
  | 'idle' 
  | 'starting' 
  | 'running' 
  | 'waiting' 
  | 'blocked' 
  | 'completed' 
  | 'failed';

export interface TaskConfig {
  task: string;
  startingUrl?: string;
  mode: TaskMode;
  workers: number;
  browserProfileId: string;
  viewport: 'desktop' | 'tablet' | 'mobile';
  outputFormat: 'table' | 'json' | 'csv' | 'markdown';
  evidenceLevel: 'full' | 'standard' | 'minimal';
  timeoutSeconds: number;
  authorizedDomains?: string[];
  safeModeOnly: boolean;
}

export interface WorkerInstance {
  id: string;
  name: string;
  state: WorkerState;
  currentAction: string;
  currentUrl?: string;
  itemsProcessed: number;
  itemsAssigned: number;
  activeSince: number;
  error?: string;
}

export interface TaskExecutionEvent {
  id: string;
  timestamp: number;
  workerId: string;
  workerName: string;
  action: string;
  url?: string;
  durationMs: number;
  status: 'info' | 'success' | 'warning' | 'error';
  screenshotUrl?: string;
  domSelector?: string;
  extractedSnippet?: string;
  evidenceNotes?: string;
}

export interface BrowserTask {
  id: string;
  title: string;
  prompt: string;
  mode: TaskMode;
  status: TaskStatus;
  resultType: ResultType;
  config: TaskConfig;
  createdAt: number;
  startedAt?: number;
  completedAt?: number;
  workers: WorkerInstance[];
  events: TaskExecutionEvent[];
  progress: {
    total: number;
    completed: number;
    running: number;
    blocked: number;
    queued: number;
    percent: number;
  };
  metrics: {
    pagesVisited: number;
    actionsTaken: number;
    browserMinutes: number;
    timeToFirstResultMs?: number;
  };
  failureReason?: string;
  summary?: string;
  researchResultId?: string;
  testReportId?: string;
}
