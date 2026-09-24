import { fraunces } from "@/app/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-140 max-w-7xl mx-auto flex gap-10 justify-between items-end px-4 py-8 sm:px-6 lg:px-8">
            <div className="w-2/3 tracking-[-1] sm:tracking-[-2] md:tracking-[-3] lg:tracking-[-4] leading-13 sm:leading-15 md:leading-18 lg:leading-22 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium">
                <p className={`${fraunces.className} font-light`}>Complete </p>
                <p className={`${fraunces.className} font-light`}><span className="italic font-gradient mr-4">Audio Visual </span>Solution</p>
                {/* <span className="block font-light">Audio Visual</span>
                <span className="block font-light">Production Company</span> */}
                {/* <span className="block font-semibold tracking-[-2] sm:tracking-[-3] md:tracking-[-3] lg:tracking-[-4] text-[46px] sm:text-[54px] md:text-[68px] lg:text-[84px]">
                    Production Company
                </span> */}
                <p className="text-lg font-light tracking-normal text-justify mt-16">
                    Dhaka Visuals is a creative audio-visual production agency in Dhaka helping brands, organizations, institutions, companies, and creators scale through cinematic commercial videos, high-converting content, and professional photography. We partner with a select group of projects each season for maximum creative focus.
                </p>
            </div>
            <div >
                <Link className="hidden absolute bottom-8 right-8 w-32 md:flex justify-between gap-1 rounded-full hover:bg-[#24CC63] bg-white hover:border-white font-medium text-[#24CC63]  hover:text-white p-2 tracking-tight   transition border-2 box-border items-center" target="_blank" href="https://wa.me/+8801534996679">
                    <span className="ml-2">
                        Chat on
                    </span>
                    <FontAwesomeIcon size="xl" icon={faWhatsapp} />
                </Link>
            </div>
        </section>
    )
}