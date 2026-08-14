"use client";
import React, { useState } from "react";
import {
  useLegacyTable as useReactTable,
  legacyCreateColumnHelper as createColumnHelper,
  getCoreRowModel,
} from "@tanstack/react-table/legacy";
import { flexRender } from "@tanstack/react-table";
import { ChevronDown, ChevronRight, MoreHorizontal, Plus } from "lucide-react";
import Image from "next/image";
import { TaskCardData } from "@/types/TaskCard.type";
import { formatDate } from "@/utils/DateFormatter";
import { normalizeString } from "@/utils/normalizeString";
import { Button } from "../ui/Button";

// Helper to extract initials from name (e.g. "John Doe" -> "JD")
const getInitials = (name: string) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
};

// Custom premium cell signal bars icon (cellular signal style)
const SignalIcon = ({ priority }: { priority?: string }) => {
  const p = priority?.toLowerCase();

  // Use CSS variables for priority bar colors, defaulting to standard colors
  const emptyColor = "var(--base-border, #e5e5e5)";
  let bar1Color = emptyColor;
  let bar2Color = emptyColor;
  let bar3Color = emptyColor;

  if (p === "urgent") {
    const urgentColor = "var(--tailwind-colors-red-500, #EF4444)";
    bar1Color = urgentColor;
    bar2Color = urgentColor;
    bar3Color = urgentColor;
  } else if (p === "high") {
    const highColor = "var(--tailwind-colors-orange-500, #F97316)";
    bar1Color = highColor;
    bar2Color = highColor;
    bar3Color = highColor;
  } else if (p === "medium") {
    const mediumColor = "var(--tailwind-colors-yellow-500, #EAB308)";
    bar1Color = mediumColor;
    bar2Color = mediumColor;
  } else if (p === "low") {
    const lowColor = "var(--tailwind-colors-gray-400, #9CA3AF)";
    bar1Color = lowColor;
  }

  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="10" width="2.5" height="4" rx="0.5" fill={bar1Color} />
      <rect x="6.75" y="6" width="2.5" height="8" rx="0.5" fill={bar2Color} />
      <rect x="11.5" y="2" width="2.5" height="12" rx="0.5" fill={bar3Color} />
    </svg>
  );
};

interface CategoryTableProps {
  tasks: TaskCardData[];
  onAddTask?: () => void;
  onEditTask?: (task: TaskCardData) => void;
  onDeleteTask?: (task: TaskCardData) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) => {
  const columnHelper = createColumnHelper<TaskCardData>();

  const columns = [
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
        let textColor = "var(--subtle-text)";
        if (priorityLower === "urgent") {
          textColor = "var(--tailwind-colors-red-500, #EF4444)";
        } else if (priorityLower === "high") {
          textColor = "var(--tailwind-colors-orange-500, #F97316)";
        } else if (priorityLower === "medium") {
          textColor = "var(--tailwind-colors-yellow-500, #EAB308)";
        } else if (priorityLower === "low") {
          textColor = "var(--tailwind-colors-gray-400, #9CA3AF)";
        }

        return (
          <div
            className="flex items-center gap-1.5 font-medium text-xs leading-4 tracking-normal"
            style={{ color: textColor }}
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
              <Plus size={12} />
            </button>
          );
        }

        return (
          <div className="flex items-center -space-x-1.5 overflow-hidden">
            {members.map((member) => {
              const initials = getInitials(member.fullName || member.username);
              return member.profileImg ? (
                <div
                  key={member._id}
                  className="relative inline-block w-6 h-6 rounded-full overflow-hidden shrink-0"
                >
                  <Image
                    src={member.profileImg}
                    alt={member.fullName || member.username}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  key={member._id}
                  className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-normal text-foreground dark:text-background bg-sidebar-accent shrink-0"
                  title={member.fullName || member.username}
                >
                  {initials}
                </div>
              );
            })}
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

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-hidden border border-base-border rounded-md bg-background shadow-xs mb-6 font-sans">
      <table className="w-full border-collapse text-left text-sm text-foreground table-fixed">
        <colgroup>
          <col style={{ width: "493px" }} />
          <col className="w-[11%]" />
          <col className="w-[11%]" />
          <col className="w-[11%]" />
          <col className="w-[7%]" />
        </colgroup>
        <thead className="bg-sidebar-bg border-b border-base-border text-subtle-text">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, idx) => (
                <th
                  key={header.id}
                  className={`px-4 py-3 font-medium text-sm text-foreground leading-5 tracking-normal align-middle ${idx === headerGroup.headers.length - 1 ? "text-right" : ""}`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-base-border">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell, idx) => (
                <td
                  key={cell.id}
                  className={`px-4 py-3 align-middle truncate ${idx === row.getVisibleCells().length - 1 ? "text-right" : ""}`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {/* Add Task Row */}
          {onAddTask && (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-2.5 align-middle text-muted-foreground"
              >
                <button
                  onClick={onAddTask}
                  className="flex items-center gap-2 text-xs font-semibold text-subtle-text cursor-pointer w-full text-left py-1"
                >
                  <Plus
                    size={14}
                    className="text-foreground dark:text-background"
                  />
                  <span className="text-foreground font-normal text-xs">
                    Add Task
                  </span>
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

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
  onDeleteTask?: (task: TaskCardData) => void;
}

export const DataList: React.FC<DataListProps> = ({
  tasks,
  categories = DEFAULT_CATEGORIES,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="list-wrapper flex flex-col gap-4 w-full overflow-y-scroll">
      {categories.map((category) => {
        const categoryTasks = tasks.filter((task) => {
          const status = task.status || "";
          return normalizeString(status) === normalizeString(category.id);
        });

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
                onDeleteTask={onDeleteTask}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DataList;
