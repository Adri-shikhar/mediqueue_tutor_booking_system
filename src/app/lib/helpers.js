// Simple helper functions used in many pages

// MongoDB id can be an object — this turns it into a normal string
export function toId(id) {
  if (!id) return "";
  if (typeof id === "string") return id;
  if (id.$oid) return id.$oid;
  return String(id);
}

// Short date: May 19, 2026
export function formatDate(dateStr) {
  if (!dateStr) return "—";
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Long date for tables: Sunday, May 31, 2026
export function formatLongDate(dateStr) {
  if (!dateStr) return "—";
  let date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    date = new Date(dateStr + "T00:00:00");
  }
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
