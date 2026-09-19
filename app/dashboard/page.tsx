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

    const addClient = () => {
        router.push('/dashboard/add-client')
    }

    const addPhoto = () => {
        router.push('/dashboard/add-photo')
    }

    const addVideo = () => {
        router.push('/dashboard/add-video')
    }

    const addTestimonial = () => {
        router.push('/dashboard/add-testimonial')
    }

    return (
        <>
            <div className="min-h-100 flex flex-col gap-10 items-center justify-center">
                <h1 className="text-3xl md:text-5xl tracking-tight md:tracking-tightest font-semibold">Protected Dashboard</h1>
                {/* <div onClick={addClient} className="bg-white text-logo px-4 py-2 rounded-3xl font-semibold hover:bg-logo hover:text-white hover:border-white border-2 transition duration-300 hover:cursor-pointer">
                    Add Client
                </div> */}
                <div onClick={addPhoto} className="bg-white text-logo px-4 py-2 rounded-3xl font-semibold hover:bg-logo hover:text-white hover:border-white border-2 transition duration-300 hover:cursor-pointer">
                    Add Photo
                </div>
                <div onClick={addVideo} className="bg-white text-logo px-4 py-2 rounded-3xl font-semibold hover:bg-logo hover:text-white hover:border-white border-2 transition duration-300 hover:cursor-pointer">
                    Add Video
                </div>
                {/* <div onClick={addTestimonial} className="bg-white text-logo px-4 py-2 rounded-3xl font-semibold hover:bg-logo hover:text-white hover:border-white border-2 transition duration-300 hover:cursor-pointer">
                    Add Testimonial
                </div> */}
                <div onClick={handleLogOut} className="bg-logo text-white px-4 py-2 rounded-3xl font-semibold hover:bg-white hover:text-logo hover:border-logo border-2 transition duration-300 hover:cursor-pointer">
                    Logout
                </div>
                {
                    err
                }
            </div>
        </>
    )
}