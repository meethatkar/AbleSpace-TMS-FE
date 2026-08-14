import { User } from "./User.type";

export type TaskStatus = "backlog" | "to-do" | "in-progress" | "on-hold" | "completed";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface TaskCardData {
  _id: string;
  name: string;
  description?: string;
  status: TaskStatus | string;
  reporter: User;
  members?: User[];
  teams?: string;
  dueDate?: string;
  priority?: TaskPriority | string;
  labels?: string[];
  updates?: string;
  updatedBy?: User;
}

export interface TaskCardProps {
  task: TaskCardData;
  onMenuClick?: () => void;
  onClick?: () => void;
}
