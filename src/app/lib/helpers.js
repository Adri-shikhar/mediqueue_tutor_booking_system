// Small helper functions used in many pages

/** Turn MongoDB id into a plain string */
export function toId(id) {
  if (!id) return "";
  if (typeof id === "string") return id;
  if (id.$oid) return id.$oid;
  return String(id);
}

/** Show date like "May 19, 2026" */
export function formatDate(dateStr) {
  if (!dateStr) return "—";
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
