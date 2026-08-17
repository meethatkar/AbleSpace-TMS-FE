"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { ViewHeader } from "@/components/data/ViewHeader";
import { Button } from "@/components/ui/Button";
import {
  Lock,
  Eye,
  Share2,
  MoreHorizontal,
  PanelRight,
  AlertCircle,
} from "lucide-react";
import { TaskProperties } from "../components/TaskProperties";
import { TaskSubtasks } from "../components/TaskSubtasks";
import { TaskComments } from "../components/TaskComments";
import { TaskDetailsSidebar } from "../components/TaskDetailsSidebar";
import { useTasks } from "../hooks/useTasks";

interface EditTaskPageProps {
  taskId?: string;
}

// --- Skeleton Loader ---
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-md ${className}`} />
);

const EditTaskPageSkeleton = () => (
  <div className="px-6 bg-background h-full flex flex-col font-sans overflow-hidden">
    <div className="flex items-center justify-between py-5 w-full">
      <div className="flex flex-col gap-2">
        <SkeletonBlock className="h-6 w-64" />
        <SkeletonBlock className="h-4 w-96" />
      </div>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonBlock key={i} className="h-8 w-8" />
        ))}
      </div>
    </div>
    <div className="flex flex-col lg:flex-row gap-6 flex-1 pb-8">
      <div className="flex-1 flex flex-col gap-8 min-w-0 pr-4">
        <SkeletonBlock className="h-28" />
        <SkeletonBlock className="h-52" />
        <SkeletonBlock className="h-40" />
      </div>
      <div className="w-full lg:w-[350px] shrink-0 flex flex-col gap-4">
        <SkeletonBlock className="h-72" />
        <SkeletonBlock className="h-40" />
      </div>
    </div>
  </div>
);

// --- Error State ---
const EditTaskPageError = ({ message }: { message: string }) => (
  <div className="h-full flex items-center justify-center">
    <div className="flex flex-col items-center gap-3 text-center max-w-xs">
      <AlertCircle size={40} className="text-red-500" />
      <p className="text-lg font-semibold text-foreground">Failed to load task</p>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  </div>
);

const EditTaskPage = observer(({ taskId }: EditTaskPageProps) => {
  const { task, isLoading, error, getTaskById, updateTaskField } = useTasks();

  useEffect(() => {
    if (taskId) {
      getTaskById(taskId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  // --- Debounced title save (Trigger: onBlur / 800ms debounce) ---
  const titleDebounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleTitleChange = useCallback(
    (newTitle: string) => {
      if (!taskId || !newTitle || newTitle === task?.name) return;
      if (titleDebounceTimer.current) clearTimeout(titleDebounceTimer.current);
      titleDebounceTimer.current = setTimeout(() => {
        updateTaskField(taskId, "name", newTitle);
      }, 800);
    },
    [taskId, task?.name, updateTaskField],
  );

  if (isLoading) return <EditTaskPageSkeleton />;
  if (error) return <EditTaskPageError message={error} />;

  return (
    <div className="px-6 bg-background h-full flex flex-col font-sans overflow-hidden">
      <ViewHeader
        title={task?.name ?? "Untitled Task"}
        subtitle={task?.description}
        onTitleChange={taskId ? handleTitleChange : undefined}
        customActions={
          <div className="flex items-center gap-2">
            <Button variant="outline" className="px-2.5" aria-label="Privacy">
              <Lock size={16} />
            </Button>
            <Button
              variant="outline"
              className="px-3 gap-1.5 text-blue-700 dark:text-blue-400"
              aria-label="Views"
            >
              <Eye size={16} />
              <span>1</span>
            </Button>
            <Button variant="outline" className="px-2.5" aria-label="Share">
              <Share2 size={16} />
            </Button>
            <Button variant="outline" className="px-2.5" aria-label="More">
              <MoreHorizontal size={16} />
            </Button>
            <Button
              variant="outline"
              className="px-2.5 bg-neutral-100 dark:bg-neutral-800"
              aria-label="Split View"
            >
              <PanelRight size={16} />
            </Button>
          </div>
        }
      />
      {/* Edit Page Content */}
      <div className="flex-1 overflow-y-auto mt-4">
        <div className="flex flex-col lg:flex-row gap-6 h-full pb-8">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-8 min-w-0 pr-4">
            <TaskProperties task={task} />
            <TaskSubtasks />
            <TaskComments taskId={taskId} />
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[350px] shrink-0">
            <TaskDetailsSidebar task={task} taskId={taskId} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default EditTaskPage;

