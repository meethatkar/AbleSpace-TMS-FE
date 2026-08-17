"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/root.store";
import { ViewOptionsMenu } from "@/components/ViewOptionMenu";
import { AVAILABLE_FIELDS } from "@/config/task.config";
export const ViewMenuContainer = observer(() => {
  const { viewStore } = useStore();

  return (
    <ViewOptionsMenu
      viewMode={viewStore.viewMode as "list" | "board"}
      onViewModeChange={(mode) => viewStore.setViewMode(mode)}
      fields={AVAILABLE_FIELDS}
      // Pass standard array to UI
      selectedFields={viewStore.selectedFields.toJSON()}
      onToggleField={(id) => viewStore.toggleField(id)}
    />
  );
});
