import { useCallback } from "react";
import { useStore } from "@/stores/root.store";
import { projectApi } from "../service/projetc.api";
import { ProjectData, CreateProjectPayload } from "../Project.types";
export const useProject = () => {
  const { projectStore } = useStore();

  const getAllProjects = useCallback(async () => {
    projectStore.setLoading(true);
    projectStore.setError(null);
    try {
      const data: ProjectData[] = await projectApi.getAllProjects();
      projectStore.setProjects(data);
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch projects";
      projectStore.setError(errorMsg);
      console.error("MST/API Error: ", error);
    } finally {
      projectStore.setLoading(false);
    }
  }, [projectStore]);

  const createProject = useCallback(
    async (projectData: CreateProjectPayload) => {
      projectStore.setLoading(true);
      try {
        const newProject: ProjectData =
          await projectApi.createProject(projectData);
        projectStore.addProject(newProject);
        console.log("Project created successfully");
        return newProject;
      } catch (error: any) {
        console.log(
          error.response?.data?.message || "Failed to create project",
        );
        throw error;
      } finally {
        projectStore.setLoading(false);
      }
    },
    [projectStore],
  );

  return {
    projects: projectStore.projects,
    filteredProjects: projectStore.filteredProjects,
    selectedFields: projectStore.selectedFields.toJSON(),
    selectedFilters: projectStore.selectedFilters.toJSON(),
    searchQuery: projectStore.searchQuery,
    isLoading: projectStore.isLoading,
    error: projectStore.error,
    getAllProjects,
    createProject,
    setSearchQuery: (query: string) => projectStore.setSearchQuery(query),
    toggleFilter: (categoryId: string, optionId: string) =>
      projectStore.toggleFilter(categoryId, optionId),
    toggleField: (fieldId: string) => projectStore.toggleField(fieldId),
  };
};
