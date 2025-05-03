import { Outlet } from "react-router-dom";

function PaginaProfe() {
  return (
    <div>
      <h2>Zona del Admin</h2>
      {/* Aquí podrías poner un menú lateral o superior para el profe */}
      <Outlet />
    </div>
  );
}

export default PaginaProfe;
