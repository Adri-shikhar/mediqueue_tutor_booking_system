export const getTutors = async () => {
  const response = await fetch('http://localhost:8000/tutors')
  if (!response.ok) {
    throw new Error('Failed to fetch tutors')
  }
  const data = await response.json()
  console.log("Tutors fetched successfully", data)
  return data
}

export const getTutorById = async (id) => {
  const response = await fetch(`http://localhost:8000/tutors/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch tutor')
  }
  const data = await response.json()
  console.log("Tutor fetched successfully", data)
  return data
}

export const createTutor = async (tutor) => {
  const response = await fetch("http://localhost:8000/tutors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tutor),
  })
  if (!response.ok) {
    throw new Error("Failed to create tutor")
  }
  return response.json()
}

export const createBooking = async (booking) => {
  const response = await fetch("http://localhost:8000/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  })
  if (!response.ok) {
    throw new Error("Failed to create booking")
  }
  return response.json()
}

export const getBookingsByUserId = async (userId) => {
  const response = await fetch(
    `http://localhost:8000/bookings?user_id=${encodeURIComponent(userId)}`
  )
  if (!response.ok) {
    throw new Error("Failed to fetch bookings")
  }
  return response.json()
}

export const getTutorsByCreatorId = async (userId) => {
  const response = await fetch(
    `http://localhost:8000/tutors?createdBy_id=${encodeURIComponent(userId)}`
  )
  if (!response.ok) {
    throw new Error("Failed to fetch your tutors")
  }
  return response.json()
}