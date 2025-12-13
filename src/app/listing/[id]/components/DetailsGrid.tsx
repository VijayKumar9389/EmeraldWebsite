"use client";
import { FaBed, FaBath } from "react-icons/fa";
import { FaRulerCombined } from "react-icons/fa6";
import { Listing } from "@/app/types";

interface Props {
    listing: Listing;
}

export default function DetailsGrid({ listing }: Props) {
    const renderDetailItem = (Icon: any, label: string, value: string | number) => (
        <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
            <div className="w-12 h-12 rounded-lg border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-lg font-semibold text-gray-800">{value}</p>
                <p className="text-gray-500 text-sm">{label}</p>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {renderDetailItem(FaBed, "Bedrooms", `${listing.bedrooms} Beds`)}
            {renderDetailItem(FaBath, "Bathrooms", `${listing.bathrooms} Baths`)}
            {renderDetailItem(FaRulerCombined, "Size", listing.size)}
        </div>
    );
}