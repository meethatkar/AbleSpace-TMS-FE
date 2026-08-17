export const TASK_CATEGORIES = [
  { id: "todo", title: "Todo" },
  { id: "doing", title: "Doing" },
  { id: "completed", title: "Completed" },
  { id: "on-hold", title: "On-hold" },
  { id: "backlog", title: "Backlog" },
];

export const PRIORITY_CONFIG: Record<string, { color: string, label: string }> = {
  urgent: { color: "var(--tailwind-colors-red-500, #EF4444)", label: "Urgent" },
  high: { color: "var(--tailwind-colors-orange-500, #F97316)", label: "High" },
  medium: { color: "var(--tailwind-colors-yellow-500, #EAB308)", label: "Medium" },
  low: { color: "var(--tailwind-colors-gray-400, #9CA3AF)", label: "Low" },
  default: { color: "var(--subtle-text)", label: "—" }
};

export const STATUS_OPTIONS = [
  { id: "todo", label: "To Do", color: "#6b7280" },
  { id: "doing", label: "Doing", color: "#3b82f6" },
  { id: "completed", label: "Completed", color: "#10b981" },
  { id: "on-hold", label: "On Hold", color: "#f59e0b" },
  { id: "backlog", label: "Backlog", color: "#9ca3af" },
];

export const PRIORITY_OPTIONS_LIST = [
  { id: "urgent", label: "Urgent", color: "#EF4444" },
  { id: "high", label: "High", color: "#F97316" },
  { id: "medium", label: "Medium", color: "#EAB308" },
  { id: "low", label: "Low", color: "#9CA3AF" },
  { id: "no-priority", label: "No Priority", color: "var(--subtle-text)" }
];

export const AVAILABLE_FIELDS = [
  { id: "priority", label: "Priority" },
  { id: "members", label: "Members" },
  { id: "dueDate", label: "Due Date" },
  { id: "labels", label: "Labels" },
  { id: "status", label: "Status" },
  { id: "reporter", label: "Reporter" },
];
