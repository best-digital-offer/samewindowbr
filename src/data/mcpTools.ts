import { McpToolDefinition } from '../types/mcp';

export const OPERANT_MCP_TOOLS: McpToolDefinition[] = [
  {
    name: 'research_web',
    description: 'Deploys parallel browser workers to search, navigate, extract, verify, and compile evidence-backed structured research on companies, software, pricing, or markets.',
    parameters: [
      { name: 'query', type: 'string', description: 'The research prompt (e.g., "Find 20 AI SaaS competitors and compare pricing")', required: true },
      { name: 'num_entities', type: 'number', description: 'Number of candidate companies or items to research (default: 10)', required: false, default: 10 },
      { name: 'workers', type: 'number', description: 'Parallel browser workers to allocate (1 to 8, default: 4)', required: false, default: 4 },
      { name: 'verify_sources', type: 'boolean', description: 'Perform secondary verification pass on discovered pricing/fact URLs', required: false, default: true },
      { name: 'output_format', type: 'string', description: 'Output structure: "table", "json", "markdown"', required: false, default: 'json' }
    ],
    returnSchema: '{ taskId: string, status: string, totalEntities: number, verifiedCount: number, items: Array<CompetitorComparisonItem>, summary: Object }',
    exampleCall: {
      query: 'Find 20 AI SaaS competitors and compare pricing',
      num_entities: 20,
      workers: 4,
      verify_sources: true
    },
    exampleResponse: {
      taskId: 'task-ai-competitors-20',
      status: 'completed',
      totalEntities: 20,
      verifiedCount: 18,
      blockedCount: 2,
      priceRange: '$19/mo - $149/mo (Median: $39/mo)',
      dominantModel: 'Seat-based monthly + usage tokens with 15-20% annual discount'
    }
  },
  {
    name: 'test_website',
    description: 'Deploys an autonomous AI QA engineer to explore a web application, test forms, check error boundaries, audit mobile responsiveness, and report reproducible bugs with screenshots.',
    parameters: [
      { name: 'url', type: 'string', description: 'The target website or flow URL (e.g., "https://myapp.com/signup")', required: true },
      { name: 'objective', type: 'string', description: 'Testing objective (e.g., "Find problems in signup flow, form validation, and mobile layout")', required: true },
      { name: 'viewport', type: 'string', description: 'Target viewport: "desktop", "mobile", or "both"', required: false, default: 'both' },
      { name: 'capture_screenshots', type: 'boolean', description: 'Capture full DOM screenshots on failure or regression', required: false, default: true }
    ],
    returnSchema: '{ testReportId: string, status: string, totalChecks: number, passed: number, failed: number, bugs: Array<QABug>, visualDiffs: Array<VisualDiff> }',
    exampleCall: {
      url: 'https://example-saas-app.dev/signup',
      objective: 'Find problems in my signup flow and mobile layout',
      viewport: 'both',
      capture_screenshots: true
    },
    exampleResponse: {
      testReportId: 'qa-signup-audit-2026',
      totalChecks: 37,
      passed: 34,
      failed: 3,
      criticalCount: 0,
      highCount: 1,
      mediumCount: 2,
      topIssue: 'Submit button remains disabled after correcting invalid email without re-blur'
    }
  },
  {
    name: 'extract_web_data',
    description: 'Extracts structured data records from single or multiple web pages using AI heuristics and selector auto-healing.',
    parameters: [
      { name: 'urls', type: 'array', description: 'List of target URLs to extract data from', required: true },
      { name: 'schema', type: 'object', description: 'JSON schema describing the fields to extract', required: true },
      { name: 'browser_profile', type: 'string', description: 'Browser profile ID for session state', required: false }
    ],
    returnSchema: '{ records: Array<Object>, sourcesScanned: number, extractionConfidence: number }',
    exampleCall: {
      urls: ['https://example.com/pricing', 'https://example.com/about'],
      schema: { plan_name: 'string', monthly_price: 'string', free_tier: 'boolean' }
    },
    exampleResponse: {
      sourcesScanned: 2,
      extractionConfidence: 0.96,
      records: [{ plan_name: 'Pro', monthly_price: '$49', free_tier: false }]
    }
  },
  {
    name: 'run_workflow',
    description: 'Executes a saved recurring workflow, detects changes from previous runs (e.g., price updates or new test failures), and returns the delta summary.',
    parameters: [
      { name: 'workflow_id', type: 'string', description: 'Unique ID of the saved workflow', required: true },
      { name: 'force_fresh', type: 'boolean', description: 'Bypass cache and force fresh web crawling', required: false, default: true }
    ],
    returnSchema: '{ runId: string, workflowId: string, status: string, changesDetected: number, changes: Array<PriceChangeDetection> }',
    exampleCall: {
      workflow_id: 'wf-weekly-pricing',
      force_fresh: true
    },
    exampleResponse: {
      runId: 'run-wk-40',
      workflowId: 'wf-weekly-pricing',
      status: 'completed',
      changesDetected: 3,
      changes: [
        { entityName: 'BrowsePulse Engine', deltaSummary: 'Price increased from $19 to $29/mo' }
      ]
    }
  },
  {
    name: 'get_task_status',
    description: 'Returns real-time execution state, worker allocation, progress percentage, and streaming events for an active browser task.',
    parameters: [
      { name: 'task_id', type: 'string', description: 'Task ID to monitor', required: true }
    ],
    returnSchema: '{ taskId: string, status: TaskStatus, progress: Object, activeWorkers: number, latestEvent: Object }',
    exampleCall: { task_id: 'task-ai-competitors-20' },
    exampleResponse: {
      taskId: 'task-ai-competitors-20',
      status: 'completed',
      progress: { total: 20, completed: 18, running: 0, blocked: 2, percent: 100 }
    }
  },
  {
    name: 'get_research_results',
    description: 'Retrieves the complete verified research dataset, evidence references, and comparison matrix for a research task.',
    parameters: [
      { name: 'research_id', type: 'string', description: 'Research dataset or task ID', required: true }
    ],
    returnSchema: '{ dataset: ResearchDataset }',
    exampleCall: { research_id: 'res-ai-competitors-20' },
    exampleResponse: {
      datasetId: 'res-ai-competitors-20',
      totalCandidates: 20,
      sourcesVerified: 47
    }
  },
  {
    name: 'get_test_report',
    description: 'Retrieves the engineering QA report, reproduction steps, screenshots, and visual regression diffs for a testing task.',
    parameters: [
      { name: 'report_id', type: 'string', description: 'QA test report ID', required: true }
    ],
    returnSchema: '{ report: QATestReport }',
    exampleCall: { report_id: 'qa-signup-audit-2026' },
    exampleResponse: {
      reportId: 'qa-signup-audit-2026',
      totalChecks: 37,
      passed: 34,
      failed: 3
    }
  }
];
