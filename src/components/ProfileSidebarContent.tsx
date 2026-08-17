"use client";

import React from "react";
import { ArrowLeft, User, Sun, Square, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { TextWrapper } from "./ui/TextWrapper";

export const ProfileSidebarContent = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 font-sans">
      <Button 
        variant="ghost"
        width="full"
        onClick={() => router.push("/")}
        className="justify-start px-1 hover:bg-transparent hover:text-foreground/80 gap-2"
      >
        <ArrowLeft size={16} />
        Back to app
      </Button>

      <div className="relative mx-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full bg-background border border-base-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex flex-col gap-1">
        {[
          { id: "profile", label: "Profile", icon: User, isActive: true },
          { id: "theme", label: "Theme", icon: Sun },
          {
            id: "color",
            label: "Color",
            icon: Square,
            iconClassName: "fill-current",
          },
        ].map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            width="full"
            className={`justify-start px-3 py-2 rounded-lg ${
              item.isActive
                ? "bg-sidebar-accent text-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
            }`}
          >
            <TextWrapper
              icon={<item.icon size={16} className={item.iconClassName} />}
              text={item.label}
              className="gap-3 bg-transparent text-inherit [&>span]:text-inherit font-medium"
            />
          </Button>
        ))}
      </div>
    </div>
  );
};
