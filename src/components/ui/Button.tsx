"use client";
import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
// Assuming you are using lucide-react for icons based on modern Next.js setups
import { Loader2 } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "destructive" | "ghost";
  width?: "full" | "fit";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      width = "fit",
      isLoading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium disabled:pointer-events-none disabled:opacity-50 py-2.5 px-4";

    const variants = {
      primary: "bg-[var(--primary)] text-background hover:opacity-90",
      outline:
        "border border-base-border bg-background text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800",
      destructive:
        "bg-[var(--badge-bg)] text-[var(--badge-text)] hover:bg-red-100 dark:hover:bg-red-900/30",
      ghost: "text-foreground dark:text-background",
    };

    const widths = {
      full: "w-full",
      fit: "w-fit",
    };

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          widths[width],
          className,
          "cursor-pointer",
        )}
        disabled={isDisabled}
        // a11y guidelines: Explicitly define state for screen readers
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {/* Render a spinner icon when loading and hide it from screen readers */}
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}

        {/* Slightly fade the text when loading to emphasize the spinner */}
        <span
          className={cn(
            "inline-flex items-center gap-2",
            isLoading && "opacity-70",
          )}
        >
          {children}
        </span>
      </button>
    );
  },
);

Button.displayName = "Button";
