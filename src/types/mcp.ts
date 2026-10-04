export interface McpToolParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description: string;
  required: boolean;
  default?: any;
}

export interface McpToolDefinition {
  name: string;
  description: string;
  parameters: McpToolParameter[];
  returnSchema: string;
  exampleCall: Record<string, any>;
  exampleResponse: Record<string, any>;
}

export interface McpExecutionLog {
  id: string;
  toolName: string;
  timestamp: number;
  input: Record<string, any>;
  output: Record<string, any>;
  latencyMs: number;
  status: 'success' | 'error';
}
