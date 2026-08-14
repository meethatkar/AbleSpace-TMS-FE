import { User } from "./User.type";

export interface TaskCardData {
  _id: string;
  name: string;
  description?: string;
  status: string;
  reporter: User;
  members?: User[];
  teams?: string;
  dueDate?: string;
  priority?: string;
  labels?: string[];
  updates?: string;
  updatedBy?: User;
}

export interface TaskCardProps {
  task: TaskCardData;
  onMenuClick?: () => void;
  onClick?: () => void;
}
