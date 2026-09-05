"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavItem {
    name: string;
    href: string;
}

const navItems: NavItem[] = [
    { name: "Clients", href: "#clients" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Testimonial", href: "#testimonial" },
    // { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeHash, setActiveHash] = useState<string>("#clients");

    const toggleMenu = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        const sections = navItems
            .map((item) => document.getElementById(item.href.replace("#", "")))
            .filter((section): section is HTMLElement => section instanceof HTMLElement);

        if (!sections.length) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (visibleEntry) {
                    setActiveHash(`#${visibleEntry.target.id}`);
                }
            },
            {
                root: null,
                threshold: [0.2, 0.4, 0.6],
                rootMargin: "-15% 0px -40% 0px",
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const handleNavClick = (href: string) => {
        setActiveHash(href);

        const section = document.querySelector(href);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-md transition-colors duration-300">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
                {/* Brand Logo */}
                <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900">
                    <Image className='w-auto h-auto' width={100} height={100} src={"/logo.png"} loading="eager" alt="Dhaka Visuals"></Image>
                </Link>


                {/* Desktop Navigation */}
                <div className="relative hidden md:flex items-center justify-center overflow-hidden rounded-3xl p-[1.5px]">
                    {/* Rotating gradient beam behind the navbar */}
                    <div
                        className="absolute -inset-full animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_90%,transparent_90%,#e32332_50%,#e32332_50%)]"
                    />
                    <nav className="hidden md:flex bg-white z-1 rounded-3xl items-center px-4 py-2 space-x-8">
                        {navItems.map((item) => {
                            const isActive = activeHash === item.href;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    aria-current={isActive ? "page" : undefined}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        handleNavClick(item.href);
                                        window.history.pushState(null, "", item.href);
                                    }}
                                    className={`relative text-sm font-semibold transition-all duration-200  ${isActive
                                        ? "text-logo "
                                        : "text-zinc-900 hover:text-logo"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <Link
                    href="#contact"
                    className="hidden md:flex rounded-full hover:bg-white bg-logo px-4 py-2 text-sm font-semibold hover:text-logo text-white transition border-2 hover:border-logo box-border"
                >
                    Get Started
                </Link>

                {/* Mobile Hamburger Button */}
                <div className="flex md:hidden">
                    <button
                        type="button"
                        onClick={toggleMenu}
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation menu"
                        className="inline-flex items-center justify-center rounded-md p-2 hover:text-black text-logo focus:outline-none"
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
                <nav className="md:hidden border-t border-logo bg-white px-4 pt-3 pb-6">
                    <div className="flex flex-col text-center space-y-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="rounded-md px-3 py-2 text-base font-semibold text-logo hover:bg-logo hover:text-white"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="mt-2 text-center rounded-md bg-logo px-4 py-2.5 text-base font-semibold text-white hover:text-logo transition hover:bg-white border-2 box-border"
                        >
                            Get Started
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
}