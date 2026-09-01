import { inter } from "@/app/fonts";
export default function Services() {
    return (
        <section id="services" className="min-h-100 w-full flex flex-col gap-16 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <h1 className={`${inter.className} text-3xl font-bold`}>
                Services
            </h1>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-lg font-semibold *:bg-white *:text-black *:border *:rounded-lg *:px-2 *:py-4 *:h-40 *:hover:bg-white *:hover:text-logo *:hover:border-logo *:transition-all *:duration-300 *:hover:scale-120 *:flex *:items-center *:justify-center">
                <div>
                    <p >
                        Video Production
                    </p>
                </div>
                <div>
                    <p>
                        Event Coverage
                    </p>
                </div>
                <div>
                    <p>
                        Photography
                    </p>
                </div>
                <div>
                    <p>
                        Editing
                    </p>
                </div>
                <div>
                    <p>
                        Consulting
                    </p>
                </div>
                <div>
                    <p>
                        Training
                    </p>
                </div>
            </div>
        </section>
    )
}