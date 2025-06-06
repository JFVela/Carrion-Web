import React, { useState } from 'react';
import { API_ENDPOINTS } from '../../api/endpoints.js'
const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "usuario": usuario,
          "password": contrasena
        })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Guarda el token y datos del usuario
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        localStorage.setItem('rol', JSON.stringify(data.rol));


        console.log('Autenticación exitosa');
        // Aquí puedes redirigir o cambiar de vista
      } else {
        setError(data.error || 'Error en la autenticación');
      }
    } catch (err) {
      console.error('Error al conectar con el backend:', err);
      setError('No se pudo conectar al servidor');
    }
  };

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

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;
