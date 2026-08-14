"use client";
import { KanbanColumn } from "@/components/KabanWrapper";
import { ViewHeader } from "@/components/ViewHeader";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTasks } from "../hooks/useTasks";
import { KabanCard } from "@/components/KabanCard";

const TaskPage = observer(() => {
  const { getAllTasks, columns, getTasksByColumn } = useTasks();

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="px-6 bg-background h-full flex flex-col overflow-hidden">
      <ViewHeader title="task" />
      <div className="flex gap-5 overflow-x-auto pb-6 items-start flex-1 min-h-0">
        {columns.map((col) => {
          const colTasks = getTasksByColumn(col.id);
          return (
            <KanbanColumn key={col.id} id={col.id} title={col.title}>
              {colTasks.map((task) => (
                <KabanCard key={task._id} task={task} />
              ))}
            </KanbanColumn>
          );
        })}
      </div>
    </div>
  );
});

export default TaskPage;
