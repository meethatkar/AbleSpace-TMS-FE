import React from "react";
import Image from "next/image";
import {
  MoreHorizontal,
  Plus,
  SignalHigh,
  SignalMedium,
  SignalLow,
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";

export type Subtask = {
  id: string;
  task: string;
  priority: "High" | "Medium" | "Low";
  member: string;
  dueDate: string;
};

export const getSubtaskColumns = (): ColumnDef<any, Subtask, any>[] => [
  {
    header: "Task",
    accessorKey: "task",
    cell: (info) => (
      <span className="font-medium">{info.getValue() as string}</span>
    ),
  },
  {
    header: "Priority",
    accessorKey: "priority",
    cell: (info) => {
      const priority = info.getValue() as string;
      if (priority === "High") {
        return (
          <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
            <SignalHigh size={14} />
            <span className="text-xs font-medium">High</span>
          </div>
        );
      }
      if (priority === "Medium") {
        return (
          <div className="flex items-center gap-1.5 text-orange-500">
            <SignalMedium size={14} />
            <span className="text-xs font-medium">Medium</span>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <SignalLow size={14} />
          <span className="text-xs font-medium">Low</span>
        </div>
      );
    },
  },
  {
    header: "Members",
    accessorKey: "member",
    cell: (info) => {
      const member = info.getValue() as string;
      if (member === "Felix") {
        return (
          <div className="w-6 h-6 rounded-full bg-purple-500 overflow-hidden border-2 border-background">
            <Image
              height={200}
              width={200}
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="user"
              className="w-full h-full object-cover"
            />
          </div>
        );
      }
      if (member === "CN") {
        return (
          <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-[10px] border-2 border-background font-medium">
            CN
          </div>
        );
      }
      return (
        <div className="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-dashed border-base-border text-muted-foreground">
          <Plus size={12} />
        </div>
      );
    },
  },
  {
    header: "Due Date",
    accessorKey: "dueDate",
    cell: (info) => (
      <span className="text-muted-foreground">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex justify-end">
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 text-muted-foreground"
        >
          <MoreHorizontal size={14} />
        </Button>
      </div>
    ),
  },
];
