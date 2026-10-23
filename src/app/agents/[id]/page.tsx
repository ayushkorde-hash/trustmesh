"use client";
export const dynamic = 'force-dynamic';

import * as React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  ArrowLeft, 
  ShieldCheck, 
  Activity, 
  Terminal, 
  History, 
  Wrench, 
  Lock
} from "lucide-react";
import { getAgentById, MOCK_GUARDRAILS, MOCK_EVALUATIONS } from "@/data/mock-data";

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const agent = getAgentById(id);

  if (!agent) {
    return (
      <DashboardLayout>
        <div className="p-8 max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-xl font-bold text-white">Agent Not Found</h2>
          <p className="text-sm text-muted-foreground">No agent matches the identifier &apos;{id}&apos;.</p>
          <Link href="/agents">
            <Button variant="outline" size="sm">Back to Agents</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const agentGuardrails = MOCK_GUARDRAILS.filter(g => g.affectedAgents.includes(agent.id));
  const agentEvaluations = MOCK_EVALUATIONS.filter(e => e.agentId === agent.id);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div>
          <Link href="/agents" className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-white transition-colors">
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Agent Registry
          </Link>
        </div>

        {/* Agent Profile Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-white/[0.07]">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{agent.name}</h1>
                <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{agent.description}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase border ${
                agent.riskLevel === 'high' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
                agent.riskLevel === 'medium' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' :
                'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
              }`}>
                {agent.riskLevel} Risk Profile
              </span>
              <span className="text-xs text-muted-foreground border-l border-white/[0.1] pl-2.5 font-mono">
                Model: {agent.model}
              </span>
              <span className="text-xs text-muted-foreground border-l border-white/[0.1] pl-2.5 font-mono">
                ID: {agent.id}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/safety-drill?agentId=${agent.id}`}>
              <Button className="h-9 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-medium text-xs shadow-md shadow-violet-950 flex items-center gap-2">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Run Safety Drill</span>
              </Button>
            </Link>
            <Link href="/evaluations">
              <Button variant="outline" className="h-9 px-4 rounded-lg border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] text-xs">
                <History className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <span>View Runs</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (8 cols): System Instructions & Allowed Tools */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* System Objective & Prompts */}
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-violet-400" />
                  <span>Declared System Instructions & Objectives</span>
                </h3>
                <span className="text-[10px] font-mono text-muted-foreground">Immutable Baseline</span>
              </div>

              <div>
                <span className="text-xs font-semibold text-zinc-300 block mb-1">Primary Objective</span>
                <p className="text-xs text-muted-foreground leading-relaxed p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  {agent.objective}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-zinc-300 block mb-1">System Instructions Prompt</span>
                <pre className="text-xs font-mono text-zinc-300 p-3 rounded-lg bg-black/60 border border-white/[0.06] whitespace-pre-wrap leading-relaxed">
                  {agent.systemInstructions}
                </pre>
              </div>
            </div>

            {/* Allowed Tool Manifest */}
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-violet-400" />
                  <span>Permitted Tools ({agent.allowedTools.length})</span>
                </h3>
                <span className="text-[10px] font-mono text-muted-foreground">Strict Sandbox Scope</span>
              </div>

              <div className="space-y-3">
                {agent.allowedTools.map((tool) => (
                  <div key={tool.id} className="p-3.5 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-semibold text-violet-300">
                        {tool.name}()
                      </span>
                      <span className="text-[10px] uppercase font-mono text-muted-foreground px-2 py-0.5 rounded bg-white/[0.04]">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{tool.description}</p>
                    <div className="text-[11px] font-mono text-zinc-400 bg-black/40 p-2 rounded border border-white/[0.04]">
                      Parameters: {JSON.stringify(tool.parameters)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Evaluations for this agent */}
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <History className="h-4 w-4 text-violet-400" />
                  <span>Evaluation History ({agentEvaluations.length})</span>
                </h3>
              </div>

              {agentEvaluations.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4">No evaluations recorded for this agent yet.</p>
              ) : (
                <div className="space-y-2">
                  {agentEvaluations.map((ev) => (
                    <div key={ev.id} className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-white">{ev.scenarioName}</span>
                        <div className="text-[11px] text-muted-foreground font-mono mt-0.5">
                          ID: {ev.id} • Completed {ev.completedAt?.slice(0, 10)}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                          ev.status === 'passed' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'
                        }`}>
                          {ev.status}
                        </span>
                        <Link href={`/evaluations/${ev.id}`} className="text-xs text-violet-400 hover:underline">
                          View Trace
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column (4 cols): Active Guardrails & Configuration */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Active Guardrails */}
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Active Guardrails</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-400">{agentGuardrails.length} Attached</span>
              </div>

              <div className="space-y-3">
                {agentGuardrails.map((gr) => (
                  <div key={gr.id} className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">{gr.name}</span>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase">Enforced</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-tight">{gr.description}</p>
                  </div>
                ))}
              </div>

              <Link href="/guardrails" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full h-8 text-xs border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.06]">
                  Manage Guardrail Policies
                </Button>
              </Link>
            </div>

            {/* Execution Bounds */}
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] space-y-4">
              <h3 className="text-sm font-semibold text-white border-b border-white/[0.06] pb-3 flex items-center gap-2">
                <Lock className="h-4 w-4 text-violet-400" />
                <span>Runtime Bounds & Limits</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Max Turns / Budget</span>
                  <span className="font-mono text-white">{agent.configuration.maxToolCallsPerTurn ?? 5}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Temperature</span>
                  <span className="font-mono text-white">{agent.configuration.temperature}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Context Window Limit</span>
                  <span className="font-mono text-white">{agent.configuration.maxTokens} tokens</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Supervision Required</span>
                  <span className="font-mono text-violet-400">
                    {agent.configuration.requireHumanApprovalFor?.length ? "Yes (Monetary/Delete)" : "None"}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}