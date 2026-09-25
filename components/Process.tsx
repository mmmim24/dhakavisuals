import { fraunces } from "@/app/fonts"
import {
    TicTacToe,
    FileBox,
    Clapperboard,
    ShieldCheck,
    PackageCheck
} from "lucide-react"
import Marquee from "react-fast-marquee"

const process = {
    "title": "The Optimized Production Workflow",
    "steps": [
        {
            "title": "Strategy & Concept Development",
            "description": "We align on your core business goals, brainstorm high-converting creative hooks, and lock in a transparent timeline schedule.",
            "icon": <TicTacToe />
        },
        {
            "title": "Pre-Production & Blueprinting",
            "description": "We translate the concept into actionable blueprints: detailed storyboards, script fine-tuning, location scouting, and talent casting.",
            "icon": <FileBox />
        },
        {
            "title": "Execution & Capture",
            "description": "Our crew brings the vision to life on set using professional cinema rigs, FPV drones, and expert lighting setups.",
            "icon": <Clapperboard />
        },
        {
            "title": "Post-Production & Creative Quality Control",
            "description": "We handle the editing and effects, backed by structured feedback rounds to guarantee the final output hits your exact brand standard.",
            "icon": <ShieldCheck />
        },
        {
            "title": "Optimization & Multi-Format Delivery",
            "description": "We package your final assets formatted precisely for your website, ad platforms, or social channels.",
            "icon": <PackageCheck />
        }
    ]
}
export default function Process() {
    return (
        <section id="process" className="min-h-100 w-full flex flex-col gap-10 lg:gap-20 items-center justify-center px-4 py-8 md:py-16 sm:px-6 lg:px-8 ">

            <h3 className={`${fraunces.className} text-3xl md:text-4xl xl:text-5xl font-medium`}>
                How We Will Work
            </h3>

            <div className="w-full max-w-7xl bg-transparent rounded-3xl p-3 shadow-2xl">

                <div className="flex flex-col lg:flex-row *:lg:w-1/2 gap-20 text-justify font-light bg-white shadow-2xl rounded-2xl p-10">

                    <div className="space-y-16">

                        <div className="space-y-16">

                            <p className="text-2xl">Complete Audio-Visual Solution</p>

                            <p className="italic tracking-tight">Dhaka Visuals is a creative audio-visual production agency in Dhaka helping brands, organizations, institutions, companies, and creators scale through cinematic commercial videos, high-converting content, and professional photography. We partner with a select group of projects each season for maximum creative focus.</p>

                            <p className="text-xl">Transparent communication, zero creative friction, and on-time delivery guaranteed.</p>

                        </div>

                        <Marquee autoFill={true} pauseOnHover={true} speed={100}>

                            <div className="flex gap-4 *:h-65 *:w-65">

                                <div className="flex-1 bg-red-500/20"></div>

                                <div className="flex-1 bg-green-500/20"></div>

                                <div className="flex-1 bg-blue-500/20 mr-4"></div>

                            </div>

                        </Marquee>

                    </div>

                    <div className="space-y-16">

                        <h3 className={`${fraunces.className} text-left tracking-tight font-normal text-3xl`}>{process.title}</h3>

                        <ul className="space-y-8">
                            {
                                process.steps.map((s, idx) => {
                                    return (
                                        <div key={idx} className="space-y-4">

                                            <li className="font-normal flex gap-4">
                                                <span className="inline text-logo">{s.icon}</span>{s.title}
                                            </li>

                                            <p className="text-justify">
                                                {s.description}
                                            </p>

                                        </div>
                                    )
                                })
                            }
                        </ul>

                    </div>

                </div>

            </div>

        </section>
    )
}