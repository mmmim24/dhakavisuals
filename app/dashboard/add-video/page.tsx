'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { embedToUrl } from '@/lib/regex';
import { useRouter } from 'next/navigation'

export default function VideoUploadForm({ onSuccess }: { onSuccess?: () => void }) {
    const supabase = createClient()

    const [clientName, setClientName] = useState('')
    const [category, setCategory] = useState('')
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
    const [videoUrl, setVideoUrl] = useState('')
    const [ratio, setRatio] = useState('')
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')

    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')

        if (!thumbnailFile) {
            setError('Please select a thumbnail image')
            return
        }

        if (!ratio) {
            setError('Please select a ratio');
            return;
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

            const { error: insertError } = await supabase.from('videos').insert({
                client_name: clientName,
                category: category,
                video_url: embedToUrl(videoUrl),
                image_url: urlData.publicUrl,
                aspect_ratio: ratio
            })

            if (insertError) {
                setError(insertError.message)
                setUploading(false)
                return
            }

            setClientName('')
            setCategory('')
            setVideoUrl('')
            setThumbnailFile(null)
            setRatio('')
            setUploading(false)
            onSuccess?.()
            router.push('/videography')
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
                    <input
                        type="text"
                        placeholder="YouTube or Facebook video link"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                        required
                    />
                    <div>
                        <label className="mb-1 block text-sm text-neutral-500">
                            Thumbnail Image
                        </label>
                        <input
                            type="file"
                            accept="image/jpeg"
                            onChange={(e) => setThumbnailFile(e.target.files?.[0] ?? null)}
                            className="w-full text-logo file:bg-zinc-200 file:p-2 file:rounded-md file:text-black file:mr-10 p-2 border border-zinc-900 rounded-md"
                            required
                        />
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <label className="mb-1 block text-sm text-neutral-500">
                                Aspect Ratio
                            </label>
                            <select onChange={(e) => setRatio(e.target.value)} className='border p-2 rounded-md' required>
                                <option value={ratio}>Select</option>
                                <option value="16/9">landscape (16:9)</option>
                                <option value="1/1">square (1:1)</option>
                                <option value="9/16">reel (9:16)</option>
                            </select>
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