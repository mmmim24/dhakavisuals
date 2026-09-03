import Image from "next/image";
import Carousel from "./Carousel";

const photographyImages = [
    { src: "/brac_1.jpg", alt: "BRAC World 1" },
    { src: "/brac_2.jpg", alt: "BRAC World 2" },
    { src: "/brac_3.jpg", alt: "BRAC World 3" },
    { src: "/brac_4.jpg", alt: "BRAC World 4" },
];

export default function Photography() {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl tracking-widest">Photography</h2>
            <Carousel images={photographyImages} />
        </div>
    )
}
