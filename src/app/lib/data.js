// All API calls go to the Express server on port 8000
const API_URL = "http://localhost:8000";

export const getTutors = async () => {
  const response = await fetch(`${API_URL}/tutors`);
  if (!response.ok) {
    throw new Error("Failed to fetch tutors");
  }
  return response.json();
};

export const getTutorById = async (id) => {
  const response = await fetch(`${API_URL}/tutors/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch tutor");
  }
  return response.json();
};

export const createTutor = async (tutor) => {
  const response = await fetch(`${API_URL}/tutors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tutor),
  });
  if (!response.ok) {
    throw new Error("Failed to create tutor");
  }
  return response.json();
};

export const updateTutor = async (id, tutor) => {
  const response = await fetch(`${API_URL}/tutors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tutor),
  });
  if (!response.ok) {
    throw new Error("Failed to update tutor");
  }
  return response.json();
};

export const deleteTutor = async (id) => {
  const response = await fetch(`${API_URL}/tutors/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete tutor");
  }
  const text = await response.text();
  if (!text) {
    return { ok: true };
  }
  return JSON.parse(text);
};

export const createBooking = async (booking) => {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (!response.ok) {
    throw new Error("Failed to create booking");
  }
  return response.json();
};

export const getBookingsByUserId = async (userId) => {
  const response = await fetch(
    `${API_URL}/bookings?user_id=${encodeURIComponent(userId)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }
  return response.json();
};

export const updateBooking = async (id, booking) => {
  const response = await fetch(`${API_URL}/bookings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (!response.ok) {
    throw new Error("Failed to update booking");
  }
  return response.json();
};

export const deleteBooking = async (id) => {
  const response = await fetch(`${API_URL}/bookings/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete booking");
  }
  // Server may send JSON or an empty body — both are OK
  const text = await response.text();
  if (!text) {
    return { ok: true };
  }
  return JSON.parse(text);
};

export const getTutorsByCreatorId = async (userId) => {
  const response = await fetch(
    `${API_URL}/tutors?createdBy_id=${encodeURIComponent(userId)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch your tutors");
  }
  return response.json();
};
