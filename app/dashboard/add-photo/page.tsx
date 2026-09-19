'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function PhotoUploadForm({ onSuccess }: { onSuccess?: () => void }) {
    const supabase = createClient()

    const [title, setTitle] = useState('');
    const [clientName, setClientName] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [folder, setFolder] = useState('');
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')

    const router = useRouter();

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
            const fileExt = photo.name.split('.').pop()
            const fileName = `${title}_${clientName}_${folder}_${crypto.randomUUID()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('portfolio_photos')
                .upload(fileName, photo)

            if (uploadError) {
                setError(uploadError.message)
                setUploading(false)
                return
            }

            const { data: urlData } = supabase.storage
                .from('portfolio_photos')
                .getPublicUrl(fileName)

            const { error: insertError } = await supabase.from('photos').insert({
                title: title,
                client: clientName,
                folder: folder,
                url: urlData.publicUrl
            })

            if (insertError) {
                setError(insertError.message)
                setUploading(false)
                return
            }

            setTitle('');
            setClientName('')
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
                    <div className="flex space-x-3">

                        <input
                            type="text"
                            placeholder="Photo title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Client name"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm text-neutral-500">
                            Folder
                        </label>
                        <select onChange={(e) => setFolder(e.target.value)} className='w-full border p-2 rounded-md' required>
                            <option value={folder}>Select</option>
                            <option value="architecture">Architecture & Interior</option>
                            <option value="documentary">Documentary</option>
                            <option value="edinst">Educational Institutions</option>
                            <option value="event">Event</option>
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

                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                </form>
            </div>
        </>
    )
}