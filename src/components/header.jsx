import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "./avatar";
import {
  MdModeNight,
  MdOutlineWbSunny,
  MdMenu,
  MdClose,
  MdOutlineSearch,
} from "react-icons/md";
import "animate.css";
import Swal from "sweetalert2";

const Header = (props) => {
  const { btnToggleTheme, theme } = props;

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [pathName, setPathName] = useState(null);
  const [searchTerm, setSearchTerms] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    setPathName(window.location.pathname);
    getUsername();
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(currentScrollPos < 100);
      setPrevScrollPos(currentScrollPos);
      setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, userName, pathName]);

  const handleSearch = (e) => {
    if (searchTerm.length === 0) {
      Swal.fire({
        text: "No deje campos vacíos",
      });
    } else if (searchTerm.length < 4) {
      Swal.fire({
        text: "Debe ingresar 4 caracteres como mínimo",
      });
    } else {
      navigation(`/Search?my_search=${searchTerm}`);
    }
    setSearchTerms("");
    setMenuOpen(false);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const getUsername = () => {
    const name = sessionStorage.getItem("userName");
    name && setUserName(name);
  };

  return (
    <header
      className={`flex items-center bg-transparent bg-gradient-to-b from-black to-transparent/50 w-full h-[7vh] fixed top-0 left-0 z-20 ${
        visible
          ? "bg-transparent animate__animated animate__headShake"
          : "bg-transparent backdrop-blur transition-opacity duration-300"
      }`}
    >
      <div
        className="md:flex items-center justify-between py-2 sm:px-2 md:px-2 px-7 w-full"
        id="container-main"
      >
        <div
          className="font-bold text-2xl cursor-pointer flex items-center text-gray-800"
          id="span-container"
        >
          <span className="font-bold text-2xl cursor-pointer text-red-600 mr-1">
            MOVIE-FLIX
          </span>
        </div>

        {pathName !== "/" && pathName !== "/signUp" && (
          <>
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl absolute right-8 top-4 sm:top-[9px] sm:right-2 cursor-pointer text-zinc-400 md:hidden"
              id="container-burger-menu"
            >
              {menuOpen ? <MdClose /> : <MdMenu />}
            </div>

            <ul
              className={`text-lg md:flex gap-3 md:pb-0 pb-12 ${
                menuOpen ? (theme === 'light' ? 'bg-white' : 'bg-black') : 'bg-transparent'
              } absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 transition-all ease-in ${
                menuOpen ? "top-[7vh]" : "top-[-490px]"
              }`}
            >
              <div
                className={`flex sm:w-full md:w-[12vw] lg:w-[12vw] justify-center ${
                  menuOpen && "mt-5 my-2"
                } items-center mr-20`}
                id="input-search-container"
              >
                <input
                  name="inputSearch"
                  className={`text-white placeholder:text-zinc-800 h-10 ${
                    menuOpen && "w-[70vw]"
                  } bg-zinc-400 rounded-xl px-5 text-center`}
                  placeholder="Busca una película"
                  value={searchTerm}
                  onChange={(e) => setSearchTerms(e.target.value)}
                />
                <button
                  className='flex w-fit h-fit items-center mx-3'
                  onClick={() => handleSearch(searchTerm)}
                >
                  <MdOutlineSearch className={`text-3xl ${theme === 'dark' ? 'text-slate-300' : 'text-zinc-400'}`}/>
                </button>
                <div
                  onClick={btnToggleTheme}
                  className={`flex sm:justify-center text-3xl text-yellow-300 cursor-pointer`}
                >
                  {theme === "dark" ? <MdOutlineWbSunny /> : <MdModeNight />}
                </div>
              </div>
              <li className={`flex justify-start sm:mx-5 sm:text-xl md:my-2 md:mx-2 md:w-fit lg:w-fit lg:mx-2 my-1 ${theme === 'light'? 'sm:text-black' : 'sm:text-white'} md:text-zinc-400 lg:text-zinc-400 md:hover:text-red-500 md:hover:scale-110 transition-transform duration-75`}>
                <Link onClick={handleLinkClick} to={"/Movies"}>
                  Inicio
                </Link>
              </li>
              <li className={`flex justify-start sm:mx-5 sm:text-xl md:my-2 my-1 ${theme === 'light'? 'sm:text-black' : 'sm:text-white'} md:text-zinc-400 lg:text-zinc-400 md:hover:text-red-500 md:hover:scale-110 transition-transform duration-75`}>
                <Link onClick={handleLinkClick} to={"/Favorites"}>
                  Favoritos
                </Link>
              </li>
              {userName && <Avatar avatarName={userName} />}
            </ul>
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
