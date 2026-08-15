import React from "react";
import {
  createColumnHelper,
  ColumnDef,
  TableFeatures,
} from "@tanstack/react-table";
import { MoreHorizontal, Plus } from "lucide-react";
import Image from "next/image";
import { TaskCardData } from "@/types/TaskCard.type";
import { formatDate } from "@/utils/DateFormatter";
import { User } from "@/types/User.type";
import { PRIORITY_CONFIG } from "@/config/task.config";
import { Button } from "@/components/ui/Button";
import { SignalIcon } from "@/components/icons/SignalIcon";

const columnHelper = createColumnHelper<TableFeatures, TaskCardData>();

interface GetCategoryTableColumnsOptions {
  onEditTask?: (task: TaskCardData) => void;
  selectedFields?: string[];
}

export const getCategoryTableColumns = ({
  onEditTask,
  selectedFields = ["priority", "members", "dueDate", "status", "reporter", "labels"], // Default to all if not provided
}: GetCategoryTableColumnsOptions = {}): ColumnDef<
  TableFeatures,
  TaskCardData,
  any
>[] => {
  const columns: ColumnDef<TableFeatures, TaskCardData, any>[] = [
    // 1. Task Name
    columnHelper.accessor("name", {
      header: "Task",
      cell: (info) => (
        <span
          className="font-medium text-foreground cursor-pointer"
          onClick={() => onEditTask?.(info.row.original)}
        >
          {info.getValue()}
        </span>
      ),
    }),
  ];

  if (selectedFields.includes("priority")) {
    columns.push(
      columnHelper.accessor("priority", {
        header: "Priority",
        cell: (info) => {
          const priority = info.getValue();
          if (!priority)
            return <span className="text-muted-foreground text-xs">—</span>;

          const priorityLower = priority.toLowerCase();
          const config =
            PRIORITY_CONFIG[priorityLower] || PRIORITY_CONFIG["default"];

          return (
            <div
              className="flex items-center gap-1.5 font-medium text-xs leading-4 tracking-normal"
              style={{ color: config.color }}
            >
              <SignalIcon priority={priority} />
              <span className="capitalize text-xs">{priority}</span>
            </div>
          );
        },
      })
    );
  }

  if (selectedFields.includes("members")) {
    columns.push(
      columnHelper.accessor("members", {
        header: "Members",
        cell: (info) => {
          const members = info.getValue();
          if (!members || members.length === 0) {
            return (
              <Button
                variant="ghost"
                className="w-7 h-7 rounded-full bg-sidebar-accent hover:bg-sidebar-accent/80 p-0 text-foreground"
              >
                <Plus size={16} />
              </Button>
            );
          }

          return (
            <div className="flex items-center -space-x-1.5 overflow-hidden">
              {members.map((member: User) => (
                <div
                  key={member._id}
                  className="relative inline-block w-6 h-6 rounded-full overflow-hidden shrink-0"
                >
                  <Image
                    src={member.profileImg!}
                    alt={member.fullName}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          );
        },
      })
    );
  }

  if (selectedFields.includes("dueDate")) {
    columns.push(
      columnHelper.accessor("dueDate", {
        header: "Due Date",
        cell: (info) => {
          const dueDate = info.getValue();
          if (!dueDate)
            return <span className="text-muted-foreground text-xs">—</span>;
          return <span className="text-sm">{formatDate(dueDate, "list")}</span>;
        },
      })
    );
  }

  if (selectedFields.includes("labels")) {
    columns.push(
      columnHelper.accessor("labels", {
        header: "Labels",
        cell: (info) => {
          const labels = info.getValue();
          if (!labels || labels.length === 0)
            return <span className="text-muted-foreground text-xs">—</span>;
          return (
            <div className="flex items-center gap-1.5 overflow-hidden">
              {labels.map((label: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-sidebar-accent text-xs font-medium text-foreground whitespace-nowrap"
                >
                  {label}
                </span>
              ))}
            </div>
          );
        },
      })
    );
  }

  if (selectedFields.includes("status")) {
    columns.push(
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          return (
            <span className="text-sm capitalize font-medium">
              {status?.replace(/-/g, " ") || "—"}
            </span>
          );
        },
      })
    );
  }

  if (selectedFields.includes("reporter")) {
    columns.push(
      columnHelper.accessor("reporter", {
        header: "Reporter",
        cell: (info) => {
          const reporter = info.getValue();
          if (!reporter)
            return <span className="text-muted-foreground text-xs">—</span>;

          return (
            <div className="flex items-center gap-2">
              <div className="relative inline-block w-6 h-6 rounded-full overflow-hidden shrink-0 bg-sidebar-accent border border-base-border">
                {reporter.profileImg ? (
                  <Image
                    src={reporter.profileImg}
                    alt={reporter.fullName}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                ) : (
                  <span className="w-full h-full flex items-center justify-center text-[10px] font-medium text-foreground">
                    {reporter.fullName.charAt(0)}
                  </span>
                )}
              </div>
              <span className="text-sm truncate max-w-[100px]">
                {reporter.fullName}
              </span>
            </div>
          );
        },
      })
    );
  }

  // 5. Actions
  columns.push(
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => {
        return (
          <div className="flex items-center justify-end">
            <button
              onClick={() => onEditTask?.(info.row.original)}
              className="p-1 rounded transition-colors cursor-pointer"
            >
              <MoreHorizontal size={14} />
            </button>
          </div>
        );
      },
    })
  );

  return columns;
};
