"use client";

import Link from "next/link";
import {GrMenu} from "react-icons/gr";

interface MobileMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
    navLinks: { name: string; href: string }[];
}

export default function MobileMenu({ isOpen, toggleMenu, navLinks }: MobileMenuProps) {
    return (
        <>
            {/* Full-Screen Mobile Menu */}
            <div
                className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-y-0" : "translate-y-full"
                } flex flex-col`}
            >
                {/* Top Bar with X Button */}
                <div className="flex justify-end p-6">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-700 hover:text-red-600 focus:outline-none"
                    >
                        <GrMenu size={32} />
                    </button>
                </div>

                {/* Menu Links */}
                <div className="flex flex-col items-center justify-center flex-1 space-y-8 text-xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={toggleMenu}
                            className="text-gray-700 hover:text-red-600 font-semibold transition"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Optional overlay behind menu */}
            {isOpen && <div className="fixed inset-0 bg-black/30 z-30" onClick={toggleMenu} />}
        </>
    );
}