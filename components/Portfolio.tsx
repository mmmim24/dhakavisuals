import Image from "next/image";
import Photography from "./Photography";
import Videography from "./Videography";
export default function Portfolio() {
    return (
        <section id="portfolio" className="min-h-100 border-y border-black w-full flex flex-col gap-20 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <h1 className={` text-3xl font-bold`}>
                Portfolio
            </h1>
            <div className="space-y-20">
                <Photography />
                <Videography />
            </div>
        </section>
    )
}