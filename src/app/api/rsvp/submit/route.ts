import { NextRequest, NextResponse } from "next/server";
import { upsertRSVP } from "@/lib/data-client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      guestId,
      attendance,
      plusOneName,
      plusOneLastName,
      primaryEntree,
      plusOneEntree,
      dietary,
      flightBooked,
      hotelBooked,
      shuttleNeeded,
      notes,
    } = body;

    if (!guestId || !attendance) {
      return NextResponse.json({ error: "guestId and attendance are required" }, { status: 400 });
    }

    const rsvp = await upsertRSVP({
      guestId,
      colombiaAttending: attendance === "COLOMBIA" || attendance === "BOTH",
      usaAttending: attendance === "USA" || attendance === "BOTH",
      plusOne: plusOneName ? { firstName: plusOneName, lastName: plusOneLastName ?? "" } : undefined,
      primaryEntree: primaryEntree ?? "HERB_ROASTED_CHICKEN",
      plusOneEntree: plusOneEntree || undefined,
      dietaryRestrictions: dietary || undefined,
      flightBooked: !!flightBooked,
      hotelBooked: !!hotelBooked,
      shuttleNeeded: !!shuttleNeeded,
      notes: notes || undefined,
    });

    return NextResponse.json({ success: true, rsvpId: rsvp.id });
  } catch (err: any) {
    console.error("RSVP submit error:", err);
    return NextResponse.json({ error: err.message ?? "Server error" }, { status: 500 });
  }
}
