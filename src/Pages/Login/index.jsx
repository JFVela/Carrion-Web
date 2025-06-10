import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_ENDPOINTS } from "../../api/endpoints.js";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (token && rol) {
      try {
        const decoded = jwtDecode(token);
        const ahora = Date.now() / 1000;

        if (decoded.exp > ahora) {
          if (rol === "Admin") navigate("/admin");
          else if (rol === "Profesor") navigate("/profesor");
          else if (rol === "Alumno") navigate("/");
        } else {
          localStorage.clear(); // Token expirado
        }
      } catch (error) {
        localStorage.clear(); // Token inválido
      }
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: usuario,
          password: contrasena,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Guarda el token y datos del usuario
        localStorage.setItem("token", data.token);

        // Decodifica el token para extraer datos
        const decoded = jwtDecode(data.token);
        console.log(decoded);

        // Guarda los datos extraídos en localStorage si quieres
        localStorage.setItem(
          "usuario",
          JSON.stringify({
            nombre: decoded.data.nombre,
            apellido1: decoded.data.apellido1,
            apellido2: decoded.data.apellido2,
          })
        );
        localStorage.setItem("rol", decoded.data.rol);

        console.log("Autenticación exitosa");
        // Aquí puedes redirigir o cambiar de vista
        const rol = decoded.data.rol;
        console.log(rol);

        if (rol == "Admin") {
          navigate("/admin");
        } else if (rol == "Profesor") {
          navigate("/profesor");
        } else if (rol == "Alumno") {
          navigate("/");
        } else {
          localStorage.clear();
          navigate("/login");
        }
      } else {
        setError(data.error || "Error en la autenticación");
      }
    } catch (err) {
      console.error("Error al conectar con el backend:", err);
      setError("No se pudo conectar al servidor");
    }
  };

  //vista

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Usuario:</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;
