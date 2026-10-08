"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  CircleDot,
  FileSearch,
  Flag,
  Gauge,
  LockKeyhole,
  Search,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type EvaluationEventType =
  | "scenario"
  | "agent"
  | "observation"
  | "tool"
  | "policy"
  | "evaluation"
  | "finding";

export type EvaluationEventStatus =
  | "pending"
  | "running"
  | "success"
  | "warning"
  | "blocked"
  | "failed";

export type EvaluationEventSeverity = "critical" | "high" | "medium" | "low";

export interface EvaluationTimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: EvaluationEventType;
  status: EvaluationEventStatus;
  tool?: string;
  severity?: EvaluationEventSeverity;
  details?: Record<string, string>;
}

interface EvaluationTimelineProps {
  events: EvaluationTimelineEvent[];
  className?: string;
}

const eventIcons: Record<EvaluationEventType, LucideIcon> = {
  scenario: FileSearch,
  agent: Bot,
  observation: Search,
  tool: Wrench,
  policy: LockKeyhole,
  evaluation: Gauge,
  finding: Flag,
};

const statusStyles: Record<EvaluationEventStatus, string> = {
  pending: "border-zinc-500/40 bg-zinc-500/10 text-zinc-400",
  running: "border-sky-400/40 bg-sky-400/10 text-sky-300",
  success: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  warning: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  blocked: "border-orange-400/40 bg-orange-400/10 text-orange-300",
  failed: "border-red-400/40 bg-red-400/10 text-red-300",
};

const statusLabels: Record<EvaluationEventStatus, string> = {
  pending: "Pending",
  running: "Running",
  success: "Success",
  warning: "Warning",
  blocked: "Blocked",
  failed: "Failed",
};

const severityStyles: Record<EvaluationEventSeverity, string> = {
  critical: "text-red-300",
  high: "text-orange-300",
  medium: "text-amber-300",
  low: "text-emerald-300",
};

function formatDetailLabel(label: string): string {
  return label.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (character) => character.toUpperCase());
}

export function EvaluationTimeline({ events, className }: EvaluationTimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(events[0]?.id ?? null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <ol className={cn("space-y-0", className)} aria-label="Evaluation event timeline">
      {events.map((event, index) => {
        const Icon = eventIcons[event.type];
        const isExpanded = expandedId === event.id;
        const hasDetails = Boolean(event.description || event.tool || event.severity || event.details);

        return (
          <li key={event.id} className="relative flex gap-3 pb-4 last:pb-0 sm:gap-4">
            {index < events.length - 1 && (
              <span className="absolute left-[15px] top-9 bottom-0 w-px bg-border/60" aria-hidden="true" />
            )}

            <div
              className={cn(
                "relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                statusStyles[event.status],
                event.status === "running" && "motion-safe:animate-pulse"
              )}
              aria-hidden="true"
            >
              <Icon className="h-3.5 w-3.5" />
            </div>

            <div className="min-w-0 flex-1">
              <button
                type="button"
                className="group flex w-full min-w-0 items-start gap-3 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-expanded={isExpanded}
                aria-controls={`evaluation-event-${event.id}`}
                onClick={() => setExpandedId(isExpanded ? null : event.id)}
              >
                <time className="shrink-0 pt-0.5 font-mono text-[11px] text-muted-foreground sm:w-16">
                  {event.timestamp}
                </time>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground group-hover:text-primary">
                    {event.title}
                  </span>
                  <span className={cn("mt-1 inline-flex rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-wider", statusStyles[event.status])}>
                    {statusLabels[event.status]}
                  </span>
                </span>
                <CircleDot className={cn("mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform", isExpanded && "rotate-90")} aria-hidden="true" />
              </button>

              {hasDetails && (
                <motion.div
                  id={`evaluation-event-${event.id}`}
                  initial={false}
                  animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 rounded-md border border-border/60 bg-background/40 px-3 py-3 text-xs">
                    <p className="leading-relaxed text-muted-foreground">{event.description}</p>
                    {(event.tool || event.severity || event.details) && (
                      <dl className="mt-3 grid gap-2 border-t border-border/50 pt-3 sm:grid-cols-2">
                        {event.tool && (
                          <div>
                            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Tool</dt>
                            <dd className="mt-0.5 font-mono text-foreground">{event.tool}</dd>
                          </div>
                        )}
                        {event.severity && (
                          <div>
                            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Risk</dt>
                            <dd className={cn("mt-0.5 font-medium capitalize", severityStyles[event.severity])}>{event.severity}</dd>
                          </div>
                        )}
                        {Object.entries(event.details ?? {}).map(([label, value]) => (
                          <div key={label}>
                            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{formatDetailLabel(label)}</dt>
                            <dd className="mt-0.5 text-foreground">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}