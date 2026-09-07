import Image from "next/image";
import Carousel from "./Carousel";
import { mont } from "@/app/fonts";

const photographyImages = [
    { src: "/photo/brac_1.jpg", alt: "BRAC World 1" },
    { src: "/photo/brac_2.jpg", alt: "BRAC World 2" },
    { src: "/photo/brac_3.jpg", alt: "BRAC World 3" },
    { src: "/photo/brac_4.jpg", alt: "BRAC World 4" },
];

export default function Photography() {
    return (
        <div className="space-y-8 w-full">
            <h2 className={`${mont.className} text-2xl tracking-widest text-center`}>Photography</h2>
            <Carousel images={photographyImages} />
        </div>
    )
}
