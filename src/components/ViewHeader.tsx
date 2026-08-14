"use client";
import React from "react";
import { Columns3, ListFilter, Plus, SlidersHorizontal } from "lucide-react";
import { SearchBar } from "./ui/Searchbar";
import { Button } from "./ui/Button";

interface ViewHeaderProps {
  title: string;
  searchQuery?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFieldsClick?: () => void;
  onFilterClick?: () => void;
  onAddClick?: () => void;
  onMenuClick?: () => void; // Callback for mobile menu logo button
  searchPlaceholder?: string;
}

export const ViewHeader: React.FC<ViewHeaderProps> = ({
  title,
  searchQuery,
  onSearchChange,
  onFieldsClick,
  onFilterClick,
  onAddClick,
  onMenuClick,
  searchPlaceholder,
}) => {
  // Automatically determine singular label for the add action (e.g., Tasks -> Add Task)
  const singularTitle = title.endsWith("s") ? title.slice(0, -1) : title;

  return (
    <div className="flex items-center justify-between py-4 w-full">
      {/* Dynamic Title */}
      <h1 className="text-base leading-none font-semibold text-foreground capitalize">
        {title}
      </h1>

      {/* Action Controls */}
      <div className="flex items-center gap-2 flex-1 justify-end ml-4">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder={searchPlaceholder || `Search ${title.toLowerCase()}...`}
        />

        {/* Desktop view: show separate Fields and Filter buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" onClick={onFieldsClick}>
            <Columns3 size={16} />
            Fields
          </Button>

          <Button
            variant="outline"
            className="px-2.5"
            onClick={onFilterClick}
            aria-label="Filter"
          >
            <ListFilter size={16} />
          </Button>
        </div>

        {/* Mobile view: replace middle 2 buttons with a single menu logo button */}
        <div className="flex md:hidden">
          <Button
            variant="outline"
            className="px-2.5"
            onClick={onMenuClick || onFilterClick}
            aria-label="Menu"
          >
            <SlidersHorizontal size={16} />
          </Button>
        </div>

        <Button variant="primary" onClick={onAddClick} className="px-3 shrink-0">
          <Plus size={16} />
          <span className="hidden sm:inline">Add {singularTitle}</span>
        </Button>
      </div>
    </div>
  );
};
