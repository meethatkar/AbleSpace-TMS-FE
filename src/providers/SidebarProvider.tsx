"use client";

import React from "react";
import { useStore } from "@/stores/root.store";

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useSidebar() {
  const store = useStore();
  return {
    isOpen: store.uiStore.sidebarOpen,
    toggleSidebar: () => store.uiStore.toggleSidebar(),
  };
}
