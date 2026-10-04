import { TaskConfig } from './task';

export type WorkflowSchedule = 'manual' | 'hourly' | 'daily' | 'weekly' | 'monthly';

export interface PriceChangeDetection {
  id: string;
  entityName: string;
  sourceUrl: string;
  previousValue: string;
  currentValue: string;
  deltaSummary: string;
  detectedAt: number;
  evidenceSnippet: string;
}

export interface WorkflowRunRecord {
  id: string;
  workflowId: string;
  startedAt: number;
  completedAt: number;
  status: 'completed' | 'partial' | 'failed';
  itemsProcessed: number;
  changesDetectedCount: number;
  changes: PriceChangeDetection[];
  reportId?: string;
  notes?: string;
}

export interface ReusableWorkflow {
  id: string;
  title: string;
  description: string;
  instruction: string;
  schedule: WorkflowSchedule;
  status: 'active' | 'paused' | 'draft';
  taskConfig: Partial<TaskConfig>;
  lastRunAt?: number;
  nextRunAt?: number;
  runsCount: number;
  runs: WorkflowRunRecord[];
  createdAt: number;
  updatedAt: number;
}
