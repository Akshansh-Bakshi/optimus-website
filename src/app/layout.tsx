import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Optimus Cooling & Power Solution",
  description:
    "Cooling, electrical, fire protection, and critical power infrastructure solutions for commercial and technical environments.",
  openGraph: {
    title: "Optimus Cooling & Power Solution",
    description:
      "Cooling, electrical, fire protection, and critical power infrastructure solutions for commercial and technical environments.",
    type: "website",
    siteName: "Optimus Cooling & Power Solution",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
