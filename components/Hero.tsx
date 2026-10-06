import { fraunces } from "@/app/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[calc(100dvh-315px)] md:h-[calc(100dvh-380px)] max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center md:justify-between md:items-center gap-10 px-4 mb-8 sm:px-6 lg:px-8">
      <div className="w-full md:w-2/3 flex flex-col justify-center md:justify-start items-center md:items-baseline text-center md:text-left">
        <div className="tracking-[-1] sm:tracking-[-2] md:tracking-[-3] lg:tracking-[-4] leading-13 sm:leading-9 md:leading-13 lg:leading-16 xl:leading-19 text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light">
          <p className={`${fraunces.className} inline md:block`}>Complete </p>
          <p className={`${fraunces.className} inline md:block`}>
            <span className="italic font-gradient mr-1 sm:mr-2 lg:mr-3 xl:mr-4">
              Audio Visual{" "}
            </span>
            Solution
          </p>
        </div>

        <p className="text-xs sm:text-sm xl:text-lg font-light tracking-tight md:tracking-normal md:text-justify mt-2 sm:mt-4 md:mt-8 lg;mt-12 xl:mt-16">
          Dhaka Visuals is a creative audio-visual production agency in Dhaka
          helping brands, organizations, institutions, companies, and creators
          scale through cinematic commercial videos, high-converting content,
          and professional photography. We partner with a select group of
          projects each season for maximum creative focus.
        </p>
      </div>

      <div className="visible md:w-1/3">
        <Link
          className="fixed z-25 md:absolute bottom-6 md:bottom-47 xl:bottom-35 right-2 md:right-2 h-12 w-12 mx-4 md:w-32 flex justify-center md:justify-between gap-1 rounded-full hover:bg-white md:hover:bg-[#24CC63] bg-[#24CC63] md:bg-white hover:border-white font-medium text-white md:text-[#24CC63] hover:text-[#24CC63] md:hover:text-white p-2 tracking-tight   transition border-2 box-border items-center"
          target="_blank"
          href="https://wa.me/+8801534996679">
          <span className="ml-2 hidden md:inline">Chat on</span>
          <FontAwesomeIcon size="xl" icon={faWhatsapp} />
        </Link>
      </div>
    </section>
  );
}
