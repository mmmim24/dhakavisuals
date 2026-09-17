'use client';

import { useState, useEffect } from 'react';

interface Video {
    embedUrl: string;
    aspect: string;
    title?: string;
}

interface VideoCarouselProps {
    videos: Video[];
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);

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

    const totalItems = videos.length;
    // Calculate max index to prevent exposing empty space at the end of the track
    const maxIndex = Math.max(0, totalItems - itemsPerPage);

    // Navigation Logic
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
    };

    // Calculate how far to push the track based on current index and screen size
    const shiftPercentage = (currentIndex * 100) / itemsPerPage;

    return (
        // Outer flex container aligns buttons and the track side-by-side
        <div className="flex items-center justify-between w-full mx-auto gap-4 px-4">

            {/* Previous Button - Placed entirely outside the iframe container */}
            <button
                onClick={prevSlide}
                className="shrink-0 bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-full shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Previous Video"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            {/* Carousel Track Wrapper */}
            <div className="overflow-hidden w-full rounded-xl">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${shiftPercentage}%)` }}
                >
                    {videos.map((video, index) => (
                        <div key={index} className="w-full md:w-1/2 lg:w-1/3 shrink-0 p-2">
                            {/* Aspect-video maintains 16:9 ratio for iframes */}
                            <div className={`relative w-full aspect-${video.aspect} bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200`}>
                                <iframe
                                    src={video.embedUrl}
                                    title={video.title || `Video ${index + 1}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full border-none"
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Next Button - Placed entirely outside the iframe container */}
            <button
                onClick={nextSlide}
                className="shrink-0 bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-full shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Next Video"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

        </div>
    );
}