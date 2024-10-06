import { useEffect, useState } from "react";
import { useMovies } from "../context/Movies";
import YouTubePlayer from "../components/youTubeVideoPlayer";
import Spinner from "../components/spinner";
import Swal from "sweetalert2";

export const Detail = () => {
  const { getMovieById, getVideoKeyById } = useMovies();
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [buttonVisibility, setButtonVisibility] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const query = new URLSearchParams(window.location.search);
  const movieId = query.get("movie_id");

  useEffect(() => {
    getMovieById(movieId).then((oneMovie) => {
      setMovie(oneMovie);
    });

    getVideoKeyById(movieId).then((oneVideoKey) => {
      setVideoKey(oneVideoKey);
      if (oneVideoKey) {
        setVideoKey(oneVideoKey);
        setButtonVisibility(false);
      }
      else{
        setButtonVisibility(true);
      }
    });
   
  }, [videoKey]);

  const handleShowTrailer = () => {
    window.scrollBy({
      top: 500,
      behavior: 'smooth'
    });
  }

  return (
    <>
      {movie ? (
        <>
        <div className="flex flex-col sm:mt-12 md:my-14 lg:my-14 w-full sm:max-h-fit md:h-1/2 lg:h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path}.jpg)`, 
          }}
        >
          <div className='flex flex-col h-[100%] bg-transparent backdrop-brightness-50 bg-gradient-to-b from-transparent to-black'>
            <div className='flex sm:flex-col pt-3 md:flex-row lg:flex-row sm:justify-center sm:items-center md:justify-start md:items-start lg:justify-start lg:items-start gap-4'>
              <img
                    className="flex sm:h-[55vh] sm:w-[95vw] md:w-[180px] md:h-[150px] lg:w-[20vw] lg:h-[60vh] mx-2 rounded-md"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}.jpg`}
                    alt=""
              />
              <div className="flex flex-col sm:gap-2">
                <h2 className="md:text-3xl sm:ml-2 sm:text-2xl font-bold text-white">
                      {movie.title} ({movie.release_date.split("-")[0]})
                </h2>
                <h3 className="text-2xl sm:text-xl md:text-base font-bold ml-2 sm:mt-1 text-white opacity-70">
                      {movie.tagline}
                </h3>
                <div className='flex ml-2 gap-1'>
                {movie.genres.map((genre) => (
                  <div
                      key={genre.id}
                      className="flex w-fit p-1 rounded-full font-extrabold text-sm bg-white"
                  >
                      {genre.name}
                  </div>   
                ))
                }
                </div>
                <button
                    disabled = {videoKey ?  false : true}
                    id='trailerButton'
                    className={`sm:ml-2 md:mt-2 lg:ml-2 lg:mt-4 text-white font-bold sm:text-xl md:text-2x w-fit disabled:opacity-50`}
                    onClick={handleShowTrailer}
                 >
                    {videoKey? '▷ Reproducir Tráiler' : 'Tráiler no disponible' }
                 </button>
                <div>
                 <h3 className="flex ml-2 sm:text-xl md:text-2xl mt-4 text-white font-bold">
                    Vista general
                 </h3>
                 <p className="w-full lg:w-[50vh] sm:h-[17vh] md:text-sm md:h-fit overflow-scroll md:overflow-visible lg:overflow-visible text-white text-base ml-2">
                    {movie.overview}
                 </p>
                </div>
              </div>
            </div>
            <h3 className='flex w-full sm:my-5 sm:text-xl mt-[4vh] h-[5vh] justify-center text-white text-3xl bg-transparent backdrop-blur-sm'>
              Tráiler y más
            </h3>
            <div className="flex justify-center items-center sm:flex-col md:flex-row lg:flex-row sm:w-screen sm:h-[30vh] md:w-screen lg:w-[100vw] lg:h-[80vh]">
              {videoKey ? 
                  (
                    <>
                      <YouTubePlayer videoId={videoKey} />
                    </>
                  ) 
                  : 
                  (
                    <h2 className="text-white text-3xl">
                      Lo sentimos, no se ha podido cargar el trailer 😢
                    </h2>
                  )
                }
            </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};