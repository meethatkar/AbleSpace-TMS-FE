import React from "react";
import { cn } from "@/components/ui/Button";

interface ProfileItemProps {
  label: string;
  description?: string;
  children: React.ReactNode;
  borderBottom?: boolean;
}

const ProfileItem: React.FC<ProfileItemProps> = ({
  label,
  description,
  children,
  borderBottom = true,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-4",
        borderBottom && "border-b border-base-border",
      )}
    >
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {description && (
          <span className="text-sm text-subtle-text">{description}</span>
        )}
      </div>
      <div className="flex items-center min-w-[200px] sm:w-[320px] justify-end sm:justify-start">
        {children}
      </div>
    </div>
  );
};

export default ProfileItem;
