import { useEffect, useState } from "react";
import { CardView } from "../components/cardView";
import { useMovies } from "../context/Movies";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../components/pagination";
import Spinner from "../components/spinner";

const MoviesList = () => {
    const {getMoviesFromApi} = useMovies();
    const [movies, setMovies] = useState([])
    const [pageChangeNumber, setPageChangeNumber] = useState(1);
    const navigation = useNavigate();

    useEffect(() => {
        getMoviesFromApi(pageChangeNumber).then(myMovies => {
            setMovies(myMovies.results)
            console.log(myMovies.results);
          }).catch(error => {
            console.error('Error al obtener películas:', error);
          });
    },[pageChangeNumber])

    const handleBtnNextPage = () => {
        const increment = pageChangeNumber + 1;
        increment >= 1 && increment <=40 && setPageChangeNumber(increment);
        return increment;
    }

    const handleBtnPreviousPage = () => {
        const decrement = pageChangeNumber - 1;
        decrement >= 1 && setPageChangeNumber(decrement);
    }

    const handleCardClick = (movieId) => {
        navigation(`/Detail?movie_id=${movieId}`);
    }

    return(
        <>
        {movies ? 
            <>
            <h1 className='text-3xl font-bold m-2 dark:text-slate-200'>Top Movies</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-h-screen min-w-full mt-10 place-items-center dark:bg-slate-950'>
                {movies.map((oneMovie) => 
                <CardView
                key={oneMovie.id}
                image={oneMovie.poster_path}
                title={oneMovie.title}
                year={oneMovie.release_date.split('-')[0]}
                onCardClick={() => handleCardClick(oneMovie.id)}
                /> )}
            </div>
            <Pagination previousPage={handleBtnPreviousPage} nextPage={handleBtnNextPage}/>
            </>
        :
        <div className=' flex min-h-screen min-w-full justify-center items-center'>
            <Spinner/>
        </div>
        }
        </>
    )
}
export default MoviesList;