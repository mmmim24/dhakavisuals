import VideoCarousel from '@/components/VideoCarousel';
const carouselVideos = [
    {
        title: 'YPF',
        embedUrl: 'https://www.youtube.com/embed/JkSNEetfCwI?si=UJ7nf_s48p8NWn5M'
    },
    {
        title: 'BRAC',
        embedUrl: 'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2FBRACWorld%2Fvideos%2F662685559634459%2F&show_text=false&width=380&t=0'
    },
    {
        title: 'Brain Station 23',
        embedUrl: 'https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F924603657345713%2F&show_text=false&width=560&t=0'
    },
    {
        title: 'YouTube Example 1',
        embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
];
export default function Videography() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-8">
            <h2 className="text-2xl text-center tracking-widest">Videography</h2>
            <VideoCarousel videos={carouselVideos} />
        </div>
    )
}
