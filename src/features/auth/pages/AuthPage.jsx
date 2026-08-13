"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import { TextWrapper } from "@/components/ui/TextWrapper";

const AuthPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Page content — vertically centered */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        {/* Brand header */}
        <div className="mb-8">
          <TextWrapper
            image="/icons/Pyramid.svg"
            text="Pyramid"
            textColor="text-foreground"
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
            {/* Primary CTA */}
            <Button
              variant="primary"
              width="full"
              className="rounded-full py-3 text-sm font-semibold"
            >
              Continue as Guest
            </Button>

            {/* Google OAuth — outline button using TextWrapper with image prop */}
            <Button
              variant="outline"
              width="full"
              className="rounded-full py-3 text-sm font-medium"
            >
              <TextWrapper
                image="/icons/Google.svg"
                text="Login with Google"
                textColor="text-foreground"
                className="w-fit gap-2"
              />
            </Button>
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
