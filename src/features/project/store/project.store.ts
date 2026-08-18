import { types, cast } from "mobx-state-tree";
import { UserModel } from "@/features/auth/store/auth.store";
import { ProjectData, UpdateProjectPayload } from "../Project.types";

export const ProjectModel = types.model("Project", {
  _id: types.identifier,
  name: types.string,
  description: types.maybeNull(types.string),
  status: types.maybeNull(types.string),
  lead: types.maybeNull(types.union(types.string, UserModel)),
  members: types.optional(
    types.array(types.union(types.string, UserModel)),
    [],
  ),
  priority: types.maybeNull(types.string),
  labels: types.optional(types.array(types.string), []),
  teams: types.maybeNull(types.string),
  dueDate: types.maybeNull(types.string),
  createdAt: types.maybeNull(types.string),
  updatedAt: types.maybeNull(types.string),
});

export const ProjectStore = types
  .model("ProjectStore", {
    projects: types.optional(types.array(ProjectModel), []),
    project: types.maybeNull(ProjectModel),
    isLoading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
    searchQuery: types.optional(types.string, ""),
    selectedFilters: types.map(types.array(types.string)),
    selectedFields: types.optional(types.array(types.string), [
      "priority",
      "lead",
      "dueDate",
    ]),
  })
  .views((self) => ({
    get filteredProjects() {
      return self.projects.filter((project) => {
        // Search
        if (
          self.searchQuery &&
          !project.name.toLowerCase().includes(self.searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Filter (Priority)
        const priorityFilters = self.selectedFilters.get("priority");
        if (priorityFilters && priorityFilters.length > 0) {
          if (
            !project.priority ||
            !priorityFilters.includes(project.priority.toLowerCase())
          ) {
            return false;
          }
        }

        return true;
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
    setProjects(projects: ProjectData[]) {
      self.projects = cast(projects);
    },
    setProject(project: ProjectData | null) {
      self.project = cast(project);
    },
    addProject(project: ProjectData) {
      self.projects.push(cast(project));
    },
    updateProject(updatedProject: ProjectData) {
      const index = self.projects.findIndex(
        (p) => p._id === updatedProject._id,
      );
      if (index !== -1) {
        self.projects[index] = cast(updatedProject);
      }
    },
    setSearchQuery(query: string) {
      self.searchQuery = query;
    },
    toggleFilter(categoryId: string, optionId: string) {
      let currentSelected = self.selectedFilters.get(categoryId);
      if (!currentSelected) {
        self.selectedFilters.set(categoryId, []);
        currentSelected = self.selectedFilters.get(categoryId);
      }

      if (currentSelected!.includes(optionId)) {
        currentSelected!.remove(optionId);
      } else {
        currentSelected!.push(optionId);
      }
    },
    toggleField(fieldId: string) {
      if (self.selectedFields.includes(fieldId)) {
        self.selectedFields.remove(fieldId);
      } else {
        self.selectedFields.push(fieldId);
      }
    },
  }));
