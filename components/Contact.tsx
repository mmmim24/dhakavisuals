import { inter } from "@/app/fonts";
export default function Contact() {
    return (
        <section id="contact" className="min-h-100 max-w-300 flex flex-col items-center md:items-start justify-center px-4 py-8 sm:px-6 lg:px-8">
            <h1 className={`${inter.className} text-3xl font-bold`}>
                Contact
            </h1>
        </section>
    )
}