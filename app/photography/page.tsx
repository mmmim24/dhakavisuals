import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';

export default async function Photography() {
    const supabase = await createClient();

    let { data: arcPhoto, error: arcPhotoError } = await supabase
        .from('photos')
        .select('*')
        .eq('folder', 'architecture').limit(1);

    let { data: docPhoto, error: docPhotoError } = await supabase
        .from('photos')
        .select('*')
        .eq('folder', 'documentary').limit(1);

    let { data: edPhoto, error: edPhotoError } = await supabase
        .from('photos')
        .select('*')
        .eq('folder', 'edinst').limit(1);

    let { data: eventPhoto, error: eventPhotoError } = await supabase
        .from('photos')
        .select('*')
        .eq('folder', 'event').limit(1);

    return (
        <div className="min-h-screen flex flex-col items-center justify-evenly space-y-8">
            <h2 className="text-2xl text-center tracking-widest">Photography</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col gap-8 items-center'>
                    <h3>Architecture & Interior</h3>
                    <div className='rounded-3xl shadow-2xl p-2 h-80 w-80'>
                        {arcPhoto?.length ? <Image className='rounded-2xl w-full aspect-square object-cover' src={(arcPhoto ?? [])[0].url} alt='ss' width={200} height={200} /> : ""}
                    </div>
                </div>

                <div className='flex flex-col gap-8 items-center'>
                    <h3>Documentary</h3>
                    <div className='rounded-3xl shadow-2xl p-2 h-80 w-80'>
                        {docPhoto?.length ? <Image className='rounded-2xl w-full aspect-square object-cover' src={(docPhoto ?? [])[0].url} alt='ss' width={200} height={200} /> : ""}
                    </div>
                </div>

                <div className='flex flex-col gap-8 items-center'>
                    <h3>Educational Instituitions</h3>
                    <div className='rounded-3xl shadow-2xl p-2 h-80 w-80'>
                        {edPhoto?.length ? <Image className='rounded-2xl w-full aspect-square object-cover' src={(edPhoto ?? [])[0].url} alt='ss' width={200} height={200} /> : ""}
                    </div>
                </div>

                <div className='flex flex-col gap-8 items-center'>
                    <h3>Event</h3>
                    <div className='rounded-3xl shadow-2xl p-2 h-80 w-80'>
                        {eventPhoto?.length ? <Image className='rounded-2xl w-full aspect-square object-cover' src={(eventPhoto ?? [])[0].url} alt='ss' width={200} height={200} /> : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}
