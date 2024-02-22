import { useEffect, useState } from "react";
import { CardView } from "../components/cardView";
import { useMovies } from "../context/Movies";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../components/pagination";
import Spinner from "../components/spinner";

const MoviesList = () => {
  const { getMoviesFromApi, addOrRemoveFromFavs } = useMovies();
  const [movies, setMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);
  const [pageChangeNumber, setPageChangeNumber] = useState(1);
  const navigation = useNavigate();

  const MIN_PAGE = 1;
  const MAX_PAGE = 40;

  const getMovies = () => {
    getMoviesFromApi(pageChangeNumber)
      .then((myMovies) => {
        setMovies(myMovies.results);
      })
      .catch((error) => {
        console.error("Error al obtener películas:", error);
      });
  };

  useEffect(() => {
    getMovies();
  }, [pageChangeNumber]);

  useEffect(() => {
    const favoritesMovies = JSON.parse(localStorage.getItem("favs"));
    if (!favoritesMovies) {
      localStorage.setItem("favs", JSON.stringify([]));
    } else {
      setFavMovies(favoritesMovies);
    }
  }, []);

  const handleBtnNextPage = () => {
    const increment = pageChangeNumber + 1;
    increment >= MIN_PAGE &&
      increment <= MAX_PAGE &&
      setPageChangeNumber(increment);
    return increment;
  };

  const handleBtnPreviousPage = () => {
    const decrement = pageChangeNumber - 1;
    decrement >= MIN_PAGE && setPageChangeNumber(decrement);
  };

  const handleCardClick = (movieId) => {
    navigation(`/Detail?movie_id=${movieId}`);
  };

  const onAddFav = (e, movie) => {
    const { image, title, overview, id } = movie;
    addOrRemoveFromFavs({ image: movie.poster_path, title, overview, id });
  };

  return (
    <>
      {movies ? (
        <>
          <h1 className="text-3xl font-bold m-2 dark:text-slate-200">
            Top Movies
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-h-screen min-w-full mt-10 place-items-center dark:bg-slate-950">
            {movies.map((oneMovie) => (
              <CardView
                key={oneMovie.id}
                image={oneMovie.poster_path}
                title={oneMovie.title}
                year={oneMovie.release_date.split("-")[0]}
                onCardClick={() => handleCardClick(oneMovie.id)}
                btnFavOnClick={(e) => onAddFav(e, oneMovie)}
              />
            ))}
          </div>
          <Pagination
            previousPage={handleBtnPreviousPage}
            nextPage={handleBtnNextPage}
          />
        </>
      ) : (
        <div className=" flex min-h-screen min-w-full justify-center items-center">
          <Spinner />
        </div>
      )}
    </>
  );
};
export default MoviesList;
