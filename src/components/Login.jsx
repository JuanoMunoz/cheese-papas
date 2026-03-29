/*
Este componente fue creado para manejar el acceso administrativo al sistema.
Se encarga de validar las credenciales del usuario y permitir el ingreso al panel de gestión de datos.
*/
import { useState } from "react";
import { House } from "./SVG";
import toast from "react-simple-toasts";

const Login = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "CHEESEPAPAS2026**") {
      onLogin();
      toast("¡Bienvenido, Admin!", { 
        className: "my-toast", 
        position: "top-right",
        duration: 1500
      });
    } else {
      toast("Credenciales incorrectas", { 
        className: "my-toast-blue", 
        position: "top-right",
        duration: 1500
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-cheese rounded-full text-white">
              <House size={40} />
            </div>
          </div>
          <h2 className="text-3xl font-pacifico text-gray-900 font-bold">Admin <span className="text-sky-high">Login</span></h2>
          <p className="mt-2 text-sm text-gray-600 font-oswald">Para gestionar el menú de CheesePapas</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-high focus:border-sky-high focus:z-10 sm:text-sm"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-high focus:border-sky-high focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4">
             <button
              type="button"
              onClick={onBack}
              className="group relative w-1/3 flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-sky-high bg-sky-50 hover:bg-sky-100 focus:outline-none transition-all cursor-pointer font-oswald uppercase trackin-wider"
            >
              Volver
            </button>
            <button
              type="submit"
              className="group relative w-2/3 flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-cheese hover:bg-amber-400 focus:outline-none transition-all cursor-pointer font-oswald uppercase tracking-wider"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
