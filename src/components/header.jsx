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
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 25);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, userName, pathName]);

  const handleSearch = (e) => {
    navigation(`/Search?my_search=${searchTerm}`);
    setSearchTerms("");
  };

  const getUsername = () => {
    const name = sessionStorage.getItem("userName");
    name && setUserName(name);
  };

  return (
    <header
      className={`flex items-center w-full fixed top-0 left-0 z-10 ${
        visible
          ? "bg-black animate__animated animate__backInDown"
          : "opacity-0 animate__animated animate__backOutUp  animate__slower"
      }`}
    >
      <div
        className="md:flex items-center justify-between py-2 sm:px-10 md:px-10 px-7 w-full"
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

        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl absolute right-8 top-4 sm:top-[9px] cursor-pointer text-white md:hidden"
          id="container-burger-menu"
        >
          {menuOpen ? <MdClose /> : <MdMenu />}
        </div>
        {pathName !== "/" && pathName !== "/Sign-up" && (
          <ul
            className={`text-lg text-slate-300 md:flex gap-3 md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full ${
              menuOpen && visible && "bg-black"
            } ${
              visible ? "bg-black" : "bg-transparent"
            }} md:w-auto md:pl-0 pl-9 transition-all dura ease-in ${
              menuOpen ? "top-10" : "top-[-490px]"
            }`}
          >
            <div
              className={`flex w-56 ${menuOpen && "mt-5 "} items-center mr-20`}
              id="input-search-container"
            >
              <input
                name="inputSearch"
                className={`text-white h-10 ${
                  menuOpen && "w-[400px]"
                } bg-zinc-800 rounded-xl px-5 text-center`}
                placeholder="Busca una película"
                value={searchTerm}
                onChange={(e) => setSearchTerms(e.target.value)}
              />
              <button
                className=" flex w-fit h-fit items-center mx-3"
                onClick={() => handleSearch(searchTerm)}
              >
                <MdOutlineSearch className="text-3xl text-white" />
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
            <li className="md:my-2 my-1 hover:text-white hover:scale-110 transition-transform duration-75">
              <Link to={"/Movies"}>Inicio</Link>
            </li>
            <li className="md:my-2 my-1 hover:text-white hover:scale-110 transition-transform duration-75">
              <Link to={"/Favorites"}>Favoritos</Link>
            </li>
            {userName && <Avatar avatarName={userName} />}
          </ul>
        )}
      </div>
    </header>
  );
};
export default Header;
