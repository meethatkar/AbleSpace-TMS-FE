import { createContext, useContext } from "react";
import { types, Instance } from "mobx-state-tree";
import { AuthStore } from "@/features/auth/store/auth.store";
import { UIStore } from "./ui.store";

// Define the Root Store model
export const RootStoreModel = types.model("RootStore", {
  authStore: types.optional(AuthStore, {}),
  uiStore: types.optional(UIStore, {}),
});

export type RootStoreInstance = Instance<typeof RootStoreModel>;

// Create the root store instance
let rootStore: RootStoreInstance;

export function getRootStore(): RootStoreInstance {
  if (!rootStore) {
    rootStore = RootStoreModel.create({
      authStore: {},
      uiStore: {},
    });
    rootStore.authStore.initialize();
    rootStore.uiStore.initialize();
  }
  return rootStore;
}

// React Context for the store
export const StoreContext = createContext<RootStoreInstance | null>(null);

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return store;
};
