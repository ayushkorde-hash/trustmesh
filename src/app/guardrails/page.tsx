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
import { Switch } from "@/components/ui/switch";
import { generateId } from "@/lib/utils";
import { GuardrailStatus } from "@/types";

interface Guardrail {
  id: string;
  name: string;
  description: string;
  purpose: string;
  affectedAgents: string[];
  trigger: {
    type: string;
    condition: string;
  };
  action: {
    type: string;
    message?: string;
  };
  status: GuardrailStatus;
  createdAt: string;
  updatedAt: string;
  testResults: { passed: boolean; timestamp: string }[];
}

const guardrails: Guardrail[] = [
  {
    id: "gr-001",
    name: "External Content Verification",
    description: "Verify all instructions from external content before execution",
    purpose: "Prevent prompt injection via untrusted external sources",
    affectedAgents: ["Research Agent", "Email Agent"],
    trigger: {
      type: "content_analysis",
      condition: "external_content_contains_instructions",
    },
    action: {
      type: "require_approval",
      message: "Instruction from external content requires human approval",
    },
    status: "active",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-15T10:35:00Z",
    testResults: [
      { passed: true, timestamp: "2024-01-15T10:35:00Z" },
      { passed: false, timestamp: "2024-01-10T14:25:00Z" },
    ],
  },
  {
    id: "gr-002",
    name: "Rate Limiting",
    description: "Enforce rate limits on tool calls to prevent abuse",
    purpose: "Prevent tool misuse and excessive resource consumption",
    affectedAgents: ["Support Agent", "Email Agent"],
    trigger: {
      type: "tool_call",
      condition: "tool_call_rate_exceeded",
    },
    action: {
      type: "block",
      message: "Rate limit exceeded. Please wait before making more requests.",
    },
    status: "active",
    createdAt: "2024-01-05T14:00:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
    testResults: [
      { passed: true, timestamp: "2024-01-10T14:30:00Z" },
    ],
  },
  {
    id: "gr-003",
    name: "Permission Boundary Enforcement",
    description: "Reject any tool calls that exceed assigned permissions",
    purpose: "Prevent permission escalation attempts",
    affectedAgents: ["All Agents"],
    trigger: {
      type: "permission_check",
      condition: "requested_permission_not_assigned",
    },
    action: {
      type: "block",
      message: "Action blocked: Requested permission not assigned to this agent",
    },
    status: "testing",
    createdAt: "2024-01-12T09:00:00Z",
    updatedAt: "2024-01-16T08:15:00Z",
    testResults: [
      { passed: true, timestamp: "2024-01-16T08:15:00Z" },
      { passed: true, timestamp: "2024-01-14T11:00:00Z" },
    ],
  },
  {
    id: "gr-004",
    name: "Objective Verification Checkpoint",
    description: "Periodic check to verify agent alignment with original objective",
    purpose: "Detect and prevent goal drift in multi-step workflows",
    affectedAgents: ["Finance Agent", "Research Agent", "Trading Agent"],
    trigger: {
      type: "reasoning_analysis",
      condition: "step_count_modulo_3_equals_0",
    },
    action: {
      type: "warn",
      message: "Checkpoint: Verify current action aligns with original objective",
    },
    status: "draft",
    createdAt: "2024-01-15T16:00:00Z",
    updatedAt: "2024-01-15T16:00:00Z",
    testResults: [],
  },
  {
    id: "gr-005",
    name: "High-Value Trade Approval",
    description: "Require human approval for trades exceeding risk threshold",
    purpose: "Prevent unsafe autonomous financial actions",
    affectedAgents: ["Trading Agent"],
    trigger: {
      type: "tool_call",
      condition: "trade_value_exceeds_10_percent_portfolio",
    },
    action: {
      type: "require_approval",
      message: "Trade exceeds 10% portfolio threshold. Human approval required.",
    },
    status: "active",
    createdAt: "2023-12-20T14:00:00Z",
    updatedAt: "2023-12-20T14:05:00Z",
    testResults: [
      { passed: true, timestamp: "2023-12-20T14:05:00Z" },
    ],
  },
  {
    id: "gr-006",
    name: "External Transfer Block",
    description: "Block all external data transfers unless explicitly authorized",
    purpose: "Prevent data exfiltration via unauthorized external transfers",
    affectedAgents: ["All Agents"],
    trigger: {
      type: "tool_call",
      condition: "tool_call_is_external_transfer",
    },
    action: {
      type: "block",
      message: "External transfer blocked: No authorization found",
    },
    status: "inactive",
    createdAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-08T10:00:00Z",
    testResults: [],
  },
];

export default function GuardrailsPage() {
  return (
    <DashboardLayout>
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto lg:pl-64">
        <Header onMenuClick={() => {}} />

        <div className="pb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Guardrails
          </h1>
          <Button variant="default" className="gap-2">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Guardrail
          </Button>
        </div>

        {/* Guardrails Table */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Guardrail Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Affected Agents</TableHead>
                    <TableHead>Trigger</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guardrails.map((gr) => (
                    <TableRow key={gr.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{gr.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {gr.purpose}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {gr.affectedAgents.map((agent, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                            >
                              {agent}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs text-muted-foreground">
                          {gr.trigger.type}: {gr.trigger.condition}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs text-muted-foreground">
                          {gr.action.type}: {gr.action.message || "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge
                            status={gr.status}
                            className="text-xs"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(gr.createdAt).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Switch
                            checked={gr.status === "active"}
                            onCheckedChange={() => {}}
                            className="h-5 w-8"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 text-xs px-2 py-1"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 text-xs px-2 py-1 ml-1"
                          >
                            Test
                          </Button>
                        </div>
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
              <CardTitle>Total Guardrails</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 text-2xl font-bold text-primary">
              <span>{guardrails.length}</span>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader>
              <CardTitle>Active</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 text-2xl font-bold text-green-600">
              <span>{guardrails.filter((g) => g.status === "active").length}</span>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader>
              <CardTitle>Testing</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 text-2xl font-bold text-blue-600">
              <span>{guardrails.filter((g) => g.status === "testing").length}</span>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader>
              <CardTitle>Draft</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 text-2xl font-bold text-gray-600">
              <span>{guardrails.filter((g) => g.status === "draft").length}</span>
            </CardContent>
          </Card>
        </div>
      </main>
    </DashboardLayout>
  );
}
