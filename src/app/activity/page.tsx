"use client";
export const dynamic = 'force-dynamic';

import * as React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight
} from "lucide-react";
import { MOCK_ACTIVITY } from "@/data/mock-data";

export default function ActivityPage() {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <Activity className="h-7 w-7 text-violet-400" />
                <span>Security Audit Activity</span>
              </h1>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Immutable chronological audit trail of agent stress tests, vulnerability detections, and guardrail changes.
            </p>
          </div>
        </div>

        {/* Audit Timeline */}
        <div className="relative border-l border-white/[0.08] ml-4 md:ml-6 pl-6 space-y-8 py-2">
          {MOCK_ACTIVITY.map((event) => {
            const isFinding = event.type === "finding_detected";
            const isGuardrail = event.type === "guardrail_generated" || event.type === "guardrail_applied";
            const isPass = event.message.includes("PASSED");
            const isFail = event.message.includes("FAILED");

            return (
              <div key={event.id} className="relative group">
                {/* Node icon on timeline */}
                <div className={`absolute -left-[35px] top-1.5 h-6 w-6 rounded-full flex items-center justify-center border text-xs ${
                  isFail || isFinding ? "bg-red-500/20 border-red-500/40 text-red-400" :
                  isPass || isGuardrail ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" :
                  "bg-violet-600/20 border-violet-500/40 text-violet-400"
                }`}>
                  {isFail || isFinding ? <AlertTriangle className="h-3 w-3" /> :
                   isPass || isGuardrail ? <ShieldCheck className="h-3 w-3" /> :
                   <Activity className="h-3 w-3" />}
                </div>

                {/* Event Card */}
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#090A0E] hover:border-violet-500/30 transition-all space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white uppercase text-[11px] font-mono tracking-wider">
                        {event.type.replace(/_/g, " ")}
                      </span>
                      {event.agentName && (
                        <span className="text-[11px] font-mono text-violet-300">
                          • {event.agentName}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {event.timestamp.replace("T", " ").replace("Z", " UTC")}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    {event.message}
                  </p>

                  {/* Context Links */}
                  <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-muted-foreground">
                    {event.evaluationRunId && (
                      <Link href={`/evaluations/${event.evaluationRunId}`} className="text-violet-400 hover:underline inline-flex items-center gap-0.5">
                        <span>View Run ({event.evaluationRunId})</span>
                        <ArrowRight className="h-2.5 w-2.5" />
                      </Link>
                    )}
                    {event.guardrailId && (
                      <Link href="/guardrails" className="text-violet-400 hover:underline inline-flex items-center gap-0.5">
                        <span>View Guardrails</span>
                        <ArrowRight className="h-2.5 w-2.5" />
                      </Link>
                    )}
                    {event.agentId && (
                      <Link href={`/agents/${event.agentId}`} className="text-zinc-400 hover:text-white inline-flex items-center gap-0.5">
                        <span>Agent Config</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </DashboardLayout>
  );
}
