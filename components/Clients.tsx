import Image from "next/image";
import brac from "@/public/clients/brac.png";
import fao from "@/public/clients/FAO_logo.svg"
import ypf from "@/public/clients/YPF-Logo.png"
import buet from "@/public/clients/BUET_LOGO.svg"
import bs23 from "@/public/clients/Brain-Station-23-Logo.png"
import aga from "@/public/clients/aka.png"
import ccc from "@/public/clients/cathweld construction company.png"
import bit from "@/public/clients/bit.png"
import fsa from "@/public/clients/fsa.png"
import mindspace from "@/public/clients/mindspace.png"


import Marquee from "react-fast-marquee";
import { mont } from "@/app/fonts";

interface Client {
    name: string,
    src: string
}

const clients: Client[] = [
    { name: "fsa", src: fsa },
    { name: "brac", src: brac },
    { name: "buet", src: buet },
    { name: "ypf", src: ypf },
    { name: "bs23", src: bs23 },
    { name: "aga", src: aga },
    { name: "ccc", src: ccc },
    { name: "mindspace", src: mindspace },
    { name: "fao", src: fao },
    { name: "bit", src: bit }
]


export default function Clients() {
    return (
        <section id="clients" className="bg-zinc-50 w-full flex flex-col gap-4 items-center justify-center py-4 shadow-xl">
            <h5 className={`${mont.className} mx-auto text-sm md:text-base tracking-[8px]`}>
                TRUSTED BY
            </h5>
            <Marquee autoFill={true} pauseOnHover={true} speed={100}>
                <ul className="h-30 md:h-45 flex items-center justify-center gap-15 md:gap-25 first:ml-15 md:first:ml-20">
                    {[...clients].map((client, index) => (
                        <li key={`client-${client.name}-${index}`}>
                            <Image className="w-20 md:w-30 h-20 md:h-30 object-contain
                            hover:scale-150 transition-all duration-500" src={client.src} width={150} height={150} alt={client.name} />
                        </li>
                    ))}
                </ul>
            </Marquee>
        </section>
    )
}