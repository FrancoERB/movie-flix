import './style.css';
export const CardView = (props) => {
  const { 
    title, 
    year, 
    image, 
    onCardClick, 
    btnFavOnClick,
   } = props;
   
  return (
    <>
      <div className={`flex sm:flex-row md:flex-col lg:flex-col sm:w-full sm:h-40 md:h-[500px] md:w-52 lg:w-64 shadow-lg sm:mx-5 md:mx-3 lg:mx-3 dark:bg-slate-950 md:hover:-scale-95 transition-transform lg:hover:scale-95`}>
        <img
          className="w-full sm:w-1/2 sm:ml-2 md:m-0 md:w-80 lg:m-0 lg:w-full sm:h-full md:h-96 lg:h-96 object-center sm:rounded-s-md md:rounded-t-md md:rounded-b-none"
          id='imgCardView'
          src={`https://image.tmdb.org/t/p/w500/${image}.jpg`}
          onClick={onCardClick}
        />
       
        <div className="flex flex-col justify-between h-auto w-full md:mx-0 dark:bg-zinc-800 sm:rounded-e-md md:rounded-t-none lg:rounded-b-md">
          <h2 className="mb-4 font-bold sm:text-base md:text-base lg:text-lg p-1 sm:text-wrap md:text-nowrap lg:text-nowrap overflow-hidden overflow-ellipsis max-w-[80%] whitespace-nowrap dark:text-slate-300">
            {title}
          </h2>
          <div className='flex w-full h-fit justify-between'>
            <p className="text-gray-700 text-lg font-semibold p-1">
              {year}
            </p>
            <button
              className={`flex w-10 h-10 text-2xl justify-center items-center border-none  rounded-full z-[5] md:hover:scale-110 lg:hover:scale-110 hover:bg-red-700`}
              onClick={btnFavOnClick}
            >
              🤍
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
