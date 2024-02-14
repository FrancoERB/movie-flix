import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "./avatar";
import { MdModeNight, MdOutlineWbSunny  } from "react-icons/md";

const Header = ({btnToggleTheme, theme}) => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [userName, setUserName] = useState(null);
    const pathName = window.location.pathname;
  
    useEffect(() => {
      getUsername();
      const handleScroll = () => {
        const currentScrollPos = window.scrollY;
  
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 25);
        setPrevScrollPos(currentScrollPos);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, userName]);

    const getUsername = () => {
      const name = sessionStorage.getItem('userName');
      name && setUserName(name);
    }

    return(
        <header className={`flex items-center justify-between w-full h-16 sticky top-0 z-10 transition-colors duration-500 ${
            visible ? 'bg-black' : ' bg-transparent backdrop-blur-md'}`}>
              <div className='flex flex-row'>
              {pathName === '/' && 
                    <h2 className='text-3xl font-extrabold text-red-600'>MOVIEFLIX</h2>
              }
              {pathName !== '/' && 
                <>
                <h2 className=' text-3xl font-extrabold text-red-600'>MOVIEFLIX</h2>
                <ul className={`flex flex-row justify-center items-center ${visible? 'text-gray-400' : 'text-red-600'} ml-3 gap-4 text-xl border-l-2 border-gray-500 px-2`}>
                  <li>
                    <Link to={'/Movies'}>Inicio</Link>
                  </li>
                  <li className='border-l-2 border-gray-500 px-2'>
                    <Link>Favoritos</Link>
                  </li>
                </ul>

                </>
              }
              </div>
              
             {userName && 
             <div className='flex flex-row justify-center items-center w-fit h-full gap-1'>
                <button onClick={btnToggleTheme}>
                  {theme === 'light' ? 
                    <MdModeNight className='text-yellow-200 w-7 h-7 mr-4'/> 
                    : 
                    <MdOutlineWbSunny className='text-yellow-200 w-7 h-7 mr-4'/>}
                </button>
                <Avatar avatarName={userName}/>
                <p 
                  className='flex w-fit h-full px-3 text-gray-400 text-2xl justify-center items-center font-semibold'>{userName}
                </p>
             </div>
             }
        </header>
    )
}
export default Header;
