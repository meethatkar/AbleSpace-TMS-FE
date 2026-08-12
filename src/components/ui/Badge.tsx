import React, { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "date";
  icon?: React.ReactNode;
  text: string;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", icon, text, className, ...props }, ref) => {
    // Base styles: pill shape, small text, flex-aligned with a gap for icons
    const baseStyles =
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-colors";

    const variants = {
      // Standard gray tag (Design, Development, etc.)
      default:
        "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",

      // Date-specific tag using your established CSS variables for the red tint
      date: "bg-[var(--badge-bg)] text-[var(--badge-text)] ",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {/* Render icon if provided, sized appropriately for the badge */}
        {icon && (
          <span className="flex shrink-0 items-center justify-center [&>svg]:h-3 [&>svg]:w-3">
            {icon}
          </span>
        )}
        <span>{text}</span>
      </span>
    );
  },
);

Badge.displayName = "Badge";
