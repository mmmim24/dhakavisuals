"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
    const router = useRouter()
    const supabase = createClient()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [step, setStep] = useState<'password' | 'totp'>('password')
    const [factorId, setFactorId] = useState('')
    const [error, setError] = useState('')

    async function handlePasswordSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')

        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (signInError) {
            setError(signInError.message)
            return
        }

        const { data: factorsData } = await supabase.auth.mfa.listFactors()
        const totpFactor = factorsData?.totp?.[0]

        if (!totpFactor) {
            router.push('/dashboard')
            return
        }

        setFactorId(totpFactor.id)
        setStep('totp')
    }

    async function handleTotpSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')

        const { data: challenge, error: challengeError } =
            await supabase.auth.mfa.challenge({ factorId })

        if (challengeError) {
            setError(challengeError.message)
            return
        }

        const { error: verifyError } = await supabase.auth.mfa.verify({
            factorId,
            challengeId: challenge.id,
            code,
        })

        if (verifyError) {
            setError(verifyError.message)
            return
        }

        router.push('/dashboard')
        router.refresh()
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-sm rounded-lg bg-zinc-400/40 p-8">
                <h1 className="mb-6 text-xl font-semibold text-zinc-900">
                    Admin Login
                </h1>

                {step === 'password' && (
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded bg-zinc-100 px-4 py-2 text-zinc-900"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded bg-zinc-100 px-4 py-2 text-zinc-900"
                            required
                        />
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <button
                            type="submit"
                            className="w-full rounded bg-zinc-900 py-2 font-medium text-zinc-100"
                        >
                            Continue
                        </button>
                    </form>
                )}

                {step === 'totp' && (
                    <form onSubmit={handleTotpSubmit} className="space-y-4">
                        <p className="text-sm text-zinc-700 tracking-tight">
                            Enter the 6 digit code from your authenticator app
                        </p>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="123456"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full rounded bg-zinc-100 px-4 py-2 tracking-widest text-zinc-900"
                            required
                        />
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <button
                            type="submit"
                            className="w-full rounded bg-white py-2 font-medium text-black"
                        >
                            Verify
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}