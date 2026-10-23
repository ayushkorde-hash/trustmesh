"use client";
export const dynamic = 'force-dynamic';

import * as React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ClipboardList, 
  Search, 
  Play, 
  ArrowRight
} from "lucide-react";
import { MOCK_EVALUATIONS } from "@/data/mock-data";

export default function EvaluationsPage() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const filteredEvaluations = MOCK_EVALUATIONS.filter((item) => {
    const matchesSearch = item.agentName.toLowerCase().includes(search.toLowerCase()) ||
                          item.scenarioName.toLowerCase().includes(search.toLowerCase()) ||
                          item.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <ClipboardList className="h-7 w-7 text-violet-400" />
                <span>Security Evaluations</span>
              </h1>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Audit observable agent interactions, raw tool invocations, and policy violations against adversarial scenarios.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/safety-drill">
              <Button size="sm" className="h-9 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-medium text-xs shadow-md shadow-violet-950 flex items-center gap-2">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>New Evaluation Run</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filter by agent, scenario, or run ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs bg-white/[0.03] border-white/[0.08] focus-visible:ring-violet-500 rounded-lg text-white placeholder:text-muted-foreground/60"
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {["all", "passed", "failed", "review"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all ${
                  statusFilter === status
                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/40"
                    : "bg-white/[0.02] text-muted-foreground hover:text-white border border-white/[0.06]"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Evaluations Table */}
        <div className="rounded-xl border border-white/[0.08] bg-[#090A0E] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/[0.06] bg-white/[0.01] text-muted-foreground uppercase text-[10px] font-mono tracking-wider">
                <tr>
                  <th className="py-3 px-5">Run ID</th>
                  <th className="py-3 px-5">Target Agent</th>
                  <th className="py-3 px-5">Adversarial Vector</th>
                  <th className="py-3 px-5">Tool Calls</th>
                  <th className="py-3 px-5">Trust Score</th>
                  <th className="py-3 px-5">Verdict</th>
                  <th className="py-3 px-5">Execution Time</th>
                  <th className="py-3 px-5">Trace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredEvaluations.map((ev) => (
                  <tr key={ev.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-5 font-mono text-violet-400 font-semibold">{ev.id}</td>
                    <td className="py-3.5 px-5 font-medium text-white">{ev.agentName}</td>
                    <td className="py-3.5 px-5 text-muted-foreground">
                      <span className="font-medium text-zinc-300">{ev.scenarioName}</span>
                      <span className="text-[10px] block font-mono text-muted-foreground/80 mt-0.5">{ev.scenarioCategory}</span>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-zinc-400">{ev.toolCalls.length} calls</td>
                    <td className="py-3.5 px-5 font-mono font-medium">
                      <span className={
                        (ev.score?.overall ?? 0) >= 85 ? 'text-emerald-400' :
                        (ev.score?.overall ?? 0) >= 60 ? 'text-yellow-400' :
                        'text-red-400'
                      }>
                        {ev.score?.overall ?? 'N/A'}/100
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase ${
                        ev.status === 'passed' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' :
                        ev.status === 'review' ? 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' :
                        'text-red-400 bg-red-500/10 border border-red-500/20'
                      }`}>
                        {ev.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-muted-foreground text-[11px]">
                      {ev.completedAt ? ev.completedAt.replace("T", " ").replace("Z", "") : "In Progress"}
                    </td>
                    <td className="py-3.5 px-5">
                      <Link 
                        href={`/evaluations/${ev.id}`}
                        className="text-violet-400 hover:text-violet-300 font-medium inline-flex items-center gap-1 hover:underline"
                      >
                        Inspect <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEvaluations.length === 0 && (
            <div className="text-center py-16 p-6">
              <ClipboardList className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-60" />
              <h3 className="text-sm font-semibold text-white">No evaluations found</h3>
              <p className="text-xs text-muted-foreground mt-1">Try adjusting the filter criteria or launch a new safety drill.</p>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
