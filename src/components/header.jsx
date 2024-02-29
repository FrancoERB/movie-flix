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
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
      setPrevScrollPos(currentScrollPos);
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
      className={`flex items-center w-full fixed top-0 left-0 z-10 ${
        visible
          ? "bg-transparent animate__animated animate__headShake"
          : "bg-transparent backdrop-blur transition duration-300"
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

        {pathName !== "/" && pathName !== "/Sign-up" && (
          <>
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl absolute right-8 top-4 sm:top-[9px] cursor-pointer text-zinc-400 md:hidden"
              id="container-burger-menu"
            >
              {menuOpen ? <MdClose /> : <MdMenu />}
            </div>

            <ul
              className={`text-lg text-slate-300 md:flex gap-3 md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full ${
                menuOpen && visible && "bg-transparent backdrop-blur-2xl"
              } ${
                visible ? "bg-zinc-800" : "bg-transparent"
              }} md:w-auto md:pl-0 pl-9 transition-all dura ease-in ${
                menuOpen ? "top-10" : "top-[-490px]"
              }`}
            >
              <div
                className={`flex w-56 ${
                  menuOpen && "mt-5 "
                } items-center mr-20`}
                id="input-search-container"
              >
                <input
                  name="inputSearch"
                  className={`text-white placeholder:text-zinc-800 h-10 ${
                    menuOpen && "w-[400px]"
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
              </div>
              <div
                onClick={btnToggleTheme}
                className={`flex items-center text-3xl text-yellow-300 cursor-pointer ${
                  menuOpen && "mt-5"
                }`}
              >
                {theme === "dark" ? <MdOutlineWbSunny /> : <MdModeNight />}
              </div>
              <li className={`md:my-2 my-1 sm:text-zinc-800 md:text-zinc-400 md:hover:text-red-500 md:hover:scale-110 transition-transform duration-75`}>
                <Link onClick={handleLinkClick} to={"/Movies"}>
                  Inicio
                </Link>
              </li>
              <li className={`md:my-2 my-1 sm:text-zinc-800 md:text-zinc-400 md:hover:text-red-500 md:hover:scale-110 transition-transform duration-75`}>
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
