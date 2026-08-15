"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { TaskCardData } from "@/types/TaskCard.type";
import { useTasks } from "@/features/task/hooks/useTasks";

import { TASK_CATEGORIES } from "@/config/task.config";
import { Button } from "@/components/ui/Button";
import { CategoryTable } from "./CategoryTable";

interface DataListProps {
  tasks: TaskCardData[];
  categories?: { id: string; title: string }[];
  onAddTask?: (category: string) => void;
  onEditTask?: (task: TaskCardData) => void;
}

export const DataList: React.FC<DataListProps> = ({
  tasks,
  categories = TASK_CATEGORIES,
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

  const { getTasksByColumn } = useTasks();

  return (
    <div className="list-wrapper flex flex-col gap-4 w-full">
      {categories.map((category) => {
        const categoryTasks = getTasksByColumn(category.id);
        const isCollapsed = collapsed[category.id];

        return (
          <div key={category.id} className="flex flex-col gap-2 w-full">
            {/* Header Accordion Toggle */}
            <Button
              variant="ghost"
              onClick={() => toggleCollapse(category.id)}
              className="flex items-start gap-1.5 py-1 px-0 text-sm font-medium text-foreground w-fit cursor-pointer select-none"
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
