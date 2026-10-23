import { 
  WorkloadInput, 
  PredictionBreakdown, 
  ModelComparisonResult,
  UserBudgetConfig 
} from "@/types/token-intelligence";
import { MODEL_CATALOG, getModelById } from "@/data/token-catalog";

/**
 * Standard Byte-Pair Encoding (BPE) ratio approximations:
 * English prose: ~1.33 tokens per word (0.75 words per token)
 * Source code / JSON payloads: ~1.65 tokens per word
 */
export const TOKENS_PER_WORD_PROSE = 1.333;
export const TOKENS_PER_WORD_CODE = 1.65;

export function calculatePrediction(input: WorkloadInput): PredictionBreakdown {
  const model = getModelById(input.modelId);
  const isCoding = input.useCaseId === 'coding';
  const ratio = isCoding ? TOKENS_PER_WORD_CODE : TOKENS_PER_WORD_PROSE;

  // 1. Base prompt tokens
  const promptTokens = input.inputMethod === 'technical' && input.inputTokensManual !== undefined
    ? input.inputTokensManual
    : Math.round(input.inputWords * ratio);

  // 2. Retrieval tokens (for RAG / Document Analysis)
  const retrievalTokens = (input.retrievalChunks > 0 && input.tokensPerChunk > 0)
    ? input.retrievalChunks * input.tokensPerChunk
    : 0;

  // 3. Tool schemas and execution overhead for AI agents
  let toolSchemaTokens = 0;
  let toolExecutionTokens = 0;

  if (input.isAgentWorkload) {
    // Model receives tool schemas in system prompt (approx 180 tokens per tool)
    toolSchemaTokens = input.toolSchemaOverheadTokens || 200;
    // Each tool call produces a JSON argument payload + JSON result observation (~250 tokens per call)
    toolExecutionTokens = input.toolCallsPerRequest * 250;
  }

  // Total input tokens per turn
  const totalInputTokensPerRequest = promptTokens + retrievalTokens + toolSchemaTokens + toolExecutionTokens;

  // Output tokens per turn
  const outputTokensPerRequest = input.inputMethod === 'technical' && input.outputTokensManual !== undefined
    ? input.outputTokensManual
    : Math.round(input.outputWords * ratio);

  const totalTokensPerRequest = totalInputTokensPerRequest + outputTokensPerRequest;

  // Planning horizon projections
  const daysInHorizon = input.planningHorizonDays || 30;
  const dailyInputTokens = totalInputTokensPerRequest * input.requestsPerDay;
  const dailyOutputTokens = outputTokensPerRequest * input.requestsPerDay;
  const dailyTotalTokens = totalTokensPerRequest * input.requestsPerDay;

  const monthlyInputTokens = dailyInputTokens * daysInHorizon;
  const monthlyOutputTokens = dailyOutputTokens * daysInHorizon;
  const monthlyTotalTokens = dailyTotalTokens * daysInHorizon;

  // Context window calculation
  const contextWindowUtilizationPercent = Math.min(
    100, 
    parseFloat(((totalTokensPerRequest / model.contextWindowTokens) * 100).toFixed(2))
  );
  const isExceedingContext = totalTokensPerRequest > model.contextWindowTokens;

  // Cost calculation based on verified per-million token pricing
  let estimatedCostPerRequestUSD: number | null = null;
  let estimatedDailyCostUSD: number | null = null;
  let estimatedMonthlyCostUSD: number | null = null;

  if (model.isLocal) {
    // Local Ollama models have zero API token costs
    estimatedCostPerRequestUSD = 0.00;
    estimatedDailyCostUSD = 0.00;
    estimatedMonthlyCostUSD = 0.00;
  } else if (model.pricing) {
    const inputCostPerToken = model.pricing.inputPerMillionUSD / 1_000_000;
    const outputCostPerToken = model.pricing.outputPerMillionUSD / 1_000_000;

    const requestCost = (totalInputTokensPerRequest * inputCostPerToken) + (outputTokensPerRequest * outputCostPerToken);
    estimatedCostPerRequestUSD = parseFloat(requestCost.toFixed(5));
    estimatedDailyCostUSD = parseFloat((requestCost * input.requestsPerDay).toFixed(3));
    estimatedMonthlyCostUSD = parseFloat((requestCost * input.requestsPerDay * daysInHorizon).toFixed(2));
  }

  // Uncertainty margin: ±15% variance based on prompt formatting & tokenizer differences
  const uncertaintyMarginTokens = Math.round(totalTokensPerRequest * 0.15);

  return {
    promptTokens,
    retrievalTokens,
    toolSchemaTokens,
    toolExecutionTokens,
    totalInputTokensPerRequest,
    outputTokensPerRequest,
    totalTokensPerRequest,
    dailyInputTokens,
    dailyOutputTokens,
    dailyTotalTokens,
    monthlyInputTokens,
    monthlyOutputTokens,
    monthlyTotalTokens,
    estimatedCostPerRequestUSD,
    estimatedDailyCostUSD,
    estimatedMonthlyCostUSD,
    contextWindowUtilizationPercent,
    isExceedingContext,
    uncertaintyMarginTokens,
    tokenizationMethod: input.inputMethod === 'technical' ? 'approximate_bpe' : 'words_heuristic'
  };
}

/**
 * Compare alternative models in the catalog against the active workload.
 */
export function compareAlternativeModels(
  currentInput: WorkloadInput, 
  currentBreakdown: PredictionBreakdown
): ModelComparisonResult[] {
  const results: ModelComparisonResult[] = MODEL_CATALOG.map((candidate) => {
    const totalTokensPerReq = currentBreakdown.totalTokensPerRequest;
    const monthlyTokens = currentBreakdown.monthlyTotalTokens;
    const contextUtil = parseFloat(((totalTokensPerReq / candidate.contextWindowTokens) * 100).toFixed(2));
    const isExceeding = totalTokensPerReq > candidate.contextWindowTokens;

    let monthlyCost: number | null = null;
    if (candidate.isLocal) {
      monthlyCost = 0.00;
    } else {
      const inCost = (currentBreakdown.monthlyInputTokens * candidate.pricing.inputPerMillionUSD) / 1_000_000;
      const outCost = (currentBreakdown.monthlyOutputTokens * candidate.pricing.outputPerMillionUSD) / 1_000_000;
      monthlyCost = parseFloat((inCost + outCost).toFixed(2));
    }

    // Suitability algorithm grounded in context fit, quality score, and cost
    let suitability = candidate.relativeQualityScore;
    if (isExceeding) {
      suitability = Math.max(10, suitability - 60);
    } else if (contextUtil > 75) {
      suitability -= 15;
    }

    let reasoning = "";
    if (candidate.id === currentInput.modelId) {
      reasoning = "Currently selected model for this workload projection.";
    } else if (candidate.isLocal) {
      reasoning = "100% private, zero API spend running on local Ollama runtime.";
    } else if (monthlyCost !== null && monthlyCost < 5.0) {
      reasoning = "Ultra-economical option with strong throughput for structured tasks.";
    } else if (candidate.relativeQualityScore >= 95) {
      reasoning = "Frontier model recommended when complex multi-step reasoning is paramount.";
    } else {
      reasoning = `Balanced ${candidate.providerName} model with ${Math.round(candidate.contextWindowTokens / 1000)}k token context window.`;
    }

    return {
      model: candidate,
      estimatedTokensPerRequest: totalTokensPerReq,
      estimatedMonthlyTokens: monthlyTokens,
      estimatedMonthlyCostUSD: monthlyCost,
      contextUtilizationPercent: Math.min(100, contextUtil),
      isExceedingContext: isExceeding,
      suitabilityScore: suitability,
      reasoning
    };
  });

  // Identify best balance, lowest cost, and local picks
  const nonLocal = results.filter(r => !r.model.isLocal && !r.isExceedingContext);
  
  if (nonLocal.length > 0) {
    // Lowest cost cloud model
    const lowestCost = [...nonLocal].sort((a, b) => (a.estimatedMonthlyCostUSD ?? 9999) - (b.estimatedMonthlyCostUSD ?? 9999))[0];
    if (lowestCost) lowestCost.isRecommendedLowestCost = true;

    // Best quality/cost balance (score / cost)
    const bestBalance = [...nonLocal].sort((a, b) => {
      const costA = Math.max(0.5, a.estimatedMonthlyCostUSD ?? 10);
      const costB = Math.max(0.5, b.estimatedMonthlyCostUSD ?? 10);
      const ratioA = a.model.relativeQualityScore / Math.sqrt(costA);
      const ratioB = b.model.relativeQualityScore / Math.sqrt(costB);
      return ratioB - ratioA;
    })[0];
    if (bestBalance && bestBalance.model.id !== lowestCost?.model.id) {
      bestBalance.isRecommendedBestBalance = true;
    }
  }

  const localPick = results.find(r => r.model.isLocal && !r.isExceedingContext);
  if (localPick) localPick.isRecommendedLocal = true;

  // Sort: current model first, then by suitability
  return results.sort((a, b) => {
    if (a.model.id === currentInput.modelId) return -1;
    if (b.model.id === currentInput.modelId) return 1;
    return b.suitabilityScore - a.suitabilityScore;
  });
}

/**
 * Assess user budget usage against predictions
 */
export function evaluateBudgetHealth(
  estimatedMonthlySpend: number | null, 
  estimatedMonthlyTokens: number,
  budget: UserBudgetConfig
) {
  const spendPercent = estimatedMonthlySpend !== null && budget.monthlySpendingBudgetUSD > 0
    ? parseFloat(((estimatedMonthlySpend / budget.monthlySpendingBudgetUSD) * 100).toFixed(1))
    : 0;

  const tokenPercent = budget.monthlyTokenBudget > 0
    ? parseFloat(((estimatedMonthlyTokens / budget.monthlyTokenBudget) * 100).toFixed(1))
    : 0;

  const isOverSpendBudget = estimatedMonthlySpend !== null && estimatedMonthlySpend > budget.monthlySpendingBudgetUSD;
  const isOverTokenBudget = estimatedMonthlyTokens > budget.monthlyTokenBudget;
  const isNearWarningThreshold = spendPercent >= budget.warningThresholdPercent || tokenPercent >= budget.warningThresholdPercent;

  return {
    spendPercent,
    tokenPercent,
    isOverSpendBudget,
    isOverTokenBudget,
    isNearWarningThreshold,
    remainingSpendUSD: estimatedMonthlySpend !== null 
      ? Math.max(0, budget.monthlySpendingBudgetUSD - estimatedMonthlySpend) 
      : null,
    remainingTokens: Math.max(0, budget.monthlyTokenBudget - estimatedMonthlyTokens)
  };
}
