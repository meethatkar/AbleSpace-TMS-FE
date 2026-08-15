"use client";
import React from "react";
import { MoreHorizontal, Calendar, Tag } from "lucide-react";
import { formatDate } from "@/utils/DateFormatter";
import { TaskCardData } from "@/types/TaskCard.type";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TextWrapper } from "@/components/ui/TextWrapper";

interface KabanCardProps {
  task: TaskCardData;
  onMenuClick?: () => void;
  onClick?: () => void;
}

export const KabanCard: React.FC<KabanCardProps> = ({
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
          {task.name}
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

      {/* Row 2: Reporter, Assignees & Date Badge */}
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-col gap-1.5">
          {/* Reporter details */}
          <div className="flex items-center gap-1.5">
            <TextWrapper
              image={task.reporter.profileImg ?? undefined}
              text={
                task.reporter
                  ? task.reporter.fullName || task.reporter.username
                  : "Unassigned"
              }
              className="!p-0 !bg-transparent hover:!bg-transparent text-xs text-foreground font-medium"
            />
          </div>
        </div>

        {/* Date using Badge component */}
        {task.dueDate && (
          <Badge
            variant="date"
            icon={<Calendar size={12} />}
            text={formatDate(task.dueDate)}
          />
        )}
      </div>

      {/* Row 3: Tags / Badges with automatic flex-wrap overflow handling */}
      {task.labels && task.labels.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {task.labels.map((label, index) => (
            <Badge
              key={index}
              variant="default"
              icon={<Tag size={12} />}
              text={label}
            />
          ))}
        </div>
      )}
    </div>
  );
};
