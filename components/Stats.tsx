import { CountUp } from "./CountUp";

const stats = [
    { end: 100, suffix: "+", label: "Projects Completed" },
    { end: 50, suffix: "+", label: "Clients & Partners" },
    { end: 100, suffix: "+", label: "Videos Produced" },
    { end: 5, suffix: "+", label: "Years of Experience" },
];

export function Stats() {
    return <section id="stats" className="bg-zinc-100 w-full flex flex-col gap-4 items-center justify-center py-10 lg:py-20 shadow-xl">
        <div className="max-w-7xl w-full grid grid-cols-2 lg:grid-cols-4 gap-y-10 text-center">
            {stats.map((stat) => (
                <div key={stat.label}>
                    <CountUp
                        end={stat.end}
                        suffix={stat.suffix}
                        duration={5000}
                        className="text-3xl md:text-4xl xl:text-5xl font-gradient font-semibold mb-2 md:mb-3 xl:mb-4"
                    />
                    <p className="text-lg md:text-xl xl:text-2xl tracking-tight font-light">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    </section>
}