"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextWrapper } from "@/components/ui/TextWrapper";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleIcon, PyramidIcon } from "@/components/ui/Icons";

const AuthPage = () => {
  const router = useRouter();
  const { handleGuestLogin, handleGoogleLogin, isLoading, error } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/");
    } else {
      const timer = setTimeout(() => {
        setIsChecking(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [router]);

  const onGuestLogin = async () => {
    const user = await handleGuestLogin();
    if (user) {
      router.push("/");
    }
  };

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Page content — vertically centered */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        {/* Brand header */}
        <div className="mb-8">
          <TextWrapper
            icon={<PyramidIcon />}
            text="Pyramid"
            className="w-fit gap-2"
          />
        </div>

        {/* Login card */}
        <div className="flex w-105 max-w-full flex-col gap-6 rounded-2xl border border-base-border bg-background p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          {/* Card heading */}
          <div className="text-center">
            <h1 className="mb-1 text-[22px] font-bold leading-snug text-foreground">
              Let&apos;s get back on track
            </h1>
            <p className="text-sm text-subtle-text">
              Enter your email below to login to your account.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            {/* Error display if any */}
            {error && (
              <div className="text-center text-xs text-red-500 bg-red-500/10 py-2 px-3 rounded-lg border border-red-500/20">
                {error}
              </div>
            )}

            {/* Primary CTA */}
            <Button
              variant="primary"
              width="full"
              className="rounded-full py-3 text-sm font-semibold hover:cursor-pointer"
              onClick={onGuestLogin}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Continue as Guest"}
            </Button>

            {/* Google OAuth — outline button using TextWrapper with image prop */}
            <div className="relative">
              <Button
                variant="outline"
                width="full"
                className="rounded-full py-3 text-sm font-medium"
                disabled={isLoading}
              >
                <TextWrapper
                  icon={<GoogleIcon />}
                  text="Login with Google"
                  className="w-fit gap-2"
                />
              </Button>
              {!isLoading && (
                <div className="absolute inset-0 opacity-0 overflow-hidden cursor-pointer [&>div]:w-full [&>div]:h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:min-w-full">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      if (credentialResponse.credential) {
                        handleGoogleLogin(credentialResponse.credential).then(
                          (user) => {
                            if (user) {
                              router.push("/");
                            }
                          },
                        );
                      }
                    }}
                    onError={() => {
                      console.error("Google Login Failed");
                    }}
                    useOneTap
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer disclaimer */}
        <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
          By clicking continue, you agree to
          <br />
          our{" "}
          <a
            href="#"
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Privacy
            <br />
            Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
