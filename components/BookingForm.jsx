"use client";
import { useState, useEffect } from "react";
import CalendarView from "./CalendarView";
import { BarLoader } from "react-spinners";
import { formatISO, subDays, addDays } from "date-fns";

export default function BookingForm({
  userInfo,
  onSubmit,
  isBookingConfirmed,
  isBookingLoading,
  chatEndRef,
}) {
  // Added prop
  const [service, setService] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [locationId] = useState("95e4f50f-1add-4a53-919e-7058bbfa198e");
  const [resourceId] = useState("0868c571-2c60-4249-842a-fe22bd5ab9c4");
  const [serviceId] = useState("d5fda44e-4e26-4790-9693-00a8b4d54a46");
  const [fetchedRange, setFetchedRange] = useState({ from: null, to: null });

  const availableDates = [
    ...new Set(availableSlots.map((slot) => slot.starts_at.split("T")[0])),
  ];

  useEffect(() => {
    if (!service) return;

    const fetchAvailability = async () => {
      // Use date-fns to calculate the date range
      const from = subDays(currentDate, 15); // 15 days back
      const to = addDays(currentDate, 15);   // 15 days forward

      // Format dates for Hapio API (Y-m-d\TH:i:sP)
      const hapioFrom = formatISO(from, { representation: "complete" });
      const hapioTo = formatISO(to, { representation: "complete" });

      // Check if the range is already fetched
      if (
        fetchedRange.from &&
        fetchedRange.to &&
        new Date(from) >= new Date(fetchedRange.from) &&
        new Date(to) <= new Date(fetchedRange.to)
      ) {
        console.log("Range already fetched, skipping API call");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `/api/meeting/availability?from=${hapioFrom}&to=${hapioTo}&locationId=${locationId}`
        );
        if (!res.ok) throw new Error("Failed to fetch availability");
        const slots = await res.json();
        console.log("Fetched slots:", slots);
        setAvailableSlots(slots);
        setFetchedRange({ from: hapioFrom, to: hapioTo });
      } catch (error) {
        console.error("Failed to fetch availability:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [service, locationId, currentDate]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!service || !selectedSlot || isBookingConfirmed) return; // Prevent submission if confirmed
    onSubmit(service, selectedSlot.starts_at, selectedSlot.ends_at, {
      locationId,
      resourceId,
      serviceId,
    });
  };

  const handleWeekChange = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const filteredSlots = selectedDate
    ? availableSlots.filter(
        (slot) =>
          slot.starts_at.split("T")[0] ===
          selectedDate.toISOString().split("T")[0]
      )
    : [];

  // console.log("Available dates passed to CalendarView:", availableDates);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs text-slate-400 mb-1">
          Service Type
        </label>
        <select
          value={service}
          onChange={(e) => {
            setService(e.target.value);
            setSelectedDate(null);
            setSelectedSlot(null);
          }}
          className="w-full p-2 bg-[rgba(30,30,50,0.9)] rounded border border-cyan-500/20 text-slate-300 cursor-pointer"
          required
          disabled={isBookingConfirmed} // Disable if confirmed
        >
          <option value="">Select service...</option>
          <option value="Chatbot Development">Chatbot Development</option>
          <option value="Voice Assistant">Voice Assistant</option>
          <option value="Custom AI Solution">Custom AI Solution</option>
        </select>
      </div>

      {loading && (
        <div className="flex justify-center py-4">
          <BarLoader color="#22d3ee" className="text-cyan-400" />
        </div>
      )}

      {availableSlots.length > 0 && (
        <CalendarView
          currentDate={currentDate}
          availableDates={availableDates}
          onDateChange={handleWeekChange}
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
          chatEndRef={chatEndRef}
         
        />
      )}

      {selectedDate && filteredSlots.length > 0 && (
        <div className="space-y-2">
          <label className="block text-xs text-slate-400 mb-1">
            Available Times for{" "}
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {filteredSlots.map((slot, index) => {
              const startTime = new Date(slot.starts_at).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );
              const endTime = new Date(slot.ends_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2 rounded text-sm cursor-pointer ${
                    selectedSlot?.starts_at === slot.starts_at
                      ? "bg-cyan-500 text-white"
                      : "bg-[rgba(30,30,50,0.9)] hover:bg-cyan-500/20"
                  }`}
                  disabled={isBookingConfirmed} // Disable slot buttons if confirmed
                >
                  {startTime} - {endTime}
                </button>
              );
            })}
          </div>
        </div>
      )}

<button
        type="submit"
        disabled={!selectedSlot || isBookingConfirmed || isBookingLoading}
        className="w-full px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
      >
        {isBookingLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : isBookingConfirmed ? (
          "Booking Confirmed"
        ) : selectedSlot ? (
          `Book ${new Date(selectedSlot.starts_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`
        ) : (
          "Select a time slot"
        )}
      </button>
    </form>
  );
}
