"use client";
import { FaCheckCircle, FaStar, FaMapMarkerAlt } from "react-icons/fa";

interface Props {
    title: string;
    icon: "check" | "star" | "map";
    items: string[];
}

export default function SectionList({ title, icon, items }: Props) {
    const getIcon = () => {
        switch (icon) {
            case "check": return <FaCheckCircle className="text-emerald-600" />;
            case "star": return <FaStar className="text-yellow-500" />;
            case "map": return <FaMapMarkerAlt className="text-red-500" />;
        }
    };

    return (
        <section className="rounded-2xl p-8 bg-white shadow-md">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">{getIcon()} {title}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 text-lg">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                        {item}
                    </li>
                ))}
            </ul>
        </section>
    );
}