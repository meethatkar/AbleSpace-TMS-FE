import { types } from "mobx-state-tree";

export const UIStore = types
  .model("UIStore", {
    sidebarOpen: types.optional(types.boolean, true),
    isAddTaskModalOpen: types.optional(types.boolean, false),
  })
  .actions((self) => {
    function setSidebarOpen(value: boolean) {
      self.sidebarOpen = value;
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebar-open", String(value));
      }
    }

    return {
      setSidebarOpen,
      toggleSidebar() {
        setSidebarOpen(!self.sidebarOpen);
      },
      setAddTaskModalOpen(isOpen: boolean) {
        self.isAddTaskModalOpen = isOpen;
      },
      initialize() {
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem("sidebar-open");
          if (saved !== null) {
            setSidebarOpen(saved === "true");
          }
        }
      },
    };
  });
