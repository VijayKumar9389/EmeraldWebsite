"use client";

import { useState } from "react";
import { MdClose, MdCreditCard } from "react-icons/md";

interface BookingPopupProps {
    isOpen: boolean;
    onClose: () => void;
    listingId: number;
    listingTitle: string;
}

interface BookingData {
    name: string;
    email: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    message: string;
}

export default function BookingPopup({
                                         isOpen,
                                         onClose,
                                         listingId,
                                         listingTitle,
                                     }: BookingPopupProps) {
    const [formData, setFormData] = useState<BookingData>({
        name: "",
        email: "",
        checkIn: "",
        checkOut: "",
        guests: 1,
        message: "",
    });

    const [statusMessage, setStatusMessage] = useState("");

    if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    listingId,
                    listingTitle,
                    ...formData,
                }),
            });

            if (response.ok) {
                setStatusMessage("Booking request submitted successfully!");
                onClose();
            } else {
                setStatusMessage("Failed to submit booking. Please try again.");
            }
        } catch {
            setStatusMessage("An error occurred while submitting your booking.");
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-start md:items-center justify-center
                 bg-black/70 backdrop-blur-sm h-screen"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg md:max-w-xl
                   p-8 md:p-10 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                        Book {listingTitle.split(",")[0]}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 transition"
                        aria-label="Close booking form"
                    >
                        <MdClose size={28} />
                    </button>
                </div>

                {/* Form */}
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">My name is</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Please contact me at</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="form-label">Check-in</label>
                            <input
                                type="date"
                                name="checkIn"
                                required
                                value={formData.checkIn}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Check-out</label>
                            <input
                                type="date"
                                name="checkOut"
                                required
                                value={formData.checkOut}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Guests</label>
                        <input
                            type="number"
                            name="guests"
                            min={1}
                            value={formData.guests}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Additional requests</label>
                        <textarea
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="form-textarea"
                        />
                    </div>

                    <button type="submit" className="btn-primary">
                        Proceed to Payment <MdCreditCard className="text-xl" />
                    </button>

                    {statusMessage && (
                        <p className="form-status">{statusMessage}</p>
                    )}
                </form>
            </div>
        </div>
    );
}