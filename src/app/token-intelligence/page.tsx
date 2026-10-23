"use client";
export const dynamic = 'force-dynamic';

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Info, 
  ExternalLink, 
  Zap, 
  ShieldCheck, 
  Wrench
} from "lucide-react";
import { 
  MODEL_CATALOG, 
  USE_CASE_PRESETS, 
  getModelById, 
  getUseCasePreset 
} from "@/data/token-catalog";
import { 
  WorkloadInput, 
  PredictionBreakdown, 
  ModelComparisonResult, 
  UserBudgetConfig,
  ExecutionEnvironment
} from "@/types/token-intelligence";
import { 
  calculatePrediction, 
  compareAlternativeModels, 
  evaluateBudgetHealth 
} from "@/lib/token-engine";

export default function TokenIntelligencePage() {
  // Default workload: Autonomous Research Agent with Claude 3.5 Sonnet
  const [workload, setWorkload] = React.useState<WorkloadInput>({
    providerId: "anthropic",
    modelId: "claude-3-5-sonnet",
    environment: "direct_api",
    useCaseId: "agent_tools",
    isAgentWorkload: true,
    inputMethod: "guided",
    inputWords: 350,
    outputWords: 400,
    requestsPerDay: 40,
    toolCallsPerRequest: 3,
    toolSchemaOverheadTokens: 200,
    retrievalChunks: 0,
    tokensPerChunk: 400,
    planningHorizonDays: 30
  });

  // User budget configuration
  const [budget, setBudget] = React.useState<UserBudgetConfig>({
    monthlyTokenBudget: 5_000_000,
    monthlySpendingBudgetUSD: 50.00,
    warningThresholdPercent: 80
  });

  const [copyFeedback, setCopyFeedback] = React.useState(false);

  // Compute prediction & comparisons
  const prediction: PredictionBreakdown = React.useMemo(() => {
    return calculatePrediction(workload);
  }, [workload]);

  const comparisons: ModelComparisonResult[] = React.useMemo(() => {
    return compareAlternativeModels(workload, prediction);
  }, [workload, prediction]);

  const budgetHealth = React.useMemo(() => {
    return evaluateBudgetHealth(
      prediction.estimatedMonthlyCostUSD,
      prediction.monthlyTotalTokens,
      budget
    );
  }, [prediction, budget]);

  const activeModel = getModelById(workload.modelId);
  const activeUseCase = getUseCasePreset(workload.useCaseId);

  // Switch use case preset
  const handleUseCaseChange = (useCaseId: string) => {
    const preset = getUseCasePreset(useCaseId);
    setWorkload(prev => ({
      ...prev,
      useCaseId: preset.id,
      inputWords: preset.defaultPromptWords,
      outputWords: preset.defaultOutputWords,
      requestsPerDay: preset.defaultRequestsPerDay,
      isAgentWorkload: preset.id === 'agent_tools',
      toolCallsPerRequest: preset.defaultToolCallsPerTurn ?? 0,
      retrievalChunks: preset.defaultRetrievalChunks ?? 0,
      tokensPerChunk: preset.defaultChunkTokens ?? 400,
      // If model not in recommended list, switch to primary recommendation
      modelId: preset.recommendedModelIds.includes(prev.modelId) ? prev.modelId : preset.recommendedModelIds[0]
    }));
  };

  // Switch model
  const handleModelChange = (modelId: string) => {
    const m = getModelById(modelId);
    setWorkload(prev => ({
      ...prev,
      modelId: m.id,
      providerId: m.providerId
    }));
  };

  // Export report to clipboard
  const handleCopyReport = () => {
    const reportText = `### TrustMesh AI Token Intelligence Report
Generated: ${new Date().toISOString().slice(0, 10)}
Workload: ${activeUseCase.name}
Model: ${activeModel.name} (${activeModel.providerName})
Execution Mode: ${workload.environment}

--- Estimation Breakdown ---
• Input Tokens / Request: ~${prediction.totalInputTokensPerRequest.toLocaleString()}
• Output Tokens / Request: ~${prediction.outputTokensPerRequest.toLocaleString()}
• Total Tokens / Request: ~${prediction.totalTokensPerRequest.toLocaleString()} (±${prediction.uncertaintyMarginTokens} uncertainty)
• Context Window Utilization: ${prediction.contextWindowUtilizationPercent}% of ${activeModel.contextWindowTokens.toLocaleString()}
• Daily Volume: ${prediction.dailyTotalTokens.toLocaleString()} tokens (${workload.requestsPerDay} requests)
• Monthly Projected Volume: ${prediction.monthlyTotalTokens.toLocaleString()} tokens (${workload.planningHorizonDays} days)

--- Cost Projections (Catalog Reference Rates, Not Live Billing) ---
• Estimated Cost / Request: ${prediction.estimatedCostPerRequestUSD !== null ? `$${prediction.estimatedCostPerRequestUSD}` : 'N/A'}
• Estimated Monthly Spend: ${prediction.estimatedMonthlyCostUSD !== null ? `$${prediction.estimatedMonthlyCostUSD}` : 'N/A'}
• Catalog Source: ${activeModel.pricing.sourceUrl} (Snapshot: ${activeModel.pricing.lastVerifiedDate}; verify before purchase)

--- Budget Health ---
• User Monthly Token Budget: ${budget.monthlyTokenBudget.toLocaleString()} tokens (${budgetHealth.tokenPercent}% utilized)
• User Spending Budget: $${budget.monthlySpendingBudgetUSD} (${budgetHealth.spendPercent}% utilized)
• Status: ${budgetHealth.isOverSpendBudget ? 'EXCEEDED' : budgetHealth.isNearWarningThreshold ? 'NEAR THRESHOLD' : 'HEALTHY'}
`;

    navigator.clipboard.writeText(reportText);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <Calculator className="h-7 w-7 text-violet-400" />
                <span>AI Token Intelligence & Model Optimizer</span>
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-violet-500/30 bg-violet-500/10 text-violet-300">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                Deterministic Local Engine
              </span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Estimate context consumption, multi-turn agent overhead, and spend using a local reference-rate catalog. No provider account, billing, or quota data is connected.
            </p>
            <div className="mt-3 inline-flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-wide text-white/70">
              <span className="rounded border border-white/15 bg-white/5 px-2 py-1">Estimate mode</span>
              <span className="rounded border border-white/15 bg-white/5 px-2 py-1">Local usage: unavailable</span>
              <span className="rounded border border-white/15 bg-white/5 px-2 py-1">Provider reporting: unavailable</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleCopyReport}
              variant="outline"
              size="sm"
              className="h-9 px-3.5 text-xs border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] flex items-center gap-2 text-white"
            >
              {copyFeedback ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Report Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-violet-400" />
                  <span>Export Prediction Report</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Use-Case Presets Quick Switch Bar */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            <span>Select Target Workload Archetype</span>
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {USE_CASE_PRESETS.map((preset) => {
              const isSelected = workload.useCaseId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleUseCaseChange(preset.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium shrink-0 transition-all flex items-center gap-2 ${
                    isSelected
                      ? "bg-gradient-to-r from-violet-600/30 to-violet-500/20 text-white border border-violet-500/50 shadow-sm"
                      : "bg-[#090A0E] text-muted-foreground hover:text-white border border-white/[0.07] hover:border-white/[0.15]"
                  }`}
                >
                  <span>{preset.name}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-muted-foreground font-mono">
            {activeUseCase.description}
          </p>
        </div>

        {/* Two-Column Grid: Workload Configurator (Left) & Live Prediction Breakdown (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (5 cols): Workload Parameters */}
          <div className="lg:col-span-5 space-y-5 p-5 md:p-6 rounded-xl border border-white/[0.08] bg-[#090A0E]">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Wrench className="h-4 w-4 text-violet-400" />
                <span>Workload Parameters</span>
              </h3>
              <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground bg-white/[0.03] p-1 rounded border border-white/[0.06]">
                <button
                  onClick={() => setWorkload(prev => ({ ...prev, inputMethod: 'guided' }))}
                  className={`px-2 py-0.5 rounded ${workload.inputMethod === 'guided' ? 'bg-violet-600 text-white font-semibold' : 'hover:text-white'}`}
                >
                  Guided
                </button>
                <button
                  onClick={() => setWorkload(prev => ({ ...prev, inputMethod: 'technical' }))}
                  className={`px-2 py-0.5 rounded ${workload.inputMethod === 'technical' ? 'bg-violet-600 text-white font-semibold' : 'hover:text-white'}`}
                >
                  Manual Tokens
                </button>
              </div>
            </div>

            {/* Provider & Model Selectors */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-muted-foreground font-medium">
                  AI Model Selection
                </label>
                <select
                  value={workload.modelId}
                  onChange={(e) => handleModelChange(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-white/[0.03] border border-white/[0.1] text-xs font-medium text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                >
                  {MODEL_CATALOG.map((m) => (
                    <option key={m.id} value={m.id} className="bg-[#0C0E14] text-white">
                      {m.providerName} — {m.name} ({m.isLocal ? 'Local Free' : `$${m.pricing.inputPerMillionUSD}/$${m.pricing.outputPerMillionUSD}`})
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                  <span>Context: {activeModel.contextWindowTokens.toLocaleString()} tokens</span>
                  <span>Verified: {activeModel.pricing.lastVerifiedDate}</span>
                </div>
              </div>

              {/* Execution Environment */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-muted-foreground font-medium">
                  Execution Topology
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'direct_api', label: 'Direct API' },
                    { id: 'gateway', label: 'Nexus Gateway' },
                    { id: 'local_ollama', label: 'Ollama Local' },
                  ].map((env) => (
                    <button
                      key={env.id}
                      onClick={() => setWorkload(prev => ({ ...prev, environment: env.id as ExecutionEnvironment }))}
                      className={`p-2 rounded-lg text-[11px] font-medium border text-center transition-all ${
                        workload.environment === env.id
                          ? "bg-violet-600/20 text-white border-violet-500/50 shadow-sm"
                          : "bg-white/[0.02] text-muted-foreground hover:text-white border-white/[0.06]"
                      }`}
                    >
                      {env.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Prompt & Output Length Inputs */}
            <div className="space-y-4 pt-2 border-t border-white/[0.06]">
              {workload.inputMethod === 'guided' ? (
                <>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-medium">Prompt Length (Estimated Words)</span>
                      <span className="font-mono text-white font-semibold">{workload.inputWords} words</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="10000"
                      step="50"
                      value={workload.inputWords}
                      onChange={(e) => setWorkload(prev => ({ ...prev, inputWords: parseInt(e.target.value) || 50 }))}
                      className="w-full accent-violet-500 h-1.5 bg-white/[0.1] rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                      <span>Brief query (50w)</span>
                      <span>Doc (2,000w)</span>
                      <span>Codebase (10,000w)</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-medium">Expected Generation (Output Words)</span>
                      <span className="font-mono text-white font-semibold">{workload.outputWords} words</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="4000"
                      step="20"
                      value={workload.outputWords}
                      onChange={(e) => setWorkload(prev => ({ ...prev, outputWords: parseInt(e.target.value) || 20 }))}
                      className="w-full accent-violet-500 h-1.5 bg-white/[0.1] rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                      <span>Short (50w)</span>
                      <span>Standard (400w)</span>
                      <span>Long-form (4,000w)</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-muted-foreground">Input Tokens</label>
                    <Input
                      type="number"
                      value={workload.inputTokensManual ?? Math.round(workload.inputWords * 1.33)}
                      onChange={(e) => setWorkload(prev => ({ ...prev, inputTokensManual: parseInt(e.target.value) || 100 }))}
                      className="h-8 text-xs font-mono bg-black/40 border-white/[0.08] text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-muted-foreground">Output Tokens</label>
                    <Input
                      type="number"
                      value={workload.outputTokensManual ?? Math.round(workload.outputWords * 1.33)}
                      onChange={(e) => setWorkload(prev => ({ ...prev, outputTokensManual: parseInt(e.target.value) || 100 }))}
                      className="h-8 text-xs font-mono bg-black/40 border-white/[0.08] text-white"
                    />
                  </div>
                </div>
              )}

              {/* Request Frequency */}
              <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Daily Request Volume</span>
                  <span className="font-mono text-white font-semibold">{workload.requestsPerDay} req / day</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="500"
                  step="5"
                  value={workload.requestsPerDay}
                  onChange={(e) => setWorkload(prev => ({ ...prev, requestsPerDay: parseInt(e.target.value) || 1 }))}
                  className="w-full accent-violet-500 h-1.5 bg-white/[0.1] rounded-lg cursor-pointer"
                />
              </div>

              {/* Agent & Tool Configuration Toggle */}
              <div className="pt-2 border-t border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">Agent Multi-Turn & Tool Overhead</span>
                    <span className="text-[11px] text-muted-foreground">Simulates tool schemas and JSON observations.</span>
                  </div>
                  <Switch
                    checked={workload.isAgentWorkload}
                    onCheckedChange={(checked) => setWorkload(prev => ({ ...prev, isAgentWorkload: checked }))}
                  />
                </div>

                {workload.isAgentWorkload && (
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-mono">Tool Invocations per Turn</span>
                      <span className="font-mono text-violet-300 font-semibold">{workload.toolCallsPerRequest} calls</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={workload.toolCallsPerRequest}
                      onChange={(e) => setWorkload(prev => ({ ...prev, toolCallsPerRequest: parseInt(e.target.value) || 1 }))}
                      className="w-full accent-violet-500 h-1.5 bg-white/[0.1] rounded-lg cursor-pointer"
                    />
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Right Column (7 cols): Prediction Results & Calculations */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Primary KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#090A0E]">
                <span className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
                  Tokens / Turn
                </span>
                <div className="text-2xl font-bold font-mono text-white">
                  ~{prediction.totalTokensPerRequest.toLocaleString()}
                </div>
                <span className="text-[10px] text-muted-foreground font-mono mt-1 block">
                  ±{prediction.uncertaintyMarginTokens} tokens margin
                </span>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#090A0E]">
                <span className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
                  Monthly Consumption
                </span>
                <div className="text-2xl font-bold font-mono text-violet-300">
                  {(prediction.monthlyTotalTokens / 1_000_000).toFixed(2)}M
                </div>
                <span className="text-[10px] text-muted-foreground font-mono mt-1 block">
                  {prediction.monthlyTotalTokens.toLocaleString()} total tokens
                </span>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#090A0E]">
                <span className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
                  Estimated Monthly Spend
                </span>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {prediction.estimatedMonthlyCostUSD !== null ? `$${prediction.estimatedMonthlyCostUSD.toFixed(2)}` : 'Free / Local'}
                </div>
                <span className="text-[10px] text-muted-foreground font-mono mt-1 block">
                  {activeModel.isLocal ? 'Zero API cost (Ollama)' : `$${prediction.estimatedDailyCostUSD?.toFixed(2)} / day`}
                </span>
              </div>

            </div>

            {/* Context Window Utilization Card */}
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">Context Window Capacity</span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    ({prediction.totalTokensPerRequest.toLocaleString()} / {activeModel.contextWindowTokens.toLocaleString()} tokens)
                  </span>
                </div>
                <span className={`font-mono text-xs font-semibold ${
                  prediction.isExceedingContext ? 'text-red-400' :
                  prediction.contextWindowUtilizationPercent > 70 ? 'text-yellow-400' :
                  'text-emerald-400'
                }`}>
                  {prediction.contextWindowUtilizationPercent}% Utilized
                </span>
              </div>

              <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    prediction.isExceedingContext ? 'bg-red-500' :
                    prediction.contextWindowUtilizationPercent > 70 ? 'bg-yellow-500' :
                    'bg-gradient-to-r from-violet-600 to-emerald-400'
                  }`}
                  style={{ width: `${prediction.contextWindowUtilizationPercent}%` }}
                />
              </div>

              {prediction.isExceedingContext && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                  <span>
                    Warning: Workload exceeds this model&apos;s context limit of {activeModel.contextWindowTokens.toLocaleString()} tokens. Model calls will fail or truncate. Switch to Gemini 1.5 Pro (2M context) or Claude 3.5 Sonnet (200k context).
                  </span>
                </div>
              )}
            </div>

            {/* Granular Token Breakdown Table */}
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center justify-between">
                <span>Granular Token Composition Breakdown</span>
                <span className="text-[10px] text-violet-400 font-mono">BPE Heuristic (0.75w/t)</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-white/[0.04]">
                  <span className="text-muted-foreground">Base User Prompt</span>
                  <span className="font-mono text-white">~{prediction.promptTokens.toLocaleString()} tokens</span>
                </div>

                {prediction.retrievalTokens > 0 && (
                  <div className="flex items-center justify-between py-1.5 border-b border-white/[0.04]">
                    <span className="text-muted-foreground">RAG Knowledge Chunks ({workload.retrievalChunks} chunks)</span>
                    <span className="font-mono text-zinc-300">~{prediction.retrievalTokens.toLocaleString()} tokens</span>
                  </div>
                )}

                {workload.isAgentWorkload && (
                  <>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/[0.04]">
                      <span className="text-muted-foreground">Tool Schemas in System Prompt</span>
                      <span className="font-mono text-violet-300">~{prediction.toolSchemaTokens} tokens</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/[0.04]">
                      <span className="text-muted-foreground">Tool JSON Invocations & Output ({workload.toolCallsPerRequest} calls)</span>
                      <span className="font-mono text-violet-300">~{prediction.toolExecutionTokens} tokens</span>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between py-1.5 border-b border-white/[0.04]">
                  <span className="text-muted-foreground">Generated Response Output</span>
                  <span className="font-mono text-emerald-400 font-semibold">~{prediction.outputTokensPerRequest.toLocaleString()} tokens</span>
                </div>

                <div className="flex items-center justify-between py-2 font-semibold">
                  <span className="text-white">Total Single-Session Turn</span>
                  <span className="font-mono text-violet-400">~{prediction.totalTokensPerRequest.toLocaleString()} tokens</span>
                </div>
              </div>
            </div>

            {/* Pricing Transparency & Verification Info */}
            <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-between text-[11px] text-muted-foreground font-mono">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-violet-400 shrink-0" />
                <span>
                  Catalog rate: ${activeModel.pricing.inputPerMillionUSD}/M input • ${activeModel.pricing.outputPerMillionUSD}/M output • snapshot {activeModel.pricing.lastVerifiedDate}
                </span>
              </div>
              <a 
                href={activeModel.pricing.sourceUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-violet-400 hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <span>Official Source</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

          </div>

        </div>

        {/* Model Optimization & Recommendations Matrix */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.07] pb-3">
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Zap className="h-4 w-4 text-violet-400" />
                <span>Model Optimization & Cross-Provider Recommendations</span>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Suitability comparison using catalog-rate estimates, context size, and declared model characteristics. It is not a live provider recommendation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisons.slice(0, 6).map((comp) => {
              const isSelected = comp.model.id === workload.modelId;

              return (
                <div
                  key={comp.model.id}
                  className={`p-5 rounded-xl border flex flex-col justify-between transition-all space-y-4 ${
                    isSelected
                      ? "border-violet-500/60 bg-violet-950/10 shadow-lg shadow-violet-950/20"
                      : "border-white/[0.08] bg-[#090A0E] hover:border-white/[0.15]"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Badge Strip */}
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">
                        {comp.model.providerName}
                      </span>
                      {comp.isRecommendedBestBalance && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-violet-600/20 text-violet-300 border border-violet-500/40 uppercase font-semibold">
                          Best Balance
                        </span>
                      )}
                      {comp.isRecommendedLowestCost && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-semibold">
                          Lowest Catalog Estimate
                        </span>
                      )}
                      {comp.isRecommendedLocal && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 uppercase font-semibold">
                          Private Local
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white">{comp.model.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                        {comp.reasoning}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Monthly Projected Spend</span>
                        <span className="font-mono text-white font-semibold">
                          {comp.estimatedMonthlyCostUSD !== null ? `$${comp.estimatedMonthlyCostUSD.toFixed(2)}` : 'Free'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Context Window</span>
                        <span className="font-mono text-zinc-300">
                          {Math.round(comp.model.contextWindowTokens / 1000)}k tokens
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Capability Rating</span>
                        <span className="font-mono text-violet-400 font-semibold">{comp.model.relativeQualityScore}/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    {isSelected ? (
                      <Button disabled className="w-full h-8 text-xs bg-violet-600/30 text-violet-200 border border-violet-500/40">
                        Selected Model
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleModelChange(comp.model.id)}
                        variant="outline"
                        className="w-full h-8 text-xs border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.06] text-white"
                      >
                        Select for Comparison
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* User Spending Budgets & Governance */}
        <div className="p-6 rounded-xl border border-white/[0.08] bg-[#090A0E] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Budget Thresholds & Governance Controls</span>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Set client-side budget caps to track projected spend against allocation limits.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded border uppercase ${
                budgetHealth.isOverSpendBudget ? 'text-red-400 bg-red-500/10 border-red-500/30' :
                budgetHealth.isNearWarningThreshold ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' :
                'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
              }`}>
                {budgetHealth.isOverSpendBudget ? 'Budget Exceeded' : budgetHealth.isNearWarningThreshold ? 'Warning Threshold' : 'Budget Healthy'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium">Monthly Financial Spending Cap (USD)</span>
                <span className="font-mono text-white font-semibold">${budget.monthlySpendingBudgetUSD}</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={budget.monthlySpendingBudgetUSD}
                onChange={(e) => setBudget(prev => ({ ...prev, monthlySpendingBudgetUSD: parseFloat(e.target.value) || 10 }))}
                className="w-full accent-violet-500 h-1.5 bg-white/[0.1] rounded-lg cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-1">
                <span>Projected Spend: ${prediction.estimatedMonthlyCostUSD?.toFixed(2) ?? '0.00'}</span>
                <span>{budgetHealth.spendPercent}% of cap</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium">Monthly Token Budget Volume</span>
                <span className="font-mono text-white font-semibold">{(budget.monthlyTokenBudget / 1_000_000).toFixed(1)}M tokens</span>
              </div>
              <input
                type="range"
                min="1000000"
                max="50000000"
                step="500000"
                value={budget.monthlyTokenBudget}
                onChange={(e) => setBudget(prev => ({ ...prev, monthlyTokenBudget: parseInt(e.target.value) || 1000000 }))}
                className="w-full accent-violet-500 h-1.5 bg-white/[0.1] rounded-lg cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-1">
                <span>Projected Consumption: {(prediction.monthlyTotalTokens / 1_000_000).toFixed(2)}M tokens</span>
                <span>{budgetHealth.tokenPercent}% of cap</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[11px] text-muted-foreground font-mono space-y-1">
            <span className="text-zinc-300 font-semibold block">Telemetry Distinction Notice:</span>
            <p>
              • <strong>Estimated Usage:</strong> Calculated deterministically from the workload controls and heuristic token ratios. It is not an exact tokenizer result.
            </p>
            <p>
              • <strong>Catalog-Rate Spend:</strong> Cost projections multiply estimated tokens by the local catalog snapshot shown above. Verify the linked official pricing page before making a purchase decision.
            </p>
            <p>
              • <strong>Locally Tracked Usage:</strong> Not connected in this demo. <strong>Verified Provider-Reported Usage:</strong> Unavailable until a provider integration explicitly returns usage or billing data.
            </p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
