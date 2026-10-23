export type AIProviderId = 
  | 'openai' 
  | 'anthropic' 
  | 'google' 
  | 'xai' 
  | 'deepseek' 
  | 'nvidia' 
  | 'ollama';

export type ExecutionEnvironment = 'direct_api' | 'gateway' | 'local_ollama';

export type UseCaseId = 
  | 'chat'
  | 'coding'
  | 'research'
  | 'doc_analysis'
  | 'rag'
  | 'agent_tools'
  | 'classification'
  | 'long_context';

export interface ModelPricing {
  inputPerMillionUSD: number;
  outputPerMillionUSD: number;
  sourceUrl: string;
  lastVerifiedDate: string;
  isEstimateOrFree?: boolean;
}

export interface ModelMetadata {
  id: string;
  name: string;
  providerId: AIProviderId;
  providerName: string;
  description: string;
  contextWindowTokens: number;
  maxOutputTokens: number;
  pricing: ModelPricing;
  isLocal: boolean;
  strengths: string[];
  tradeoffs: string[];
  recommendedUseCases: UseCaseId[];
  relativeQualityScore: number; // 1-100 qualitative capability rating
  typicalSpeedTokensPerSec?: number;
}

export interface UseCasePreset {
  id: UseCaseId;
  name: string;
  description: string;
  defaultPromptWords: number;
  defaultOutputWords: number;
  defaultRequestsPerDay: number;
  defaultToolCallsPerTurn?: number;
  defaultRetrievalChunks?: number;
  defaultChunkTokens?: number;
  recommendedModelIds: string[];
}

export interface WorkloadInput {
  providerId: AIProviderId;
  modelId: string;
  environment: ExecutionEnvironment;
  useCaseId: UseCaseId;
  isAgentWorkload: boolean;
  
  // Workload volume inputs
  inputMethod: 'guided' | 'technical';
  inputWords: number;
  inputTokensManual?: number;
  outputWords: number;
  outputTokensManual?: number;
  requestsPerDay: number;
  
  // Agent & RAG specifics
  toolCallsPerRequest: number;
  toolSchemaOverheadTokens: number;
  retrievalChunks: number;
  tokensPerChunk: number;
  
  // Planning horizon
  planningHorizonDays: number; // e.g. 30 for monthly
}

export interface PredictionBreakdown {
  promptTokens: number;
  retrievalTokens: number;
  toolSchemaTokens: number;
  toolExecutionTokens: number;
  totalInputTokensPerRequest: number;
  outputTokensPerRequest: number;
  totalTokensPerRequest: number;
  
  dailyInputTokens: number;
  dailyOutputTokens: number;
  dailyTotalTokens: number;
  
  monthlyInputTokens: number;
  monthlyOutputTokens: number;
  monthlyTotalTokens: number;
  
  estimatedCostPerRequestUSD: number | null;
  estimatedDailyCostUSD: number | null;
  estimatedMonthlyCostUSD: number | null;
  
  contextWindowUtilizationPercent: number;
  isExceedingContext: boolean;
  
  uncertaintyMarginTokens: number; // e.g. ±15%
  tokenizationMethod: 'exact' | 'approximate_bpe' | 'words_heuristic';
}

export interface ModelComparisonResult {
  model: ModelMetadata;
  estimatedTokensPerRequest: number;
  estimatedMonthlyTokens: number;
  estimatedMonthlyCostUSD: number | null;
  contextUtilizationPercent: number;
  isExceedingContext: boolean;
  isRecommendedBestBalance?: boolean;
  isRecommendedLowestCost?: boolean;
  isRecommendedLocal?: boolean;
  suitabilityScore: number; // 0-100
  reasoning: string;
}

export interface UserBudgetConfig {
  monthlyTokenBudget: number;
  monthlySpendingBudgetUSD: number;
  warningThresholdPercent: number; // e.g. 80
}
