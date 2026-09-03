import Image from "next/image";
import Photography from "./Photography";
import Videography from "./Videography";
import { dM_Serif_Display } from "@/app/fonts";
export default function Portfolio() {
    return (
        <section id="portfolio" className="min-h-100 border-y border-zinc-200 w-full flex flex-col gap-20 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <h1 className={`${dM_Serif_Display.className} text-5xl font-bold`}>
                Portfolio
            </h1>
            <div className="space-y-20 w-full">
                <Photography />
                <Videography />
            </div>
        </section>
    )
}