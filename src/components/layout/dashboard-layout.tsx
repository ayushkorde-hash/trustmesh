"use client";

import * as React from "react";
import { Suspense } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Suspense fallback={<div className="fixed left-0 top-0 z-40 h-full w-64 bg-background border-r border-border/50" />}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </Suspense>

      {/* Main content */}
      <div className={cn(
        "transition-all duration-300",
        sidebarCollapsed ? "lg:pl-16" : "lg:pl-64",
      )}>
        <Suspense fallback={<div className="h-16 border-b border-border/50 bg-background/80" />}>
          <Header onMenuClick={() => setMobileSidebarOpen(true)} />
        </Suspense>
        <main id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}