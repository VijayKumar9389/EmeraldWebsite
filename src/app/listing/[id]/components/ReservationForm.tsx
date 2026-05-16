"use client";

import { useState } from "react";
import { HiOutlineX, HiOutlineCalendar, HiOutlineUsers } from "react-icons/hi";
import { IoSendSharp } from "react-icons/io5";

interface BookingPopupProps {
    isOpen: boolean;
    onClose: () => void;
    listingId: number;
    listingTitle: string;
}

interface BookingData {
    name: string;
    email: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    message: string;
}

export default function BookingPopup({
    isOpen,
    onClose,
    listingTitle,
}: BookingPopupProps) {
    const [formData, setFormData] = useState<BookingData>({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        guests: 1,
        message: "",
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [statusMessage, setStatusMessage] = useState("");

    if (!isOpen) return null;

    const shortTitle = listingTitle.split(",")[0];

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
                    question: `Booking Request for ${listingTitle}\n\nCheck-in: ${formData.checkIn}\nCheck-out: ${formData.checkOut}\nGuests: ${formData.guests}\nPhone: ${formData.phone}\n\nMessage: ${formData.message}`,
                }),
            });

            if (response.ok) {
                setStatus("success");
                setStatusMessage("Your booking request has been submitted! We'll contact you shortly.");
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setStatus("error");
                setStatusMessage("Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setStatusMessage("An error occurred. Please try again later.");
        }
    };

    // Get minimum date (today)
    const today = new Date().toISOString().split("T")[0];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-neutral-900/70 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative bg-white rounded-2xl shadow-soft-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white px-6 py-5 border-b border-neutral-100 rounded-t-2xl z-10">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold text-neutral-900">
                                Book Your Stay
                            </h2>
                            <p className="text-sm text-neutral-500 mt-0.5">
                                {shortTitle}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-700 transition-colors"
                            aria-label="Close booking form"
                        >
                            <HiOutlineX className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Name */}
                    <div className="form-group">
                        <label htmlFor="booking-name" className="form-label">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="booking-name"
                            name="name"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="booking-email" className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="booking-email"
                                name="email"
                                required
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="booking-phone" className="form-label">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="booking-phone"
                                name="phone"
                                placeholder="+1 (555) 000-0000"
                                value={formData.phone}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label htmlFor="booking-checkin" className="form-label flex items-center gap-2">
                                <HiOutlineCalendar className="w-4 h-4 text-neutral-400" />
                                Check-in
                            </label>
                            <input
                                type="date"
                                id="booking-checkin"
                                name="checkIn"
                                required
                                min={today}
                                value={formData.checkIn}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="booking-checkout" className="form-label flex items-center gap-2">
                                <HiOutlineCalendar className="w-4 h-4 text-neutral-400" />
                                Check-out
                            </label>
                            <input
                                type="date"
                                id="booking-checkout"
                                name="checkOut"
                                required
                                min={formData.checkIn || today}
                                value={formData.checkOut}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                    </div>

                    {/* Guests */}
                    <div className="form-group">
                        <label htmlFor="booking-guests" className="form-label flex items-center gap-2">
                            <HiOutlineUsers className="w-4 h-4 text-neutral-400" />
                            Number of Guests
                        </label>
                        <input
                            type="number"
                            id="booking-guests"
                            name="guests"
                            min={1}
                            max={10}
                            value={formData.guests}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    {/* Message */}
                    <div className="form-group">
                        <label htmlFor="booking-message" className="form-label">
                            Special Requests (Optional)
                        </label>
                        <textarea
                            id="booking-message"
                            name="message"
                            rows={3}
                            placeholder="Any special requirements or questions..."
                            value={formData.message}
                            onChange={handleChange}
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
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Submitting...
                            </>
                        ) : (
                            <>
                                Submit Booking Request
                                <IoSendSharp className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    {/* Status Message */}
                    {statusMessage && (
                        <div
                            className={status === "success" ? "form-status-success" : "form-status-error"}
                        >
                            {statusMessage}
                        </div>
                    )}

                    {/* Note */}
                    <p className="text-xs text-center text-neutral-500">
                        By submitting, you agree to our terms. We&apos;ll confirm availability and contact you within 24 hours.
                    </p>
                </form>
            </div>
        </div>
    );
}
