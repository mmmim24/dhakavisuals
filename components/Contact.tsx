import { fraunces } from "@/app/fonts"
export default function Contact() {
    return (
        <section id="contact" className="min-h-100 bg-zinc-500/10 w-full flex items-center justify-center px-4 py-8 md:py-16 sm:px-6 lg:px-8">
            <h1 className={`${fraunces.className} text-3xl md:text-4xl xl:text-5xl font-medium`}>
                Let's Collaborate
            </h1>
        </section>
    )
}