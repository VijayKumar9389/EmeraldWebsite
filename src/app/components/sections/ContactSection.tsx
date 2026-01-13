"use client";

import { useState } from "react";
import Image from "next/image";
import {
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker,
    HiOutlineClock,
} from "react-icons/hi";
import { IoSendSharp } from "react-icons/io5";
import Script from "next/script";
import promoOne from "@/assets/promo/promoOne.jpg";

interface FormData {
    name: string;
    email: string;
    property: string;
    message: string;
}

const contactInfo = [
    {
        icon: HiOutlineMail,
        label: "Email",
        value: "Rhea@emeraldexecutivehousing.com",
        href: "mailto:Rhea@emeraldexecutivehousing.com",
    },
    {
        icon: HiOutlinePhone,
        label: "Phone",
        value: "+1 (778) 846-2702",
        href: "tel:+17788462702",
    },
    {
        icon: HiOutlineLocationMarker,
        label: "Location",
        value: "Windsor, Ontario, Canada",
        href: null,
    },
    {
        icon: HiOutlineClock,
        label: "Response Time",
        value: "Within 24 hours",
        href: null,
    },
];

const properties = [
    { value: "", label: "Select a property" },
    { value: "8475-wyandotte-st-e", label: "8475 Wyandotte St E" },
    { value: "150-park-st-w", label: "150 Park St W" },
    { value: "2650-vine-ct", label: "2650 Vine Ct" },
    { value: "general-inquiry", label: "General Inquiry" },
];

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        property: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [statusMessage, setStatusMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("https://www.trackerinventory.com/customer/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    interest: formData.property,
                    question: formData.message,
                }),
            });

            if (response.ok) {
                setStatus("success");
                setStatusMessage("Thank you! Your message has been sent successfully.");
                setFormData({ name: "", email: "", property: "", message: "" });
            } else {
                setStatus("error");
                setStatusMessage("Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setStatusMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <section id="contact" className="relative py-24 overflow-hidden">
            <Script
                id="contact-json-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        url: "https://www.emeraldexecutivehousing.net/#contact",
                        name: "Contact Emerald Executive Housing",
                        description:
                            "Get in touch for inquiries about luxury rentals, bookings, or general questions.",
                    }),
                }}
            />

            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src={promoOne}
                    alt=""
                    fill
                    className="object-cover"
                    quality={85}
                />
                <div className="absolute inset-0 bg-neutral-900/85 backdrop-blur-sm" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left Column - Info */}
                    <div className="flex flex-col justify-center">
                        <span className="overline text-primary-400">Get In Touch</span>
                        <h2 className="heading text-white mt-3">
                            Let&apos;s Start a Conversation
                        </h2>
                        <p className="paragraph text-neutral-300 mt-4 max-w-lg">
                            Have questions about our properties or ready to book your stay?
                            We&apos;re here to help you find the perfect accommodation.
                        </p>

                        {/* Contact Info Cards */}
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {contactInfo.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 min-w-0"
                                >
                                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary-500/20 flex items-center justify-center">
                                        <item.icon className="w-5 h-5 text-primary-400" />
                                    </div>

                                    {/* Added min-w-0 to allow this container to shrink below its content width */}
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-neutral-400 truncate">{item.label}</p>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="block text-gray-500 font-medium hover:text-primary-400 transition-colors break-words overflow-hidden"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-gray-500 font-medium break-words">
                                                {item.value}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="bg-white rounded-3xl shadow-soft-xl p-8 lg:p-10">
                        <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
                            Send us a message
                        </h3>
                        <p className="text-neutral-600 mb-8">
                            Fill out the form below and we&apos;ll get back to you shortly.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>

                            {/* Email */}
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>

                            {/* Property Selection */}
                            <div className="form-group">
                                <label htmlFor="property" className="form-label">
                                    Property of Interest
                                </label>
                                <div className="relative">
                                    <select
                                        id="property"
                                        name="property"
                                        required
                                        value={formData.property}
                                        onChange={handleChange}
                                        className="form-input pr-10"
                                    >
                                        {properties.map((prop) => (
                                            <option key={prop.value} value={prop.value}>
                                                {prop.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-neutral-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="form-group">
                                <label htmlFor="message" className="form-label">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell us about your requirements..."
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="form-textarea"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? (
                                    <>
                                        <svg
                                            className="animate-spin w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <IoSendSharp className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            {/* Status Message */}
                            {statusMessage && (
                                <div
                                    className={`${
                                        status === "success"
                                            ? "form-status-success"
                                            : "form-status-error"
                                    }`}
                                >
                                    {statusMessage}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
