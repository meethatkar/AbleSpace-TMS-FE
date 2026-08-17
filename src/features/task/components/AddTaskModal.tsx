"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/root.store";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { STATUS_OPTIONS, PRIORITY_OPTIONS_LIST } from "@/config/task.config";
import { Calendar } from "@/components/Calendar";
import { useTasks } from "../hooks/useTasks";

export const AddTaskModal = observer(() => {
  const { uiStore } = useStore();
  const { user } = useAuth();
  const { createTask, isLoading } = useTasks();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "No Priority",
    dueDate: "",
    isCalendarOpen: false,
    labelsText: "",
  });

  if (!uiStore.isAddTaskModalOpen) return null;

  const handleClose = () => {
    uiStore.setAddTaskModalOpen(false);
    // Reset form
    setFormData({
      title: "",
      description: "",
      status: "To Do",
      priority: "No Priority",
      dueDate: "",
      isCalendarOpen: false,
      labelsText: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.dueDate) {
      // Basic validation (could add better UI feedback)
      return;
    }

    const selectedDate = new Date(formData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Due date cannot be in the past.");
      return;
    }

    const parsedLabels = formData.labelsText
      ? formData.labelsText
          .split(" ")
          .map((l) => l.trim())
          .filter((l) => l.length > 0)
      : [];

    const newTask = {
      name: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate,
      reporter: user?._id || "unknown",
      members: [],
      labels: parsedLabels,
    };

    await createTask(newTask as any);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-background border border-base-border rounded-xl shadow-2xl font-sans flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-border">
          <h2 className="text-lg font-semibold text-foreground">Add Task</h2>
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            className="p-1.5 h-auto text-muted-foreground hover:text-foreground rounded-md"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-5">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              className="w-full px-3 py-2 bg-background border border-base-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add a description..."
              rows={3}
              className="w-full px-3 py-2 bg-background border border-base-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground resize-none"
            />
          </div>

          {/* Status & Priority Row */}
          <div className="flex items-center gap-4">
            {[
              {
                name: "status",
                label: "Status",
                value: formData.status,
                options: STATUS_OPTIONS,
              },
              {
                name: "priority",
                label: "Priority",
                value: formData.priority,
                options: PRIORITY_OPTIONS_LIST,
              },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-foreground">
                  {field.label}
                </label>
                <select
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-background border border-base-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                >
                  {field.options.map((opt) => (
                    <option key={opt.id} value={opt.label as string}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Labels */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Labels
            </label>
            <input
              type="text"
              name="labelsText"
              value={formData.labelsText}
              onChange={handleChange}
              placeholder="e.g. development backend optimization"
              className="w-full px-3 py-2 bg-background border border-base-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Separate multiple labels with a space
            </p>
          </div>

          {/* Due Date */}
          <div className="flex flex-col gap-1.5 relative">
            <label className="text-sm font-medium text-foreground">
              Due Date *
            </label>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  isCalendarOpen: !prev.isCalendarOpen,
                }))
              }
              className="w-full px-3 py-2 bg-background border border-base-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground text-left"
            >
              {formData.dueDate || "e.g. 12 Sep 2026"}
            </button>

            {formData.isCalendarOpen && (
              <div className="absolute top-full mt-2 left-0 z-50">
                <div
                  className="fixed inset-0 z-[-1]"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, isCalendarOpen: false }))
                  }
                />
                <Calendar
                  mode="single"
                  selected={
                    formData.dueDate ? new Date(formData.dueDate) : undefined
                  }
                  onSelect={(date) => {
                    if (date) {
                      setFormData((prev) => ({
                        ...prev,
                        dueDate: date.toISOString().split("T")[0],
                        isCalendarOpen: false,
                      }));
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={
                !formData.title.trim() || !formData.dueDate || isLoading
              }
              isLoading={isLoading}
            >
              Add Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
});
