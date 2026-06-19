import type { Metadata } from "next";
import { Mail, Phone, Heart } from "lucide-react";
import { ContactForm } from "@/components/wedding/ContactForm";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: "#fdf8f0" }}>
      <div className="pt-32 pb-20 px-6 text-center" style={{ backgroundColor: "#1a1209" }}>
        <p className="label-overline text-sand mb-4">Reach Out</p>
        <h1 className="heading-display text-ivory">
          Get in <span className="italic text-sand">Touch</span>
        </h1>
      </div>

      <section className="section-pad">
        <div className="container-wedding mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-4xl mx-auto">
            <div>
              <SectionHeader overline="We'd love to hear from you" title="Questions?" align="left" />
              <p className="mt-4 text-sm leading-relaxed text-dark/60">
                Whether you have questions about travel, accommodations, attire, or anything else — we&apos;re here to help make your experience seamless and joyful.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-champagne flex items-center justify-center">
                    <Mail size={16} className="text-sand" />
                  </div>
                  <div>
                    <p className="label-overline text-dark/40 mb-0.5">Email</p>
                    <a href="mailto:hello@jhoanadamariel.com" className="text-sm text-dark hover:text-sand transition-colors">
                      hello@jhoanadamariel.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-champagne flex items-center justify-center">
                    <Phone size={16} className="text-sand" />
                  </div>
                  <div>
                    <p className="label-overline text-dark/40 mb-0.5">WhatsApp</p>
                    <p className="text-sm text-dark">+1 (305) 000-0000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-champagne flex items-center justify-center">
                    <Heart size={16} className="text-sand fill-sand" />
                  </div>
                  <div>
                    <p className="label-overline text-dark/40 mb-0.5">Response Time</p>
                    <p className="text-sm text-dark">Within 48 hours</p>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
