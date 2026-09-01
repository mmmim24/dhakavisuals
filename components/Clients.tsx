import Image from "next/image";
import brac from "@/public/brac.png";
import fao from "@/public/fao_logo_3lines_en1.webp"
import ypf from "@/public/YPF-Logo.png"
import buet from "@/public/BUET_LOGO.svg"
import bs23 from "@/public/Brain-Station-23-Logo.jpg"
import shilpokola from "@/public/shilpokola.jpeg"
import tds from "@/public/tds.webp"
import aga from "@/public/aka.png"
import ccc from "@/public/cathweld construction company.png"
import af from "@/public/alliance_francaise.jpeg"
import bit from "@/public/bit.jpeg"
import dhaka_broadcast from "@/public/dhaka_broadcast.png"
import drik from "@/public/drik.png"
import fsa from "@/public/fsa.png"
import mindspace from "@/public/mindspace.jpeg"
import goethe from "@/public/goethe.jpeg"
import tbs from "@/public/tbs.webp"
import vibe from "@/public/lets_vibe.jpeg"


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
    { name: "shilpokola", src: shilpokola },
    { name: "tds", src: tds },
    { name: "aga", src: aga },
    { name: "dhaka_broadcast", src: dhaka_broadcast },
    { name: "ccc", src: ccc },
    { name: "drik", src: drik },
    { name: "mindspace", src: mindspace },
    { name: "goethe", src: goethe },
    { name: "fao", src: fao },
    { name: "tbs", src: tbs },
    { name: "bit", src: bit },
    { name: "lets_vibe", src: vibe },
    { name: "alliance_francaise", src: af },
]

import { inter } from "@/app/fonts";
export default function Clients() {
    return (
        <section id="clients" className="min-h-100 w-full flex flex-col items-center justify-center py-8">
            <h1 className={`${inter.className} mx-auto text-xl tracking-widest font-bold`}>
                TRUSTED BY INDUSTRY LEADERS
            </h1>
            <Marquee autoFill={true} pauseOnHover={true} className="h-50" speed={150}>
                <ul className="flex items-center justify-center gap-5 md:gap-10">
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