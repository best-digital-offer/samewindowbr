import { ResearchDataset } from '../types/research';
import { QATestReport } from '../types/testing';

export function triggerDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportResearchToCSV(dataset: ResearchDataset): string {
  const headers = [
    'Competitor',
    'Website',
    'Pricing',
    'Annual Price',
    'Free Plan',
    'Main Features',
    'Target Customer',
    'Strengths',
    'Weaknesses',
    'Pricing URL',
    'Source URL',
    'Confidence',
    'Last Checked'
  ];

  const escapeCSV = (str: string | undefined) => {
    if (!str) return '""';
    const clean = str.replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = dataset.items.map(item => [
    escapeCSV(item.competitor),
    escapeCSV(item.website),
    escapeCSV(item.pricing),
    escapeCSV(item.annualPrice),
    escapeCSV(item.freePlan),
    escapeCSV(item.mainFeatures.join('; ')),
    escapeCSV(item.targetCustomer),
    escapeCSV(item.strengths.join('; ')),
    escapeCSV(item.weaknesses.join('; ')),
    escapeCSV(item.pricingUrl),
    escapeCSV(item.sourceUrl),
    escapeCSV(item.confidence),
    escapeCSV(new Date(item.lastChecked).toISOString())
  ].join(','));

  return [headers.join(','), ...rows].join('\n');
}

export function exportResearchToJSON(dataset: ResearchDataset): string {
  return JSON.stringify(dataset, null, 2);
}

export function exportResearchToMarkdown(dataset: ResearchDataset): string {
  const header = `# Research Report: ${dataset.title}\n` +
    `**Query:** ${dataset.query}  \n` +
    `**Generated:** ${new Date(dataset.createdAt).toLocaleString()}  \n` +
    `**Verified Sources:** ${dataset.sourcesVerified} / ${dataset.totalCandidates}  \n\n` +
    `## Executive Summary\n` +
    `- **Price Range:** ${dataset.summary.priceRange}\n` +
    `- **Dominant Model:** ${dataset.summary.dominantModel}\n` +
    `- **Key Trend:** ${dataset.summary.keyMarketTrend}\n` +
    `- **Recommendation:** ${dataset.summary.recommendation}\n\n` +
    `## Competitor Comparison Matrix\n\n` +
    `| Competitor | Pricing | Annual | Free Tier | Target Customer | Confidence | Source |\n` +
    `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  const rows = dataset.items.map(i => 
    `| **${i.competitor}** | ${i.pricing} | ${i.annualPrice} | ${i.freePlan} | ${i.targetCustomer} | ${i.confidence} | [Link](${i.sourceUrl}) |`
  ).join('\n');

  const evidenceSection = `\n\n## Verified Evidence Log\n\n` +
    dataset.items.map(i => 
      `### ${i.competitor}\n` +
      `- **Pricing URL:** ${i.pricingUrl}\n` +
      `- **DOM Section:** ${i.evidence.relevantSection}\n` +
      `- **Extracted Snippet:** \`${i.evidence.extractedSnippet}\`\n` +
      `- **Confidence:** ${i.evidence.confidence}\n`
    ).join('\n');

  return header + rows + evidenceSection;
}

export function exportQAToCSV(report: QATestReport): string {
  const headers = [
    'Severity',
    'Issue',
    'Page',
    'URL',
    'Expected',
    'Actual',
    'Viewport',
    'Browser',
    'Confidence',
    'Suggested Fix',
    'Status'
  ];

  const escapeCSV = (str: string | undefined) => {
    if (!str) return '""';
    const clean = str.replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = report.bugs.map(b => [
    escapeCSV(b.severity),
    escapeCSV(b.issue),
    escapeCSV(b.page),
    escapeCSV(b.url),
    escapeCSV(b.expected),
    escapeCSV(b.actual),
    escapeCSV(b.viewport),
    escapeCSV(b.browser),
    escapeCSV(b.confidence),
    escapeCSV(b.suggestedFix),
    escapeCSV(b.status)
  ].join(','));

  return [headers.join(','), ...rows].join('\n');
}

export function exportQAToJSON(report: QATestReport): string {
  return JSON.stringify(report, null, 2);
}

export function exportQAToMarkdown(report: QATestReport): string {
  const header = `# QA Test Report: ${report.targetUrl}\n` +
    `**Objective:** ${report.objective}  \n` +
    `**Audited At:** ${new Date(report.createdAt).toLocaleString()}  \n` +
    `**Duration:** ${report.durationSeconds}s  \n\n` +
    `## Summary\n` +
    `- **Total Checks:** ${report.summary.totalChecks}\n` +
    `- **Passed:** ${report.summary.passed}  \n` +
    `- **Failed:** ${report.summary.failed}  \n` +
    `- **Critical:** ${report.summary.criticalIssues} | **High:** ${report.summary.highIssues} | **Medium:** ${report.summary.mediumIssues} | **Low:** ${report.summary.lowIssues}\n\n` +
    `## Discovered Issues\n\n`;

  const bugs = report.bugs.map((b, idx) => 
    `### ${idx + 1}. [${b.severity}] ${b.issue}\n` +
    `**Page:** \`${b.page}\` | **Viewport:** ${b.viewport} | **Confidence:** ${b.confidence}\n\n` +
    `**Description:**  \n${b.description}\n\n` +
    `**Steps to Reproduce:**  \n` +
    b.stepsToReproduce.map((s, i) => `${i + 1}. ${s}`).join('\n') + '\n\n' +
    `**Expected:** ${b.expected}  \n` +
    `**Actual:** ${b.actual}  \n` +
    `**Suggested Fix:** \`${b.suggestedFix}\`  \n` +
    `**Evidence Snippet:** \`${b.evidence.extractedSnippet}\`\n\n---`
  ).join('\n\n');

  return header + bugs;
}
