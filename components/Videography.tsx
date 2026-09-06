"use client";
import Image from "next/image";
import image1 from "@/public/video/thumbnail_1.png";
import image2 from "@/public/video/thumbnail_2.png";
import image3 from "@/public/video/thumbnail_3.png";
import { useRouter } from "next/navigation";
export default function Videography() {

    const router = useRouter();
    const handleVideoPage = () => {
        router.push("/videography");
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">

            <h2 className="text-2xl text-center tracking-widest">Videography</h2>

            <div onClick={handleVideoPage} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="group relative aspect-4/5 rounded-2xl overflow-hidden cursor-pointer focus:outline-none">
                    <Image className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-120 group-active:scale-105 group-focus:scale-105" width={100} height={100} src={image1} loading="eager" alt="Event Coverage BRAC"></Image>

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 group-active:bg-black/60 group-focus:bg-black/60 transition-colors duration-500 z-10"></div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 opacity-100 translate-y-0 bg-black/60 md:bg-black/20 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500">
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">BRAC</h3>
                        <div className="h-px w-12 bg-logo/50 my-4"></div>
                        <p className="text-gray-300 text-sm mb-4">Event Coverage</p>
                    </div>
                </div>

                <div className="group relative aspect-4/5 rounded-2xl overflow-hidden cursor-pointer focus:outline-none">
                    <Image className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-120 group-active:scale-105 group-focus:scale-105" width={100} height={100} src={image2} loading="eager" alt="Video Production BS23"></Image>

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 group-active:bg-black/60 group-focus:bg-black/60 transition-colors duration-500 z-10"></div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 opacity-100 translate-y-0 bg-black/60 md:bg-black/20 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500">
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">Brain Station 23</h3>
                        <div className="h-px w-12 bg-logo/50 my-4"></div>
                        <p className="text-gray-300 text-sm mb-4">Video Production</p>
                    </div>
                </div>

                <div className="group relative aspect-4/5 rounded-2xl overflow-hidden cursor-pointer focus:outline-none">
                    <Image className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-120 group-active:scale-105 group-focus:scale-105" width={100} height={100} src={image3} loading="eager" alt="Event Coverage YPF"></Image>

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 group-active:bg-black/60 group-focus:bg-black/60 transition-colors duration-500 z-10"></div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 opacity-100 translate-y-0 bg-black/60 md:bg-black/20 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500">
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">YPF</h3>
                        <div className="h-px w-12 bg-logo/50 my-4"></div>
                        <p className="text-gray-300 text-sm mb-4">Event Coverage</p>
                    </div>
                </div>

                <div className="group relative aspect-4/5 rounded-2xl overflow-hidden cursor-pointer focus:outline-none">
                    <Image className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-120 group-active:scale-105 group-focus:scale-105" width={100} height={100} src={image1} loading="eager" alt="Event Coverage BRAC"></Image>

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 group-active:bg-black/60 group-focus:bg-black/60 transition-colors duration-500 z-10"></div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 opacity-100 translate-y-0 bg-black/60 md:bg-black/20 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500">
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">BRAC</h3>
                        <div className="h-px w-12 bg-logo/50 my-4"></div>
                        <p className="text-gray-300 text-sm mb-4">Event Coverage</p>
                    </div>
                </div>

                <div className="group relative aspect-4/5 rounded-2xl overflow-hidden cursor-pointer focus:outline-none">
                    <Image className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-120 group-active:scale-105 group-focus:scale-105" width={100} height={100} src={image2} loading="eager" alt="Video Production BS23"></Image>

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 group-active:bg-black/60 group-focus:bg-black/60 transition-colors duration-500 z-10"></div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 opacity-100 translate-y-0 bg-black/60 md:bg-black/20 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500">
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">Brain Station 23</h3>
                        <div className="h-px w-12 bg-logo/50 my-4"></div>
                        <p className="text-gray-300 text-sm mb-4">Video Production</p>
                    </div>
                </div>

                <div className="group relative aspect-4/5 rounded-2xl overflow-hidden cursor-pointer focus:outline-none">
                    <Image className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-120 group-active:scale-105 group-focus:scale-105" width={100} height={100} src={image3} loading="eager" alt="Event Coverage YPF"></Image>

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 group-active:bg-black/60 group-focus:bg-black/60 transition-colors duration-500 z-10"></div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 opacity-100 translate-y-0 bg-black/60 md:bg-black/20 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500">
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">YPF</h3>
                        <div className="h-px w-12 bg-logo/50 my-4"></div>
                        <p className="text-gray-300 text-sm mb-4">Event Coverage</p>
                    </div>
                </div>

            </div>

        </div>
    )
}
