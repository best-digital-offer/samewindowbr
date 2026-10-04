import { ResearchEvidence } from './research';

export type BugSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export interface QABug {
  id: string;
  severity: BugSeverity;
  issue: string;
  page: string;
  url: string;
  description: string;
  stepsToReproduce: string[];
  expected: string;
  actual: string;
  evidence: ResearchEvidence;
  viewport: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  suggestedFix: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
}

export interface VisualDiffCheck {
  id: string;
  name: string;
  url: string;
  status: 'passed' | 'regression_detected' | 'noise_ignored';
  previousScreenshotUrl: string;
  currentScreenshotUrl: string;
  diffHighlightUrl?: string;
  diffPercentage: number;
  highlightedRegionText: string;
  notes: string;
}

export interface QATestReport {
  id: string;
  taskId: string;
  targetUrl: string;
  objective: string;
  createdAt: number;
  durationSeconds: number;
  summary: {
    totalChecks: number;
    passed: number;
    failed: number;
    warnings: number;
    criticalIssues: number;
    highIssues: number;
    mediumIssues: number;
    lowIssues: number;
  };
  bugs: QABug[];
  visualDiffs: VisualDiffCheck[];
  flowsTested: string[];
  consoleErrors: Array<{
    timestamp: number;
    type: 'error' | 'warning' | 'network_fail';
    message: string;
    source: string;
  }>;
}
