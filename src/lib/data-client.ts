/**
 * Amplify Data client helpers — server-side and client-side.
 * Uses @aws-amplify/adapter-nextjs for SSR-compatible access.
 */
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/data";
import { generateClient } from "aws-amplify/data";
import { cookies } from "next/headers";
import type { Schema } from "../../amplify/data/resource";
import outputs from "../../amplify_outputs.json";

// ─── Server Client (use in Server Components / Route Handlers) ────────────────
export async function getServerClient() {
  return generateServerClientUsingCookies<Schema>({
    config: outputs,
    cookies,
  });
}

// ─── Browser Client (use in Client Components with "use client") ──────────────
export const browserClient = generateClient<Schema>();

// ─── Guest Queries ─────────────────────────────────────────────────────────────

export async function getGuestByInvitationCode(code: string) {
  const client = await getServerClient();
  const { data, errors } = await client.models.Guest.list({
    filter: { invitationCode: { eq: code.trim().toUpperCase() } },
  });
  if (errors?.length) throw new Error(errors[0].message);
  return data[0] ?? null;
}

export async function getAllGuests() {
  const client = await getServerClient();
  const { data, errors } = await client.models.Guest.list({
    selectionSet: [
      "id", "firstName", "lastName", "email", "guestType",
      "plusOneAllowed", "invitationCode", "tableNumber", "side", "notes",
      "rsvp.*", "rsvp.plusOnes.*", "rsvp.mealPreferences.*", "travelInfo.*",
    ],
  });
  if (errors?.length) throw new Error(errors[0].message);
  return data;
}

export async function upsertRSVP(payload: {
  guestId: string;
  colombiaAttending: boolean;
  usaAttending: boolean;
  plusOne?: { firstName: string; lastName: string };
  primaryEntree: string;
  plusOneEntree?: string;
  dietaryRestrictions?: string;
  flightBooked: boolean;
  hotelBooked: boolean;
  shuttleNeeded: boolean;
  notes?: string;
}) {
  const client = await getServerClient();

  const status =
    payload.colombiaAttending || payload.usaAttending ? "ACCEPTED" : "DECLINED";

  const { data: rsvp, errors } = await client.models.RSVP.create({
    guestId: payload.guestId,
    status,
    colombiaAttending: payload.colombiaAttending,
    usaAttending: payload.usaAttending,
    submittedAt: new Date().toISOString(),
  });

  if (errors?.length) throw new Error(errors[0].message);
  if (!rsvp) throw new Error("Failed to create RSVP");

  // Meal preference — primary guest
  await client.models.MealPreference.create({
    rsvpId: rsvp.id,
    entree: payload.primaryEntree as any,
    dietaryRestrictions: payload.dietaryRestrictions,
    eventType: payload.colombiaAttending ? "COLOMBIA" : "USA",
  });

  // Plus one
  if (payload.plusOne?.firstName) {
    const { data: plusOne } = await client.models.PlusOne.create({
      rsvpId: rsvp.id,
      firstName: payload.plusOne.firstName,
      lastName: payload.plusOne.lastName,
    });
    if (plusOne && payload.plusOneEntree) {
      await client.models.MealPreference.create({
        plusOneId: plusOne.id,
        entree: payload.plusOneEntree as any,
        eventType: payload.colombiaAttending ? "COLOMBIA" : "USA",
      });
    }
  }

  // Travel info
  await client.models.TravelInfo.create({
    guestId: payload.guestId,
    flightBooked: payload.flightBooked,
    hotelBooked: payload.hotelBooked,
    shuttleNeeded: payload.shuttleNeeded,
    notes: payload.notes,
  });

  return rsvp;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const guests = await getAllGuests();

  const stats = {
    totalInvited: guests.length,
    accepted: 0,
    declined: 0,
    pending: 0,
    colombiaCount: 0,
    usaCount: 0,
    bothCount: 0,
    plusOneCount: 0,
    flightsBooked: 0,
    hotelsBooked: 0,
    shuttlesNeeded: 0,
    mealBreakdown: {
      FILET_MIGNON: 0,
      PAN_SEARED_SALMON: 0,
      MUSHROOM_RISOTTO: 0,
      HERB_ROASTED_CHICKEN: 0,
    } as Record<string, number>,
  };

  for (const guest of guests) {
    const rsvp = (guest as any).rsvp;
    if (!rsvp) { stats.pending++; continue; }

    if (rsvp.status === "ACCEPTED") stats.accepted++;
    else if (rsvp.status === "DECLINED") stats.declined++;
    else stats.pending++;

    if (rsvp.colombiaAttending && rsvp.usaAttending) stats.bothCount++;
    else if (rsvp.colombiaAttending) stats.colombiaCount++;
    else if (rsvp.usaAttending) stats.usaCount++;

    stats.plusOneCount += (rsvp.plusOnes?.length ?? 0);

    const travel = (guest as any).travelInfo;
    if (travel?.flightBooked) stats.flightsBooked++;
    if (travel?.hotelBooked) stats.hotelsBooked++;
    if (travel?.shuttleNeeded) stats.shuttlesNeeded++;

    for (const meal of rsvp.mealPreferences ?? []) {
      if (meal.entree) stats.mealBreakdown[meal.entree] = (stats.mealBreakdown[meal.entree] ?? 0) + 1;
    }
  }

  return stats;
}
