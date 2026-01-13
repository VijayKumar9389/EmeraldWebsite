"use client";

import Link from "next/link";
import Image from "next/image";
import {
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker,
} from "react-icons/hi";
import Logo from "@/assets/Logo.png";

const navigation = {
    main: [
        { name: "Home", href: "/" },
        { name: "Properties", href: "#listings" },
        { name: "Services", href: "#services" },
        { name: "FAQ", href: "#faq" },
        { name: "Contact", href: "#contact" },
    ],
    properties: [
        { name: "8475 Wyandotte St E", href: "/listing/1" },
        { name: "150 Park St W", href: "/listing/2" },
        { name: "2650 Vine Ct", href: "/listing/3" },
    ],
};

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral-900 text-neutral-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block">
                            <Image
                                src={Logo}
                                alt="Emerald Executive Housing"
                                width={140}
                                height={48}
                                className="brightness-0 invert"
                            />
                        </Link>
                        <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
                            Premium furnished executive rentals in Windsor, Ontario.
                            Designed for comfort, convenience, and exceptional stays.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {navigation.main.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Properties */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Our Properties
                        </h3>
                        <ul className="space-y-3">
                            {navigation.properties.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="mailto:Rhea@emeraldexecutivehousing.com"
                                    className="flex items-start gap-3 text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                                >
                                    <HiOutlineMail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span>Rhea@emeraldexecutivehousing.com</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+17788462702"
                                    className="flex items-start gap-3 text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                                >
                                    <HiOutlinePhone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span>+1 (778) 846-2702</span>
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-neutral-400">
                                <HiOutlineLocationMarker className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span>Windsor, Ontario, Canada</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-neutral-500">
                            &copy; {currentYear} Emerald Executive Housing. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link
                                href="/privacy"
                                className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
