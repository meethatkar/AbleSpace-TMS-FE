import { getRootStore, useStore } from "@/stores/root.store";
import { TaskCardData } from "@/types/TaskCard.type";
import { getAllTaskApi, createTaskApi } from "../service/task.api";
import { toJS } from "mobx";
import { normalizeString } from "@/utils/normalizeString";

export const useTasks = () => {
  let taskStore;
  try {
    const rootStore = useStore();
    taskStore = rootStore.taskStore;
  } catch (error) {
    taskStore = getRootStore().taskStore;
  }

  // LOGIC TO FILTER TASKS AS PER IT'S STATUS
  const columns = [
    { id: "to-do", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "completed", title: "Completed" },
  ];
  const getTasksByColumn = (columnId: string) => {
    const taskList = taskStore.tasks ? toJS(taskStore.tasks) : [];
    return taskList.filter((task) => {
      const status = task.status || "";
      return normalizeString(status) === normalizeString(columnId);
    });
  };

  // API TO GET ALL TASKS
  const getAllTasks = async () => {
    taskStore.setLoading(true);
    taskStore.setError(null);
    try {
      const response = await getAllTaskApi();
      const tasks = response.data;
      taskStore.setTasks(tasks);
    } catch (err: any) {
      console.error("Error in getAllTasks:", err);
      const msg =
        err?.response?.data?.message ||
        err.message ||
        "Failed to fetch tasks. Please try again.";
      taskStore.setError(msg);
    } finally {
      taskStore.setLoading(false);
    }
  };

  // API TO CREATE TASK.
  const createTask = async (
    taskObj: TaskCardData,
  ): Promise<TaskCardData | undefined> => {
    taskStore.setLoading(true);
    taskStore.setError(null);
    try {
      const response = await createTaskApi(taskObj);
      const newTask = response.data.task;
      taskStore.addTask(newTask);
      return newTask;
    } catch (err: any) {
      console.error("Error in createTask:", err);
      const msg =
        err?.response?.data?.message ||
        err.message ||
        "Failed to create task. Please try again.";
      taskStore.setError(msg);
    } finally {
      taskStore.setLoading(false);
    }
  };

  return {
    tasks: taskStore.tasks,
    task: taskStore.task,
    isLoading: taskStore.isLoading,
    error: taskStore.error,
    getAllTasks,
    createTask,
    columns,
    getTasksByColumn,
  };
};
