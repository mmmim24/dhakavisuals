const services = [
    {
        name: "Video Production",
        list: ["Brand Commercials", "Product Campaigns", "Real Estate & Architecture", "Social Ads & Reels", "Documentaries"]
    },
    {
        name: "Content Creation",
        list: ["High-Converting Video Sales Letters", "Talking Heads", "Creator Content & Vlogs"]
    },
    {
        name: "Creative Photography",
        list: ["Product Shoots", "Brand Portfolios", "Studio Sessions", "Interiors & Architecture", "Social Documentaries"]
    },
    {
        name: "Event Coverage",
        list: ["Live Documentation", "Dynamic Reels", "Full-Session Recordings"]
    },
    {
        name: "Podcast Production",
        list: ["End-to-End Audio Visual Production", "Set Design", "Editing"]
    },
    {
        name: "Post-Production",
        list: ["Advanced Editing", "Color Grading", "Motion Graphics & VFX", "Audio Engineering"]
    },
]
export default function Services() {
    return (
        <section id="services" className="min-h-100 w-full flex flex-col gap-16 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <h1 className={`text-5xl font-bold hover:bg-logo hover:text-white transition-colors duration-500 ease-in`}>
                Services
            </h1>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-lg font-semibold">
                {
                    services.map((service) => {
                        return (
                            <div key={service.name} className="bg-white text-black border rounded-lg px-12 py-8 gap-10 h-70 hover:border-logo transition-all duration-300 hover:scale-105 flex flex-col items-start justify-start">
                                <p className="text-2xl -ml-4">
                                    {service.name}
                                </p>
                                <ul className="marker:text-logo list-disc">
                                    {
                                        service.list.map((l, index) => {
                                            return (
                                                <li key={index}>{l}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}