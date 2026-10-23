"use client";
export const dynamic = 'force-dynamic';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ShieldAlert, 
  Activity, 
  ArrowRight, 
  ShieldCheck, 
  FileSearch, 
  Cpu,
  ArrowUpRight
} from "lucide-react";
import { TrustMesh } from "@/components/ui/trust-mesh";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#050607] text-[#F4F4F6] selection:bg-violet-500/25 selection:text-white overflow-x-hidden">
      {/* Background Interactive Mesh */}
      <TrustMesh />
      
      {/* Fine radial ultraviolet lighting in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-violet-600/10 via-violet-900/5 to-transparent blur-3xl pointer-events-none z-0" />

      {/* Top Navbar */}
      <header className="relative z-30 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/[0.07] bg-[#050607]/75 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-sm ring-1 ring-violet-400/30">
            <ShieldCheck className="h-4.5 w-4.5" />
          </div>
          <span className="font-bold tracking-wider text-base">TRUSTMESH</span>
          <span className="hidden sm:inline-flex text-[10px] font-mono uppercase tracking-widest text-violet-400/80 px-2 py-0.5 rounded border border-violet-500/20 bg-violet-500/5 ml-1">
            AI Sec Layer
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-wider font-medium text-muted-foreground">
          <Link href="/dashboard" className="hover:text-foreground transition-colors">Platform</Link>
          <Link href="/agents" className="hover:text-foreground transition-colors">Agents</Link>
          <Link href="/evaluations" className="hover:text-foreground transition-colors">Evaluations</Link>
          <Link href="/safety-drill" className="hover:text-foreground transition-colors">Safety Drill</Link>
          <Link href="/guardrails" className="hover:text-foreground transition-colors">Guardrails</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard" 
            className="text-xs font-semibold px-4 py-2 rounded-md bg-white/[0.06] hover:bg-white/[0.1] text-foreground border border-white/[0.1] transition-all"
          >
            Sign In
          </Link>
          <Link 
            href="/dashboard" 
            className="text-xs font-semibold px-4 py-2 rounded-md bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white shadow-sm shadow-violet-950 border border-violet-400/30 transition-all flex items-center gap-1.5"
          >
            <span>Launch Console</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 md:px-8 text-center max-w-6xl mx-auto w-full pt-16 md:pt-24 pb-20">
        
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm text-xs font-mono text-violet-300 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
          <span>v1.0 Security Engine • Adversarial Testing Live</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.08] max-w-5xl"
        >
          Trust your AI agents before <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-violet-300">
            you trust them with production.
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mb-10 leading-relaxed font-normal"
        >
          The automated adversarial stress-testing and runtime policy layer for autonomous agent systems.
          Detect prompt injections, tool privilege escapes, and goal drift before deployment.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-3.5 w-full justify-center mb-16"
        >
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-semibold text-sm rounded-lg shadow-lg shadow-violet-950/50 border border-violet-400/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore Platform</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/safety-drill"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] text-foreground font-semibold text-sm rounded-lg border border-white/[0.1] transition-all"
          >
            <ShieldAlert className="h-4 w-4 text-violet-400" />
            <span>Run Safety Drill</span>
          </Link>
          <Link
            href="/evaluations"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            <span>View Evaluations</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Signature Hero Image & Product Preview */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className="relative w-full rounded-2xl border border-white/[0.12] bg-[#090A0E]/90 p-2 sm:p-4 backdrop-blur-xl shadow-2xl shadow-black/80 overflow-hidden"
        >
          {/* Top terminal bar */}
          <div className="flex items-center justify-between pb-3 px-3 border-b border-white/[0.07] mb-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs font-mono text-muted-foreground">trustmesh-eval-stream :: active-session #EV-8921</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                SANDBOX ISOLATED
              </span>
            </div>
          </div>

          {/* Dual Column Composition: Image + Live Security Telemetry */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Visual Media Pane (Human-AI Collaboration Asset) */}
            <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-white/[0.08] min-h-[320px] bg-black flex items-center justify-center group">
              <Image 
                src="/images/human-ai-hand.jpg" 
                alt="Human intelligence and autonomous AI agent verification"
                fill
                priority
                className="object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0E] via-transparent to-transparent opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-950/30 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlay pill on top of image */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#07080B]/85 backdrop-blur-md border border-white/[0.1] text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-white">Adversarial Red-Team Vector</span>
                  <span className="text-[10px] font-mono text-violet-400">OWASP LLM-01</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-tight">
                  Simulating multi-turn prompt injection against autonomous tools before production deployment.
                </p>
              </div>
            </div>

            {/* Live Telemetry / Evaluation Trace Pane */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4 text-left p-2 sm:p-4 rounded-xl bg-white/[0.01] border border-white/[0.05]">
              
              {/* Agent Profile & Score */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-white/[0.08] bg-[#0E1017]">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                    <Activity className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Research & Synthesis Agent</h3>
                    <span className="text-[11px] text-muted-foreground font-mono">Model: Nemotron 3.5 Lightning</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-muted-foreground">Trust Score</span>
                  <div className="text-lg font-bold font-mono text-violet-400">48 <span className="text-xs text-muted-foreground">/ 100</span></div>
                </div>
              </div>

              {/* Intercepted Trace Log */}
              <div className="space-y-2 font-mono text-xs">
                <div className="p-2.5 rounded bg-black/60 border border-white/[0.06] text-zinc-300">
                  <span className="text-muted-foreground text-[10px]">[18:12:45] Tool Execution Requested:</span>
                  <div className="text-emerald-400 mt-0.5">tool:read_file({`path: "system_config.json"`})</div>
                </div>
                <div className="p-2.5 rounded bg-violet-950/20 border border-violet-500/30 text-violet-200">
                  <span className="text-violet-400 text-[10px]">[18:13:30] Guardrail Intercept:</span>
                  <div className="text-red-400 mt-0.5 font-semibold">⚠ BLOCKED: Outbound secret leak pattern detected</div>
                </div>
                <div className="p-2.5 rounded bg-black/60 border border-white/[0.06] text-zinc-400 text-[11px]">
                  Policy Action: Enforcing System Prompt Sanitizer rule #SP-04. Neutralized jailbreak token.
                </div>
              </div>

              {/* Bottom Quick Metric summary */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.06]">
                <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[10px] text-muted-foreground block">Injection Resist</span>
                  <span className="text-xs font-mono font-semibold text-red-400">32% (Failed)</span>
                </div>
                <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[10px] text-muted-foreground block">Tool Boundary</span>
                  <span className="text-xs font-mono font-semibold text-emerald-400">92% (Pass)</span>
                </div>
                <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[10px] text-muted-foreground block">Goal Alignment</span>
                  <span className="text-xs font-mono font-semibold text-yellow-400">68% (Review)</span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* 4-Step Editorial Flow */}
        <section className="mt-28 w-full text-left">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono text-violet-400 uppercase tracking-widest block mb-2">Continuous Verification</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">How TrustMesh Secures Autonomous Agents</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              From initial registration to live runtime enforcement, establish continuous safety gates for agent fleets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Step 1 */}
            <div className="p-6 rounded-xl border border-white/[0.08] bg-[#090A0E] hover:border-violet-500/30 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-xs font-mono text-violet-400 font-bold mb-3 block">01 / PROFILE</span>
                <div className="h-10 w-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 text-violet-400 group-hover:bg-violet-600/10 transition-colors">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-white">Register & Scope Agents</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Declare allowed tools, filesystem boundaries, outbound network permissions, and baseline system objectives.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-xl border border-white/[0.08] bg-[#090A0E] hover:border-violet-500/30 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-xs font-mono text-violet-400 font-bold mb-3 block">02 / STRESS-TEST</span>
                <div className="h-10 w-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 text-violet-400 group-hover:bg-violet-600/10 transition-colors">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-white">Adversarial Scenarios</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Automate red-team drills: prompt injections, directory traversal escapes, recursive tool loops, and unauthorized actions.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-xl border border-white/[0.08] bg-[#090A0E] hover:border-violet-500/30 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-xs font-mono text-violet-400 font-bold mb-3 block">03 / TRACE</span>
                <div className="h-10 w-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 text-violet-400 group-hover:bg-violet-600/10 transition-colors">
                  <FileSearch className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-white">Deep Trace Analysis</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Examine reasoning tokens, raw tool parameter payloads, and policy violations with full cryptographic reproducibility.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-xl border border-white/[0.08] bg-[#090A0E] hover:border-violet-500/30 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-xs font-mono text-violet-400 font-bold mb-3 block">04 / MITIGATE</span>
                <div className="h-10 w-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 text-violet-400 group-hover:bg-violet-600/10 transition-colors">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-white">Synthesize Guardrails</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Auto-generate pre-execution input sanitizers, tool argument validators, and dual-control approvals to block repeat exploits.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Final CTA Strip */}
        <section className="mt-24 w-full p-8 md:p-12 rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/30 via-[#090A0E] to-[#07080B] text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ready to verify your autonomous agent fleet?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Launch a simulated safety drill in under 60 seconds. Inspect observable tool traces, calculate risk scores, and enforce policies.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-semibold text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Open Security Dashboard</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/safety-drill"
                className="w-full sm:w-auto px-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] text-foreground font-semibold text-xs rounded-lg border border-white/[0.1] transition-all"
              >
                <span>Run Interactive Drill</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/[0.07] bg-[#050607] py-8 px-6 md:px-12 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">TRUSTMESH</span>
          <span>•</span>
          <span>AI-Agent Security & Reliability Layer</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="hover:text-foreground transition-colors">Platform</Link>
          <Link href="/evaluations" className="hover:text-foreground transition-colors">Evaluations</Link>
          <Link href="/safety-drill" className="hover:text-foreground transition-colors">Drill Runner</Link>
          <Link href="/settings" className="hover:text-foreground transition-colors">Settings</Link>
        </div>
      </footer>
    </div>
  );
}
