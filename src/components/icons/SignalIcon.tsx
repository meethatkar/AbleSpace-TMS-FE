import React from "react";
import { PRIORITY_CONFIG } from "@/config/priority.config";

interface SignalIconProps {
  priority?: string;
}

export const SignalIcon: React.FC<SignalIconProps> = ({ priority }) => {
  const p = priority?.toLowerCase() || "default";

  // Use CSS variables for priority bar colors, defaulting to standard colors
  const emptyColor = "var(--base-border, #e5e5e5)";
  let bar1Color = emptyColor;
  let bar2Color = emptyColor;
  let bar3Color = emptyColor;

  const activeColor = PRIORITY_CONFIG[p]?.color || PRIORITY_CONFIG["default"].color;

  if (p === "urgent" || p === "high") {
    bar1Color = activeColor;
    bar2Color = activeColor;
    bar3Color = activeColor;
  } else if (p === "medium") {
    bar1Color = activeColor;
    bar2Color = activeColor;
  } else if (p === "low") {
    bar1Color = activeColor;
  }

  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="10" width="2.5" height="4" rx="0.5" fill={bar1Color} />
      <rect x="6.75" y="6" width="2.5" height="8" rx="0.5" fill={bar2Color} />
      <rect x="11.5" y="2" width="2.5" height="12" rx="0.5" fill={bar3Color} />
    </svg>
  );
};
