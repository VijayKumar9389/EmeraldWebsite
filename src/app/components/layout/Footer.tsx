"use client";

import Link from "next/link";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 text-gray-700 py-12 bg-background-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Contact Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
                    <p>
                        Email:{" "}
                        <Link href="mailto:Rhea@emeraldexecutivehousing.com" className="text-red-600 hover:underline">
                            Rhea@emeraldexecutivehousing.com
                        </Link>
                    </p>
                    <p>Phone: +1 (778) 846-2702</p>
                </div>

                {/* Optional: Social or Branding */}
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Emerald Executive Housing</h3>
                    <p className="text-sm text-gray-600">
                        &copy; {currentYear} Emerald Executive Housing. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;