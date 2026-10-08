export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';
export type EvaluationStatus = 'passed' | 'failed' | 'review' | 'running' | 'pending';
export type EvaluationCategory = 
  | 'prompt_injection'
  | 'tool_misuse'
  | 'permission_escalation'
  | 'goal_drift'
  | 'hallucination'
  | 'untrusted_information'
  | 'conflicting_instructions'
  | 'unsafe_autonomous_action'
  | 'failure_recovery'
  | 'human_escalation';
export type FindingSeverity = 'critical' | 'high' | 'medium' | 'low';
export type FindingStatus = 'open' | 'investigating' | 'resolved' | 'ignored';
export type GuardrailStatus = 'active' | 'inactive' | 'testing' | 'draft';
export type ToolCallStatus = 'success' | 'failed' | 'blocked' | 'pending';
export type ScenarioDifficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  riskLevel: RiskLevel;
  parameters: Record<string, unknown>;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  actions: string[];
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  objective: string;
  systemInstructions: string;
  allowedTools: Tool[];
  permissions: Permission[];
  model: string;
  riskLevel: RiskLevel;
  configuration: AgentConfiguration;
  evaluationHistory: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AgentConfiguration {
  temperature: number;
  maxTokens: number;
  topP: number;
  systemPrompt?: string;
  allowedDomains?: string[];
  blockedDomains?: string[];
  maxToolCallsPerTurn?: number;
  requireHumanApprovalFor?: string[];
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  category: EvaluationCategory;
  difficulty: ScenarioDifficulty;
  riskLevel: RiskLevel;
  prompt: string;
  expectedBehavior: string;
  adversarialContent: string;
  targetTools: string[];
  tags: string[];
  passRate: number;
  lastRun: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ToolCall {
  id: string;
  toolId: string;
  toolName: string;
  arguments: Record<string, unknown>;
  result?: Record<string, unknown>;
  status: ToolCallStatus;
  timestamp: string;
  durationMs: number;
  error?: string;
}

export interface Observation {
  id: string;
  type: 'tool_call' | 'reasoning' | 'decision' | 'error' | 'policy_check';
  timestamp: string;
  input: string;
  output: string;
  metadata?: Record<string, unknown>;
  severity: FindingSeverity;
}

export interface Violation {
  id: string;
  category: EvaluationCategory;
  severity: FindingSeverity;
  description: string;
  evidence: string;
  expectedBehavior: string;
  observedBehavior: string;
  toolCallId?: string;
  observationId?: string;
}

export interface RiskFinding {
  id: string;
  category: EvaluationCategory;
  severity: FindingSeverity;
  title: string;
  description: string;
  evidence: string[];
  recommendation: string;
  guardrailSuggestion?: string;
  affectedTools: string[];
  createdAt: string;
}

export interface Score {
  overall: number;
  dimensions: {
    reliability: number;
    goalAlignment: number;
    toolSafety: number;
    permissionSafety: number;
    promptInjectionResistance: number;
    informationIntegrity: number;
    recovery: number;
    humanEscalation: number;
  };
  evidence: ScoreEvidence[];
}

export interface ScoreEvidence {
  dimension: keyof Score['dimensions'];
  findingId: string;
  impact: number;
  description: string;
}

export interface EvaluationRun {
  id: string;
  agentId: string;
  agentName: string;
  scenarioId: string;
  scenarioName: string;
  scenarioCategory: EvaluationCategory;
  status: EvaluationStatus;
  startedAt: string;
  completedAt?: string;
  durationMs?: number;
  toolCalls: ToolCall[];
  observations: Observation[];
  violations: Violation[];
  riskFindings: RiskFinding[];
  score?: Score;
  guardrailsGenerated: string[];
  retryCount: number;
  parentRunId?: string;
}

export interface Finding {
  id: string;
  evaluationRunId: string;
  agentId: string;
  agentName: string;
  scenarioId: string;
  scenarioName: string;
  category: EvaluationCategory;
  severity: FindingSeverity;
  status: FindingStatus;
  title: string;
  description: string;
  evidence: string[];
  recommendation: string;
  guardrailSuggestion?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface Guardrail {
  id: string;
  name: string;
  description: string;
  purpose: string;
  affectedAgents: string[];
  trigger: GuardrailTrigger;
  action: GuardrailAction;
  status: GuardrailStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  testResults?: GuardrailTestResult[];
}

export interface GuardrailTrigger {
  type: 'tool_call' | 'pattern_match' | 'permission_check' | 'content_analysis' | 'reasoning_analysis';
  condition: string;
  parameters: Record<string, unknown>;
}

export interface GuardrailAction {
  type: 'block' | 'warn' | 'require_approval' | 'log' | 'redirect' | 'modify';
  parameters: Record<string, unknown>;
  message?: string;
}

export interface GuardrailTestResult {
  evaluationRunId: string;
  passed: boolean;
  details: string;
  timestamp: string;
}

export interface ActivityEvent {
  id: string;
  type: 'evaluation_started' | 'evaluation_completed' | 'finding_detected' | 'guardrail_generated' | 'guardrail_applied' | 'agent_retested' | 'agent_passed' | 'human_review_requested' | 'scenario_created' | 'agent_created';
  timestamp: string;
  agentId?: string;
  agentName?: string;
  evaluationRunId?: string;
  scenarioId?: string;
  scenarioName?: string;
  findingId?: string;
  guardrailId?: string;
  message: string;
  metadata?: Record<string, unknown>;
}

export interface DashboardStats {
  agentsMonitored: number;
  totalEvaluations: number;
  criticalFindings: number;
  averageTrustScore: number;
  recentEvaluations: EvaluationRun[];
  topFindings: Finding[];
  trustScoreTrend: { date: string; score: number }[];
  categoryBreakdown: { category: EvaluationCategory; count: number; avgScore: number }[];
}

export interface ModelTier {
  id: 'fast' | 'balanced' | 'deep';
  name: string;
  model: string;
  description: string;
  useCases: string[];
  maxTokens: number;
  latencyMs: number;
}