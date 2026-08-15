"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { TaskCardData } from "@/types/TaskCard.type";
import { normalizeString } from "@/utils/normalizeString";
import { Button } from "../ui/Button";
import { CategoryTable } from "./CategoryTable";

const DEFAULT_CATEGORIES = [
  { id: "backlog", title: "Backlog" },
  { id: "to-do", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "on-hold", title: "On Hold" },
  { id: "completed", title: "Completed" },
];

interface DataListProps {
  tasks: TaskCardData[];
  categories?: { id: string; title: string }[];
  onAddTask?: (category: string) => void;
  onEditTask?: (task: TaskCardData) => void;
}

export const DataList: React.FC<DataListProps> = ({
  tasks,
  categories = DEFAULT_CATEGORIES,
  onAddTask,
  onEditTask,
}) => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const groupedTasks = React.useMemo(() => {
    const groups: Record<string, TaskCardData[]> = {};
    categories.forEach((cat) => {
      groups[cat.id] = tasks.filter(
        (task) =>
          normalizeString(task.status || "") === normalizeString(cat.id),
      );
    });
    return groups;
  }, [tasks, categories]);

  return (
    <div className="list-wrapper flex flex-col gap-4 w-full overflow-y-scroll">
      {categories.map((category) => {
        const categoryTasks = groupedTasks[category.id] || [];
        const isCollapsed = collapsed[category.id];

        return (
          <div key={category.id} className="flex flex-col gap-2 w-full">
            {/* Header Accordion Toggle */}
            <Button
              variant="ghost"
              onClick={() => toggleCollapse(category.id)}
              className="flex items-center gap-1.5 py-1 px-0 text-sm font-medium text-foreground w-fit cursor-pointer select-none bg-transparent"
            >
              {isCollapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
              <span>{category.title}</span>
            </Button>

            {/* Table */}
            {!isCollapsed && (
              <CategoryTable
                tasks={categoryTasks}
                onAddTask={onAddTask ? () => onAddTask(category.id) : undefined}
                onEditTask={onEditTask}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DataList;
