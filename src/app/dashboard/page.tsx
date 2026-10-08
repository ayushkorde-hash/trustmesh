"use client";
export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, ArrowRight, ArrowUpRight, BarChart3, CheckCircle2, ShieldAlert, ShieldCheck, ShieldOff } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { TrustMesh } from "@/components/ui/trust-mesh";
import Link from "next/link";

interface RecentEvaluation {
  id: string;
  agentName: string;
  scenarioName: string;
  result: "passed" | "failed" | "review";
  severity: "critical" | "high" | "medium" | "low";
  score: number;
  startedAt: string;
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const recentEvaluations: RecentEvaluation[] = [
    { id: "eval-001", agentName: "Research Agent", scenarioName: "Prompt Injection", result: "failed", severity: "critical", score: 61, startedAt: "2m ago" },
    { id: "eval-002", agentName: "Support Agent", scenarioName: "Tool Misuse", result: "passed", severity: "low", score: 94, startedAt: "14m ago" },
    { id: "eval-003", agentName: "Finance Agent", scenarioName: "Goal Drift", result: "review", severity: "high", score: 72, startedAt: "1h ago" },
    { id: "eval-004", agentName: "Data Agent", scenarioName: "Permission Escalation", result: "passed", severity: "low", score: 91, startedAt: "3h ago" },
  ];

  if (!mounted) return null;

  return (
    <DashboardLayout>
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto lg:pl-64 bg-background selection:bg-white/10 text-foreground">
        <Header onMenuClick={() => {}} />

        <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <h1 className="text-3xl font-bold tracking-tight">Good morning, Ayush.</h1>
            <p className="text-muted-foreground text-lg">Monitor the reliability of your autonomous agents.</p>
          </motion.div>

          {/* Top Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <MetricCard title="Agents Monitored" value="6" trend="+2 this week" icon={<Activity className="h-4 w-4 text-zinc-400" />} />
            <MetricCard title="Evaluations" value="184" trend="+12% this week" trendUp icon={<BarChart3 className="h-4 w-4 text-zinc-400" />} />
            <MetricCard title="Critical Findings" value="7" trend="-3 since last scan" trendUp icon={<AlertTriangle className="h-4 w-4 text-red-500" />} />
            <MetricCard title="Average Trust Score" value="86" trend="+8.4% last 30 days" trendUp icon={<ShieldCheck className="h-4 w-4 text-green-500" />} />
          </motion.div>

          {/* Hero / Trust Visual */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-xl border border-border/50 bg-secondary/20 overflow-hidden h-72 border-gradient flex flex-col items-center justify-center text-center p-8 glow-sm"
          >
            <TrustMesh />
            <div className="relative z-20 flex flex-col items-center">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">Agent Trust Overview</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">86</span>
                <span className="text-xl font-medium text-zinc-500">/ 100</span>
              </div>
              <p className="text-sm font-medium text-green-400 mt-2 flex items-center gap-1">
                <ArrowUpRight className="h-4 w-4" />
                Overall Trust is improving
              </p>
            </div>
          </motion.div>

          {/* Attention Required */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">Attention Required</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Critical Alert */}
              <div className="p-5 rounded-xl border border-red-900/50 bg-red-950/20 flex flex-col justify-between hover:bg-red-950/30 transition-colors group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 font-medium">CRITICAL</Badge>
                    <span className="text-xs text-muted-foreground">Research Agent</span>
                  </div>
                  <h3 className="font-medium text-sm mb-1 text-zinc-200">Prompt injection vulnerability detected.</h3>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500">Trust score</span>
                    <span className="text-sm font-semibold text-red-400">61</span>
                  </div>
                  <Link href="/evaluations/eval-001" className="text-xs font-medium text-red-400 hover:text-red-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Review Finding <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* High Alert */}
              <div className="p-5 rounded-xl border border-orange-900/50 bg-orange-950/20 flex flex-col justify-between hover:bg-orange-950/30 transition-colors group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20 font-medium">HIGH</Badge>
                    <span className="text-xs text-muted-foreground">Finance Agent</span>
                  </div>
                  <h3 className="font-medium text-sm mb-1 text-zinc-200">Unauthorized tool access attempt.</h3>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500">Trust score</span>
                    <span className="text-sm font-semibold text-orange-400">72</span>
                  </div>
                  <Link href="/agents/agent-003" className="text-xs font-medium text-orange-400 hover:text-orange-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Review <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Review Alert */}
              <div className="p-5 rounded-xl border border-yellow-900/50 bg-yellow-950/20 flex flex-col justify-between hover:bg-yellow-950/30 transition-colors group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 font-medium">REVIEW</Badge>
                    <span className="text-xs text-muted-foreground">Support Agent</span>
                  </div>
                  <h3 className="font-medium text-sm mb-1 text-zinc-200">Recovery behavior requires validation.</h3>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500">Trust score</span>
                    <span className="text-sm font-semibold text-yellow-400">88</span>
                  </div>
                  <Link href="/evaluations/eval-005" className="text-xs font-medium text-yellow-400 hover:text-yellow-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Validate <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Evaluations */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-border/50 bg-background overflow-hidden border-gradient">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Recent Evaluations</CardTitle>
                <Link href="/evaluations" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-secondary/10">
                    <TableRow className="border-border/50 hover:bg-transparent">
                      <TableHead className="text-xs uppercase text-zinc-500 font-medium tracking-wider h-10">Agent</TableHead>
                      <TableHead className="text-xs uppercase text-zinc-500 font-medium tracking-wider h-10">Scenario</TableHead>
                      <TableHead className="text-xs uppercase text-zinc-500 font-medium tracking-wider h-10">Result</TableHead>
                      <TableHead className="text-xs uppercase text-zinc-500 font-medium tracking-wider h-10">Severity</TableHead>
                      <TableHead className="text-xs uppercase text-zinc-500 font-medium tracking-wider h-10 text-right">Score</TableHead>
                      <TableHead className="text-xs uppercase text-zinc-500 font-medium tracking-wider h-10 text-right pr-6">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentEvaluations.map((evalItem) => (
                      <TableRow key={evalItem.id} className="border-border/50 hover:bg-secondary/20 transition-colors group cursor-pointer">
                        <TableCell className="font-medium text-sm text-zinc-200">{evalItem.agentName}</TableCell>
                        <TableCell className="text-sm text-zinc-400">{evalItem.scenarioName}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            {evalItem.result === 'passed' && <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}
                            {evalItem.result === 'failed' && <ShieldOff className="h-3.5 w-3.5 text-red-500" />}
                            {evalItem.result === 'review' && <ShieldAlert className="h-3.5 w-3.5 text-yellow-500" />}
                            <span className="text-sm capitalize text-zinc-300">{evalItem.result}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`
                            ${evalItem.severity === 'critical' ? 'text-red-500 border-red-500/20 bg-red-500/10' : ''}
                            ${evalItem.severity === 'high' ? 'text-orange-500 border-orange-500/20 bg-orange-500/10' : ''}
                            ${evalItem.severity === 'medium' ? 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10' : ''}
                            ${evalItem.severity === 'low' ? 'text-green-500 border-green-500/20 bg-green-500/10' : ''}
                          `}>
                            {evalItem.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-sm font-semibold">
                          <span className={
                            evalItem.score >= 90 ? "text-green-400" :
                            evalItem.score >= 70 ? "text-yellow-400" : "text-red-400"
                          }>{evalItem.score}</span>
                        </TableCell>
                        <TableCell className="text-right text-sm text-zinc-500 pr-6">
                          {evalItem.startedAt}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </DashboardLayout>
  );
}

function MetricCard({ title, value, trend, trendUp, icon }: { title: string, value: string, trend: string, trendUp?: boolean, icon: React.ReactNode }) {
  return (
    <Card className="border-border/50 bg-secondary/10 border-gradient hover:bg-secondary/20 transition-colors">
      <CardContent className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-bold tracking-tight text-zinc-100">{value}</span>
          <span className={`text-xs font-medium ${trendUp ? 'text-green-500' : 'text-zinc-500'}`}>
            {trend}
          </span>
        </div>
        {/* Simple Sparkline */}
        <div className="h-8 w-full mt-2 flex items-end gap-1 opacity-50">
          {[40, 55, 45, 60, 50, 75, 86].map((h, i) => (
            <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: `${h}%` }} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
