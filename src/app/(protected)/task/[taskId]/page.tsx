import EditTaskPage from "@/features/task/pages/EditTaskPage";
import React from "react";

interface PageProps {
  params: Promise<{ taskId: string }>;
}

const page = async ({ params }: PageProps) => {
  const { taskId } = await params;
  return (
    <div className="h-full">
      <EditTaskPage taskId={taskId} />
    </div>
  );
};

export default page;
