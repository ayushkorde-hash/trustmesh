"use client";
export const dynamic = 'force-dynamic';

import * as React from "react";
import Link from "next/link";
import { 
  Activity, 
  AlertTriangle, 
  ArrowRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Shield, 
  Bot, 
  Play
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { MOCK_AGENTS, MOCK_EVALUATIONS, MOCK_GUARDRAILS } from "@/data/mock-data";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
        
        {/* Top Header with Context & Demo Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.07]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Security Command Center
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-violet-500/30 bg-violet-500/10 text-violet-300">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                Demo Telemetry
              </span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Monitor adversarial stress tests, policy violations, and guardrail enforcement for autonomous agent fleets.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/safety-drill">
              <Button className="h-9 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-medium text-xs shadow-md shadow-violet-950 border border-violet-400/25 flex items-center gap-2">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Launch Safety Drill</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Primary Command Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] hover:border-white/[0.15] transition-all">
            <div className="flex items-center justify-between text-muted-foreground mb-3">
              <span className="text-xs uppercase font-medium tracking-wider">Registered Agents</span>
              <Bot className="h-4 w-4 text-violet-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold font-mono text-white">{MOCK_AGENTS.length}</span>
              <span className="text-xs text-emerald-400 font-mono">100% active</span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-2 block">
              1 high risk, 1 medium, 2 low
            </span>
          </div>

          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] hover:border-white/[0.15] transition-all">
            <div className="flex items-center justify-between text-muted-foreground mb-3">
              <span className="text-xs uppercase font-medium tracking-wider">Evaluations Run</span>
              <Activity className="h-4 w-4 text-violet-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold font-mono text-white">28</span>
              <span className="text-xs text-violet-400 font-mono">+4 this week</span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-2 block">
              Continuous red-team test harness
            </span>
          </div>

          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] hover:border-white/[0.15] transition-all">
            <div className="flex items-center justify-between text-muted-foreground mb-3">
              <span className="text-xs uppercase font-medium tracking-wider">Active Guardrails</span>
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold font-mono text-white">{MOCK_GUARDRAILS.filter(g => g.status === 'active').length}</span>
              <span className="text-xs text-emerald-400 font-mono">4 Enforced</span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-2 block">
              Pre-execution sanitizers active
            </span>
          </div>

          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] hover:border-white/[0.15] transition-all">
            <div className="flex items-center justify-between text-muted-foreground mb-3">
              <span className="text-xs uppercase font-medium tracking-wider">Fleet Trust Score</span>
              <Shield className="h-4 w-4 text-violet-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold font-mono text-violet-400">82 <span className="text-base text-muted-foreground font-normal">/ 100</span></span>
              <span className="text-xs text-yellow-400 font-mono">Needs Review</span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-2 block">
              Based on adversarial benchmarks
            </span>
          </div>

        </div>

        {/* Recommended Action Alert */}
        <div className="p-4 rounded-xl border border-red-500/30 bg-gradient-to-r from-red-950/20 via-[#0A0C12] to-[#0A0C12] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
              <AlertTriangle className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider font-mono">Critical Vulnerability Detected</span>
                <span className="text-[10px] text-muted-foreground font-mono">EV-8921</span>
              </div>
              <p className="text-xs md:text-sm text-foreground/90 mt-0.5">
                Research Agent failed adversarial prompt injection scenario. Recommended action: Enforce System Prompt Sanitizer rule #SP-04 and retest.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <Link href="/findings" className="w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full sm:w-auto h-8 text-xs border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08]">
                View Finding
              </Button>
            </Link>
            <Link href="/safety-drill" className="w-full sm:w-auto">
              <Button size="sm" className="w-full sm:w-auto h-8 text-xs bg-red-600 hover:bg-red-500 text-white font-medium">
                Retest Agent
              </Button>
            </Link>
          </div>
        </div>

        {/* Middle Two-Column Grid: Risk Dimension Breakdown & Active Agent Health */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Security Posture by Dimension */}
          <div className="lg:col-span-7 p-6 rounded-xl border border-white/[0.08] bg-[#090A0E] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">Adversarial Evaluation Dimensions</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Aggregated pass rates across core safety categories.</p>
                </div>
                <span className="text-xs font-mono text-muted-foreground">Target: &gt;90%</span>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  { name: "Tool Safety & Boundary Enforcement", score: 92, status: "passing", color: "bg-emerald-500" },
                  { name: "Permission Escalation Defense", score: 88, status: "passing", color: "bg-emerald-500" },
                  { name: "Human Supervisor Escalation", score: 94, status: "passing", color: "bg-emerald-500" },
                  { name: "Information & PII Redaction", score: 84, status: "passing", color: "bg-emerald-500" },
                  { name: "Goal Drift Resistance", score: 68, status: "review", color: "bg-yellow-500" },
                  { name: "Adversarial Prompt Injection Defense", score: 48, status: "failing", color: "bg-red-500" },
                ].map((item) => (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-300 font-medium">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-zinc-400">{item.score}%</span>
                        <span className={`text-[10px] uppercase font-mono px-1.5 py-0.2 rounded ${
                          item.status === 'passing' ? 'text-emerald-400 bg-emerald-500/10' :
                          item.status === 'review' ? 'text-yellow-400 bg-yellow-500/10' :
                          'text-red-400 bg-red-500/10'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-500`} 
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-muted-foreground">
              <span>Next automated evaluation scheduled: in 4 hours</span>
              <Link href="/scenarios" className="text-violet-400 hover:text-violet-300 inline-flex items-center gap-1">
                Explore 5 Scenarios <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Right: Agent Fleet Quick Status */}
          <div className="lg:col-span-5 p-6 rounded-xl border border-white/[0.08] bg-[#090A0E] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">Monitored Agent Fleet</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Active configurations & current trust scores.</p>
                </div>
                <Link href="/agents" className="text-xs text-violet-400 hover:text-violet-300 inline-flex items-center">
                  All ({MOCK_AGENTS.length})
                </Link>
              </div>

              <div className="space-y-3">
                {MOCK_AGENTS.map((agent) => (
                  <Link 
                    key={agent.id} 
                    href={`/agents/${agent.id}`}
                    className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/30 transition-all block group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-white group-hover:text-violet-300 transition-colors">
                        {agent.name}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                        agent.riskLevel === 'high' ? 'text-red-400 bg-red-500/10' :
                        agent.riskLevel === 'medium' ? 'text-yellow-400 bg-yellow-500/10' :
                        'text-emerald-400 bg-emerald-500/10'
                      }`}>
                        {agent.riskLevel} risk
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                      <span>{agent.model}</span>
                      <span>{agent.allowedTools.length} tools allowed</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/[0.06]">
              <Link href="/agents" className="w-full">
                <Button variant="outline" size="sm" className="w-full h-8 text-xs border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.06] flex items-center justify-center gap-1.5">
                  <Bot className="h-3.5 w-3.5" />
                  <span>Configure Agent Security Policies</span>
                </Button>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Section: Recent Evaluations Table */}
        <div className="rounded-xl border border-white/[0.08] bg-[#090A0E] overflow-hidden">
          <div className="p-5 border-b border-white/[0.07] flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Recent Evaluation Runs</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Observable red-team execution logs and findings.</p>
            </div>
            <Link href="/evaluations">
              <Button variant="outline" size="sm" className="h-7 text-xs border-white/[0.1] hover:bg-white/[0.05] flex items-center gap-1">
                <span>View Full History</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/[0.06] bg-white/[0.01] text-muted-foreground uppercase text-[10px] font-mono tracking-wider">
                <tr>
                  <th className="py-3 px-5">Run ID</th>
                  <th className="py-3 px-5">Target Agent</th>
                  <th className="py-3 px-5">Adversarial Scenario</th>
                  <th className="py-3 px-5">Trust Score</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {MOCK_EVALUATIONS.map((evalRun) => (
                  <tr key={evalRun.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-5 font-mono text-violet-400 font-semibold">{evalRun.id}</td>
                    <td className="py-3 px-5 font-medium text-white">{evalRun.agentName}</td>
                    <td className="py-3 px-5 text-muted-foreground">{evalRun.scenarioName}</td>
                    <td className="py-3 px-5 font-mono font-medium">
                      <span className={
                        (evalRun.score?.overall ?? 0) >= 85 ? 'text-emerald-400' :
                        (evalRun.score?.overall ?? 0) >= 60 ? 'text-yellow-400' :
                        'text-red-400'
                      }>
                        {evalRun.score?.overall ?? 'N/A'}/100
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        evalRun.status === 'passed' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' :
                        evalRun.status === 'review' ? 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' :
                        'text-red-400 bg-red-500/10 border border-red-500/20'
                      }`}>
                        {evalRun.status}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <Link 
                        href={`/evaluations/${evalRun.id}`}
                        className="text-violet-400 hover:text-violet-300 font-medium inline-flex items-center gap-1 hover:underline"
                      >
                        Inspect Trace <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
