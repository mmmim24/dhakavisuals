import { fraunces } from "@/app/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-120 md:min-h-150 lg:min-h-100 xl:min-h-130 max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center md:justify-between md:items-center gap-10 px-4 mb-8 sm:px-6 lg:px-8">

            <div className="w-full md:w-2/3 flex flex-col justify-center md:justify-start items-center md:items-baseline text-center md:text-left">

                <div className="tracking-[-1] sm:tracking-[-2] md:tracking-[-3] lg:tracking-[-4] leading-13 sm:leading-9 md:leading-13 lg:leading-16 xl:leading-19 text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium">
                    <p className={`${fraunces.className} inline md:block font-light`}>Complete </p>
                    <p className={`${fraunces.className} inline md:block font-light`}><span className="italic font-gradient mr-1 sm:mr-2 lg:mr-3 xl:mr-4">Audio Visual </span>Solution</p>
                </div>

                <p className="text-xs sm:text-sm xl:text-lg font-light tracking-tight md:tracking-normal md:text-justify mt-2 sm:mt-4 md:mt-8 lg;mt-12 xl:mt-16">
                    Dhaka Visuals is a creative audio-visual production agency in Dhaka helping brands, organizations, institutions, companies, and creators scale through cinematic commercial videos, high-converting content, and professional photography. We partner with a select group of projects each season for maximum creative focus.
                </p>

            </div>

            <div className="invisible md:visible md:w-1/3">
                <Link className="md:absolute md:bottom-47 xl:bottom-35 right-8 w-32 md:flex justify-between gap-1 rounded-full hover:bg-[#24CC63] bg-white hover:border-white font-medium text-[#24CC63]  hover:text-white p-2 tracking-tight   transition border-2 box-border items-center" target="_blank" href="https://wa.me/+8801534996679">
                    <span className="ml-2">
                        Chat on
                    </span>
                    <FontAwesomeIcon size="xl" icon={faWhatsapp} />
                </Link>
            </div>

        </section>
    )
}