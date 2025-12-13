"use client";

import Image from "next/image";
import {useState, useEffect, useRef} from "react";

import promoOne from "@/assets/promo/promoOne.jpg";
import promoTwo from "@/assets/promo/promoTwo.jpg";
import promoThree from "@/assets/promo/promoThree.jpg";

const SLIDE_INTERVAL = 5000;

const slides = [
    {
        img: promoOne,
        title: "Welcome to Emerald Executive Housing",
        desc: "Premium furnished rentals in Windsor for professionals, families, and long-term stays.",
        alt: "Modern furnished executive rental suite at Emerald Executive Housing",
    },
    {
        img: promoTwo,
        title: "Fully Furnished Rental Suites",
        desc: "Move-in ready units designed for comfort, convenience, and extended accommodations.",
        alt: "Fully furnished rental suite interior with modern amenities",
    },
    {
        img: promoThree,
        title: "Luxury Meets Practicality",
        desc: "Spacious layouts, high-end amenities, and flexible booking options.",
        alt: "Spacious luxury rental suite with elegant furnishings",
    },
];

export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, SLIDE_INTERVAL);

        return () => resetTimeout();
    }, [current]);

    const goToSlide = (index: number) => setCurrent(index);

    return (
        <section
            className="w-full relative"
            aria-label="Emerald Executive Housing featured furnished rental suites"
        >
            {/* SLIDER */}
            <div className="relative w-full">
                <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{transform: `translateX(-${current * 100}%)`}}
                >
                    {slides.map((slide, index) => (
                        <article
                            key={index}
                            aria-roledescription="slide"
                            aria-label={`${slide.title}`}
                            className={`relative w-full h-[60vh] max-h-[650px] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${
                                current === index ? "scale-100" : "scale-95 opacity-60"
                            }`}
                        >
                            <Image
                                src={slide.img}
                                alt={slide.alt}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />

                            <div
                                className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/75 flex flex-col justify-end p-6 md:p-10">
                                <h1 className="title text-white drop-shadow-lg">
                                    {slide.title}
                                </h1>

                                <p className="paragraph text-white/90 mt-2 max-w-xl drop-shadow-md">
                                    {slide.desc}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* INDICATORS */}
            <div className="mt-8 flex justify-center items-center gap-3">
                {slides.map((_, index) => {
                    const isActive = current === index;
                    return (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`
                    transition-all duration-300 rounded-full 
                    ${isActive
                                ? "w-8 h-3 bg-primary-color shadow-md"
                                : "w-3 h-3 bg-background-alt-color hover:bg-gray-400"
                            }
                `}
                        />
                    );
                })}
            </div>
        </section>
    );
}