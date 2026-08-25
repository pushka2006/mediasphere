import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "MediaSphere AI – Smart OOH Media Planning Platform",
    template: "%s | MediaSphere AI",
  },
  description:
    "Enterprise SaaS platform for OOH media planning, buying, mall media, retail branding, and experiential marketing. Powered by AI.",
  keywords: [
    "OOH media planning",
    "billboard advertising",
    "media buying",
    "outdoor advertising",
    "mall media",
    "retail branding",
    "experiential marketing",
    "media planning software",
    "AI media planner",
  ],
  authors: [{ name: "MediaSphere AI" }],
  creator: "MediaSphere AI",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://mediasphere.ai",
    title: "MediaSphere AI – Smart OOH Media Planning Platform",
    description:
      "Enterprise SaaS platform for OOH media agencies. Plan, buy, and manage outdoor advertising campaigns with AI.",
    siteName: "MediaSphere AI",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-dark-950 text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
