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
import { PRIORITY_CONFIG, STATUS_OPTIONS } from "@/config/task.config";
import { TextWrapper } from "@/components/ui/TextWrapper";
import { TaskCardData } from "@/types/TaskCard.type";
import { formatDate } from "@/utils/DateFormatter";

// --- 1. Static Data & Types ---

export interface FilterOption {
  id: string;
  label: React.ReactNode;
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

const PRIORITY_OPTIONS: FilterOption[] = [
  {
    id: "none",
    label: "No Priority",
    icon: <div className="h-1 w-1 rounded-full bg-muted-foreground ml-1.5" />,
    color: "", // Will fall back to inherit
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

// --- 2. Component Implementation ---

// Helper function to generate dynamic options from tasks list
export const generateFilterCategories = (tasks: TaskCardData[]): FilterCategory[] => {
  const reportersMap = new Map<string, FilterOption>();
  const membersMap = new Map<string, FilterOption>();
  const dueDatesSet = new Set<string>();
  const teamsSet = new Set<string>();
  const labelsSet = new Set<string>();

  tasks.forEach((task) => {
    if (task.reporter?._id) {
      reportersMap.set(task.reporter._id, {
        id: task.reporter._id,
        label: task.reporter.profileImg ? (
          <TextWrapper
            image={task.reporter.profileImg}
            text={task.reporter.fullName || task.reporter.username}
          />
        ) : (
          task.reporter.fullName || task.reporter.username
        ),
      });
    }
    if (task.members) {
      task.members.forEach((member) => {
        if (member._id) {
          membersMap.set(member._id, {
            id: member._id,
            label: member.profileImg ? (
              <TextWrapper
                image={member.profileImg}
                text={member.fullName || member.username}
              />
            ) : (
              member.fullName || member.username
            ),
          });
        }
      });
    }
    if (task.dueDate) dueDatesSet.add(task.dueDate);
    if (task.teams) teamsSet.add(task.teams);
    if (task.labels) {
      task.labels.forEach((label) => labelsSet.add(label));
    }
  });

  return [
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
      options: Array.from(membersMap.values()),
    },
    {
      id: "dueDate",
      label: "Due Date",
      icon: <Calendar className="h-4 w-4" />,
      options: Array.from(dueDatesSet).map((date) => ({
        id: date,
        label: formatDate(date, "list"),
      })),
    },
    {
      id: "teams",
      label: "Teams",
      icon: <Users className="h-4 w-4" />,
      options: Array.from(teamsSet).map((team) => ({
        id: team,
        label: team,
      })),
    },
    {
      id: "labels",
      label: "Labels",
      icon: <Tag className="h-4 w-4" />,
      options: Array.from(labelsSet).map((label) => ({ id: label, label })),
    },
    {
      id: "reporter",
      label: "Reporter",
      icon: <User className="h-4 w-4" />,
      options: Array.from(reportersMap.values()),
    },
  ];
};

export interface FilterDropdownProps {
  // Record of categoryId mapping to an array of selected optionIds
  selectedFilters: Record<string, string[]>;
  onToggleFilter: (categoryId: string, optionId: string) => void;
  tasks?: TaskCardData[];
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  selectedFilters,
  onToggleFilter,
  tasks = [],
}) => {
  // Generate dynamic options from tasks list
  const filterCategories = React.useMemo<FilterCategory[]>(
    () => generateFilterCategories(tasks),
    [tasks]
  );

  return (
    <div className="relative inline-block text-left font-sans text-foreground">
      {/* Main Menu Container */}
      <div className="w-56 rounded-xl border border-base-border bg-background p-1.5 shadow-lg">
        <ul className="flex flex-col gap-0.5">
          {filterCategories.map((category) => (
            // 'group' class is crucial here to trigger the submenu on hover
            <li
              key={category.id}
              className="group relative flex cursor-default items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent"
            >
              <div className="flex items-center gap-3">
                <span className="text-foreground">{category.icon}</span>
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
                    {category.options.length === 0 ? (
                      <li className="px-3 py-4 text-center text-sm text-muted-foreground italic">
                        No options
                      </li>
                    ) : (
                      category.options.map((option) => {
                        const isSelected = selectedFilters[
                          category.id
                        ]?.includes(option.id);

                        return (
                          <li
                            key={option.id}
                            onClick={() =>
                              onToggleFilter(category.id, option.id)
                            }
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
                                <span className="w-0" />
                              )}
                              <div className="flex-1 overflow-hidden">
                                {option.label}
                              </div>
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
                      })
                    )}
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
