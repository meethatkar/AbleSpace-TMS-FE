"use client";
import React, { useRef, useEffect } from "react";
import { Columns3, ListFilter, Plus, SlidersHorizontal } from "lucide-react";
import { SearchBar } from "../ui/Searchbar";
import { Button } from "../ui/Button";

interface ViewHeaderProps {
  title: string;
  subtitle?: string;
  /** When provided, the title becomes editable. Fires with the new value (debounced upstream). */
  onTitleChange?: (newTitle: string) => void;
  searchQuery?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFieldsClick?: () => void;
  isFieldsOpen?: boolean;
  fieldsMenu?: React.ReactNode;
  onCloseFieldsMenu?: () => void;
  onFilterClick?: () => void;
  isFilterOpen?: boolean;
  filterMenu?: React.ReactNode;
  onCloseFilterMenu?: () => void;
  onAddClick?: () => void;
  onMenuClick?: () => void; // Callback for mobile menu logo button
  searchPlaceholder?: string;
  customActions?: React.ReactNode;
}

export const ViewHeader: React.FC<ViewHeaderProps> = ({
  title,
  subtitle,
  onTitleChange,
  searchQuery,
  onSearchChange,
  onFieldsClick,
  isFieldsOpen,
  fieldsMenu,
  onCloseFieldsMenu,
  onFilterClick,
  isFilterOpen,
  filterMenu,
  onCloseFilterMenu,
  onAddClick,
  onMenuClick,
  searchPlaceholder,
  customActions,
}) => {
  // Automatically determine singular label for the add action (e.g., Tasks -> Add Task)
  const singularTitle = title.endsWith("s") ? title.slice(0, -1) : title;
  const menuRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (isFieldsOpen && onCloseFieldsMenu) {
          onCloseFieldsMenu();
        }
      }
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node)
      ) {
        if (isFilterOpen && onCloseFilterMenu) {
          onCloseFilterMenu();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFieldsOpen, onCloseFieldsMenu, isFilterOpen, onCloseFilterMenu]);

  return (
    <div className="flex items-center justify-between py-5 w-full">
      {/* Dynamic Title and Subtitle */}
      <div className="flex flex-col gap-2">
        {onTitleChange ? (
          <h1
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTitleChange(e.currentTarget.textContent?.trim() ?? "")}
            className="text-xl leading-none font-semibold text-foreground capitalize outline-none focus:border-b focus:border-base-border cursor-text"
          >
            {title}
          </h1>
        ) : (
          <h1 className="text-xl leading-none font-semibold text-foreground capitalize">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2 flex-1 justify-end ml-4">
        {onSearchChange && (
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder={
              searchPlaceholder || `Search ${title.toLowerCase()}...`
            }
          />
        )}

        {/* Desktop view: show separate Fields and Filter buttons */}
        <div className="hidden md:flex items-center gap-2 relative">
          {onFieldsClick && (
            <div className="relative" ref={menuRef}>
              <Button variant="outline" onClick={onFieldsClick}>
                <Columns3 size={16} />
                Fields
              </Button>

              {/* Fields Menu Dropdown */}
              {isFieldsOpen && fieldsMenu && (
                <div className="absolute top-full mt-2 -left-25 z-50">
                  {fieldsMenu}
                </div>
              )}
            </div>
          )}

          {onFilterClick && (
            <div className="relative" ref={filterMenuRef}>
              <Button
                variant="outline"
                className="px-2.5"
                onClick={onFilterClick}
                aria-label="Filter"
              >
                <ListFilter size={16} />
              </Button>

              {/* Filter Menu Dropdown */}
              {isFilterOpen && filterMenu && (
                <div className="absolute top-full mt-2 -right-25 z-50">
                  {filterMenu}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile view: replace middle 2 buttons with a single menu logo button */}
        {(onFieldsClick || onFilterClick) && (
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
        )}

        {onAddClick && (
          <Button
            variant="primary"
            onClick={onAddClick}
            className="px-3 shrink-0"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add {singularTitle}</span>
          </Button>
        )}

        {customActions}
      </div>
    </div>
  );
};
