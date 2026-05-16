import Script from "next/script";

// ============================================================================
// Types
// ============================================================================

interface Listing {
    id: number;
    title: string;
    description: string;
    price: string;
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
    photos: string[];
}

interface FAQItem {
    question: string;
    answer: string;
}

type StructuredDataType =
    | "organization"
    | "localBusiness"
    | "lodgingBusiness"
    | "website"
    | "faqPage"
    | "accommodation"
    | "breadcrumb";

interface StructuredDataProps {
    type: StructuredDataType;
    listing?: Listing;
    faqItems?: FAQItem[];
}

// ============================================================================
// Constants
// ============================================================================

const BASE_URL = "https://www.emeraldexecutivehousing.net";
const COMPANY_NAME = "Emerald Executive Housing";
const COMPANY_PHONE = "+1-778-846-2702";
const COMPANY_EMAIL = "Rhea@emeraldexecutivehousing.com";

const ADDRESS = {
    "@type": "PostalAddress" as const,
    addressLocality: "Windsor",
    addressRegion: "Ontario",
    addressCountry: "CA",
};

const GEO_COORDINATES = {
    "@type": "GeoCoordinates" as const,
    latitude: 42.3149,
    longitude: -83.0364,
};

// ============================================================================
// Schema Data Generators
// ============================================================================

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
        "Premium furnished executive rentals in Windsor, Ontario. Luxury accommodations for professionals and families.",
    address: ADDRESS,
    contactPoint: {
        "@type": "ContactPoint",
        telephone: COMPANY_PHONE,
        contactType: "customer service",
        email: COMPANY_EMAIL,
        availableLanguage: ["English"],
    },
    sameAs: [],
};

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#business`,
    name: COMPANY_NAME,
    description:
        "Premium furnished executive rentals in Windsor, Ontario. Luxury accommodations with modern amenities for short-term and extended stays.",
    url: BASE_URL,
    telephone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
    address: ADDRESS,
    geo: GEO_COORDINATES,
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

const lodgingBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${BASE_URL}/#lodging`,
    name: COMPANY_NAME,
    description:
        "Luxury furnished rentals in Windsor, Ontario. Executive apartments for business travelers and extended stays.",
    url: BASE_URL,
    image: `${BASE_URL}/og-image.jpg`,
    priceRange: "$240 - $275 per night",
    address: ADDRESS,
    geo: GEO_COORDINATES,
    amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
        { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
        { "@type": "LocationFeatureSpecification", name: "Kitchen", value: true },
        { "@type": "LocationFeatureSpecification", name: "Laundry", value: true },
        { "@type": "LocationFeatureSpecification", name: "Pool", value: true },
        { "@type": "LocationFeatureSpecification", name: "Gym", value: true },
    ],
    telephone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY_NAME,
    url: BASE_URL,
    description: "Premium furnished executive rentals in Windsor, Ontario.",
    publisher: {
        "@type": "Organization",
        name: COMPANY_NAME,
    },
    potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/#listings`,
        "query-input": "required name=search_term_string",
    },
};

function generateFAQSchema(faqItems: FAQItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };
}

function generateAccommodationSchema(listing: Listing) {
    const shortTitle = listing.title.split(",")[0];

    return {
        "@context": "https://schema.org",
        "@type": "Accommodation",
        "@id": `${BASE_URL}/listing/${listing.id}`,
        name: listing.title,
        description: listing.description,
        url: `${BASE_URL}/listing/${listing.id}`,
        image: listing.photos.map((photo) => `${BASE_URL}${photo}`),
        address: {
            "@type": "PostalAddress",
            streetAddress: shortTitle,
            addressLocality: listing.location.city,
            addressRegion: listing.location.state,
            postalCode: listing.location.zip,
            addressCountry: "CA",
        },
        geo: GEO_COORDINATES,
        numberOfRooms: listing.bedrooms,
        numberOfBathroomsTotal: listing.bathrooms,
        floorSize: {
            "@type": "QuantitativeValue",
            value: parseInt(listing.size.replace(/[^0-9]/g, "")),
            unitCode: "SQF",
        },
        amenityFeature: listing.amenities.map((amenity) => ({
            "@type": "LocationFeatureSpecification",
            name: amenity,
            value: true,
        })),
        petsAllowed: listing.amenities.includes("Pets allowed"),
        smokingAllowed: false,
        offers: {
            "@type": "Offer",
            name: `Rent ${shortTitle}`,
            description: `Furnished ${listing.propertyType.toLowerCase()} rental in ${listing.location.city}`,
            url: `${BASE_URL}/listing/${listing.id}`,
            price: listing.price.replace(/[^0-9]/g, ""),
            priceCurrency: "CAD",
            priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: listing.price.replace(/[^0-9]/g, ""),
                priceCurrency: "CAD",
                unitText: "night",
            },
            availability: "https://schema.org/InStock",
            validFrom: new Date().toISOString(),
            seller: {
                "@type": "Organization",
                name: COMPANY_NAME,
                url: BASE_URL,
            },
        },
    };
}

function generateBreadcrumbSchema(listing: Listing) {
    const shortTitle = listing.title.split(",")[0];

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: BASE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Properties",
                item: `${BASE_URL}/#listings`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: shortTitle,
                item: `${BASE_URL}/listing/${listing.id}`,
            },
        ],
    };
}

// ============================================================================
// Component
// ============================================================================

export default function StructuredData({
    type,
    listing,
    faqItems,
}: StructuredDataProps) {
    let data;
    let id = `structured-data-${type}`;

    switch (type) {
        case "organization":
            data = organizationSchema;
            break;
        case "localBusiness":
            data = localBusinessSchema;
            break;
        case "lodgingBusiness":
            data = lodgingBusinessSchema;
            break;
        case "website":
            data = websiteSchema;
            break;
        case "faqPage":
            if (!faqItems || faqItems.length === 0) return null;
            data = generateFAQSchema(faqItems);
            break;
        case "accommodation":
            if (!listing) return null;
            data = generateAccommodationSchema(listing);
            id = `structured-data-accommodation-${listing.id}`;
            break;
        case "breadcrumb":
            if (!listing) return null;
            data = generateBreadcrumbSchema(listing);
            id = `structured-data-breadcrumb-${listing.id}`;
            break;
        default:
            return null;
    }

    return (
        <Script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

// ============================================================================
// Convenience Components for Common Use Cases
// ============================================================================

export function HomePageStructuredData() {
    return (
        <>
            <StructuredData type="organization" />
            <StructuredData type="localBusiness" />
            <StructuredData type="lodgingBusiness" />
            <StructuredData type="website" />
        </>
    );
}

export function ListingPageStructuredData({ listing }: { listing: Listing }) {
    return (
        <>
            <StructuredData type="accommodation" listing={listing} />
            <StructuredData type="breadcrumb" listing={listing} />
        </>
    );
}

export function FAQStructuredData({ faqItems }: { faqItems: FAQItem[] }) {
    return <StructuredData type="faqPage" faqItems={faqItems} />;
}
