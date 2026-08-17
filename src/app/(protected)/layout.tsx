import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { AuthGuard } from "@/components/AuthGuard";

import { AddTaskModal } from "@/features/task/components/AddTaskModal";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex flex-row h-screen w-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
        </div>
      </div>
      <AddTaskModal />
    </AuthGuard>
  );
}
