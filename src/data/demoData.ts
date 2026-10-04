import { ResearchDataset } from '../types/research';
import { QATestReport } from '../types/testing';
import { ReusableWorkflow } from '../types/workflow';
import { BrowserProfile } from '../types/browser';

export const DEMO_BROWSER_PROFILES: BrowserProfile[] = [
  {
    id: 'prof-dev',
    name: 'Development Sandbox',
    type: 'testing',
    description: 'Clean isolated state with local mock cookies and bypass flags enabled.',
    cookiesCount: 14,
    localStorageKeys: 8,
    status: 'connected',
    lastUsed: Date.now() - 1000 * 60 * 22,
    isIsolated: true,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 OperantBrowser/1.0',
    proxyLocation: 'US-East (Virginia)',
  },
  {
    id: 'prof-res',
    name: 'Stealth Research Profile',
    type: 'research',
    description: 'Anti-fingerprinting profile with randomized headers and residential proxy.',
    cookiesCount: 42,
    localStorageKeys: 19,
    status: 'connected',
    lastUsed: Date.now() - 1000 * 60 * 120,
    isIsolated: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/134.0.0.0 Safari/537.36',
    proxyLocation: 'US-Central (Iowa)',
  },
  {
    id: 'prof-auth',
    name: 'Work Workspace Session',
    type: 'work',
    description: 'Authenticated company profile with single sign-on sessions stored in encrypted enclave.',
    cookiesCount: 128,
    localStorageKeys: 54,
    status: 'idle',
    lastUsed: Date.now() - 1000 * 60 * 360,
    isIsolated: true,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_3) AppleWebKit/605.1.15 Safari/17.3',
    proxyLocation: 'Direct / Dedicated IP',
  }
];

export const DEMO_RESEARCH_DATASET: ResearchDataset = {
  id: 'res-ai-competitors-20',
  taskId: 'task-ai-competitors-20',
  title: '20 AI SaaS Competitors & Pricing Breakdown',
  query: 'Find 20 AI SaaS competitors and compare pricing.',
  createdAt: Date.now() - 1000 * 60 * 45,
  completedAt: Date.now() - 1000 * 60 * 40,
  totalCandidates: 20,
  sourcesVerified: 47,
  pricingPagesDiscovered: 18,
  blockedCount: 2,
  summary: {
    priceRange: '$19/mo – $149/mo (Median: $39/mo)',
    dominantModel: 'Seat-based monthly + usage tokens with 15–20% annual discount',
    keyMarketTrend: '80% of providers now require credit cards for extended trial access; 45% offer perpetual free tiers with limited monthly query quotas.',
    recommendation: 'Position base tier at $29/mo with 3 parallel workers to undercut median competitor starter rates.'
  },
  items: [
    {
      id: 'comp-1',
      competitor: 'CognitiveFlow AI',
      website: 'https://cognitiveflow.io',
      pricing: '$29/seat/mo',
      annualPrice: '$24/seat/mo billed annually ($288/yr)',
      freePlan: 'Yes',
      mainFeatures: ['Automated Prompt Pipelines', 'Vector Memory Store', 'REST API Webhooks', 'Team Sharing'],
      targetCustomer: 'Mid-market product teams and prompt engineers',
      strengths: ['Instant API setup', 'SOC2 Type II certified'],
      weaknesses: ['No parallel browser execution', 'Rate limits on lower tier'],
      pricingUrl: 'https://cognitiveflow.io/pricing',
      sourceUrl: 'https://cognitiveflow.io',
      confidence: 'Verified',
      lastChecked: Date.now() - 1000 * 60 * 42,
      evidence: {
        id: 'ev-1',
        sourceUrl: 'https://cognitiveflow.io/pricing',
        pageTitle: 'CognitiveFlow Plans & Pricing - Simple, Transparent',
        relevantSection: 'Pricing Grid > Starter Card > Price Tag',
        extractedSnippet: 'Starter: $29 per user / month. Includes 500,000 monthly inference tokens. 14-day money-back guarantee.',
        domSelector: '#pricing-table .card-starter .price-value',
        timestamp: Date.now() - 1000 * 60 * 42,
        confidence: 'Verified',
        notes: 'Confirmed by inspecting live DOM text and stripe checkout metadata.',
        httpStatus: 200
      }
    },
    {
      id: 'comp-2',
      competitor: 'Synthetix Cloud',
      website: 'https://synthetixcloud.tech',
      pricing: '$49/mo',
      annualPrice: '$39/mo ($468/yr)',
      freePlan: 'Free Trial',
      mainFeatures: ['Multi-agent orchestration', 'Slack Integration', 'Knowledge base indexing', 'Audit logs'],
      targetCustomer: 'Enterprise IT & operations teams',
      strengths: ['Deep enterprise RBAC', 'Fine-grained secret isolation'],
      weaknesses: ['Complex onboarding flow', 'No self-serve team invites without admin approval'],
      pricingUrl: 'https://synthetixcloud.tech/plans',
      sourceUrl: 'https://synthetixcloud.tech',
      confidence: 'Verified',
      lastChecked: Date.now() - 1000 * 60 * 43,
      evidence: {
        id: 'ev-2',
        sourceUrl: 'https://synthetixcloud.tech/plans',
        pageTitle: 'Synthetix Cloud - Transparent Enterprise Pricing',
        relevantSection: 'Pricing Section > Professional Plan',
        extractedSnippet: 'Pro Plan: $49/month or $39/mo billed annually. 14-day full feature trial without card.',
        domSelector: '.plans-container [data-plan="pro"] .amount',
        timestamp: Date.now() - 1000 * 60 * 43,
        confidence: 'Verified',
        notes: 'Price verified from live DOM table.'
      }
    },
    {
      id: 'comp-3',
      competitor: 'BrowsePulse Engine',
      website: 'https://browsepulse.io',
      pricing: '$19/mo',
      annualPrice: '$15/mo ($180/yr)',
      freePlan: 'Yes',
      mainFeatures: ['DOM Change Tracking', 'Email Alerts', 'CSV Data Exports', '5 Monitors'],
      targetCustomer: 'Individual market researchers and independent consultants',
      strengths: ['Extremely low entry price', 'Fast webhook trigger notifications'],
      weaknesses: ['Single worker limit', 'Lacks full autonomous browsing heuristics'],
      pricingUrl: 'https://browsepulse.io/pricing',
      sourceUrl: 'https://browsepulse.io',
      confidence: 'Verified',
      lastChecked: Date.now() - 1000 * 60 * 41,
      evidence: {
        id: 'ev-3',
        sourceUrl: 'https://browsepulse.io/pricing',
        pageTitle: 'BrowsePulse - Monitoring Made Accessible',
        relevantSection: 'Individual Plan Banner',
        extractedSnippet: 'Solo Tier: $19/mo billed monthly or $15/mo annually. Free tier available with 5 hourly checks.',
        domSelector: '.tier-individual span.price',
        timestamp: Date.now() - 1000 * 60 * 41,
        confidence: 'Verified'
      }
    },
    {
      id: 'comp-4',
      competitor: 'AgentMatrix Labs',
      website: 'https://agentmatrix.internal',
      pricing: 'Custom Enterprise / $149/mo Starter',
      annualPrice: '$119/mo ($1,428/yr)',
      freePlan: 'No',
      mainFeatures: ['Headless Chromium Clusters', 'Custom IP Rotation', 'CAPTCHA Auto-Bypass', 'SOC2 Compliant'],
      targetCustomer: 'Growth-stage tech firms with heavy scraping workloads',
      strengths: ['Massive horizontal concurrency', 'High throughput IP pool'],
      weaknesses: ['Expensive entry threshold', 'Requires custom developer setup'],
      pricingUrl: 'https://agentmatrix.internal/pricing',
      sourceUrl: 'https://agentmatrix.internal',
      confidence: 'Likely',
      lastChecked: Date.now() - 1000 * 60 * 40,
      evidence: {
        id: 'ev-4',
        sourceUrl: 'https://agentmatrix.internal/pricing',
        pageTitle: 'AgentMatrix Enterprise Infrastructure',
        relevantSection: 'Developer Starter tier headline',
        extractedSnippet: 'Developer Cluster starting at $149/mo. Contact sales for customized concurrent concurrency.',
        domSelector: '.pricing-card-dev .price-header',
        timestamp: Date.now() - 1000 * 60 * 40,
        confidence: 'Likely',
        notes: 'Base pricing visible; enterprise volume tiers require quote form.'
      }
    },
    {
      id: 'comp-5',
      competitor: 'Loomin Web Intelligence',
      website: 'https://loomin-intel.co',
      pricing: '$35/mo',
      annualPrice: '$28/mo ($336/yr)',
      freePlan: 'Yes',
      mainFeatures: ['Semantic Search Crawler', 'PDF & Doc Ingestion', 'Knowledge Graph Output', 'API Access'],
      targetCustomer: 'Investment analysts, venture funds, corporate development',
      strengths: ['Deep PDF parsing', 'Structured entity extraction'],
      weaknesses: ['No visual regression testing', 'Slow on heavy client-rendered SPAs'],
      pricingUrl: 'https://loomin-intel.co/subscription',
      sourceUrl: 'https://loomin-intel.co',
      confidence: 'Verified',
      lastChecked: Date.now() - 1000 * 60 * 44,
      evidence: {
        id: 'ev-5',
        sourceUrl: 'https://loomin-intel.co/subscription',
        pageTitle: 'Loomin Plans - Scalable Research Intelligence',
        relevantSection: 'Researcher Tier',
        extractedSnippet: 'Research Analyst: $35/month. Unlimited exports and 1,000 deep web queries per month.',
        timestamp: Date.now() - 1000 * 60 * 44,
        confidence: 'Verified'
      }
    },
    {
      id: 'comp-6',
      competitor: 'HyperScrape AI',
      website: 'https://hyperscrape.dev',
      pricing: 'Not publicly available',
      annualPrice: 'Not publicly available',
      freePlan: 'Not publicly available',
      mainFeatures: ['Stealth Browser Mesh', 'AI Selector Auto-healing', 'GraphQL Gateway'],
      targetCustomer: 'Data engineering teams and enterprise scrapers',
      strengths: ['Selector self-healing on DOM drift'],
      weaknesses: ['Opaque pricing wall requiring demo call', 'Sales-led motion only'],
      pricingUrl: 'https://hyperscrape.dev/request-demo',
      sourceUrl: 'https://hyperscrape.dev',
      confidence: 'Not publicly available',
      lastChecked: Date.now() - 1000 * 60 * 39,
      evidence: {
        id: 'ev-6',
        sourceUrl: 'https://hyperscrape.dev/pricing',
        pageTitle: 'Talk to Sales - HyperScrape',
        relevantSection: 'Redirected to sales booking form',
        extractedSnippet: 'Pricing is tailored to concurrency and target domains. Schedule an engineering consultation.',
        timestamp: Date.now() - 1000 * 60 * 39,
        confidence: 'Not publicly available',
        notes: 'Pricing URL redirects to /request-demo. No published price list detected.'
      }
    },
    {
      id: 'comp-7',
      competitor: 'DeepWeb Scout',
      website: 'https://deepwebscout.io',
      pricing: '$45/mo',
      annualPrice: '$36/mo ($432/yr)',
      freePlan: 'Free Trial',
      mainFeatures: ['Automated Lead Enrichment', 'LinkedIn Public Profile Summarizer', 'Email Discovery'],
      targetCustomer: 'B2B sales teams and SDR leaders',
      strengths: ['High lead verification accuracy'],
      weaknesses: ['Frequent CAPTCHA challenges during batch runs'],
      pricingUrl: 'https://deepwebscout.io/pricing',
      sourceUrl: 'https://deepwebscout.io',
      confidence: 'Verified',
      lastChecked: Date.now() - 1000 * 60 * 40,
      evidence: {
        id: 'ev-7',
        sourceUrl: 'https://deepwebscout.io/pricing',
        pageTitle: 'Pricing Plans - DeepWeb Scout',
        relevantSection: 'Growth Plan',
        extractedSnippet: '$45/month with 2,500 credits. 7-day trial with 50 test credits.',
        timestamp: Date.now() - 1000 * 60 * 40,
        confidence: 'Verified'
      }
    },
    {
      id: 'comp-8',
      competitor: 'OmniBrowse Automator',
      website: 'https://omnibrowse.app',
      pricing: '$25/mo',
      annualPrice: '$20/mo ($240/yr)',
      freePlan: 'Yes',
      mainFeatures: ['Chrome Extension Recorder', 'Cloud Execution', 'Webhook Triggers', 'CSV Export'],
      targetCustomer: 'E-commerce store operators and indie hackers',
      strengths: ['Visual point-and-click workflow recorder'],
      weaknesses: ['Fragile against dynamic React SPA hydration shifts'],
      pricingUrl: 'https://omnibrowse.app/pricing',
      sourceUrl: 'https://omnibrowse.app',
      confidence: 'Verified',
      lastChecked: Date.now() - 1000 * 60 * 38,
      evidence: {
        id: 'ev-8',
        sourceUrl: 'https://omnibrowse.app/pricing',
        pageTitle: 'OmniBrowse Pricing',
        relevantSection: 'Pro Plan box',
        extractedSnippet: '$25/month for 5,000 monthly automation runs.',
        timestamp: Date.now() - 1000 * 60 * 38,
        confidence: 'Verified'
      }
    }
  ]
};

export const DEMO_QA_REPORT: QATestReport = {
  id: 'qa-signup-audit-2026',
  taskId: 'task-qa-signup-audit',
  targetUrl: 'https://example-saas-app.dev/signup',
  objective: 'Find problems in my signup flow, test validation, mobile responsive layout, and redirect behavior.',
  createdAt: Date.now() - 1000 * 60 * 55,
  durationSeconds: 142,
  summary: {
    totalChecks: 37,
    passed: 34,
    failed: 3,
    warnings: 4,
    criticalIssues: 0,
    highIssues: 1,
    mediumIssues: 2,
    lowIssues: 1
  },
  flowsTested: [
    'Homepage to Signup Navigation',
    'Blank Form Submission Validation',
    'Malformed Email Detection (RFC 5322)',
    'Password Complexity Enforcement',
    'Google OAuth Sign-in Handshake',
    'Duplicate Email Collision Message',
    'Mobile Viewport (390px iPhone) Form Visibility',
    'Submit Button Disabled/Loading State during API Call',
    'Browser Back / Forward Navigation State Persistence',
    'Dashboard Redirect Verification with Valid Credentials'
  ],
  consoleErrors: [
    {
      timestamp: Date.now() - 1000 * 60 * 54,
      type: 'error',
      message: 'Uncaught TypeError: Cannot read properties of undefined (reading "terms_accepted")',
      source: 'https://example-saas-app.dev/assets/auth-chunk.js:142:18'
    },
    {
      timestamp: Date.now() - 1000 * 60 * 53,
      type: 'warning',
      message: '[Violation] Added non-passive event listener to a scroll-blocking touchstart event',
      source: 'https://example-saas-app.dev/signup:1'
    }
  ],
  bugs: [
    {
      id: 'bug-1',
      severity: 'HIGH',
      issue: 'Submit button remains disabled after correcting invalid email address without field re-focus',
      page: '/signup',
      url: 'https://example-saas-app.dev/signup',
      description: 'When a user enters an invalid email format ("user@domain") and triggers validation blur, the form correctly flags the error and disables the submit button. However, when the user corrects the text to "user@domain.com", the button remains locked in disabled state until the user tabs away or clicks into another field, confusing users into thinking submission is blocked.',
      stepsToReproduce: [
        'Navigate to https://example-saas-app.dev/signup',
        'Type "testuser" into email input',
        'Click into password input (triggers email blur error)',
        'Click back into email input and append "@company.com"',
        'Observe the primary "Create Account" button status'
      ],
      expected: 'The submit button should reactively enable as soon as all input fields satisfy validation rules.',
      actual: 'Submit button remains in disabled HTML state (disabled attribute present) until secondary blur event occurs.',
      evidence: {
        id: 'ev-bug-1',
        sourceUrl: 'https://example-saas-app.dev/signup',
        pageTitle: 'Sign Up - Example SaaS App',
        relevantSection: 'Signup Form > Submit Button Container',
        extractedSnippet: '<button type="submit" disabled="" class="opacity-50 cursor-not-allowed">Create Account</button>',
        domSelector: 'button[type="submit"]',
        timestamp: Date.now() - 1000 * 60 * 52,
        confidence: 'Verified',
        notes: 'Confirmed across Chrome 134 desktop and Mobile Safari emulation.'
      },
      viewport: 'desktop',
      browser: 'Chromium 134.0 (Headless)',
      confidence: 'HIGH',
      suggestedFix: 'Update React state onChange handler rather than relying purely on onBlur validation state, or re-evaluate canSubmit boolean on synthetic input events.',
      status: 'open'
    },
    {
      id: 'bug-2',
      severity: 'MEDIUM',
      issue: 'Mobile 390px viewport: Terms of Service modal close button clipped by fixed sticky header',
      page: '/signup?modal=tos',
      url: 'https://example-saas-app.dev/signup',
      description: 'On mobile viewports <= 400px width, opening the "Terms of Service" modal causes the modal dialog close "X" button to overlap under the fixed top navigation bar, preventing touch dismissal without tapping outside the scrim.',
      stepsToReproduce: [
        'Set browser viewport to 390x844 (iPhone 14)',
        'Open https://example-saas-app.dev/signup',
        'Tap the "I agree to Terms of Service" link to open the policy modal',
        'Attempt to tap the top-right "Close" icon'
      ],
      expected: 'Close button should be completely visible with safe-area padding (z-index above header and margin-top >= 60px).',
      actual: 'Close icon is occluded by the z-index 50 fixed top navbar banner.',
      evidence: {
        id: 'ev-bug-2',
        sourceUrl: 'https://example-saas-app.dev/signup',
        pageTitle: 'Sign Up - Modal Inspection',
        relevantSection: 'Modal Overlay > Dialog Header',
        extractedSnippet: 'Element <button aria-label="Close modal"> bounding box overlaps with <header class="fixed top-0"> by 28px.',
        timestamp: Date.now() - 1000 * 60 * 51,
        confidence: 'Verified',
        notes: 'DOM bounding rect collision detected at y: 16px.'
      },
      viewport: 'mobile',
      browser: 'Mobile Safari Emulation (iOS 17)',
      confidence: 'HIGH',
      suggestedFix: 'Apply top padding `pt-16` or `safe-area-inset-top` to modal container or ensure modal dialog z-index is higher than fixed header.',
      status: 'open'
    },
    {
      id: 'bug-3',
      severity: 'MEDIUM',
      issue: 'Unhandled runtime TypeError thrown when submitting form with unchecked optional marketing consent',
      page: '/signup',
      url: 'https://example-saas-app.dev/signup',
      description: 'When the optional "Send me product updates" checkbox is left unchecked, submitting the form triggers a client-side JavaScript error in auth-chunk.js because the payload accessor assumes `event.target.elements.updates.value` is defined.',
      stepsToReproduce: [
        'Open signup form with clean cache',
        'Fill valid email "engineer@company.com"',
        'Fill password "CorrectHorseBattery99!"',
        'Leave "Send me product updates" unchecked',
        'Click "Create Account"'
      ],
      expected: 'Form should serialize unchecked box as `false` and successfully POST to /api/auth/register.',
      actual: 'Console logs Uncaught TypeError, stopping submission pipeline without presenting user feedback.',
      evidence: {
        id: 'ev-bug-3',
        sourceUrl: 'https://example-saas-app.dev/signup',
        pageTitle: 'Runtime Console Observer',
        relevantSection: 'window.onerror listener',
        extractedSnippet: 'Uncaught TypeError: Cannot read properties of undefined (reading "terms_accepted")',
        timestamp: Date.now() - 1000 * 60 * 50,
        confidence: 'Verified'
      },
      viewport: 'desktop',
      browser: 'Chromium 134.0 (Headless)',
      confidence: 'HIGH',
      suggestedFix: 'Use optional chaining `elements?.updates?.checked ?? false` when assembling the registration request object.',
      status: 'open'
    },
    {
      id: 'bug-4',
      severity: 'LOW',
      issue: 'Missing autocomplete="new-password" attribute prevents browser password manager generation',
      page: '/signup',
      url: 'https://example-saas-app.dev/signup',
      description: 'The password input field lacks explicit `autocomplete="new-password"` attribute, prompting 1Password and Chrome to suggest autofilling existing credentials rather than generating a strong unique password.',
      stepsToReproduce: [
        'Inspect password input element on /signup'
      ],
      expected: 'Password input should include autocomplete="new-password".',
      actual: 'Input tag only specifies type="password" name="pwd".',
      evidence: {
        id: 'ev-bug-4',
        sourceUrl: 'https://example-saas-app.dev/signup',
        pageTitle: 'DOM Accessibility Audit',
        relevantSection: 'Form Field #pwd',
        extractedSnippet: '<input type="password" id="pwd" name="pwd" class="input-field">',
        timestamp: Date.now() - 1000 * 60 * 49,
        confidence: 'Verified'
      },
      viewport: 'desktop',
      browser: 'Chromium 134.0 (Headless)',
      confidence: 'HIGH',
      suggestedFix: 'Add autocomplete="new-password" and id="password" for optimal assistive technology and keychain compatibility.',
      status: 'open'
    }
  ],
  visualDiffs: [
    {
      id: 'diff-1',
      name: 'Signup Primary Action Button Alignment',
      url: 'https://example-saas-app.dev/signup',
      status: 'regression_detected',
      previousScreenshotUrl: '/src/assets/images/browser_viewport_audit_1791084657841.jpg',
      currentScreenshotUrl: '/src/assets/images/qa_regression_diff_1791084668202.jpg',
      diffPercentage: 4.8,
      highlightedRegionText: 'Button vertical padding reduced from 14px to 6px; text clipped at 1280px viewport.',
      notes: 'Visual regression identified: Button height shifted by 16px following recent CSS framework upgrade.'
    },
    {
      id: 'diff-2',
      name: 'Footer Security Badges & Copyright',
      url: 'https://example-saas-app.dev/signup',
      status: 'passed',
      previousScreenshotUrl: '/src/assets/images/browser_viewport_audit_1791084657841.jpg',
      currentScreenshotUrl: '/src/assets/images/browser_viewport_audit_1791084657841.jpg',
      diffPercentage: 0.1,
      highlightedRegionText: 'Subtle font antialiasing difference under 0.2% threshold.',
      notes: 'No meaningful layout shifts or regressions detected.'
    }
  ]
};

export const DEMO_WORKFLOWS: ReusableWorkflow[] = [
  {
    id: 'wf-weekly-pricing',
    title: 'Weekly Competitor Pricing & Tier Tracker',
    description: 'Autonomous Monday morning scan of top 20 SaaS competitor pricing tables with delta change detection.',
    instruction: 'Find 20 major AI SaaS competitors. Check pricing tables. Compare monthly and annual pricing. Identify free tiers. Report changes from previous run.',
    schedule: 'weekly',
    status: 'active',
    taskConfig: {
      mode: 'research',
      workers: 4,
      evidenceLevel: 'full',
      timeoutSeconds: 300,
      safeModeOnly: true
    },
    lastRunAt: Date.now() - 1000 * 60 * 60 * 48,
    nextRunAt: Date.now() + 1000 * 60 * 60 * 120,
    runsCount: 12,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 60,
    updatedAt: Date.now() - 1000 * 60 * 60 * 48,
    runs: [
      {
        id: 'run-wk-40',
        workflowId: 'wf-weekly-pricing',
        startedAt: Date.now() - 1000 * 60 * 60 * 48,
        completedAt: Date.now() - 1000 * 60 * 60 * 48 + 180000,
        status: 'completed',
        itemsProcessed: 20,
        changesDetectedCount: 3,
        changes: [
          {
            id: 'ch-1',
            entityName: 'BrowsePulse Engine',
            sourceUrl: 'https://browsepulse.io/pricing',
            previousValue: '$19/month',
            currentValue: '$29/month (+$10/mo increase)',
            deltaSummary: 'Price increased from $19 to $29/mo; solo tier limits raised from 5 to 10 monitors.',
            detectedAt: Date.now() - 1000 * 60 * 60 * 48,
            evidenceSnippet: 'Solo Tier: $29/mo billed monthly or $22/mo annually. Effective October 1.'
          },
          {
            id: 'ch-2',
            entityName: 'AgentMatrix Labs',
            sourceUrl: 'https://agentmatrix.internal/pricing',
            previousValue: '$199/mo Starter',
            currentValue: '$149/mo Starter (-$50/mo reduction)',
            deltaSummary: 'Starter tier lowered by 25% to capture early-stage developer market.',
            detectedAt: Date.now() - 1000 * 60 * 60 * 48,
            evidenceSnippet: 'Developer Cluster starting at $149/mo with 2 concurrent workers.'
          },
          {
            id: 'ch-3',
            entityName: 'Synthetix Cloud',
            sourceUrl: 'https://synthetixcloud.tech/plans',
            previousValue: 'Free tier: 100 queries/mo',
            currentValue: 'Free tier removed; replaced with 14-day trial',
            deltaSummary: 'Perpetual free tier sunset in favor of cardless 14-day full feature trial.',
            detectedAt: Date.now() - 1000 * 60 * 60 * 48,
            evidenceSnippet: '14-day full feature trial without card. Perpetual free tier retired.'
          }
        ],
        notes: '20 sources scanned with 4 parallel browser workers. 3 pricing changes detected.'
      },
      {
        id: 'run-wk-39',
        workflowId: 'wf-weekly-pricing',
        startedAt: Date.now() - 1000 * 60 * 60 * 24 * 9,
        completedAt: Date.now() - 1000 * 60 * 60 * 24 * 9 + 175000,
        status: 'completed',
        itemsProcessed: 20,
        changesDetectedCount: 1,
        changes: [
          {
            id: 'ch-prev-1',
            entityName: 'CognitiveFlow AI',
            sourceUrl: 'https://cognitiveflow.io/pricing',
            previousValue: '$34/seat/mo',
            currentValue: '$29/seat/mo',
            deltaSummary: 'Repositioned entry seat price downward by $5.',
            detectedAt: Date.now() - 1000 * 60 * 60 * 24 * 9,
            evidenceSnippet: 'Starter: $29 per user / month.'
          }
        ],
        notes: 'Completed nominal run without blockages.'
      }
    ]
  },
  {
    id: 'wf-nightly-signup-qa',
    title: 'Nightly Core User Signup Regression',
    description: 'Automated end-to-end regression testing of the signup, authentication, and onboarding redirect flows.',
    instruction: 'Open homepage. Navigate to signup. Test form validation boundaries. Verify Google OAuth button status. Check mobile viewport rendering. Report any new regressions.',
    schedule: 'daily',
    status: 'active',
    taskConfig: {
      mode: 'testing',
      workers: 2,
      evidenceLevel: 'full',
      timeoutSeconds: 240,
      safeModeOnly: true
    },
    lastRunAt: Date.now() - 1000 * 60 * 60 * 14,
    nextRunAt: Date.now() + 1000 * 60 * 60 * 10,
    runsCount: 38,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 40,
    updatedAt: Date.now() - 1000 * 60 * 60 * 14,
    runs: [
      {
        id: 'run-nightly-38',
        workflowId: 'wf-nightly-signup-qa',
        startedAt: Date.now() - 1000 * 60 * 60 * 14,
        completedAt: Date.now() - 1000 * 60 * 60 * 14 + 115000,
        status: 'completed',
        itemsProcessed: 37,
        changesDetectedCount: 1,
        changes: [
          {
            id: 'reg-1',
            entityName: 'Signup Submit Button State',
            sourceUrl: 'https://example-saas-app.dev/signup',
            previousValue: 'State: Responsive on input change',
            currentValue: 'State: Stuck disabled until blur',
            deltaSummary: 'NEW FAILURE: Validation button state regression detected after release v2.4.1.',
            detectedAt: Date.now() - 1000 * 60 * 60 * 14,
            evidenceSnippet: 'Disabled attribute remains active on synthetic keystroke.'
          }
        ],
        notes: 'New failure flagged. QA engineer notification dispatched.'
      }
    ]
  }
];
