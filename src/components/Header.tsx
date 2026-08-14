"use client";

import React from "react";
import { PanelLeft } from "lucide-react";
import { useSidebar } from "@/providers/SidebarProvider";
import { observer } from "mobx-react-lite";

const Header = observer(() => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex h-14 items-center justify-between border-b border-foreground/10 bg-background px-4 transition-colors duration-300 py-4">
      <div className="flex items-center gap-3">
        {/* Toggle Sidebar Button */}
        <button
          onClick={toggleSidebar}
          className="p-1.5 text-foreground/60 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
          title="Toggle Sidebar"
        >
          <PanelLeft size={18} />
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-foreground/10" />
      </div>

      {/* Right side of header (for future extensions) */}
      <div className="flex items-center gap-2"></div>
    </header>
  );
});

export default Header;
