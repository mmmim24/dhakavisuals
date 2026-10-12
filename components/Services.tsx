"use client"
import React from "react";
import {
    CircleFadingPlus,
    UserRoundGroup,
    MicAudioLines,
    Video,
    Camera,
    MonitorCog
} from "lucide-react";
import { fraunces, mont } from "@/app/fonts";

const TILT_PAIRS: [number, number][] = [
    [8, -2],
    [-7, 3],
    [3, 9],
    [-2, 8],
    [3, -7],
    [9, 3],
];

const cardClasses = [
    "service-card relative bg-transparent shadow-2xl rounded-3xl",
    "transition-[rotate,scale,translate] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
    "hover:scale-115 hover:z-20 lg:hover:rotate-0!",
    "lg:nth-[2n+1]:rotate-(--tilt-odd) lg:nth-[2n]:rotate-(--tilt-even)",
    "lg:not-nth-[3n+1]:[.service-card:hover+&]:translate-x-15",
    "lg:not-nth-[3n]:[&:has(+.service-card:hover)]:-translate-x-15",
].join(" ");

const services = [
    {
        name: <div><p>Content</p><p>Creation</p></div>,
        icon: <CircleFadingPlus size={30} />,
        list: ["High-Converting Video Sales Letters", "Talking Heads", "Creator Content & Vlogs", "Short Form Contents"]
    },
    {
        name: <div><p>Event</p><p>Coverage</p></div>,
        icon: <UserRoundGroup size={30} />,
        list: ["Live Documentation", "Dynamic Reels", "Full-Session Recordings"]
    },
    {
        name: <div><p>Podcast</p><p>Production</p></div>,
        icon: <MicAudioLines size={30} />,
        list: ["End-to-End Audio Visual Production", "Set Design", "Editing"]
    },
    {
        name: <div><p>Video</p><p>Production</p></div>,
        icon: <Video size={30} />,
        list: ["Brand Commercials", "Product Campaigns", "Real Estate & Architecture", "Social Ads & Reels", "Documentaries", "AI-Generated Video Content", "Drone & FPV"]
    },
    {
        name: <div><p>Creative</p><p>Photography</p></div>,
        icon: <Camera size={30} />,
        list: ["Product Shoots", "Brand Portfolios", "Studio Sessions", "Interiors & Architecture", "Social Documentaries"]
    },
    {
        name: <div><p>Post</p><p>Production</p></div>,
        icon: <MonitorCog size={30} />,
        list: ["Advanced Editing", "Color Grading", "Motion Graphics & VFX", "Audio Engineering", "AI-Enhanced Post-Production"]
    },
]
export default function Services() {

    const [pairIndex, setPairIndex] = React.useState(0);
    const [odd, even] = TILT_PAIRS[pairIndex];

    const gridStyle = {
        "--tilt-odd": `${odd}deg`,
        "--tilt-even": `${even}deg`,
    } as React.CSSProperties;

    return (
        <section id="services" className="min-h-100 w-full flex flex-col gap-10 lg:gap-20 items-center justify-center px-4 py-8 md:py-16 sm:px-6 lg:px-8">
            <h3 className={`text-3xl md:text-4xl xl:text-5xl font-bold tracking-tighter`}>
                Our <span className="font-gradient">Expertise</span>
            </h3>
            <div
                style={gridStyle}
                className="p-0 w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-0 text-lg"
            >
                {
                    services.map((service, index) => {
                        return (
                            <div
                                key={index}
                                onMouseEnter={() =>
                                    setPairIndex((i) => (i + 1) % TILT_PAIRS.length)
                                }
                                className={cardClasses}
                            >
                                <div className="bg-white lg:bg-[linear-gradient(135deg,white,rgba(235,235,235),white,rgba(235,235,235),white)] m-2 text-black shadow-2xl rounded-2xl px-12 py-8 gap-3 md:gap-6 sm:h-70 lg:h-75 xl:h-80 flex flex-col items-start justify-start">
                                    <div className="w-full flex justify-between items-center">
                                        <div className={`text-xl font-medium tracking-tighter sm:text-base md:text-xl xl:text-2xl -ml-4`}>
                                            {service.name}
                                        </div>
                                        <div className="-ml-4 bg-gradient text-white border-2 p-2 rounded-full">
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