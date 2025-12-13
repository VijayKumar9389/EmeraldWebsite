import fs from "fs";
import path from "path";

export default function ListingPage({ params }: { params: { id: string } }) {
    // Load the JSON file
    const filePath = path.join(process.cwd(), "public/data/listings.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    const listings = JSON.parse(fileData);

    // Find listing by ID
    const listing = listings.find((item: any) => item.id === Number(params.id));

    if (!listing) {
        return (
            <div className="p-10 text-center">
                <h1 className="text-3xl font-bold">Listing not found</h1>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-4xl font-bold">{listing.title}</h1>

            <p className="mt-2 text-xl text-gray-600">{listing.price}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {listing.photos.map((src: string, i: number) => (
                    <img
                        key={i}
                        src={src}
                        alt=""
                        className="rounded-xl shadow-lg"
                    />
                ))}
            </div>

            <div className="mt-10 space-y-4">
                <h2 className="text-2xl font-semibold">Description</h2>
                <p className="text-gray-700">{listing.description}</p>

                <h2 className="text-2xl font-semibold">Amenities</h2>
                <ul className="list-disc pl-6">
                    {listing.amenities.map((a: string, i: number) => (
                        <li key={i}>{a}</li>
                    ))}
                </ul>

                <h2 className="text-2xl font-semibold">Contact</h2>
                <p>Name: {listing.contact.name}</p>
                <p>Email: {listing.contact.email}</p>
                <p>Phone: {listing.contact.phone}</p>
            </div>

            <iframe
                src={listing.mapEmbedUrl}
                className="w-full h-96 mt-10 rounded-xl shadow-xl"
                loading="lazy"
            ></iframe>
        </div>
    );
}