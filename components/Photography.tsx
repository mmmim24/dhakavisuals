import Image from "next/image";
export default function Photography() {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl tracking-widest">Photography</h2>
            <div className="flex gap-10">
                <Image src="/brac_1.jpg" alt="BRAC World" width={300}
                    height={300}
                    style={{ width: '100%', height: 'auto' }} />
                <Image src="/brac_2.jpg" alt="BRAC World" width={300}
                    height={300}
                    style={{ width: '100%', height: 'auto' }} />
                <Image src="/brac_3.jpg" alt="BRAC World" width={300}
                    height={300}
                    style={{ width: '100%', height: 'auto' }} />
            </div>
        </div>
    )
}
