"use client";

import { useState } from "react";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { IoSendSharp } from "react-icons/io5";

interface Props {
    listingId: number;
    listingTitle: string;
}

interface FormData {
    name: string;
    email: string;
    message: string;
}

export default function ListingContactForm({ listingTitle }: Props) {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [statusMessage, setStatusMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
                    interest: listingTitle,
                    question: formData.message,
                }),
            });

            if (response.ok) {
                setStatus("success");
                setStatusMessage("Message sent! We'll respond shortly.");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
                setStatusMessage("Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setStatusMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-soft border border-neutral-100 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-neutral-100 bg-neutral-50">
                <h3 className="font-semibold text-neutral-900">
                    Have Questions?
                </h3>
                <p className="text-sm text-neutral-500 mt-0.5">
                    We&apos;re here to help
                </p>
            </div>

            {/* Quick Contact */}
            <div className="px-6 py-4 border-b border-neutral-100 space-y-3">
                <a
                    href="tel:+17788462702"
                    className="flex items-center gap-3 text-sm text-neutral-700 hover:text-primary-600 transition-colors"
                >
                    <span className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                        <HiOutlinePhone className="w-4 h-4 text-primary-600" />
                    </span>
                    +1 (778) 846-2702
                </a>
                <a
                    href="mailto:Rhea@emeraldexecutivehousing.com"
                    className="flex items-center gap-3 text-sm text-neutral-700 hover:text-primary-600 transition-colors"
                >
                    <span className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                        <HiOutlineMail className="w-4 h-4 text-primary-600" />
                    </span>
                    Email Us
                </a>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input text-sm"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input text-sm"
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="message"
                        placeholder="Your Question..."
                        rows={3}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="form-textarea text-sm"
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary w-full justify-center text-sm disabled:opacity-70"
                >
                    {status === "loading" ? (
                        "Sending..."
                    ) : (
                        <>
                            Send Message
                            <IoSendSharp className="w-4 h-4" />
                        </>
                    )}
                </button>

                {statusMessage && (
                    <div
                        className={`text-xs text-center p-2 rounded-lg ${
                            status === "success"
                                ? "bg-primary-50 text-primary-700"
                                : "bg-red-50 text-red-700"
                        }`}
                    >
                        {statusMessage}
                    </div>
                )}
            </form>
        </div>
    );
}
