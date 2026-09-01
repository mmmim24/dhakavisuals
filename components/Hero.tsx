import { inter } from "@/app/fonts";
export default function Hero() {
    return (
        <section id="hero" className="min-h-100 w-full flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <h1 className={`${inter.className} tracking-tighter mx-auto text-center text-5xl font-bold`}>Audio Visual Production and Event Coverage</h1>
        </section>
    )
}