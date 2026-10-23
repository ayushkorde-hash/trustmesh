import { ModelMetadata, UseCasePreset, AIProviderId } from "@/types/token-intelligence";

export interface ProviderInfo {
  id: AIProviderId;
  name: string;
  category: 'cloud' | 'local' | 'hybrid';
  description: string;
  defaultEndpoint: string;
  supportsStreaming: boolean;
  supportsTools: boolean;
  quotaReportingSupported: boolean;
}

export const AI_PROVIDERS: ProviderInfo[] = [
  {
    id: "anthropic",
    name: "Anthropic Claude",
    category: "cloud",
    description: "Industry-leading reasoning, constitutional alignment, and long-horizon tool execution.",
    defaultEndpoint: "https://api.anthropic.com/v1",
    supportsStreaming: true,
    supportsTools: true,
    quotaReportingSupported: false // Does not expose live remaining credits via basic headers
  },
  {
    id: "openai",
    name: "OpenAI",
    category: "cloud",
    description: "High-capability flagship models and fast reasoning models with extensive ecosystem integration.",
    defaultEndpoint: "https://api.openai.com/v1",
    supportsStreaming: true,
    supportsTools: true,
    quotaReportingSupported: false
  },
  {
    id: "deepseek",
    name: "DeepSeek AI",
    category: "cloud",
    description: "High token efficiency and ultra-low cost frontier coding and reasoning architectures.",
    defaultEndpoint: "https://api.deepseek.com/v1",
    supportsStreaming: true,
    supportsTools: true,
    quotaReportingSupported: false
  },
  {
    id: "google",
    name: "Google Gemini",
    category: "cloud",
    description: "Ultra-large 1M-2M context windows with multimodal grounding and fast inference.",
    defaultEndpoint: "https://generativelanguage.googleapis.com/v1beta",
    supportsStreaming: true,
    supportsTools: true,
    quotaReportingSupported: false
  },
  {
    id: "nvidia",
    name: "NVIDIA NIM",
    category: "hybrid",
    description: "Enterprise self-hosted and cloud containerized microservices for open models like Nemotron.",
    defaultEndpoint: "https://integrate.api.nvidia.com/v1",
    supportsStreaming: true,
    supportsTools: true,
    quotaReportingSupported: false
  },
  {
    id: "xai",
    name: "xAI (Grok)",
    category: "cloud",
    description: "Frontier reasoning and real-time knowledge synthesis.",
    defaultEndpoint: "https://api.x.ai/v1",
    supportsStreaming: true,
    supportsTools: true,
    quotaReportingSupported: false
  },
  {
    id: "ollama",
    name: "Ollama (Local)",
    category: "local",
    description: "Run open models entirely on-device (Mac, Linux, Windows). Zero network egress, zero token costs.",
    defaultEndpoint: "http://localhost:11434/api",
    supportsStreaming: true,
    supportsTools: true,
    quotaReportingSupported: true // Unlimited local compute
  }
];

export const MODEL_CATALOG: ModelMetadata[] = [
  // Anthropic
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    providerId: "anthropic",
    providerName: "Anthropic",
    description: "Premier choice for complex agentic workflows, deterministic coding, and deep reasoning.",
    contextWindowTokens: 200000,
    maxOutputTokens: 8192,
    pricing: {
      inputPerMillionUSD: 3.00,
      outputPerMillionUSD: 15.00,
      sourceUrl: "https://www.anthropic.com/pricing",
      lastVerifiedDate: "2026-10-15"
    },
    isLocal: false,
    strengths: ["World-class agent tool use", "Strict adherence to system constraints", "Low hallucination"],
    tradeoffs: ["Higher output cost than mini models", "200k max context"],
    recommendedUseCases: ["agent_tools", "coding", "research", "doc_analysis"],
    relativeQualityScore: 97,
    typicalSpeedTokensPerSec: 65
  },
  {
    id: "claude-3-5-haiku",
    name: "Claude 3.5 Haiku",
    providerId: "anthropic",
    providerName: "Anthropic",
    description: "High speed, lightweight model with strong intelligence for classification and fast agent routing.",
    contextWindowTokens: 200000,
    maxOutputTokens: 8192,
    pricing: {
      inputPerMillionUSD: 0.80,
      outputPerMillionUSD: 4.00,
      sourceUrl: "https://www.anthropic.com/pricing",
      lastVerifiedDate: "2026-10-15"
    },
    isLocal: false,
    strengths: ["Ultra-fast response latency", "Economical routing", "Strong tool calling for size"],
    tradeoffs: ["Less deep multi-hop reasoning than Sonnet"],
    recommendedUseCases: ["chat", "classification", "agent_tools"],
    relativeQualityScore: 88,
    typicalSpeedTokensPerSec: 120
  },

  // OpenAI
  {
    id: "gpt-4o",
    name: "GPT-4o (Omni)",
    providerId: "openai",
    providerName: "OpenAI",
    description: "Versatile flagship model with balanced speed, broad multimodal support, and structured outputs.",
    contextWindowTokens: 128000,
    maxOutputTokens: 16384,
    pricing: {
      inputPerMillionUSD: 2.50,
      outputPerMillionUSD: 10.00,
      sourceUrl: "https://openai.com/api/pricing/",
      lastVerifiedDate: "2026-10-10"
    },
    isLocal: false,
    strengths: ["Robust structured JSON schema enforcement", "Broad third-party integrations", "Fast response"],
    tradeoffs: ["128k context is smaller than Gemini or Claude"],
    recommendedUseCases: ["chat", "coding", "research", "agent_tools"],
    relativeQualityScore: 94,
    typicalSpeedTokensPerSec: 85
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    providerId: "openai",
    providerName: "OpenAI",
    description: "Extremely cost-efficient model designed for high-volume tasks, extraction, and triage.",
    contextWindowTokens: 128000,
    maxOutputTokens: 16384,
    pricing: {
      inputPerMillionUSD: 0.15,
      outputPerMillionUSD: 0.60,
      sourceUrl: "https://openai.com/api/pricing/",
      lastVerifiedDate: "2026-10-10"
    },
    isLocal: false,
    strengths: ["Incredible price-to-performance ratio", "Very low latency", "128k context"],
    tradeoffs: ["Can struggle with delicate adversarial prompt injections"],
    recommendedUseCases: ["chat", "classification", "doc_analysis"],
    relativeQualityScore: 82,
    typicalSpeedTokensPerSec: 140
  },

  // DeepSeek
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    providerId: "deepseek",
    providerName: "DeepSeek AI",
    description: "State-of-the-art open-weights MoE architecture offering frontier capabilities at disruptive pricing.",
    contextWindowTokens: 64000,
    maxOutputTokens: 8192,
    pricing: {
      inputPerMillionUSD: 0.14,
      outputPerMillionUSD: 0.28,
      sourceUrl: "https://platform.deepseek.com/api-docs/pricing/",
      lastVerifiedDate: "2026-10-12"
    },
    isLocal: false,
    strengths: ["Lowest commercial API price per token", "Exceptional code synthesis", "Fast cache hits"],
    tradeoffs: ["64k context limit", "Rate limits during peak global traffic"],
    recommendedUseCases: ["coding", "research", "classification"],
    relativeQualityScore: 92,
    typicalSpeedTokensPerSec: 75
  },

  // Google
  {
    id: "gemini-1-5-pro",
    name: "Gemini 1.5 Pro",
    providerId: "google",
    providerName: "Google",
    description: "Massive 2-million token context window designed for processing entire codebases, video, and audio.",
    contextWindowTokens: 2000000,
    maxOutputTokens: 8192,
    pricing: {
      inputPerMillionUSD: 3.50,
      outputPerMillionUSD: 10.50,
      sourceUrl: "https://ai.google.dev/pricing",
      lastVerifiedDate: "2026-10-08"
    },
    isLocal: false,
    strengths: ["Unrivaled 2,000,000 token context window", "Native needle-in-a-haystack recall across large books"],
    tradeoffs: ["Slightly higher latency on multi-million token prompts"],
    recommendedUseCases: ["long_context", "doc_analysis", "research"],
    relativeQualityScore: 95,
    typicalSpeedTokensPerSec: 55
  },
  {
    id: "gemini-1-5-flash",
    name: "Gemini 1.5 Flash",
    providerId: "google",
    providerName: "Google",
    description: "Lightweight, highly optimized model for high-frequency low-latency tasks with 1M context window.",
    contextWindowTokens: 1000000,
    maxOutputTokens: 8192,
    pricing: {
      inputPerMillionUSD: 0.075,
      outputPerMillionUSD: 0.30,
      sourceUrl: "https://ai.google.dev/pricing",
      lastVerifiedDate: "2026-10-08"
    },
    isLocal: false,
    strengths: ["1,000,000 token window at under $0.10/M tokens", "Extremely fast generation"],
    tradeoffs: ["Requires clear system instructions for complex tool calling"],
    recommendedUseCases: ["chat", "doc_analysis", "rag", "classification"],
    relativeQualityScore: 84,
    typicalSpeedTokensPerSec: 160
  },

  // NVIDIA NIM
  {
    id: "nemotron-3-5-lightning",
    name: "Nemotron 3.5 Lightning (NIM)",
    providerId: "nvidia",
    providerName: "NVIDIA NIM",
    description: "Optimized for enterprise agentic execution, structured reasoning, and high throughput on NVIDIA hardware.",
    contextWindowTokens: 128000,
    maxOutputTokens: 4096,
    pricing: {
      inputPerMillionUSD: 0.50,
      outputPerMillionUSD: 1.50,
      sourceUrl: "https://build.nvidia.com/nvidia/nemotron-3-5",
      lastVerifiedDate: "2026-10-18"
    },
    isLocal: false,
    strengths: ["Fine-tuned for synthetic data generation and agent stress testing", "NVIDIA TensorRT acceleration"],
    tradeoffs: ["4k maximum single-turn output tokens"],
    recommendedUseCases: ["agent_tools", "research", "coding"],
    relativeQualityScore: 90,
    typicalSpeedTokensPerSec: 95
  },

  // Ollama (Local Models)
  {
    id: "llama-3-2-3b-local",
    name: "Llama 3.2 3B (Local / Ollama)",
    providerId: "ollama",
    providerName: "Ollama Local",
    description: "Compact open model running 100% on local hardware. Zero API bills, complete data privacy.",
    contextWindowTokens: 128000,
    maxOutputTokens: 4096,
    pricing: {
      inputPerMillionUSD: 0.00,
      outputPerMillionUSD: 0.00,
      sourceUrl: "https://ollama.com/library/llama3.2",
      lastVerifiedDate: "2026-10-20",
      isEstimateOrFree: true
    },
    isLocal: true,
    strengths: ["Zero dollar API cost", "Complete local data privacy (no cloud egress)", "Runs on standard laptops"],
    tradeoffs: ["Constrained by local CPU/GPU RAM", "Lower complex reasoning than cloud frontier models"],
    recommendedUseCases: ["chat", "classification"],
    relativeQualityScore: 74,
    typicalSpeedTokensPerSec: 40
  },
  {
    id: "qwen-2-5-coder-7b-local",
    name: "Qwen 2.5 Coder 7B (Local / Ollama)",
    providerId: "ollama",
    providerName: "Ollama Local",
    description: "Specialized open-weight coding model running locally via Ollama with remarkable syntax accuracy.",
    contextWindowTokens: 32768,
    maxOutputTokens: 4096,
    pricing: {
      inputPerMillionUSD: 0.00,
      outputPerMillionUSD: 0.00,
      sourceUrl: "https://ollama.com/library/qwen2.5-coder",
      lastVerifiedDate: "2026-10-20",
      isEstimateOrFree: true
    },
    isLocal: true,
    strengths: ["Zero dollar API cost", "Exceptional local code refactoring and AST parsing"],
    tradeoffs: ["32k context limit on standard local quantization"],
    recommendedUseCases: ["coding"],
    relativeQualityScore: 85,
    typicalSpeedTokensPerSec: 35
  }
];

export const USE_CASE_PRESETS: UseCasePreset[] = [
  {
    id: "agent_tools",
    name: "Autonomous Agent with Tool Calls",
    description: "Multi-turn agent sessions invoking external tools (web search, file read/write, SQL). Higher prompt overhead for tool schemas and observations.",
    defaultPromptWords: 350,
    defaultOutputWords: 400,
    defaultRequestsPerDay: 40,
    defaultToolCallsPerTurn: 3,
    recommendedModelIds: ["claude-3-5-sonnet", "nemotron-3-5-lightning", "gpt-4o"]
  },
  {
    id: "coding",
    name: "Coding, Debugging & Refactoring",
    description: "Codebase exploration, AST generation, bug fixing, and unit test creation. Larger input context for file diffs.",
    defaultPromptWords: 1200,
    defaultOutputWords: 800,
    defaultRequestsPerDay: 50,
    recommendedModelIds: ["claude-3-5-sonnet", "deepseek-v3", "qwen-2-5-coder-7b-local"]
  },
  {
    id: "research",
    name: "Research & Synthesis Briefs",
    description: "Synthesizing market information, drafting security briefs, and cross-referencing multi-source articles.",
    defaultPromptWords: 800,
    defaultOutputWords: 1200,
    defaultRequestsPerDay: 25,
    recommendedModelIds: ["claude-3-5-sonnet", "gpt-4o", "gemini-1-5-pro"]
  },
  {
    id: "rag",
    name: "RAG & Knowledge Retrieval",
    description: "Injecting relevant document vector chunks alongside user queries into model context.",
    defaultPromptWords: 200,
    defaultOutputWords: 350,
    defaultRequestsPerDay: 150,
    defaultRetrievalChunks: 4,
    defaultChunkTokens: 400,
    recommendedModelIds: ["gemini-1-5-flash", "gpt-4o-mini", "claude-3-5-haiku"]
  },
  {
    id: "long_context",
    name: "Long-Context Document Analysis",
    description: "Ingesting entire PDF reports, contracts, or repository trees into a single comprehensive model session.",
    defaultPromptWords: 35000,
    defaultOutputWords: 1500,
    defaultRequestsPerDay: 8,
    recommendedModelIds: ["gemini-1-5-pro", "gemini-1-5-flash", "claude-3-5-sonnet"]
  },
  {
    id: "chat",
    name: "Conversational Chat & Assistance",
    description: "Standard back-and-forth conversational dialogues, user guidance, and customer service triage.",
    defaultPromptWords: 150,
    defaultOutputWords: 250,
    defaultRequestsPerDay: 100,
    recommendedModelIds: ["gpt-4o-mini", "claude-3-5-haiku", "llama-3-2-3b-local"]
  },
  {
    id: "classification",
    name: "Classification & Structured Extraction",
    description: "Labeling text, security log classification, policy compliance triage, and JSON extraction.",
    defaultPromptWords: 250,
    defaultOutputWords: 80,
    defaultRequestsPerDay: 500,
    recommendedModelIds: ["gpt-4o-mini", "gemini-1-5-flash", "deepseek-v3"]
  }
];

export function getModelById(modelId: string): ModelMetadata {
  return MODEL_CATALOG.find(m => m.id === modelId) || MODEL_CATALOG[0];
}

export function getProviderById(providerId: AIProviderId): ProviderInfo {
  return AI_PROVIDERS.find(p => p.id === providerId) || AI_PROVIDERS[0];
}

export function getUseCasePreset(useCaseId: string): UseCasePreset {
  return USE_CASE_PRESETS.find(u => u.id === useCaseId) || USE_CASE_PRESETS[0];
}
