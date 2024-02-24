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
        <div
          className="flex flex-col w-full sm:h-[100vh] h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path}.jpg)`,
          }}
        >
          <div
            className=" flex sm:flex-col md:flex-row lg:flex-row h-screen sm:h-[100vh] backdrop-brightness-50 backdrop-blur-md sm:pt-3 md:pt-10 lg:pt-10"
          >
            <div className="flex sm:w-full md:w-96 h-[450px]">
              <img
                className="flex justify-center w-full h-full m-2 mt-8 rounded-md"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}.jpg`}
                alt=""
              />
            </div>
            <div className="flex flex-col md: w-screen lg:w-screen h-[450px] sm:w-screen sm:pt-5 sm:h-[150vh] md:h-[450px] lg:h-[450px] mt-8 md:mx-11 rounded-md">
              {!showTrailer ? (
                <>
                  <h2 className="text-3xl font-bold ml-2 mt-4 text-white">
                    {movie.title} ({movie.release_date.split("-")[0]})
                  </h2>
                  <h3 className="text-2xl font-bold ml-2 mt-4w text-white opacity-50">
                    {movie.tagline}
                  </h3>
                  <h3 className="flex ml-2 text-2xl mt-5 text-white font-bold">
                    Vista general
                  </h3>
                  <p className="text-white text-base ml-2">{movie.overview}</p>
                  <div className="flex flex-wrap">
                    {movie.genres.map((genre) => (
                      <div
                        key={genre.id}
                        className="bg-gray-700 rounded-full px-3 py-1 m-1 text-white text-sm"
                      >
                        {genre.name}
                      </div>
                    ))}
                  </div>
                  <button
                    className="m-4 text-white font-bold text-2xl w-fit"
                    onClick={handleShowVideo}
                  >
                    ▶ Ver Trailler
                  </button>
                </>
              ) : videoKey ? (
                <>
                  <YouTubePlayer videoId={videoKey} />
                  <button
                    onClick={handleShowVideo}
                    className="font-bold text-2xl text-white z-10 absolute  sm:left-0 sm:top-50 md:bottom-5 md:right-0 md:left-0 lg:bottom-5 lg:left-0 lg:right-0 animate-pulse    m-4 "
                  >
                    X Cerrar Trailer
                  </button>
                </>
              ) : (
                <h2 className="text-white text-3xl">
                  Lo sentimos, no se ha podido cargar el trailler 😢
                </h2>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex min-h-screen min-w-full justify-center items-center">
          <Spinner />
        </div>
      )}
    </>
  );
};
