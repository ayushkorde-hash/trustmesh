"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

const storageKey = "trustmesh-theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.cookie = `${storageKey}=${theme}; path=/; max-age=31536000; samesite=lax`;
  try {
    window.localStorage.setItem(storageKey, theme);
  } catch {
    // Cookie persistence remains available when storage is restricted.
  }
  window.dispatchEvent(new Event("trustmesh-themechange"));
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("trustmesh-themechange", onStoreChange);
  return () => window.removeEventListener("trustmesh-themechange", onStoreChange);
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const theme = React.useSyncExternalStore(subscribe, getThemeSnapshot, getServerThemeSnapshot);

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-8 w-8 rounded-md border border-border bg-background text-foreground hover:bg-muted"
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      onClick={() => {
        applyTheme(nextTheme);
      }}
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
}
