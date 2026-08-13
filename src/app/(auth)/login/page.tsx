"use client";

import React, { useEffect } from "react";
import AuthPage from "@/features/auth/pages/AuthPage.jsx";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      router.replace("/");
    }
  }, [router]);

  return <AuthPage />;
}
