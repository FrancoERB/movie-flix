import { createContext, useState } from "react"
import Swal from "sweetalert2";
import { getAuth, signInWithEmailAndPassword,  createUserWithEmailAndPassword } from "firebase/auth";
import * as Yup from 'yup';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState('');
    
    //Manejo de inputs para evitar errores de entrada//
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
    
    //Validacion de datos de usuario en firebase//
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

    //Creacion de un nuevo usuario//
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

    return(
        <AuthContext.Provider value={{
            validationSchemaInputsLogin,
            validationSchemaInputsRegister,
            handleSubmitLoginData,
            handleSubmitCreateSessionData,
        }}>
            {children}
        </AuthContext.Provider>
    )
}