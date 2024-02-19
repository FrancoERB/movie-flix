import {Routes, Route} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MoviesList from './screens/moviesList';
import Header from './components/header';
import Login from './components/login';
import SignUp from './components/sign-up';
import { Search } from './screens/search';
import { Detail } from './screens/detail';
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
    
    if(!getTokenFromSessionStorage && localizationPath !== '/Sign-up'){
      navigation('/');
    }else if(getTokenFromSessionStorage && localizationPath === '/' || localizationPath === 'Sign-up'){
          navigation('/Movies');
    }
  }, [token, localizationPath]);

  useEffect(() => {
    if(theme === 'dark'){
      document.querySelector('body').classList.add('dark');
    }else{
      document.querySelector('body').classList.remove('dark');
    }
  },[theme])

  const handleChangeTheme = () => {
    setTheme(prevTheme => prevTheme === 'light'? 'dark' : 'light');
  }

  return (
    <div className='w-full h-full dark:bg-slate-950'>
      <Header btnToggleTheme={handleChangeTheme} theme={theme}/>
      <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/Movies' element={<MoviesList/>}/>
          <Route path='/Sign-up' element={<SignUp/>}/>
          <Route path='/Detail' element={<Detail/>}/>
          <Route path='/Search' element={<Search/>}/>
      </Routes>
    </div>
  )
}
export default App
