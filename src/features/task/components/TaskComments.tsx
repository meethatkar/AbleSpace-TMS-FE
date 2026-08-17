import React from "react";
import { Smile, MoreHorizontal, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export const TaskComments = () => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-medium">Subtasks</h3>

      {/* Existing Comment */}
      <div className="border border-base-border rounded-lg p-4 flex flex-col gap-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              height={200}
              width={200}
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ankit"
              alt="Ankit"
              className="w-6 h-6 rounded-full border border-base-border bg-neutral-100 dark:bg-neutral-800"
            />
            <span className="text-sm font-medium">Ankit Dutta</span>
            <span className="text-xs text-muted-foreground">just now</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Button variant="ghost" className="h-6 w-6 p-0">
              <Smile size={14} />
            </Button>
            <Button variant="ghost" className="h-6 w-6 p-0">
              <MoreHorizontal size={14} />
            </Button>
          </div>
        </div>

        <p className="text-sm text-foreground">dsds</p>

        <div className="border-t border-base-border mt-1 pt-3 flex items-center gap-2">
          <Image
            height={200}
            width={200}
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ankit"
            alt="Ankit"
            className="w-6 h-6 rounded-full border border-base-border bg-neutral-100 dark:bg-neutral-800 shrink-0"
          />
          <input
            type="text"
            placeholder="Leave a reply..."
            className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center gap-1 text-muted-foreground shrink-0">
            <Button variant="ghost" className="h-7 w-7 p-0">
              <Paperclip size={14} />
            </Button>
            <Button variant="ghost" className="h-7 w-7 p-0">
              <Send size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* New Comment Input */}
      <div className="border border-base-border rounded-lg p-3 flex items-center gap-2 mt-2 shadow-sm">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground px-1"
        />
        <div className="flex items-center gap-1 text-muted-foreground shrink-0">
          <Button variant="ghost" className="h-8 w-8 p-0">
            <Paperclip size={16} />
          </Button>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
