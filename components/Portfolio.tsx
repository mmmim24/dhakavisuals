import Photography from "./Photography";
import Videography from "./Videography";
export default function Portfolio() {
    return (
        <section id="portfolio" className="min-h-100 bg-zinc-500/10 w-full flex flex-col gap-10 lg:gap-20 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
                Portfolio
            </h1>
            <div className="space-y-10 lg:space-y-20 w-full">
                <Photography />
                <Videography />
            </div>
        </section>
    )
}