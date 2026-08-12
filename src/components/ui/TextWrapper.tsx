import React, { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import Image from "next/image";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TextWrapperProps extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  image?: string; // Expects an image URL
  leading?: React.ReactNode; // Fallback for custom blocks (like color squares)
  text?: string | React.ReactNode;
  trailing?: React.ReactNode;
  textColor: string;
}

export const TextWrapper = forwardRef<HTMLDivElement, TextWrapperProps>(
  (
    {
      icon,
      image,
      leading,
      text,
      trailing,
      children,
      className = "w-fit",
      textColor = "text-neutral-700 dark:text-neutral-200",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-2.5",
          textColor,
          className,
        )}
        {...props}
      >
        {/* Leading Element Priority: Image -> Icon -> Custom Leading */}
        {(image || icon || leading) && (
          <span className="flex shrink-0 items-center justify-center">
            {image ? (
              <Image
                src={image}
                height={200}
                width={200}
                alt={typeof text === "string" ? text : "Avatar"}
                className="h-6 w-6 rounded-full object-cover"
              />
            ) : icon ? (
              icon
            ) : (
              leading
            )}
          </span>
        )}

        {/* Main Text content */}
        {text && <span className="truncate text-sm font-medium">{text}</span>}

        {/* Fallback for standard children if the 'text' prop isn't used */}
        {children}

        {/* Optional trailing element (like a checkmark or dropdown arrow) */}
        {trailing && (
          <span className="ml-auto flex shrink-0 items-center justify-center">
            {trailing}
          </span>
        )}
      </div>
    );
  },
);

TextWrapper.displayName = "TextWrapper";
