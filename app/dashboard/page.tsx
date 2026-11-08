"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { X } from "lucide-react";

export default function Page() {
    const router = useRouter();
    const supabase = createClient();

    const [err, setErr] = useState('');
    const [folder, setFolder] = useState(false);
    const [album, setAlbum] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    async function handleLogOut() {
        const { error } = await supabase.auth.signOut();
        if (error) { setErr(error.message); return; }
        else
            router.push('/login');
        return;
    }

    const addFolder = () => {
        setFolder(true);
    }

    const onClose = () => {
        setFolder(false)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setSaving(true);

        try {
            const { error: err } = await supabase.from('folders').insert({ name: album });
            if (err) {
                setError('folder creation error');
                setSaving(false)
            }
            setAlbum('')
            setFolder(false);
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Unable to save photo');
        } finally {
            setSaving(false);
        }
    }

    const addVideo = () => {
        router.push('/dashboard/add-video')
    }

    const addThumbnails = () => {
        router.push('/dashboard/add-thumbnails')
    }

    return (
        <>
            <div className="min-h-100 py-10 md:py-20 flex flex-col gap-10 items-center justify-center">
                <h1 className="text-3xl md:text-5xl tracking-tight md:tracking-tightest font-semibold">Protected Dashboard</h1>
                <div onClick={addFolder} className="bg-white text-logo px-4 py-2 rounded-3xl font-semibold hover:bg-logo hover:text-white hover:border-white border-2 transition duration-300 hover:cursor-pointer">
                    Create an Photo Album
                </div>
                <div onClick={addVideo} className="bg-white text-logo px-4 py-2 rounded-3xl font-semibold hover:bg-logo hover:text-white hover:border-white border-2 transition duration-300 hover:cursor-pointer">
                    Add Videos
                </div>
                <div onClick={addThumbnails} className="bg-white text-logo px-4 py-2 rounded-3xl font-semibold hover:bg-logo hover:text-white hover:border-white border-2 transition duration-300 hover:cursor-pointer">
                    Add Video Thumbnails
                </div>
                <div onClick={handleLogOut} className="bg-logo text-white px-4 py-2 rounded-3xl font-semibold hover:bg-white hover:text-logo hover:border-logo border-2 transition duration-300 hover:cursor-pointer">
                    Logout
                </div>
                {
                    err
                }
                {
                    folder &&
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="presentation" onMouseDown={onClose}>
                        <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="edit-photo-title" onMouseDown={(event) => event.stopPropagation()}>
                            <div className="mb-6 flex items-center justify-between">
                                <h2 id="edit-photo-title" className="text-xl font-semibold text-gray-900">Create an Album</h2>
                                <button type="button" onClick={onClose} aria-label="Close edit photo modal" className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">

                                <label className="block text-sm font-medium text-gray-700">
                                    Album Name
                                    <input required value={album} onChange={(event) => setAlbum(event.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
                                </label>

                                {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
                                <div className="flex justify-end gap-3 pt-2">
                                    <button type="submit" disabled={saving} className="rounded-md bg-logo px-4 py-2 text-white disabled:opacity-50">{saving ? 'Saving...' : 'Save changes'}</button>
                                </div>

                            </form>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}