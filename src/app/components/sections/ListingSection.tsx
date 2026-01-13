"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    HiOutlineLocationMarker,
    HiOutlineHome,
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
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="overline">Our Properties</span>
                <h2 id="listings-heading" className="heading mt-3">
                    Available Furnished Rentals
                </h2>
                <p className="paragraph mt-4">
                    Explore our collection of premium furnished properties in Windsor,
                    each thoughtfully designed for comfort and convenience.
                </p>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-neutral-200 rounded-3xl h-72" />
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
                {listings.map((listing) => (
                    <article
                        key={listing.id}
                        className="group"
                    >
                        <Link
                            href={`/listing/${listing.id}`}
                            className="block bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-xl transition-all duration-500 hover:-translate-y-2"
                            aria-label={`View details for ${listing.title}`}
                        >
                            {/* Image Container */}
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    src={listing.photos[0] || "/placeholder.jpg"}
                                    alt={`${listing.title} - Premium furnished rental in Windsor`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Price Badge */}
                                <div className="absolute top-4 left-4">
                                    <div className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-soft">
                                        <span className="text-lg font-bold text-primary-600">
                                            {listing.price}
                                        </span>
                                        <span className="text-sm text-neutral-500 ml-1">
                                            /month
                                        </span>
                                    </div>
                                </div>

                                {/* View Property Button */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-neutral-900 text-sm font-semibold shadow-lg">
                                        View Property
                                        <HiOutlineArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Location */}
                                <div className="flex items-center gap-1.5 text-sm text-neutral-500 mb-2">
                                    <HiOutlineLocationMarker className="w-4 h-4 text-primary-500" />
                                    <span>Windsor, Ontario</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors duration-300">
                                    {listing.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-2 text-neutral-600 text-sm leading-relaxed line-clamp-2">
                                    {listing.description}
                                </p>

                                {/* Divider */}
                                <div className="mt-5 pt-5 border-t border-neutral-100">
                                    {/* Property Features */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5">
                                                <IoBedOutline className="w-5 h-5 text-neutral-400" />
                                                <span className="text-sm font-medium text-neutral-700">
                                                    {listing.bedrooms} Beds
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <IoWaterOutline className="w-5 h-5 text-neutral-400" />
                                                <span className="text-sm font-medium text-neutral-700">
                                                    {listing.bathrooms} Baths
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <TbRulerMeasure className="w-5 h-5 text-neutral-400" />
                                            <span className="text-sm font-medium text-neutral-700">
                                                {listing.size}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>

            {/* Bottom CTA */}
            {listings.length > 0 && (
                <div className="mt-16 text-center">
                    <p className="text-neutral-600 mb-4">
                        Can&apos;t find what you&apos;re looking for?
                    </p>
                    <a
                        href="#contact"
                        className="btn-secondary"
                    >
                        <HiOutlineHome className="w-5 h-5" />
                        Contact Us for Custom Options
                    </a>
                </div>
            )}
        </section>
    );
};

export default PropertyList;
