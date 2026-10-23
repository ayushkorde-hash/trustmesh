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
  X,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const NAV_GROUPS = [
  {
    title: "Workspace",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Token Intelligence", href: "/token-intelligence", icon: Cpu },
      { name: "Agents", href: "/agents", icon: Bot },
      { name: "Evaluations", href: "/evaluations", icon: ClipboardList },
      { name: "Safety Drill", href: "/safety-drill", icon: ShieldAlert },
    ]
  },
  {
    title: "Security",
    items: [
      { name: "Findings", href: "/findings", icon: AlertTriangle },
      { name: "Guardrails", href: "/guardrails", icon: Shield },
      { name: "Scenarios", href: "/scenarios", icon: FileText },
    ]
  },
  {
    title: "Operations",
    items: [
      { name: "Activity", href: "/activity", icon: Activity },
      { name: "Settings", href: "/settings", icon: Settings },
    ]
  }
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ 
  collapsed = false, 
  onToggle,
  mobileOpen = false,
  onMobileClose
}: SidebarProps) {
  const pathname = usePathname();

  // Handle ESC key to close mobile drawer
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen && onMobileClose) {
        onMobileClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, onMobileClose]);

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between select-none">
      {/* Top Header / Branding */}
      <div>
        <div className={cn(
          "flex h-16 items-center px-4 border-b border-white/[0.07] bg-background/80 backdrop-blur-md",
          collapsed ? "justify-center" : "justify-between"
        )}>
          <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight hover:opacity-90 transition-opacity">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-sm ring-1 ring-violet-400/30">
              <ShieldCheck className="h-4.5 w-4.5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400"></span>
              </span>
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wider text-foreground">TRUSTMESH</span>
                <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase">AI SEC LAYER</span>
              </div>
            )}
          </Link>
          {!collapsed && onToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-white/[0.05] rounded-md hidden lg:flex"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          {mobileOpen && onMobileClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileClose}
              className="h-8 w-8 text-muted-foreground hover:text-foreground lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Collapsed expand trigger */}
        {collapsed && onToggle && (
          <div className="p-2 border-b border-white/[0.07] flex justify-center hidden lg:flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"
              title="Expand sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Navigation */}
        <nav className="py-4 px-3 space-y-6" aria-label="Main navigation">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              {!collapsed && (
                <h4 className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">
                  {group.title}
                </h4>
              )}
              {group.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => mobileOpen && onMobileClose?.()}
                    className={cn(
                      "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150 group overflow-hidden",
                      isActive
                        ? "text-white bg-gradient-to-r from-violet-600/20 to-violet-500/10 border border-violet-500/30 shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]",
                      collapsed && "justify-center px-2"
                    )}
                    title={collapsed ? item.name : undefined}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-violet-400" />
                    )}
                    <item.icon className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isActive ? "text-violet-400" : "text-muted-foreground group-hover:text-foreground"
                    )} />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer / Telemetry status */}
      <div className={cn("p-3 border-t border-white/[0.07] bg-background/50", collapsed && "hidden")}>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-foreground/90">Sandbox Telemetry</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight">
            Heuristic security runtime • Demo Mode
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full bg-[#07080B] border-r border-white/[0.07] transition-all duration-300 hidden lg:block",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden"
              onClick={onMobileClose}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-[#07080B] border-r border-white/[0.08] lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}