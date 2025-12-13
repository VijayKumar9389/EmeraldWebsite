"use client";

import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import "../../globals.css";

interface FormData {
    name: string;
    budget: string;
    interest: string;
    email: string;
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        budget: "",
        interest: "",
        email: "",
    });
    const [statusMessage, setStatusMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("https://www.trackerinventory.com/customer/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    interest: formData.budget,
                    question: formData.interest,
                }),
            });

            if (response.ok) {
                setStatusMessage("Your question has been submitted successfully.");
                setFormData({ name: "", budget: "", interest: "", email: "" });
            } else {
                setStatusMessage("Failed to submit your question. Please try again.");
            }
        } catch (error) {
            setStatusMessage("An error occurred while submitting your question.");
            console.error("Error submitting form:", error);
        }
    };

    return (
        <section className="relative w-full py-20 overflow-hidden">

            {/* Parallax background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: "url('/assets/promo/promoOne.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-16">

                {/* Form */}
                <div className="w-full lg:w-1/2 bg-white/30 backdrop-blur-xl rounded-2xl shadow-xl p-10 border border-white/20">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-white font-medium mb-2">
                                My name is
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your Name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-color transition"
                            />
                        </div>

                        {/* Property */}
                        <div>
                            <label htmlFor="budget" className="block text-white font-medium mb-2">
                                I'm interested in
                            </label>
                            <select
                                id="budget"
                                name="budget"
                                required
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-color transition"
                            >
                                <option value="">Select an option</option>
                                <option value="8475-wyandotte-st-e">8475 Wyandotte St E</option>
                                <option value="150-park-st-w">150 Park St W</option>
                                <option value="2650-vine-ct">2650 Vine Ct</option>
                                <option value="general-inquiry">General Inquiry</option>
                            </select>
                        </div>

                        {/* Question */}
                        <div>
                            <label htmlFor="interest" className="block text-white font-medium mb-2">
                                My question is
                            </label>
                            <textarea
                                id="interest"
                                name="interest"
                                placeholder="What would you like to know?"
                                required
                                value={formData.interest}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-color transition resize-none"
                                rows={4}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-white font-medium mb-2">
                                Please contact me at
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Your Email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-color transition"
                            />
                        </div>

                        {/* Button */}
                        <div className="flex justify-end">
                            <button type="submit" className="btn-primary">
                                Send Message
                                <IoIosSend className="text-xl" />
                            </button>
                        </div>

                        {/* Status */}
                        {statusMessage && (
                            <p className="mt-3 text-gray-800 font-medium">{statusMessage}</p>
                        )}
                    </form>
                </div>

                {/* Right Side Text */}
                <div className="text-center lg:text-left">
                    <h2 className="text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-3">
                        Let's Connect
                    </h2>
                    <p className="text-white/90 text-lg max-w-md">
                        Send us a quick message — we're happy to help with availability, bookings, or general questions.
                    </p>
                </div>
            </div>
        </section>
    );
}