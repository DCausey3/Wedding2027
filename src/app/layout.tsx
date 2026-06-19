import type { Metadata } from "next";
import "./globals.css";
import { AmplifyProvider } from "../components/providers/AmplifyProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Jhoana & Damariel | Wedding 2026",
    template: "%s | Jhoana & Damariel",
  },
  description:
    "Join us as we celebrate our love — two weddings, two countries, one love story. Colombia · November 2026 | USA · December 2026",
  openGraph: {
    type: "website",
    siteName: "Jhoana & Damariel Wedding",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AmplifyProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                fontFamily: "var(--font-inter)",
                borderRadius: "12px",
              },
            }}
          />
        </AmplifyProvider>
      </body>
    </html>
  );
}
