import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-primary px-4 py-12 w-full gap-4 lg:py-20">
            <h1 className='font-gradient text-9xl sm:text-[200px] md:text-[300px] lg:text-[360px] xl:text-[400px] font-semibold -mt-30 md:-my-10'>404</h1>
            <div className='text-center flex flex-col gap-8 items-center justify-center'>
                <h2 className='z-1 font-semibold text-2xl md:text-3xl lg:text-4xl xl:text-5xl h-20 font-gradient'>The page you are looking for doesn’t exist</h2>
                <p className='font-body text-shuttle-gray-100'>Try to use a correct url or go back to homepage to start again</p>
                <button className='bg-gradient text-white rounded-3xl py-3 px-6'>
                    <Link href="/">Back to Home</Link>
                </button>
            </div>
        </div>
    )
}