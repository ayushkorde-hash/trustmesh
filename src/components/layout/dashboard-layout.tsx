"use client";

import * as React from "react";
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
    <div className="min-h-screen bg-[#050607] text-[#F4F4F6] selection:bg-violet-500/20 selection:text-white flex flex-col">
      {/* Sidebar with mobile drawer support */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main content container with responsive left padding for fixed desktop sidebar */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 min-w-0",
        sidebarCollapsed ? "lg:pl-16" : "lg:pl-64"
      )}>
        <Header onMenuClick={() => setMobileSidebarOpen(true)} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}