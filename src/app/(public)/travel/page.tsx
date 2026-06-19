import type { Metadata } from "next";
import { AlertTriangle, Plane, Hotel, Car, Phone } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TravelTabs } from "@/components/wedding/TravelTabs";

export const metadata: Metadata = { title: "Travel & Accommodations" };

export default function TravelPage() {
  return (
    <div style={{ backgroundColor: "#fdf8f0" }}>
      <div className="pt-32 pb-20 px-6 text-center" style={{ backgroundColor: "#1a1209" }}>
        <p className="label-overline text-sand mb-4">Getting Here</p>
        <h1 className="heading-display text-ivory">
          Travel &amp;{" "}
          <span className="italic text-sand">Accommodations</span>
        </h1>
      </div>

      {/* Passport reminder */}
      <div className="px-6 py-4 flex items-center justify-center gap-3" style={{ backgroundColor: "#fef3c7", borderBottom: "1px solid #fde68a" }} role="alert">
        <AlertTriangle size={16} className="text-amber-600 flex-shrink-0" />
        <p className="text-sm text-amber-800">
          <strong>Reminder:</strong> A valid passport is required for the Colombia wedding. Check expiration dates — renewals can take 6–8 weeks.
        </p>
      </div>

      <section className="section-pad">
        <div className="container-wedding mx-auto">
          <TravelTabs />
        </div>
      </section>

      {/* WhatsApp */}
      <section className="py-16 px-6" style={{ backgroundColor: "#f5ede0" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "#25d366" }}>
            <Phone size={28} className="text-white" />
          </div>
          <h2 className="font-serif text-2xl font-light text-dark mb-3">Join the Guest WhatsApp Group</h2>
          <p className="text-sm text-dark/60 mb-6">Real-time updates, travel coordination, and a way to connect with fellow guests.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#" className="btn-primary" style={{ backgroundColor: "#25d366" }}>🇨🇴 Colombia Group</a>
            <a href="#" className="btn-primary" style={{ backgroundColor: "#128c7e" }}>🇺🇸 USA Group</a>
          </div>
        </div>
      </section>
    </div>
  );
}
