# TrustMesh — AI Agent Security & Reliability Platform

> Automated adversarial stress-testing and runtime policy enforcement for autonomous AI agent systems.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-0%20errors-4b32c3?logo=eslint)](https://eslint.org/)

---

## What is TrustMesh?

TrustMesh is a security platform that helps teams **detect and mitigate threats** in autonomous AI agent deployments before they reach production:

- 🔴 **Adversarial Red-Teaming** — Automated OWASP LLM-01 through LLM-10 stress-test scenarios against your agents
- 🛡️ **Guardrail Policy Engine** — Pre-execution input sanitizers, tool argument validators, and dual-control approvals
- 📊 **Evaluation Tracing** — Full reproducible reasoning and tool-call audit logs with cryptographic provenance
- 💡 **AI Token Intelligence** — Deterministic cost/token estimation engine across 7 providers and 20+ models
- 🔎 **Security Findings** — Structured vulnerability reports by OWASP category with recommended mitigations

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.4 (App Router, Turbopack) |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS 3.x |
| Animations | Framer Motion |
| Icons | Lucide React |
| Components | Radix UI (Button, Switch, Slider, etc.) |
| Fonts | Geist, Geist Mono (Next.js variable fonts) |
| Deployment | Vercel (recommended) |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page (hero, CTAs, flow steps)
│   ├── dashboard/page.tsx          # Security command center
│   ├── agents/page.tsx             # Agent fleet registry
│   ├── agents/[id]/page.tsx        # Agent detail + evaluation history
│   ├── evaluations/page.tsx        # Evaluation run browser
│   ├── evaluations/[id]/page.tsx   # Evaluation detail + trace logs
│   ├── findings/page.tsx           # Vulnerability findings board
│   ├── guardrails/page.tsx         # Guardrail policy library
│   ├── scenarios/page.tsx          # Adversarial scenario catalogue
│   ├── safety-drill/page.tsx       # Interactive live drill runner
│   ├── activity/page.tsx           # Audit/activity log
│   ├── settings/page.tsx           # Platform settings & integrations
│   └── token-intelligence/page.tsx # AI Token Intelligence feature
├── components/
│   ├── layout/
│   │   ├── dashboard-layout.tsx    # Sidebar + header layout shell
│   │   ├── sidebar.tsx             # Responsive navigation sidebar
│   │   └── header.tsx              # Top bar with breadcrumbs
│   └── ui/
│       ├── trust-mesh.tsx          # Animated canvas background
│       ├── button.tsx              # Design system button variants
│       ├── input.tsx               # Design system input
│       ├── switch.tsx              # Toggle switch
│       └── slider.tsx              # Range slider
├── data/
│   ├── mock-data.ts                # Mock agents, evaluations, guardrails
│   └── token-catalog.ts            # 7 AI providers, 20+ models, pricing
├── lib/
│   ├── utils.ts                    # cn() className utility
│   └── token-engine.ts             # Deterministic token estimation engine
└── types/
    ├── index.ts                    # Core platform types
    └── token-intelligence.ts       # Token Intelligence domain types
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/ayushkorde-hash/trustmesh.git
cd trustmesh

# 2. Install dependencies
npm install

# 3. Start development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Preview

```bash
# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

---

## Key Features

### 🔴 Safety Drill Runner (`/safety-drill`)
Interactive simulation of adversarial attacks against registered agents. Configure the target agent, select OWASP attack category, run the drill, and view a real-time streaming response with policy intercept events.

### 🛡️ Guardrail Policy Library (`/guardrails`)
Manage pre-execution sanitizer rules, argument validators, and approval workflows. Enable/disable rules individually. Each guardrail links to the findings that generated it.

### 📊 Evaluations (`/evaluations`, `/evaluations/[id]`)
Browse historical evaluation runs, filter by status and risk level, and drill into full trace logs with per-turn tool call payloads, reasoning snippets, and policy decisions.

### 🤖 Agent Fleet (`/agents`, `/agents/[id]`)
Register autonomous agents with tool scopes, permission boundaries, and baseline objectives. View per-agent trust scores, risk history, and active guardrails.

### 💡 AI Token Intelligence (`/token-intelligence`)
**Deterministic, client-side** token estimation across 7 AI providers (Anthropic, OpenAI, Google, DeepSeek, NVIDIA NIM, xAI, Ollama) and 20+ models.

Features:
- **BPE-accurate estimation** — Byte-Pair Encoding approximation ratios for prose vs. code
- **Agent overhead accounting** — Tool schema JSON, RAG retrieval chunks, planning prefixes
- **Use-case presets** — Chat, coding, research, RAG, agent tools, document analysis, and more
- **Model comparison matrix** — Side-by-side cost vs. context utilization for all models
- **Budget health meter** — Configurable monthly token and spend limits with warning thresholds

> ⚠️ All estimates are deterministic approximations. No API keys or billing calls are made.

### 🔎 Findings (`/findings`)
Structured vulnerability reports categorised by OWASP LLM Top 10, with severity ratings, affected agents, and recommended guardrail mitigations.

---

## Design System

TrustMesh uses a **premium black-on-black dark aesthetic**:

| Token | Value | Usage |
|---|---|---|
| Background | `#050607` | Page background |
| Surface | `#090A0E` | Cards and panels |
| Elevated | `#0E1017` | Active elements |
| Primary | Violet `600–700` | CTAs, active states |
| Accent | Violet `400` | Icons, highlights |
| Text | `#F4F4F6` | Foreground |
| Muted | `rgba(255,255,255,0.45)` | Secondary text |
| Border | `rgba(255,255,255,0.07–0.12)` | Subtle dividers |

---

## Token Intelligence Data Boundaries

Token Intelligence runs entirely in the browser and never sends model prompts, API keys, or billing requests. Its values are deliberately separated into:

- **Estimated usage:** deterministic workload estimates based on heuristic token ratios, not exact tokenizer output.
- **Catalog-rate projection:** estimated tokens multiplied by the bundled reference values in `src/data/token-catalog.ts`; these are not live billing values.
- **Locally tracked usage:** unavailable in this demo because no local usage collector is connected.
- **Verified provider-reported usage or quota:** unavailable until a provider integration explicitly returns usage or billing data.

Every catalog entry links to a provider source. Verify that source before making a purchasing decision.

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Set environment variables (if any) in Vercel dashboard
# No API keys are required — Token Intelligence runs client-side
```

Or connect the GitHub repository directly in the [Vercel dashboard](https://vercel.com/new).

**Build settings** (auto-detected):
- Framework: Next.js
- Build command: `npm run build`
- Output directory: `.next`
- Install command: `npm install`

---

## Hackathon Context

TrustMesh was built as a hackathon submission demonstrating a complete AI-agent security SaaS:

- ✅ Full Next.js App Router SaaS with 12 routes
- ✅ Typed mock data layer (agents, evaluations, findings, guardrails, scenarios)
- ✅ Interactive Safety Drill runner with simulated streaming
- ✅ AI Token Intelligence with deterministic estimation engine (no API keys)
- ✅ Responsive dark SaaS design with Framer Motion animations
- ✅ ESLint 0 errors, TypeScript 0 errors
- ✅ Production build passes

---

## License

MIT © Ayush Korde
