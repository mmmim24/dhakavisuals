import Photography from "./Photography";
import Videography from "./Videography";
import { fraunces } from "@/app/fonts";
export default function Portfolio() {
    return (
        <section id="portfolio" className="min-h-100 bg-zinc-500/10 w-full flex flex-col gap-10 lg:gap-20 items-center justify-center text-center px-4 py-8 md:py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tighter">
                Creative Showcase
            </h1>
            <h3 className="text-xl md:text-2xl xl:text-3xl tracking-tight">
                Explore our portfolio of visual storytelling, where creativity meets purpose.
            </h3>
            <div className="space-y-10 lg:space-y-20 w-full">
                <Photography />
                <Videography />
            </div>
        </section>
    )
}