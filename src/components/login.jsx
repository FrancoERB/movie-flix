import { Formik } from "formik";
import { useAuth } from "../context/User";
import { Link } from "react-router-dom";

const Login = () => {
  const { handleSubmitLoginData, validationSchemaInputsLogin } = useAuth();
  return (
    <div className="flex bg-custom-background items-center justify-center rounded-xl min-h-screen w-full">
      <div className="flex-col w-full sm:w-full sm:m-3 md:w-1/2 lg:w-1/3 bg-gradient-to-b from-pale-sky-300 to-pale-sky-100 p-6 md:p-12 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-white mb-4">Iniciar sesión</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchemaInputsLogin}
          onSubmit={handleSubmitLoginData}
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
            <form onSubmit={handleSubmit} className="flex gap-1 flex-col">
              <p className="flex text-white font-bold text-sm">
                Correo electrónico
              </p>
              <input
                className="flex h-12 rounded-sm"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <p className="text-red-500">
                {errors.email && touched.email && errors.email}
              </p>
              <p className="flex text-white font-bold text-sm mt-1">
                Contraseña
              </p>
              <input
                className="flex h-12 rounded-sm"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <p className="text-red-500">
                {errors.password && touched.password && errors.password}
              </p>
              <button
                className="flex px-14 py-4 rounded-sm mt-3 justify-center text-white  bg-red-800"
                type="submit"
                disabled={isSubmitting}
              >
                Confirmar
              </button>
            </form>
          )}
        </Formik>
        <p className=" flex mt-3 justify-center w-full text-white">
          ¿No tienes una cuenta? <Link className="text-white ml-1 hover:text-red-800" to={"/signUp"}>Registrate</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
