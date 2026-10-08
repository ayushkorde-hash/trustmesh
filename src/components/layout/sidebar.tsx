"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Bot,
  ClipboardList,
  FileText,
  AlertTriangle,
  Shield,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { motion } from "framer-motion";

const navGroups = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Agents", href: "/agents", icon: Bot },
      { name: "Evaluations", href: "/evaluations", icon: ClipboardList },
      { name: "Safety Drills", href: "/safety-drill", icon: ShieldAlert },
    ]
  },
  {
    title: "Intelligence",
    items: [
      { name: "Findings", href: "/findings", icon: AlertTriangle },
      { name: "Guardrails", href: "/guardrails", icon: Shield },
      { name: "Scenarios", href: "/scenarios", icon: FileText },
    ]
  },
  {
    title: "System",
    items: [
      { name: "Activity", href: "/activity", icon: Activity },
      { name: "Settings", href: "/settings", icon: Settings },
    ]
  }
];

export function Sidebar({ collapsed = false, onToggle }: { collapsed?: boolean; onToggle?: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-full bg-background border-r border-border/50 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn("flex h-16 items-center px-4 border-b border-border/50 bg-background/50 backdrop-blur", collapsed ? "justify-center" : "justify-between")}>
        <Link href="/" className="flex items-center gap-3 font-semibold text-lg hover:opacity-80 transition-opacity">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>
          {!collapsed && <span>TRUSTMESH</span>}
        </Link>
        {!collapsed && onToggle && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6" aria-label="Main navigation">
        {navGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-1">
            {!collapsed && (
              <h4 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                {group.title}
              </h4>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 group overflow-hidden",
                    isActive
                      ? "text-primary-foreground bg-primary shadow-sm"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                    collapsed && "justify-center"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon className={cn("h-4 w-4 flex-shrink-0 transition-colors", isActive ? "text-primary-foreground" : "group-hover:text-foreground")} />
                  {!collapsed && <span className="relative z-10">{item.name}</span>}
                  
                  {/* Active Indicator Background Glow */}
                  {isActive && !collapsed && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-primary z-0 rounded-md"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {isActive && !collapsed && <span className="relative z-10">{item.name}</span>}
                  {isActive && collapsed && (
                     <motion.div
                     layoutId="activeNavIndicator"
                     className="absolute inset-0 bg-primary z-0 rounded-md"
                     initial={false}
                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
                   />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className={cn("p-4 border-t border-border/50 bg-background/50", collapsed && "hidden")}>
        <div className="rounded-lg border border-border/50 bg-secondary/20 p-3 flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-wide">Workspace</span>
          <span className="text-xs text-muted-foreground">Ayush's Org</span>
        </div>
      </div>
    </aside>
  );
}