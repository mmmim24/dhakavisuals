import { inter } from "@/app/fonts";
export default function Hero() {
    return (
        <section id="hero" className="min-h-100 w-full flex flex-col items-center md:items-start justify-center px-4 py-8 sm:px-6 lg:px-8">
            <h1 className={`${inter.className} text-3xl font-bold`}>Audio Visual Production and Event Coverage</h1>
        </section>
    )
}