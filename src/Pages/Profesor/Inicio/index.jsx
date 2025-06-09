import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";




function PaginaProfe() {
 const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  if (!token || rol !== 'Profesor') {
    navigate('/login');
  }
}, [navigate]);



  return (
    <div>
      <h2>Zona del Profesor</h2>
      {/* Aquí podrías poner un menú lateral o superior para el profe */}
      <Outlet />
    </div>
  );
}

export default PaginaProfe;
