import { MetadataRoute } from "next";
import path from "path";
import fs from "fs";

interface Listing {
    id: number;
}

function getListingIds(): number[] {
    try {
        const filePath = path.join(process.cwd(), "public", "data", "listings.json");
        const fileContents = fs.readFileSync(filePath, "utf-8");
        const listings: Listing[] = JSON.parse(fileContents);
        return listings.map((listing) => listing.id);
    } catch {
        return [];
    }
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.emeraldexecutivehousing.net";

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
    ];

    // Dynamic listing pages
    const listingIds = getListingIds();
    const listingPages: MetadataRoute.Sitemap = listingIds.map((id) => ({
        url: `${baseUrl}/listing/${id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [...staticPages, ...listingPages];
}
