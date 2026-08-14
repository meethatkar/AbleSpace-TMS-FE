import { TaskCard } from "@/components/KabanCard";
import { KanbanColumn } from "@/components/KabanWrapper";
import { ViewHeader } from "@/components/ViewHeader";
import { TaskCardData } from "@/types/TaskCard.type";
import React from "react";

const TaskPage = () => {
  const sampleTask: TaskCardData = {
    id: "1",
    title: "Write API Documentation",
    assignee: {
      name: "Admin",
      image:
        "https://ik.imagekit.io/a4ft9seaz/task-management-system/TMS-profile.jpg?updatedAt=1786451424961",
    },
    dueDate: "29 Jul",
    tags: [
      { id: "t1", text: "Deployment" },
      { id: "t2", text: "Deployment" },
    ],
  };

  return (
    <div className="px-6 bg-background h-full flex flex-col overflow-hidden">
      <ViewHeader title="task" />
      <div className="flex gap-5 overflow-x-auto pb-6 items-start flex-1 min-h-0">
        <KanbanColumn id="to-do" title="to-do">
          <TaskCard task={sampleTask} />
          <TaskCard task={sampleTask} />
          <TaskCard task={sampleTask} />
        </KanbanColumn>
        <KanbanColumn id="to-do" title="to-do">
          <TaskCard task={sampleTask} />
        </KanbanColumn>
        <KanbanColumn id="to-do" title="to-do">
          <TaskCard task={sampleTask} />
          <TaskCard task={sampleTask} />
          <TaskCard task={sampleTask} />
        </KanbanColumn>
        <KanbanColumn id="to-do" title="to-do">
          <TaskCard task={sampleTask} />
        </KanbanColumn>
        <KanbanColumn id="to-do" title="to-do">
          <TaskCard task={sampleTask} />
          <TaskCard task={sampleTask} />
          <TaskCard task={sampleTask} />
        </KanbanColumn>
        <KanbanColumn id="to-do" title="to-do">
          <TaskCard task={sampleTask} />
        </KanbanColumn>
        <KanbanColumn id="to-do" title="to-do">
          <TaskCard task={sampleTask} />
          <TaskCard task={sampleTask} />
          <TaskCard task={sampleTask} />
        </KanbanColumn>
        <KanbanColumn id="to-do" title="to-do">
          <TaskCard task={sampleTask} />
        </KanbanColumn>
      </div>
    </div>
  );
};

export default TaskPage;
