"use client";

import { motion } from "framer-motion";
import { HiOutlineLocationMarker } from "react-icons/hi";

interface Props {
    title: string;
    variant: "pills" | "list" | "highlights";
    items: string[];
    delay?: number;
}

export default function SectionList({ title, variant, items, delay = 0 }: Props) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        >
            <h2 className="text-xl font-heading font-bold text-neutral-900 mb-4">
                {title}
            </h2>

            {variant === "pills" && (
                // Pills/Tags layout for amenities
                <div className="flex flex-wrap gap-2">
                    {items.map((item, i) => (
                        <span
                            key={i}
                            className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            )}

            {variant === "list" && (
                // Simple list with dots for features
                <div className="grid sm:grid-cols-2 gap-3">
                    {items.map((item, i) => (
                        <div key={i} className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                            <span className="text-neutral-700">{item}</span>
                        </div>
                    ))}
                </div>
            )}

            {variant === "highlights" && (
                // Card-style highlights for nearby attractions
                <div className="grid sm:grid-cols-2 gap-3">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg"
                        >
                            <HiOutlineLocationMarker className="w-5 h-5 text-primary-600 flex-shrink-0" />
                            <span className="text-neutral-700">{item}</span>
                        </div>
                    ))}
                </div>
            )}
        </motion.section>
    );
}
