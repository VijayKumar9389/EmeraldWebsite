'use client';

import {useState} from 'react';
import {FaChevronDown} from 'react-icons/fa';
import SectionHeader from '@/app/components/layout/Heading';

interface QASection {
    question: string;
    answer: string;
}

export default function QASection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const questions: QASection[] = [
        {
            question: 'What types of properties do you offer?',
            answer:
                'We offer a variety of rental properties including condos, penthouses, and townhouses. Each is fully furnished and designed for comfort, whether for short-term or long-term stays.',
        },
        {
            question: 'Where are your properties located?',
            answer:
                'Our properties are strategically located across Windsor, including downtown, near EC Row Expressway, shopping districts, the waterfront, and close to key attractions like Caesars Windsor and major bridges.',
        },
        {
            question: 'What amenities are included?',
            answer:
                'All rentals come equipped with modern kitchens, in-unit laundry, WiFi, climate control, TV, and essentials like towels, linens, and toiletries. Some properties also include pools, gyms, and balconies.',
        },
        {
            question: 'Can I stay short-term or long-term?',
            answer:
                'Yes! We accommodate both short-term stays and long-term rentals with fully flexible lease options.',
        },
        {
            question: 'Are your properties safe and secure?',
            answer:
                'Absolutely. Our properties feature alarms, exterior cameras, and secure entry points.',
        },
        {
            question: 'Is parking available?',
            answer:
                'Yes, most properties include free parking and some offer additional paid or street parking.',
        },
        {
            question: 'Are pets allowed?',
            answer:
                'Unfortunately, none of our current properties allow pets such as dogs or cats.',
        },
        {
            question: 'How close are the properties to attractions?',
            answer:
                'Our rentals are near shopping, parks, hospitals, and Windsor-Detroit border crossings.',
        },
    ];

    const toggleAnswer = (index: number) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <section className="w-full">
            <SectionHeader
                title="Frequently Asked Questions"
                subtitle="Got questions about our rental properties or leasing process? Here are our most common answers."
            />

            <div className="mx-auto border-t border-gray-200 divide-y divide-gray-200 mt-8">
                {questions.map((qa, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <div
                            key={index}
                            className=" cursor-pointer hover:bg-background-alt-color transition py-4 px-3"
                            onClick={() => toggleAnswer(index)}
                        >
                            {/* Question */}
                            <div
                                className={`flex justify-between items-center transition-colors duration-300 ${
                                    isActive ? 'text-primary-color' : 'text-text-color'
                                }`}
                            >
                                <h5 className="subheading">{qa.question}</h5>

                                <FaChevronDown
                                    className={`icon text-lg transition-transform duration-300 ${
                                        isActive ? 'rotate-180 text-primary-color' : 'text-text-color'
                                    }`}
                                />
                            </div>

                            {/* Answer */}
                            <div
                                className={`text-text-light mt-2 overflow-hidden transition-all duration-300 ${
                                    isActive
                                        ? 'max-h-96 opacity-100'
                                        : 'max-h-0 opacity-0'
                                }`}
                            >
                                <p className="leading-relaxed">{qa.answer}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}