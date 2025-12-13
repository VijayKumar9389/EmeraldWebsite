// app/page.tsx
import HeroSection from "@/app/components/sections/HeroSection";
import PropertyList from "@/app/components/sections/ListingSection";
import Services from "@/app/components/sections/ServiceSection";
import QASection from "@/app/components/sections/QASection";
import ContactForm from "@/app/components/sections/ContactSection";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import "./globals.css";

// export const metadata = {
//     title: "Luxury Rentals | Emerald Executive Housing",
//     description:
//         "Premium modern rentals designed for comfort, convenience, and executive stays.",
//     openGraph: {
//         title: "Luxury Rentals | Emerald Executive Housing",
//         description:
//             "Find premium modern rentals with all amenities and flexible stay options.",
//         images: ["/og-image.jpg"],
//         url: "https://yourexecutiverentals.com",
//     },
// };

export default function Home() {
    return (
        <div className="min-h-screen bg-background-color overflow-x-hidden">
            <header>
                <Navbar />
            </header>

            <main className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-32">
                <section aria-label="Hero Section">
                    <HeroSection />
                </section>

                <section aria-label="Our Services">
                    <Services />
                </section>

                <section aria-label="Property Listings">
                    <PropertyList />
                </section>

                <section aria-label="Frequently Asked Questions">
                    <QASection />
                </section>
            </main>

            <section aria-label="Contact Form" className="mt-20">
                <ContactForm />
            </section>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}