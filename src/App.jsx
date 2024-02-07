import {Routes, Route} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MoviesList from './screens/moviesList';
import Header from './components/header';
import Login from './components/login';
import SignUp from './components/sign-up';
import { initializeApp } from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import { useEffect, useState } from 'react';

const app = initializeApp(firebaseConfig);
function App() {
  const [token, setToken] = useState(null);
  const navigation = useNavigate();
  const localizationPath = window.location.pathname;

  useEffect(() => {
    const getTokenFromSessionStorage = sessionStorage.getItem('token');
    setToken(getTokenFromSessionStorage);
    console.log('token almacenado:', token);
    if(!getTokenFromSessionStorage && localizationPath !== '/Sign-up'){
      navigation('/');
    }else if(getTokenFromSessionStorage && localizationPath === '/'){
          navigation('/Movies');
    }
  }, [token]);

  return (
    <div className='w-full h-full'>
      <Header/>
      <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/Movies' element={<MoviesList/>}/>
          <Route path='/Sign-up' element={<SignUp/>}/>
      </Routes>
    </div>
  )
}
export default App
