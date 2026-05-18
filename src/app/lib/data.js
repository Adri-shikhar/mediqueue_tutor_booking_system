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