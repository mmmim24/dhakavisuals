import { roboto_flex, roboto_slab, roboto_mono, robotoserif, roboto_con } from "@/app/fonts";
export default function Hero() {
    return (
        <section id="hero" className="min-h-100 w-full flex flex-col gap-10 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <h1 className={`tracking-tighter mx-auto text-center text-5xl font-bold`}>Audio Visual Production</h1>
            <h1 className={`${roboto_slab.className} tracking-tighter mx-auto text-center text-5xl font-bold`}>Audio Visual Production</h1>
            <h1 className={`${roboto_flex.className} tracking-tighter mx-auto text-center text-5xl font-bold`}>Audio Visual Production</h1>
            <h1 className={`${roboto_mono.className} tracking-tighter mx-auto text-center text-5xl font-bold`}>Audio Visual Production</h1>
            <h1 className={`${robotoserif.className} tracking-tighter mx-auto text-center text-5xl font-bold`}>Audio Visual Production</h1>
            <h1 className={`${roboto_con.className} tracking-tighter mx-auto text-center text-5xl font-bold`}>Audio Visual Production</h1>
        </section>
    )
}