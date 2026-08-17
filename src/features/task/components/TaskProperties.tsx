import React from "react";
import { Calendar, Paperclip, Tag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";

const PropertyRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-4 py-2">
    <div className="w-24 shrink-0 text-sm font-medium text-foreground">
      {label}
    </div>
    <div className="flex-1 flex flex-wrap items-center gap-2">{children}</div>
  </div>
);

export const TaskProperties = () => {
  return (
    <div className="flex flex-col gap-2">
      <PropertyRow label="Properties">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-medium">
          <Image
            height={150}
            width={150}
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Designer"
            alt="Designer"
            className="w-4 h-4 rounded-full bg-neutral-200 dark:bg-neutral-700 object-cover"
          />
          <span>Designer</span>
        </div>
        <Badge variant="date" icon={<Calendar />} text="31 Jul" />
      </PropertyRow>

      <PropertyRow label="Labels">
        {["Research", "Design", "Development", "Testing", "Deployment"].map(
          (label) => (
            <Badge key={label} variant="default" icon={<Tag />} text={label} />
          ),
        )}
      </PropertyRow>

      <PropertyRow label="Resources">
        <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          <Paperclip size={14} />
          <span>Add document or link...</span>
        </div>
      </PropertyRow>
    </div>
  );
};
