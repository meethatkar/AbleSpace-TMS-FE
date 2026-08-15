"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/root.store";
import { ViewOptionsMenu } from "@/components/ViewOptionMenu";

// The variable list of fields to render
const AVAILABLE_FIELDS = [
  { id: "priority", label: "Priority" },
  { id: "members", label: "Members" },
  { id: "dueDate", label: "Due Date" },
  { id: "labels", label: "Labels" },
  { id: "status", label: "Status" },
  { id: "reporter", label: "Reporter" },
];

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
