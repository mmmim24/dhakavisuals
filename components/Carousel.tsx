'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselProps {
    images: { src: string; alt?: string }[];
}

export default function Carousel({ images }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Handle window resize to determine visible items
    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerPage(3); // lg
            } else if (window.innerWidth >= 768) {
                setItemsPerPage(2); // md
            } else {
                setItemsPerPage(1); // sm
            }
        };

        updateItemsPerPage(); // Initial calculation
        window.addEventListener('resize', updateItemsPerPage);

        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    const totalItems = images.length;
    // Calculate max index to prevent exposing empty space at the end of the track
    const maxIndex = Math.max(0, totalItems - itemsPerPage);

    // Navigation Logic
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
    };

    // Touch & Swipe Logic
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEndHandler = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextSlide();
        }
        if (isRightSwipe) {
            prevSlide();
        }
    };

    // Calculate how far to push the track based on current index and screen size
    const shiftPercentage = (currentIndex * 100) / itemsPerPage;

    return (
        <>
            <div className="relative w-full max-w-6xl mx-auto overflow-hidden group">

                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    aria-label="Previous Slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                {/* Carousel Track */}
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${shiftPercentage}%)` }}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEndHandler}
                >
                    {images.map((img, index) => (
                        <div key={index} className="w-full md:w-1/2 lg:w-1/3 shrink-0 p-2">
                            <div className="relative hover:scale-110 hover:rounded-lg transition-all duration-500 w-full h-64">
                                <Image
                                    src={img.src}
                                    alt={img.alt || `Carousel image ${index + 1}`}
                                    loading='eager'
                                    fill
                                    className="object-cover rounded-lg shadow-md pointer-events-none"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}


                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    aria-label="Next Slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </>
    );
}