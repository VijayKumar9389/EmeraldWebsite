"use client";

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
            value: `${listing.bedrooms}`,
            label: "Bedrooms",
            sublabel: listing.bedrooms === 1 ? "Bedroom" : "Bedrooms",
        },
        {
            icon: IoWaterOutline,
            value: `${listing.bathrooms}`,
            label: "Bathrooms",
            sublabel: listing.bathrooms === 1 ? "Bathroom" : "Bathrooms",
        },
        {
            icon: TbRulerMeasure,
            value: listing.size,
            label: "Living Space",
            sublabel: "Square Feet",
        },
    ];

    return (
        <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                Property Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {details.map((detail, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 p-5 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all duration-300"
                    >
                        <div className="icon-container-lg">
                            <detail.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-neutral-900">
                                {detail.value}
                            </p>
                            <p className="text-sm text-neutral-500">
                                {detail.sublabel}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
