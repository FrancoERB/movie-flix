import { Formik } from 'formik';

const SignUp = (handleSubmit, validationSchema) => {

    return(
        <div className="flex items-center justify-center min-h-screen min-w-screen bg-custom-background">
        <div className=" flex flex-col min-h-fit w-1/3 bg-gradient-to-b from-pale-sky-300 to-pale-sky-100 p-12 rounded-xl shadow-md">
            <h2 className=" flex text-2xl font-bold w-full text-white mb-4">Registro</h2>
            <Formik
            initialValues={{ email: '', password: '', repeatPassword:',' }}
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
                <p className='flex text-white font-bold text-sm mt-1'>Repetir contraseña</p>
                <input
                    className='flex h-12 rounded-sm'
                    type="password"
                    name="repeatPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.repeatPassword}
                />
                {errors.repeatPassword && touched.repeatPassword && errors.repeatPassword}
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