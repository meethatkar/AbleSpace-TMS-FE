import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ChevronDown,
  Plus,
  Settings,
  SignalHigh,
  SignalMedium,
  SignalLow,
  Calendar as CalendarIcon,
  Check,
  Users,
} from "lucide-react";
import { Calendar } from "@/components/Calendar";
import { Badge } from "@/components/ui/Badge";
import { TextWrapper } from "@/components/ui/TextWrapper";
import { STATUS_OPTIONS, PRIORITY_OPTIONS_LIST } from "@/config/task.config";
import { useTasks } from "../hooks/useTasks";
import { TaskCardData } from "@/types/TaskCard.type";
import { User } from "@/types/User.type";

function useOnClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

const SidebarRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => {
  return (
    <div className="flex items-center text-sm py-2 group cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900/50 rounded-md px-2 -mx-2 transition-colors">
      <div className="w-28 text-foreground font-medium shrink-0">{label}</div>
      <div className="flex-1 flex items-center">{value}</div>
    </div>
  );
};

const getPriorityIcon = (id: string, color: string) => {
  if (id === "urgent" || id === "high")
    return <SignalHigh size={14} color={color} />;
  if (id === "medium") return <SignalMedium size={14} color={color} />;
  if (id === "low") return <SignalLow size={14} color={color} />;
  return <span className="w-[14px] h-[14px]" />;
};

export const TaskDetailsSidebar = ({
  task,
  taskId,
}: {
  task?: TaskCardData | null;
  taskId?: string;
}) => {
  const { updateTaskField } = useTasks();
  const [openPopover, setOpenPopover] = useState<
    "status" | "priority" | "dates" | null
  >(null);

  const statusRef = useRef<HTMLDivElement>(null);
  const priorityRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(
    statusRef,
    () => openPopover === "status" && setOpenPopover(null),
  );
  useOnClickOutside(
    priorityRef,
    () => openPopover === "priority" && setOpenPopover(null),
  );
  useOnClickOutside(
    datesRef,
    () => openPopover === "dates" && setOpenPopover(null),
  );

  // Initialise from real task data; fall back to sensible defaults
  const [selectedStatus, setSelectedStatus] = useState(
    STATUS_OPTIONS.find((o) =>
      o.label.toLowerCase() === task?.status?.toLowerCase(),
    ) ?? STATUS_OPTIONS[0],
  );
  const [selectedPriority, setSelectedPriority] = useState(
    PRIORITY_OPTIONS_LIST.find((o) =>
      o.label.toLowerCase() === task?.priority?.toLowerCase(),
    ) ?? PRIORITY_OPTIONS_LIST[2],
  );
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to?: Date }>({
    from: task?.dueDate ? new Date(task.dueDate) : undefined,
    to: undefined,
  });

  // Sync state when task prop changes (e.g., after data loads)
  useEffect(() => {
    if (!task) return;
    const matchStatus = STATUS_OPTIONS.find(
      (o) => o.label.toLowerCase() === task.status?.toLowerCase(),
    );
    if (matchStatus) setSelectedStatus(matchStatus);

    const matchPriority = PRIORITY_OPTIONS_LIST.find(
      (o) => o.label.toLowerCase() === task.priority?.toLowerCase(),
    );
    if (matchPriority) setSelectedPriority(matchPriority);

    setDateRange({ from: task.dueDate ? new Date(task.dueDate) : undefined, to: undefined });
  }, [task]);

  // Resolve members for display
  const members = (task?.members ?? []).filter(
    (m): m is User => typeof m === "object" && m !== null,
  );

  const reporter =
    task?.reporter && typeof task.reporter === "object"
      ? (task.reporter as User)
      : null;

  return (
    <div className="flex flex-col gap-4">
      {/* Details Section */}
      <div className="border border-base-border rounded-lg bg-background overflow-visible">
        <div className="flex items-center justify-between p-3 border-b border-transparent">
          <div className="flex items-center gap-1.5 font-medium text-foreground cursor-pointer hover:text-muted-foreground transition-colors">
            <ChevronDown size={16} />
            <span>Details</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <button className="hover:text-foreground transition-colors">
              <Plus size={16} />
            </button>
            <button className="hover:text-foreground transition-colors">
              <Settings size={16} />
            </button>
          </div>
        </div>

        <div className="px-5 pb-4 flex flex-col">
          <SidebarRow
            label="Status"
            value={
              <div className="relative" ref={statusRef}>
                <div
                  className="flex items-center gap-1.5 cursor-pointer"
                  onClick={() =>
                    setOpenPopover(openPopover === "status" ? null : "status")
                  }
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: selectedStatus.color }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {selectedStatus.label}
                  </span>
                </div>
                {openPopover === "status" && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-base-border rounded-lg shadow-lg z-50 py-2">
                    <div className="px-3 pb-2 text-xs text-muted-foreground font-medium">
                      Status
                    </div>
                    <div className="flex flex-col">
                      {STATUS_OPTIONS.map((opt) => (
                        <div
                          key={opt.id}
                          className="flex items-center justify-between px-3 py-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 cursor-pointer"
                          onClick={() => {
                            setSelectedStatus(opt);
                            setOpenPopover(null);
                            if (taskId) updateTaskField(taskId, "status", opt.label);
                          }}
                        >
                          <TextWrapper
                            className="text-foreground"
                            leading={
                              <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: opt.color }}
                              />
                            }
                            text={opt.label}
                          />
                          {selectedStatus.id === opt.id && (
                            <Check size={14} className="text-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            }
          />
          <SidebarRow
            label="Priority"
            value={
              <div className="relative" ref={priorityRef}>
                <div
                  className="flex items-center gap-1.5 cursor-pointer"
                  style={{ color: selectedPriority.color }}
                  onClick={() =>
                    setOpenPopover(
                      openPopover === "priority" ? null : "priority",
                    )
                  }
                >
                  {getPriorityIcon(selectedPriority.id, selectedPriority.color)}
                  <span className="text-sm font-medium">
                    {selectedPriority.label}
                  </span>
                  <ChevronDown
                    size={12}
                    className="text-muted-foreground ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                {openPopover === "priority" && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-base-border rounded-lg shadow-lg z-50 py-2">
                    <div className="px-3 pb-2 text-xs text-muted-foreground font-medium">
                      Priority
                    </div>
                    <div className="flex flex-col">
                      {PRIORITY_OPTIONS_LIST.map((opt) => (
                        <div
                          key={opt.id}
                          className="flex items-center justify-between px-3 py-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 cursor-pointer"
                          onClick={() => {
                            setSelectedPriority(opt);
                            setOpenPopover(null);
                            if (taskId) updateTaskField(taskId, "priority", opt.label);
                          }}
                        >
                          <TextWrapper
                            style={{ color: opt.color }}
                            icon={getPriorityIcon(opt.id, opt.color)}
                            text={opt.label}
                          />
                          {selectedPriority.id === opt.id && (
                            <Check size={14} className="text-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            }
          />
          <SidebarRow
            label="Members"
            value={
              members.length > 0 ? (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {members.map((m) => (
                    <div
                      key={m._id}
                      className="flex items-center gap-1.5 px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-medium"
                      title={m.fullName}
                    >
                      <Image
                        height={80}
                        width={80}
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
                </div>
              ) : (
                <TextWrapper
                  className="text-foreground cursor-pointer group/member"
                  icon={<Users size={14} className="text-muted-foreground group-hover/member:text-foreground transition-colors" />}
                  text="Add members"
                />
              )
            }
          />
          <SidebarRow
            label="Dates"
            value={
              <div className="relative" ref={datesRef}>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() =>
                    setOpenPopover(openPopover === "dates" ? null : "dates")
                  }
                >
                  {(["from", "to"] as const).map((key, index) => {
                    const d = dateRange[key];
                    return (
                      <React.Fragment key={key}>
                        {index === 1 && (
                          <span className="text-muted-foreground text-xs font-medium">
                            →
                          </span>
                        )}
                        <Badge
                          variant="default"
                          icon={
                            <CalendarIcon
                              size={12}
                              className="text-muted-foreground"
                            />
                          }
                          text={
                            d
                              ? d.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              : key === "from"
                                ? "Start"
                                : "End"
                          }
                          className="bg-transparent border border-base-border hover:bg-neutral-50 dark:hover:bg-neutral-900/50 font-medium text-foreground text-[11px]"
                        />
                      </React.Fragment>
                    );
                  })}
                </div>
                {openPopover === "dates" && (
                  <div className="absolute top-full -left-20 mt-1 z-50">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={(range: any) => {
                        const newRange = range || { from: undefined, to: undefined };
                        setDateRange(newRange);
                        // Save dueDate when the end date is selected
                        if (taskId && newRange.to) {
                          updateTaskField(taskId, "dueDate", newRange.to.toISOString());
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            }
          />
          <SidebarRow
            label="Labels"
            value={
              (task?.labels ?? []).length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {task!.labels!.map((l) => (
                    <span
                      key={l}
                      className="px-2 py-0.5 rounded-full text-xs bg-neutral-100 dark:bg-neutral-800 text-foreground font-medium"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-muted-foreground text-sm">—</span>
              )
            }
          />
          <SidebarRow
            label="Teams"
            value={
              task?.teams ? (
                <span className="text-sm text-foreground font-medium">{task.teams}</span>
              ) : (
                <span className="text-muted-foreground text-sm">—</span>
              )
            }
          />
          <SidebarRow
            label="Reporter"
            value={
              reporter ? (
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-medium">
                  <Image
                    height={80}
                    width={80}
                    src={
                      reporter.profileImg ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${reporter.username}`
                    }
                    alt={reporter.fullName}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>{reporter.fullName}</span>
                </div>
              ) : (
                <span className="text-muted-foreground text-sm">—</span>
              )
            }
          />
        </div>
      </div>

      {/* Updates Section */}
      <div className="border border-base-border rounded-lg bg-background">
        <div className="flex items-center justify-between p-3 border-b border-transparent">
          <div className="flex items-center gap-1.5 font-medium text-foreground cursor-pointer hover:text-muted-foreground transition-colors">
            <ChevronDown size={16} />
            <span>Updates</span>
          </div>
        </div>

        <div className="px-3 pb-4 flex flex-col gap-4">
          {/* Update Item 1 */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5">
              <SignalHigh size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">You</span>
              <span className="text-xs text-muted-foreground">
                changed priority from No priority to Urgent
              </span>
            </div>
          </div>

          {/* Update Item 2 */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 border border-base-border">
              <Image
                height={100}
                width={100}
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Designer"
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">You</span>
              <span className="text-xs text-muted-foreground">
                posted an update · Aug 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
