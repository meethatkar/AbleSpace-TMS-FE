import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { AuthGuard } from "@/components/AuthGuard";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex flex-1 flex-row">
        <Sidebar />
        <div className="flex flex-col flex-1 min-h-screen overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
