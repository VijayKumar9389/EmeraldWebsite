"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineChevronDown } from "react-icons/hi";
import { FAQStructuredData } from "@/lib/seo/structured-data";
import { faqData } from "@/lib/seo/faq-data";

export default function QASection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleAnswer = (index: number) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <section id="faq" aria-labelledby="faq-heading" className="py-24">
            <FAQStructuredData faqItems={faqData} />

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
                    </div>
                </div>

                {/* Right Column - FAQ List */}
                <div className="lg:col-span-8">
                    <div className="space-y-4">
                        {faqData.map((qa, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <button
                                        onClick={() => toggleAnswer(index)}
                                        className={`w-full flex items-center justify-between p-6 rounded-xl text-left transition-all duration-300 cursor-pointer ${
                                            isActive
                                                ? "bg-primary-600 text-white"
                                                : "bg-neutral-50 text-neutral-900 hover:bg-primary-50"
                                        }`}
                                        aria-expanded={isActive}
                                        aria-controls={`faq-answer-${index}`}
                                    >
                                        <span className="font-semibold pr-4">{qa.question}</span>
                                        <HiOutlineChevronDown
                                            className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                                                isActive ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                id={`faq-answer-${index}`}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-6 bg-neutral-50 rounded-b-xl">
                                                    <p className="text-neutral-600 leading-relaxed">
                                                        {qa.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
