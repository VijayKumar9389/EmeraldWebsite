"use client";

import { useState } from "react";
import Link from "next/link";
import BookingPopup from "./components/ReservationForm";
import PhotoGallery from "./components/PhotoGallery";
import DetailsGrid from "./components/DetailsGrid";
import SectionList from "./components/SectionList";
import StickyBookingBar from "./components/StickyBookingBar";
import ListingContactForm from "./components/ContactForm";
import {
    HiOutlineLocationMarker,
    HiOutlineHome,
    HiOutlineCalendar,
    HiOutlineChevronRight,
} from "react-icons/hi";
import { Listing } from "@/app/types";

interface Props {
    listing: Listing;
}

export default function ListingClient({ listing }: Props) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const shortTitle = listing.title.split(",")[0];

    return (
        <>
            {/* Booking Modal */}
            {isPopupOpen && (
                <BookingPopup
                    isOpen={isPopupOpen}
                    listingTitle={listing.title}
                    listingId={listing.id}
                    onClose={() => setIsPopupOpen(false)}
                />
            )}

            <main className="pt-8 pb-24">
                {/* Breadcrumb */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
                        <Link
                            href="/"
                            className="text-neutral-500 hover:text-primary-600 transition-colors"
                        >
                            Home
                        </Link>
                        <HiOutlineChevronRight className="w-4 h-4 text-neutral-400" />
                        <Link
                            href="/#listings"
                            className="text-neutral-500 hover:text-primary-600 transition-colors"
                        >
                            Properties
                        </Link>
                        <HiOutlineChevronRight className="w-4 h-4 text-neutral-400" />
                        <span className="text-neutral-900 font-medium">{shortTitle}</span>
                    </nav>
                </div>

                {/* Hero Header */}
                <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div>
                            {/* Property Type Badge */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium">
                                    <HiOutlineHome className="w-4 h-4" />
                                    {listing.propertyType}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-sm font-medium">
                                    <HiOutlineCalendar className="w-4 h-4" />
                                    {listing.availability}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
                                {shortTitle}
                            </h1>

                            {/* Location */}
                            <div className="flex items-center gap-2 mt-3 text-neutral-600">
                                <HiOutlineLocationMarker className="w-5 h-5 text-primary-500" />
                                <span className="text-lg">
                                    {listing.location.neighborhood}, {listing.location.city},{" "}
                                    {listing.location.state} {listing.location.zip}
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="lg:text-right">
                            <div className="inline-flex items-baseline gap-2 px-6 py-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                                <span className="text-4xl font-bold text-primary-600">
                                    {listing.price}
                                </span>
                                <span className="text-neutral-500 text-lg">/ night</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Photo Gallery */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <PhotoGallery photos={listing.photos} title={shortTitle} />
                </section>

                {/* Content Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* About Section */}
                            <section>
                                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                                    About this property
                                </h2>
                                <p className="text-neutral-600 text-lg leading-relaxed">
                                    {listing.description}
                                </p>
                            </section>

                            {/* Details Grid */}
                            <DetailsGrid listing={listing} />

                            {/* Amenities */}
                            <SectionList
                                title="Amenities"
                                icon="check"
                                items={listing.amenities}
                            />

                            {/* Features */}
                            <SectionList
                                title="Property Features"
                                icon="star"
                                items={listing.features}
                            />

                            {/* Nearby Attractions */}
                            <SectionList
                                title="Nearby Attractions"
                                icon="map"
                                items={listing.nearbyAttractions}
                            />

                            {/* Map */}
                            <section>
                                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                                    Location
                                </h2>
                                <div className="rounded-2xl overflow-hidden shadow-soft border border-neutral-100">
                                    <iframe
                                        src={listing.mapEmbedUrl}
                                        className="w-full h-[400px]"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`Map showing location of ${shortTitle}`}
                                    />
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="sticky top-6 space-y-6">
                                {/* Quick Book Card */}
                                <div className="bg-white rounded-2xl shadow-soft-lg border border-neutral-100 p-6">
                                    <div className="text-center mb-6">
                                        <div className="text-3xl font-bold text-primary-600">
                                            {listing.price}
                                            <span className="text-lg font-normal text-neutral-500">
                                                {" "}
                                                / night
                                            </span>
                                        </div>
                                        <p className="text-sm text-neutral-500 mt-1">
                                            Minimum stay requirements may apply
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setIsPopupOpen(true)}
                                        className="btn-primary w-full justify-center mb-4"
                                    >
                                        <HiOutlineCalendar className="w-5 h-5" />
                                        Reserve Now
                                    </button>

                                    <p className="text-center text-sm text-neutral-500">
                                        Free cancellation available
                                    </p>
                                </div>

                                {/* Contact Card */}
                                <ListingContactForm
                                    listingId={listing.id}
                                    listingTitle={listing.title}
                                />

                                {/* Property Highlights */}
                                <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                                    <h3 className="font-semibold text-neutral-900 mb-4">
                                        Property Highlights
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-sm text-neutral-700">
                                            <span className="w-2 h-2 rounded-full bg-primary-500" />
                                            {listing.bedrooms} Bedrooms, {listing.bathrooms} Bathrooms
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-neutral-700">
                                            <span className="w-2 h-2 rounded-full bg-primary-500" />
                                            {listing.size} living space
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-neutral-700">
                                            <span className="w-2 h-2 rounded-full bg-primary-500" />
                                            {listing.propertyType} in {listing.location.neighborhood}
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-neutral-700">
                                            <span className="w-2 h-2 rounded-full bg-primary-500" />
                                            {listing.availability}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            {/* Sticky Booking Bar */}
            <StickyBookingBar
                price={listing.price}
                onClick={() => setIsPopupOpen(true)}
            />
        </>
    );
}
