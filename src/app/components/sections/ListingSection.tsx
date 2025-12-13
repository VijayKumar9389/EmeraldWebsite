'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaBath, FaBed } from 'react-icons/fa';
import { FaTableList } from 'react-icons/fa6';
import SectionHeader from '@/app/components/layout/Heading';

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
    const router = useRouter();

    useEffect(() => {
        fetch('/data/listings.json')
            .then((res) => res.json())
            .then((data) => setListings(data))
            .catch((err) => console.error('Error loading listings:', err));
    }, []);

    const selectListing = (id: number) => {
        router.push(`/listing/${id}`); // ✅ Navigate to listing page
    };

    return (
        <section>
            <SectionHeader
                title="Our Listings"
                subtitle="Whether you're searching for a cozy apartment or a spacious family home, we have a range of rental properties to meet your needs."
            />

            <div className="listing-content mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                {listings.map((listing) => (
                    <div
                        key={listing.id}
                        className="property-card group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer flex flex-col transition-transform duration-300 hover:scale-[1.02]"
                        onClick={() => selectListing(listing.id)}
                    >
                        {/* Image */}
                        <div className="property-image relative h-72 overflow-hidden rounded-t-lg">
                            <Image
                                src={listing.photos[0] || '/placeholder.jpg'}
                                alt={listing.title}
                                fill
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Overlay triggered by whole card hover */}
                            <div className="
                                absolute inset-0 bg-black/30 opacity-0
                                flex items-center justify-center
                                transition-opacity duration-500
                                group-hover:opacity-100
                            ">
                                <span className="text-white text-lg font-semibold tracking-wide">
                                    View
                                </span>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="property-details flex flex-col p-6 flex-1 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            {/* Price */}
                            <p className="property-price text-2xl font-extrabold text-primary-color mb-2">
                                {listing.price}
                                <span className="text-text-light font-medium text-sm ml-2">/ month</span>
                            </p>

                            {/* Title */}
                            <h3 className="subheading text-text-color">
                                {listing.title.split(',')[0]}
                            </h3>

                            {/* Description */}
                            <p className="text-text-light mb-4 line-clamp-3">
                                {listing.description}
                            </p>

                            {/* Info grid */}
                            <div className="property-info-grid grid grid-cols-3 overflow-hidden divide-x divide-gray-200 border-t border-gray-200 mt-auto">
                                <div className="info-item flex flex-col items-center justify-center py-4 text-text-light text-sm">
                                    <FaBed className="text-primary-color w-5 h-5 mb-1" />
                                    <span>{listing.bedrooms} Beds</span>
                                </div>
                                <div className="info-item flex flex-col items-center justify-center py-4 text-text-light text-sm">
                                    <FaBath className="text-primary-color w-5 h-5 mb-1" />
                                    <span>{listing.bathrooms} Baths</span>
                                </div>
                                <div className="info-item flex flex-col items-center justify-center py-4 text-text-light text-sm">
                                    <FaTableList className="text-primary-color w-5 h-5 mb-1" />
                                    <span>{listing.size}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PropertyList;