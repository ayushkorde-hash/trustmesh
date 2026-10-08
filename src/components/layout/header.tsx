"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Bell, User, LogOut, Settings, Search, Menu, ChevronRight } from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  
  // Create breadcrumb from pathname
  const paths = pathname.split('/').filter(p => p);
  const breadcrumbs = paths.map(p => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' '));
  if (breadcrumbs.length === 0) breadcrumbs.push("Dashboard");

  return (
    <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden text-muted-foreground">
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Breadcrumbs */}
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span>TrustMesh</span>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-foreground">{breadcrumbs[breadcrumbs.length - 1]}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Global Search */}
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search agents, evaluations..." 
              className="w-full bg-secondary/30 border-border/50 pl-9 h-9 text-sm focus-visible:ring-1 focus-visible:ring-primary rounded-full transition-all hover:bg-secondary/50 focus:bg-background"
            />
            <div className="absolute right-2.5 top-2 flex items-center gap-1">
              <kbd className="inline-flex h-5 items-center rounded border border-border/50 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-background" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 border-border/50">
              <div className="px-4 py-3 border-b border-border/50">
                <h4 className="font-semibold text-sm">Notifications</h4>
              </div>
              <div className="py-2">
                <div className="px-4 py-3 hover:bg-secondary/30 transition-colors cursor-pointer flex gap-3">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-red-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Critical vulnerability found</p>
                    <p className="text-xs text-muted-foreground mt-1">Research Agent failed prompt injection scenario.</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full overflow-hidden border border-border/50 p-0">
                <Avatar className="h-full w-full">
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">AY</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-border/50">
              <div className="flex flex-col space-y-1 p-3">
                <p className="text-sm font-medium leading-none">Ayush</p>
                <p className="text-xs leading-none text-muted-foreground mt-1">ayush@trustmesh.ai</p>
              </div>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem className="text-xs cursor-pointer focus:bg-secondary/50">
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs cursor-pointer focus:bg-secondary/50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem className="text-xs text-red-500 focus:bg-red-500/10 focus:text-red-500 cursor-pointer">
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}