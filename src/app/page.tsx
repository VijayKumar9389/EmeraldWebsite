import HeroSection from "@/app/components/sections/HeroSection";
import AboutSection from "@/app/components/sections/AboutSection";
import WhatWeOfferSection from "@/app/components/sections/WhatWeOfferSection";
import PropertyList from "@/app/components/sections/ListingSection";
import QASection from "@/app/components/sections/QASection";
import ContactForm from "@/app/components/sections/ContactSection";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import { HomePageStructuredData } from "@/lib/seo/structured-data";
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

export default function Home() {
    return (
        <>
            {/* Structured Data for SEO */}
            <HomePageStructuredData />

            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <Navbar />

                {/* Main Content */}
                <main>
                    {/* Hero Section - wider with minimal padding, max-width for large screens */}
                    <section
                        aria-label="Featured luxury rentals"
                        className="max-w-[1920px] mx-auto px-3 sm:px-4 lg:px-6 pt-4 pb-16 lg:pb-24"
                    >
                        <HeroSection />
                    </section>

                    {/* About Section */}
                    <AboutSection />

                    {/* What We Offer Section */}
                    <WhatWeOfferSection />

                    {/* Property Listings */}
                    <div className="bg-neutral-50">
                        <section
                            id="listings"
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
