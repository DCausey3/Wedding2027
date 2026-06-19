import type { Guest } from "@/types";

function escapeCell(value: string | number | boolean | null | undefined): string {
  const str = value == null ? "" : String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function guestsToCSV(guests: Guest[]): string {
  const headers = [
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Invitation Code",
    "Guest Type",
    "RSVP Status",
    "Colombia Attending",
    "USA Attending",
    "Plus One Name",
    "Primary Meal",
    "Dietary Restrictions",
    "Flight Booked",
    "Hotel Booked",
    "Shuttle Needed",
    "Table Number",
    "Side",
    "Notes",
  ];

  const rows = guests.map((g) => {
    const rsvp = g.rsvp;
    const plusOne = rsvp?.plusOnes?.[0];
    const meal = rsvp?.mealPreferences?.[0];
    const travel = g.travelInfo;

    return [
      g.firstName,
      g.lastName,
      g.email ?? "",
      g.phone ?? "",
      g.invitationCode,
      g.guestType,
      rsvp?.status ?? "PENDING",
      rsvp?.colombiaAttending ? "Yes" : "No",
      rsvp?.usaAttending ? "Yes" : "No",
      plusOne ? `${plusOne.firstName} ${plusOne.lastName}` : "",
      meal?.entree?.replace(/_/g, " ") ?? "",
      meal?.dietaryRestrictions ?? "",
      travel?.flightBooked ? "Yes" : "No",
      travel?.hotelBooked ? "Yes" : "No",
      travel?.shuttleNeeded ? "Yes" : "No",
      g.tableNumber ?? "",
      g.side ?? "",
      g.notes ?? "",
    ].map(escapeCell);
  });

  return [headers.map(escapeCell), ...rows].map((r) => r.join(",")).join("\n");
}

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
