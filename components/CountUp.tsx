"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
    end: number;
    suffix?: string;
    duration?: number;
    className?: string;
};

export function CountUp({ end, suffix, duration = 1000, className }: CountUpProps) {
    const ref = useRef<HTMLParagraphElement>(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let raf = 0;

        const animate = () => {
            const start = performance.now();

            const tick = (now: number) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setValue(Math.round(eased * end));
                if (progress < 1) raf = requestAnimationFrame(tick);
            };

            raf = requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                cancelAnimationFrame(raf);
                if (entry.isIntersecting) {
                    animate();
                } else {
                    setValue(0);
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [end, duration]);

    return (
        <p ref={ref} className={className}>
            {value}
            {suffix}
        </p>
    );
}