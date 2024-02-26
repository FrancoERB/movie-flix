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
      <div className={`flex sm:flex-row md:flex-col lg:flex-col sm:w-full sm:h-40 md:h-[500px] md:w-64 lg:max-w-64 rounded-sm shadow-lg m-1 dark:bg-slate-950 md:hover:scale-105 transition-transform lg:hover:scale-110`}>
        <img
          className="w-full sm:w-1/2 sm:ml-2 md:m-0 md:w-80 lg:m-0 lg:w-full sm:h-full md:h-96 lg:h-96 object-center rounded-t-md"
          src={`https://image.tmdb.org/t/p/w500/${image}.jpg`}
          onClick={onCardClick}
        />
        <button
          className={`flex w-10 h-10 text-2xl justify-center items-center border-none absolute rounded-full z-[5] md:hover:scale-110 lg:hover:scale-110`}
          onClick={btnFavOnClick}
        >
          🤍
        </button>
        <div className="flex flex-col h-auto w-full dark:bg-zinc-800 rounded-b-md">
          <h2 className="mb-4 font-bold sm:text-xs md:text-base lg:text-lg p-1 overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-slate-300">
            {title}
          </h2>
          <p className="text-gray-700 text-lg font-semibold p-1 dark:text-slate-300">
            {year}
          </p>
        </div>
      </div>
    </>
  );
};
