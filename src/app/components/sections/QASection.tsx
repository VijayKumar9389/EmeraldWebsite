"use client";

import { useState } from "react";
import { HiOutlineChevronDown, HiOutlineQuestionMarkCircle } from "react-icons/hi";
import Script from "next/script";

interface FAQItem {
    question: string;
    answer: string;
}

const questions: FAQItem[] = [
    {
        question: "What types of properties do you offer?",
        answer:
            "We offer a variety of premium rental properties including modern condos, luxury penthouses, and spacious townhouses. Each property is fully furnished with high-end amenities and designed for both short-term and extended stays.",
    },
    {
        question: "Where are your properties located?",
        answer:
            "Our properties are strategically located throughout Windsor, Ontario, including downtown, near EC Row Expressway, shopping districts, the waterfront, and close to attractions like Caesars Windsor and the Ambassador Bridge.",
    },
    {
        question: "What amenities are included in your rentals?",
        answer:
            "All rentals include modern kitchens with premium appliances, in-unit laundry, high-speed WiFi, smart TVs, climate control, and quality linens. Select properties also feature pools, fitness centers, balconies, and dedicated parking.",
    },
    {
        question: "Do you offer both short-term and long-term stays?",
        answer:
            "Yes! We offer flexible booking options to accommodate your needs. Whether you need a week-long business stay or a year-long residence, we have options available with customizable lease terms.",
    },
    {
        question: "How secure are your properties?",
        answer:
            "Safety is our priority. All properties feature security cameras, smart locks, smoke and CO detectors, and secure entry systems. Our buildings are well-maintained and located in safe neighborhoods.",
    },
    {
        question: "Is parking available at your properties?",
        answer:
            "Yes, most of our properties include complimentary parking. Some locations offer additional parking options or nearby street parking. Details are provided for each specific listing.",
    },
    {
        question: "What is your pet policy?",
        answer:
            "Currently, our properties are pet-free to maintain the highest standards of cleanliness and comfort for all guests. We apologize for any inconvenience this may cause.",
    },
    {
        question: "How close are properties to local attractions?",
        answer:
            "Our rentals are conveniently located near shopping centers, parks, hospitals, restaurants, and the Windsor-Detroit border crossings. Most amenities and attractions are within a short drive or walking distance.",
    },
];

export default function QASection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((qa) => ({
            "@type": "Question",
            name: qa.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: qa.answer,
            },
        })),
    };

    return (
        <section id="faq" aria-labelledby="faq-heading" className="py-24">
            <Script
                id="faq-json-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                {/* Left Column - Header */}
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-32">
                        <span className="overline">Support</span>
                        <h2 id="faq-heading" className="heading mt-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="paragraph mt-4">
                            Find answers to common questions about our properties, booking process, and amenities.
                        </p>

                        {/* Contact CTA */}
                        <div className="mt-8 p-6 rounded-2xl bg-primary-50 border border-primary-100">
                            <div className="flex items-start gap-4">
                                <div className="icon-container-lg bg-primary-100">
                                    <HiOutlineQuestionMarkCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-neutral-900">
                                        Still have questions?
                                    </h3>
                                    <p className="mt-1 text-sm text-neutral-600">
                                        Our team is here to help with any inquiries.
                                    </p>
                                    <a
                                        href="#contact"
                                        className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                                    >
                                        Contact us
                                        <span aria-hidden="true">&rarr;</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - FAQ List */}
                <div className="lg:col-span-8">
                    <dl className="space-y-4">
                        {questions.map((qa, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div
                                    key={index}
                                    className={`rounded-2xl border transition-all duration-300 ${
                                        isActive
                                            ? "bg-white border-primary-200 shadow-soft"
                                            : "bg-neutral-50 border-transparent hover:bg-white hover:border-neutral-200"
                                    }`}
                                >
                                    <dt>
                                        <button
                                            onClick={() => toggleAnswer(index)}
                                            className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
                                            aria-expanded={isActive}
                                            aria-controls={`faq-answer-${index}`}
                                        >
                                            <span
                                                className={`text-lg font-semibold transition-colors duration-300 ${
                                                    isActive ? "text-primary-700" : "text-neutral-900"
                                                }`}
                                            >
                                                {qa.question}
                                            </span>
                                            <span
                                                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                    isActive
                                                        ? "bg-primary-100 text-primary-600 rotate-180"
                                                        : "bg-neutral-200 text-neutral-600"
                                                }`}
                                            >
                                                <HiOutlineChevronDown className="w-5 h-5" />
                                            </span>
                                        </button>
                                    </dt>
                                    <dd
                                        id={`faq-answer-${index}`}
                                        className={`overflow-hidden transition-all duration-300 ${
                                            isActive ? "max-h-96" : "max-h-0"
                                        }`}
                                    >
                                        <div className="px-6 pb-6">
                                            <p className="text-neutral-600 leading-relaxed">
                                                {qa.answer}
                                            </p>
                                        </div>
                                    </dd>
                                </div>
                            );
                        })}
                    </dl>
                </div>
            </div>
        </section>
    );
}
