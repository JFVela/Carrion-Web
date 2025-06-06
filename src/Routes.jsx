import { Routes, Route } from "react-router-dom";
import PaginaBase from "./Pages/Estudiante/PaginaBase";
import Inicio from "./Pages/Estudiante/Inicio";
import Login from "./Pages/Login/";
import Cursos from "./Pages/Estudiante/Cursos";
import Asistencias from "./Pages/Estudiante/Asistencias";
import Trucos from "./Pages/Estudiante/Trucos";
import Ejercicios from "./Pages/Estudiante/Ejercicios";
import Error404 from "./Pages/Error404";

// Páginas del profesor
import PaginaProfe from "./Pages/Profesor/Inicio";
import TomarAsistencia from "./Pages/Profesor/TomarAsistencia";

//Paginas de administración
import PaginaAdmin from "./Pages/Admin/Inicio";
import ListaAlumnos from "./Pages/Admin/ListaAlumnos";

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas del alumno */}
      <Route path="/" element={<PaginaBase />}>
        <Route index element={<Inicio />} />
        <Route path="login" element={< Login/>} />
        <Route path="cursos" element={<Cursos />} />
        <Route path="asistencias" element={<Asistencias />} />
        <Route path="trucos" element={<Trucos />} />
        <Route path="ejercicios" element={<Ejercicios />} />
        <Route path="*" element={<Error404 />} />
      </Route>

      {/* Rutas del profesor */}
      <Route path="/profesor" element={<PaginaProfe />}>
        <Route path="tomar-asistencia" element={<TomarAsistencia />} />
      </Route>

      <Route path="/admin" element={<PaginaAdmin />}>
        <Route path="lista-alumnos" element={<ListaAlumnos />} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;
