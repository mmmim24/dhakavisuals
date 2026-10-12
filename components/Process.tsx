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
            "icon": <TicTacToe size={20} />
        },
        {
            "title": "Pre-Production & Blueprinting",
            "description": "We translate the concept into actionable blueprints: detailed storyboards, script fine-tuning, location scouting, and talent casting.",
            "icon": <FileBox size={20} />
        },
        {
            "title": "Execution & Capture",
            "description": "Our crew brings the vision to life on set using professional cinema rigs, FPV drones, and expert lighting setups.",
            "icon": <Clapperboard size={20} />
        },
        {
            "title": "Post-Production & Creative Quality Control",
            "description": "We handle the editing and effects, backed by structured feedback rounds to guarantee the final output hits your exact brand standard.",
            "icon": <ShieldCheck size={20} />
        },
        {
            "title": "Optimization & Multi-Format Delivery",
            "description": "We package your final assets formatted precisely for your website, ad platforms, or social channels.",
            "icon": <PackageCheck size={20} />
        }
    ]
}
export default function Process() {
    return (
        <section id="process" className="min-h-100 w-full flex flex-col gap-10 lg:gap-20 items-center justify-center px-4 py-12 md:py-24 sm:px-6 lg:px-8 ">
            <div className="text-center flex flex-col gap-5">
                <h1
                    className={`text-3xl md:text-4xl xl:text-5xl font-bold tracking-tighter`}>
                    Every project has a story. <span className="font-gradient">Let's make yours.</span>
                </h1>
                <h3 className="text-lg md:text-xl xl:text-2xl tracking-tight">
                    We find the story, shape the visuals, and bring it all together
                </h3>
            </div>

            <div className="w-full max-w-7xl bg-transparent rounded-3xl p-3 shadow-2xl">

                <div className="flex flex-col lg:flex-row gap-10 xl:gap-20 text-justify font-light bg-white shadow-2xl rounded-2xl p-4 sm:p-6 lg:p-10">

                    <div className="lg:w-2/5 space-y-6 lg:space-y-12 xl:space-y-16">

                        <div className="space-y-6 lg:space-y-12 xl:space-y-16">

                            <p className="text-lg sm:text-xl xl:text-2xl">Making It Happen</p>

                            <p className="italic text-sm xl:text-base tracking-tight">From the first idea to the final delivery, we work closely with you at every step to turn your vision into reality.
                            </p>

                            {/* <p className="text-base sm:text-lg xl:text-xl">Transparent communication, zero creative friction, and on-time delivery guaranteed.</p> */}

                        </div>

                        <Marquee autoFill={true} pauseOnHover={true} speed={100}>

                            <div className="flex gap-4 *:h-65 *:lg:h-100 *:w-65">

                                <div className="flex-1 bg-red-500/20"></div>

                                <div className="flex-1 bg-green-500/20"></div>

                                <div className="flex-1 bg-blue-500/20 mr-4"></div>

                            </div>

                        </Marquee>

                    </div>

                    <div className="space-y-6 lg:space-y-12 xl:space-y-16">

                        <h3 className={`text-left tracking-tight font-medium text-xl sm:text-2xl xl:text-3xl`}>{process.title}</h3>

                        <ul className="space-y-6 xl:space-y-8">
                            {
                                process.steps.map((step, idx) => {
                                    return (
                                        <div key={idx} className="shadow-xl rounded-2xl p-3 space-y-2 xl:space-y-3 border border-zinc-200">

                                            <li className="font-normal text-sm xl:text-base flex items-center gap-2 xl:gap-3">
                                                <span className="inline bg-gradient text-white rounded-full p-1.5">{step.icon}</span>{step.title}
                                            </li>

                                            <p className="text-sm xl:text-base">
                                                {step.description}
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