import { TaskCardData } from "@/types/TaskCard.type";
import { types, cast } from "mobx-state-tree";
import { UserModel } from "@/features/auth/store/auth.store";
import { normalizeString } from "@/utils/normalizeString";

export const TaskModel = types.model("Task", {
  _id: types.identifier,
  name: types.string,
  description: types.maybe(types.string),
  status: types.string,
  reporter: types.union(types.string, UserModel),
  members: types.array(types.union(types.string, UserModel)),
  teams: types.maybe(types.string),
  dueDate: types.maybe(types.string),
  priority: types.maybe(types.string),
  labels: types.array(types.string),
  updates: types.maybe(types.string),
  updatedBy: types.maybe(types.union(types.string, UserModel)),
});

export const TaskStore = types
  .model("TaskStore", {
    tasks: types.optional(types.array(TaskModel), []),
    task: types.maybeNull(TaskModel),
    isLoading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
  })
  // Views: Reactive, cached, read-only derived state that automatically recalculates when inputs change.
  .views((self) => ({
    getTasksByColumn(columnId: string) {
      return self.tasks.filter((task) => {
        const status = task.status || "";
        return normalizeString(status) === normalizeString(columnId);
      });
    },
  }))
  .actions((self) => ({
    setLoading(val: boolean) {
      self.isLoading = val;
    },
    setError(msg: string | null) {
      self.error = msg;
    },
    setTasks(tasks: TaskCardData[]) {
      self.tasks = cast(tasks as any);
    },
    setTask(task: TaskCardData | null) {
      self.task = cast(task as any);
      //The cast helper tells TypeScript to safely treat the input snapshot/plain object as assignable to the MST instance property.
    },
    addTask(task: TaskCardData) {
      self.tasks.push(cast(task as any));
    },
    updateTask(updatedTask: TaskCardData) {
      const index = self.tasks.findIndex((t) => t._id === updatedTask._id);
      if (index !== -1) {
        self.tasks[index] = cast(updatedTask as any);
      }
    },
    /**
     * Generic optimistic field patcher for a single task.
     * Returns the previous value so the caller can roll back on API failure.
     */
    patchTaskField<K extends keyof TaskCardData>(
      taskId: string,
      field: K,
      value: TaskCardData[K],
    ): TaskCardData[K] | undefined {
      const task = self.tasks.find((t) => t._id === taskId) as any;
      if (!task) return undefined;
      const prev = task[field];
      task[field] = value;
      return prev;
    },
    updateTaskStatus(taskId: string, newStatus: string) {
      const task = self.tasks.find((t) => t._id === taskId);
      if (task) {
        task.status = newStatus;
      }
    },
    removeTask(taskId: string) {
      const index = self.tasks.findIndex((t) => t._id === taskId);
      if (index !== -1) {
        self.tasks.splice(index, 1);
      }
    },
  }));

