const SITE = "MediQueue";

export function getPageTitle(pathname) {
  const path = decodeURIComponent(pathname || "/");

  if (path === "/") return `${SITE} | Home`;
  if (path === "/Tutors") return `${SITE} | Tutors`;
  if (path.startsWith("/Tutors/")) return `${SITE} | Tutor Details`;
  if (path === "/Add_Tutor") return `${SITE} | Add Tutor`;
  if (path === "/My_Tutors") return `${SITE} | My Tutors`;
  if (path === "/My_Booked_Sessions") return `${SITE} | My Booked Sessions`;
  if (path === "/login") return `${SITE} | Login`;
  if (path === "/register") return `${SITE} | Register`;
  if (path === "/profile") return `${SITE} | Profile`;

  return `${SITE} | Page Not Found`;
}
