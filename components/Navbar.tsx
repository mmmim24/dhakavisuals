"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavItem {
    name: string;
    href: string;
}

const navItems: NavItem[] = [
    { name: "Clients", href: "#clients" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Services", href: "#services" },
    { name: "Testimonial", href: "#testimonial" },
    // { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <header className="sticky top-0 z-50 w-full bg-logo">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
                {/* Brand Logo */}
                <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900">
                    <Image width={100} height={100} src={"/logo.png"} alt="Dhaka Visuals"></Image>
                </Link>


                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-semibold text-white transition-colors hover:text-zinc-900"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="#contact"
                        className="rounded-full bg-white hover:bg-logo px-4 py-2 text-sm font-semibold text-logo hover:text-white transition border-2 hover:border-white"
                    >
                        Get Started
                    </Link>
                </nav>

                {/* Mobile Hamburger Button */}
                <div className="flex md:hidden">
                    <button
                        type="button"
                        onClick={toggleMenu}
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation menu"
                        className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white hover:text-logo focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            {isOpen && (
                <nav className="md:hidden border-t border-zinc-200 bg-logo px-4 pt-3 pb-6">
                    <div className="flex flex-col text-center space-y-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="rounded-md px-3 py-2 text-base font-semibold text-white hover:bg-white hover:text-logo"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="mt-2 text-center rounded-md bg-white px-4 py-2.5 text-base font-semibold text-logo hover:text-white transition hover:bg-logo border-2 box-border"
                        >
                            Get Started
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
}