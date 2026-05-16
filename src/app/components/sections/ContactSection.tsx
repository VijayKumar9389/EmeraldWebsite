"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker,
    HiOutlineClock,
} from "react-icons/hi";
import { IoSendSharp } from "react-icons/io5";
import Script from "next/script";

interface FormData {
    name: string;
    email: string;
    property: string;
    message: string;
}

const contactInfo = [
    {
        icon: HiOutlineLocationMarker,
        label: "Location",
        value: "Windsor, Ontario, Canada",
        href: null,
    },
    {
        icon: HiOutlinePhone,
        label: "Phone",
        value: "+1 (778) 846-2702",
        href: "tel:+17788462702",
    },
    {
        icon: HiOutlineMail,
        label: "Email",
        value: "Rhea@emeraldexecutivehousing.com",
        href: "mailto:Rhea@emeraldexecutivehousing.com",
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
        <section id="contact" className="py-24 bg-neutral-50">
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header - Centered at Top */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="overline">Get In Touch</span>
                    <h2 className="heading mt-3">
                        Ready to Book Your Stay?
                    </h2>
                    <p className="paragraph mt-4">
                        Have questions or ready to reserve? Send us a message and our team
                        will get back to you within 24 hours.
                    </p>
                </motion.div>

                {/* Two Column Layout - Info Left, Form Right */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column - Contact Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {contactInfo.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex items-start gap-4"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                                    <item.icon className="w-6 h-6 text-primary-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm text-neutral-500 mb-1">{item.label}</p>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="text-neutral-900 font-medium hover:text-primary-600 transition-colors break-words"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-neutral-900 font-medium break-words">
                                            {item.value}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-2xl shadow-soft-xl p-8 lg:p-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name & Email Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                                            className="form-input pr-10 appearance-none"
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
                                        rows={5}
                                        className="form-textarea"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="btn-primary w-full sm:w-auto justify-center disabled:opacity-70 disabled:cursor-not-allowed"
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
                                        className={`form-status ${
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
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
