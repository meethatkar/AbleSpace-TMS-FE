"use client";
import React from "react";
import { motion } from "framer-motion";
import { GripVertical, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface KanbanColumnProps {
  id: string;
  title: string;
  children?: React.ReactNode;
  onAddClick?: () => void;
  addActionText?: string;
  onHeaderMenuClick?: () => void;
  onDropTask?: (taskId: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  id,
  title,
  children,
  onAddClick,
  addActionText = "Add Task",
  onHeaderMenuClick,
  onDropTask,
}) => {
  // Automatically derive action text if not explicitly provided (e.g., "To Do" -> "Add To Do" or custom)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId && onDropTask) {
      onDropTask(taskId);
    }
  };

  return (
    <div
      className="w-80 shrink-0 flex flex-col bg-sidebar-accent border border-base-border rounded-xl p-3 select-none"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <GripVertical size={16} className="text-foreground" />
          <h3 className="text-sm font-semibold text-foreground tracking-tight">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-subtle-text">
          <Button
            variant="ghost"
            onClick={onAddClick}
            className="p-1 hover:bg-sidebar-accent rounded-md"
            title="Add item"
          >
            <Plus size={16} />
          </Button>
          <Button
            variant="ghost"
            onClick={onHeaderMenuClick}
            className="p-1 hover:bg-sidebar-accent rounded-md"
            title="Options"
          >
            <MoreHorizontal size={16} />
          </Button>
        </div>
      </div>

      {/* Cards Container (Relative height, expands/collapses smoothly with Framer Motion layout) */}
      <motion.div
        layout
        className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
      >
        {React.Children.count(children) === 0 ? (
          <div className="flex flex-col items-center justify-center h-[100px] text-muted-foreground border-2 border-dashed border-base-border rounded-lg m-1 bg-background/50">
            <p className="text-sm font-medium">No tasks present.</p>
          </div>
        ) : (
          children
        )}
      </motion.div>

      {/* Bottom Add Action Button */}
      <div className="pt-3 mt-1">
        <Button
          onClick={onAddClick}
          variant="ghost"
          className="group justify-start py-2 px-3 font-medium hover:bg-sidebar-accent"
        >
          <Plus size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          <span className="text-muted-foreground group-hover:text-foreground transition-colors">
            {addActionText}
          </span>
        </Button>
      </div>
    </div>
  );
};
