"use client";
export const dynamic = 'force-dynamic';

import { cn } from "@/lib/utils";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateId } from "@/lib/utils";

interface SettingsType {
  id: string;
  name: string;
  description: string;
  value: string | number | boolean | string[];
}

const settings: SettingsType[] = [
  {
    id: "settings-001",
    name: "General",
    description: "General application settings",
    value: "General",
  },
  {
    id: "settings-002",
    name: "Theme",
    description: "Select the UI theme",
    value: "dark", // options: "light", "dark", "system"
  },
  {
    id: "settings-003",
    name: "Notifications",
    description: "Enable/disable desktop notifications",
    value: true,
  },
  {
    id: "settings-004",
    name: "API Rate Limit",
    description: "Maximum API calls per minute",
    value: 60,
  },
  {
    id: "settings-005",
    name: "Data Retention",
    description: "How long to keep evaluation data",
    value: "30d",
  },
  {
    id: "settings-006",
    name: "Backup Frequency",
    description: "Frequency of automatic backups",
    value: "daily",
  },
  {
    id: "settings-008",
    name: "Support Email",
    description: "Contact email for support",
    value: "support@trustmesh.ai",
  },
  {
    id: "settings-008",
    name: "Developer Mode",
    description: "Enable developer tools and debug mode",
    value: false,
  },
  {
    id: "settings-010",
    name: "Beta Features",
    description: "Enable experimental features",
    value: true,
  },
  {
    id: "settings-010",
    name: "Safety Drill Mode",
    description: "Enable enhanced safety drill simulations",
    value: true,
  },
];

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto lg:pl-64">
        <Header onMenuClick={() => {}} />

        <div className="pb-4">
          <h1 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Settings
          </h1>
        </div>

        <div className="mt-6">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {settings.map((setting) => (
                  <Card key={setting.id} className="p-4 border rounded">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">{setting.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">{setting.description}</span>
                        <span className="ml-auto text-sm text-muted-foreground">{setting.value}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </DashboardLayout>
  );
}
