import {
    CircleFadingPlus,
    UserRoundGroup,
    MicAudioLines,
    Video,
    Camera,
    MonitorCog
} from "lucide-react";
import { mont } from "@/app/fonts";

const services = [
    {
        name: <div><p>Content</p><p>Creation</p></div>,
        icon: <CircleFadingPlus />,
        list: ["High-Converting Video Sales Letters", "Talking Heads", "Creator Content & Vlogs"]
    },
    {
        name: <div><p>Event</p><p>Coverage</p></div>,
        icon: <UserRoundGroup />,
        list: ["Live Documentation", "Dynamic Reels", "Full-Session Recordings"]
    },
    {
        name: <div><p>Podcast</p><p>Production</p></div>,
        icon: <MicAudioLines />,
        list: ["End-to-End Audio Visual Production", "Set Design", "Editing"]
    },
    {
        name: <div><p>Video</p><p>Production</p></div>,
        icon: <Video />,
        list: ["Brand Commercials", "Product Campaigns", "Real Estate & Architecture", "Social Ads & Reels", "Documentaries"]
    },
    {
        name: <div><p>Creative</p><p>Photography</p></div>,
        icon: <Camera />,
        list: ["Product Shoots", "Brand Portfolios", "Studio Sessions", "Interiors & Architecture", "Social Documentaries"]
    },
    {
        name: <div><p>Post</p><p>Production</p></div>,
        icon: <MonitorCog />,
        list: ["Advanced Editing", "Color Grading", "Motion Graphics & VFX", "Audio Engineering"]
    },
]
export default function Services() {
    return (
        <section id="services" className="min-h-100 w-full flex flex-col gap-16 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold hover:bg-logo hover:text-white transition-colors duration-500 ease-in`}>
                Services
            </h1>
            <div className="m-4 p-4 w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-lg">
                {
                    services.map((service, index) => {
                        return (
                            <div
                                key={index}
                                className="bg-transparent hover:scale-115 shadow-2xl rounded-3xl transition-all duration-500"
                            >
                                <div className="bg-white m-2 text-black shadow-2xl rounded-2xl px-12 py-8 gap-3 md:gap-6 sm:h-64 xl:h-72 flex flex-col items-start justify-start glow-hover">
                                    <div className="w-full flex justify-between items-center">
                                        <div className={`${mont.className} text-xl font-medium tracking-widest sm:text-base md:text-lg xl:text-2xl -ml-4`}>
                                            {service.name}
                                        </div>
                                        <div className="-ml-4 text-logo border-2 p-2 rounded-xl">
                                            {service.icon}
                                        </div>
                                    </div>
                                    <ul className="mt-4 font-light marker:text-logo list-disc">
                                        {service.list.map((l, index) => (
                                            <li key={index} className="text-sm xl:text-base">{l}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}