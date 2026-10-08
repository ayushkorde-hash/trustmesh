"use client";
export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, ShieldCheck, Activity, Terminal, ShieldAlert, ArrowLeft, History } from "lucide-react";
import Link from "next/link";

const scores = [
  { name: "Prompt Injection", score: 61, color: "bg-red-500" },
  { name: "Tool Safety", score: 88, color: "bg-green-500" },
  { name: "Goal Alignment", score: 91, color: "bg-green-500" },
  { name: "Information Integrity", score: 84, color: "bg-green-500" },
  { name: "Recovery", score: 79, color: "bg-yellow-500" },
  { name: "Human Escalation", score: 93, color: "bg-green-500" },
];

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <DashboardLayout>
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto lg:pl-64 bg-background text-foreground">
        <Header />

        <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
          
          <Link href="/agents" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Agents
          </Link>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Research Agent</h1>
                  <p className="text-muted-foreground mt-1">Autonomous research agent that searches the web and extracts information</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-yellow-400 border-yellow-400/20 bg-yellow-400/10">Needs Review</Badge>
                <span className="text-sm text-zinc-500 border-l border-border/50 pl-3">Nemotron 3.5 Lightning</span>
                <span className="text-sm text-zinc-500 border-l border-border/50 pl-3">Risk: Low</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link href="/safety-drill">
                <Button className="h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-medium glow-primary rounded-full">
                  <Play className="mr-2 h-4 w-4" /> Run Safety Drill
                </Button>
              </Link>
              <Button variant="outline" className="h-11 px-6 rounded-full border-border/50 bg-secondary/10 hover:bg-secondary/30">
                <History className="mr-2 h-4 w-4" /> View Evaluations
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Trust Score Breakdown */}
              <Card className="border-border/50 bg-secondary/10 border-gradient">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">Trust Score Breakdown</CardTitle>
                    <CardDescription>Comprehensive reliability metrics based on 23 evaluations.</CardDescription>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Overall</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">86</span>
                      <span className="text-sm font-medium text-zinc-500">/ 100</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {scores.map((item, i) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-zinc-300">{item.name}</span>
                        <span className="font-mono text-zinc-400">{item.score}</span>
                      </div>
                      <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                        {mounted && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.score}%` }}
                            transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                            className={`h-full ${item.color} rounded-full`}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Guardrails */}
              <Card className="border-border/50 bg-background">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" /> Active Guardrails
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border border-border/50 bg-secondary/20 flex gap-4">
                    <ShieldCheck className="h-5 w-5 text-green-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-zinc-200">External Content Sandbox</p>
                      <p className="text-xs text-zinc-400 mt-1">Treats all external content as untrusted unless explicitly authorized via policy.</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-border/50 bg-secondary/20 flex gap-4">
                    <ShieldCheck className="h-5 w-5 text-green-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-zinc-200">Human-in-the-Loop Transfer</p>
                      <p className="text-xs text-zinc-400 mt-1">Requires explicit human approval for any external data transfer operations.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Right Column */}
            <div className="space-y-6">
              
              {/* Configuration */}
              <Card className="border-border/50 bg-background">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-muted-foreground" /> Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-border/50 text-sm">
                      <span className="text-muted-foreground">Temperature</span>
                      <span className="font-mono text-zinc-300">0.7</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border/50 text-sm">
                      <span className="text-muted-foreground">Max Tokens</span>
                      <span className="font-mono text-zinc-300">4096</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border/50 text-sm">
                      <span className="text-muted-foreground">Top P</span>
                      <span className="font-mono text-zinc-300">0.9</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Max Tool Calls</span>
                      <span className="font-mono text-zinc-300">5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Known Vulnerabilities */}
              <Card className="border-red-900/50 bg-red-950/10 border-gradient">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-red-500">
                    <ShieldAlert className="h-5 w-5" /> Vulnerabilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    <span className="text-zinc-300 leading-tight">May follow instructions embedded in untrusted emails.</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <span className="text-zinc-300 leading-tight">Moderate risk of goal drift in long multi-step workflows.</span>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

        </div>
      </main>
    </DashboardLayout>
  );
}