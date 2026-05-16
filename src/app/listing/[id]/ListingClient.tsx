"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BookingPopup from "./components/ReservationForm";
import PhotoGallery from "./components/PhotoGallery";
import DetailsGrid from "./components/DetailsGrid";
import SectionList from "./components/SectionList";
import StickyBookingBar from "./components/StickyBookingBar";
import ListingContactForm from "./components/ContactForm";
import {
    HiOutlineLocationMarker,
    HiOutlineCalendar,
} from "react-icons/hi";
import { Listing } from "@/app/types";

interface Props {
    listing: Listing;
}

export default function ListingClient({ listing }: Props) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const shortTitle = listing.title.split(",")[0];

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        // Backup scroll after a short delay in case of layout shifts
        const timeout = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
        }, 100);
        return () => clearTimeout(timeout);
    }, []);

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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-neutral-500 mb-8">
                        <Link href="/" className="hover:text-primary-600 transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/#listings" className="hover:text-primary-600 transition-colors">
                            Properties
                        </Link>
                        <span>/</span>
                        <span className="text-neutral-900">{shortTitle}</span>
                    </nav>

                    {/* Hero Header */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col md:flex-row md:items-end md:justify-between mb-10"
                    >
                        <div>
                            {/* Property Type Badge */}
                            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
                                {listing.propertyType}
                            </span>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-3">
                                {shortTitle}
                            </h1>

                            {/* Location */}
                            <div className="flex items-center text-neutral-500">
                                <HiOutlineLocationMarker className="w-5 h-5 mr-2 text-primary-500" />
                                <span>
                                    {listing.location.neighborhood}, {listing.location.city},{" "}
                                    {listing.location.state} {listing.location.zip}
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mt-6 md:mt-0 md:text-right">
                            <p className="text-neutral-500 text-sm mb-1">Starting from</p>
                            <p className="text-3xl font-bold text-neutral-900">
                                {listing.price}
                                <span className="text-lg font-normal text-neutral-500">/night</span>
                            </p>
                        </div>
                    </motion.header>
                </div>

                {/* Photo Gallery */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
                >
                    <PhotoGallery photos={listing.photos} title={shortTitle} />
                </motion.section>

                {/* Content Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Details Grid */}
                            <DetailsGrid listing={listing} />

                            {/* Nearby Attractions */}
                            <SectionList
                                title="What's Nearby"
                                variant="highlights"
                                items={listing.nearbyAttractions}
                                delay={0.3}
                            />

                            {/* About Section */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <h2 className="text-xl font-heading font-bold text-neutral-900 mb-4">
                                    About
                                </h2>
                                <p className="text-neutral-600 leading-relaxed">
                                    {listing.description}
                                </p>
                            </motion.section>

                            {/* Features */}
                            <SectionList
                                title="Features"
                                variant="list"
                                items={listing.features}
                                delay={0.1}
                            />

                            {/* Amenities */}
                            <SectionList
                                title="Amenities"
                                variant="pills"
                                items={listing.amenities}
                                delay={0.1}
                            />

                            {/* Map */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <h2 className="text-xl font-heading font-bold text-neutral-900 mb-4">
                                    Location
                                </h2>
                                <div className="bg-neutral-50 rounded-xl p-6">
                                    <p className="font-semibold text-neutral-900 mb-1">
                                        {listing.location.neighborhood}
                                    </p>
                                    <p className="text-neutral-600 mb-4">
                                        {listing.title}, {listing.location.city}, {listing.location.state} {listing.location.zip}
                                    </p>
                                    <div className="rounded-lg overflow-hidden">
                                        <iframe
                                            src={listing.mapEmbedUrl}
                                            className="w-full aspect-video"
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title={`Map showing location of ${shortTitle}`}
                                        />
                                    </div>
                                </div>
                            </motion.section>
                        </div>

                        {/* Sidebar */}
                        <motion.aside
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="lg:col-span-1"
                        >
                            <div className="sticky top-28 space-y-6">
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
                            </div>
                        </motion.aside>
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
