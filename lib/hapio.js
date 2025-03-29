//lib/hapio.js


export async function getAvailability(from, to, locationId) {
  try {
    const url = new URL(
      `https://eu-central-1.hapio.net/v1/services/d5fda44e-4e26-4790-9693-00a8b4d54a46/bookable-slots/`
    );
    
    // Just pass the dates directly without any formatting
    url.searchParams.append('from', from);
    url.searchParams.append('to', to);
    url.searchParams.append('location', locationId);



    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.HAPIO_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Hapio error: ${response.status} - ${errorBody}`);
    }

    return (await response.json()).data;
  } catch (error) {
    console.error('Hapio API Error:', error);
    throw error;
  }
}

// lib/hapio.js
export async function createBooking(data) {
  const bookingData = {
    service_id: data.service_id,
    location_id: data.location_id,
    resource_id: data.resource_id,
    starts_at: data.start_time,
    ends_at: data.end_time,
    metadata: {
      email: data.email,
      name: data.name,
      service: data.service,
    },
  };
  console.log("Booking data sent to Hapio:", bookingData);

  const response = await fetch(
    `https://eu-central-1.hapio.net/v1/bookings/`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HAPIO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    }
  );

  const bookingResponse = await response.json();
  console.log("Hapio Booking response data:", bookingResponse);

  if (!response.ok) {
    throw new Error(`Hapio API error! Status: ${response.status}, Message: ${bookingResponse.message || 'Unknown error'}`);
  }

  return bookingResponse;
}