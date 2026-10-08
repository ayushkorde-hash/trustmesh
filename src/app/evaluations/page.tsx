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
import { EvaluationRun, EvaluationStatus, EvaluationCategory, FindingSeverity, Score, ScoreEvidence } from "@/types";

interface Evaluation {
  id: string;
  agentName: string;
  scenarioName: string;
  scenarioCategory: EvaluationCategory;
  status: EvaluationStatus;
  score: number;
  startedAt: string;
  durationMs?: number;
  toolCallsCount: number;
  findingsCount: number;
}

const evaluations: Evaluation[] = [
  {
    id: "eval-001",
    agentName: "Research Agent",
    scenarioName: "Prompt Injection",
    scenarioCategory: "prompt_injection",
    status: "failed",
    score: 61,
    startedAt: "2024-01-15T10:30:00Z",
    durationMs: 300000,
    toolCallsCount: 12,
    findingsCount: 3,
  },
  {
    id: "eval-002",
    agentName: "Support Agent",
    scenarioName: "Tool Misuse",
    scenarioCategory: "tool_misuse",
    status: "passed",
    score: 94,
    startedAt: "2024-01-10T14:20:00Z",
    durationMs: 180000,
    toolCallsCount: 5,
    findingsCount: 0,
  },
  {
    id: "eval-003",
    agentName: "Finance Agent",
    scenarioName: "Goal Drift",
    scenarioCategory: "goal_drift",
    status: "review",
    score: 72,
    startedAt: "2024-01-08T09:10:00Z",
    durationMs: 420000,
    toolCallsCount: 18,
    findingsCount: 2,
  },
  {
    id: "eval-004",
    agentName: "Research Agent",
    scenarioName: "Untrusted Information",
    scenarioCategory: "untrusted_information",
    status: "failed",
    score: 58,
    startedAt: "2024-01-05T16:45:00Z",
    durationMs: 240000,
    toolCallsCount: 9,
    findingsCount: 4,
  },
  {
    id: "eval-005",
    agentName: "Support Agent",
    scenarioName: "Prompt Injection",
    scenarioCategory: "prompt_injection",
    status: "passed",
    score: 88,
    startedAt: "2024-01-02T11:10:00Z",
    durationMs: 210000,
    toolCallsCount: 6,
    findingsCount: 1,
  },
  {
    id: "eval-006",
    agentName: "Finance Agent",
    scenarioName: "Tool Misuse",
    scenarioCategory: "tool_misuse",
    status: "passed",
    score: 91,
    startedAt: "2023-12-28T15:30:00Z",
    durationMs: 150000,
    toolCallsCount: 4,
    findingsCount: 0,
  },
  {
    id: "eval-007",
    agentName: "Email Agent",
    scenarioName: "Permission Escalation",
    scenarioCategory: "permission_escalation",
    status: "running",
    score: 0,
    startedAt: "2024-01-16T08:00:00Z",
    durationMs: undefined,
    toolCallsCount: 0,
    findingsCount: 0,
  },
  {
    id: "eval-008",
    agentName: "Trading Agent",
    scenarioName: "Unsafe Autonomous Action",
    scenarioCategory: "unsafe_autonomous_action",
    status: "failed",
    score: 45,
    startedAt: "2023-12-20T14:00:00Z",
    durationMs: 600000,
    toolCallsCount: 22,
    findingsCount: 7,
  },
];

function getStatusColor(status: EvaluationStatus): string {
  switch (status) {
    case "passed": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "failed": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    case "review": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "running": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "pending": return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    default: return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  }
}

function getCategoryLabel(category: EvaluationCategory): string {
  const labels: Record<EvaluationCategory, string> = {
    prompt_injection: "Prompt Injection",
    tool_misuse: "Tool Misuse",
    permission_escalation: "Permission Escalation",
    goal_drift: "Goal Drift",
    hallucination: "Hallucination",
    untrusted_information: "Untrusted Information",
    conflicting_instructions: "Conflicting Instructions",
    unsafe_autonomous_action: "Unsafe Action",
    failure_recovery: "Failure Recovery",
    human_escalation: "Human Escalation",
  };
  return labels[category] || category;
}

export default function EvaluationsPage() {
  return (
    <DashboardLayout>
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto lg:pl-64">
        <Header onMenuClick={() => {}} />

        <div className="pb-4">
          <h1 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Evaluations
          </h1>
        </div>

        {/* Evaluations Table */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Runs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Scenario</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Tool Calls</TableHead>
                    <TableHead>Findings</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evaluations.map((evaluation) => (
                    <TableRow key={evaluation.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{evaluation.agentName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{evaluation.scenarioName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                            {getCategoryLabel(evaluation.scenarioCategory)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge status={evaluation.status} className="text-sm" />
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">
                          {evaluation.score !== null ? evaluation.score : "—"}
                          /100
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {evaluation.durationMs ? `${(evaluation.durationMs / 1000 / 60).toFixed(1)}m` : "—"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{evaluation.toolCallsCount}</span>
                      </TableCell>
                      <TableCell>
                        <Badge status="open" className="text-sm">
                          {evaluation.findingsCount}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-xs px-2 py-1"
                        >
                          View
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
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-xs px-2 py-1 ml-1"
                        >
                          Retest
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Total Evaluations</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 text-2xl font-bold text-primary">
              <span>{evaluations.length}</span>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader>
              <CardTitle>Passed</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 text-2xl font-bold text-green-600">
              <span>{evaluations.filter((e) => e.status === "passed").length}</span>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader>
              <CardTitle>Failed</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 text-2xl font-bold text-red-600">
              <span>{evaluations.filter((e) => e.status === "failed").length}</span>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader>
              <CardTitle>Average Score</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 text-2xl font-bold text-primary">
              <span>{((evaluations.filter((e) => e.score !== null).reduce((sum, e) => sum + e.score, 0) / evaluations.filter((e) => e.score !== null).length) || 0).toFixed(0)}</span>
              /100
            </CardContent>
          </Card>
        </div>
      </main>
    </DashboardLayout>
  );
}
