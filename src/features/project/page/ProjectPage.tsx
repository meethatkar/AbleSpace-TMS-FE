"use client";
import React, { useState, useMemo } from "react";
import { ViewHeader } from "@/components/data/ViewHeader";
import { ProjectTable } from "../components/ProjectTable";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { ViewOptionsMenu } from "@/components/ViewOptionMenu";
import { FilterDropdown } from "@/components/FilterDropdown";

// Mock Data
const MOCK_PROJECTS = [
  {
    _id: "1",
    name: "Design Homepage",
    priority: "High",
    lead: "Jane Doe",
    dueDate: "2026-09-12T00:00:00.000Z",
  },
  {
    _id: "2",
    name: "Develop Login Feature",
    priority: "Low",
    lead: "John Smith",
    dueDate: "2026-09-15T00:00:00.000Z",
  },
  {
    _id: "3",
    name: "Test Payment Gateway",
    priority: "Medium",
    lead: "Alex Wong",
    dueDate: "2026-09-18T00:00:00.000Z",
  },
];

const ProjectPage = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>([
    "priority",
    "lead",
    "dueDate",
  ]);
  const [isFieldsOpen, setIsFieldsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const handleToggleField = (fieldId: string) => {
    setSelectedFields((prev) =>
      prev.includes(fieldId)
        ? prev.filter((id) => id !== fieldId)
        : [...prev, fieldId],
    );
  };

  const handleToggleFilter = (categoryId: string, optionId: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (!newFilters[categoryId]) {
        newFilters[categoryId] = [];
      }

      const categoryArray = newFilters[categoryId];
      if (categoryArray.includes(optionId)) {
        newFilters[categoryId] = categoryArray.filter((id) => id !== optionId);
      } else {
        newFilters[categoryId] = [...categoryArray, optionId];
      }

      return newFilters;
    });
  };

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter((project) => {
      // Search
      if (
        searchQuery &&
        !project.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter (Priority) - only implementing Priority filter for mock data since it uses simple string matches
      const priorityFilters = selectedFilters["priority"];
      if (priorityFilters && priorityFilters.length > 0) {
        if (!priorityFilters.includes(project.priority.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedFilters]);

  return (
    <div className="px-6 bg-background h-full flex flex-col overflow-hidden font-sans">
      <ViewHeader
        title="Projects"
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
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
            onToggleField={handleToggleField}
          />
        }
        onCloseFieldsMenu={() => setIsFieldsOpen(false)}
        onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
        isFilterOpen={isFilterOpen}
        filterMenu={
          <FilterDropdown
            selectedFilters={selectedFilters as any}
            onToggleFilter={handleToggleFilter}
            tasks={MOCK_PROJECTS as any}
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
        <ProjectTable
          projects={filteredProjects}
          selectedFields={selectedFields}
          onAddProject={() => console.log("Add Project Clicked")}
          onEditProject={(project) => console.log("Edit Project:", project._id)}
        />
      </div>
    </div>
  );
};

export default ProjectPage;
