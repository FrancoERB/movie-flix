export const Pagination = (props) => {
    const {
        previousPage, 
        nextPage,
    } = props;

    return(
        <div className='flex min-w-full h-fit items-center justify-center my-5 gap-3'>
            <button 
                className='w-fit  text-zinc-500 font-semibold rounded-sm hover:scale-110'
                onClick={previousPage}
                > ◀ Previous page
            </button>
            <span className='text-zinc-500'>|</span>
            <button 
                className='w-fit text-zinc-500 font-semibold rounded-sm hover:scale-110'
                onClick={nextPage}
                > Next page ▶
            </button>
        </div>
    )
}