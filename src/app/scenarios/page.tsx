"use client";
export const dynamic = 'force-dynamic';

import * as React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Search, 
  Play, 
  Wrench
} from "lucide-react";
import { MOCK_SCENARIOS } from "@/data/mock-data";

export default function ScenariosPage() {
  const [search, setSearch] = React.useState("");
  const [difficultyFilter, setDifficultyFilter] = React.useState<string>("all");

  const filteredScenarios = MOCK_SCENARIOS.filter((scen) => {
    const matchesSearch = scen.name.toLowerCase().includes(search.toLowerCase()) ||
                          scen.description.toLowerCase().includes(search.toLowerCase()) ||
                          scen.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesDifficulty = difficultyFilter === "all" || scen.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <FileText className="h-7 w-7 text-violet-400" />
                <span>Adversarial Scenario Library</span>
              </h1>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Pre-built and customized red-team test scenarios designed to stress-test autonomous agent boundary resilience.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/safety-drill">
              <Button size="sm" className="h-9 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-medium text-xs shadow-md shadow-violet-950 flex items-center gap-2">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Execute Scenario</span>
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
              placeholder="Search scenarios by title, vector, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs bg-white/[0.03] border-white/[0.08] focus-visible:ring-violet-500 rounded-lg text-white placeholder:text-muted-foreground/60"
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {["all", "expert", "hard", "medium", "easy"].map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all ${
                  difficultyFilter === diff
                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/40"
                    : "bg-white/[0.02] text-muted-foreground hover:text-white border border-white/[0.06]"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredScenarios.map((scen) => {
            const diffColor = 
              scen.difficulty === "expert" ? "text-purple-400 bg-purple-500/10 border-purple-500/20" :
              scen.difficulty === "hard" ? "text-red-400 bg-red-500/10 border-red-500/20" :
              "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";

            return (
              <div 
                key={scen.id}
                className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] hover:border-violet-500/30 transition-all flex flex-col justify-between group space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${diffColor}`}>
                      Difficulty: {scen.difficulty}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      Historical Pass Rate: <strong className="text-white">{scen.passRate}%</strong>
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors">
                    {scen.name}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed mt-1 mb-3">
                    {scen.description}
                  </p>

                  {/* Target Tools & Tags */}
                  <div className="space-y-2 pt-2 border-t border-white/[0.05]">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                      <Wrench className="h-3 w-3 text-violet-400" />
                      <span>Target Tools: {scen.targetTools.join(", ")}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {scen.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-white/[0.03] text-[10px] font-mono text-muted-foreground border border-white/[0.04]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs">
                  <span className="font-mono text-[11px] text-muted-foreground">ID: {scen.id}</span>
                  <Link 
                    href={`/safety-drill?scenarioId=${scen.id}`}
                    className="text-violet-400 hover:text-violet-300 font-medium inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Run in Drill</span>
                    <Play className="h-3 w-3 fill-current" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </DashboardLayout>
  );
}
