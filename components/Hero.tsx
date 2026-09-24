import { fraunces } from "@/app/fonts";

export default function Hero() {
    return (
        <section id="hero" className="min-h-140 max-w-7xl mx-auto flex gap-10 justify-between items-center px-4 py-8 sm:px-6 lg:px-8">
            <div className="tracking-[-1] sm:tracking-[-2] md:tracking-[-3] lg:tracking-[-4] leading-13 sm:leading-15 md:leading-18 lg:leading-22 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium">
                <span className={`${fraunces.className} block font-light`}>Complete </span>
                <span className={`${fraunces.className} block font-light`}><span className="italic font-gradient mr-4">Audio Visual </span>Solution</span>
                {/* <span className="block font-light">Audio Visual</span>
                <span className="block font-light">Production Company</span> */}
                {/* <span className="block font-semibold tracking-[-2] sm:tracking-[-3] md:tracking-[-3] lg:tracking-[-4] text-[46px] sm:text-[54px] md:text-[68px] lg:text-[84px]">
                    Production Company
                </span> */}
                <p className="text-lg font-light tracking-wide w-1/2 mt-16">
                    Dhaka Visuals is a creative audio-visual production agency in Dhaka helping brands, organizations, institutions, companies, and creators scale through cinematic commercial videos, high-converting content, and professional photography. We partner with a select group of projects each season for maximum creative focus.
                </p>
            </div>
        </section>
    )
}