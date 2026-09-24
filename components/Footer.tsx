import Link from "next/link";
import Image from "next/image";
import { mont } from "@/app/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { ReactElement } from "react";

interface FooterLink {
    name: string;
    href?: string;
    icon?: ReactElement;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

const footerSections: FooterSection[] = [
    {
        title: "Company",
        links: [
            { name: "Clients", href: "/#clients" },
            { name: "Services", href: "/#services" },
            { name: "Portfolio", href: "/#portfolio" },
            { name: "Testimonial", href: "/#testimonial" },
        ],
    },
    {
        title: "Services",
        links: [
            { name: "Content Creation" },
            { name: "Event Coverage" },
            { name: "Podcast Production" },
            { name: "Video Production" },
            { name: "Creative Photography" },
            { name: "Post Production" },
        ],
    },
    {
        title: "Contact",
        links: [
            { name: "Facebook", href: "https://www.facebook.com/people/Dhaka-Visuals/61564926180665/", icon: <FontAwesomeIcon icon={faFacebook} /> },
            { name: "Instagram", href: "https://www.instagram.com/dhakavisuals.bd/", icon: <FontAwesomeIcon icon={faInstagram} /> },
            { name: "Linkedin", href: "https://www.linkedin.com/company/dhakavisuals/home/", icon: <FontAwesomeIcon icon={faLinkedin} /> },
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
                            <Image className="w-auto h-auto" width={200} height={200} src={"/logo_text.png"} loading="eager" alt="Dhaka Visuals"></Image>
                        </div>

                        <p className="mt-3 text-xl tracking-tight text-center sm:text-left leading-relaxed">
                            Premium Audio Video Production Company
                        </p>
                    </div>

                    <div className="grid grid-cols-1 justify-center sm:justify-start items-center sm:items-start text-center sm:text-left gap-8 sm:grid-cols-3 md:col-span-3">
                        {footerSections.map((section) => (
                            <div key={section.title}>
                                <h3 className="text-md font-semibold">
                                    {section.title}
                                </h3>
                                <ul className="mt-4 space-y-2.5 text-sm">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            {
                                                link?.href ?
                                                    <Link
                                                        href={link.href}
                                                        target="_blank"
                                                        className=" transition-colors hover:text-logo gap-22"
                                                    >
                                                        {link.icon}
                                                        {link.name}
                                                    </Link> :
                                                    <p>
                                                        {link.name}
                                                    </p>
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 border-t border-zinc-200 pt-8 sm:flex sm:items-center text-xs sm:justify-between text-center sm:text-left">
                    <p >
                        &copy; {currentYear} Dhaka Visuals , BD. All rights reserved.
                    </p>
                    <Link href="https://github.com/mmmim24/" target="_blank" >
                        Developed by
                    </Link>
                </div>
            </div>
        </footer>
    );
}