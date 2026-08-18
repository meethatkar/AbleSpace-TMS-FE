import { localApi } from "@/utils/axios";
import { CreateProjectPayload } from "../Project.types";

const BASE_URL = "/project";

export const projectApi = {
  // Get all projects
  getAllProjects: async () => {
    const response = await localApi.get(BASE_URL);
    return response.data;
  },

  // Create a new project
  createProject: async (projectData: CreateProjectPayload) => {
    const response = await localApi.post(BASE_URL, projectData);
    return response.data;
  },
};
