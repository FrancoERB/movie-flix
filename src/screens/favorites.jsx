import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../context/Movies";
import { CardView } from "../components/cardView";
import 'animate.css';

export const Favorites = () => {
   const {addOrRemoveFromFavs, favMovies} = useMovies();
   const [movies, setMovies] = useState([])
   const navigation = useNavigate();
    
    useEffect(() => {
        const getMovies = JSON.parse(localStorage.getItem('favs'))
        getMovies && setMovies(getMovies);
    },[favMovies])
  
    const handleRemoveFromFavs = (e, movie) => {
        const { image, id, title } = movie;
        addOrRemoveFromFavs({ image, id, title });
    };

    const handleCardClick = (movieId) => {
        navigation(`/Detail?movie_id=${movieId}`);
      };

    return(
        <>
        <div className='w-screen pt-14 top-0'>
         <h1 className="text-2xl font-bold ml-2 w-fit px-3 py-1 mt-2 rounded-2xl  bg-gradient-to-r from-[#4b79a1] to-[#283e51] text-white">
            Mis películas favoritas
          </h1>
         </div>

        {movies.length === 0 ? 
        <h2 className='flex w-full h-screen items-center justify-center text-4xl text-zinc-500 font-semibold '>No tienes peliculas agregadas :(</h2>
        :
        <>
        <div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full mt-5 min-h-screen place-items-center dark:bg-slate-950 animate__animated animate__fadeIn animate__fast'>
        {movies.map((movie)=>(
                <CardView
                key={movie.id}
                title={movie.title}
                image={movie.image}
                onCardClick={() => handleCardClick(movie.id)}
                btnFavOnClick={(e) => handleRemoveFromFavs(e, movie)}
                />
                ))}
        </div>
        </>
        }
        </>
    )
}