import { useEffect, useState } from "react";
import { useMovies } from "../context/Movies";
import { CardView } from "../components/cardView";
import { useNavigate } from "react-router-dom";

export const Search = () => {
    const {getMoviesFromSearch} = useMovies();
    const query =  new URLSearchParams(window.location.search)
    const search = query.get('my_search');
    const [movies, setMovies] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        if(search){
            getMoviesFromSearch(search).then(
                res => {
                        setMovies(res.results)
                }
            ).catch(error => {
                console.log('No se pudo obtener lista de peliculas');
            })
        }
    },[])

    const handleCardClick = (movieId) => {
        navigation(`/Detail?movie_id=${movieId}`);
    }

    return(
        <>
        {movies && 
            <>
            <h1 className='text-3xl font-bold mt-[75px] ml-1 dark:text-slate-200'>Search results of {search}:</h1>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 h-fit min-w-full mt-6 place-items-center dark:bg-slate-950'>
                {movies.map(oneMovie =>
                 <CardView
                    key={oneMovie.id}
                    title={oneMovie.title}
                    image={oneMovie.poster_path}
                    onCardClick={() => handleCardClick(oneMovie.id)}
                />)}
            </div>
            </>
        }
        </>
    )
}