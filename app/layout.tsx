/* eslint-disable @next/next/inline-script-id */
import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import GetPromotion from "@/action/Admin/Promotion/GetPromotion";
import Script from "next/script";

const CookieBanner = dynamic(() => import("@/components/CookieBanner"), {
  ssr: false,
  loading: () => <></>,
});

const inter = Sen({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "2PH TRAVELS",
//   description: "2PH TRAVELS",
// };

// export const metadata = {
//   title: "2PH Travel - Your Ultimate Flight Booking Platform!",
//   description: `2PH Travel - Where Every Journey Begins! Discover the best deals on flights, plan your dream vacation.Your trusted partner for seamless travel experiences..`,
//   authors: [
//     {
//       name: "2PH Travel",
//     },
//   ],

//   keywords: [
//     "cheap flight to Philippines",
//     "flight to Philippines",
//     "flights to Philippines",
//     "cheap flights Philippines",
//     "cheap flights to Philippines",
//     "cheapest flight to Philippines",
//     "cheap flights to the Philippines",
//     "Philippines plane tickets",
//     "plane ticket to Philippines",
//     "plane tickets to Philippines",
//   ],
// };

// async function PromotionImage() {
//   try {
//     const response = await GetPromotion();
//     return response;
//   } catch (error) {
//     console.error("Offer API request failed:", error);
//     throw error;
//   }
// }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const promotion = await GetPromotion("latest");

  return (
    <html lang="en" prefix="og: https://ogp.me/ns#">
      <head>
        {/* Open Graph tags */}

        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "SoftwareApplication",
              name: "2PH Travel",
              description:
                "Book your flights online with ease on 2PH Travel. Discover great deals, compare prices, and reserve seats for your next journey hassle-free.",
              image: "/android-chrome-512x512.png",
              operatingSystem: "iOS, Android",
              applicationCategory: "Flight Ticket Booking",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body>
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
        <Suspense>
          <CookieBanner />
        </Suspense>
      </body>
    </html>
  );
}

export async function generateMetadata() {
  const promotion = await GetPromotion("latest");

  return {
    title: "2PH Travel - Your best deal to the Philippines and beyond",
    description: `2PH Travel - Where Every Journey Begins! Discover the best deals on flights, plan your dream vacation.Your trusted partner for seamless travel experiences..`,
    authors: [
      {
        name: "2PH Travel",
      },
    ],
    keywords: [
      "cheap flight to Philippines",
      "flight to Philippines",
      "flights to Philippines",
      "cheap flights Philippines",
      "cheap flights to Philippines",
      "cheapest flight to Philippines",
      "cheap flights to the Philippines",
      "Philippines plane tickets",
      "plane ticket to Philippines",
      "plane tickets to Philippines",
    ],
    "og:title":
      promotion?.title ||
      "2PH Travel - Your best deal to the Philiipines and beyond",
    "og:description":
      promotion?.desc ||
      "2PH Travel - Where Every Journey Begins! Discover the best deals on flights, plan your dream vacation.Your trusted partner for seamless travel experiences..",
    "og:image":
      promotion?.image_url || `${process.env.FRONTEND_URL}Banner01.png`,
    "og:url": `${process.env.FRONTEND_URL}`,
    "og:type": "website",
    openGraph: {
      title:
        promotion?.title ||
        "2PH Travel - Your best deal to the Philiipines and beyond",
      description:
        promotion?.desc ||
        "2PH Travel - Where Every Journey Begins! Discover the best deals on flights, plan your dream vacation.Your trusted partner for seamless travel experiences..",
      images: promotion?.image_url || `${process.env.FRONTEND_URL}Banner01.png`,
      url: `${process.env.FRONTEND_URL}`,
      type: "website",
    },
  };
}
