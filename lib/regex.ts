// const yt = '<iframe width="560" height="315" src="https://www.youtube.com/embed/UAdB5ax0r-0?si=SJ16MBXDtNGJJ4lH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';

// const fb = '<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2FBRACWorld%2Fvideos%2F662685559634459%2F&show_text=false&width=380&t=0" width="380" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>';

export function embedToUrl(url: string) {
  const regex = /src=['"]([^'"]+)['"]/i;
  const res = url.match(regex);
  return res ? res[1] : "null";
}
