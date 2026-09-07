import Link from "next/link";
import Image from "next/image";
import { mont } from "@/app/fonts";

interface FooterLink {
    name: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

const footerSections: FooterSection[] = [
    {
        title: "Product",
        links: [
            { name: "Overview", href: "/overview" },
            { name: "Features", href: "/features" },
            { name: "Roadmap", href: "/roadmap" },
            { name: "Pricing", href: "/pricing" },
        ],
    },
    {
        title: "Company",
        links: [
            { name: "About", href: "/about" },
            { name: "Blog", href: "/blog" },
            { name: "Careers", href: "/careers" },
            { name: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Cookie Settings", href: "/cookies" },
        ],
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`${mont.className}`}>
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">

                    <div className="md:col-span-1">

                        <div className="flex justify-center sm:justify-start items-center sm:items-start">
                            <Image width={200} height={200} src={"/logo.svg"} alt="Dhaka Visuals"></Image>
                        </div>

                        <p className="mt-3 text-xl tracking-tight text-center sm:text-left leading-relaxed">
                            Premium Multimedia Production & Visual Documentation
                        </p>
                    </div>

                    <div className="grid grid-cols-1 justify-center sm:justify-start items-center sm:items-start text-center sm:text-left gap-8 sm:grid-cols-3 md:col-span-3">
                        {footerSections.map((section) => (
                            <div key={section.title}>
                                <h3 className="text-md font-semibold">
                                    {section.title}
                                </h3>
                                <ul className="mt-4 space-y-2.5">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-sm transition-colors hover:text-zinc-900"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 border-t border-zinc-200 pt-8 sm:flex sm:items-center sm:justify-between text-center sm:text-left">
                    <p className="text-xs">
                        &copy; {currentYear} Dhaka Visuals , BD. All rights reserved.
                    </p>
                    <div className="mt-4 flex justify-center sm:justify-start space-x-6 sm:mt-0">
                        <Link href="https://www.facebook.com/people/Dhaka-Visuals/61564926180665/" target="_blank" rel="noreferrer" className="text-xs hover:text-zinc-900">
                            Facebook
                        </Link>
                        <Link href="https://www.instagram.com/dhakavisuals.bd/" target="_blank" rel="noreferrer" className="text-xs hover:text-zinc-900">
                            Instagram
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-xs hover:text-zinc-900">
                            LinkedIn
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}