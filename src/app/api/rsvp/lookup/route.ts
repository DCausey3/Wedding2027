import { NextRequest, NextResponse } from "next/server";
import { getGuestByInvitationCode } from "@/lib/data-client";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "code is required" }, { status: 400 });
  }

  try {
    const guest = await getGuestByInvitationCode(code);
    if (!guest) {
      return NextResponse.json({ error: "Invitation code not found" }, { status: 404 });
    }
    // Strip sensitive fields before returning
    const { invitationCode: _, ...safeGuest } = guest as any;
    return NextResponse.json({ guest: { ...safeGuest, invitationCode: code } });
  } catch (err: any) {
    console.error("RSVP lookup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
