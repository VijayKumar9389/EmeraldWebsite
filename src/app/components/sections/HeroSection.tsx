"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi";

import promoOne from "@/assets/promo/promoOne.jpg";
import promoTwo from "@/assets/promo/promoTwo.jpg";
import promoThree from "@/assets/promo/promoThree.jpg";

const SLIDE_INTERVAL = 6000;

const slides = [
    {
        img: promoOne,
        badge: "Premium Executive Housing",
        title: "Luxury Living in Windsor",
        subtitle: "Experience comfort redefined",
        desc: "Discover beautifully furnished executive rentals designed for discerning professionals and families seeking exceptional accommodations.",
        alt: "Modern furnished executive rental suite at Emerald Executive Housing",
    },
    {
        img: promoTwo,
        badge: "Move-In Ready",
        title: "Fully Furnished Suites",
        subtitle: "Everything you need, nothing you don't",
        desc: "Each property is thoughtfully designed with premium amenities, modern appliances, and elegant furnishings for your convenience.",
        alt: "Fully furnished rental suite interior with modern amenities",
    },
    {
        img: promoThree,
        badge: "Flexible Stays",
        title: "Your Home Away from Home",
        subtitle: "Short-term or extended stays",
        desc: "Whether you need a week or a year, our flexible booking options adapt to your lifestyle with no compromise on quality.",
        alt: "Spacious luxury rental suite with elegant furnishings",
    },
];

export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetTimeout = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    useEffect(() => {
        if (!isAutoPlaying) return;

        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, SLIDE_INTERVAL);

        return () => resetTimeout();
    }, [current, isAutoPlaying, resetTimeout]);

    const goToSlide = (index: number) => {
        setCurrent(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => goToSlide((current + 1) % slides.length);
    const prevSlide = () => goToSlide((current - 1 + slides.length) % slides.length);

    return (
        <section
            className="relative w-full mt-4"
            aria-label="Featured luxury furnished rental suites"
        >
            {/* Main Hero Container */}
            <div className="relative w-full h-[88vh] min-h-[600px] max-h-[950px] rounded-2xl overflow-hidden shadow-soft-xl">
                {/* Slides */}
                {slides.map((slide, index) => (
                    <article
                        key={index}
                        aria-roledescription="slide"
                        aria-label={slide.title}
                        className={`absolute inset-0 transition-all duration-1000 ease-out ${
                            current === index
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-105"
                        }`}
                    >
                        <Image
                            src={slide.img}
                            alt={slide.alt}
                            fill
                            className="object-cover"
                            priority={index === 0}
                            sizes="100vw"
                            quality={90}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/50 to-transparent" />

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                                <div className="max-w-2xl">
                                    {/* Badge */}
                                    <div
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 transition-all duration-700 delay-100 ${
                                            current === index
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-4"
                                        }`}
                                    >
                                        <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                                        <span className="text-sm font-medium text-white/90">
                                            {slide.badge}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    {index === 0 ? (
                                        <h1
                                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight transition-all duration-700 delay-200 ${
                                                current === index
                                                    ? "opacity-100 translate-y-0"
                                                    : "opacity-0 translate-y-4"
                                            }`}
                                        >
                                            {slide.title}
                                        </h1>
                                    ) : (
                                        <h2
                                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight transition-all duration-700 delay-200 ${
                                                current === index
                                                    ? "opacity-100 translate-y-0"
                                                    : "opacity-0 translate-y-4"
                                            }`}
                                        >
                                            {slide.title}
                                        </h2>
                                    )}

                                    {/* Subtitle */}
                                    <p
                                        className={`mt-3 text-xl sm:text-2xl font-light text-primary-300 transition-all duration-700 delay-300 ${
                                            current === index
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-4"
                                        }`}
                                    >
                                        {slide.subtitle}
                                    </p>

                                    {/* Description */}
                                    <p
                                        className={`mt-6 text-lg text-white/80 leading-relaxed max-w-xl transition-all duration-700 delay-400 ${
                                            current === index
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-4"
                                        }`}
                                    >
                                        {slide.desc}
                                    </p>

                                    {/* CTA Buttons */}
                                    <div
                                        className={`mt-8 flex flex-wrap gap-4 transition-all duration-700 delay-500 ${
                                            current === index
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-4"
                                        }`}
                                    >
                                        <Link
                                            href="#listings"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                        >
                                            View Properties
                                            <HiArrowRight className="w-5 h-5" />
                                        </Link>
                                        <Link
                                            href="#contact"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 transition-all duration-200"
                                        >
                                            Contact Us
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}

                {/* Navigation Arrows */}
                <div className="absolute bottom-8 right-8 flex items-center gap-3">
                    <button
                        onClick={prevSlide}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-all duration-200 hover:scale-105"
                        aria-label="Previous slide"
                    >
                        <HiChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-all duration-200 hover:scale-105"
                        aria-label="Next slide"
                    >
                        <HiChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-8 left-8 flex items-center gap-3">
                    {slides.map((_, index) => {
                        const isActive = current === index;
                        return (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                className="group relative"
                            >
                                <span
                                    className={`block transition-all duration-300 rounded-full ${
                                        isActive
                                            ? "w-10 h-2 bg-primary-500"
                                            : "w-2 h-2 bg-white/40 group-hover:bg-white/60"
                                    }`}
                                />
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
