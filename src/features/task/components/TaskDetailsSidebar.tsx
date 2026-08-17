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

export const TaskDetailsSidebar = () => {
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

  const [selectedStatus, setSelectedStatus] = useState(STATUS_OPTIONS[4]); // Backlog
  const [selectedPriority, setSelectedPriority] = useState(
    PRIORITY_OPTIONS_LIST[1],
  ); // High
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to?: Date }>({
    from: new Date("2026-01-10"),
    to: undefined,
  });
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
              <TextWrapper
                className="text-foreground cursor-pointer group/member"
                icon={<Users size={14} className="text-muted-foreground group-hover/member:text-foreground transition-colors" />}
                text="Add members"
              />
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
                        setDateRange(
                          range || { from: undefined, to: undefined },
                        );
                      }}
                    />
                  </div>
                )}
              </div>
            }
          />
          <SidebarRow
            label="Labels"
            value={<span className="text-muted-foreground text-sm">—</span>}
          />
          <SidebarRow
            label="Teams"
            value={<span className="text-muted-foreground text-sm">—</span>}
          />
          <SidebarRow
            label="Reporter"
            value={<span className="text-muted-foreground text-sm">—</span>}
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
