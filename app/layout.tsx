import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Crew Connect | Premium Event Staffing",
  description: "A modern event staffing marketplace for elite crew and organizers."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full scroll-smooth bg-ink">
      <body className="flex min-h-screen flex-col bg-ink font-sans text-ink antialiased selection:bg-[#ffcabf] selection:text-ink">
        <Header />
        <main className="flex-1 bg-mist">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
