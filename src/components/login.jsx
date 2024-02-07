import { Formik } from 'formik';

 const Login = ({handleSubmit, validationSchema}) => {
    
    return(
        <div className="flex bg-custom-background items-center justify-center rounded-xl min-h-screen min-w-full">
            <div className=" flex flex-col  w-1/3 min-h-96 bg-gradient-to-b from-pale-sky-300 to-pale-sky-100 p-12 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-white mb-4">Iniciar sesión</h2>
                <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
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
                    <p className='flex text-white font-bold text-sm'>Correo electrónico</p>
                    <input
                        className='flex h-12 rounded-sm'
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                    <p className='flex text-white font-bold text-sm mt-1'>Contraseña</p>
                    <input
                        className='flex h-12 rounded-sm'
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    {errors.password && touched.password && errors.password}
                    <button className='flex px-14 py-4 rounded-sm mt-3 justify-center text-white  bg-red-800' type="submit" disabled={isSubmitting}>
                        Confirmar
                    </button>
                    </form>
                )}
                </Formik>
                <p className=' flex mt-3 justify-center w-full text-white'>
                    ¿No tienes una cuenta?<a className='ml-1 text-white hover:text-red-800' href="/Sign-up">Regístrate.</a>
                </p>
            </div>
        </div>
    )
}
export default Login;