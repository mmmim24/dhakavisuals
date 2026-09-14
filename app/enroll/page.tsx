'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function EnrollMfaPage() {
    const router = useRouter();
    const supabase = createClient()
    const [qrCode, setQrCode] = useState('')
    const [factorId, setFactorId] = useState('')
    const [code, setCode] = useState('')
    const [message, setMessage] = useState('')

    async function startEnrollment() {
        setMessage('');

        let { data, error } = await supabase.auth.mfa.enroll({
            factorType: 'totp',
        });

        if (error) {
            if (error.message.includes("already exists")) {
                const { data: factorData, error: factorError } = await supabase.auth.mfa.listFactors();

                if (factorError) {
                    setMessage(factorError.message);
                    return;
                }
                // console.log(factorData)

                const existingFactor = factorData.all?.find(f => f.factor_type === "totp") || factorData.totp?.[0];

                if (existingFactor) {
                    const { error: unenrollError } = await supabase.auth.mfa.unenroll({ factorId: existingFactor.id });


                    if (unenrollError) {
                        setMessage(unenrollError.message);
                        return;
                    }

                    const retry = await supabase.auth.mfa.enroll({ factorType: 'totp' });

                    data = retry.data;
                    error = retry.error;
                }
            }
            if (error) {
                setMessage(error.message);
                return;
            }
        }

        if (!data) {
            setMessage("Failed to retrieve enrollment data");
            return;
        }

        setFactorId(data.id)
        setQrCode(data.totp.qr_code)
    }


    async function confirmEnrollment(e: React.FormEvent) {
        e.preventDefault()

        const { data: challenge, error: challengeError } =
            await supabase.auth.mfa.challenge({ factorId })

        if (challengeError) {
            setMessage(challengeError.message)
            return
        }

        const { error: verifyError } = await supabase.auth.mfa.verify({
            factorId,
            challengeId: challenge.id,
            code,
        })

        if (verifyError) {
            setMessage(verifyError.message)
            return
        }

        setMessage('Authenticator linked successfully');
        router.push('/dashboard');
    }

    return (
        <div className="mx-auto flex flex-col items-center max-w-sm p-8">
            <h1 className="mb-4 text-lg font-semibold">Link Authenticator App</h1>

            {!qrCode && (
                <button
                    onClick={startEnrollment}
                    className="rounded bg-black px-4 py-2 text-white"
                >
                    Generate QR Code
                </button>
            )}

            {qrCode && (
                <div className="space-y-4">
                    <img src={qrCode} alt="TOTP QR Code" className="mx-auto" />
                    <form onSubmit={confirmEnrollment} className="space-y-2">
                        <input
                            type="text"
                            maxLength={6}
                            placeholder="Enter code to confirm"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full rounded border px-3 py-2"
                        />
                        <button
                            type="submit"
                            className="w-full rounded bg-black py-2 text-white"
                        >
                            Confirm
                        </button>
                    </form>
                </div>
            )}

            {message && <p className="mt-4 text-center text-sm">{message}</p>}
        </div>
    )
}