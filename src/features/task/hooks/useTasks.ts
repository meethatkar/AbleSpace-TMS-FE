import { getRootStore, useStore } from "@/stores/root.store";
import { TaskCardData } from "@/types/TaskCard.type";
import {
  getAllTaskApi,
  getTaskByIdApi,
  createTaskApi,
  updateTaskApi,
} from "../service/task.api";
import { toJS } from "mobx";
import { normalizeString } from "@/utils/normalizeString";
import { TASK_CATEGORIES } from "@/config/task.config";

export const useTasks = () => {
  let taskStore;
  try {
    const rootStore = useStore();
    taskStore = rootStore.taskStore;
  } catch (error) {
    taskStore = getRootStore().taskStore;
  }

  // LOGIC TO FILTER TASKS AS PER IT'S STATUS
  const columns = TASK_CATEGORIES;
  const getTasksByColumn = (tasksArray: TaskCardData[], columnId: string) => {
    return tasksArray.filter((task) => {
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
      console.log("TSK OBJ: ", taskObj);

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

  // API TO UPDATE TASK STATUS (Optimistic UI)
  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    const previousTask = taskStore.tasks.find((t: any) => t._id === taskId);
    const previousStatus = previousTask?.status;

    if (previousStatus === newStatus) return; // No change needed

    // Optimistic Update
    taskStore.updateTaskStatus(taskId, newStatus);

    try {
      await updateTaskApi(taskId, { status: newStatus });
    } catch (err: any) {
      console.error("Error updating task status:", err);
      // Rollback on failure
      if (previousStatus) {
        taskStore.updateTaskStatus(taskId, previousStatus);
      }
      taskStore.setError("Failed to update task status");
    }
  };

  // API TO GET SINGLE TASK BY ID
  const getTaskById = async (taskId: string) => {
    taskStore.setTask(null);
    taskStore.setLoading(true);
    taskStore.setError(null);
    try {
      const response = await getTaskByIdApi(taskId);
      const task = response.data;
      taskStore.setTask(task);
      return task as TaskCardData;
    } catch (err: any) {
      console.error("Error in getTaskById:", err);
      const msg =
        err?.response?.data?.message ||
        err.message ||
        "Failed to fetch task. Please try again.";
      taskStore.setError(msg);
    } finally {
      taskStore.setLoading(false);
    }
  };

  /**
   * Generic optimistic field update.
   * Instantly applies the change in the store and fires the PATCH API.
   * Reverts on failure.
   */
  const updateTaskField = async <K extends keyof TaskCardData>(
    taskId: string,
    field: K,
    value: TaskCardData[K],
  ) => {
    const previousValue = taskStore.patchTaskField(taskId, field, value);

    try {
      await updateTaskApi(taskId, { [field]: value } as Partial<TaskCardData>);
    } catch (err: any) {
      console.error(`Error updating task field "${field}":`, err);
      // Rollback to previous value
      if (previousValue !== undefined) {
        taskStore.patchTaskField(taskId, field, previousValue);
      }
      taskStore.setError(`Failed to save "${field}". Please try again.`);
    }
  };

  return {
    tasks: toJS(taskStore.tasks) as TaskCardData[],
    task: toJS(taskStore.task) as TaskCardData,
    isLoading: taskStore.isLoading,
    error: taskStore.error,
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskStatus,
    updateTaskField,
    columns,
    getTasksByColumn,
  };
};
