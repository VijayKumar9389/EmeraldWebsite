"use client";

import { useState } from "react";
import { MdClose } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

interface PopupDialogProps {
    isOpen: boolean;
    onClose: () => void;
    listing: string;
}

interface FormData {
    name: string;
    email: string;
    message: string;
}

export default function PopupDialog({ isOpen, onClose, listing }: PopupDialogProps) {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });

    const [statusMessage, setStatusMessage] = useState("");

    if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
                    interest: listing,
                    question: formData.message,
                }),
            });

            if (response.ok) {
                setStatusMessage("Your question has been submitted successfully.");
                setFormData({ name: "", email: "", message: "" });
                onClose();
            } else {
                setStatusMessage("Failed to submit your question. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatusMessage("An error occurred while submitting your question.");
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Contact Agent</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 transition"
                    >
                        <MdClose size={24} />
                    </button>
                </div>

                {/* Form */}
                <form className="form" onSubmit={handleSubmit}>

                    {statusMessage && <p className="form-status">{statusMessage}</p>}

                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
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
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">I'm interested in</label>
                        <p className="form-static">{listing}</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="message" className="form-label">
                            My question
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="What are you interested in?"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className="form-textarea"
                            rows={4}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
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
                            className="form-input"
                        />
                    </div>

                    <button type="submit" className="form-submit">
                        Send Message <IoIosSend className="text-xl" />
                    </button>

                </form>

            </div>
        </div>
    );
}