import { fraunces } from "@/app/fonts";
import { Phone, Mail, MapPin } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Instagram from "@/public/instagram.png";
import Image from "next/image";
import Link from "next/link";
const contacts = [
  {
    icon: <Mail size={24} />,
    name: "Email",
    value: "dhakavisuals.bd@gmail.com",
    // ref: <Link href="mailto:dhakavisuals.bd@gmail.com">dhakavisuals.bd@gmail.com</Link>,
  },
  {
    icon: <Phone size={24} />,
    name: "Phone",
    value: "+880 1329 831249",
  },
  {
    icon: <MapPin size={24} />,
    name: "Location",
    value: "29 / A, Purana Paltan, Dhaka - 1000"
  }
];
const socials = [
  {
    icon: <FontAwesomeIcon icon={faFacebook} size="3x" />,
    name: "Facebook",
    value: "https://www.facebook.com/people/Dhaka-Visuals/61564926180665/",
  },
  {
    icon: <Image src={Instagram} alt="instagram" className="mx-1.5 w-8 md:w-10 h-auto" />,
    name: "Instagram",
    value: "https://www.instagram.com/dhakavisuals.bd/",
  },
  {
    icon: <FontAwesomeIcon icon={faLinkedin} size="3x" />,
    name: "Linkedin",
    value: "https://www.linkedin.com/company/dhakavisuals/home/",
  },
];
export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-100 bg-zinc-500/10 w-full flex flex-col gap-10 md:gap-20 items-center justify-center px-4 py-8 md:py-16 sm:px-6 lg:px-8">
      <div className="text-center flex flex-col">
        <h1
          className={`text-3xl md:text-4xl xl:text-5xl font-bold tracking-tighter mb-5 lg:mb-10`}>
          Get in <span className="font-gradient">Touch</span>
        </h1>
        <div className="text-center flex flex-col gap-5">
          <h3 className="text-lg md:text-xl xl:text-2xl tracking-tight">
            Have a Story in Mind?
          </h3>
          <h5 className="font-light md:text-lg xl:text-xl tracking-tight">
            Every good project starts with a conversation. Tell us what you're imagining, and let's bring it to the screen together.
          </h5>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-y-12 md:gap-x-12">
        <div className="md:w-1/2 flex flex-col gap-4 justify-between">
          {contacts.map((contact) => (
            <div
              key={contact.name}
              className="h-20 bg-white rounded-xl p-4 flex items-center gap-4 text-xs md:text-sm">
              <div className="bg-gradient rounded-full text-white p-2">
                {contact.icon}
              </div>
              <div>
                <div className="font-medium">{contact.name}</div>
                <div className="font-light">{contact.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* <h1
          className={`lg:w-1/3 self-center text-3xl text-center md:text-4xl xl:text-5xl font-bold tracking-tighter`}>
          Let's Collaborate
        </h1> */}

        <div
          className="md:w-1/2 flex flex-col gap-4 justify-between *:bg-white *:rounded-xl *:p-4 *:flex *:flex-row-reverse  *:items-center *:gap-2 *:nth-[1]:text-blue-500 *:nth-[3]:text-blue-600
        *:duration-500 *:transition-all">
          {socials.map((social) => (
            <Link
              key={social.name}
              className="text-xs h-20 flex justify-end md:text-sm"
              href={social.value}>
              <div className="text-zinc-950">{social.name}</div>
              <div>{social.icon}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
