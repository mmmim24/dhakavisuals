'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { embedToUrl } from '@/lib/regex';

export default function VideoUploadForm({ onSuccess }: { onSuccess?: () => void }) {
    const supabase = createClient()

    const [clientName, setClientName] = useState('')
    const [category, setCategory] = useState('')
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
    const [videoLink, setVideoLink] = useState('')
    // const [ratio, setRatio] = useState('')
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')

        if (!thumbnailFile) {
            setError('Please select a thumbnail image')
            return
        }

        setUploading(true)

        try {
            const fileExt = thumbnailFile.name.split('.').pop()
            const fileName = `${clientName}_${category}_${crypto.randomUUID()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('video_thumbnails')
                .upload(fileName, thumbnailFile)

            if (uploadError) {
                setError(uploadError.message)
                setUploading(false)
                return
            }

            const { data: urlData } = supabase.storage
                .from('video_thumbnails')
                .getPublicUrl(fileName)

            const { error: insertError } = await supabase.from('video').insert({
                client_name: clientName,
                category: category,
                video_link: embedToUrl(videoLink),
                thumbnail_image: urlData.publicUrl,
            })

            if (insertError) {
                setError(insertError.message)
                setUploading(false)
                return
            }

            setClientName('')
            setCategory('')
            setVideoLink('')
            setThumbnailFile(null)
            setUploading(false)
            onSuccess?.()
        } catch (err) {
            setError('Something went wrong, please try again')
            setUploading(false)
        }
    }

    return (
        <>
            <div className='max-w-7xl mx-auto my-20'>
                <form onSubmit={handleSubmit} className="w-full space-y-3 rounded border p-4">
                    <input
                        type="text"
                        placeholder="Client name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full rounded border px-3 py-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Event Coverage/Podcast/Commercial"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded border px-3 py-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="YouTube or Facebook video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        className="w-full rounded border px-3 py-2"
                        required
                    />
                    <div>
                        <label className="mb-1 block text-sm text-neutral-500">
                            Thumbnail image
                        </label>
                        <input
                            type="file"
                            accept="image/jpeg"
                            onChange={(e) => setThumbnailFile(e.target.files?.[0] ?? null)}
                            className="w-full px-4 py-2 border border-zinc-900 rounded-md"
                            required
                        />
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <button
                        type="submit"
                        disabled={uploading}
                        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
                    >
                        {uploading ? 'Uploading...' : 'Add Video'}
                    </button>
                </form>
            </div>
        </>
    )
}