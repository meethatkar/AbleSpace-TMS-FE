"use client";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTasks } from "../hooks/useTasks";
import { KanbanColumn } from "@/components/data/KabanWrapper";
import { ViewHeader } from "@/components/data/ViewHeader";
import { KabanCard } from "@/components/data/KabanCard";
import DataList from "@/components/data/DataList";
import { TaskCardData } from "@/types/TaskCard.type";
import { normalizeString } from "@/utils/normalizeString";

const COLUMNS = [
  { id: "backlog", title: "Backlog" },
  { id: "to-do", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "on-hold", title: "On Hold" },
  { id: "completed", title: "Completed" },
];

const SAMPLE_TASKS: TaskCardData[] = [
  {
    _id: "sample-urgent",
    name: "Production crash hotfix",
    description:
      "Investigate and resolve CPU spikes occurring in staging environment.",
    status: "to-do",
    priority: "urgent",
    dueDate: "2026-08-15T12:00:00.000Z",
    reporter: {
      _id: "u1",
      username: "alex_smith",
      fullName: "Alex Smith",
      email: "alex@example.com",
      role: "admin",
      profileImg: null,
    },
    members: [],
    labels: ["Critical", "Bug"],
  },
  {
    _id: "sample-1",
    name: "Design modern dashboard interface",
    description:
      "Create high-fidelity wireframes and designs for the new dashboard.",
    status: "to-do",
    priority: "high",
    dueDate: "2026-08-25T12:00:00.000Z",
    reporter: {
      _id: "u1",
      username: "alex_smith",
      fullName: "Alex Smith",
      email: "alex@example.com",
      role: "admin",
      profileImg: null,
    },
    members: [
      {
        _id: "u2",
        username: "jane_doe",
        fullName: "Jane Doe",
        email: "jane@example.com",
        role: "designer",
        profileImg: null,
      },
      {
        _id: "u3",
        username: "sam_jones",
        fullName: "Sam Jones",
        email: "sam@example.com",
        role: "developer",
        profileImg: null,
      },
    ],
    labels: ["Design", "High-Priority"],
  },
  {
    _id: "sample-2",
    name: "Integrate MobX State Tree views",
    status: "in-progress",
    priority: "medium",
    dueDate: "2026-08-20T12:00:00.000Z",
    reporter: {
      _id: "u3",
      username: "sam_jones",
      fullName: "Sam Jones",
      email: "sam@example.com",
      role: "developer",
      profileImg: null,
    },
    members: [],
    labels: ["Frontend"],
  },
  {
    _id: "sample-3",
    name: "Setup MongoDB schema & Mongoose models",
    status: "completed",
    priority: "low",
    dueDate: "2026-08-10T12:00:00.000Z",
    reporter: {
      _id: "u1",
      username: "alex_smith",
      fullName: "Alex Smith",
      email: "alex@example.com",
      role: "admin",
      profileImg: null,
    },
    members: [
      {
        _id: "u3",
        username: "sam_jones",
        fullName: "Sam Jones",
        email: "sam@example.com",
        role: "developer",
        profileImg: null,
      },
    ],
    labels: ["Backend", "Database"],
  },
  {
    _id: "sample-4",
    name: "Refactor legacy authentication routes",
    description:
      "Move token verification to middleware and clean up route guards.",
    status: "backlog",
    priority: "low",
    dueDate: "2026-09-01T12:00:00.000Z",
    reporter: {
      _id: "u1",
      username: "alex_smith",
      fullName: "Alex Smith",
      email: "alex@example.com",
      role: "admin",
      profileImg: null,
    },
    members: [],
    labels: ["Auth", "Refactor"],
  },
  {
    _id: "sample-5",
    name: "Implement real-time push notifications",
    description:
      "Integrate WebSockets for instant task update push notifications.",
    status: "on-hold",
    priority: "medium",
    dueDate: "2026-08-30T12:00:00.000Z",
    reporter: {
      _id: "u3",
      username: "sam_jones",
      fullName: "Sam Jones",
      email: "sam@example.com",
      role: "developer",
      profileImg: null,
    },
    members: [
      {
        _id: "u2",
        username: "jane_doe",
        fullName: "Jane Doe",
        email: "jane@example.com",
        role: "designer",
        profileImg: null,
      },
    ],
    labels: ["WebSockets", "Feature"],
  },
];

const TaskPage = observer(() => {
  const { tasks = [], getAllTasks, createTask } = useTasks();
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");

  useEffect(() => {
    getAllTasks();
  }, []);

  // Merge database tasks with our beautiful sample tasks for local UI testing/demonstration
  const displayTasks =
    tasks.length > 0 ? [...tasks, ...SAMPLE_TASKS] : SAMPLE_TASKS;

  const getTasksForColumn = (columnId: string) => {
    return displayTasks.filter((task) => {
      const status = task.status || "";
      return normalizeString(status) === normalizeString(columnId);
    });
  };

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
            categories={COLUMNS}
            onAddTask={handleAddTask}
          />
        ) : (
          <div className="flex gap-5 overflow-x-auto items-start min-h-0">
            {COLUMNS.map((col) => {
              const colTasks = getTasksForColumn(col.id);
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
