export default function Hero() {
    return (
        <section id="hero" className="min-h-140 w-full flex flex-col gap-10 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <p className="tracking-[-1] sm:tracking-[-2] md:tracking-[-3] lg:tracking-[-4] mx-auto text-center leading-9 sm:leading-11 md:leading-14 lg:leading-17 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium">
                <span className="block font-light">Premium Audio Visual</span>
                <span className="block font-medium tracking-[-2] sm:tracking-[-3] md:tracking-[-3] lg:tracking-[-4] text-[46px] sm:text-[54px] md:text-[68px] lg:text-[84px]">
                    Production Company
                </span>
            </p>
        </section>
    )
}