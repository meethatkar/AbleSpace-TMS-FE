"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "./ui/Button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "pr-4  py-3 w-fit bg-background rounded-md border border-base-input relative shadow-md",
        className,
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-foreground",
        nav: "space-x-1 flex items-center",
        button_previous:
          "absolute left-3 top-3 h-7 w-7 bg-transparent text-foreground p-0 flex items-center justify-center rounded-md cursor-pointer",
        button_next:
          "absolute right-3 top-3 h-7 w-7 bg-transparent text-foreground p-0 flex items-center justify-center rounded-md cursor-pointer",
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-1",
        day: "group h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day_button:
          "h-9 w-9 p-0 font-normal text-foreground hover:bg-sidebar-accent rounded-full flex items-center justify-center cursor-pointer transition-colors group-[.is-selected]:bg-primary group-[.is-selected]:text-background group-[.is-selected]:hover:bg-primary group-[.is-selected]:hover:text-background group-[.is-today]:bg-sidebar-accent group-[.is-today]:text-foreground",
        selected: "is-selected",
        today: "is-today",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          if (orientation === "left")
            return <ChevronLeft className="h-4 w-4" />;
          if (orientation === "right")
            return <ChevronRight className="h-4 w-4" />;
          return <ChevronRight className="h-4 w-4" />;
        },
      }}
      {...props}
    />
  );
}
