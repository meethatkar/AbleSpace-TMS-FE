"use client";

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/root.store";
import { useRouter } from "next/navigation";

export const AuthGuard = observer(
  ({ children }: { children: React.ReactNode }) => {
    const { authStore } = useStore();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      console.log("NO TOEN");

      if (!token) {
        router.replace("/auth");
      } else {
        setIsChecking(false);
      }
    }, [authStore.user, router]);

    if (isChecking) {
      return (
        <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
        </div>
      );
    }

    return <>{children}</>;
  },
);
