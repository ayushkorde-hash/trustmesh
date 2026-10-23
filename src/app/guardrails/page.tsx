"use client";
export const dynamic = 'force-dynamic';

import * as React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Play, 
  CheckCircle2
} from "lucide-react";
import { MOCK_GUARDRAILS } from "@/data/mock-data";

export default function GuardrailsPage() {
  const [guardrailList, setGuardrailList] = React.useState(MOCK_GUARDRAILS);
  const [successNotice, setSuccessNotice] = React.useState<string | null>(null);

  const toggleGuardrail = (id: string) => {
    setGuardrailList(prev => prev.map(g => {
      if (g.id === id) {
        const nextStatus = g.status === 'active' ? 'inactive' : 'active';
        setSuccessNotice(`Updated ${g.name} status to ${nextStatus.toUpperCase()}`);
        return { ...g, status: nextStatus };
      }
      return g;
    }));

    setTimeout(() => {
      setSuccessNotice(null);
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <Shield className="h-7 w-7 text-violet-400" />
                <span>Runtime Guardrails & Policy Gates</span>
              </h1>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Deterministic input sanitizers, tool argument validators, and human-in-the-loop approval policies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/safety-drill">
              <Button size="sm" className="h-9 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-medium text-xs shadow-md shadow-violet-950 flex items-center gap-2">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Test Policies in Drill</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Success Feedback banner */}
        {successNotice && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Guardrail Policy Cards */}
        <div className="space-y-4">
          {guardrailList.map((gr) => {
            const isActive = gr.status === "active";
            const actionBadgeColor = 
              gr.action.type === "block" ? "text-red-400 bg-red-500/10 border-red-500/20" :
              gr.action.type === "require_approval" ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" :
              "text-violet-400 bg-violet-500/10 border-violet-500/20";

            return (
              <div 
                key={gr.id}
                className={`p-5 rounded-xl border bg-[#090A0E] transition-all space-y-4 ${
                  isActive ? "border-white/[0.08] hover:border-violet-500/30" : "border-white/[0.04] opacity-75"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base font-semibold text-white">{gr.name}</h3>
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${actionBadgeColor}`}>
                        Action: {gr.action.type.replace("_", " ")}
                      </span>
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                        isActive ? "text-emerald-400 bg-emerald-500/10" : "text-muted-foreground bg-white/[0.04]"
                      }`}>
                        {gr.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{gr.description}</p>
                  </div>

                  {/* Toggle Switch */}
                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <span className="text-xs text-muted-foreground font-mono">
                      {isActive ? "Enforcing" : "Disabled"}
                    </span>
                    <Switch
                      checked={isActive}
                      onCheckedChange={() => toggleGuardrail(gr.id)}
                      aria-label={`Toggle enforcement of ${gr.name}`}
                    />
                  </div>
                </div>

                {/* Technical trigger specification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] space-y-1">
                    <span className="text-[10px] uppercase font-mono text-muted-foreground font-semibold">
                      Trigger Condition
                    </span>
                    <p className="text-xs font-mono text-violet-300">
                      {gr.trigger.type} :: {gr.trigger.condition}
                    </p>
                    <div className="text-[11px] font-mono text-zinc-400 bg-black/40 p-1.5 rounded mt-1 border border-white/[0.04]">
                      Params: {JSON.stringify(gr.trigger.parameters)}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] space-y-1">
                    <span className="text-[10px] uppercase font-mono text-muted-foreground font-semibold">
                      Enforced Agents ({gr.affectedAgents.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {gr.affectedAgents.map((agentId) => (
                        <span key={agentId} className="px-2 py-0.5 rounded bg-white/[0.04] text-[11px] font-mono text-zinc-300">
                          {agentId}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer status */}
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.05] text-[11px] text-muted-foreground font-mono">
                  <span>Author: {gr.createdBy}</span>
                  <span>Updated: {gr.updatedAt.slice(0, 10)}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </DashboardLayout>
  );
}
