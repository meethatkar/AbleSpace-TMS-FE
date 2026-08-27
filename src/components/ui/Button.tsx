"use client";
import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { Loader } from "./Loader";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "destructive" | "ghost";
  width?: "full" | "fit";
  isLoading?: boolean;
  loadingText?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      width = "fit",
      isLoading = false,
      loadingText,
      disabled,
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 py-2.5 px-4";

    const variants = {
      primary: "bg-[var(--primary)] text-background hover:opacity-90",
      outline:
        "border border-base-border bg-background text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800",
      destructive:
        "bg-[var(--badge-bg)] text-[var(--badge-text)] hover:bg-red-100 dark:hover:bg-red-900/30",
      ghost: "text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800",
    };

    const widths = {
      full: "w-full",
      fit: "w-fit",
    };

    const isDisabled = disabled || isLoading;

    // Handle click safety to ensure disabled/loading buttons cannot trigger events
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          widths[width],
          className,
          isDisabled ? "cursor-not-allowed" : "cursor-pointer",
        )}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        onClick={handleClick}
        {...props}
      >
        {isLoading ? (
          <Loader size="sm" text={loadingText} color="current" />
        ) : (
          <span className="inline-flex items-center gap-2">{children}</span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
