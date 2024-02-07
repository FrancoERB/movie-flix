import {Routes, Route} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MoviesList from './components/moviesList';
import Header from './components/header';
import Login from './components/login';
import SignUp from './components/sign-up';
import { initializeApp } from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import Swal from "sweetalert2";
import { getAuth, signInWithEmailAndPassword,  createUserWithEmailAndPassword } from "firebase/auth";
import * as Yup from 'yup';
import { useEffect, useState } from 'react';

const app = initializeApp(firebaseConfig);
function App() {
  const [token, setToken] = useState(null);
  const navigation = useNavigate();
  const localizationPath = window.location.pathname;
    const validationSchemaInputsLogin = Yup.object({
        email: Yup.string().email('Formato de correo electrónico no válido').required('Este campo es obligatorio'),
        password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Este campo es obligatorio'),
    });
    const validationSchemaInputsRegister = Yup.object({
        email: Yup.string().email('Formato de correo electrónico no válido').required('Este campo es obligatorio'),
        password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Este campo es obligatorio'),
        repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('Este campo es obligatorio'),
      });

      useEffect(() => {
        const getTokenFromSessionStorage = sessionStorage.getItem('token');

        if(!getTokenFromSessionStorage){
          navigation('/');
        }else if(getTokenFromSessionStorage && localizationPath === '/'){
          navigation('/Movies');
        }
      }, [token]);

    const handleSubmitLoginData = (values, { setSubmitting }) => {
        setSubmitting(true);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userToken = user.stsTokenManager.accessToken;
            sessionStorage.setItem('token', JSON.stringify(userToken));
            setToken(userToken);
            Swal.fire('Autenticación exitosa', '¡Bienvenido!', 'success');
            navigation('/Movies');
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Errores', errorCode, errorMessage);
            Swal.fire('Error de autenticación', errorMessage, 'error');
        })
        .finally(() => {
            setSubmitting(false);
        });
    }

    const handleSubmitCreateSessionData = (values, { setSubmitting }) => {
        setSubmitting(true);
    
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Usuario autenticado:', user);
                Swal.fire('Autenticación exitosa', '¡Bienvenido!', 'success');
                navigation('/Movies')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Errores', errorCode, errorMessage);
                Swal.fire('Error de autenticación', errorMessage, 'error');
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

  return (
    <div className='w-full h-full'>
    <Header/>
     <Routes>
        <Route 
          path='/' 
          element={
          <Login 
            handleSubmit={handleSubmitLoginData} 
            validationSchema={validationSchemaInputsLogin}
          />}
          >
        </Route>
        <Route path='/Movies' element={<MoviesList/>}/>
        <Route 
          path='/Sign-up' 
          element={
            <SignUp
              handleSubmit={handleSubmitCreateSessionData}
              validationSchema={validationSchemaInputsRegister}
            />}
            >
        </Route>
     </Routes>
    </div>
    
  )
}
export default App
