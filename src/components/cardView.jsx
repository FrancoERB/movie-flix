export const CardView = (props) => {

    const {
        title,
        year, 
        image, 
        onCardClick,
    } = props;

    return(
        <>  
            <div className=" flex flex-col max-w-64 rounded-sm shadow-lg m-1 hover:scale-105 transition-transform dark:bg-slate-950">
                <img
                    className="w-full h-96  object-center rounded-t-md"
                    src={`https://image.tmdb.org/t/p/w500/${image}.jpg`}
                    alt="Sunset in the mountains"
                    onClick={onCardClick}
                />
                <div className="flex flex-col h-auto dark:bg-zinc-800 rounded-b-md">
                    <h2 className="mb-4 font-bold text-lg p-1 overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-slate-300">{title}</h2>
                    <p className="text-gray-700 text-lg font-semibold p-1 dark:text-slate-300">{year}</p>
                </div>
            </div>
        </>
        
    )
}
