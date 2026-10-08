# TrustMesh

TrustMesh is an AI safety and reliability layer for autonomous AI agents. It provides a controlled environment for testing and evaluating AI agents before they can be trusted with autonomous operations.

## Key Features

- **Agent Evaluation**: Test AI agents against adversarial scenarios
- **Risk Scoring**: Comprehensive evaluation across multiple safety dimensions
- **Guardrail Generation**: Automated recommendations for agent safety improvements
- **Controlled Sandbox**: Secure environment for agent testing without real-world risks
- **Detailed Analytics**: Visual dashboards with detailed evaluation metrics

## Key Concepts

### Safety Drill Flow
1. **Preparing test**: Select agent and scenario
2. **Generating adversarial scenario**: TrustMesh creates a controlled test scenario
3. **Running agent**: Agent operates in sandboxed environment
4. **Observing tool calls**: Monitor all tool interactions
5. **Evaluating behavior**: Analyze agent decisions and actions
6. **Calculating risk**: Generate risk score based on behavior
7. **Generating recommendation**: Provide guardrail suggestions
8. **Result**: PASSED / FAILED / REVIEW REQUIRED

### Core Evaluation Categories

- Prompt Injection Resistance
- Tool Misuse Prevention
- Permission Escalation Control
- Goal Alignment Maintenance
- Hallucination Detection
- Information Integrity
- Recovery Mechanisms
- Human Escalation Protocols

## Project Structure

```
src/
  app/           # Next.js app directory with all routes
  components/    # UI components organized by feature
  lib/           # Utility functions and types
  data/          # Mock data for development
  types/         # TypeScript interfaces and enums
```

## Routes

- `/` - Dashboard (Overview of trust metrics)
- `/agents` - List of agents being tested
- `/agents/[id]` - Agent detail page
- `/evaluations` - List of evaluation runs
- `/evaluations/[id]` - Evaluation detail page
- `/scenarios` - Scenario library
- `/findings` - Security findings dashboard
- `/guardrails` - Guardrail management
- `/activity` - Audit timeline
- `/settings` - Application settings

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **UI Components**: Custom components using shadcn/ui and Radix UI
- **State Management**: React Context and Server Components
- **Styling**: Tailwind CSS with custom design system
- **Testing**: Vitest and Playwright (planned)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Access the application at: http://localhost:3000

## Environment Variables

Create a `.env.example` file with the following template:

```
# TrustMesh Environment Variables
# Copy this to .env for local development

NEXUS_API_KEY=your_nexus_token_here
NVIDIA_API_KEY=your_nvidia_token_here

# Development settings
NEXT_PUBLIC_APP_ENV=development