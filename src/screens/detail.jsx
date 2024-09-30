import { useEffect, useState } from "react";
import { useMovies } from "../context/Movies";
import YouTubePlayer from "../components/youTubeVideoPlayer";
import Spinner from "../components/spinner";

export const Detail = () => {
  const { getMovieById, getVideoKeyById } = useMovies();
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
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
      }
    });
  }, []);

  const handleShowVideo = () => {
    setShowTrailer(!showTrailer);
  };

  return (
    <>
      {movie ? (
        <>
        <div className="flex relative flex-col w-full sm:h-[100vh] md:h-1/2 lg:h-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path}.jpg)`,
            height:'100vh',
          }}
        >
          <div className='flex flex-col absolute top-20 z-10'>
            <div className='flex'>
              <img
                    className="flex sm:h-[20vh] sm:w-[30vw] md:w-[180px] md:h-[150px] lg:w-[200px] lg:h-[300px] mx-2 rounded-md"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}.jpg`}
                    alt=""
              />
              <div className="flex flex-col gap-1">
                <h2 className="md:text-3xl sm:text-2xl font-bold text-white">
                      {movie.title} ({movie.release_date.split("-")[0]})
                </h2>
                {movie.genres.map((genre) => (
                  <div
                      key={genre.id}
                      className="mx-1 text-white font-extrabold text-sm"
                  >
                      {genre.name}
                  </div>
                ))
                }
              </div>
            </div>
            <div className="flex relative sm:flex-col md:flex-row lg:flex-row sm:w-screen sm:h-[20vh] md:w-screen lg:w-screen lg:h-[320px] bg-transparent">
              {!showTrailer ? 
                (
                  <>
                      <div className='flex flex-col sm:w-full sm:h-[20vh] md:w-[100vw] md:h-full lg:w-[100vw] mr-8 lg:h-full'>
                        <h3 className="text-2xl sm:text-xl md:text-base font-bold ml-2 sm:mt-1 text-white opacity-70">
                          {movie.tagline}
                        </h3>
                        <h3 className="flex ml-2 sm:text-xl md:text-2xl my-2 text-white font-bold">
                          Vista general
                        </h3>
                        <p className="w-full sm:h-[20vh] md:text-sm md:h-fit overflow-scroll md:overflow-visible lg:overflow-visible text-white text-base ml-2">
                          {movie.overview}
                        </p>
                        {/* <button
                        className="sm:absolute sm:top-[43%] sm:ml-2 md:top-[5%] md:mt-2 lg:top-[52%] lg:mt-2 text-white font-bold sm:text-xl md:text-2x w-fit"
                        onClick={handleShowVideo}
                        >
                        ▶ Ver Trailler
                        </button> */}
                      </div>
                    </>
                  ) 
                : 
                videoKey ? 
                  (
                    <>
                      <YouTubePlayer videoId={videoKey} />
                      <button
                        onClick={handleShowVideo}
                        className="font-bold text-base md:w-40 md:h-8 lg:w-40 lg:h-8 text-white z-10 absolute sm:left-0 sm:top-[45%] bg-gradient-to-r from-black to-stone-800 rounded-lg md:bottom-5 md:right-0 md:left-0 lg:top-20 lg:left-[100px] lg:right-0 animate-pulse m-4 "
                      >
                        X Cerrar Trailer
                      </button>
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-90 max-h-[100vh]"></div>
        </>
      ) : null}
    </>
  );
};