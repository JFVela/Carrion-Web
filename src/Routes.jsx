import { Routes, Route } from "react-router-dom";
import PaginaBase from "./Pages/PaginaBase";
import Inicio from "./Pages/Inicio";
import Cursos from "./Pages/Cursos";
import Asistencias from "./Pages/Asistencias";
import Trucos from "./Pages/Trucos";
import Ejercicios from "./Pages/Ejercicios";
import Error404 from "./Pages/Error404";

// Páginas del profesor
import PaginaProfe from "./Pages/Profesor/Inicio";
import TomarAsistencia from "./Pages/Profesor/TomarAsistencia";

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas del alumno */}
      <Route path="/" element={<PaginaBase />}>
        <Route index element={<Inicio />} />
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
    </Routes>
  );
}

export default AppRoutes;
