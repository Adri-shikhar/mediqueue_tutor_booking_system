// ============================================
// SLOT LOGIC (frontend only — easy to read)
// totalSlot = how many bookings are still allowed
// ============================================

// Get slot number from tutor object OR from a number
export function getSlots(tutorOrCount) {
  let count = 0;

  if (typeof tutorOrCount === "object" && tutorOrCount !== null) {
    count = Number(tutorOrCount.totalSlot);
  } else {
    count = Number(tutorOrCount);
  }

  if (isNaN(count)) return 0;
  if (count < 0) return 0;
  return count;
}

// Can user book? true if slots > 0
export function canBook(tutorOrCount) {
  const slots = getSlots(tutorOrCount);
  if (slots > 0) return true;
  return false;
}

// Is tutor full? true if slots === 0
export function isFullyBooked(tutorOrCount) {
  const slots = getSlots(tutorOrCount);
  if (slots === 0) return true;
  return false;
}
