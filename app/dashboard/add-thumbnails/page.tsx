'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function VideoUploadForm({ onSuccess }: { onSuccess?: () => void }) {
    const supabase = createClient()

    const [clientName, setClientName] = useState('')
    const [category, setCategory] = useState('')
    const [thumbnailVideo, setThumbnailVideo] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')

    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')

        if (!thumbnailVideo) {
            setError('Please select a thumbnail video')
            return
        }

        setUploading(true)

        try {

            const fileExt = thumbnailVideo.name.split('.').pop()
            const fileName = `${clientName}_${category}_${crypto.randomUUID()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('thumbnail_videos')
                .upload(fileName, thumbnailVideo, {
                    cacheControl: '63072000, immutable',
                    upsert: true,
                })

            if (uploadError) {
                setError(uploadError.message)
                setUploading(false)
                return
            }

            const { data: urlData } = supabase.storage
                .from('thumbnail_videos')
                .getPublicUrl(fileName)

            const { error: insertError } = await supabase.from('thumbnail_videos').insert({
                url: urlData.publicUrl,
                client_name: clientName,
                category: category
            })

            if (insertError) {
                setError(insertError.message)
                setUploading(false)
                return
            }

            setClientName('')
            setCategory('')
            setThumbnailVideo(null)
            setUploading(false)
            onSuccess?.()
            router.push('/')
        } catch (err) {
            setError('Something went wrong, please try again')
            setUploading(false)
        }
    }

    return (
        <>
            <div className='max-w-7xl mx-auto my-20'>

                <form onSubmit={handleSubmit} className="w-full space-y-3 rounded-lg border p-4">

                    <div className="flex gap-3">

                        <input
                            type="text"
                            placeholder="Client name"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Category (Event Coverage/Podcast/Commercial)"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                            required
                        />
                    </div>

                    <div className="flex justify-between items-end gap-3">

                        <div className='w-full'>
                            <label className="mb-1 block text-sm text-neutral-500">
                                Thumbnail Video
                            </label>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => setThumbnailVideo(e.target.files?.[0] ?? null)}
                                className="w-full text-logo file:bg-zinc-200 file:p-2 file:rounded-md file:text-black file:mr-10 p-2 border border-zinc-900 rounded-md"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={uploading}
                            className="rounded-md bg-logo uppercase px-4 py-2 text-white disabled:opacity-50"
                        >
                            {uploading ? 'Uploading...' : 'Add Video'}
                        </button>

                        {error && <p className="text-sm text-red-500">{error}</p>}

                    </div>

                </form>

            </div>
        </>
    )
}