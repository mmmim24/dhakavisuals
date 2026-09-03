import { sansita, lora, dM_Sans, dM_Serif_Display, playfair_Display, oleo_Script, kaushan_Script } from "@/app/fonts";
export default function Hero() {
    return (
        <section id="hero" className="min-h-100 w-full flex flex-col gap-10 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <h1 className={`${dM_Sans.className} tracking-tighter mx-auto text-center text-5xl font-bold`}>Audio Visual Production</h1>
            <h1 className={`${sansita.className} tracking-tighter mx-auto text-center text-5xl font-bold`}>Audio Visual Production</h1>
            <h1 className={`${lora.className} tracking-tighter mx-auto text-center text-5xl font-bold`}>Audio Visual Production</h1>
            <h1 className={`${dM_Serif_Display.className} tracking-tighter mx-auto text-center text-5xl font-bold`}>Audio Visual Production</h1>
            <h1 className={`${playfair_Display.className} tracking-tighter mx-auto text-center text-5xl font-bold`}>Audio Visual Production</h1>
            <h1 className={`${oleo_Script.className} tracking-tighter mx-auto text-center text-5xl font-bold`}>Audio Visual Production</h1>
            <h1 className={`${kaushan_Script.className} tracking-tighter mx-auto text-center text-5xl font-bold`}>Audio Visual Production</h1>
        </section>
    )
}