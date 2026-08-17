import React, { useMemo } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  useTable,
  flexRender,
  tableFeatures,
} from "@tanstack/react-table";
import { Subtask, getSubtaskColumns } from "./taskSubtasksColumns";

const mockData: Subtask[] = [
  {
    id: "1",
    task: "Subtask 1",
    priority: "High",
    member: "Felix",
    dueDate: "12 Sep 2026",
  },
  {
    id: "2",
    task: "Subtask 2",
    priority: "Low",
    member: "CN",
    dueDate: "15 Sep 2026",
  },
  {
    id: "3",
    task: "Subtask 3",
    priority: "Medium",
    member: "plus",
    dueDate: "18 Sep 2026",
  },
];

const features = tableFeatures({});

export const TaskSubtasks = () => {
  const columns = useMemo(() => getSubtaskColumns(), []);

  const table = useTable({
    data: mockData,
    columns,
    features,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 font-medium">
        <ChevronDown size={18} />
        <span>Subtasks</span>
      </div>

      <div className="border border-base-border rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-background border-b border-base-border text-foreground font-medium">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, idx) => (
                  <th
                    key={header.id}
                    className={`px-4 py-3 font-medium ${idx === headerGroup.headers.length - 1 ? "text-right" : ""}`}
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
              <tr
                key={row.id}
                className="bg-background hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
              >
                {row.getAllCells().map((cell, idx) => (
                  <td
                    key={cell.id}
                    className={`px-4 py-3 ${idx === row.getAllCells().length - 1 ? "text-right" : ""}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-2 border-t border-base-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <Plus size={16} className="mr-2" />
            Add Subtasks
          </Button>
        </div>
      </div>
    </div>
  );
};
