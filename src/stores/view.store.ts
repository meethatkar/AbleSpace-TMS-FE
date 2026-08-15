import { types, flow } from "mobx-state-tree";

export const ViewStore = types
  .model("ViewStore", {
    viewMode: types.optional(types.enumeration(["list", "board"]), "board"),
    // Store the selected column IDs
    selectedFields: types.array(types.string),
    // Search query for filtering tasks by name
    searchQuery: types.optional(types.string, ""),
    // Using a map of arrays for filters (e.g. { "priority": ["urgent", "high"] })
    selectedFilters: types.map(types.array(types.string)),
    isLoading: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setViewMode(mode: "list" | "board") {
      self.viewMode = mode;
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

    // The action called when a user clicks a row in the menu
    toggleField: flow(function* (fieldId: string) {
      // 1. Optimistically update the UI state
      if (self.selectedFields.includes(fieldId)) {
        self.selectedFields.remove(fieldId);
      } else {
        self.selectedFields.push(fieldId);
      }

      // 2. Trigger the API call to save preferences or fetch filtered data
      self.isLoading = true;
      try {
        // Example: Sending the new array of selected fields to your backend
        // yield TaskService.updateViewPreferences(self.selectedFields.toJSON());
        yield new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        console.error("Failed to sync view preferences", error);
        // Optional: Revert state here if API fails
      } finally {
        self.isLoading = false;
      }
    }),
  }));
