import { api } from "@/utils/axios";
import { ProjectData } from "../Project.types";

const BASE_URL = "/project";

export const projectApi = {
  // Get all projects
  getAllProjects: async () => {
    const response = await api.get(BASE_URL);
    return response.data;
  },

  // Create a new project
  createProject: async (projectData: ProjectData) => {
    const response = await api.post(BASE_URL, projectData);
    return response.data;
  },
};
