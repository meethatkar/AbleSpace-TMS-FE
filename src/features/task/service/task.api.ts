import { TaskCardData } from "@/types/TaskCard.type";
import { api } from "@/utils/axios";

export const getAllTaskApi = async () => {
  return await api.get("/tasks");
};

export const createTaskApi = async (taskObj: TaskCardData) => {
  return await api.post("/tasks", {
    taskObj,
  });
};
