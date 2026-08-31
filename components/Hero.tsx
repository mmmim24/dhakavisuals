import { marcellus } from "@/app/fonts";
export default function Hero() {
    return (
        <div className="min-h-100 w-full flex flex-col items-center md:items-start justify-center px-4 py-8 sm:px-6 lg:px-8">
            <h1 className={`${marcellus.className} text-3xl font-bold`}>Audio Visual Production and Event Coverage</h1>
        </div>
    )
}