import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "./avatar";
import { MdModeNight, MdOutlineWbSunny, MdMenu, MdClose  } from "react-icons/md";


const Header = (props) => {
    const {
      btnToggleTheme, 
      theme,
    } = props;
    
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userName, setUserName] = useState(null);
    const [pathName, setPathName] = useState(null);
  
    useEffect(() => {
      setPathName(window.location.pathname);
      console.log('path:', pathName);
      getUsername();
      const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 25);
        setPrevScrollPos(currentScrollPos);
      };
      
      window.addEventListener('scroll', handleScroll);
  
      return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, userName, pathName]);

    const getUsername = () => {
      const name = sessionStorage.getItem('userName');
      name && setUserName(name);
    }

    return(
        <header className={`flex items-center w-full fixed top-0 left-0 z-10 transition-opacity duration-700 ${
            visible ? 'bg-black' : 'opacity-0'}`}>
             <div className='md:flex items-center justify-between py-4 md:px-10 px-7 w-full' id='container-main'>
                  <div className='font-bold text-2xl cursor-pointer flex items-center text-gray-800' id='span-container'>
                    <span className='font-bold text-2xl cursor-pointer text-red-600 mr-1'
                    >MOVIE-FLIX
                    </span>
                  </div>
                  <div onClick={() => setMenuOpen(!menuOpen)} className='text-3xl absolute right-8 top-5 cursor-pointer text-white md:hidden' id='container-burguer-menu'>
                    { menuOpen? <MdClose/>:<MdMenu/> }
                  </div>
                  {pathName !== '/' &&  pathName !== '/Sign-up' &&
                     <ul className={`text-lg text-slate-300 md:flex gap-3 md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full ${menuOpen && visible && 'bg-black'} ${visible?'bg-black':'bg-transparent'}} md:w-auto md:pl-0 pl-9 transition-all dura ease-in ${menuOpen? 'top-10':'top-[-490px]'}`}>
                     <div onClick={btnToggleTheme} className={`flex items-center text-3xl text-yellow-300 cursor-pointer ${menuOpen && 'mt-5' }`}>
                       {theme === 'dark'? <MdOutlineWbSunny/> : <MdModeNight/>}
                     </div>
                     <li className='md:my-2 my-1 hover:text-white hover:scale-110 transition-transform duration-75'>
                       <Link to={'/Movies'}>Inicio</Link>
                     </li>
                     <li className='md:my-2 my-1 hover:text-white hover:scale-110 transition-transform duration-75'>
                       <Link>Favoritos</Link>
                     </li>
                     {
                     userName && <Avatar avatarName={userName}/>
                     }
                 </ul>
                  }
             </div>
        </header>
    )
}
export default Header;
