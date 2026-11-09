'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { IPhoto } from './PhotoGrid';

interface CarouselProps {
    images: IPhoto[];
}

export default function Carousel({ images }: CarouselProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push('/photography');
    };

    return (
        <div
            className="relative w-full max-w-7xl mx-auto overflow-hidden cursor-pointer"
            onClick={handleClick}
        >
            <Marquee autoFill pauseOnHover speed={50} loop={0}>
                {images.map((img) => {
                    if (!img.url) return null;

                    return (
                        <div
                            key={img.id}
                            className="w-[95vw] sm:w-[50vw] lg:w-[33vw] max-w-125 shrink-0 p-3"
                        >
                            <div className="relative hover:scale-110 hover:rounded-lg transition-all duration-500 w-full aspect-video sm:aspect-square lg:aspect-video">
                                <div className="z-10 h-full rounded-xl inset-0 bg-black/20 hover:bg-black/60 opacity-100 hover:pb-5 flex items-end transition-all duration-500">
                                    <p className="text-white font-bold text-left uppercase tracking-widest mb-5 ml-5">
                                        {img.folder}
                                    </p>
                                </div>
                                <Image
                                    src={img.url}
                                    alt={`${img.folder}` || `Carousel image ${img.id + 1}`}
                                    loading="eager"
                                    fill
                                    className="-z-10 object-cover rounded-xl shadow-md pointer-events-none"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                    );
                })}
            </Marquee>
        </div>
    );
}
