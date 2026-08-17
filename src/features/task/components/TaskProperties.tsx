import React from "react";
import { Calendar, Paperclip, Tag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";
import { TaskCardData } from "@/types/TaskCard.type";
import { User } from "@/types/User.type";

interface TaskPropertiesProps {
  task?: TaskCardData | null;
}

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

const Dash = () => <span className="text-muted-foreground text-sm">—</span>;

const resolveUser = (u: User | string | undefined): User | null => {
  if (!u) return null;
  if (typeof u === "string") return null; // not yet populated
  return u;
};

export const TaskProperties = ({ task }: TaskPropertiesProps) => {
  const reporter = resolveUser(task?.reporter as User | string | undefined);
  const members = (task?.members ?? [])
    .map((m) => resolveUser(m as User | string))
    .filter(Boolean) as User[];

  const labels = task?.labels ?? [];
  const dueDate = task?.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="flex flex-col gap-2">
      {/* Reporter / Members */}
      <PropertyRow label="Properties">
        {reporter ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-medium">
            <Image
              height={150}
              width={150}
              src={
                reporter.profileImg ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${reporter.username}`
              }
              alt={reporter.fullName}
              className="w-4 h-4 rounded-full bg-neutral-200 dark:bg-neutral-700 object-cover"
            />
            <span>{reporter.fullName}</span>
          </div>
        ) : (
          <Dash />
        )}
        {dueDate ? (
          <Badge variant="date" icon={<Calendar />} text={dueDate} />
        ) : null}
      </PropertyRow>

      {/* Labels */}
      <PropertyRow label="Labels">
        {labels.length > 0 ? (
          labels.map((label) => (
            <Badge key={label} variant="default" icon={<Tag />} text={label} />
          ))
        ) : (
          <Dash />
        )}
      </PropertyRow>

      {/* Members */}
      {members.length > 0 && (
        <PropertyRow label="Members">
          {members.map((m) => (
            <div
              key={m._id}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-medium"
            >
              <Image
                height={150}
                width={150}
                src={
                  m.profileImg ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${m.username}`
                }
                alt={m.fullName}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span>{m.fullName}</span>
            </div>
          ))}
        </PropertyRow>
      )}

      {/* Resources */}
      <PropertyRow label="Resources">
        <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          <Paperclip size={14} />
          <span>Add document or link...</span>
        </div>
      </PropertyRow>
    </div>
  );
};
