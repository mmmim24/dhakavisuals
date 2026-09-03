import { sansita } from "@/app/fonts";

export default function Testimonial() {
    return (
        <section id="testimonial" className="min-h-100 w-full flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <h1 className={`${sansita.className} text-5xl font-bold`}>
                Testimonial
            </h1>
        </section>
    )
}