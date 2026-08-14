"use client";
import React, {
  InputHTMLAttributes,
  forwardRef,
  useState,
  useRef,
} from "react";
import { Search } from "lucide-react";
import { cn } from "./Button";

export interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  shortcut?: string;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    { shortcut = "⌘F", className, value, onChange, onFocus, onBlur, ...props },
    ref,
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Merge internal and external refs
    const setRefs = (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    };

    const handleContainerClick = () => {
      setIsExpanded(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!e.target.value) {
        setIsExpanded(false);
      }
      if (onBlur) {
        onBlur(e);
      }
    };

    const isSearching = isExpanded || !!value;

    return (
      <div
        onClick={handleContainerClick}
        className={cn(
          "flex items-center px-3 py-2 bg-background dark:text-background dark:bg-foreground border border-base-border rounded-xl text-sm text-foreground cursor-pointer h-10 flex-1 md:flex-none transition-all duration-300",
          isSearching
            ? "md:w-64 md:gap-2"
            : "md:w-10 md:justify-center md:px-0 md:gap-0 gap-2",
          className,
        )}
      >
        <Search
          size={16}
          className={cn(
            "shrink-0",
            isSearching ? "mr-2 md:mr-2" : "mr-2 md:mr-0",
          )}
        />
        <input
          ref={setRefs}
          type="text"
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={(e) => {
            setIsExpanded(true);
            if (onFocus) onFocus(e);
          }}
          className={cn(
            "bg-transparent border-none outline-none w-full text-foreground placeholder:text-muted-foreground text-sm focus:ring-0 opacity-100 w-full md:transition-all md:duration-300",
            isSearching
              ? "md:opacity-100 md:w-full"
              : "md:opacity-0 md:w-0 md:pointer-events-none",
          )}
          {...props}
        />
        {shortcut && isSearching && (
          <span className="hidden md:inline-flex text-xs font-medium bg-sidebar-accent px-1.5 py-0.5 rounded border border-base-border flex-shrink-0 select-none">
            {shortcut}
          </span>
        )}
      </div>
    );
  },
);

SearchBar.displayName = "SearchBar";
