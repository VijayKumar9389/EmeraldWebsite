export interface Listing {
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