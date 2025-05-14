"use client";
import { useState, useEffect } from "react";
import CalendarView from "./CalendarView";
import { BarLoader } from "react-spinners";
import { formatISO, subDays, addDays } from "date-fns";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { CalendarPlus } from "lucide-react";

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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [otpStep, setOtpStep] = useState("idle");
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState(null);
  const [isSubmittingOtp, setIsSubmittingOtp] = useState(false);
  const [otpToken, setOtpToken] = useState(null); // <-- New state for the JWT
  const [isConfirming, setIsConfirming] = useState(false);

  const userEmail = userInfo?.email;

  const availableDates = [
    ...new Set(availableSlots.map((slot) => slot.starts_at.split("T")[0])),
  ];

  useEffect(() => {
    if (!service) return;

    const fetchAvailability = async () => {
      // Use date-fns to calculate the date range
      const from = subDays(currentDate, 15); // 15 days back
      const to = addDays(currentDate, 15); // 15 days forward

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
    if (!service || !selectedSlot || isBookingConfirmed) return;

    setIsConfirming(true); // Set confirming state
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

    onSubmit(service, selectedSlot.starts_at, selectedSlot.ends_at, {
      locationId,
      resourceId,
      serviceId,
    }).finally(() => {
      setIsConfirming(false); // Reset when done
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

  const handleRequestOtp = async () => {
    if (!userEmail) {
      setOtpError("Email address is required");
      return;
    }

    setOtpStep("requesting");
    setOtpError(null);
    setOtpToken(null); // Clear previous token
    setOtpValue(""); // Clear previous OTP input

    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      if (!data.token) {
        console.error("API Error: OTP send endpoint did not return a token.");
        throw new Error("Failed to initialize OTP session.");
      }

      setOtpToken(data.token);
      setOtpStep("awaiting_input");

    
    } catch (error) {
      console.error("OTP request failed:", error);
      setOtpError(error.message || "Failed to send OTP. Please try again.");
      setOtpStep("error");
    }
  };

  const handleVerifyOtp = async () => {
    if (!userEmail || !otpValue || !otpToken) {
      setOtpError("Missing OTP or session token.");
      return;
    }

    setOtpError(null);
    setIsSubmittingOtp(true);

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submittedOtp: otpValue,
          token: otpToken,
          email: userEmail, // Include email for additional verification
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.verified) {
        // If token expired or invalid, clear it so user has to request again
        if (res.status === 401) {
          setOtpToken(null);
        }
        throw new Error(data.message || "Invalid OTP or verification failed.");
      }

      // Success!
      setOtpStep("verified");
      setShowConfirmation(true);
      setOtpError(null);

      if (chatEndRef?.current) {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      setOtpError(error.message || "Verification failed. Please try again.");
      setOtpStep("awaiting_input"); // Return to input state to allow retry
    } finally {
      setIsSubmittingOtp(false);
    }
  };

  const filteredSlots = selectedDate
    ? availableSlots.filter(
        (slot) =>
          slot.starts_at.split("T")[0] ===
          selectedDate.toISOString().split("T")[0]
      )
    : [];

    useEffect(() => {
      // Scroll if showing final confirmation OR if the OTP input step becomes active
      if ((showConfirmation || otpStep === 'awaiting_input') && chatEndRef?.current) {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
     
    }, [showConfirmation, otpStep, chatEndRef]);

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

      {/* --- OTP Input Section --- */}
      {otpStep === "awaiting_input" && (
        <div className="space-y-2 p-3 bg-cyan-900/20 rounded border border-cyan-500/30">
          <label
            htmlFor="otpInput"
            className="block text-xs text-cyan-300 mb-1"
          >
            Enter OTP sent to {userEmail}
          </label>
          <input
            id="otpInput"
            type="text"
            value={otpValue}
            onChange={(e) => setOtpValue(e.target.value)}
            className="w-full p-2 bg-[rgba(30,30,50,0.9)] rounded border border-cyan-500/20 text-slate-300"
            maxLength={6} // Assuming 6-digit OTP
            required
            disabled={isSubmittingOtp || isBookingLoading || isBookingConfirmed}
            placeholder="Enter code"
          />
          {otpError && <p className="text-xs text-red-400 mt-1">{otpError}</p>}
          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={
              !otpValue ||
              isSubmittingOtp ||
              isBookingLoading ||
              isBookingConfirmed
            }
            className="w-full mt-2 px-4 py-2 bg-cyan-500/30 hover:bg-cyan-500/40 text-cyan-200 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmittingOtp ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Verify OTP"
            )}
          </button>
          {/* Optional: Add a Resend OTP button here */}
          <button
            type="button"
            onClick={handleRequestOtp} // Re-trigger the send OTP flow
            disabled={
              otpStep === "requesting" ||
              isSubmittingOtp ||
              isBookingLoading ||
              isBookingConfirmed
            }
            className="w-full mt-1 px-4 py-1 bg-slate-500/20 hover:bg-slate-500/30 text-slate-300 rounded text-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            Resend Code
          </button>
        </div>
      )}

      {/* --- Refactored Booking Button Logic --- */}
      <div className="mt-4"> {/* Add margin-top for spacing */}
        {isBookingConfirmed ? (
          // State: Booking is fully confirmed by parent
          <button
            type="button"
            disabled
            className="w-full px-4 py-2 bg-green-500/20 text-green-300 rounded flex items-center justify-center gap-2 cursor-default"
          >
            <CheckCircle className="h-4 w-4" /> Booking Confirmed
          </button>
        ) : isBookingLoading ? (
          // State: Parent component is processing the booking submission
          <button
            type="button"
            disabled
            className="w-full px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded flex items-center justify-center gap-2"
          >
            <Loader2 className="h-4 w-4 animate-spin" /> Processing...
          </button>
        ) : otpStep === 'requesting' || isSubmittingOtp ? (
           // State: OTP is being requested or verified via API
          <button
            type="button"
            disabled
            className="w-full px-4 py-2 bg-slate-500/20 text-slate-400 rounded flex items-center justify-center gap-2 cursor-wait"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            {otpStep === 'requesting' ? 'Sending OTP...' : 'Verifying...'}
          </button>
        ) : otpStep === 'verified' && showConfirmation ? (
          // State: OTP verified, show final confirmation prompt
          <div className="space-y-2">
            {/* Confirmation Button */}
            <button
              type="submit" // Triggers handleSubmit
              disabled={isConfirming} // Disable only during final submission
              className="w-full px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isConfirming ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Booking...
                </>
              ) : (
                <>
                  <CalendarPlus className="h-4 w-4" />
                  Confirm for{" "}
                  {new Date(selectedSlot.starts_at).toLocaleDateString([], { month: "short", day: "numeric" })},{" "}
                  {new Date(selectedSlot.starts_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </>
              )}
            </button>
            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => {
                setShowConfirmation(false);
                setOtpStep("idle"); // Reset OTP flow
                // Optionally reset slot selection too?
                // setSelectedSlot(null);
                // setSelectedDate(null);
                setOtpValue("");
                setOtpError(null);
                setOtpToken(null);
              }}
              disabled={isConfirming} // Disable during final submission
              className="w-full px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : otpStep === 'error' ? (
           // State: An error occurred during OTP request or verification
          <div className="space-y-2">
            <p className="text-xs text-red-400 text-center">
              {otpError || "An error occurred."}
            </p>
            <button
              type="button"
              onClick={handleRequestOtp} // Allow retry OTP send on error
              className="w-full px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Retry Sending OTP
            </button>
          </div>
        ) : !selectedSlot ? (
           // State: No time slot selected yet
            <button
              type="button"
              disabled
              className="w-full px-4 py-2 bg-slate-500/20 text-slate-400 rounded flex items-center justify-center gap-2 cursor-not-allowed"
            >
             Select a time slot
           </button>
        ): (
          // Default State: Slot selected, ready to start OTP process
          <button
            type="button"
            onClick={handleRequestOtp} // Trigger OTP send
            // Disable if booking confirmed or OTP request/verification is already happening
            disabled={otpStep === 'awaiting_input' || isSubmittingOtp || isBookingConfirmed }
            className={`w-full px-4 py-2 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer 
              bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 
              disabled:opacity-50 disabled:cursor-not-allowed`} // Explicit disabled styles
          >
            {/* Directly show 'Book' text, use optional chaining for safety */}
            Book {selectedSlot ? new Date(selectedSlot?.starts_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }) : 'Time'} {/* Fallback text added */}
          </button>
        )}
      </div> {/* End Button Logic Wrapper */}
    </form>
  );
}
