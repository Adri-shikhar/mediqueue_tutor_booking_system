import { getApiUrl } from "./api-url";

function apiUrl() {
  return getApiUrl();
}

function buildHeaders(token, extra = {}) {
  const headers = { ...extra };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

// GET all tutors (optional search + registration date filter) — public
export async function getTutors({ name, registrationStart, registrationEnd } = {}) {
  const params = new URLSearchParams();

  if (name?.trim()) params.set("name", name.trim());
  if (registrationStart) params.set("registrationStart", registrationStart);
  if (registrationEnd) params.set("registrationEnd", registrationEnd);

  const query = params.toString();
  const url = query ? `${apiUrl()}/tutors?${query}` : `${apiUrl()}/tutors`;

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch tutors");
  return response.json();
}

// GET tutors with limit (home page uses limit=6) — public
export async function getTutorsWithLimit(limit) {
  const response = await fetch(`${apiUrl()}/tutors?limit=${limit}`);
  if (!response.ok) throw new Error("Failed to fetch tutors");
  return response.json();
}

// GET one tutor by id — public
export async function getTutorById(id) {
  const response = await fetch(`${apiUrl()}/tutors/${id}`);
  if (!response.ok) throw new Error("Failed to fetch tutor");
  return response.json();
}

// POST new tutor — JWT required
export async function createTutor(tutor, token) {
  const response = await fetch(`${apiUrl()}/tutors`, {
    method: "POST",
    headers: buildHeaders(token, { "Content-Type": "application/json" }),
    body: JSON.stringify(tutor),
  });
  if (!response.ok) throw new Error("Failed to create tutor");
  return response.json();
}

// PUT update tutor — JWT required
export async function updateTutor(id, tutor, token) {
  const response = await fetch(`${apiUrl()}/tutors/${id}`, {
    method: "PUT",
    headers: buildHeaders(token, { "Content-Type": "application/json" }),
    body: JSON.stringify(tutor),
  });
  if (!response.ok) throw new Error("Failed to update tutor");
  return response.json();
}

// DELETE tutor — JWT required
export async function deleteTutor(id, token) {
  const response = await fetch(`${apiUrl()}/tutors/${id}`, {
    method: "DELETE",
    headers: buildHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to delete tutor");
  const text = await response.text();
  if (!text) return { ok: true };
  return JSON.parse(text);
}

// GET tutors made by one user — public list (filter by creator id)
export async function getTutorsByCreatorId(userId) {
  const url = `${apiUrl()}/tutors?createdBy_id=${encodeURIComponent(userId)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch your tutors");
  return response.json();
}

// POST new booking — JWT required
export async function createBooking(booking, token) {
  let response;
  try {
    response = await fetch(`${apiUrl()}/bookings`, {
      method: "POST",
      headers: buildHeaders(token, { "Content-Type": "application/json" }),
      body: JSON.stringify(booking),
    });
  } catch {
    throw new Error(
      "Cannot reach API server. Check NEXT_PUBLIC_BASE_URL on Vercel and CORS on your API host."
    );
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    if (response.status === 401) {
      throw new Error(err.message || "Unauthorized — log in again.");
    }
    throw new Error(err.message || "Failed to create booking");
  }
  return response.json();
}

// GET bookings for one user — JWT required
export async function getBookingsByUserId(userId, token) {
  const url = `${apiUrl()}/bookings?user_id=${encodeURIComponent(userId)}`;
  const response = await fetch(url, {
    headers: buildHeaders(token),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Failed to fetch bookings");
  return response.json();
}

// PUT update booking — JWT required
export async function updateBooking(id, booking, token) {
  const response = await fetch(`${apiUrl()}/bookings/${id}`, {
    method: "PUT",
    headers: buildHeaders(token, { "Content-Type": "application/json" }),
    body: JSON.stringify(booking),
  });
  if (!response.ok) throw new Error("Failed to update booking");
  return response.json();
}
