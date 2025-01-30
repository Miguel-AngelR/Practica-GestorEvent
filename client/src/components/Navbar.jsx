import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-800 text-white my-3 flex justify-between items-center py-4 px-10 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/tasks" : "/"} className="hover:text-gray-300 transition">
          Administrador de Eventos
        </Link>
      </h1>
      <ul className="flex items-center gap-x-4">
        {isAuthenticated ? (
          <>
            <li className="text-lg font-semibold">Bienvenido, {user.username}</li>
            <li>
              <ButtonLink to="/add-task" className="uppercase">Agregar Evento</ButtonLink>
            </li>
            <li>
              <button 
                onClick={() => logout()} 
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition "
              >
                Cerrar
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login" className="uppercase">Inicio</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register" className="uppercase">Registro</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
