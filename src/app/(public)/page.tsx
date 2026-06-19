import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { CountdownTimer } from "../../components/ui/CountdownTimer";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { WEDDING_DATES } from "../../lib/utils";

export const metadata: Metadata = {
  title: "Home | Jhoana & Damariel Wedding 2026",
};

// Hero runs as a Server Component — countdown hydrates client-side only
export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden"
        aria-label="Wedding hero"
      >
        <Image
          src="https://images.unsplash.com/photo-1643068730310-e8cff093b7ab?w=1800&q=80"
          alt="Tropical garden — Colombia wedding venue"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(10,7,3,0.35) 0%, rgba(10,7,3,0.15) 40%, rgba(10,7,3,0.65) 100%)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl w-full animate-fade-up">
          <p className="label-overline text-[#f5e6c8] mb-6">
            We&apos;re getting married
          </p>

          <h1 className="heading-display text-ivory mb-6">
            Jhoana
            <br />
            <span className="italic text-[#f5e6c8]">&amp; Damariel</span>
          </h1>

          <div className="flex items-center gap-4 mb-10" aria-hidden="true">
            <div className="h-px w-10 bg-sand" />
            <p className="label-overline text-[#f5e6c8]">
              Two Celebrations, One Love Story
            </p>
            <div className="h-px w-10 bg-sand" />
          </div>

          <CountdownTimer
            targetDate={WEDDING_DATES.colombia}
            label="Colombia · Nov 7, 2026"
            textColor="#fdf8f0"
            accentColor="#d4a574"
            size="lg"
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link href="/rsvp" className="btn-gold">
              RSVP Now
            </Link>
            <Link href="/events" className="btn-outline">
              View Events
            </Link>
          </div>
        </div>
      </section>

      {/* ── Wedding Destinations ──────────────────────────────────────────── */}
      <section className="section-pad bg-champagne" aria-labelledby="weddings-heading">
        <div className="container-wedding">
          <SectionHeader
            overline="Two Celebrations"
            title="Choose Your"
            titleItalic="Adventure"
            subtitle="Two weddings, two countries, one unforgettable love story."
            id="weddings-heading"
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Colombia Card */}
            <WeddingDestCard
              href="/events#colombia"
              image="https://images.unsplash.com/photo-1643068730310-e8cff093b7ab?w=800&q=80"
              date="November 7, 2026"
              title="Colombia"
              location="Pereira, Colombia"
              accentColor="#2dd4bf"
              gradient="linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)"
            />
            {/* USA Card */}
            <WeddingDestCard
              href="/events#usa"
              image="https://images.unsplash.com/photo-1719008682128-5ebdbc7ccfab?w=800&q=80"
              date="December 12, 2026"
              title="USA"
              location="Miami, Florida"
              accentColor="#34d399"
              gradient="linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)"
            />
          </div>
        </div>
      </section>

      {/* ── Countdown Strip ───────────────────────────────────────────────── */}
      <section className="py-16 px-6" aria-label="Wedding countdowns">
        <div className="container-wedding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="flex flex-col items-center text-center p-10 rounded-2xl"
              style={{ backgroundColor: "#f0f9f8", border: "1px solid #99f6e4" }}
            >
              <p className="label-overline text-colombia-teal mb-2">Colombia</p>
              <h3 className="font-serif text-xl font-normal text-colombia-teal-dark mb-1">
                Pereira, Colombia
              </h3>
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={12} className="text-colombia-teal" />
                <p className="text-xs text-dark/60">November 7, 2026</p>
              </div>
              <CountdownTimer
                targetDate={WEDDING_DATES.colombia}
                textColor="#0f766e"
                accentColor="#0d9488"
              />
            </div>
            <div
              className="flex flex-col items-center text-center p-10 rounded-2xl"
              style={{ backgroundColor: "#f0fdf4", border: "1px solid #86efac" }}
            >
              <p className="label-overline text-usa-emerald mb-2">USA</p>
              <h3 className="font-serif text-xl font-normal text-usa-emerald-dark mb-1">
                Miami, Florida
              </h3>
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={12} className="text-usa-emerald" />
                <p className="text-xs text-dark/60">December 12, 2026</p>
              </div>
              <CountdownTimer
                targetDate={WEDDING_DATES.usa}
                textColor="#065f46"
                accentColor="#059669"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── RSVP CTA Banner ──────────────────────────────────────────────── */}
      <section
        className="section-pad relative overflow-hidden"
        style={{ backgroundColor: "#1a1209" }}
        aria-labelledby="rsvp-cta-heading"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #d4a574, transparent 50%), radial-gradient(circle at 70% 50%, #2dd4bf, transparent 50%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="label-overline text-sand mb-4">You&apos;re Invited</p>
          <h2 id="rsvp-cta-heading" className="heading-section text-ivory mb-4">
            RSVP by{" "}
            <span className="italic text-sand">September 1st</span>
          </h2>
          <p className="text-ivory/60 text-sm mb-10 leading-relaxed">
            Please let us know which celebrations you&apos;ll be joining. We want to make sure everything is perfect for your experience.
          </p>
          <Link href="/rsvp" className="btn-gold">
            RSVP Now
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}

function WeddingDestCard({
  href,
  image,
  date,
  title,
  location,
  accentColor,
  gradient,
}: {
  href: string;
  image: string;
  date: string;
  title: string;
  location: string;
  accentColor: string;
  gradient: string;
}) {
  return (
    <Link
      href={href}
      className="relative block overflow-hidden rounded-2xl group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
      style={{ aspectRatio: "3/4" }}
      aria-label={`${title} Wedding — ${location}`}
    >
      <Image
        src={image}
        alt={`${title} wedding destination`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0" style={{ background: gradient }} aria-hidden="true" />
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <p className="label-overline mb-2" style={{ color: accentColor }}>{date}</p>
        <h3 className="font-serif text-3xl font-light text-ivory leading-tight">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <MapPin size={12} style={{ color: accentColor }} />
          <p className="text-xs text-ivory/70">{location}</p>
        </div>
        <div className="flex items-center gap-2 mt-5 text-ivory/70 text-xs uppercase tracking-widest group-hover:text-ivory transition-colors">
          Explore
          <div className="h-px w-6 transition-all group-hover:w-10" style={{ backgroundColor: accentColor }} />
        </div>
      </div>
    </Link>
  );
}
