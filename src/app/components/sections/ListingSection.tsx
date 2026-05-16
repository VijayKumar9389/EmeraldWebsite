"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    HiOutlineLocationMarker,
    HiOutlineArrowRight,
} from "react-icons/hi";
import { IoBedOutline, IoWaterOutline } from "react-icons/io5";
import { TbRulerMeasure } from "react-icons/tb";

interface ListingDTO {
    id: number;
    title: string;
    price: string;
    description: string;
    bedrooms: number;
    bathrooms: number;
    size: string;
    propertyType: string;
    photos: string[];
}

const PropertyList: React.FC = () => {
    const [listings, setListings] = useState<ListingDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/data/listings.json")
            .then((res) => res.json())
            .then((data) => {
                setListings(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error loading listings:", err);
                setIsLoading(false);
            });
    }, []);

    return (
        <section
            id="listings"
            aria-labelledby="listings-heading"
            className="py-24"
        >
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto mb-16"
            >
                <span className="overline">Our Properties</span>
                <h2 id="listings-heading" className="heading mt-3">
                    Available Furnished Rentals
                </h2>
                <p className="paragraph mt-4">
                    Explore our collection of premium furnished properties in Windsor,
                    each thoughtfully designed for comfort and convenience.
                </p>
            </motion.div>

            {/* Loading State */}
            {isLoading && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-neutral-200 rounded-2xl h-72" />
                            <div className="p-6 space-y-4">
                                <div className="h-6 bg-neutral-200 rounded w-1/3" />
                                <div className="h-4 bg-neutral-200 rounded w-2/3" />
                                <div className="h-4 bg-neutral-200 rounded w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Property Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing, index) => (
                    <motion.article
                        key={listing.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group"
                    >
                        <Link
                            href={`/listing/${listing.id}`}
                            className="block bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-xl transition-all duration-500 hover:-translate-y-2"
                            aria-label={`View details for ${listing.title}`}
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={listing.photos[0] || "/placeholder.jpg"}
                                    alt={`${listing.title} - Premium furnished rental in Windsor`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/20 to-transparent" />

                                {/* Property Type Badge - Top Left */}
                                <div className="absolute top-4 left-4">
                                    <span className="inline-block px-3 py-1.5 bg-primary-600 text-white text-xs font-semibold rounded-full">
                                        {listing.propertyType}
                                    </span>
                                </div>

                                {/* View Property Button - Bottom Right (on hover) */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-neutral-900 text-sm font-semibold shadow-lg">
                                        View
                                        <HiOutlineArrowRight className="w-4 h-4" />
                                    </span>
                                </div>

                                {/* Price - Bottom Left */}
                                <div className="absolute bottom-4 left-4">
                                    <p className="text-white/80 text-sm mb-0.5">Starting from</p>
                                    <p className="text-white text-2xl font-bold">
                                        {listing.price}
                                        <span className="text-sm font-normal opacity-90">/night</span>
                                    </p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                {/* Title */}
                                <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors duration-300 mb-2">
                                    {listing.title.split(",")[0]}
                                </h3>

                                {/* Location */}
                                <div className="flex items-center gap-1.5 text-sm text-neutral-500 mb-4">
                                    <HiOutlineLocationMarker className="w-4 h-4 text-primary-500" />
                                    <span>Windsor, Ontario</span>
                                </div>

                                {/* Property Features */}
                                <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
                                    <div className="flex items-center gap-1.5">
                                        <IoBedOutline className="w-4 h-4 text-primary-500" />
                                        <span className="text-sm text-neutral-600">
                                            {listing.bedrooms} Beds
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <IoWaterOutline className="w-4 h-4 text-primary-500" />
                                        <span className="text-sm text-neutral-600">
                                            {listing.bathrooms} Baths
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <TbRulerMeasure className="w-4 h-4 text-primary-500" />
                                        <span className="text-sm text-neutral-600">
                                            {listing.size}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </div>
        </section>
    );
};

export default PropertyList;
