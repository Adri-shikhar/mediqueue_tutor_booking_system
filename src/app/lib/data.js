// All API calls go to Express server on port 8000
const API_URL = "http://localhost:8000";

// GET all tutors
export async function getTutors() {
  const response = await fetch(`${API_URL}/tutors`);
  if (!response.ok) throw new Error("Failed to fetch tutors");
  return response.json();
}

// GET tutors with limit (home page uses limit=6)
export async function getTutorsWithLimit(limit) {
  const response = await fetch(`${API_URL}/tutors?limit=${limit}`);
  if (!response.ok) throw new Error("Failed to fetch tutors");
  return response.json();
}

// GET one tutor by id
export async function getTutorById(id) {
  const response = await fetch(`${API_URL}/tutors/${id}`);
  if (!response.ok) throw new Error("Failed to fetch tutor");
  return response.json();
}

// POST new tutor
export async function createTutor(tutor) {
  const response = await fetch(`${API_URL}/tutors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tutor),
  });
  if (!response.ok) throw new Error("Failed to create tutor");
  return response.json();
}

// PUT update tutor
export async function updateTutor(id, tutor) {
  const response = await fetch(`${API_URL}/tutors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tutor),
  });
  if (!response.ok) throw new Error("Failed to update tutor");
  return response.json();
}

// DELETE tutor
export async function deleteTutor(id) {
  const response = await fetch(`${API_URL}/tutors/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete tutor");
  const text = await response.text();
  if (!text) return { ok: true };
  return JSON.parse(text);
}

// GET tutors made by one user
export async function getTutorsByCreatorId(userId) {
  const url = `${API_URL}/tutors?createdBy_id=${encodeURIComponent(userId)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch your tutors");
  return response.json();
}

// POST new booking (server also decreases tutor slot)
export async function createBooking(booking) {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create booking");
  }
  return response.json();
}

// GET bookings for one user
export async function getBookingsByUserId(userId) {
  const url = `${API_URL}/bookings?user_id=${encodeURIComponent(userId)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch bookings");
  return response.json();
}

// PUT update booking (e.g. cancel)
export async function updateBooking(id, booking) {
  const response = await fetch(`${API_URL}/bookings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (!response.ok) throw new Error("Failed to update booking");
  return response.json();
}
