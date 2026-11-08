"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface Folder {
    name: string;
    cover: string;
}

interface FolderProps {
    folders: Folder[]
}

export default function PhotoFolder({ folders }: FolderProps) {

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-20 *:flex *:flex-col *:gap-2 *:items-center *:hover:scale-125 transition-all *:duration-500 *:cursor-pointer'>
            {
                folders.map(folder => {

                    return (

                        <Link key={folder.name} href={`/photography/${folder.name}`}>

                            <h3>{folder.name}</h3>

                            <div className='rounded-xl shadow-2xl h-45 w-80'>
                                {
                                    folder.cover ?
                                        <Image loading="eager" className='p-2 rounded-2xl w-full aspect-video object-cover' src={folder.cover} alt={`Thumbnail photo of ${folder.name} Folder`} width={200} height={200} /> :
                                        <p className='text-center mt-20 text-xs text-logo'>No album cover found</p>
                                }
                            </div>

                        </Link>

                    )
                })
            }
        </div>
    )
}