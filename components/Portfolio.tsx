import { inter } from "@/app/fonts";
export default function Portfolio() {
    return (
        <section id="portfolio" className="min-h-100 w-full flex flex-col items-center md:items-start justify-center px-4 py-8 sm:px-6 lg:px-8 text-logo">
            <h1 className={`${inter.className} text-3xl font-bold`}>
                Portfolio
            </h1>
        </section>
    )
}