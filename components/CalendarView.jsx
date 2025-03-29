"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function CalendarView({
  currentDate,
  onDateChange,
  onDateSelect,
  selectedDate,
  availableDates,
  chatEndRef,
}) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [isLoading] = useState(false);
  const [error] = useState(null);

  // Calculate start of week (Sunday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    return date;
  });

  // Add this effect to scroll when selectedDate changes
  useEffect(() => {
    if (selectedDate && chatEndRef?.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedDate, chatEndRef]);

  // Helper function to normalize date comparison
  const normalizeDateString = (date) => {
    return date.toISOString().split("T")[0];
  };

  if (error) {
    return (
      <div className="text-center py-4 text-red-400">
        {error} -{" "}
        <button
          onClick={() => window.location.reload()}
          className="text-cyan-300"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-4 text-slate-400">
        Loading availability...
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onDateChange(-7)}
          className="p-0.5 text-cyan-300 hover:text-cyan-400 rounded-full hover:bg-cyan-500/10 cursor-pointer"
          disabled={isLoading}
        >
          <ChevronLeft size={18} />
        </button>

        <span className="text-sm font-medium text-slate-300">
          {currentDate.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </span>

        <button
          type="button"
          onClick={() => onDateChange(7)}
          className="p-1 text-cyan-300 hover:text-cyan-400 rounded-full hover:bg-cyan-500/10 cursor-pointer"
          disabled={isLoading}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div key={day} className="text-center text-xs text-slate-400 pb-1">
            {day.substring(0, 2)}
          </div>
        ))}

        {weekDays.map((date, i) => {
          const dateString = normalizeDateString(date);
          const isAvailable = availableDates.some((availDate) =>
            availDate.startsWith(dateString)
          );
          const isSelected =
            selectedDate && normalizeDateString(selectedDate) === dateString;

          return (
            <button
              key={i}
              type="button"
              disabled={!isAvailable || isLoading}
              onClick={() => isAvailable && onDateSelect(date)}
              className={`h-8 rounded-full text-sm flex items-center justify-center transition-colors cursor-pointer
                ${isSelected ? "bg-cyan-500 text-white" : ""}
                ${
                  isAvailable
                    ? "text-cyan-300 hover:bg-cyan-500/10"
                    : "text-slate-500 cursor-default"
                }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
