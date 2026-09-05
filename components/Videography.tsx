export default function Videography() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <h2 className="text-2xl text-center tracking-widest">Videography</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-lg font-semibold *:bg-white *:text-black *:border *:rounded-lg *:px-2 *:py-4 *:h-120 *:hover:bg-white *:hover:text-logo *:hover:border-logo *:transition-all *:duration-300 *:hover:scale-110 *:flex *:items-center *:justify-center">
                <div className="hover:after:content-['Commercial'] hover:after:absolute hover:after:inset-0 hover:after:bg-zinc-400 hover:after:text-amber-50 text-center items-center justify-center hover:after:my-auto hover:after:bg-opacity-50 hover:after:z-10">
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

        </div>
    )
}
