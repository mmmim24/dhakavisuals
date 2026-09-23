'use client';

import { FormEvent, useEffect, useState } from 'react';
import { embedToUrl } from '@/lib/regex';
import { X } from 'lucide-react';

export interface EditableVideo {
    id: number;
    client_name: string;
    category: string;
    video_url: string;
    image_url: string;
    aspect_ratio: string;
}

interface EditModalProps {
    video: EditableVideo;
    onClose: () => void;
    onSave: (video: EditableVideo) => Promise<void>;
}

export default function EditModal({ video, onClose, onSave }: EditModalProps) {
    const [form, setForm] = useState(video);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setForm(video);
    }, [video]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');
        setSaving(true);

        try {
            await onSave({ ...form, video_url: form.video_url === video.video_url ? video.video_url : embedToUrl(form.video_url) });
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Unable to save video');
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="presentation" onMouseDown={onClose}>
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="edit-video-title" onMouseDown={(event) => event.stopPropagation()}>
                <div className="mb-6 flex items-center justify-between">
                    <h2 id="edit-video-title" className="text-xl font-semibold text-gray-900">Edit video</h2>
                    <button type="button" onClick={onClose} aria-label="Close edit video modal" className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Client name
                        <input required value={form.client_name} onChange={(event) => setForm({ ...form, client_name: event.target.value })} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                        Category
                        <input required value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                        Video URL
                        <input required value={form.video_url} onChange={(event) => setForm({ ...form, video_url: event.target.value })} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                        Aspect_ratio ratio
                        <select value={form.aspect_ratio} onChange={(event) => setForm({ ...form, aspect_ratio: event.target.value })} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2">
                            <option value="16/9">Landscape (16:9)</option>
                            <option value="1/1">Square (1:1)</option>
                            <option value="9/16">Reel (9:16)</option>
                        </select>
                    </label>
                    {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" disabled={saving} className="rounded-md bg-logo px-4 py-2 text-white disabled:opacity-50">{saving ? 'Saving...' : 'Save changes'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}