"use client";

import React from "react";
import Image from "next/image";
import { FaClock, FaDollarSign, FaCouch, FaShieldAlt, FaMapMarkerAlt } from "react-icons/fa";
import promoOne from "@/assets/promo/promoOne.jpg";
import promoTwo from "@/assets/promo/promoTwo.jpg";
import SectionHeader from "@/app/components/Heading/Heading";

const blockOne = [
    {
        icon: <FaShieldAlt className="text-primary-color" />,
        title: "Why Choose Emerald Executive Housing?",
        description:
            "We deliver exceptional service and ensure a comfortable, memorable stay for every guest.",
    },
    {
        icon: <FaMapMarkerAlt className="text-primary-color" />,
        title: "Prime Windsor Locations",
        description:
            "Near downtown, EC Row Expressway, shopping districts, and waterfront areas.",
    },
    {
        icon: <FaClock className="text-primary-color" />,
        title: "Flexible Stay Options",
        description:
            "Short-term or long-term rentals tailored to your schedule and needs.",
    },
];

const blockTwo = [
    {
        icon: <FaDollarSign className="text-primary-color" />,
        title: "Affordable & Competitive Rates",
        description:
            "Premium accommodations at fair prices for unmatched value and comfort.",
    },
    {
        icon: <FaShieldAlt className="text-primary-color" />,
        title: "Safe & Secure",
        description:
            "Security cameras, smoke/CO alarms, and secure entry points in every property.",
    },
    {
        icon: <FaCouch className="text-primary-color" />,
        title: "Fully Equipped Amenities",
        description:
            "Modern kitchens, in-unit laundry, WiFi, entertainment, patios, and more.",
    },

];

const ServicesSection = () => {
    return (
        <section className="py-20">
            <SectionHeader
                title="Why Choose Us?"
                subtitle="Designed for comfort, convenience, and an elevated rental experience."
            />

            {/* ROW 1 */}
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image Left */}
                <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
                    <Image src={promoOne} alt="Services" fill className="object-cover" />
                </div>

                {/* Points Right */}
                <div className="space-y-6">
                    {blockOne.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-5 p-5 border border-gray-200 rounded-2xl"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl border border-primary-color bg-white flex items-center justify-center text-primary-color text-2xl transition-transform duration-300 hover:scale-110">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="subheading text-text-color">{item.title}</h3>
                                <p className="text-light mt-1">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ROW 2 */}
            <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Points Left */}
                <div className="order-2 lg:order-1 space-y-6">
                    {blockTwo.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-5 p-5 border border-gray-200 rounded-2xl"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl border border-primary-color bg-white flex items-center justify-center text-primary-color text-2xl transition-transform duration-300 hover:scale-110">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="subheading text-text-color">{item.title}</h3>
                                <p className="text-light mt-1">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Image Right */}
                <div className="relative w-full h-[600px] rounded-xl overflow-hidden order-1 lg:order-2">
                    <Image src={promoTwo} alt="Premium Rentals" fill className="object-cover" />
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;