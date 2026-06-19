import type { Metadata } from "next";
import Image from "next/image";
import { Calendar, MapPin, Clock, Shirt } from "lucide-react";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WEDDING_DATES } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = { title: "Events" };

const COLOMBIA_TIMELINE = [
  { time: "4:00 PM", event: "Guests Arrive & Welcome Drinks", type: "party" },
  { time: "5:00 PM", event: "Wedding Ceremony", type: "ceremony" },
  { time: "6:00 PM", event: "Cocktail Hour", type: "cocktail" },
  { time: "7:30 PM", event: "Reception Dinner", type: "dinner" },
  { time: "9:00 PM", event: "Dancing & Celebration", type: "party" },
  { time: "12:00 AM", event: "Rooftop After-Party (optional)", type: "optional" },
];

const USA_TIMELINE = [
  { time: "5:00 PM", event: "Cocktail Hour", type: "cocktail" },
  { time: "6:00 PM", event: "Wedding Ceremony", type: "ceremony" },
  { time: "7:15 PM", event: "Reception Dinner", type: "dinner" },
  { time: "9:00 PM", event: "Dancing & Celebration", type: "party" },
  { time: "11:30 PM", event: "Sparkler Grand Exit", type: "ceremony" },
];

const typeColor: Record<string, string> = {
  ceremony: "#d4a574",
  cocktail: "#0d9488",
  dinner: "#059669",
  party: "#8a7a65",
  optional: "#c4b49e",
};

export default function EventsPage() {
  return (
    <div style={{ backgroundColor: "#fdf8f0" }}>
      {/* Hero */}
      <div className="pt-32 pb-20 px-6 text-center" style={{ backgroundColor: "#1a1209" }}>
        <p className="label-overline text-sand mb-4">Mark Your Calendar</p>
        <h1 className="heading-display text-ivory">
          The <span className="italic text-sand">Celebrations</span>
        </h1>
        <p className="mt-4 text-ivory/50 text-sm">Two weekends. Two countries. One love story.</p>
      </div>

      {/* Colombia */}
      <section id="colombia" className="section-pad" aria-labelledby="colombia-heading">
        <div className="container-wedding mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="label-overline text-colombia-teal mb-3">Colombia Wedding</p>
              <h2 id="colombia-heading" className="heading-section text-dark mb-4">
                Pereira,{" "}
                <span className="italic text-colombia-teal">Colombia</span>
              </h2>
              <div className="space-y-2 mb-8">
                {[
                  { icon: Calendar, text: "November 7, 2026" },
                  { icon: MapPin, text: "Hacienda La Cabaña · Pereira, Colombia" },
                  { icon: Clock, text: "Ceremony at 5:00 PM" },
                  { icon: Shirt, text: "Tropical Formal / Festive Attire" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon size={14} className="text-colombia-teal flex-shrink-0" />
                    <p className="text-sm text-dark/70">{text}</p>
                  </div>
                ))}
              </div>
              <CountdownTimer targetDate={WEDDING_DATES.colombia} textColor="#0f766e" accentColor="#0d9488" size="md" />
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1643068730310-e8cff093b7ab?w=800&q=80"
                  alt="Colombia wedding venue"
                  width={800} height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-20 max-w-2xl mx-auto">
            <SectionHeader overline="November 7, 2026" title="Day of" titleItalic="Events" className="mb-10" />
            <EventTimeline items={COLOMBIA_TIMELINE} accentColor="#0d9488" />
          </div>
        </div>
      </section>

      {/* USA */}
      <section id="usa" className="section-pad" style={{ backgroundColor: "#f5ede0" }} aria-labelledby="usa-heading">
        <div className="container-wedding mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2">
              <p className="label-overline text-usa-emerald mb-3">USA Wedding</p>
              <h2 id="usa-heading" className="heading-section text-dark mb-4">
                Miami,{" "}
                <span className="italic text-usa-emerald">Florida</span>
              </h2>
              <div className="space-y-2 mb-8">
                {[
                  { icon: Calendar, text: "December 12, 2026" },
                  { icon: MapPin, text: "The Estate at Coral Gables · Miami, FL" },
                  { icon: Clock, text: "Ceremony at 6:00 PM" },
                  { icon: Shirt, text: "Black Tie / Formal Attire" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon size={14} className="text-usa-emerald flex-shrink-0" />
                    <p className="text-sm text-dark/70">{text}</p>
                  </div>
                ))}
              </div>
              <CountdownTimer targetDate={WEDDING_DATES.usa} textColor="#065f46" accentColor="#059669" size="md" />
            </div>
            <div className="relative lg:order-1">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1719008682128-5ebdbc7ccfab?w=800&q=80"
                  alt="USA wedding venue"
                  width={800} height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-20 max-w-2xl mx-auto">
            <SectionHeader overline="December 12, 2026" title="Evening of" titleItalic="Events" className="mb-10" />
            <EventTimeline items={USA_TIMELINE} accentColor="#059669" />
          </div>
        </div>
      </section>

      {/* RSVP CTA */}
      <div className="py-16 px-6 text-center" style={{ backgroundColor: "#1a1209" }}>
        <p className="font-serif text-2xl font-light text-ivory mb-2">Ready to celebrate?</p>
        <p className="text-sm text-ivory/50 mb-6">RSVP by September 1st, 2026</p>
        <Link href="/rsvp" className="btn-gold">RSVP Now</Link>
      </div>
    </div>
  );
}

function EventTimeline({ items, accentColor }: { items: typeof COLOMBIA_TIMELINE; accentColor: string }) {
  return (
    <div className="relative">
      <div className="absolute left-5 top-0 bottom-0 w-px opacity-20" style={{ backgroundColor: accentColor }} aria-hidden="true" />
      {items.map((item, i) => (
        <div key={i} className="relative flex gap-6 mb-8">
          <div className="flex-shrink-0 z-10">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
              <span className="font-serif text-xs text-white font-light">{String(i + 1).padStart(2, "0")}</span>
            </div>
          </div>
          <div className="flex-1 pt-1.5">
            <p className="label-overline mb-1" style={{ color: accentColor }}>{item.time}</p>
            <h3 className="font-serif text-lg font-normal text-dark">{item.event}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
