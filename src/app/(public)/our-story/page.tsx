import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = { title: "Our Story" };

const MOMENTS = [
  { year: "2021", title: "How We Met", body: "Their paths crossed through mutual friends, and what started as a casual introduction quickly became something neither of them could ignore. A shared laugh, a lingering conversation, and a spark that refused to fade." },
  { year: "2023", title: "Growing Together", body: "Through two countries and thousands of miles, they built something rare — a love that flourishes in the spaces between, and deepens every time they're together. Colombia and the USA both became home." },
  { year: "2024", title: "The Proposal", body: "On a warm summer afternoon in a beautiful garden, surrounded by blooming flowers, Damariel got down on one knee and asked Jhoana to be his forever. With trembling hands and happy tears, she said yes." },
  { year: "2026", title: "Two Celebrations", body: "They chose not to choose — both cultures deserve to celebrate this love. Colombia in November, the USA in December: two weddings, one love story, infinite joy." },
];

export default function OurStoryPage() {
  return (
    <div style={{ backgroundColor: "#fdf8f0" }}>
      {/* Page hero */}
      <div className="pt-32 pb-20 px-6 text-center" style={{ backgroundColor: "#1a1209" }}>
        <p className="label-overline text-sand mb-4">Our Journey</p>
        <h1 className="heading-display text-ivory">
          The Story{" "}
          <span className="italic text-sand">So Far</span>
        </h1>
      </div>

      {/* Engagement photos grid */}
      <section className="section-pad container-wedding mx-auto">
        <div className="grid grid-cols-12 gap-4 mb-20">
          <div className="col-span-7 aspect-video overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1541602765605-c21290830624?w=900&q=80"
              alt="Jhoana and Damariel together"
              width={900} height={506}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="col-span-5 aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1643068730310-e8cff093b7ab?w=600&q=80"
              alt="The ring"
              width={600} height={450}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Timeline */}
        <SectionHeader overline="Chapter by Chapter" title="How We" titleItalic="Got Here" className="mb-16" />

        <div className="max-w-2xl mx-auto relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-sand/30" aria-hidden="true" />
          {MOMENTS.map((moment, i) => (
            <div key={i} className="relative flex gap-8 mb-12">
              <div className="flex-shrink-0 z-10">
                <div className="w-12 h-12 rounded-full bg-dark flex items-center justify-center">
                  <span className="font-serif text-[0.7rem] text-ivory">{moment.year}</span>
                </div>
              </div>
              <div className="flex-1 pb-4">
                <h3 className="font-serif text-xl font-normal text-dark mb-2">{moment.title}</h3>
                <p className="text-sm leading-relaxed text-dark/60">{moment.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-sm mx-auto text-center">
          {[
            { value: "2", label: "Weddings" },
            { value: "2", label: "Countries" },
            { value: "∞", label: "Love" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-serif text-4xl font-light text-sand">{s.value}</p>
              <p className="label-overline text-dark/40 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
