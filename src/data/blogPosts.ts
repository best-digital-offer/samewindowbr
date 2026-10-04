export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Engineering' | 'Research' | 'Architecture' | 'QA Testing';
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'parallel-browser-workers-architecture',
    title: 'Architecting High-Concurrency Browser Workers for Real-Time Web Intelligence',
    excerpt: 'How we decouple planning, session pooling, and DOM extraction across isolated Chromium workers without tripping modern anti-bot heuristics.',
    category: 'Architecture',
    publishedAt: 'October 2, 2026',
    readTime: '6 min read',
    author: {
      name: 'Elena Rostova',
      role: 'Staff Infrastructure Engineer'
    },
    content: [
      'Single-threaded browser automation quickly hits bottlenecks when exploring 20 or more target websites in response to a single prompt. If an agent navigates sequentially, network latency, hydration waterfalls, and Cloudflare challenges compound to minutes of waiting.',
      'In Operant, we partition the task at the planning phase into independent entity batches. Worker 1 claims candidates 1-5, Worker 2 claims 6-10, and so on. Each worker operates in an isolated virtual viewport context with independent cookie jars and proxy paths.',
      'Crucially, workers stream their events back into a centralized normalization pipeline. When Worker 3 discovers a pricing URL with conflicting table entries, it marks the evidence as "Conflicting sources" rather than silently hallucinating an average.',
      'The result is near-instantaneous research throughput that reliably merges and deduplicates results into a unified evidence workspace.'
    ]
  },
  {
    id: 'post-2',
    slug: 'ai-qa-beyond-brittle-selectors',
    title: 'Autonomous AI QA: Finding Real Bugs Without Flaky Test Scripts',
    excerpt: 'Traditional end-to-end tests fail when a CSS class changes. Here is how semantic DOM reasoning discovers broken validation, z-index occlusions, and runtime exceptions.',
    category: 'QA Testing',
    publishedAt: 'September 27, 2026',
    readTime: '8 min read',
    author: {
      name: 'Marcus Chen',
      role: 'Head of Quality Engineering'
    },
    content: [
      'Every engineer has experienced the dread of a broken CI pipeline caused by a minor Tailwind class refactor that shifted a Selenium or Cypress selector. Traditional testing scripts are brittle because they verify implementation artifacts rather than user intent.',
      'Our AI QA worker approaches the application as an expert exploratory tester. Given a simple prompt like "Find problems in my signup flow", the agent locates input fields, exercises invalid boundary cases (e.g., malformed emails, short passwords), submits forms, and observes reactions.',
      'It inspects runtime console logs for unhandled TypeErrors, monitors bounding box coordinates for mobile element clipping, and tests whether submit buttons properly re-enable when errors are corrected.',
      'Every finding is accompanied by exact reproduction steps, viewport specifications, and live DOM evidence snippets so developers can fix the bug in minutes.'
    ]
  },
  {
    id: 'post-3',
    slug: 'mcp-and-chatgpt-readiness',
    title: 'Integrating Model Context Protocol (MCP) into Browser Workforce Engines',
    excerpt: 'Standardizing browser actions and structured data schemas so LLMs in ChatGPT, Claude, or custom agent swarms can orchestrate real-world web executions.',
    category: 'Engineering',
    publishedAt: 'September 19, 2026',
    readTime: '5 min read',
    author: {
      name: 'Devin Vance',
      role: 'Founding Protocol Architect'
    },
    content: [
      'While large language models are exceptional at reasoning and synthesis, their training cutoffs and lack of direct web execution limit their utility for high-stakes operational workflows.',
      'The Model Context Protocol (MCP) bridges this gap by exposing deterministic tools to AI clients. By treating browser workers as an MCP provider, any client can request research_web, test_website, or run_workflow and receive guaranteed structured payloads.',
      'Importantly, our protocol enforces security boundaries: destructive side-effect actions (like form submissions or payment steps) require explicit confirmation flags, preventing autonomous agents from unintended actions.'
    ]
  }
];
