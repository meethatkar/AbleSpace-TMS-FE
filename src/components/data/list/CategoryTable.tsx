import React from "react";
import { useTable, flexRender, tableFeatures } from "@tanstack/react-table";
import { TaskCardData } from "@/types/TaskCard.type";
import { Plus } from "lucide-react";
import { getCategoryTableColumns } from "./categoryTableColumns";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/root.store";

const features = tableFeatures({});

export interface CategoryTableProps {
  tasks: TaskCardData[];
  onAddTask?: () => void;
  onEditTask?: (task: TaskCardData) => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = observer(({
  tasks,
  onAddTask,
  onEditTask,
}) => {
  const { viewStore } = useStore();
  const selectedFields = viewStore.selectedFields.toJSON();

  const columns = React.useMemo(
    () => getCategoryTableColumns({ onEditTask, selectedFields }),
    [onEditTask, JSON.stringify(selectedFields)],
  );

  const table = useTable({
    data: tasks,
    columns,
    features,
  });

  const visibleColumnsCount = columns.length;

  return (
    <div className="w-full overflow-hidden border border-base-border rounded-md bg-background  mb-6 font-sans">
      {/* Desktop & Tablet Table View */}
      <table className="hidden md:table w-full border-collapse text-left text-sm text-foreground table-fixed">
        <colgroup>
          {table.getHeaderGroups()[0]?.headers.map((header) => {
            const id = header.id;
            if (id === "name")
              return <col key={id} style={{ width: "493px" }} />;
            if (id === "actions")
              return <col key={id} className="w-[7%] min-w-20" />;
            return <col key={id} className="w-[11%] min-w-20" />;
          })}
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
                colSpan={visibleColumnsCount}
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
                colSpan={visibleColumnsCount}
                className="px-4 py-2.5 align-middle text-muted-foreground"
              >
                <button
                  onClick={onAddTask}
                  className="group flex items-center gap-2 text-xs font-semibold text-subtle-text cursor-pointer w-full text-left py-1"
                >
                  <Plus
                    size={14}
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                  />
                  <span className="text-muted-foreground group-hover:text-foreground font-medium text-xs transition-colors">
                    Add Task
                  </span>
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col divide-y divide-base-border">
        {tasks.length === 0 && (
          <div className="px-4 py-8 text-center text-muted-foreground text-sm">
            No tasks present in this category.
          </div>
        )}
        {table.getRowModel().rows.map((row) => {
          const getCell = (id: string) => row.getAllCells().find((c) => c.column.id === id);

          return (
            <div key={row.id} className="p-4 flex flex-col gap-4">
              {/* Task Name */}
              {getCell("name") && (
                <div className="w-full text-base font-medium">
                  {flexRender(
                    getCell("name")!.column.columnDef.cell,
                    getCell("name")!.getContext()
                  )}
                </div>
              )}

              {/* Grid for other properties */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                {/* Priority */}
                {getCell("priority") && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
                      Priority
                    </span>
                    <div className="flex items-center min-h-6">
                      {flexRender(
                        getCell("priority")!.column.columnDef.cell,
                        getCell("priority")!.getContext()
                      )}
                    </div>
                  </div>
                )}
                {/* Status */}
                {getCell("status") && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
                      Status
                    </span>
                    <div className="flex items-center min-h-6">
                      {flexRender(
                        getCell("status")!.column.columnDef.cell,
                        getCell("status")!.getContext()
                      )}
                    </div>
                  </div>
                )}
                {/* Due Date */}
                {getCell("dueDate") && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
                      Due Date
                    </span>
                    <div className="flex items-center min-h-6">
                      {flexRender(
                        getCell("dueDate")!.column.columnDef.cell,
                        getCell("dueDate")!.getContext()
                      )}
                    </div>
                  </div>
                )}
                {/* Reporter */}
                {getCell("reporter") && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
                      Reporter
                    </span>
                    <div className="flex items-center min-h-6">
                      {flexRender(
                        getCell("reporter")!.column.columnDef.cell,
                        getCell("reporter")!.getContext()
                      )}
                    </div>
                  </div>
                )}
                {/* Members */}
                {getCell("members") && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
                      Members
                    </span>
                    <div className="flex items-center min-h-6">
                      {flexRender(
                        getCell("members")!.column.columnDef.cell,
                        getCell("members")!.getContext()
                      )}
                    </div>
                  </div>
                )}
                {/* Labels */}
                {getCell("labels") && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
                      Labels
                    </span>
                    <div className="flex items-center min-h-6 flex-wrap">
                      {flexRender(
                        getCell("labels")!.column.columnDef.cell,
                        getCell("labels")!.getContext()
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {/* Add Task Row (Mobile) */}
        {onAddTask && (
          <div className="px-4 py-3">
            <button
              onClick={onAddTask}
              className="group flex items-center gap-2 text-xs font-semibold text-subtle-text cursor-pointer w-full text-left py-1"
            >
              <Plus
                size={14}
                className="text-muted-foreground group-hover:text-foreground transition-colors"
              />
              <span className="text-muted-foreground group-hover:text-foreground font-medium text-xs transition-colors">
                Add Task
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
});
