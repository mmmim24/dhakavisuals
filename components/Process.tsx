const process = {
    "title": "The Optimized Production Workflow",
    "steps": [
        {
            "title": "Strategy & Concept Development",
            "description": "We align on your core business goals, brainstorm high-converting creative hooks, and lock in a transparent timeline schedule."
        },
        {
            "title": "Pre-Production & Blueprinting",
            "description": "We translate the concept into actionable blueprints: detailed storyboards, script fine-tuning, location scouting, and talent casting."
        },
        {
            "title": "Execution & Capture",
            "description": "Our crew brings the vision to life on set using professional cinema rigs, FPV drones, and expert lighting setups."
        },
        {
            "title": "Post-Production & Creative Quality Control",
            "description": "We handle the editing and effects, backed by structured feedback rounds to guarantee the final output hits your exact brand standard."
        },
        {
            "title": "Optimization & Multi-Format Delivery",
            "description": "We package your final assets formatted precisely for your website, ad platforms, or social channels."
        }
    ]
}
export default function Process() {
    return (
        <section id="process" className="min-h-100 w-full flex flex-col gap-16 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Process
            </h1>
            <div className="w-full max-w-7xl bg-zinc-800/20 flex flex-col lg:flex-row *:lg:w-1/2 gap-20 text-justify">
                <div className="space-y-8">

                    <div className="space-y-8">

                        <p>Complete Audio-Visual Solution</p>

                        <p>Dhaka Visuals is a creative audio-visual production agency in Dhaka helping brands, organizations, institutions, companies, and creators scale through cinematic commercial videos, high-converting content, and professional photography. We partner with a select group of projects each season for maximum creative focus.</p>

                        <p>Transparent communication, zero creative friction, and on-time delivery guaranteed.</p>

                    </div>

                    <div className="grid grid-cols-3 gap-4 *:h-35">

                        <div className="bg-red-500/20"></div>

                        <div className="bg-green-500/20"></div>

                        <div className="bg-blue-500/20"></div>
                    </div>

                </div>
                <div className="space-y-8">
                    <h1>{process.title}</h1>
                    <ul className="list-disc marker:text-logo">
                        {
                            process.steps.map((s, idx) => {
                                return (
                                    <div key={idx}>
                                        <li>
                                            {s.title}
                                        </li>
                                        <p>{s.description}</p>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}