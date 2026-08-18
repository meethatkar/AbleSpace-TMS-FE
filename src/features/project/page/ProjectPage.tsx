"use client";
import React, { useState, useMemo } from "react";
import { ViewHeader } from "@/components/data/ViewHeader";
import { ProjectTable } from "../components/ProjectTable";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { FilterDropdown } from "@/components/FilterDropdown";
import { ViewOptionsMenu } from "@/components/ViewOptionMenu";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useProject } from "../hook/useProject";

const ProjectPage = observer(() => {
  const {
    projects,
    filteredProjects,
    selectedFields,
    selectedFilters,
    searchQuery,
    setSearchQuery,
    toggleFilter,
    toggleField,
    getAllProjects,
    isLoading,
  } = useProject();

  const [isFieldsOpen, setIsFieldsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // --- Search Debounce ---
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localSearchQuery);
    }, 800);
    return () => clearTimeout(handler);
  }, [localSearchQuery, setSearchQuery]);

  React.useEffect(() => {
    getAllProjects();
  }, [getAllProjects]);

  return (
    <div className="px-6 bg-background h-full flex flex-col overflow-hidden font-sans">
      <ViewHeader
        title="Projects"
        searchQuery={localSearchQuery}
        onSearchChange={(e) => setLocalSearchQuery(e.target.value)}
        // onAddClick={() => console.log("Add Project Clicked")}
        onFieldsClick={() => setIsFieldsOpen(!isFieldsOpen)}
        isFieldsOpen={isFieldsOpen}
        fieldsMenu={
          <ViewOptionsMenu
            viewMode="list"
            onViewModeChange={() => {}} // Projects only have list view currently
            fields={[
              { id: "priority", label: "Priority" },
              { id: "lead", label: "Lead" },
              { id: "dueDate", label: "Due Date" },
            ]}
            selectedFields={selectedFields}
            onToggleField={toggleField}
          />
        }
        onCloseFieldsMenu={() => setIsFieldsOpen(false)}
        onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
        isFilterOpen={isFilterOpen}
        filterMenu={
          <FilterDropdown
            selectedFilters={selectedFilters as any}
            onToggleFilter={toggleFilter}
            tasks={toJS(projects) as any}
          />
        }
        onCloseFilterMenu={() => setIsFilterOpen(false)}
        customActions={
          <Button
            variant="primary"
            className="hidden lg:flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Add Task</span>
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Loading projects...
          </div>
        ) : (
          <ProjectTable
            projects={toJS(filteredProjects)}
            selectedFields={selectedFields}
            onAddProject={() => console.log("Add Project Clicked")}
            onEditProject={(project) =>
              console.log("Edit Project:", project._id)
            }
          />
        )}
      </div>
    </div>
  );
});

export default ProjectPage;
