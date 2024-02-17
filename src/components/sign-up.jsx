import { Formik } from 'formik';
import { useAuth } from '../context/User';

const SignUp = () => {
    const {handleSubmitCreateSessionData, validationSchemaInputsRegister} = useAuth();

    return(
        <div className="flex items-center justify-center min-h-screen min-w-screen bg-custom-background">
        <div className=" flex flex-col min-h-fit sm:w-1/3 md:w-1/2 lg:w-1/3 bg-gradient-to-b from-pale-sky-300 to-pale-sky-100 p-12 rounded-xl shadow-md">
            <h2 className=" flex text-2xl font-bold w-full text-white mb-4">Registro</h2>
            <Formik
            initialValues={{ email: '', password: '', repeatPassword: '', displayName: '', }}
            validationSchema={validationSchemaInputsRegister}
            onSubmit={handleSubmitCreateSessionData}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form onSubmit={handleSubmit} className='flex gap-1 flex-col'>
                    <p className='flex text-white font-bold text-sm'>Nombre y apellido</p>
                    <input
                        className='flex h-12 rounded-sm'
                        type="text"
                        name="displayName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.displayName}
                    />
                    <p className='text-red-500'>{errors.displayName && touched.displayName && errors.displayName}</p>

                    <p className='flex text-white font-bold text-sm'>Correo electrónico</p>
                    <input
                        className='flex h-12 rounded-sm'
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    <p className='text-red-500'>{errors.email && touched.email && errors.email}</p>
                    <p className='flex text-white font-bold text-sm mt-1'>Contraseña</p>
                    <input
                        className='flex h-12 rounded-sm'
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    <p className='text-red-500'>{errors.password && touched.password && errors.password}</p>
                    <p className='flex text-white font-bold text-sm mt-1'>Repetir contraseña</p>
                    <input
                        className='flex h-12 rounded-sm'
                        type="password"
                        name="repeatPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.repeatPassword}
                    />
                    <p className='text-red-500'>{errors.repeatPassword && touched.repeatPassword && errors.repeatPassword}</p>
                    <button className='flex px-14 py-4 rounded-sm mt-3 justify-center text-white  bg-red-800 font-bold' type="submit" disabled={isSubmitting}>
                        Confirmar
                    </button>
                </form>
            )}
            </Formik>
        </div>
    </div>
    )
}
export default SignUp;