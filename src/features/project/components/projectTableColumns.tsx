import React from "react";
import { createColumnHelper, ColumnDef, TableFeatures } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/utils/DateFormatter";
import { PRIORITY_CONFIG } from "@/config/task.config";
import { SignalIcon } from "@/components/icons/SignalIcon";

const columnHelper = createColumnHelper<TableFeatures, any>();

interface GetProjectTableColumnsOptions {
  onEditProject?: (project: any) => void;
  selectedFields?: string[];
}

export const getProjectTableColumns = ({
  onEditProject,
  selectedFields = ["priority", "lead", "dueDate"], 
}: GetProjectTableColumnsOptions = {}): ColumnDef<TableFeatures, any, any>[] => {
  const columns: ColumnDef<TableFeatures, any, any>[] = [
    columnHelper.accessor("name", {
      header: "Projects",
      cell: (info) => (
        <span
          className="font-medium text-foreground cursor-pointer"
          onClick={() => onEditProject?.(info.row.original)}
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
          if (!priority) return <span className="text-muted-foreground text-xs">—</span>;
          const priorityLower = priority.toLowerCase() as keyof typeof PRIORITY_CONFIG;
          const config = PRIORITY_CONFIG[priorityLower] || { color: "text-neutral-500", bars: 0, label: priority };
          
          return (
            <div className="flex items-center gap-2">
              <SignalIcon priority={priority} />
              <span className={`text-xs ${config.color}`}>{config.label}</span>
            </div>
          );
        },
      })
    );
  }

  if (selectedFields.includes("lead")) {
    columns.push(
      columnHelper.accessor("lead", {
        header: "Lead",
        cell: (info) => {
          const lead = info.getValue();
          if (!lead) return <span className="text-muted-foreground text-xs">—</span>;
          
          let nameStr = "";
          let avatarUrl = "";
          if (typeof lead === "object" && lead !== null) {
            nameStr = lead.fullName || lead.username || "Unknown";
            avatarUrl = lead.profileImg || "";
          } else if (typeof lead === "string") {
            nameStr = lead;
          }
          
          if (avatarUrl) {
            return (
              <Image src={avatarUrl} alt={nameStr} width={20} height={20} className="rounded-full object-cover" />
            );
          }
          return (
            <div className="w-5 h-5 rounded-full bg-sidebar-accent flex items-center justify-center text-[10px] text-muted-foreground font-medium uppercase shrink-0">
              {nameStr.slice(0, 2)}
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
          const date = info.getValue();
          if (!date) return <span className="text-muted-foreground text-xs">—</span>;
          return <span className="text-xs text-foreground whitespace-nowrap">{formatDate(date, "list")}</span>;
        },
      })
    );
  }

  columns.push(
    columnHelper.display({
      id: "actions",
      header: "",
      cell: () => (
        <button className="p-1 hover:bg-sidebar-accent rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <MoreHorizontal size={16} />
        </button>
      ),
    })
  );

  return columns;
};
