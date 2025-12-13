"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { HiMenu } from "react-icons/hi";
import Logo from "@/assets/Logo.png";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Properties", href: "/properties" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="w-full relative z-50">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-24 items-center">
                    {/* Logo */}
                    <Link href="/public" className="flex items-center">
                        <Image src={Logo} alt="Logo" width={120} height={40} />
                    </Link>

                    {/*/!* Desktop Links *!/*/}
                    {/*<div className="hidden md:flex space-x-8">*/}
                    {/*    {navLinks.map((link) => (*/}
                    {/*        <Link*/}
                    {/*            key={link.name}*/}
                    {/*            href={link.href}*/}
                    {/*            className="relative group text-gray-700 font-medium uppercase"*/}
                    {/*        >*/}
                    {/*            {link.name}*/}

                    {/*            /!* Underline *!/*/}
                    {/*            <span*/}
                    {/*                className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gray-700 transition-all duration-300 group-hover:w-full"*/}
                    {/*            ></span>*/}
                    {/*        </Link>*/}
                    {/*    ))}*/}
                    {/*</div>*/}

                    {/*/!* Mobile Menu Button *!/*/}
                    {/*<div className="md:hidden flex items-center">*/}
                    {/*    <button*/}
                    {/*        onClick={toggleMenu}*/}
                    {/*        className="text-gray-700 hover:text-red-600 focus:outline-none"*/}
                    {/*    >*/}
                    {/*        <HiMenu size={32} />*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>

            {/* Mobile Menu Component */}
            <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} navLinks={navLinks} />
        </nav>
    );
}