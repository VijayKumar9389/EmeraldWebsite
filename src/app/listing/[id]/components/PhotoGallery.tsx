"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isLightboxOpen) return;

            switch (e.key) {
                case "Escape":
                    closeLightbox();
                    break;
                case "ArrowRight":
                    showNext();
                    break;
                case "ArrowLeft":
                    showPrev();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isLightboxOpen, showNext, showPrev]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isLightboxOpen]);

    return (
        <>
            {/* Main Gallery */}
            <div className="space-y-4">
                {/* Main Image */}
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-soft-lg group">
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
                        className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-white/90 hover:bg-white shadow-soft flex items-center justify-center text-neutral-700 hover:text-neutral-900 transition-all duration-200 opacity-0 group-hover:opacity-100"
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
                            className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
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
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-neutral-900 flex flex-col"
                        onClick={closeLightbox}
                    >
                        {/* Header */}
                        <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
                            <div className="text-white/75 font-medium text-sm md:text-base">
                                {currentIndex + 1} / {photos.length}
                            </div>
                            <button
                                onClick={closeLightbox}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                aria-label="Close lightbox"
                            >
                                <HiOutlineX className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>

                        {/* Main Image Area */}
                        <div
                            className="flex-1 flex items-center justify-center px-4 md:px-20 min-h-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Previous Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showPrev();
                                }}
                                className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors mr-2 md:mr-4"
                                aria-label="Previous photo"
                            >
                                <HiOutlineChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                            </button>

                            {/* Image */}
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className="relative flex-1 h-full max-w-5xl"
                            >
                                <Image
                                    src={photos[currentIndex]}
                                    alt={`${title} - Photo ${currentIndex + 1}`}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                    priority
                                />
                            </motion.div>

                            {/* Next Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showNext();
                                }}
                                className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors ml-2 md:ml-4"
                                aria-label="Next photo"
                            >
                                <HiOutlineChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>

                        {/* Thumbnail Strip */}
                        <div
                            className="flex-shrink-0 px-4 py-4 md:py-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide">
                                {photos.map((src, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentIndex(i)}
                                        className={`relative flex-shrink-0 w-16 h-12 md:w-20 md:h-14 lg:w-24 lg:h-16 rounded-lg overflow-hidden transition-all ${
                                            i === currentIndex
                                                ? "ring-2 ring-primary-500 opacity-100"
                                                : "opacity-40 hover:opacity-70"
                                        }`}
                                    >
                                        <Image
                                            src={src}
                                            alt={`Thumbnail ${i + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="96px"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
