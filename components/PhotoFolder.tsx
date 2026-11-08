'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { SquarePen, Trash, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Toaster, toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Folder {
    name: string;
    cover: string | null;
}

interface FolderPhoto {
    id: number;
    url: string;
}

interface FolderProps {
    folders: Folder[];
}

interface EditingFolder {
    folder: Folder;
    photos: FolderPhoto[];
}

function getStorageObject(photoUrl: string) {
    const url = new URL(photoUrl);
    const match = url.pathname.match(/\/storage\/v1\/object\/(?:public|sign)\/(photos|portfolio_photos)\/(.+)$/);
    if (!match) {
        throw new Error('A photo URL does not point to a recognized photo storage bucket');
    }

    const [, bucket, encodedPath] = match;
    if (!encodedPath) {
        throw new Error('A photo URL does not contain a storage object path');
    }

    return {
        bucket,
        path: encodedPath.split('/').map((part) => decodeURIComponent(part)).join('/'),
    };
}

export default function PhotoFolder({ folders }: FolderProps) {
    const [folderList, setFolderList] = useState(folders);
    const [isAdmin, setIsAdmin] = useState(false);
    const [editingFolder, setEditingFolder] = useState<EditingFolder | null>(null);
    const [loadingPhotos, setLoadingPhotos] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const supabase = useMemo(() => createClient(), []);
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        async function checkAuthentication() {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (isMounted) {
                setIsAdmin(!error && Boolean(user));
            }
        }

        void checkAuthentication();
        return () => {
            isMounted = false;
        };
    }, [supabase]);

    async function requireAuthenticatedUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
            throw new Error('You must be signed in to manage albums');
        }
    }

    async function openEdit(folder: Folder) {
        setLoadingPhotos(true);

        try {
            await requireAuthenticatedUser();
            const { data, error } = await supabase
                .from('photos')
                .select('id, url')
                .eq('folder', folder.name)
                .order('id', { ascending: true });

            if (error) throw new Error(error.message);

            setEditingFolder({ folder, photos: data ?? [] });
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Unable to load album photos');
        } finally {
            setLoadingPhotos(false);
        }
    }

    async function saveFolder(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!editingFolder) return;

        const oldFolder = editingFolder.folder;
        const formData = new FormData(event.currentTarget);
        const name = String(formData.get('name') ?? '').trim();
        const cover = String(formData.get('cover') ?? '') || null;

        if (!name) {
            toast.error('Album name cannot be empty');
            return;
        }

        if (cover && !editingFolder.photos.some((photo) => photo.url === cover)) {
            toast.error('Choose an album cover from this album’s photos');
            return;
        }

        setSaving(true);
        try {
            await requireAuthenticatedUser();

            const { error: folderError } = await supabase
                .from('folders')
                .update({ name, cover })
                .eq('name', oldFolder.name);

            if (folderError) throw new Error(folderError.message);

            if (name !== oldFolder.name) {
                const { error: photosError } = await supabase
                    .from('photos')
                    .update({ folder: name })
                    .eq('folder', oldFolder.name);

                if (photosError) {
                    const { error: rollbackError } = await supabase
                        .from('folders')
                        .update({ name: oldFolder.name, cover: oldFolder.cover })
                        .eq('name', name);

                    if (rollbackError) {
                        toast('Album name changed, but its photos could not be moved and the rollback failed.', {
                            icon: '⚠️',
                            duration: 7000,
                        });
                        return;
                    }

                    throw new Error(`Unable to update album photos: ${photosError.message}`);
                }
            }

            setFolderList((current) => current.map((folder) =>
                folder.name === oldFolder.name ? { name, cover } : folder
            ));
            setEditingFolder(null);
            router.refresh();
            toast.success('Album updated successfully');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Unable to update album');
        } finally {
            setSaving(false);
        }
    }

    async function deleteFolder(folder: Folder) {
        setDeleting(folder.name);

        try {
            await requireAuthenticatedUser();
            const { data: photos, error: photosError } = await supabase
                .from('photos')
                .select('id, url')
                .eq('folder', folder.name);

            if (photosError) throw new Error(`Unable to load album photos: ${photosError.message}`);

            const storageByBucket = new Map<string, Set<string>>();
            for (const { url } of photos ?? []) {
                const { bucket, path } = getStorageObject(url);
                const paths = storageByBucket.get(bucket) ?? new Set<string>();
                paths.add(path);
                storageByBucket.set(bucket, paths);
            }

            for (const [bucket, paths] of storageByBucket) {
                const { error: storageError } = await supabase.storage.from(bucket).remove([...paths]);
                if (storageError) {
                    toast(`Album was not deleted because its photos could not be removed from ${bucket} storage.`, {
                        icon: '⚠️',
                        duration: 7000,
                    });
                    return;
                }
            }

            const { error: deletePhotosError } = await supabase
                .from('photos')
                .delete()
                .eq('folder', folder.name);

            if (deletePhotosError) {
                toast('Photos were removed from storage, but their database records could not be deleted.', {
                    icon: '⚠️',
                    duration: 7000,
                });
                return;
            }

            const { error: deleteFolderError } = await supabase
                .from('folders')
                .delete()
                .eq('name', folder.name);

            if (deleteFolderError) {
                toast('Photos were deleted, but the album could not be deleted.', {
                    icon: '⚠️',
                    duration: 7000,
                });
                return;
            }

            setFolderList((current) => current.filter((item) => item.name !== folder.name));
            router.refresh();
            toast.success('Album and its photos deleted successfully');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Unable to delete album');
        } finally {
            setDeleting(null);
        }
    }

    function confirmDelete(folder: Folder) {
        toast.custom((toastItem) => (
            <div className="flex max-w-md items-center gap-4 rounded-lg bg-white p-4 text-sm text-gray-900 shadow-xl ring-1 ring-black/10">
                <span>Delete “{folder.name}” and all its photos? This cannot be undone.</span>
                <button
                    type="button"
                    onClick={() => {
                        toast.dismiss(toastItem.id);
                        void deleteFolder(folder);
                    }}
                    className="rounded-md bg-red-600 px-3 py-2 font-medium text-white hover:bg-red-700"
                >
                    Delete
                </button>
                <button
                    type="button"
                    onClick={() => toast.dismiss(toastItem.id)}
                    className="rounded-md border px-3 py-2 text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
            </div>
        ), { duration: Infinity, position: 'top-center' });
    }

    return (
        <>
            <Toaster />
            <div className="grid grid-cols-1 gap-20 md:grid-cols-2 *:flex *:flex-col *:items-center *:gap-2">
                {folderList.map((folder) => (
                    <div key={folder.name}>
                        <div className="flex w-75 items-center justify-between">
                            {isAdmin ? (
                                <button
                                    type="button"
                                    aria-label={`Edit ${folder.name}`}
                                    onClick={() => void openEdit(folder)}
                                    disabled={loadingPhotos || deleting === folder.name}
                                    className="cursor-pointer disabled:opacity-50"
                                >
                                    <SquarePen />
                                </button>
                            ) : <span />}
                            <h3>{folder.name}</h3>
                            {isAdmin ? (
                                <button
                                    type="button"
                                    aria-label={`Delete ${folder.name}`}
                                    onClick={() => confirmDelete(folder)}
                                    disabled={deleting === folder.name || loadingPhotos}
                                    className="cursor-pointer text-red-500 disabled:opacity-50"
                                >
                                    <Trash />
                                </button>
                            ) : <span />}
                        </div>

                        <Link href={`/photography/${encodeURIComponent(folder.name)}`} className="h-45 w-80 rounded-xl shadow-2xl transition-all duration-500 hover:translate-y-8 hover:scale-125">
                            {folder.cover ? (
                                <Image loading="eager" className="aspect-video w-full rounded-2xl object-cover p-2" src={folder.cover} alt={`Thumbnail photo of ${folder.name} Folder`} width={200} height={200} />
                            ) : (
                                <p className="mt-20 text-center text-xs text-logo">No album cover found</p>
                            )}
                        </Link>
                    </div>
                ))}
            </div>

            {editingFolder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="presentation" onMouseDown={() => !saving && setEditingFolder(null)}>
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 text-gray-900 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="edit-folder-title" onMouseDown={(event) => event.stopPropagation()}>
                        <div className="mb-6 flex items-center justify-between">
                            <h2 id="edit-folder-title" className="text-xl font-semibold">Edit album</h2>
                            <button type="button" onClick={() => setEditingFolder(null)} disabled={saving} aria-label="Close edit album modal" className="rounded-full p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={saveFolder} className="space-y-4">
                            <label className="block text-sm font-medium">
                                Album name
                                <input name="name" required defaultValue={editingFolder.folder.name} disabled={saving} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
                            </label>
                            <fieldset disabled={saving}>
                                <legend className="text-sm font-medium">Album cover</legend>
                                <div className="mt-2 grid max-h-64 grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3">
                                    <label className="flex cursor-pointer flex-col items-center gap-2 rounded-md border p-2 text-sm has-checked:border-logo has-checked:ring-2 has-checked:ring-logo">
                                        <input
                                            type="radio"
                                            name="cover"
                                            value=""
                                            defaultChecked={!editingFolder.folder.cover || !editingFolder.photos.some((photo) => photo.url === editingFolder.folder.cover)}
                                        />
                                        No cover
                                    </label>
                                    {editingFolder.photos.map((photo, index) => (
                                        <label key={photo.id} className="flex cursor-pointer flex-col gap-2 rounded-md border p-2 text-sm has-checked:border-logo has-checked:ring-2 has-checked:ring-logo">
                                            <input
                                                type="radio"
                                                name="cover"
                                                value={photo.url}
                                                defaultChecked={photo.url === editingFolder.folder.cover}
                                                className="sr-only"
                                            />
                                            <Image src={photo.url} alt={`Album photo ${index + 1}`} width={160} height={100} className="aspect-video w-full rounded object-cover" />
                                            <span>Photo {index + 1}</span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>
                            {editingFolder.photos.length === 0 && (
                                <p className="text-sm text-amber-700">This album has no photos to use as a cover.</p>
                            )}
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setEditingFolder(null)} disabled={saving} className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50">Cancel</button>
                                <button type="submit" disabled={saving} className="rounded-md bg-logo px-4 py-2 text-white disabled:opacity-50">{saving ? 'Saving...' : 'Save changes'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
