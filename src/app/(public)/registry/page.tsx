import type { Metadata } from "next";
import { ExternalLink, Gift, Plane, Home, Heart } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = { title: "Registry" };

const REGISTRIES = [
  { store: "Zola", category: "Primary Registry", desc: "Our main registry — kitchen, home décor, and everything for our new life together.", url: "#", icon: Heart, color: "#1a1209", featured: true },
  { store: "Williams-Sonoma", category: "Kitchen & Entertaining", desc: "We love to cook together — help us fill our kitchen with the tools to keep making memories.", url: "#", icon: Home, color: "#7c3f00", featured: false },
  { store: "Crate & Barrel", category: "Home & Living", desc: "Elegant furniture, bedding, and décor pieces for our first home.", url: "#", icon: Home, color: "#1c4532", featured: false },
  { store: "Honeyfund", category: "Honeymoon Fund", desc: "Help us kick off our marriage with an unforgettable adventure.", url: "#", icon: Plane, color: "#d4a574", featured: false },
];

const CHARITIES = [
  { name: "Fundación Éxito", desc: "Supporting child nutrition and education in Colombia — near to Jhoana's heart.", url: "#" },
  { name: "Boys & Girls Club of America", desc: "Empowering youth in Damariel's hometown community.", url: "#" },
];

export default function RegistryPage() {
  return (
    <div style={{ backgroundColor: "#fdf8f0" }}>
      <div className="pt-32 pb-20 px-6 text-center" style={{ backgroundColor: "#1a1209" }}>
        <p className="label-overline text-sand mb-4">Gift Guide</p>
        <h1 className="heading-display text-ivory">
          Registry &amp; <span className="italic text-sand">Gifts</span>
        </h1>
        <p className="mt-4 text-ivory/50 text-sm max-w-md mx-auto">
          Your presence is the greatest gift of all. If you'd like to give something, we've made it easy.
        </p>
      </div>

      {/* Quote */}
      <section className="py-14 px-6 text-center" style={{ backgroundColor: "#fdf8f0" }}>
        <div className="flex items-center justify-center gap-4 mb-5" aria-hidden="true">
          <div className="h-px w-10 bg-sand" />
          <Heart size={13} className="text-sand fill-sand" />
          <div className="h-px w-10 bg-sand" />
        </div>
        <blockquote className="font-serif italic text-xl md:text-2xl font-light text-dark max-w-xl mx-auto leading-relaxed">
          &ldquo;We are already so full of gratitude just knowing you&apos;ll be celebrating with us.&rdquo;
        </blockquote>
        <p className="mt-4 text-sm text-dark/40">— Jhoana &amp; Damariel</p>
      </section>

      {/* Registry cards */}
      <section className="section-pad" style={{ backgroundColor: "#f5ede0" }}>
        <div className="container-wedding mx-auto">
          <SectionHeader overline="Where We're Registered" title="Our" titleItalic="Registries" className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REGISTRIES.map((r) => (
              <a
                key={r.store}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-wedding group hover:-translate-y-1 transition-transform block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
                style={{ border: r.featured ? `2px solid ${r.color}` : undefined }}
                aria-label={`${r.store} Registry — opens in new tab`}
              >
                {r.featured && <span className="inline-block text-xs px-2 py-0.5 rounded-full mb-3 text-white" style={{ backgroundColor: "#d4a574" }}>Primary</span>}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: r.color }}>
                  <r.icon size={20} className="text-white" />
                </div>
                <p className="label-overline text-dark/40 mb-1">{r.category}</p>
                <h3 className="font-serif text-xl font-normal text-dark mb-2">{r.store}</h3>
                <p className="text-sm text-dark/60 leading-relaxed mb-4">{r.desc}</p>
                <span className="flex items-center gap-1 text-xs uppercase tracking-widest transition-opacity group-hover:opacity-70" style={{ color: r.color }}>
                  View Registry <ExternalLink size={11} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="section-pad">
        <div className="container-wedding mx-auto">
          <SectionHeader overline="Good to Know" title="Gift" titleItalic="Tips" className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              { icon: Gift, title: "No gifts at the venue", body: "Please don't bring physical gifts to either wedding — travel light and enjoy the celebration!" },
              { icon: Plane, title: "Ship to our home", body: "All registry gifts can be shipped directly to us. Our address is provided at checkout on Zola." },
              { icon: Heart, title: "Cards are welcome", body: "A handwritten note means more than any gift. There will be a card box at both venues." },
            ].map((tip) => (
              <div key={tip.title} className="card-wedding">
                <tip.icon size={20} className="text-sand mb-3" />
                <h3 className="font-serif text-lg font-normal text-dark mb-1">{tip.title}</h3>
                <p className="text-sm text-dark/60 leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charities */}
      <section className="py-16 px-6" style={{ backgroundColor: "#f5ede0" }}>
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeader overline="Give Back" title="Causes Close to Our" titleItalic="Hearts" subtitle="In lieu of a gift, a donation to one of these organizations means the world to us." className="mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CHARITIES.map((c) => (
              <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer"
                className="card-wedding text-left hover:-translate-y-1 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
                aria-label={`${c.name} — opens in new tab`}
              >
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-serif text-lg font-normal text-dark">{c.name}</h3>
                  <ExternalLink size={13} className="text-sand flex-shrink-0 mt-1" />
                </div>
                <p className="text-sm text-dark/60 leading-relaxed">{c.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
