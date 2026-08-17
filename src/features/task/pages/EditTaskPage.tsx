"use client";
import React from "react";
import { ViewHeader } from "@/components/data/ViewHeader";
import { Button } from "@/components/ui/Button";
import { Lock, Eye, Share2, MoreHorizontal, PanelRight } from "lucide-react";
import { TaskProperties } from "../components/TaskProperties";
import { TaskSubtasks } from "../components/TaskSubtasks";
import { TaskComments } from "../components/TaskComments";
import { TaskDetailsSidebar } from "../components/TaskDetailsSidebar";

const EditTaskPage = () => {
  return (
    <div className="px-6 bg-background h-full flex flex-col font-sans overflow-hidden">
      <ViewHeader
        title="Write API Documentation"
        subtitle="Create clear and detailed API documentation to guide developers in using the inventory and sales metrics features effectively."
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
            <TaskProperties />
            <TaskSubtasks />
            <TaskComments />
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[350px] shrink-0">
            <TaskDetailsSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskPage;
