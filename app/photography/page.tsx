import { createClient } from '@/lib/supabase/server';
import PhotoFolder from '@/components/PhotoFolder';
import { mont } from '../fonts';

export default async function Photography() {
    const supabase = await createClient();

    const { data: newFolders, error: newError } = await supabase.from('folders')
        .select('*').order('created_at');

    return (
        <div className="max-w-7xl min-h-screen mx-auto flex flex-col items-center gap-16 py-16 md:py-32">
            <h2 className={`font-semibold text-2xl text-center tracking-widest`}>Gallery</h2>
            {
                newError
                    ? <p className='text-center mt-20 text-xs text-logo'>{newError.message}</p>
                    :
                    <PhotoFolder folders={newFolders} />
            }
        </div >
    )
}
