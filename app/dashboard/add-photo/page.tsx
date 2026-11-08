'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function PhotoUploadForm({ onSuccess }: { onSuccess?: () => void }) {
    const supabase = useMemo(() => createClient(), [])

    const [title, setTitle] = useState('');
    const [clientName, setClientName] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [folders, setFolders] = useState<string[]>([]);
    const [loadingFolders, setLoadingFolders] = useState(true);
    const [folder, setFolder] = useState('');
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')

    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        async function getFolders() {
            try {
                const { data, error: foldersError } = await supabase
                    .from('folders')
                    .select('name')
                    .order('created_at', { ascending: true });

                if (!isMounted) return;

                if (foldersError) {
                    setError(foldersError.message);
                    return;
                }

                setFolders((data ?? []).map(({ name }) => name));
            } catch (loadError) {
                if (isMounted) {
                    setError(loadError instanceof Error ? loadError.message : 'Unable to load folders');
                }
            } finally {
                if (isMounted) setLoadingFolders(false);
            }
        }

        void getFolders();

        return () => {
            isMounted = false;
        };
    }, [supabase]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')

        if (!photo) {
            setError('Please upload a image')
            return;
        }

        if (!folder) {
            setError('Please select a folder');
            return;
        }

        setUploading(true)

        try {
            const fileNameArray = photo.name.split('.');
            const fileExt = fileNameArray.at(-1)
            const fileName = `${fileNameArray.at(-2)}_${folder}_${crypto.randomUUID()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('photos')
                .upload(fileName, photo, {
                    cacheControl: '63072000, immutable',
                    upsert: true,
                })

            if (uploadError) {
                setError(uploadError.message)
                setUploading(false)
                return
            }

            const { data: urlData } = supabase.storage
                .from('photos')
                .getPublicUrl(fileName)

            const { error: insertError } = await supabase.from('photos').insert({
                folder: folder,
                url: urlData.publicUrl
            })

            if (insertError) {
                setError(insertError.message)
                setUploading(false)
                return
            }

            setFolder('')
            setPhoto(null)
            setUploading(false)
            onSuccess?.()
            router.push('/photography')
        } catch (err) {
            setError('Something went wrong, please try again')
            setUploading(false)
        }
    }

    return (
        <>
            <div className='max-w-7xl mx-auto my-20'>
                <form onSubmit={handleSubmit} className="w-full space-y-3 rounded-lg border p-4">
                    <div>
                        <label className="mb-1 block text-sm text-neutral-500">
                            Folder
                        </label>
                        <select
                            value={folder}
                            onChange={(e) => setFolder(e.target.value)}
                            className='w-full border p-2 rounded-md'
                            disabled={loadingFolders || folders.length === 0}
                            required
                        >
                            <option value="" disabled>
                                {loadingFolders ? 'Loading folders...' : folders.length ? 'Select a folder' : 'No folders available'}
                            </option>
                            {folders.map((folderName) => (
                                <option key={folderName} value={folderName}>{folderName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <label className="mb-1 block text-sm text-neutral-500">
                                Upload Photo
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                                className="w-full text-logo file:bg-zinc-200 file:p-2 file:rounded-md file:text-black file:mr-10 p-2 border border-zinc-900 rounded-md"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="rounded-md bg-logo uppercase px-4 py-2 text-white disabled:opacity-50"
                        >
                            {uploading ? 'Uploading...' : 'Add Photo'}
                        </button>

                    </div>
                    {error && <p className="text-sm text-red-500" role="alert">{error}</p>}
                </form>
            </div>
        </>
    )
}