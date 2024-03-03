import { useEffect, useState } from "react";
import { CardView } from "../components/cardView";
import { useMovies } from "../context/Movies";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../components/pagination";
import Spinner from "../components/spinner";
import 'animate.css';

const MoviesList = () => {
  const { getMoviesFromApi, addOrRemoveFromFavs } = useMovies();
  const [movies, setMovies] = useState([]);
  const [userId, setUserId] = useState(null);
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
    const idUser = sessionStorage.getItem('userId');
    idUser && setUserId(idUser);
    const favoritesMovies = JSON.parse(localStorage.getItem(`${userId}`));
    if (!favoritesMovies) {
      localStorage.setItem(`${userId}`, JSON.stringify([]));
    } else {
      setFavMovies(favoritesMovies);
    }
  }, [userId]);

  const handleBtnNextPage = () => {
    const increment = pageChangeNumber + 1;
    increment >= MIN_PAGE &&
      increment <= MAX_PAGE &&
      setPageChangeNumber(increment);
      window.scrollTo({
        top: 0,
        behavior:'smooth'
      })
  };

  const handleBtnPreviousPage = () => {
    const decrement = pageChangeNumber - 1;
    decrement >= MIN_PAGE && setPageChangeNumber(decrement);
    window.scrollTo({
      top: 0,
      behavior:'smooth'
    })
  };

  const handleCardClick = (movieId) => {
    navigation(`/Detail?movie_id=${movieId}`);
  };

  const onAddFav = (e, movie) => {
    const { image, title, overview, id } = movie;
    addOrRemoveFromFavs({ image: movie.poster_path, title, overview, id }, userId);
  };

  return (
    <>
      {movies ? 
        <>
         <div className='w-screen pt-14 top-0'>
          <h1 className="text-xl font-bold ml-2 w-fit px-3 sm:mt-0 md:mt-2 rounded-2xl  bg-gradient-to-r from-[#4b79a1] to-[#283e51] text-white">
            Top películas
          </h1>
         </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-h-screen min-w-full mt-2 md:mx-2 place-items-center dark:bg-slate-950 animate__animated animate__fadeInRight animate__fast">
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
       : 
        <div className=" flex min-h-screen min-w-full justify-center items-center">
          <Spinner />
        </div>
      }
    </>
  );
};
export default MoviesList;
