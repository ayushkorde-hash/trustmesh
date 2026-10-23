"use client";
export const dynamic = 'force-dynamic';

import * as React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink
} from "lucide-react";
import { MOCK_FINDINGS } from "@/data/mock-data";

export default function FindingsPage() {
  const [search, setSearch] = React.useState("");
  const [severityFilter, setSeverityFilter] = React.useState<string>("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const filteredFindings = MOCK_FINDINGS.filter((finding) => {
    const matchesSearch = finding.title.toLowerCase().includes(search.toLowerCase()) ||
                          finding.description.toLowerCase().includes(search.toLowerCase()) ||
                          finding.agentName.toLowerCase().includes(search.toLowerCase());
    const matchesSeverity = severityFilter === "all" || finding.severity === severityFilter;
    const matchesStatus = statusFilter === "all" || finding.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <AlertTriangle className="h-7 w-7 text-violet-400" />
                <span>Security Findings & Vulnerabilities</span>
              </h1>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Traceable security vulnerabilities flagged during adversarial evaluation runs with evidence and recommended guardrails.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search findings by agent, title, evidence..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs bg-white/[0.03] border-white/[0.08] focus-visible:ring-violet-500 rounded-lg text-white placeholder:text-muted-foreground/60"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center gap-1">
              {["all", "critical", "high", "medium"].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all ${
                    severityFilter === sev
                      ? "bg-violet-600/20 text-violet-300 border border-violet-500/40"
                      : "bg-white/[0.02] text-muted-foreground hover:text-white border border-white/[0.06]"
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
            <span className="text-white/[0.2] text-xs">|</span>
            <div className="flex items-center gap-1">
              {["all", "open", "resolved"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all ${
                    statusFilter === st
                      ? "bg-violet-600/20 text-violet-300 border border-violet-500/40"
                      : "bg-white/[0.02] text-muted-foreground hover:text-white border border-white/[0.06]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Findings List */}
        <div className="space-y-4">
          {filteredFindings.map((finding) => {
            const sevColor = 
              finding.severity === "critical" ? "text-red-400 bg-red-500/10 border-red-500/20" :
              finding.severity === "high" ? "text-orange-400 bg-orange-500/10 border-orange-500/20" :
              "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";

            return (
              <div 
                key={finding.id}
                className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] hover:border-violet-500/30 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${sevColor}`}>
                        {finding.severity}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground uppercase">
                        {finding.status}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground/70">
                        • {finding.id}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      {finding.title}
                    </h3>
                  </div>

                  <Link href={`/evaluations/${finding.evaluationRunId}`}>
                    <Button variant="outline" size="sm" className="h-7 text-xs border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.06] flex items-center gap-1.5">
                      <span>Evaluation Trace</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </Button>
                  </Link>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {finding.description}
                </p>

                {/* Evidence snippet */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-zinc-400 font-semibold uppercase">
                    Observed Evidence ({finding.evidence.length})
                  </span>
                  <div className="space-y-1">
                    {finding.evidence.map((ev, i) => (
                      <div key={i} className="text-xs font-mono text-zinc-300 bg-black/40 p-2 rounded border border-white/[0.04]">
                        {ev}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendation & Guardrail */}
                <div className="p-3.5 rounded-lg bg-violet-950/15 border border-violet-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-violet-300 block mb-0.5">Recommended Remediation:</span>
                    <span className="text-zinc-300">{finding.recommendation}</span>
                  </div>
                  <Link href="/guardrails" className="shrink-0">
                    <Button size="sm" className="h-7 text-xs bg-violet-600 hover:bg-violet-500 text-white font-medium flex items-center gap-1">
                      <span>Apply Guardrail</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}

          {filteredFindings.length === 0 && (
            <div className="text-center py-16 p-6 rounded-xl border border-white/[0.08] bg-[#090A0E]">
              <ShieldCheck className="h-10 w-10 text-emerald-400 mx-auto mb-3 opacity-60" />
              <h3 className="text-sm font-semibold text-white">No vulnerabilities found</h3>
              <p className="text-xs text-muted-foreground mt-1">All evaluations matched your criteria without security findings.</p>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
