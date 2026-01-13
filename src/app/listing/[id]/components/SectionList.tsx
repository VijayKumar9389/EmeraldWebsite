"use client";

import {
    HiOutlineCheckCircle,
    HiOutlineStar,
    HiOutlineLocationMarker,
} from "react-icons/hi";

interface Props {
    title: string;
    icon: "check" | "star" | "map";
    items: string[];
}

const iconConfig = {
    check: {
        Icon: HiOutlineCheckCircle,
        bgColor: "bg-primary-50",
        textColor: "text-primary-600",
        dotColor: "bg-primary-500",
    },
    star: {
        Icon: HiOutlineStar,
        bgColor: "bg-accent-50",
        textColor: "text-accent-600",
        dotColor: "bg-accent-500",
    },
    map: {
        Icon: HiOutlineLocationMarker,
        bgColor: "bg-blue-50",
        textColor: "text-blue-600",
        dotColor: "bg-blue-500",
    },
};

export default function SectionList({ title, icon, items }: Props) {
    const config = iconConfig[icon];
    const { Icon, bgColor, textColor, dotColor } = config;

    return (
        <section className="rounded-2xl bg-white border border-neutral-100 shadow-soft overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-neutral-100 bg-neutral-50">
                <h2 className="flex items-center gap-3 text-xl font-semibold text-neutral-900">
                    <span className={`p-2 rounded-xl ${bgColor}`}>
                        <Icon className={`w-5 h-5 ${textColor}`} />
                    </span>
                    {title}
                </h2>
            </div>

            {/* Items Grid */}
            <div className="p-6">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {items.map((item, i) => (
                        <li
                            key={i}
                            className="flex items-center gap-3 text-neutral-700"
                        >
                            <span className={`w-2 h-2 rounded-full ${dotColor} flex-shrink-0`} />
                            <span className="text-base">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
