"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Bell, LogOut, Settings, Search, Menu, ChevronRight, ShieldAlert, Sparkles } from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  
  // Format breadcrumb from pathname
  const paths = pathname.split('/').filter(Boolean);
  const currentTitle = paths.length === 0 
    ? "Dashboard" 
    : paths[paths.length - 1].replace(/-/g, ' ').replace(/^./, str => str.toUpperCase());

  return (
    <header className="sticky top-0 z-30 h-16 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="flex h-full items-center justify-between px-4 md:px-8">
        
        {/* Left: Mobile trigger & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onMenuClick} 
            className="lg:hidden text-muted-foreground hover:text-foreground h-9 w-9"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              TrustMesh
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
            <span className="text-foreground font-semibold">{currentTitle}</span>
          </div>

          {/* Engine indicator */}
          <div className="hidden sm:inline-flex items-center gap-1.5 ml-3 px-2 py-0.5 rounded-full border border-violet-500/20 bg-violet-500/10 text-[10px] font-mono text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            Evaluation Engine: Active (Demo Sandbox)
          </div>
        </div>

        {/* Right: Actions, Search, Notifications, User */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* Quick CTA to run Safety Drill */}
          <Link href="/safety-drill" className="hidden md:inline-flex">
            <Button size="sm" className="h-8 px-3 rounded-md bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-medium text-xs shadow-sm shadow-violet-950 border border-violet-400/20 flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Run Drill</span>
            </Button>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex relative w-56 lg:w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search agents, findings..." 
              className="w-full bg-white/[0.03] border-white/[0.08] pl-8 h-8 text-xs focus-visible:ring-1 focus-visible:ring-violet-500 rounded-md placeholder:text-muted-foreground/60"
            />
            <div className="absolute right-2 top-1.5">
              <kbd className="inline-flex h-4 items-center rounded border border-white/[0.1] bg-white/[0.04] px-1 font-mono text-[9px] text-muted-foreground">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"
                aria-label="View notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-violet-400 ring-2 ring-[#07080B]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 border-white/[0.1] bg-[#0C0E14] shadow-xl p-0">
              <div className="px-4 py-3 border-b border-white/[0.07] flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground uppercase tracking-wider">Alert Feed</span>
                <span className="text-[10px] text-violet-400 font-mono">1 Critical</span>
              </div>
              <div className="p-2 space-y-1">
                <div className="p-2.5 rounded-md hover:bg-white/[0.04] transition-colors cursor-pointer flex gap-2.5">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-red-400 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Critical Vulnerability Detected</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Research Agent failed adversarial prompt injection scenario.</p>
                    <span className="text-[10px] text-muted-foreground/60 mt-1 block">15m ago • EV-8921</span>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-8 w-8 rounded-full overflow-hidden border border-white/[0.1] p-0 hover:border-violet-500/50 transition-colors"
                aria-label="User account settings"
              >
                <Avatar className="h-full w-full">
                  <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-700 text-white text-[11px] font-semibold">
                    AY
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-white/[0.1] bg-[#0C0E14] shadow-xl">
              <div className="flex flex-col space-y-0.5 p-2">
                <p className="text-xs font-semibold text-foreground">Ayush</p>
                <p className="text-[11px] text-muted-foreground">Security Engineer (Admin)</p>
              </div>
              <DropdownMenuSeparator className="bg-white/[0.08]" />
              <DropdownMenuItem asChild className="text-xs cursor-pointer focus:bg-white/[0.06]">
                <Link href="/settings" className="flex items-center">
                  <Settings className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  Settings & API Keys
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-xs cursor-pointer focus:bg-white/[0.06]">
                <Link href="/activity" className="flex items-center">
                  <Sparkles className="h-3.5 w-3.5 mr-2 text-violet-400" />
                  Audit Trail
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/[0.08]" />
              <DropdownMenuItem className="text-xs text-red-400 focus:bg-red-500/10 focus:text-red-300 cursor-pointer">
                <LogOut className="h-3.5 w-3.5 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
