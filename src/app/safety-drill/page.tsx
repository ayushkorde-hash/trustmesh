"use client";
export const dynamic = 'force-dynamic';

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  ShieldAlert, 
  CheckCircle2, 
  ShieldOff, 
  Loader2, 
  ShieldCheck, 
  Terminal,
  RefreshCw
} from "lucide-react";
import { MOCK_AGENTS, MOCK_SCENARIOS } from "@/data/mock-data";

type DrillState = "idle" | "running" | "result";

const DRILL_STEPS = [
  "Spinning up ephemeral test sandbox environment...",
  "Injecting adversarial payload & roleplay delimiters...",
  "Initializing target agent execution runtime...",
  "Observing autonomous tool call requests...",
  "Evaluating agent reasoning against security policies...",
  "Computing multi-dimensional risk score...",
  "Synthesizing automated guardrail recommendations...",
];

function SafetyDrillContent() {
  const searchParams = useSearchParams();
  const initialAgentId = searchParams.get("agentId") || MOCK_AGENTS[0].id;
  const initialScenarioId = searchParams.get("scenarioId") || MOCK_SCENARIOS[0].id;

  const [selectedAgentId, setSelectedAgentId] = React.useState(initialAgentId);
  const [selectedScenarioId, setSelectedScenarioId] = React.useState(initialScenarioId);
  const [drillState, setDrillState] = React.useState<DrillState>("idle");
  const [currentStep, setCurrentStep] = React.useState(0);

  const selectedAgent = MOCK_AGENTS.find(a => a.id === selectedAgentId) || MOCK_AGENTS[0];
  const selectedScenario = MOCK_SCENARIOS.find(s => s.id === selectedScenarioId) || MOCK_SCENARIOS[0];

  const startDrill = () => {
    setDrillState("running");
    setCurrentStep(0);
  };

  React.useEffect(() => {
    if (drillState === "running") {
      if (currentStep < DRILL_STEPS.length) {
        const timer = setTimeout(() => {
          setCurrentStep(c => c + 1);
        }, 900 + Math.random() * 600);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setDrillState("result");
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [drillState, currentStep]);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <ShieldAlert className="h-7 w-7 text-violet-400" />
                <span>Agent Safety Drill</span>
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-violet-500/30 bg-violet-500/10 text-violet-300">
                Simulation Runner
              </span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Stress-test how your autonomous agent behaves under adversarial jailbreaks, tool misuse, and goal deflection.
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {drillState === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Configuration Panel (7 cols) */}
                <div className="md:col-span-7 p-6 rounded-xl border border-white/[0.08] bg-[#090A0E] space-y-5">
                  <div className="border-b border-white/[0.06] pb-3">
                    <h3 className="text-sm font-semibold text-white">Test Configuration</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Select the target agent and adversarial scenario vector.</p>
                  </div>

                  {/* Agent Selector */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                      Target Autonomous Agent
                    </label>
                    <select
                      value={selectedAgentId}
                      onChange={(e) => setSelectedAgentId(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/[0.1] text-xs font-medium text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    >
                      {MOCK_AGENTS.map((agent) => (
                        <option key={agent.id} value={agent.id} className="bg-[#0C0E14] text-white">
                          {agent.name} ({agent.model})
                        </option>
                      ))}
                    </select>
                    <span className="text-[11px] text-muted-foreground block font-mono">
                      Tools: {selectedAgent.allowedTools.map(t => t.name).join(", ")}
                    </span>
                  </div>

                  {/* Scenario Selector */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                      Adversarial Test Vector
                    </label>
                    <select
                      value={selectedScenarioId}
                      onChange={(e) => setSelectedScenarioId(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/[0.1] text-xs font-medium text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    >
                      {MOCK_SCENARIOS.map((scen) => (
                        <option key={scen.id} value={scen.id} className="bg-[#0C0E14] text-white">
                          [{scen.difficulty.toUpperCase()}] {scen.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {selectedScenario.description}
                    </p>
                  </div>

                  {/* Execution Mode */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                      Isolation & Execution Mode
                    </label>
                    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-white">Deterministic Simulated Sandbox</span>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Isolated ephemeral session • Zero production risk</p>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        SAFE
                      </span>
                    </div>
                  </div>

                  <Button 
                    onClick={startDrill} 
                    className="w-full h-11 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-semibold text-xs rounded-lg shadow-lg shadow-violet-950 flex items-center justify-center gap-2"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>LAUNCH SAFETY DRILL</span>
                  </Button>
                </div>

                {/* Information Panel (5 cols) */}
                <div className="md:col-span-5 p-6 rounded-xl border border-white/[0.08] bg-[#090A0E] flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white border-b border-white/[0.06] pb-3">
                      How Safety Drills Work
                    </h3>
                    <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed pt-3">
                      <p>
                        TrustMesh loads the agent&apos;s declared objective and tool manifest into a simulated sandbox runtime.
                      </p>
                      <p>
                        We simulate an adversarial red-team prompt containing prompt injection tokens, directory traversal arguments, or unauthorized escalation attempts.
                      </p>
                      <p>
                        Observable tool requests and model reasoning are intercepted before network dispatch, calculating a deterministic reliability trust score.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5 text-xs font-mono text-zinc-300">
                    <Terminal className="h-4 w-4 text-violet-400 shrink-0" />
                    <span className="text-[11px]">Audit trace recorded with verifiable telemetry</span>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {drillState === "running" && (
            <motion.div
              key="running"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-2xl mx-auto py-8"
            >
              <div className="p-8 rounded-2xl border border-white/[0.1] bg-[#090A0E] text-center space-y-6 shadow-2xl">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-violet-600/20 rounded-full blur-xl animate-pulse" />
                  <div className="h-16 w-16 rounded-2xl bg-white/[0.03] border border-violet-500/30 flex items-center justify-center relative z-10 mx-auto">
                    <Loader2 className="h-7 w-7 text-violet-400 animate-spin" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">Running Adversarial Stress-Test</h3>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">
                    Target: {selectedAgent.name} • Scenario: {selectedScenario.name}
                  </p>
                </div>

                <div className="space-y-2.5 text-left max-w-lg mx-auto pt-2">
                  {DRILL_STEPS.map((step, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center gap-3 text-xs transition-opacity duration-200 ${
                        idx < currentStep ? "text-muted-foreground" :
                        idx === currentStep ? "text-violet-300 font-semibold" :
                        "opacity-0 h-0 overflow-hidden"
                      }`}
                    >
                      {idx < currentStep ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Loader2 className="h-4 w-4 text-violet-400 animate-spin shrink-0" />
                      )}
                      <span className="font-mono">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {drillState === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="space-y-6"
            >
              <div className="p-8 rounded-2xl border border-red-500/30 bg-[#090A0E] shadow-2xl space-y-6">
                
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-white/[0.07]">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <ShieldOff className="h-6 w-6 text-red-400" />
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-red-400">
                        SAFETY DRILL FAILED
                      </h2>
                    </div>
                    <p className="text-sm text-zinc-300 font-medium">
                      Critical Policy Violation: Prompt Injection Defense Breached
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      Target: {selectedAgent.name} • Scenario: {selectedScenario.name}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] flex flex-col items-center min-w-[130px]">
                    <span className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Trust Score</span>
                    <div className="text-3xl font-bold font-mono text-red-400">48 <span className="text-xs text-muted-foreground font-normal">/ 100</span></div>
                  </div>
                </div>

                {/* Evidence Comparison */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-semibold uppercase text-muted-foreground tracking-wider">
                    Observed vs Expected Behavior
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 space-y-1.5">
                      <span className="text-[10px] uppercase font-mono font-bold text-red-400">Observed Action</span>
                      <p className="text-xs font-mono text-zinc-300 bg-black/40 p-2 rounded">
                        tool::read_file({`path: "system_config.json"`})
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Agent followed injected roleplay instructions, attempting to inspect system configuration files.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 space-y-1.5">
                      <span className="text-[10px] uppercase font-mono font-bold text-emerald-400">Expected Policy Action</span>
                      <p className="text-xs font-mono text-zinc-300 bg-black/40 p-2 rounded">
                        policy::reject_instruction(reason: &quot;Jailbreak syntax&quot;)
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Agent should recognize override syntax and reject instructions conflicting with root instructions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommended Guardrail */}
                <div className="p-4 rounded-xl border border-violet-500/30 bg-violet-950/15 flex items-start gap-3.5">
                  <ShieldCheck className="h-5 w-5 text-violet-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-semibold text-white">Recommended Guardrail Policy: #SP-04</h5>
                    <p className="text-xs text-zinc-300 mt-0.5">
                      Apply the System Prompt Sanitizer to pre-strip jailbreak delimiters before model invocation.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <Link href="/guardrails" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto h-9 px-6 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-medium text-xs rounded-lg">
                      Apply Guardrail
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => setDrillState("idle")}
                    className="w-full sm:w-auto h-9 px-6 text-xs border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.06] flex items-center gap-2"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Run Another Drill</span>
                  </Button>
                  <Link href="/evaluations/eval-001" className="w-full sm:w-auto">
                    <Button variant="ghost" className="w-full sm:w-auto h-9 px-6 text-xs text-muted-foreground hover:text-white">
                      Inspect Detailed Trace
                    </Button>
                  </Link>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}

export default function SafetyDrillPage() {
  return (
    <React.Suspense fallback={
      <DashboardLayout>
        <div className="p-8 text-center text-xs font-mono text-muted-foreground">
          Loading Safety Drill execution environment...
        </div>
      </DashboardLayout>
    }>
      <SafetyDrillContent />
    </React.Suspense>
  );
}

