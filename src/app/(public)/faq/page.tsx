import type { Metadata } from "next";
import { FAQAccordion } from "@/components/wedding/FAQAccordion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "next/link";

export const metadata: Metadata = { title: "FAQ" };

const FAQS = [
  {
    category: "General",
    items: [
      { q: "Can I attend both weddings?", a: "Absolutely! We would love to celebrate with you twice. Some guests are invited to choose one or both — check your invitation for details." },
      { q: "What is the RSVP deadline?", a: "Please RSVP by September 1st, 2026. This helps us finalize guest counts, meals, and travel logistics for both celebrations." },
      { q: "Will there be transportation between venues?", a: "Yes — we have arranged shuttle service from select hotels at both locations. Please indicate shuttle needs on your RSVP form." },
    ],
  },
  {
    category: "Colombia Wedding",
    items: [
      { q: "Do I need a visa to enter Colombia?", a: "US, Canadian, EU, and UK citizens do not require a visa for stays under 90 days. Check with your country's embassy for specific requirements." },
      { q: "Is a passport required?", a: "Yes — a valid passport is required for all international travelers to Colombia. Ensure yours is valid for at least 6 months beyond your travel dates." },
      { q: "What is the dress code for Colombia?", a: "Tropical formal / Festive attire. The ceremony is outdoors in a tropical garden. Bridesmaids will wear Coral; groomsmen will wear Sand." },
      { q: "What currency should I bring?", a: "The Colombian Peso (COP) is the local currency. Credit cards are widely accepted. We recommend bringing some cash for local experiences." },
    ],
  },
  {
    category: "USA Wedding",
    items: [
      { q: "Which airport should I fly into?", a: "Miami International Airport (MIA) is closest, approximately 20 minutes from the venue. Fort Lauderdale (FLL) is also an option, ~45 minutes away." },
      { q: "What is the dress code for the USA wedding?", a: "Black tie / Formal attire. Women: floor-length gowns or formal cocktail dresses. Men: tuxedo or dark formal suit. Bridesmaids in Terracotta; groomsmen in Sand." },
      { q: "Is there parking at the venue?", a: "Yes — complimentary valet parking is available at the venue for all wedding guests." },
    ],
  },
  {
    category: "Accommodations",
    items: [
      { q: "Where should I stay in Colombia?", a: "We recommend Hotel Sazagua (on the venue grounds) using booking code VALMRC26. Book by October 1st to secure the room block rate." },
      { q: "Where should I stay in the USA?", a: "We have a room block at The Biltmore Hotel, Coral Gables. Use code MARC2026 and book by November 1st." },
    ],
  },
  {
    category: "Registry & Gifts",
    items: [
      { q: "Where are you registered?", a: "We are registered on Zola (primary), Williams-Sonoma, Crate & Barrel, and Honeyfund for our honeymoon. See our Registry page for links." },
      { q: "Should I bring a gift to the wedding?", a: "Please don't bring physical gifts to either venue — we'd love for you to travel light! Gifts can be shipped to our home address (provided on Zola)." },
    ],
  },
];

export default function FAQPage() {
  return (
    <div style={{ backgroundColor: "#fdf8f0" }}>
      <div className="pt-32 pb-20 px-6 text-center" style={{ backgroundColor: "#1a1209" }}>
        <p className="label-overline text-sand mb-4">Got Questions?</p>
        <h1 className="heading-display text-ivory">
          Frequently Asked{" "}
          <span className="italic text-sand">Questions</span>
        </h1>
      </div>

      <section className="section-pad">
        <div className="max-w-3xl mx-auto">
          <SectionHeader overline="We've Got Answers" title="Everything You" titleItalic="Need to Know" className="mb-14" />
          <FAQAccordion categories={FAQS} />
          <div className="mt-14 p-8 rounded-2xl text-center" style={{ backgroundColor: "#f5ede0" }}>
            <p className="font-serif text-xl font-light text-dark mb-2">Still have questions?</p>
            <p className="text-sm text-dark/60 mb-5">We're happy to help with anything we haven't covered here.</p>
            <Link href="/contact" className="btn-primary">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
