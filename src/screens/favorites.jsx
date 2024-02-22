import { useEffect, useState } from "react";
import { useMovies } from "../context/Movies";
import { CardView } from "../components/cardView";

export const Favorites = (props) => {
    const {
        themeColor} = props;
        console.log('theme:', themeColor);

   const {addOrRemoveFromFavs, favMovies} = useMovies();
   const [movies, setMovies] = useState([])
    
    useEffect(() => {
        const getMovies = JSON.parse(localStorage.getItem('favs'))
        getMovies && setMovies(getMovies);
    },[favMovies])
  
    const handleRemoveFromFavs = (e, movie) => {
        const { image, id, title } = movie;
        addOrRemoveFromFavs({ image, id, title });
    };

    return(
        <>
        <h2 className={`text-3xl ${themeColor === 'dark' ? 'text-white' : 'text-black'} font-bold pt-12 mt-5 ml-3`}>My favorites Movies</h2>

        {movies.length === 0 ? 
        <h2 className='flex w-full h-screen items-center justify-center text-4xl text-zinc-500 font-semibold '>No tienes peliculas agregadas :(</h2>
        :
        <>
        <div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full h-screen place-items-center dark:bg-slate-950'>
        {movies.map((movie)=>(
                <CardView
                key={movie.id}
                title={movie.title}
                image={movie.image}
                btnFavOnClick={(e) => handleRemoveFromFavs(e, movie)}
                />
                ))}
        </div>
        </>
        }
        </>
    )
}