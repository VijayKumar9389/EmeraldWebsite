"use client";

import React from "react";
import Image from "next/image";
import {
    HiOutlineShieldCheck,
    HiOutlineLocationMarker,
    HiOutlineClock,
    HiOutlineCurrencyDollar,
    HiOutlineHome,
    HiOutlineSparkles,
} from "react-icons/hi";

import promoOne from "@/assets/promo/promoOne.jpg";
import promoTwo from "@/assets/promo/promoTwo.jpg";

const features = [
    {
        icon: HiOutlineShieldCheck,
        title: "Trusted & Reliable",
        description:
            "Premium furnished rentals with consistently exceptional service and a commitment to guest comfort.",
    },
    {
        icon: HiOutlineLocationMarker,
        title: "Prime Locations",
        description:
            "Strategically located near downtown Windsor, EC Row Expressway, shopping districts, and the waterfront.",
    },
    {
        icon: HiOutlineClock,
        title: "Flexible Stays",
        description:
            "Short-term or extended rentals tailored to your schedule with hassle-free booking options.",
    },
    {
        icon: HiOutlineCurrencyDollar,
        title: "Competitive Rates",
        description:
            "Luxury executive housing at transparent, competitive rates without compromising on quality.",
    },
    {
        icon: HiOutlineShieldCheck,
        title: "Safe & Secure",
        description:
            "All properties feature security cameras, smart locks, smoke and CO alarms for your peace of mind.",
    },
    {
        icon: HiOutlineHome,
        title: "Fully Equipped",
        description:
            "Modern kitchens, in-unit laundry, high-speed WiFi, smart TVs, and premium linens included.",
    },
];

const ServicesSection = () => {
    return (
        <section
            id="services"
            className="py-24"
            aria-labelledby="services-heading"
        >
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="overline">Why Choose Us</span>
                <h2 id="services-heading" className="heading mt-3">
                    The Emerald Executive Difference
                </h2>
                <p className="paragraph mt-4">
                    Experience thoughtfully designed spaces with premium amenities,
                    exceptional service, and the flexibility modern professionals demand.
                </p>
            </div>

            {/* Feature Grid - First Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Image */}
                <div className="relative group order-1">
                    <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-soft-lg">
                        <Image
                            src={promoOne}
                            alt="Fully furnished executive rental suite in Windsor Ontario"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent" />
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -bottom-6 -right-6 lg:right-8 bg-white rounded-2xl shadow-soft-lg p-6 max-w-xs">
                        <div className="flex items-center gap-3">
                            <div className="icon-container-lg">
                                <HiOutlineSparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="font-semibold text-neutral-900">Move-In Ready</div>
                                <div className="text-sm text-neutral-500">Fully furnished & equipped</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="space-y-4 order-2">
                    {features.slice(0, 3).map((feature, idx) => (
                        <article
                            key={idx}
                            className="group flex items-start gap-5 p-6 rounded-2xl bg-white border border-neutral-100 shadow-soft hover:shadow-soft-lg hover:border-primary-100 transition-all duration-300"
                        >
                            <div className="flex-shrink-0 icon-container-lg group-hover:bg-primary-100 transition-colors duration-300">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-neutral-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Feature Grid - Second Row */}
            <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Features */}
                <div className="space-y-4 order-2 lg:order-1">
                    {features.slice(3, 6).map((feature, idx) => (
                        <article
                            key={idx}
                            className="group flex items-start gap-5 p-6 rounded-2xl bg-white border border-neutral-100 shadow-soft hover:shadow-soft-lg hover:border-primary-100 transition-all duration-300"
                        >
                            <div className="flex-shrink-0 icon-container-lg group-hover:bg-primary-100 transition-colors duration-300">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-neutral-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Image */}
                <div className="relative group order-1 lg:order-2">
                    <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-soft-lg">
                        <Image
                            src={promoTwo}
                            alt="Luxury executive housing with modern amenities in Windsor Ontario"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent" />
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -bottom-6 -left-6 lg:left-8 bg-white rounded-2xl shadow-soft-lg p-6 max-w-xs">
                        <div className="flex items-center gap-3">
                            <div className="icon-container-lg bg-accent-50 text-accent-600">
                                <HiOutlineLocationMarker className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="font-semibold text-neutral-900">Prime Location</div>
                                <div className="text-sm text-neutral-500">Windsor, Ontario</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-20 text-center">
                <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
                    <p className="text-neutral-700">
                        Ready to experience premium executive housing?
                    </p>
                    <a
                        href="#listings"
                        className="btn-primary"
                    >
                        Browse Properties
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
