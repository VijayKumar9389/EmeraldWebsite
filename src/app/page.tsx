import HeroSection from "@/app/components/sections/HeroSection";
import PropertyList from "@/app/components/sections/ListingSection";
import Services from "@/app/components/sections/ServiceSection";
import QASection from "@/app/components/sections/QASection";
import ContactForm from "@/app/components/sections/ContactSection";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Premium Furnished Rentals in Windsor | Emerald Executive Housing",
    description:
        "Discover luxury furnished executive rentals in Windsor, Ontario. Modern amenities, flexible stays, and exceptional comfort for professionals and families. Book your premium accommodation today.",
    openGraph: {
        title: "Premium Furnished Rentals in Windsor | Emerald Executive Housing",
        description:
            "Luxury furnished executive rentals in Windsor, Ontario. Modern amenities and flexible stays for professionals and families.",
        images: ["/og-image.jpg"],
        url: "https://www.emeraldexecutivehousing.net/",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Premium Furnished Rentals in Windsor",
        description: "Luxury furnished executive rentals in Windsor, Ontario.",
        images: ["/og-image.jpg"],
    },
};

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Emerald Executive Housing",
    url: "https://www.emeraldexecutivehousing.net",
    logo: "https://www.emeraldexecutivehousing.net/logo.png",
    description:
        "Premium furnished executive rentals in Windsor, Ontario. Luxury accommodations for professionals and families.",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Windsor",
        addressRegion: "Ontario",
        addressCountry: "CA",
    },
    contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-778-846-2702",
        contactType: "customer service",
        email: "Rhea@emeraldexecutivehousing.com",
        availableLanguage: ["English"],
    },
    sameAs: [],
};

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.emeraldexecutivehousing.net/#business",
    name: "Emerald Executive Housing",
    description:
        "Premium furnished executive rentals in Windsor, Ontario. Luxury accommodations with modern amenities for short-term and extended stays.",
    url: "https://www.emeraldexecutivehousing.net",
    telephone: "+1-778-846-2702",
    email: "Rhea@emeraldexecutivehousing.com",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Windsor",
        addressRegion: "Ontario",
        postalCode: "",
        addressCountry: "CA",
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: 42.3149,
        longitude: -83.0364,
    },
    areaServed: {
        "@type": "City",
        name: "Windsor",
        containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Ontario",
        },
    },
    priceRange: "$$",
    openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
    },
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Emerald Executive Housing",
    url: "https://www.emeraldexecutivehousing.net",
    description:
        "Premium furnished executive rentals in Windsor, Ontario.",
    publisher: {
        "@type": "Organization",
        name: "Emerald Executive Housing",
    },
};

export default function Home() {
    return (
        <>
            {/* Structured Data for SEO */}
            <Script
                id="organization-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />
            <Script
                id="local-business-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(localBusinessSchema),
                }}
            />
            <Script
                id="website-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />

            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <Navbar />

                {/* Main Content */}
                <main>
                    {/* Hero Section */}
                    <section
                        aria-label="Featured luxury rentals"
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
                    >
                        <HeroSection />
                    </section>

                    {/* Services Section */}
                    <section
                        aria-label="Why choose Emerald Executive Housing"
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    >
                        <Services />
                    </section>

                    {/* Property Listings */}
                    <div className="bg-neutral-50">
                        <section
                            aria-label="Available furnished rentals"
                            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                        >
                            <PropertyList />
                        </section>
                    </div>

                    {/* FAQ Section */}
                    <section
                        aria-label="Frequently asked questions"
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    >
                        <QASection />
                    </section>

                    {/* Contact Section */}
                    <section aria-label="Contact us">
                        <ContactForm />
                    </section>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
