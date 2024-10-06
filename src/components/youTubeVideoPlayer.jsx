
const YouTubePlayer = ({videoId}) => {
  return(
    <iframe 
      className={`flex sm:w-full sm:h-[100vh] sm:m-1 md:w-full md:h-full lg:w-[60vw] lg:h-[70vh] transition-colors duration-500`}
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