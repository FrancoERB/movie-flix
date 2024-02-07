import { CardView } from "../components/cardView";

const MoviesList = () => {
    const infoFakeMovies = 
    [{title: 'Avengers', year:'2018'}, 
    {title: 'Spiderman', year:'2022'},
    {title: 'Venom', year:'2017'},
    {title: 'The marvels', year:'2023'}
    ]
    return(
        <>
        <h1 className='text-3xl font-bold m-2'>Top Movies</h1>
        <div className='flex flex-row min-h-screen min-w-full'>
            {infoFakeMovies.map((movie) => 
            <CardView
            title={movie.title}
            year={movie.year}
            /> )}
        </div>
        </>
    )
}
export default MoviesList;