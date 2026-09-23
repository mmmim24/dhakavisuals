'use client';

import { FormEvent, useEffect, useState } from 'react';
import { embedToUrl } from '@/lib/regex';
import { X } from 'lucide-react';
import { Photo } from "./PhotoFolder";

interface EditModalProps {
    photo: Photo;
    onClose: () => void;
    onSave: (photo: Photo) => Promise<void>;
}

export default function EditModal({ photo, onClose, onSave }: EditModalProps) {
    const [form, setForm] = useState(photo);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setForm(photo);
    }, [photo]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');
        setSaving(true);

        try {
            await onSave({ ...form, url: (form.url === photo.url) ? photo.url : embedToUrl(form.url) });
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Unable to save photo');
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="presentation" onMouseDown={onClose}>
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="edit-photo-title" onMouseDown={(event) => event.stopPropagation()}>
                <div className="mb-6 flex items-center justify-between">
                    <h2 id="edit-photo-title" className="text-xl font-semibold text-gray-900">Edit photo</h2>
                    <button type="button" onClick={onClose} aria-label="Close edit photo modal" className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                        <input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                        Client name
                        <input required value={form.client} onChange={(event) => setForm({ ...form, client: event.target.value })} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                        Folder
                        <select onChange={(e) => setForm({ ...form, folder: e?.target.value })} className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2' required>
                            <option value={form.folder}>Select</option>
                            <option value="architecture">Architecture & Interior</option>
                            <option value="documentary">Documentary</option>
                            <option value="edinst">Educational Institutions</option>
                            <option value="event">Event</option>
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