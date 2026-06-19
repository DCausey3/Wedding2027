import type { Metadata } from "next";
import { RSVPFlow } from "@/components/rsvp/RSVPFlow";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = { title: "RSVP" };

export default function RSVPPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6" style={{ backgroundColor: "#fdf8f0" }}>
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeader
            overline="Your Response"
            title="RSVP"
            subtitle="Deadline: September 1st, 2026. Enter your invitation code to begin."
          />
        </div>
        <RSVPFlow />
      </div>
    </div>
  );
}
