import { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs/promises";
import ListingClient from "./ListingClient";
import Footer from "@/app/components/layout/Footer";
import { ListingPageStructuredData } from "@/lib/seo/structured-data";

interface Listing {
    id: number;
    title: string;
    mapEmbedUrl: string;
    price: string;
    description: string;
    bedrooms: number;
    bathrooms: number;
    size: string;
    propertyType: string;
    location: {
        neighborhood: string;
        city: string;
        state: string;
        zip: string;
    };
    amenities: string[];
    features: string[];
    nearbyAttractions: string[];
    availability: string;
    contact: {
        name: string;
        phone: string;
        email: string;
    };
    photos: string[];
}

async function getListings(): Promise<Listing[]> {
    try {
        const filePath = path.join(process.cwd(), "public", "data", "listings.json");
        const fileContents = await fs.readFile(filePath, "utf-8");
        return JSON.parse(fileContents);
    } catch (error) {
        console.error("Error reading listings:", error);
        return [];
    }
}

async function getListing(id: string): Promise<Listing | null> {
    const listings = await getListings();
    return listings.find((l) => l.id === Number(id)) || null;
}

export async function generateStaticParams() {
    const listings = await getListings();
    return listings.map((listing) => ({
        id: String(listing.id),
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const listing = await getListing(id);

    if (!listing) {
        return {
            title: "Property Not Found | Emerald Executive Housing",
            description: "The requested property could not be found.",
        };
    }

    const shortTitle = listing.title.split(",")[0];
    const fullAddress = listing.title;

    return {
        title: `${shortTitle} - ${listing.propertyType} in Windsor | Emerald Executive Housing`,
        description: `${listing.description} ${listing.bedrooms} bedrooms, ${listing.bathrooms} bathrooms, ${listing.size}. Starting at ${listing.price}/night.`,
        keywords: [
            `furnished rental ${listing.location.city}`,
            `${listing.propertyType.toLowerCase()} rental Windsor`,
            `executive housing ${listing.location.neighborhood}`,
            `short term rental ${listing.location.city}`,
            `${listing.bedrooms} bedroom rental Windsor`,
            fullAddress,
            "Emerald Executive Housing",
        ],
        openGraph: {
            title: `${shortTitle} - Premium ${listing.propertyType} | Emerald Executive Housing`,
            description: `${listing.description} Book this ${listing.bedrooms}-bedroom ${listing.propertyType.toLowerCase()} starting at ${listing.price}/night.`,
            type: "website",
            url: `https://www.emeraldexecutivehousing.net/listing/${listing.id}`,
            images: listing.photos.slice(0, 4).map((photo, index) => ({
                url: `https://www.emeraldexecutivehousing.net${photo}`,
                width: 1200,
                height: 630,
                alt: index === 0
                    ? `${shortTitle} - Premium furnished rental in Windsor`
                    : `${shortTitle} interior photo ${index + 1}`,
            })),
            siteName: "Emerald Executive Housing",
        },
        twitter: {
            card: "summary_large_image",
            title: `${shortTitle} | ${listing.price}/night`,
            description: `${listing.bedrooms} bed, ${listing.bathrooms} bath ${listing.propertyType.toLowerCase()} in ${listing.location.city}`,
            images: [`https://www.emeraldexecutivehousing.net${listing.photos[0]}`],
        },
        alternates: {
            canonical: `https://www.emeraldexecutivehousing.net/listing/${listing.id}`,
        },
    };
}

export default async function ListingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const listing = await getListing(id);

    if (!listing) {
        notFound();
    }

    return (
        <>
            {/* Structured Data */}
            <ListingPageStructuredData listing={listing} />

            <div className="min-h-screen bg-white">
                <ListingClient listing={listing} />
                <Footer />
            </div>
        </>
    );
}
