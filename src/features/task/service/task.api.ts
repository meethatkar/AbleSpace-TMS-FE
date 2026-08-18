import { TaskCardData } from "@/types/TaskCard.type";
import { localApi } from "@/utils/axios";

export const getAllTaskApi = async () => {
  return await localApi.get("/tasks");
};

export const getTaskByIdApi = async (taskId: string) => {
  return await localApi.get(`/tasks/${taskId}`);
};

export const createTaskApi = async (taskObj: TaskCardData) => {
  return await localApi.post("/tasks", taskObj);
};

export const updateTaskApi = async (
  taskId: string,
  updateData: Partial<TaskCardData>,
) => {
  return await localApi.patch(`/tasks/${taskId}`, updateData);
};
