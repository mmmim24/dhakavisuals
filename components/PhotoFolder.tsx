"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface Photo {
    id: number;
    title: string;
    client: string;
    folder: string;
    url: string;
}

interface Folder {
    name: string;
    slug: string;
    thumbnail: Photo[] | null;
    error: any;
}

interface FolderProps {
    folders: Folder[]
}

export default function PhotoFolder({ folders }: FolderProps) {

    const router = useRouter();

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-20 *:flex *:flex-col *:gap-2 *:items-center *:hover:scale-125 transition-all *:duration-500 *:cursor-pointer'>
            {
                folders.map(folder => {

                    const photo = folder.thumbnail?.[0];

                    return (

                        <Link key={folder.name} href={`/photography/${folder.slug}`}>

                            <h3>{folder.name}</h3>

                            <div className='rounded-xl shadow-2xl h-45 w-80'>
                                {
                                    folder.error ?
                                        <p className='text-center mt-20 text-xs text-logo'>{folder.error.message}</p> :
                                        (
                                            photo ?
                                                <Image loading="eager" className='p-2 rounded-2xl w-full aspect-video object-cover' src={photo.url} alt='Thumbnail photo of Architecture & Interior Folder' width={200} height={200} /> :
                                                <p className='text-center mt-20 text-xs text-logo'>No photo in this album</p>
                                        )
                                }
                            </div>

                        </Link>

                    )
                })
            }
        </div>
    )
}