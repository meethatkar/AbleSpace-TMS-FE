import React from "react";
import { PRIORITY_CONFIG } from "@/config/task.config";

interface SignalIconProps {
  priority?: string;
}

export const SignalIcon: React.FC<SignalIconProps> = ({ priority }) => {
  const p = priority?.toLowerCase() || "default";

  // Determine active styling based on priority configuration
  const activeColor = PRIORITY_CONFIG[p]?.color || PRIORITY_CONFIG["default"].color;
  const emptyColor = "var(--base-border, #e5e5e5)";
  
  // Calculate how many bars should be colored
  const activeBars = p === "urgent" || p === "high" ? 3 : p === "medium" ? 2 : p === "low" ? 1 : 0;

  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="10" width="2.5" height="4" rx="0.5" fill={activeBars >= 1 ? activeColor : emptyColor} />
      <rect x="6.75" y="6" width="2.5" height="8" rx="0.5" fill={activeBars >= 2 ? activeColor : emptyColor} />
      <rect x="11.5" y="2" width="2.5" height="12" rx="0.5" fill={activeBars >= 3 ? activeColor : emptyColor} />
    </svg>
  );
};
