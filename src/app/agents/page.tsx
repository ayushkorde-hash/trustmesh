"use client";
export const dynamic = 'force-dynamic';

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ShieldAlert, Activity, ArrowRight, Play, MoreHorizontal, Bot, Terminal, Code2 } from "lucide-react";
import Link from "next/link";

interface Agent {
  id: string;
  name: string;
  purpose: string;
  model: string;
  tools: number;
  trustScore: number;
  risk: "low" | "medium" | "high" | "critical";
  lastEvaluation: string;
  status: "active" | "paused" | "needs_review";
}

const agents: Agent[] = [
  { id: "agent-001", name: "Research Agent", purpose: "Web search & synthesis", model: "Nemotron 3.5 Lightning", tools: 2, trustScore: 86, risk: "low", lastEvaluation: "12h ago", status: "active" },
  { id: "agent-002", name: "Support Agent", purpose: "Customer query resolution", model: "Nemotron 3 Super", tools: 2, trustScore: 94, risk: "low", lastEvaluation: "6h ago", status: "active" },
  { id: "agent-003", name: "Finance Agent", purpose: "Transaction processing", model: "Nemotron 3 Super", tools: 3, trustScore: 72, risk: "high", lastEvaluation: "2d ago", status: "needs_review" },
  { id: "agent-004", name: "Email Agent", purpose: "Inbox management", model: "Nemotron 3.5 Lightning", tools: 2, trustScore: 68, risk: "medium", lastEvaluation: "1d ago", status: "paused" },
  { id: "agent-005", name: "Trading Agent", purpose: "Autonomous trading", model: "Nemotron 3 Ultra", tools: 4, trustScore: 45, risk: "critical", lastEvaluation: "3d ago", status: "paused" },
];

export default function AgentsPage() {
  return (
    <DashboardLayout>
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto lg:pl-64 bg-background text-foreground">
        <Header />

        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Bot className="h-8 w-8 text-muted-foreground" />
                Agents
              </h1>
              <p className="text-muted-foreground text-lg">Monitor and evaluate the reliability of your autonomous systems.</p>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
              <Terminal className="h-4 w-4 mr-2" /> Register Agent
            </Button>
          </div>

          {/* Agents Table */}
          <Card className="border-border/50 bg-secondary/10 border-gradient">
            <CardHeader className="border-b border-border/50 bg-secondary/5 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Active Configurations</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 rounded-full border-border/50 bg-background/50">Filter</Button>
                  <Button variant="outline" size="sm" className="h-8 rounded-full border-border/50 bg-background/50">Sort</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-background/50">
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead className="text-xs uppercase text-zinc-500 font-medium tracking-wider h-12 px-6">Name & Purpose</TableHead>
                    <TableHead className="text-xs uppercase text-zinc-500 font-medium tracking-wider h-12">Model</TableHead>
                    <TableHead className="text-xs uppercase text-zinc-500 font-medium tracking-wider h-12 text-center">Tools</TableHead>
                    <TableHead className="text-xs uppercase text-zinc-500 font-medium tracking-wider h-12">Trust Score</TableHead>
                    <TableHead className="text-xs uppercase text-zinc-500 font-medium tracking-wider h-12">Risk</TableHead>
                    <TableHead className="text-xs uppercase text-zinc-500 font-medium tracking-wider h-12">Status</TableHead>
                    <TableHead className="text-xs uppercase text-zinc-500 font-medium tracking-wider h-12 text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent) => (
                    <TableRow key={agent.id} className="border-border/50 hover:bg-secondary/20 transition-colors group">
                      <TableCell className="px-6 py-4">
                        <div className="flex flex-col">
                          <Link href={`/agents/${agent.id}`} className="font-medium text-sm text-zinc-200 hover:text-primary transition-colors flex items-center gap-2">
                            {agent.name}
                          </Link>
                          <span className="text-xs text-zinc-500 mt-1">{agent.purpose}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-secondary/30 w-fit px-2 py-1 rounded-md border border-border/50">
                          <Code2 className="h-3 w-3" />
                          {agent.model}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm text-zinc-400 font-mono">{agent.tools}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all"
                              style={{ 
                                width: `${agent.trustScore}%`,
                                backgroundColor: agent.trustScore >= 90 ? '#22c55e' : agent.trustScore >= 70 ? '#eab308' : '#ef4444'
                              }}
                            />
                          </div>
                          <span className="text-sm font-bold text-zinc-300">{agent.trustScore}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`
                          ${agent.risk === 'critical' ? 'text-red-500 border-red-500/20 bg-red-500/10' : ''}
                          ${agent.risk === 'high' ? 'text-orange-500 border-orange-500/20 bg-orange-500/10' : ''}
                          ${agent.risk === 'medium' ? 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10' : ''}
                          ${agent.risk === 'low' ? 'text-green-500 border-green-500/20 bg-green-500/10' : ''}
                        `}>
                          {agent.risk}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`
                          ${agent.status === 'active' ? 'text-green-400 border-green-400/20 bg-green-400/10' : ''}
                          ${agent.status === 'needs_review' ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10' : ''}
                          ${agent.status === 'paused' ? 'text-zinc-400 border-zinc-400/20 bg-zinc-400/10' : ''}
                        `}>
                          {agent.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/safety-drill`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10">
                              <Play className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/agents/${agent.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </DashboardLayout>
  );
}
