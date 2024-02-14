export const Pagination = ({previousPage, nextPage}) => {
    return(
        <div className='flex min-w-full h-fit items-center justify-center m-5 gap-3'>
            <button 
                className='p-1 w-fit bg-slate-700 text-white rounded-sm hover:bg-gray-800'
                onClick={previousPage}
                > Previus page
            </button>
            <button 
                className='p-1 w-fit bg-slate-700 text-white rounded-sm hover:bg-slate-800'
                onClick={nextPage}
                > Next page 
            </button>
        </div>
    )
}