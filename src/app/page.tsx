"use client";
export const dynamic = 'force-dynamic';

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, Activity, ArrowRight, ShieldCheck, FileSearch } from "lucide-react";
import { TrustMesh } from "@/components/ui/trust-mesh";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-background overflow-hidden text-foreground selection:bg-white/10">
      <TrustMesh />
      
      {/* Navbar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-border/50 bg-background/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="font-semibold tracking-tight text-lg">TRUSTMESH</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/dashboard" className="hover:text-foreground transition-colors">Platform</Link>
          <Link href="/agents" className="hover:text-foreground transition-colors">Agents</Link>
          <Link href="/safety-drill" className="hover:text-foreground transition-colors">Safety Drill</Link>
          <Link href="/scenarios" className="hover:text-foreground transition-colors">Scenarios</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Sign In
          </Link>
          <Link href="/dashboard" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors">
            Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto w-full pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/50 bg-secondary/50 backdrop-blur-sm text-xs font-medium text-muted-foreground mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Platform v1.0 is now live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight"
        >
          Trust your AI agents before <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">
            you trust them with production.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          The AI safety layer that stress-tests autonomous agents against adversarial behavior, unsafe tool use, and goal drift.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <Link
            href="/safety-drill"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all glow-primary"
          >
            <ShieldAlert className="h-5 w-5" />
            Run Safety Drill
          </Link>
          <Link
            href="/agents"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-secondary text-secondary-foreground font-medium rounded-full border border-border hover:bg-secondary/80 transition-colors"
          >
            <Activity className="h-5 w-5" />
            Explore Agents
          </Link>
        </motion.div>

        {/* Feature Cards Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full text-left"
        >
          <div className="p-6 rounded-2xl border border-border/50 bg-secondary/20 backdrop-blur-sm border-gradient hover:bg-secondary/30 transition-colors">
            <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4 text-zinc-300">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Adversarial Scenarios</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Run automated prompt injections, goal drifts, and privilege escalations against your active agent configurations.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-border/50 bg-secondary/20 backdrop-blur-sm border-gradient hover:bg-secondary/30 transition-colors">
            <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4 text-zinc-300">
              <FileSearch className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Deep Tracing</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Observe exactly how agents reason through hostile inputs and which tool calls they attempt to execute.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-border/50 bg-secondary/20 backdrop-blur-sm border-gradient hover:bg-secondary/30 transition-colors">
            <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4 text-zinc-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Automated Guardrails</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Generate actionable system prompt improvements and tool usage policies to mitigate discovered risks.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
