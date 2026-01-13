"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineX } from "react-icons/hi";
import { IoExpand } from "react-icons/io5";

interface Props {
    photos: string[];
    title: string;
}

export default function PhotoGallery({ photos, title }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const showNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, [photos.length]);

    const showPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    }, [photos.length]);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setIsLightboxOpen(true);
    };

    return (
        <>
            {/* Main Gallery */}
            <div className="space-y-4">
                {/* Main Image */}
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-soft-lg group">
                    <Image
                        src={photos[currentIndex]}
                        alt={`${title} - Photo ${currentIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Navigation Buttons */}
                    <button
                        onClick={showPrev}
                        className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-soft flex items-center justify-center text-neutral-700 hover:text-neutral-900 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        aria-label="Previous photo"
                    >
                        <HiOutlineChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={showNext}
                        className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-soft flex items-center justify-center text-neutral-700 hover:text-neutral-900 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        aria-label="Next photo"
                    >
                        <HiOutlineChevronRight className="w-6 h-6" />
                    </button>

                    {/* Expand Button */}
                    <button
                        onClick={() => openLightbox(currentIndex)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/90 hover:bg-white shadow-soft flex items-center justify-center text-neutral-700 hover:text-neutral-900 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        aria-label="View fullscreen"
                    >
                        <IoExpand className="w-5 h-5" />
                    </button>

                    {/* Photo Counter */}
                    <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-soft">
                        <span className="text-sm font-medium text-neutral-700">
                            {currentIndex + 1} / {photos.length}
                        </span>
                    </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
                    {photos.slice(0, 8).map((src, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-200 ${
                                i === currentIndex
                                    ? "ring-2 ring-primary-500 ring-offset-2"
                                    : "hover:opacity-80"
                            }`}
                            aria-label={`View photo ${i + 1}`}
                        >
                            <Image
                                src={src}
                                alt={`${title} thumbnail ${i + 1}`}
                                fill
                                className="object-cover"
                                sizes="100px"
                            />
                            {i === 7 && photos.length > 8 && (
                                <div
                                    className="absolute inset-0 bg-neutral-900/60 flex items-center justify-center cursor-pointer"
                                    onClick={() => openLightbox(7)}
                                >
                                    <span className="text-white font-semibold">
                                        +{photos.length - 8}
                                    </span>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-50 bg-neutral-900/95 flex items-center justify-center"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                        aria-label="Close lightbox"
                    >
                        <HiOutlineX className="w-6 h-6" />
                    </button>

                    {/* Navigation */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            showPrev();
                        }}
                        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        aria-label="Previous photo"
                    >
                        <HiOutlineChevronLeft className="w-8 h-8" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            showNext();
                        }}
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        aria-label="Next photo"
                    >
                        <HiOutlineChevronRight className="w-8 h-8" />
                    </button>

                    {/* Image */}
                    <div
                        className="relative w-full h-full max-w-6xl max-h-[85vh] mx-auto px-20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={photos[currentIndex]}
                            alt={`${title} - Photo ${currentIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                    </div>

                    {/* Counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm">
                        <span className="text-white font-medium">
                            {currentIndex + 1} / {photos.length}
                        </span>
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto px-4 py-2">
                        {photos.map((src, i) => (
                            <button
                                key={i}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(i);
                                }}
                                className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                                    i === currentIndex
                                        ? "ring-2 ring-white opacity-100"
                                        : "opacity-50 hover:opacity-75"
                                }`}
                            >
                                <Image
                                    src={src}
                                    alt={`Thumbnail ${i + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
