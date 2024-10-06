import {Routes, Route} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MoviesList from './screens/moviesList';
import Header from './components/header';
import Login from './components/login';
import SignUp from './components/sign-up';
import { Footer } from './components/footer';
import { Search } from './screens/search';
import { Detail } from './screens/detail';
import { Favorites } from './screens/favorites';
import { initializeApp } from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import { useEffect, useState } from 'react';

const app = initializeApp(firebaseConfig);
function App() {
  const [token, setToken] = useState(null);
  const [theme, setTheme] = useState('light');
  const navigation = useNavigate();
  const localizationPath = window.location.pathname;

  useEffect(() => {
    const getTokenFromSessionStorage = sessionStorage.getItem('token');
    setToken(getTokenFromSessionStorage);
    
    if(!getTokenFromSessionStorage && localizationPath !== '/signUp'){
      navigation('/');
    }else if(getTokenFromSessionStorage && localizationPath === '/' || localizationPath === 'signUp'){
          navigation('/Movies');
    }
  }, [token, localizationPath]);

  useEffect(() => {
    if(theme === 'dark'){
      document.querySelector('body').classList.add('darkBody');
    }else {
      document.querySelector('body').classList.remove('darkBody');
    }
  },[theme])

  const handleChangeTheme = () => {
    setTheme(prevTheme => prevTheme === 'light'? 'dark' : 'light');
  }

  return (
    <div className='w-full min-h-[100vh] dark:bg-black overflow-x-hidden'>
      <Header btnToggleTheme={handleChangeTheme} theme={theme}/>
      <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/Movies' element={<MoviesList/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/Detail' element={<Detail/>}/>
          <Route path='/Search' element={<Search/>}/>
          <Route path='/Favorites' element ={<Favorites themeColor={theme}/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}
export default App
