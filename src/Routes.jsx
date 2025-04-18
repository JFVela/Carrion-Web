// AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PaginaBase from "./Pages/PaginaBase";
import Inicio from "./Pages/Inicio";
import Cursos from "./Pages/Cursos";
import Asistencias from "./Pages/Asistencias";
import Trucos from "./Pages/Trucos";
import Ejercicios from "./Pages/Ejercicios";
import Error404 from "./Pages/Error404"; // Opcional

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PaginaBase />}>
        <Route index element={<Inicio />} />
        <Route path="cursos" element={<Cursos />} />
        <Route path="asistencias" element={<Asistencias />} />
        <Route path="trucos" element={<Trucos />} />
        <Route path="ejercicios" element={<Ejercicios />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
