"use client";

import React, { ReactNode } from "react";
import { StoreContext, getRootStore } from "@/stores/root.store";

export function StoreProvider({ children }: { children: ReactNode }) {
  const store = getRootStore();
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}
