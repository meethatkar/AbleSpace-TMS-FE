"use client";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTasks } from "../hooks/useTasks";
import { KanbanColumn } from "@/components/data/KabanWrapper";
import { ViewHeader } from "@/components/data/ViewHeader";
import { KabanCard } from "@/components/data/KabanCard";
import DataList from "@/components/data/DataList";
import { TaskCardData } from "@/types/TaskCard.type";

import { TASK_CATEGORIES } from "@/config/task.config";

const TaskPage = observer(() => {
  const { tasks = [], getAllTasks, createTask, getTasksByColumn } = useTasks();
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");

  useEffect(() => {
    getAllTasks();
  }, []);

  const displayTasks = tasks;

  const handleAddTask = async (status: string) => {
    const name = prompt("Enter task name:");
    if (!name) return;
    const newTask: TaskCardData = {
      _id: `task-${Date.now()}`,
      name,
      status,
      priority: "medium",
      reporter: {
        _id: "u3",
        username: "sam_jones",
        fullName: "Sam Jones",
        email: "sam@example.com",
        role: "developer",
        profileImg: null,
      },
      members: [],
      labels: [],
    };
    await createTask(newTask);
  };

  return (
    <div className="px-6 bg-background h-full flex flex-col overflow-hidden font-sans">
      <ViewHeader title="tasks" onAddClick={() => handleAddTask("to-do")} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-6">
        {viewMode === "list" ? (
          <DataList
            tasks={displayTasks}
            onAddTask={handleAddTask}
          />
        ) : (
          <div className="flex gap-5 overflow-x-auto items-start h-full min-h-0 pb-4">
            {TASK_CATEGORIES.map((col) => {
              const colTasks = getTasksByColumn(col.id);
              return (
                <KanbanColumn
                  key={col.id}
                  id={col.id}
                  title={col.title}
                  onAddClick={() => handleAddTask(col.id)}
                >
                  {colTasks.map((task) => (
                    <KabanCard key={task._id} task={task} />
                  ))}
                </KanbanColumn>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

export default TaskPage;
