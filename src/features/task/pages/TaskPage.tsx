import { KanbanColumn } from "@/components/KabanWrapper";
import { ViewHeader } from "@/components/ViewHeader";
import React from "react";

const TaskPage = () => {
  return (
    <div className="px-6 bg-background">
      <ViewHeader title="task" />
      <KanbanColumn id="to-do" title="to-do">
        {" "}
        TEST{" "}
      </KanbanColumn>
    </div>
  );
};

export default TaskPage;
