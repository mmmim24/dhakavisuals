"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const router = useRouter();
    const supabase = createClient();

    const [err, setErr] = useState('');

    async function handleLogOut() {
        const { error } = await supabase.auth.signOut();
        if (error) { setErr(error.message); return; }
        else
            router.push('/login');
        return;
    }

    const addVideo = () => {
        router.push('/dashboard/add-video')
    }

    return (
        <>
            <div className="min-h-100 flex flex-col gap-10 items-center justify-center">
                <h1 className="text-3xl md:text-5xl tracking-tight md:tracking-tightest font-semibold">Protected Dashboard</h1>
                <div onClick={addVideo} className="bg-white text-logo px-4 py-2 rounded-3xl font-semibold hover:bg-logo hover:text-white hover:border-white border-2 transition duration-300">
                    Add Video
                </div>
                <div onClick={handleLogOut} className="bg-logo text-white px-4 py-2 rounded-3xl font-semibold hover:bg-white hover:text-logo hover:border-logo border-2 transition duration-300">
                    Logout
                </div>
                {
                    err
                }
            </div>
        </>
    )
}