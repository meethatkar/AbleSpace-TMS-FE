import React, { useMemo } from "react";
import { useTable, flexRender, tableFeatures } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { getProjectTableColumns } from "./projectTableColumns";

const features = tableFeatures({});

export interface ProjectTableProps {
  projects: any[];
  onAddProject?: () => void;
  onEditProject?: (project: any) => void;
  selectedFields?: string[];
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  onAddProject,
  onEditProject,
  selectedFields = ["priority", "lead", "dueDate"],
}) => {
  const columns = useMemo(
    () => getProjectTableColumns({ onEditProject, selectedFields }),
    [onEditProject, selectedFields],
  );

  const table = useTable({
    data: projects,
    columns,
    features,
  });

  return (
    <div className="w-full overflow-hidden border border-base-border rounded-md bg-background mb-6 font-sans">
      <table className="w-full border-collapse text-left text-sm text-foreground table-fixed">
        <colgroup>
          {table.getHeaderGroups()[0]?.headers.map((header) => {
            const id = header.id;
            if (id === "name")
              return <col key={id} style={{ width: "493px" }} />;
            if (id === "actions")
              return <col key={id} className="w-[7%] min-w-20" />;
            return <col key={id} className="w-[15%] min-w-28" />;
          })}
        </colgroup>
        <thead className="bg-sidebar-accent border-b border-base-border text-subtle-text">
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
            <tr
              key={row.id}
              className="group hover:bg-sidebar-accent transition-colors"
            >
              {row.getAllCells().map((cell, idx) => (
                <td
                  key={cell.id}
                  className={`px-4 py-3 align-middle ${idx === row.getAllCells().length - 1 ? "text-right" : ""}`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {/* Add Project Row */}
          <tr>
            <td colSpan={columns.length} className="px-4 py-3">
              <button
                onClick={() => onAddProject?.()}
                className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer"
              >
                <Plus size={16} className="text-foreground" />
                Add Projects
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
