import VideoCarousel from '@/components/VideoCarousel';
import { embedToUrl } from '@/lib/regex';
const carouselVideos = [
    {
        title: 'BRAC',
        embedUrl: embedToUrl('<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2FBRACWorld%2Fvideos%2F662685559634459%2F&show_text=false&width=380&t=0" width="380" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>')
    },
    {
        title: 'Brain Station 23',
        embedUrl: embedToUrl('<iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F924603657345713%2F&show_text=false&width=560&t=0" width="560" height="314" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>')
    },
    {
        title: 'YPF',
        embedUrl: embedToUrl('<iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FYouthPolicyForumBD%2Fvideos%2F1324553735887474%2F&show_text=false&width=560&t=0" width="560" height="314" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>')
    },
    {
        title: 'Rick Roll',
        embedUrl: embedToUrl('<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=RARPopFqye8jqX4T" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>')
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
