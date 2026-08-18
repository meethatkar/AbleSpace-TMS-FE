"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthPage from "@/features/auth/pages/AuthPage";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      router.replace("/");
    }
  }, [router]);

  return <AuthPage />;
}
