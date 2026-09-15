export default function Hero() {
    return (
        <section id="hero" className="min-h-100 w-full flex flex-col gap-10 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <p className="tracking-[-1] sm:tracking-[-2] md:tracking-[-3] lg:tracking-[-4] mx-auto text-center md:leading-15 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium">
                Premium Audio  <span className="block font-light">Visual Production</span>
                <span className="block font-medium tracking-[-2] sm:tracking-[-3] md:tracking-[-3] lg:tracking-[-4] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                    Company
                </span>
            </p>
        </section>
    )
}