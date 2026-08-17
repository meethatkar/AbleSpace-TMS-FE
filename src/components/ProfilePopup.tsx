"use client";

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/root.store";
import { useTheme } from "next-themes";
import { useColorMode } from "@/hooks/useColorMode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Sun,
  Moon,
  Settings,
  ChevronRight,
  Check,
  Monitor,
} from "lucide-react";
import { User } from "@/types/User.type";

const COLOR_OPTIONS = [
  { id: "amber", label: "Amber", cssVar: "var(--color-amber)" },
  { id: "blue", label: "Blue", cssVar: "var(--color-blue)" },
  { id: "pink", label: "Pink", cssVar: "var(--color-pink)" },
  { id: "rose", label: "Rose", cssVar: "var(--color-rose)" },
  { id: "emerald", label: "Emerald", cssVar: "var(--color-emerald)" },
  { id: "black", label: "Black", cssVar: "var(--color-black)" },
];

interface ProfilePopupProps {
  user: User; // Using any or you can import User type if available
  isLoading: boolean;
  onClose?: () => void;
}

export const ProfilePopup = observer(
  ({ user, isLoading, onClose }: ProfilePopupProps) => {
    const { theme, setTheme } = useTheme();
    const { colorMode, changeColorMode, mounted } = useColorMode();
    const router = useRouter();

    return (
      <div className="absolute -left-3 z-100 top-12.5 ml-2 w-60 bg-background rounded-xl border border-base-border shadow-lg flex flex-col pt-6 pb-2 z-50 font-sans cursor-default">
        {/* User Info */}
        <div
          className="flex flex-col items-center justify-center mb-6 px-4 cursor-pointer hover:opacity-80 transition-opacity min-h-[132px]"
          onClick={() => {
            if (onClose) onClose();
            router.push("/profile");
          }}
        >
          {isLoading || !user ? (
            <div className="flex flex-col items-center justify-center w-full">
              <div className="w-14 h-14 rounded-full bg-foreground/10 animate-pulse mb-3" />
              <div className="w-24 h-4 rounded bg-foreground/10 animate-pulse mb-1.5" />
              <div className="w-32 h-3 rounded bg-foreground/10 animate-pulse" />
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full overflow-hidden mb-3 ring-1 ring-base-border shadow-sm">
                <Image
                  width={100}
                  height={100}
                  src={user.profileImg!}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-foreground text-sm">
                {user.fullName || user.username}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {user.email}
              </p>
            </>
          )}
        </div>

        {/* Menu Options with Submenus (Opening to the right) */}
        <div className="flex flex-col border-t border-base-border pt-1">
          {/* Theme Dropdown */}
          <div className="group relative">
            <div className="flex cursor-default items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-sidebar-accent">
              <div className="flex items-center gap-3">
                <Sun className="h-4 w-4 text-foreground/70" />
                <span>Change Theme</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>

            {/* Theme Submenu */}
            <div className="absolute left-full top-0 hidden pl-1 group-hover:block z-50 min-w-44">
              <div className="rounded-xl border border-base-border bg-background p-1.5 shadow-lg">
                <div className="mb-1 px-3 py-1.5 text-xs text-muted-foreground">
                  Theme
                </div>
                <ul className="flex flex-col gap-0.5">
                  {[
                    { id: "light", label: "Light", icon: Sun },
                    { id: "dark", label: "Dark", icon: Moon },
                    { id: "system", label: "System", icon: Monitor },
                  ].map((t) => (
                    <li
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent"
                    >
                      <div className="flex items-center gap-3">
                        <t.icon className="h-4 w-4 text-foreground/70" />
                        <span>{t.label}</span>
                      </div>
                      {mounted && theme === t.id && (
                        <Check
                          className="h-4 w-4 text-foreground"
                          strokeWidth={2.5}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Color Mode Dropdown */}
          <div className="group relative">
            <div className="flex cursor-default items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-sidebar-accent">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-sm bg-foreground/80 flex items-center justify-center" />
                <span>Color Mode</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>

            {/* Color Mode Submenu */}
            <div className="absolute left-full top-0 hidden pl-1 group-hover:block z-50 min-w-44">
              <div className="rounded-xl border border-base-border bg-background p-1.5 shadow-lg">
                <div className="mb-1 px-3 py-1.5 text-xs text-muted-foreground">
                  Color Mode
                </div>
                <ul className="flex flex-col gap-0.5">
                  {COLOR_OPTIONS.map((option) => (
                    <li
                      key={option.id}
                      onClick={() => changeColorMode(option.id)}
                      className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3.5 h-3.5 rounded-[3px]"
                          style={{ backgroundColor: option.cssVar }}
                        />
                        <span>{option.label}</span>
                      </div>
                      {mounted && colorMode === option.id && (
                        <Check
                          className="h-4 w-4 text-foreground"
                          strokeWidth={2.5}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-sidebar-accent">
            <div className="flex items-center gap-3">
              <Settings className="h-4 w-4 text-foreground/70" />
              <span>Settings</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
