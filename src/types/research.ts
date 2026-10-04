export type ConfidenceLevel = 'Verified' | 'Likely' | 'Unverified' | 'Not publicly available' | 'Conflicting sources';

export interface ResearchEvidence {
  id: string;
  sourceUrl: string;
  pageTitle: string;
  relevantSection: string;
  extractedSnippet: string;
  screenshotUrl?: string;
  timestamp: number;
  confidence: ConfidenceLevel;
  notes?: string;
  domSelector?: string;
  httpStatus?: number;
}

export interface CompetitorComparisonItem {
  id: string;
  competitor: string;
  website: string;
  pricing: string;
  annualPrice: string;
  freePlan: 'Yes' | 'No' | 'Free Trial' | 'Not publicly available';
  mainFeatures: string[];
  targetCustomer: string;
  strengths: string[];
  weaknesses: string[];
  pricingUrl: string;
  sourceUrl: string;
  confidence: ConfidenceLevel;
  lastChecked: number;
  evidence: ResearchEvidence;
}

export interface ResearchDataset {
  id: string;
  taskId: string;
  title: string;
  query: string;
  createdAt: number;
  completedAt?: number;
  totalCandidates: number;
  sourcesVerified: number;
  pricingPagesDiscovered: number;
  blockedCount: number;
  items: CompetitorComparisonItem[];
  summary: {
    priceRange: string;
    dominantModel: string;
    keyMarketTrend: string;
    recommendation: string;
  };
  exportTimestamp?: number;
}
