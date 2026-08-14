"use client";
import React from "react";
import { MoreHorizontal, Calendar, Tag } from "lucide-react";
import { TextWrapper } from "./ui/TextWrapper";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";

export interface TaskCardData {
  id: string;
  title: string;
  assignee: {
    name: string;
    image?: string;
  };
  dueDate: string;
  tags: Array<{
    id: string;
    text: string;
  }>;
}

interface TaskCardProps {
  task: TaskCardData;
  onMenuClick?: () => void;
  onClick?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onMenuClick,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group bg-background border border-base-border rounded-2xl p-3.5 transition-all cursor-pointer flex flex-col gap-3 select-none font-sans"
    >
      {/* Row 1: Title & Options Menu */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-foreground tracking-tight leading-snug line-clamp-2 mb-1.5">
          {task.title}
        </h4>
        <Button
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onMenuClick?.();
          }}
          className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-sidebar-accent transition-colors flex-shrink-0 -mr-1 -mt-1 cursor-pointer"
          title="Task options"
        >
          <MoreHorizontal size={16} />
        </Button>
      </div>

      {/* Row 2: Assignee & Date Badge */}
      <div className="flex items-center justify-between gap-2">
        {/* Assignee using TextWrapper */}
        <div className="flex items-center">
          <TextWrapper
            image={task.assignee.image}
            text={task.assignee.name}
            // Overriding padding/background to fit compact card layout cleanly
            className="!p-0 !bg-transparent hover:!bg-transparent text-xs text-subtle-text font-medium"
          />
        </div>

        {/* Date using Badge component */}
        <Badge
          variant="date"
          icon={<Calendar size={12} />}
          text={task.dueDate}
        />
      </div>

      {/* Row 3: Tags / Badges with automatic flex-wrap overflow handling */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {task.tags.map((tag) => (
            <Badge
              key={tag.id}
              variant="default"
              icon={<Tag size={12} />}
              text={tag.text}
            />
          ))}
        </div>
      )}
    </div>
  );
};
