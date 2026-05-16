"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    HiOutlineCheck,
    HiOutlineBadgeCheck,
} from "react-icons/hi";

import promoOne from "@/assets/promo/promoOne.jpg";

const highlights = [
    "All-inclusive pricing with no hidden fees",
    "Fully furnished with premium amenities",
    "Flexible lease terms from weekly stays",
    "Responsive guest support",
    "Prime locations near business centers",
    "Professional cleaning and maintenance",
];

export default function AboutSection() {
    return (
        <section id="about" className="py-24 bg-neutral-50" aria-labelledby="about-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-soft-lg">
                            <Image
                                src={promoOne}
                                alt="Luxury interior of Emerald Executive Housing"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                        {/* Floating Card */}
                        <div className="absolute -bottom-6 -right-6 lg:right-8 bg-white rounded-2xl shadow-soft-lg p-6 max-w-[260px]">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
                                    <HiOutlineBadgeCheck className="w-7 h-7 text-primary-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-neutral-900">5+</div>
                                    <div className="text-sm text-neutral-500">Years of Excellence</div>
                                </div>
                            </div>
                            <p className="text-sm text-neutral-600">
                                Trusted by professionals and families across Windsor
                            </p>
                        </div>
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="overline">About Us</span>
                        <h2 id="about-heading" className="heading mt-3">
                            Redefining Executive Living in Windsor
                        </h2>
                        <p className="paragraph mt-6">
                            Emerald Executive Housing provides premium furnished rentals for
                            discerning professionals, relocating families, and extended-stay
                            guests. Our properties combine the comfort of home with the
                            convenience of a hotel, offering a seamless living experience in
                            Windsor&apos;s most desirable neighborhoods.
                        </p>
                        <p className="text-neutral-600 mt-4 mb-8">
                            Whether you&apos;re in town for a business project, medical treatment,
                            or transitioning to a new home, we provide the perfect temporary
                            residence with flexible terms and exceptional service.
                        </p>

                        {/* Highlights Grid */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {highlights.map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                                        <HiOutlineCheck className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <span className="text-neutral-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
