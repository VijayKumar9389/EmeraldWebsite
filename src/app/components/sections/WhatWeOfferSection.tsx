"use client";

import { motion } from "framer-motion";
import {
    HiOutlineWifi,
    HiOutlineTruck,
    HiOutlineSparkles,
    HiOutlineHome,
    HiOutlineShieldCheck,
    HiOutlineClock,
} from "react-icons/hi";

const features = [
    {
        icon: HiOutlineWifi,
        title: "High-Speed WiFi",
        description:
            "Lightning-fast internet perfect for remote work, video calls, and streaming entertainment.",
    },
    {
        icon: HiOutlineTruck,
        title: "Parking Included",
        description:
            "Secure parking available at all properties. Select units include covered or underground options.",
    },
    {
        icon: HiOutlineSparkles,
        title: "Professional Cleaning",
        description:
            "Arrive to a spotless home. Regular housekeeping available for extended stays.",
    },
    {
        icon: HiOutlineHome,
        title: "Fully Equipped Kitchen",
        description:
            "Modern appliances, cookware, and everything you need to prepare meals at home.",
    },
    {
        icon: HiOutlineClock,
        title: "Flexible Lease Terms",
        description:
            "Short-term or extended rentals tailored to your schedule with hassle-free booking options.",
    },
    {
        icon: HiOutlineShieldCheck,
        title: "Safe & Secure",
        description:
            "Secure entry systems, well-lit premises, and safe neighborhoods for peace of mind.",
    },
];

export default function WhatWeOfferSection() {
    return (
        <section id="services" className="py-24 bg-white" aria-labelledby="services-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="overline">What We Offer</span>
                    <h2 id="services-heading" className="heading mt-3">
                        Premium Amenities for Comfortable Living
                    </h2>
                    <p className="paragraph mt-4">
                        Every Emerald Executive property comes equipped with thoughtfully
                        curated amenities designed to make your stay seamless and enjoyable.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group p-8 rounded-2xl bg-neutral-50 hover:bg-primary-50 border border-transparent hover:border-primary-100 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-xl bg-primary-100 group-hover:bg-primary-600 flex items-center justify-center mb-6 transition-colors duration-300">
                                <feature.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-neutral-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-neutral-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
