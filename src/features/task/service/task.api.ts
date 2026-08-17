import { TaskCardData } from "@/types/TaskCard.type";
import { api } from "@/utils/axios";

export const getAllTaskApi = async () => {
  return await api.get("/tasks");
};

export const getTaskByIdApi = async (taskId: string) => {
  return await api.get(`/tasks/${taskId}`);
};

export const createTaskApi = async (taskObj: TaskCardData) => {
  return await api.post("/tasks", taskObj);
};

export const updateTaskApi = async (
  taskId: string,
  updateData: Partial<TaskCardData>,
) => {
  return await api.patch(`/tasks/${taskId}`, updateData);
};
