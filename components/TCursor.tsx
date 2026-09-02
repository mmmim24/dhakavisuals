'use client';

import { useEffect, useRef } from 'react';

export default function TrailingCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    // Track target (real mouse) and interpolated (trailing) coordinates
    const mouse = useRef({ x: -100, y: -100 });
    const ring = useRef({ x: -100, y: -100 });

    useEffect(() => {
        // Disable on touch devices to prevent stuck/floating dots
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            // Update the instant lead dot directly
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        // Linear interpolation rate (0.15 = smooth delay, 0.05 = heavy drift)
        const LERP_FACTOR = 0.15;
        let animationFrameId: number;

        const render = () => {
            // Lerp formula: current + (target - current) * factor
            ring.current.x += (mouse.current.x - ring.current.x) * LERP_FACTOR;
            ring.current.y += (mouse.current.y - ring.current.y) * LERP_FACTOR;

            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            {/* Lead Dot */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed top-0 left-0 z-50 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-logo transition-opacity duration-300"
            />

            {/* Trailing Ring */}
            <div
                ref={ringRef}
                className="pointer-events-none fixed top-0 left-0 z-50 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-logo transition-transform ease-out"
            />
        </>
    );
}