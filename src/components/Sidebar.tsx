"use client";

import React, { useState } from "react";
import { ChevronsUpDown, ChevronDown, LayoutGrid, Folder } from "lucide-react";
import { TextWrapper } from "@/components/ui/TextWrapper";
import { useSidebar } from "@/providers/SidebarProvider";
import { observer } from "mobx-react-lite";

const NAV_ITEMS = [
  { id: "tasks", label: "Tasks", Icon: LayoutGrid },
  { id: "projects", label: "Projects", Icon: Folder },
] as const;

export default observer(function Sidebar() {
  const { isOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("tasks");

  return (
    <aside
      data-collapsed={!isOpen}
      className="flex flex-col justify-between h-screen bg-sidebar-bg border-r border-foreground/10 font-sans transition-all duration-300 ease-in-out relative select-none"
    >
      {/* Top Content Area */}
      <div className="p-3 space-y-6 flex-1 overflow-y-auto">
        {/* Header / Toggle & Profile Section */}
        <div className="flex items-center justify-between">
          <div className="flex-1 overflow-hidden">
            <TextWrapper
              image="https://ik.imagekit.io/a4ft9seaz/task-management-system/TMS-profile.jpg?updatedAt=1786451424961"
              text="Dexter"
              textColor="text-foreground"
              trailing={
                <ChevronsUpDown
                  size={16}
                  className="text-foreground/40 group-hover:text-foreground/60 transition-colors"
                />
              }
              onClick={() => console.log("Profile clicked")}
              className="w-full flex items-center justify-start px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group hover:bg-foreground/2 gap-3 overflow-hidden"
            />
          </div>
        </div>

        {/* Workspace Section */}
        <div className="space-y-1">
          {/* Workspace Label Header */}
          <div className="px-3 py-1 flex items-center justify-between font-medium text-sm text-foreground/90 workspace-label">
            <span>Workspace</span>
            <ChevronDown size={14} />
          </div>

          {/* Navigation Links */}
          <div className="space-y-0.5">
            {NAV_ITEMS.map(({ id, label, Icon }) => {
              const isActive = activeTab === id;
              return (
                <TextWrapper
                  key={id}
                  icon={
                    <Icon
                      size={18}
                      className={
                        isActive
                          ? "text-primary transition-colors"
                          : "text-foreground/45"
                      }
                    />
                  }
                  text={label}
                  textColor={isActive ? "text-primary" : "text-foreground/80 "}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center justify-start px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group gap-3 overflow-hidden ${
                    isActive
                      ? "bg-sidebar-accent font-medium"
                      : "hover:bg-foreground/3"
                  }`}
                  title={label}
                />
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
});
