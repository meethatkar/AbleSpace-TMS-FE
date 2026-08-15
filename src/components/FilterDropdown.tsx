"use client";

import React from "react";
import {
  Circle,
  Signal,
  Users,
  Calendar,
  Tag,
  User,
  ChevronRight,
  Check,
} from "lucide-react";
import { SignalIcon } from "@/components/icons/SignalIcon";
import { PRIORITY_CONFIG } from "@/config/task.config";

// --- 1. Static Data & Types ---

export interface FilterOption {
  id: string;
  label: string;
  color?: string; // For text and active icon colors (like Priority)
  icon?: React.ReactNode;
}

export interface FilterCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  options: FilterOption[];
}

// Hardcoded Static Data
const STATUS_OPTIONS: FilterOption[] = [
  { id: "todo", label: "To Do", color: "#6b7280" },
  { id: "in-progress", label: "In Progress", color: "#3b82f6" },
  { id: "completed", label: "Completed", color: "#10b981" },
];

const PRIORITY_OPTIONS: FilterOption[] = [
  {
    id: "none",
    label: "No Priority",
    icon: <div className="h-1 w-1 rounded-full bg-neutral-400 ml-1.5" />,
    color: "#737373",
  },
  ...Object.entries(PRIORITY_CONFIG)
    .filter(([key]) => key !== "default")
    .map(([key, config]) => ({
      id: key,
      label: config.label,
      icon: <SignalIcon priority={key} />,
      color: config.color,
    })),
];

// Placeholder options that will eventually come from the backend/store
const DUMMY_OPTIONS: FilterOption[] = [
  { id: "opt1", label: "Option 1" },
  { id: "opt2", label: "Option 2" },
];

const FILTER_CATEGORIES: FilterCategory[] = [
  {
    id: "status",
    label: "Status",
    icon: <Circle className="h-4 w-4" />,
    options: STATUS_OPTIONS,
  },
  {
    id: "priority",
    label: "Priority",
    icon: <Signal className="h-4 w-4" />,
    options: PRIORITY_OPTIONS,
  },
  {
    id: "members",
    label: "Members",
    icon: <Users className="h-4 w-4" />,
    options: DUMMY_OPTIONS,
  },
  {
    id: "dueDate",
    label: "Due Date",
    icon: <Calendar className="h-4 w-4" />,
    options: DUMMY_OPTIONS,
  },
  {
    id: "teams",
    label: "Teams",
    icon: <Users className="h-4 w-4" />,
    options: DUMMY_OPTIONS,
  },
  {
    id: "labels",
    label: "Labels",
    icon: <Tag className="h-4 w-4" />,
    options: DUMMY_OPTIONS,
  },
  {
    id: "reporter",
    label: "Reporter",
    icon: <User className="h-4 w-4" />,
    options: DUMMY_OPTIONS,
  },
];

// --- 2. Component Implementation ---

export interface FilterDropdownProps {
  // Record of categoryId mapping to an array of selected optionIds
  selectedFilters: Record<string, string[]>;
  onToggleFilter: (categoryId: string, optionId: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  selectedFilters,
  onToggleFilter,
}) => {
  return (
    <div className="relative inline-block text-left font-sans text-foreground">
      {/* Main Menu Container */}
      <div className="w-56 rounded-xl border border-base-border bg-background p-1.5 shadow-lg">
        <ul className="flex flex-col gap-0.5">
          {FILTER_CATEGORIES.map((category) => (
            // 'group' class is crucial here to trigger the submenu on hover
            <li
              key={category.id}
              className="group relative flex cursor-default items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent"
            >
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">
                  {category.icon}
                </span>
                <span>{category.label}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />

              {/* Sub-menu (Appears to the left on hover) */}
              {/* pr-2 creates an invisible bridge so the mouse doesn't lose hover state */}
              <div className="absolute right-full top-0 hidden pr-2 group-hover:block">
                <div className="w-56 rounded-xl border border-base-border bg-background p-1.5 shadow-xl">
                  {/* Sub-menu Header */}
                  <div className="mb-1 px-3 py-1.5 text-xs text-muted-foreground">
                    {category.label}
                  </div>

                  <ul className="flex flex-col gap-0.5">
                    {category.options.map((option) => {
                      const isSelected = selectedFilters[category.id]?.includes(
                        option.id,
                      );

                      return (
                        <li
                          key={option.id}
                          onClick={() => onToggleFilter(category.id, option.id)}
                          className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent"
                          style={{ color: option.color || "inherit" }}
                        >
                          <div className="flex items-center gap-3">
                            {/* Render custom icon or a placeholder space */}
                            {option.icon ? (
                              <span className="flex w-4 justify-center">
                                {option.icon}
                              </span>
                            ) : (
                              <span className="w-4" />
                            )}
                            <span>{option.label}</span>
                          </div>

                          {/* Checkmark for selected state */}
                          {isSelected && (
                            <Check
                              className="h-4 w-4 text-foreground"
                              strokeWidth={2.5}
                            />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
