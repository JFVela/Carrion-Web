// Routes.jsx
import { Routes, Route } from "react-router-dom";
import PaginaBase from "./Pages/PaginaBase";
import Inicio from "./Pages/Inicio";

//<Route path="clasificacion" element={<Clasificacion />} />
//<Route path="*" element={<Error404 />} />

// AppRoutes.jsx
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PaginaBase />}>
        <Route index element={<Inicio />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
