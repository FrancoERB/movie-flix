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
      <div className={`flex sm:flex-row md:flex-col lg:flex-col sm:w-[90%] sm:my-2 sm:h-40 md:h-[100%]  md:w-[80%] lg:w-[90%] lg:h-fit shadow-lg md:mx-1 lg:mx-1 dark:bg-slate-950 transition-transform lg:hover:scale-90`}>
        <img
          className="w-full sm:w-[70%] md:m-0 md:w-[100%]  lg:m-0 lg:w-[100%]  sm:h-full md:h-[70%]  lg:h-[50%]  object-center sm:rounded-s-md md:rounded-t-md md:rounded-b-none"
          id='imgCardView'
          src={`https://image.tmdb.org/t/p/w500/${image}.jpg`}
          onClick={onCardClick}
        />
       
        <div className="flex flex-col justify-between sm:mx-4 h-auto w-full md:mx-0 sm:rounded-e-md md:rounded-t-none lg:rounded-b-md">
          <h2 className="mb-4 font-bold sm:text-base md:text-base lg:text-base p-1 sm:text-wrap md:text-nowrap lg:text-nowrap overflow-hidden whitespace-normal breW max-w-[80%] dark:text-slate-300">
            {title}
          </h2>
          <div className='flex w-full h-fit justify-between'>
            <p className="text-gray-700 text-sm font-semibold p-1">
              {year}
            </p>
            {/* <button
              className={`flex w-10 h-10 text-base justify-center items-center border-none  rounded-full z-[5] md:hover:scale-110 lg:hover:scale-110 hover:bg-red-700`}
              onClick={btnFavOnClick}
            >
              🤍
            </button> */}
          </div>
        </div>
      </div>
    
  );
};
