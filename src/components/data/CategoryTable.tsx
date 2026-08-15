import React from "react";
import { useTable, flexRender, tableFeatures } from "@tanstack/react-table";
import { TaskCardData } from "@/types/TaskCard.type";
import { getCategoryTableColumns } from "./categoryTableColumns";
import { Plus } from "lucide-react";

const features = tableFeatures({});

export interface CategoryTableProps {
  tasks: TaskCardData[];
  onAddTask?: () => void;
  onEditTask?: (task: TaskCardData) => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
  tasks,
  onAddTask,
  onEditTask,
}) => {
  const columns = React.useMemo(
    () => getCategoryTableColumns({ onEditTask }),
    [onEditTask],
  );

  const table = useTable({
    data: tasks,
    columns,
    features,
  });

  return (
    <div className="w-full overflow-hidden border border-base-border rounded-md bg-background  mb-6 font-sans">
      <table className="w-full border-collapse text-left text-sm text-foreground table-fixed">
        <colgroup>
          <col style={{ width: "493px" }} />
          <col className="w-[11%] min-w-20" />
          <col className="w-[11%] min-w-30" />
          <col className="w-[11%] min-w-30" />
          <col className="w-[7%] min-w-20" />
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
          {tasks.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-8 text-center text-muted-foreground text-sm"
              >
                No tasks present in this category.
              </td>
            </tr>
          )}
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getAllCells().map((cell, idx: number) => (
                <td
                  key={cell.id}
                  className={`px-4 py-3 align-middle truncate ${idx === row.getAllCells().length - 1 ? "text-right" : ""}`}
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
                  <span className="text-foreground font-medium text-xs">
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
