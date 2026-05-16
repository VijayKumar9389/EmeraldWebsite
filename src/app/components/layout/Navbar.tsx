"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Logo from "@/assets/Logo.png";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "#about" },
        { name: "Properties", href: "#listings" },
        { name: "FAQ", href: "#faq" },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-white/95 backdrop-blur-md shadow-soft py-3"
                        : "bg-white/80 backdrop-blur-sm py-5"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link href="/" className="flex items-center group">
                            <Image
                                src={Logo}
                                alt="Emerald Executive Housing"
                                width={140}
                                height={48}
                                className="transition-transform duration-300 group-hover:scale-105"
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg
                                        ${scrolled ? "text-neutral-700 hover:text-primary-600 hover:bg-primary-50" : "text-neutral-800 hover:text-primary-600 hover:bg-white/50"}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="#contact"
                                className="ml-4 btn-primary text-sm"
                            >
                                Contact
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className={`lg:hidden p-2 rounded-lg transition-colors duration-200
                                ${scrolled ? "text-neutral-700 hover:bg-neutral-100" : "text-neutral-800 hover:bg-white/50"}`}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            {isOpen ? (
                                <IoClose size={28} />
                            ) : (
                                <HiOutlineMenuAlt3 size={28} />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
                    onClick={toggleMenu}
                />

                {/* Menu Panel */}
                <div
                    className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-soft-xl transform transition-transform duration-300 ease-out ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-neutral-100">
                            <span className="text-lg font-semibold text-neutral-900">Menu</span>
                            <button
                                onClick={toggleMenu}
                                className="p-2 rounded-lg text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                                aria-label="Close menu"
                            >
                                <IoClose size={24} />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex-1 px-4 py-6">
                            <ul className="space-y-1">
                                {navLinks.map((link, index) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            onClick={toggleMenu}
                                            className="flex items-center px-4 py-3 text-lg font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
                                            style={{
                                                animationDelay: `${index * 50}ms`,
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Footer CTA */}
                        <div className="p-6 border-t border-neutral-100">
                            <Link
                                href="#contact"
                                onClick={toggleMenu}
                                className="btn-primary w-full justify-center"
                            >
                                Contact
                            </Link>
                            <p className="mt-4 text-center text-sm text-neutral-500">
                                Questions? Call us at{" "}
                                <a href="tel:+17788462702" className="text-primary-600 font-medium hover:underline">
                                    +1 (778) 846-2702
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer for fixed navbar */}
            <div className="h-24" />
        </>
    );
}
