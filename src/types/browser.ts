export type BrowserProfileType = 'personal' | 'work' | 'research' | 'testing' | 'isolated';

export interface BrowserProfile {
  id: string;
  name: string;
  type: BrowserProfileType;
  description: string;
  cookiesCount: number;
  localStorageKeys: number;
  status: 'connected' | 'idle' | 'syncing' | 'locked';
  lastUsed: number;
  isIsolated: boolean;
  userAgent: string;
  proxyLocation?: string;
}

export interface BrowserActionRequest {
  action: 'navigate' | 'click' | 'type' | 'select' | 'scroll' | 'wait' | 'extract' | 'screenshot';
  selector?: string;
  value?: string;
  url?: string;
  timeoutMs?: number;
  requiresSideEffectConfirmation?: boolean;
}

export interface BrowserSessionContext {
  sessionId: string;
  workerId: string;
  profileId: string;
  currentUrl: string;
  viewport: { width: number; height: number };
  activeTabs: number;
  cookiesAllowed: boolean;
  networkRequestsCount: number;
}
