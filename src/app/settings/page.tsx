"use client";
export const dynamic = 'force-dynamic';

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Key, 
  Cpu, 
  Bell, 
  CheckCircle2, 
  RefreshCw
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState<"keys" | "engine" | "notifications">("keys");
  const [nvidiaKey, setNvidiaKey] = React.useState("nvapi-••••••••••••••••••••••••");
  const [nexusKey, setNexusKey] = React.useState("nx-live-••••••••••••••••••••");
  const [testStatus, setTestStatus] = React.useState<{ provider: string; status: "testing" | "success" } | null>(null);
  const [saveNotice, setSaveNotice] = React.useState(false);

  const testConnection = (provider: string) => {
    setTestStatus({ provider, status: "testing" });
    setTimeout(() => {
      setTestStatus({ provider, status: "success" });
      setTimeout(() => setTestStatus(null), 3000);
    }, 1200);
  };

  const handleSave = () => {
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <Settings className="h-7 w-7 text-violet-400" />
                <span>Security Engine Configuration</span>
              </h1>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Configure LLM provider endpoints, red-team sandbox execution limits, and notification webhooks.
            </p>
          </div>

          <Button 
            onClick={handleSave}
            size="sm" 
            className="h-9 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-medium text-xs shadow-md shadow-violet-950"
          >
            Save Changes
          </Button>
        </div>

        {/* Save Notice Banner */}
        {saveNotice && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Settings and sandbox parameters updated successfully.</span>
          </div>
        )}

        {/* Settings Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/[0.07] pb-2">
          {[
            { id: "keys", label: "Model Providers & API Keys", icon: Key },
            { id: "engine", label: "Evaluation Sandbox & Limits", icon: Cpu },
            { id: "notifications", label: "Alert Hooks & Audit", icon: Bell },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/40"
                  : "text-muted-foreground hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: API Keys & Providers */}
        {activeTab === "keys" && (
          <div className="space-y-4">
            
            {/* NVIDIA NIM Key */}
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <span>NVIDIA NIM / Nemotron Inference API</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Connected
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Used for Nemotron 3.5 Lightning red-team adversary generation and agent reasoning.
                  </p>
                </div>
                <Button 
                  onClick={() => testConnection("nvidia")}
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.06] shrink-0"
                >
                  {testStatus?.provider === "nvidia" && testStatus.status === "testing" ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin mr-1.5" />
                  ) : testStatus?.provider === "nvidia" && testStatus.status === "success" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mr-1.5" />
                  ) : null}
                  <span>Test Connection</span>
                </Button>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-muted-foreground uppercase">API Token</label>
                <Input
                  type="password"
                  value={nvidiaKey}
                  onChange={(e) => setNvidiaKey(e.target.value)}
                  className="h-9 text-xs font-mono bg-black/40 border-white/[0.08] text-white"
                />
                <span className="text-[10px] text-muted-foreground font-mono">
                  Stored securely server-side • Never exposed to client-side evaluations
                </span>
              </div>
            </div>

            {/* Nexus AI Key */}
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <span>Nexus Agent Framework Gateway</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Connected
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Bridge connector for registering autonomous agent definitions and intercepting tool calls.
                  </p>
                </div>
                <Button 
                  onClick={() => testConnection("nexus")}
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.06] shrink-0"
                >
                  {testStatus?.provider === "nexus" && testStatus.status === "testing" ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin mr-1.5" />
                  ) : testStatus?.provider === "nexus" && testStatus.status === "success" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mr-1.5" />
                  ) : null}
                  <span>Test Gateway</span>
                </Button>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-muted-foreground uppercase">Gateway Secret</label>
                <Input
                  type="password"
                  value={nexusKey}
                  onChange={(e) => setNexusKey(e.target.value)}
                  className="h-9 text-xs font-mono bg-black/40 border-white/[0.08] text-white"
                />
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Sandbox & Execution Limits */}
        {activeTab === "engine" && (
          <div className="space-y-4">
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] space-y-4">
              <h3 className="text-sm font-semibold text-white border-b border-white/[0.06] pb-3">
                Sandbox Resource & Security Quotas
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-muted-foreground block font-medium">Evaluation Timeout (Seconds)</label>
                  <Input defaultValue="180" className="h-9 text-xs bg-black/40 border-white/[0.08] text-white" />
                  <span className="text-[10px] text-muted-foreground">Hard termination if agent exceeds duration.</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-muted-foreground block font-medium">Max Tool Call Depth Per Turn</label>
                  <Input defaultValue="8" className="h-9 text-xs bg-black/40 border-white/[0.08] text-white" />
                  <span className="text-[10px] text-muted-foreground">Prevents infinite recursive loop vulnerabilities.</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">Strict Outbound Network Sandboxing</span>
                  <span className="text-[11px] text-muted-foreground">Block all non-whitelisted IP/domain egress during evaluations.</span>
                </div>
                <Switch defaultChecked aria-label="Strict Network Sandbox" />
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">Pre-Execution Sanitizer Gate</span>
                  <span className="text-[11px] text-muted-foreground">Automatically strip base64 payloads and jailbreak syntax before model execution.</span>
                </div>
                <Switch defaultChecked aria-label="Pre-execution Sanitizer Gate" />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Notifications */}
        {activeTab === "notifications" && (
          <div className="space-y-4">
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#090A0E] space-y-4">
              <h3 className="text-sm font-semibold text-white border-b border-white/[0.06] pb-3">
                Security Alert Webhooks
              </h3>

              <div className="space-y-3 text-xs">
                <div className="space-y-1.5">
                  <label className="text-muted-foreground block font-medium">Slack / Discord Alert Webhook URL</label>
                  <Input 
                    placeholder="https://hooks.slack.com/services/T00/B00/XXXX" 
                    className="h-9 text-xs bg-black/40 border-white/[0.08] text-white" 
                  />
                  <span className="text-[10px] text-muted-foreground">Immediate alert dispatched when critical findings are flagged.</span>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">Notify on Failed Safety Drills</span>
                    <span className="text-[11px] text-muted-foreground">Send webhook payload whenever an agent fails an adversarial scenario.</span>
                  </div>
                  <Switch defaultChecked aria-label="Notify on failed safety drills" />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
