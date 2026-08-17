"use client";

import React from "react";
import { Check, List, LayoutGrid } from "lucide-react";
import { Button, cn } from "@/components/ui/Button"; // Assuming your cn utility is here

export interface ViewField {
  id: string;
  label: string;
}

export interface ViewOptionsMenuProps {
  viewMode: "list" | "board";
  onViewModeChange: (mode: "list" | "board") => void;
  fields: ViewField[];
  selectedFields: string[];
  onToggleField: (id: string) => void;
}

export const ViewOptionsMenu: React.FC<ViewOptionsMenuProps> = ({
  viewMode,
  onViewModeChange,
  fields,
  selectedFields,
  onToggleField,
}) => {
  return (
    <div className="w-74.75 rounded-xl border border-base-border bg-background p-3 shadow-lg font-sans">
      {/* Segmented Control: List vs Board */}
      <div className="mb-4 flex rounded-md border border-base-input bg-sidebar-accent">
        {[
          { id: "list", label: "List", icon: <List size={16} /> },
          { id: "board", label: "Board", icon: <LayoutGrid size={16} /> },
        ].map((option) => (
          <Button
            key={option.id}
            variant="ghost"
            onClick={() => onViewModeChange(option.id as "list" | "board")}
            className={cn(
              "flex-1 py-1.5 px-0 h-auto rounded-md font-medium transition-all",
              viewMode === option.id
                ? "bg-background text-foreground shadow-sm hover:bg-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.icon}
            {option.label}
          </Button>
        ))}
      </div>

      {/* Fields List - Only show for List view */}
      {viewMode === "list" && (
        <div className="flex flex-col gap-0.5">
          {fields.map((field) => {
            const isSelected = selectedFields.includes(field.id);

            return (
              <button
                key={field.id}
                onClick={() => onToggleField(field.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-foreground",
                )}
              >
                <span>{field.label}</span>

                {/* Custom Checkbox */}
                <div
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded transition-colors",
                    isSelected
                      ? "bg-primary text-background"
                      : "bg-sidebar-accent",
                  )}
                >
                  {isSelected && <Check size={14} strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
