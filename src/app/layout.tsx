import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-playfair",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-dm-sans",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#059669",
};

export const metadata: Metadata = {
    metadataBase: new URL("https://www.emeraldexecutivehousing.net"),
    title: {
        default: "Emerald Executive Housing | Premium Furnished Rentals in Windsor",
        template: "%s | Emerald Executive Housing",
    },
    description:
        "Discover luxury furnished rentals in Windsor, Ontario. Premium executive housing with modern amenities, flexible stays, and exceptional comfort for professionals and families.",
    keywords: [
        "furnished rentals Windsor",
        "executive housing Windsor",
        "luxury rentals Windsor Ontario",
        "short term rentals Windsor",
        "corporate housing Windsor",
        "furnished apartments Windsor",
        "extended stay Windsor",
        "premium rentals Windsor",
        "Windsor Ontario rentals",
        "executive suites Windsor",
    ],
    authors: [{ name: "Emerald Executive Housing" }],
    creator: "Emerald Executive Housing",
    publisher: "Emerald Executive Housing",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_CA",
        url: "https://www.emeraldexecutivehousing.net/",
        siteName: "Emerald Executive Housing",
        title: "Emerald Executive Housing | Premium Furnished Rentals in Windsor",
        description:
            "Discover luxury furnished rentals in Windsor, Ontario. Premium executive housing with modern amenities, flexible stays, and exceptional comfort.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Emerald Executive Housing - Premium Furnished Rentals in Windsor",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Emerald Executive Housing | Premium Furnished Rentals",
        description:
            "Luxury furnished rentals in Windsor, Ontario. Modern amenities and flexible stays for professionals and families.",
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: "https://www.emeraldexecutivehousing.net",
    },
    category: "Real Estate",
    verification: {
        google: "your-google-verification-code", // Replace with actual verification code
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            </head>
            <body className="font-body antialiased bg-white text-neutral-900">
                {children}
            </body>
        </html>
    );
}
