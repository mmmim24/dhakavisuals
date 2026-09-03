import { dM_Sans } from "@/app/fonts";

export default function Contact() {
    return (
        <section id="contact" className="min-h-100 border-y border-zinc-200 w-full flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <h1 className={`${dM_Sans.className} text-5xl font-bold`}>
                Contact
            </h1>
        </section>
    )
}