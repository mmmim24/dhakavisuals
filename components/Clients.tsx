import Image from "next/image";
import brac from "@/public/brac.png";
import fao from "@/public/fao_logo_3lines_en1.webp"
import ypf from "@/public/YPF-Logo.png"
import buet from "@/public/BUET_LOGO.svg"
import bs23 from "@/public/Brain-Station-23-Logo.jpg"
import aga from "@/public/aka.png"
import ccc from "@/public/cathweld construction company.png"
import bit from "@/public/bit.jpeg"
import fsa from "@/public/fsa.png"
import mindspace from "@/public/mindspace.jpeg"


import Marquee from "react-fast-marquee";

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
        <section id="clients" className="min-h-100 w-full flex flex-col gap-4 items-center justify-center py-8">
            <h5 className={`mx-auto text-sm tracking-[4px] font-bold`}>
                TRUSTED BY
            </h5>
            <Marquee autoFill={true} pauseOnHover={true} className="bg-zinc-50  shadow-xl py-8" speed={100}>
                <ul className="flex items-center justify-center gap-5 md:gap-25 first:ml-13">
                    {[...clients].map((client, index) => (
                        <li key={`client-${client.name}-${index}`}>
                            <Image className="w-20 md:w-30 h-20 md:h-30 object-contain
                            hover:scale-150 transition-all 5s" src={client.src} width={150} height={150} alt={client.name} />
                        </li>
                    ))}
                </ul>
            </Marquee>
        </section>
    )
}