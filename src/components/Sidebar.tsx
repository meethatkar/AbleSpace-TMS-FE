"use client";

import React, { useState } from "react";
import { ChevronsUpDown, ChevronDown, LayoutGrid, Folder } from "lucide-react";
import { TextWrapper } from "@/components/ui/TextWrapper";
import { useSidebar } from "@/providers/SidebarProvider";
import { observer } from "mobx-react-lite";
import { usePathname } from "next/navigation";
import { ProfileSidebarContent } from "./ProfileSidebarContent";
import { ProfilePopup } from "./ProfilePopup";
import { useAuth } from "@/features/auth/hooks/useAuth";

const NAV_ITEMS = [
  { id: "tasks", label: "Tasks", Icon: LayoutGrid },
  { id: "projects", label: "Projects", Icon: Folder },
] as const;

export default observer(function Sidebar() {
  const { isOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("tasks");
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, getUser, isLoading } = useAuth();

  React.useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  // Handle clicking outside of the popup to close it
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  return (
    <aside
      data-collapsed={!isOpen}
      className="flex flex-col justify-between h-screen bg-sidebar-bg border-r border-foreground/10 font-sans transition-all duration-300 ease-in-out relative  z-50 select-none"
    >
      <div
        className={`p-3 space-y-6 flex-1 ${
          pathname.startsWith("/profile") ? "overflow-visible" : ""
        }`}
      >
        {pathname.startsWith("/profile") ? (
          <ProfileSidebarContent />
        ) : (
          <>
            {/* Header / Toggle & Profile Section */}
            <div
              className="flex items-center justify-between relative z-50"
              ref={popupRef}
            >
              <div className="flex-1 overflow-visible">
                {isLoading || !user ? (
                  <div className="w-full flex items-center justify-start px-3 py-2.5 rounded-xl gap-3">
                    <div className="w-7 h-7 rounded-full bg-foreground/10 animate-pulse shrink-0" />
                    <div className="h-4 w-24 bg-foreground/10 rounded animate-pulse flex-1" />
                  </div>
                ) : (
                  <TextWrapper
                    image={user.profileImg!}
                    text={user.fullName}
                    trailing={
                      <div className="p-1 rounded-sm">
                        <ChevronsUpDown
                          size={16}
                          className="text-foreground/40 group-hover:text-foreground/60 transition-colors"
                        />
                      </div>
                    }
                    onClick={() => setShowPopup((prev) => !prev)}
                    className="w-full flex items-center justify-start px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group hover:bg-foreground/2 gap-3 overflow-hidden"
                  />
                )}
              </div>
              {showPopup && user && (
                <ProfilePopup
                  user={user}
                  isLoading={isLoading}
                  onClose={() => setShowPopup(false)}
                />
              )}
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
          </>
        )}
      </div>
    </aside>
  );
});
