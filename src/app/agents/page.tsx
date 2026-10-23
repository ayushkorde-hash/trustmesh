"use client";
export const dynamic = 'force-dynamic';

import * as React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bot, 
  ArrowRight, 
  Play, 
  Search, 
  Cpu,
  Wrench
} from "lucide-react";
import { MOCK_AGENTS } from "@/data/mock-data";

export default function AgentsPage() {
  const [search, setSearch] = React.useState("");
  const [riskFilter, setRiskFilter] = React.useState<string>("all");

  const filteredAgents = MOCK_AGENTS.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(search.toLowerCase()) ||
                          agent.description.toLowerCase().includes(search.toLowerCase()) ||
                          agent.model.toLowerCase().includes(search.toLowerCase());
    const matchesRisk = riskFilter === "all" || agent.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <Bot className="h-7 w-7 text-violet-400" />
                <span>Agent Registry & Policies</span>
              </h1>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Define operational tool boundaries, system instruction scopes, and monitor adversarial evaluation trust scores.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/safety-drill">
              <Button size="sm" className="h-9 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-medium text-xs shadow-md shadow-violet-950 flex items-center gap-2">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Test an Agent</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filter by agent name, model, tool..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs bg-white/[0.03] border-white/[0.08] focus-visible:ring-violet-500 rounded-lg text-white placeholder:text-muted-foreground/60"
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {["all", "high", "medium", "low"].map((risk) => (
              <button
                key={risk}
                onClick={() => setRiskFilter(risk)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all ${
                  riskFilter === risk
                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/40"
                    : "bg-white/[0.02] text-muted-foreground hover:text-white border border-white/[0.06]"
                }`}
              >
                {risk === "all" ? "All Risks" : `${risk} Risk`}
              </button>
            ))}
          </div>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAgents.map((agent) => {
            const riskColor = 
              agent.riskLevel === "high" ? "text-red-400 bg-red-500/10 border-red-500/20" :
              agent.riskLevel === "medium" ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" :
              "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";

            return (
              <div 
                key={agent.id}
                className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] hover:border-violet-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 group-hover:scale-105 transition-transform">
                        <Cpu className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">
                          {agent.name}
                        </h3>
                        <span className="text-[11px] font-mono text-muted-foreground">{agent.model}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${riskColor}`}>
                      {agent.riskLevel} risk
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {agent.description}
                  </p>

                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Allowed Tools</span>
                      <span className="font-mono text-white flex items-center gap-1">
                        <Wrench className="h-3 w-3 text-violet-400" />
                        {agent.allowedTools.length} tools ({agent.allowedTools.map(t => t.name).join(", ")})
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Max Turns / Budget</span>
                      <span className="font-mono text-zinc-300">
                        {agent.configuration.maxToolCallsPerTurn ?? 5} tool calls / turn
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs">
                  <span className="font-mono text-[11px] text-muted-foreground">ID: {agent.id}</span>
                  <div className="flex items-center gap-3">
                    <Link 
                      href={`/safety-drill?agentId=${agent.id}`}
                      className="text-violet-400 hover:text-violet-300 font-medium inline-flex items-center gap-1"
                    >
                      <span>Drill</span>
                      <Play className="h-3 w-3 fill-current" />
                    </Link>
                    <Link 
                      href={`/agents/${agent.id}`}
                      className="text-white hover:text-violet-300 font-medium inline-flex items-center gap-1 hover:underline"
                    >
                      <span>View Policies</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-16 p-6 rounded-xl border border-white/[0.08] bg-[#090A0E]">
            <Bot className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-60" />
            <h3 className="text-sm font-semibold text-white">No agents match your search</h3>
            <p className="text-xs text-muted-foreground mt-1">Try resetting the risk filter or search keywords.</p>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
