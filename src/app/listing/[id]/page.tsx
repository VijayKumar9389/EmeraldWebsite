"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookingPopup from "@/app/listing/[id]/components/ReservationForm";
import PhotoGallery from "./components/PhotoGallery";
import DetailsGrid from "./components/DetailsGrid";
import SectionList from "./components/SectionList";
import StickyBookingBar from "./components/StickyBookingBar";
import { BiCalendarCheck } from "react-icons/bi";
import { Listing } from "@/app/types";

export default function ListingPage() {
    const { id } = useParams();
    const [listing, setListing] = useState<Listing | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        fetch("/data/listings.json")
            .then((res) => res.json())
            .then((data: Listing[]) => {
                const found = data.find((item) => item.id === Number(id));
                setListing(found || null);
            })
            .catch(console.error);
    }, [id]);

    if (!listing) return <div className="p-10 text-center text-3xl font-bold">Listing not found</div>;

    return (
        <div className="bg-background-color">
        <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-14">
            {isPopupOpen && (
                <BookingPopup
                    isOpen={isPopupOpen}
                    listingTitle={listing.title}
                    listingId={listing.id}
                    onClose={() => setIsPopupOpen(false)}
                />
            )}

            <div>
                <h1 className="text-3xl md:text-5xl font-normal tracking-tight text-gray-900">{listing.title}</h1>
                <p className="text-3xl font-bold text-emerald-600">
                    {listing.price} <span className="ml-1 text-gray-500 text-lg font-medium">/ night</span>
                </p>
            </div>

            <PhotoGallery photos={listing.photos} />

            <section className="space-y-2 max-w-4xl">
                <h2 className="text-2xl font-semibold tracking-tight">About this stay</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                    {listing.description}
                </p>
            </section>

            <DetailsGrid listing={listing} />

            <SectionList title="Amenities" icon="check" items={listing.amenities} />
            <SectionList title="Features" icon="star" items={listing.features} />
            <SectionList title="Nearby Attractions" icon="map" items={listing.nearbyAttractions} />

            <iframe src={listing.mapEmbedUrl} className="w-full h-[450px] rounded-2xl" />

        </div>
            <StickyBookingBar onClick={() => setIsPopupOpen(true)} icon={<BiCalendarCheck />} />
        </div>
    );
}