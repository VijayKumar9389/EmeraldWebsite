"use client";

interface Props {
    onClick: () => void;
    icon: React.ReactNode;
}

export default function StickyBookingBar({ onClick, icon }: Props) {
    return (
        <div className="sticky bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-200 shadow-xl">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end">
                <button onClick={onClick} className="btn-primary flex items-center gap-2">
                    Book Now {icon}
                </button>
            </div>
        </div>
    );
}