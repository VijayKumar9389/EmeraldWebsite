"use client";
import { useState } from "react";
import Image from "next/image";

interface Props {
    photos: string[];
}

export default function PhotoGallery({ photos }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const showNext = () => setCurrentIndex((prev) => (prev + 1) % photos.length);
    const showPrev = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

    return (
        <div className="space-y-5">
            <div className="relative w-full h-[480px] md:h-[620px] rounded-2xl overflow-hidden shadow-xl">
                <Image src={photos[currentIndex]} alt="Main" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                <button onClick={showPrev} className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/30 p-4 rounded-full">‹</button>
                <button onClick={showNext} className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/30 p-4 rounded-full">›</button>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                {photos.map((src, i) => (
                    <div key={i} className={`relative h-28 rounded-xl overflow-hidden border-2 cursor-pointer ${i === currentIndex ? "border-emerald-500" : "border-transparent"}`} onClick={() => setCurrentIndex(i)}>
                        <Image src={src} alt="" fill className="object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
}