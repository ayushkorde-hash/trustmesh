import * as React from "react";
import { cn } from "@/lib/utils";
import { getSeverityColor, getStatusColor, getRiskLevelColor } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info";
  severity?: "critical" | "high" | "medium" | "low";
  status?: "passed" | "failed" | "review" | "running" | "pending" | "active" | "inactive" | "testing" | "draft" | "open" | "investigating" | "resolved" | "ignored";
  riskLevel?: "critical" | "high" | "medium" | "low";
}

function Badge({ className, variant = "default", severity, status, riskLevel, ...props }: BadgeProps) {
  let variantClass = "";
  
  if (severity) {
    variantClass = getSeverityColor(severity);
  } else if (status) {
    variantClass = getStatusColor(status);
  } else if (riskLevel) {
    variantClass = getRiskLevelColor(riskLevel);
  } else {
    switch (variant) {
      case "default": variantClass = "bg-primary text-primary-foreground hover:bg-primary/80"; break;
      case "secondary": variantClass = "bg-secondary text-secondary-foreground hover:bg-secondary/80"; break;
      case "destructive": variantClass = "bg-destructive text-destructive-foreground hover:bg-destructive/80"; break;
      case "outline": variantClass = "text-foreground"; break;
      case "success": variantClass = "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"; break;
      case "warning": variantClass = "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"; break;
      case "info": variantClass = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"; break;
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantClass,
        className
      )}
      {...props}
    />
  );
}

export { Badge };