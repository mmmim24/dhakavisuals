import { fraunces } from "@/app/fonts";
import { Phone, Mail } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
const contacts = [
  {
    icon: <Mail />,
    name: "Email",
    value: "dhakavisuals.bd@gmail.com",
  },
  {
    icon: <Phone />,
    name: "Phone",
    value: "+880 15349 96679",
  },
];
const socials = [
  {
    icon: <FontAwesomeIcon icon={faFacebook} />,
    name: "Facebook",
    value: "https://www.facebook.com/people/Dhaka-Visuals/61564926180665/",
  },
  {
    icon: <FontAwesomeIcon icon={faInstagram} />,
    name: "Instagram",
    value: "https://www.instagram.com/dhakavisuals.bd/",
  },
  {
    icon: <FontAwesomeIcon icon={faLinkedin} />,
    name: "Linkedin",
    value: "https://www.linkedin.com/company/dhakavisuals/home/",
  },
];
export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-100 bg-zinc-500/10 w-full flex flex-col gap-16 items-center justify-center px-4 py-8 md:py-16 sm:px-6 lg:px-8">
      {/* <h1
        className={`text-3xl md:text-4xl xl:text-5xl font-bold tracking-tighter`}>
        Let's Collaborate
      </h1> */}
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 flex flex-col gap-4 justify-between">
          {contacts.map((contact) => (
            <div
              key={contact.name}
              className="bg-white rounded-xl p-4 flex items-center gap-4 text-xs md:text-sm">
              <div className="bg-logo rounded-full text-white p-3">
                {contact.icon}
              </div>
              <div>
                <div className="font-medium">{contact.name}</div>
                <div className="font-light">{contact.value}</div>
              </div>
            </div>
          ))}
        </div>

        <h1
          className={`lg:w-1/3 self-center text-3xl text-center md:text-4xl xl:text-5xl font-bold tracking-tighter`}>
          Let's Collaborate
        </h1>

        <div
          className="lg:w-1/3 flex flex-col gap-4 justify-between *:bg-white *:rounded-xl *:p-4 *:flex *:items-center *:gap-2 *:nth-[1]:hover:text-blue-600 *:nth-[2]:hover:text-red-400 *:nth-[3]:hover:text-blue-600
        *:duration-500 *:transition-all">
          {socials.map((social) => (
            <Link
              key={social.name}
              className="text-xs flex justify-center lg:justify-start md:text-sm"
              href={social.value}>
              <div>{social.icon}</div>
              <div>{social.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
