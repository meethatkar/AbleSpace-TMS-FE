import React from "react";
import { createColumnHelper, ColumnDef, TableFeatures } from "@tanstack/react-table";
import { MoreHorizontal, Plus } from "lucide-react";
import Image from "next/image";
import { TaskCardData } from "@/types/TaskCard.type";
import { formatDate } from "@/utils/DateFormatter";
import { SignalIcon } from "../icons/SignalIcon";
import { User } from "@/types/User.type";
import { PRIORITY_CONFIG } from "@/config/priority.config";

const columnHelper = createColumnHelper<TableFeatures, TaskCardData>();

interface GetCategoryTableColumnsOptions {
  onEditTask?: (task: TaskCardData) => void;
}

export const getCategoryTableColumns = ({
  onEditTask,
}: GetCategoryTableColumnsOptions = {}): ColumnDef<TableFeatures, TaskCardData, any>[] => [
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

  // 2. Priority
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
  }),

  // 3. Members
  columnHelper.accessor("members", {
    header: "Members",
    cell: (info) => {
      const members = info.getValue();
      if (!members || members.length === 0) {
        return (
          <button className="w-7 h-7 rounded-full bg-sidebar-accent flex items-center justify-center text-foreground cursor-pointer">
            <Plus size={18} />
          </button>
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
  }),

  // 4. Due Date
  columnHelper.accessor("dueDate", {
    header: "Due Date",
    cell: (info) => {
      const dueDate = info.getValue();
      if (!dueDate)
        return <span className="text-muted-foreground text-xs">—</span>;
      return <span className="text-sm">{formatDate(dueDate, "list")}</span>;
    },
  }),

  // 5. Actions
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
  }),
];
