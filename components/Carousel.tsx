'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IPhoto } from './PhotoGrid';

interface CarouselProps {
    images: IPhoto[];
}

export default function Carousel({ images }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const router = useRouter();

    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerPage(3);
            } else if (window.innerWidth >= 768) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(1);
            }
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    const totalItems = images.length;
    const maxIndex = Math.max(0, totalItems - itemsPerPage);

    const handleClick = () => {
        router.push('/photography');
    }

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    }, [maxIndex]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
    };

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

    const shiftPercentage = (currentIndex * 100) / itemsPerPage;

    useEffect(() => {
        const intervalId = window.setInterval(nextSlide, 3000);
        return () => window.clearInterval(intervalId);
    }, [nextSlide]);

    return (
        <>
            <div className="relative w-full max-w-7xl mx-auto overflow-hidden group">

                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    aria-label="Previous Slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <div
                    className="flex transition-transform duration-500 ease-in-out cursor-pointer"
                    style={{ transform: `translateX(-${shiftPercentage}%)` }}
                    onClick={handleClick}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEndHandler}
                >
                    {images.map((img) => {
                        if (img.url)
                            return (

                                <div key={img.id} className="w-full sm:w-1/2 lg:w-1/3 shrink-0 p-3">
                                    <div className="relative hover:scale-110 hover:rounded-lg transition-all duration-500 w-full h-96 sm:h-64">
                                        <div className='z-10 h-full rounded-xl inset-0 text-white font-bold uppercase tracking-widest hover:bg-black/60 opacity-0 hover:opacity-100 flex flex-col items-center justify-center transition-all'>
                                            {img.folder}
                                        </div>
                                        <Image
                                            src={img.url}
                                            alt={`${img.folder}` || `Carousel image ${img.id + 1}`}
                                            loading='eager'
                                            fill
                                            className="-z-10 object-cover rounded-xl shadow-md pointer-events-none"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>
                                </div>
                            )
                    }
                    )}
                </div>

                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    aria-label="Next Slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div >
        </>
    );
}