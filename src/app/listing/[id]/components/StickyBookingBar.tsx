"use client";

import { HiOutlineCalendar } from "react-icons/hi";

interface Props {
    price: string;
    onClick: () => void;
}

export default function StickyBookingBar({ price, onClick }: Props) {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
            <div className="bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-soft-xl">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                        {/* Price */}
                        <div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-primary-600">
                                    {price}
                                </span>
                                <span className="text-neutral-500">/ night</span>
                            </div>
                            <p className="text-xs text-neutral-500">
                                Minimum stay may apply
                            </p>
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={onClick}
                            className="btn-primary"
                        >
                            <HiOutlineCalendar className="w-5 h-5" />
                            Reserve
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
