"use client";
export const dynamic = 'force-dynamic';

import { cn } from "@/lib/utils";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { TableHeader } from "@/components/ui/table";
import { TableBody } from "@/components/ui/table";
import { TableRow } from "@/components/ui/table";
import { TableHead } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { generateId } from "@/lib/utils";
import { EvaluationCategory, ScenarioDifficulty, RiskLevel } from "@/types";

interface Scenario {
  id: string;
  name: string;
  description: string;
  category: EvaluationCategory;
  difficulty: ScenarioDifficulty;
  riskLevel: RiskLevel;
  passRate: number;
  lastRun: string | null;
  tags: string[];
}

const scenarios: Scenario[] = [
  {
    id: "s-001",
    name: "Prompt Injection",
    description: "Agent receives hidden instructions through external content attempting to override its objective",
    category: "prompt_injection",
    difficulty: "medium",
    riskLevel: "critical",
    passRate: 58,
    lastRun: "2h ago",
    tags: ["text", "instruction_override", "external_content"],
  },
  {
    id: "s-002",
    name: "Tool Misuse",
    description: "Agent uses tools for unintended purposes or exceeds permitted operations",
    category: "tool_misuse",
    difficulty: "hard",
    riskLevel: "high",
    passRate: 72,
    lastRun: "4h ago",
    tags: ["tool_abuse", "permissions", "unauthorized_operations"],
  },
  {
    id: "s-003",
    name: "Permission Escalation",
    description: "Agent attempts to gain elevated permissions beyond its assigned scope",
    category: "permission_escalation",
    difficulty: "medium",
    riskLevel: "high",
    passRate: 65,
    lastRun: "1d ago",
    tags: ["permission_boundaries", "privilege_escalation"],
  },
  {
    id: "s-004",
    name: "Goal Drift",
    description: "Agent progressively deviates from its original objective over multi-step workflows",
    category: "goal_drift",
    difficulty: "hard",
    riskLevel: "high",
    passRate: 45,
    lastRun: "3d ago",
    tags: ["objective_deviation", "multi_step", "long_horizon"],
  },
  {
    id: "s-005",
    name: "Hallucination",
    description: "Agent generates confident but false information without valid sources",
    category: "hallucination",
    difficulty: "medium",
    riskLevel: "medium",
    passRate: 78,
    lastRun: "1w ago",
    tags: ["fact_generation", "source_verification"],
  },
  {
    id: "s-006",
    name: "Untrusted Information",
    description: "Agent acts on instructions from unverified or malicious external sources",
    category: "untrusted_information",
    difficulty: "hard",
    riskLevel: "critical",
    passRate: 52,
    lastRun: "2d ago",
    tags: ["external_instructions", "malicious_content", "data_integrity"],
  },
  {
    id: "s-007",
    name: "Conflicting Instructions",
    description: "Agent receives opposing directives from multiple sources simultaneously",
    category: "conflicting_instructions",
    difficulty: "medium",
    riskLevel: "medium",
    passRate: 71,
    lastRun: "5d ago",
    tags: ["conflicting_directives", "decision_making"],
  },
  {
    id: "s-008",
    name: "Unsafe Autonomous Action",
    description: "Agent performs actions that could cause real-world harm if executed",
    category: "unsafe_autonomous_action",
    difficulty: "expert",
    riskLevel: "critical",
    passRate: 23,
    lastRun: "1w ago",
    tags: ["real_world_harm", "critical_safety"],
  },
  {
    id: "s-009",
    name: "Failure Recovery",
    description: "Agent's ability to recover from incorrect information or failed tool calls",
    category: "failure_recovery",
    difficulty: "easy",
    riskLevel: "low",
    passRate: 89,
    lastRun: "2w ago",
    tags: ["recovery", "resilience", "error_handling"],
  },
  {
    id: "s-010",
    name: "Human Escalation",
    description: "Agent's capability to recognize when human intervention is required",
    category: "human_escalation",
    difficulty: "easy",
    riskLevel: "low",
    passRate: 94,
    lastRun: "3w ago",
    tags: ["escalation", "human_in_the_loop"],
  },
];

function getDifficultyColor(difficulty: ScenarioDifficulty): string {
  switch (difficulty) {
    case "easy": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "medium": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "hard": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
    case "expert": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    default: return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  }
}

function getRiskLevelColor(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case "critical": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    case "high": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
    case "medium": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "low": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    default: return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  }
}

export default function ScenariosPage() {
  return (
    <DashboardLayout>
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto lg:pl-64">
        <Header onMenuClick={() => {}} />

        <div className="pb-4">
          <h1 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Scenario Library
          </h1>
        </div>

        {/* Scenario Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            All Scenarios
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Prompt Injection
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Tool Abuse
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Permission Escalation
          </Button>
        </div>

        {/* Scenarios Table */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scenario</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Pass Rate</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scenarios.map((scenario) => (
                    <TableRow key={scenario.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{scenario.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                            {scenario.category}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          riskLevel={scenario.difficulty as RiskLevel}
                          className="text-xs"
                        >
                          {scenario.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge riskLevel={scenario.riskLevel} className="text-xs" />
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{scenario.passRate}%</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{scenario.lastRun || "—"}</span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-xs px-2 py-1"
                        >
                          Run Scenario
                          <svg
                            className="h-3.5 w-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Category Stats */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(10).keys()].map((index) => (
            <Card key={index} className="p-4">
              <CardHeader>
                <CardTitle className="text-sm">Category {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">72</span>
                  <span>/100</span>
                </div>
                <div className="mt-1 h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-primary transition-all ease-linear duration-2s`}
                    style={{ width: `72%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </DashboardLayout>
  );
}
