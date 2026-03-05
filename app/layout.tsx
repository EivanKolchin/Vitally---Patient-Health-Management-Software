import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sepsis Sentinel - Clinical Decision Support",
  description: "Post-operative sepsis monitoring and antibiotic recommendation system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

