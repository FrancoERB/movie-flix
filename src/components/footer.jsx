import { Link } from 'react-router-dom';
import logoTmdb from '../assets/logo-tmdb.png';
import { RiInstagramLine, RiGithubFill, RiLinkedinBoxFill  } from "react-icons/ri";

export const Footer = () => {
    return(
        <div className='flex flex-col min-w-screen sm:h-[50vh] md:h-[40vh] lg:h-[40vh] bg-zinc-800 '>
            <div className='flex w-full bg-zinc-800 h-[80vh] sm:mt-5 md:h-48 items-center justify-center'>
            <img src={logoTmdb} className='sm:w-32 sm:h-32 md:h-48 md:w-48 '/>
            <div className=' text-left sm:ml-5'>
                <h3 className='font-bold sm:text-sm text-white mb-3'> LO BÁSICO </h3>
                <ul className='font-semibold sm:text-xs text-white'>
                    <li className='hover:scale-110 hover:text-cyan-500'>
                        <Link 
                        className='flex flex-row items-center gap-1'
                        to={'https://www.themoviedb.org/about'}
                        target='_blank' 
                            >Sobre TMDB
                        </Link>
                    </li>
                    <li className='hover:scale-110 hover:text-cyan-500'>
                        <Link 
                            className='flex flex-row items-center gap-1'
                            to={'https://developer.themoviedb.org/docs/getting-started'}
                            target='_blank'
                            >API TMDB
                        </Link>
                    </li>
                    <li className='hover:scale-110 hover:text-cyan-500'>
                        <Link 
                            className='flex flex-row items-center gap-1'
                            to={'https://status.themoviedb.org/'}
                            target='_blank'
                            >Estado TMDB
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='text-center md:text-left' id='container-contact-me'>
                <h3 className='font-bold text-sm text-white mb-3 ml-3'> CONTACTAME </h3>
                <ul className='font-semibold ml-3 sm:text-xs text-white '>
                    <li className='hover:scale-110 hover:text-cyan-500'>
                        <Link 
                        to={'https://www.instagram.com/francoerben23/'}
                        target='_blank' 
                        className='flex flex-row items-center gap-1'
                            ><RiInstagramLine />Instagram
                        </Link>
                    </li>
                    <li className='hover:scale-110 hover:text-cyan-500'>
                        <Link 
                            to={'https://github.com/FrancoERB'}
                            target='_blank'
                            className='flex flex-row items-center gap-1'
                            ><RiGithubFill />GitHub
                        </Link>
                    </li>
                    <li className='hover:scale-110 hover:text-cyan-500'>
                        <Link 
                            to={'https://www.linkedin.com/in/franco-erben-272042205/'}
                            target='_blank'
                            className='flex flex-row items-center gap-1'
                            ><RiLinkedinBoxFill />Linkedin
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        <span className='flex w-full h-fit sm:mt-2 text-white mb-10 place-content-center font-bold text-md'> Desarrollado por Franco Erben </span>
        </div>
        
    )
}