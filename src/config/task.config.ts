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
