"use client";

import { motion } from "framer-motion";
import { IoBedOutline, IoWaterOutline } from "react-icons/io5";
import { TbRulerMeasure } from "react-icons/tb";
import { Listing } from "@/app/types";

interface Props {
    listing: Listing;
}

export default function DetailsGrid({ listing }: Props) {
    const details = [
        {
            icon: IoBedOutline,
            label: "Bedrooms",
            value: listing.bedrooms,
        },
        {
            icon: IoWaterOutline,
            label: "Bathrooms",
            value: listing.bathrooms,
        },
        {
            icon: TbRulerMeasure,
            label: "Square Feet",
            value: listing.size,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
            {details.map((detail, index) => (
                <div
                    key={index}
                    className="flex items-center p-4 bg-neutral-50 rounded-xl"
                >
                    <detail.icon className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0" />
                    <div>
                        <p className="text-sm text-neutral-500">{detail.label}</p>
                        <p className="font-semibold text-neutral-900">{detail.value}</p>
                    </div>
                </div>
            ))}
        </motion.div>
    );
}
