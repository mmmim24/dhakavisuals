import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
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
      { name: "Process", href: "/#process" },
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
  // {
  //   title: "Contact",
  //   links: [
  //     {
  //       name: "Facebook",
  //       href: "https://www.facebook.com/people/Dhaka-Visuals/61564926180665/",
  //       icon: <FontAwesomeIcon icon={faFacebook} />,
  //     },
  //     {
  //       name: "Instagram",
  //       href: "https://www.instagram.com/dhakavisuals.bd/",
  //       icon: <FontAwesomeIcon icon={faInstagram} />,
  //     },
  //     {
  //       name: "Linkedin",
  //       href: "https://www.linkedin.com/company/dhakavisuals/home/",
  //       icon: <FontAwesomeIcon icon={faLinkedin} />,
  //     },
  //   ],
  // },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`font-light bg-gradient text-white`}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">

          <div className="md:w-1/3">
            <div className="flex justify-center md:justify-start items-center md:items-start">
              <Image
                className="w-auto h-auto"
                width={75}
                height={75}
                src={"/logo_white.png"}
                loading="eager"
                alt="Dhaka Visuals"></Image>
            </div>

            <p className="mt-3 text-center md:text-left leading-relaxed">
              From photography to video production, we turn ideas into compelling visual experiences that connect, communicate, and inspire.
            </p>
          </div>

          <div className="md:w-1/2 grid grid-cols-1 justify-center sm:justify-start items-center sm:items-start text-center md:text-left gap-8 md:grid-cols-2 md:col-span-5">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-md font-semibold">{section.title}</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      {link?.href ? (
                        <Link
                          href={link.href}
                          target="_blank"
                          className=" transition-colors hover:text-logo flex justify-center md:justify-start items-center gap-1">
                          {link.icon}
                          {link.name}
                        </Link>
                      ) : (
                        <p>{link.name}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-200 pt-8 sm:flex sm:items-center text-xs sm:justify-between text-center sm:text-left">
          <p>&copy; {currentYear} Dhaka Visuals. All rights reserved.</p>
          <Link href="https://github.com/mmmim24/" target="_blank">
            Developed by
          </Link>
        </div>
      </div>
    </footer>
  );
}
