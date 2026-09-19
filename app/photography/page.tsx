import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';

export default async function Photography() {
    const supabase = await createClient();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-8">
            <h2 className="text-2xl text-center tracking-widest">Photography</h2>
        </div>
    )
}
