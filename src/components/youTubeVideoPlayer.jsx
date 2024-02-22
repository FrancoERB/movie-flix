
const YouTubePlayer = ({videoId}) => {
  return(
    <iframe 
      className={`flex w-full h-full transition-colors duration-500`}
      // width="1280" 
      // height="720" 
      src={`https://www.youtube.com/embed/${videoId}`} 
      title="YouTube video player" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowFullScreen
      >
    </iframe>
  )
}

export default YouTubePlayer;