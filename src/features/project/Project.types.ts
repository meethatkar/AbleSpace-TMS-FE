import { User } from "@/types/User.type";

export interface ProjectData {
  _id: string;
  name: string;
  description?: string;
  status: string;
  lead?: string | User;
  members?: (string | User)[];
  teams?: string;
  dueDate: string;
  priority?: string;
  labels?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type CreateProjectPayload = Omit<
  ProjectData,
  "_id" | "createdAt" | "updatedAt"
>;
export type UpdateProjectPayload = Partial<CreateProjectPayload>;
