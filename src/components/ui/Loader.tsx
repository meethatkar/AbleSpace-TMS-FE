"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type LoaderSize = "sm" | "md" | "lg" | "xl";
export type LoaderVariant = "spinner" | "dots" | "pulse";

export interface LoaderProps {
  size?: LoaderSize | number;
  variant?: LoaderVariant;
  text?: string;
  fullScreen?: boolean;
  center?: boolean;
  className?: string;
  textClassName?: string;
  color?: "primary" | "current" | "white" | "muted";
}

const sizeMap: Record<LoaderSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-3",
  xl: "h-12 w-12 border-4",
};

const iconSizeMap: Record<LoaderSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

const colorMap = {
  primary: "text-[var(--primary)] border-[var(--primary)]",
  current: "text-current border-current",
  white: "text-white border-white",
  muted: "text-subtle-text border-subtle-text",
};

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  variant = "spinner",
  text,
  fullScreen = false,
  center = false,
  className,
  textClassName,
  color = "current",
}) => {
  const pixelSize = typeof size === "number" ? size : iconSizeMap[size];
  const sizeClass = typeof size === "string" ? sizeMap[size] : "";

  const renderLoaderGraphic = () => {
    if (variant === "dots") {
      return (
        <div className={cn("inline-flex items-center gap-1", className)}>
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce" />
        </div>
      );
    }

    if (variant === "pulse") {
      return (
        <div
          className={cn(
            "rounded-full bg-current animate-ping opacity-75",
            typeof size === "number" ? "" : sizeClass,
            className
          )}
          style={typeof size === "number" ? { width: pixelSize, height: pixelSize } : undefined}
        />
      );
    }

    // Default spinner variant using Lucide Loader2
    return (
      <Loader2
        className={cn(
          "animate-spin shrink-0",
          colorMap[color],
          typeof size === "string" ? sizeClass.split(" ")[0] + " " + sizeClass.split(" ")[1] : "",
          className
        )}
        size={pixelSize}
        aria-hidden="true"
      />
    );
  };

  const content = (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex items-center justify-center gap-2",
        center && !fullScreen && "w-full py-4 text-center",
        className
      )}
    >
      {renderLoaderGraphic()}
      {text && (
        <span className={cn("text-xs font-medium text-foreground", textClassName)}>
          {text}
        </span>
      )}
      <span className="sr-only">{text || "Loading..."}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex min-h-screen w-screen items-center justify-center bg-background/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
