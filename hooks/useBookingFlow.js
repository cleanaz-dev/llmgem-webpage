// hooks/useBookingFlow.js
import { useState, useEffect } from 'react';

export function useBookingFlow() {
  const [bookingState, setBookingState] = useState({
    status: 'idle', // 'selecting' | 'scheduled'
    serviceType: null,
    calendlyUrl: null
  });

  // Initialize Calendly widget once
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const startBooking = (serviceType) => {
    const urls = {
      chatbot: 'https://calendly.com/your/chatbot',
      voice: 'https://calendly.com/your/voice'
    };
    
    setBookingState({
      status: 'scheduled',
      serviceType,
      calendlyUrl: urls[serviceType]
    });
  };

  return { bookingState, startBooking };
}