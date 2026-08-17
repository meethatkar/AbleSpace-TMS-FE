"use client";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTasks } from "../hooks/useTasks";
import { TaskCardData } from "@/types/TaskCard.type";
import { TASK_CATEGORIES } from "@/config/task.config";
import { normalizeString } from "@/utils/normalizeString";
import { ViewMenuContainer } from "@/components/ViewMenuContainer";
import { ViewHeader } from "@/components/data/ViewHeader";
import { useStore } from "@/stores/root.store";
import DataList from "@/components/data/list/DataList";
import { KanbanColumn } from "@/components/data/kanban/KabanWrapper";
import { KabanCard } from "@/components/data/kanban/KabanCard";
import { FilterDropdown } from "@/components/FilterDropdown";

const TaskPage = observer(() => {
  const {
    tasks = [],
    getAllTasks,
    createTask,
    getTasksByColumn,
    updateTaskStatus,
  } = useTasks();
  const { viewStore } = useStore();
  const viewMode = viewStore.viewMode;
  const [isFieldsOpen, setIsFieldsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // --- Search State & Debounce ---
  const [localSearchQuery, setLocalSearchQuery] = useState(
    viewStore.searchQuery || "",
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      viewStore.setSearchQuery(localSearchQuery);
    }, 800);
    return () => clearTimeout(handler);
  }, [localSearchQuery, viewStore]);

  // --- Filter State & Logic ---
  const selectedFilters = viewStore.selectedFilters.toJSON();

  const handleToggle = (categoryId: string, optionId: string) => {
    viewStore.toggleFilter(categoryId, optionId);
  };
  // ----------------------------------

  useEffect(() => {
    getAllTasks();
  }, []);

  const displayTasks = React.useMemo(() => {
    return tasks.filter((task) => {
      // 1. Text Search Filter (Case-insensitive task name)
      if (viewStore.searchQuery) {
        if (
          !task.name
            ?.toLowerCase()
            .includes(viewStore.searchQuery.toLowerCase())
        ) {
          return false;
        }
      }

      // 2. Multi-Select Category Filters
      for (const [category, selectedIds] of Object.entries(selectedFilters)) {
        if (!selectedIds || selectedIds.length === 0) continue;

        switch (category) {
          case "priority":
            if (!selectedIds.includes(normalizeString(task.priority || "none")))
              return false;
            break;
          case "status":
            if (!selectedIds.includes(normalizeString(task.status || "")))
              return false;
            break;
          case "dueDate":
            if (!selectedIds.includes(task.dueDate || "")) return false;
            break;
          case "teams":
            if (!selectedIds.includes(task.teams || "")) return false;
            break;
          case "labels":
            if (!task.labels?.some((label) => selectedIds.includes(label)))
              return false;
            break;
          case "members":
            if (!task.members?.some((m) => selectedIds.includes(m._id)))
              return false;
            break;
          case "reporter":
            if (!selectedIds.includes(task.reporter?._id || "")) return false;
            break;
        }
      }
      return true;
    });
  }, [tasks, selectedFilters]);

  const handleAddTask = async (status: string) => {
    const name = prompt("Enter task name:");
    if (!name) return;
    const newTask: TaskCardData = {
      _id: `task-${Date.now()}`,
      name,
      status,
      priority: "medium",
      reporter: {
        _id: "u3",
        username: "sam_jones",
        fullName: "Sam Jones",
        email: "sam@example.com",
        role: "developer",
        profileImg: null,
      },
      members: [],
      labels: [],
    };
    await createTask(newTask);
  };

  return (
    <div className="px-6 bg-background h-full flex flex-col overflow-hidden font-sans">
      <ViewHeader
        title="tasks"
        searchQuery={localSearchQuery}
        onSearchChange={(e) => setLocalSearchQuery(e.target.value)}
        onAddClick={() => handleAddTask("todo")}
        onFieldsClick={() => setIsFieldsOpen(!isFieldsOpen)}
        isFieldsOpen={isFieldsOpen}
        fieldsMenu={<ViewMenuContainer />}
        onCloseFieldsMenu={() => setIsFieldsOpen(false)}
        onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
        isFilterOpen={isFilterOpen}
        filterMenu={
          <FilterDropdown
            selectedFilters={selectedFilters}
            onToggleFilter={handleToggle}
            tasks={tasks}
          />
        }
        onCloseFilterMenu={() => setIsFilterOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-6">
        {viewMode === "list" ? (
          <DataList tasks={displayTasks} onAddTask={handleAddTask} />
        ) : (
          <div className="flex gap-5 overflow-x-auto items-start h-full min-h-0 pb-4">
            {TASK_CATEGORIES.map((col) => {
              const colTasks = getTasksByColumn(displayTasks, col.id);
              return (
                <KanbanColumn
                  key={col.id}
                  id={col.id}
                  title={col.title}
                  onAddClick={() => handleAddTask(col.id)}
                  onDropTask={(taskId) => updateTaskStatus(taskId, col.id)}
                >
                  {colTasks.map((task) => (
                    <KabanCard key={task._id} task={task} />
                  ))}
                </KanbanColumn>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

export default TaskPage;
