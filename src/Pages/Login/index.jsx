import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Container,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Login as LoginIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { API_ENDPOINTS } from "../../api/endpoints.js";

const Login = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    contrasena: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    verificarTokenExistente();
  }, [location]);

  const verificarTokenExistente = () => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (token && rol) {
      try {
        const decoded = jwtDecode(token);
        const ahora = Date.now() / 1000;

        if (decoded.exp > ahora) {
          redirigirPorRol(rol);
        } else {
          localStorage.clear();
        }
      } catch (error) {
        localStorage.clear();
        console.error("Token inválido:", error);
      }
    }
  };

  const redirigirPorRol = (rol) => {
    const rutas = {
      Admin: "/admin",
      Profesor: "/profesor",
      Alumno: "/",
    };

    const ruta = rutas[rol];
    if (ruta) {
      navigate(ruta);
    } else {
      localStorage.clear();
      navigate("/login");
    }
  };

  const validarFormulario = () => {
    if (!formData.usuario.trim()) {
      mostrarError("El usuario es requerido");
      return false;
    } else if (formData.usuario.length < 3) {
      mostrarError("El usuario debe tener al menos 3 caracteres");
      return false;
    }

    if (!formData.contrasena) {
      mostrarError("La contraseña es requerida");
      return false;
    } else if (formData.contrasena.length < 6) {
      mostrarError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    return true;
  };

  const mostrarError = (mensaje) => {
    Swal.fire({
      title: "Error",
      text: mensaje,
      icon: "error",
      confirmButtonText: "Entendido",
      confirmButtonColor: "#1976d2",
    });
  };

  const mostrarExito = (mensaje) => {
    Swal.fire({
      title: "¡Éxito!",
      text: mensaje,
      icon: "success",
      confirmButtonText: "Continuar",
      confirmButtonColor: "#1976d2",
    });
  };

  const manejarCambioInput = (campo) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: e.target.value,
    }));
  };

  const alternarVisibilidadContrasena = () => {
    setShowPassword(!showPassword);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setIsLoading(true);

    try {
      // ---------------------------------------------------------
      // 🔵 VALIDACIÓN LOCAL PARA ALUMNO (usuario: alumno / pass: alumno)
      // ---------------------------------------------------------
      if (
        formData.usuario.trim().toLowerCase() === "alumno" &&
        formData.contrasena.trim().toLowerCase() === "alumno"
      ) {
        // Token falso con fecha futura (1 día)
        const fakeToken = {
          data: {
            nombre: "Alumno",
            apellido1: "",
            apellido2: "",
            rol: "Alumno",
          },
          exp: Math.floor(Date.now() / 1000) + 86400,
        };

        localStorage.setItem("token", JSON.stringify(fakeToken));
        localStorage.setItem("rol", "Alumno");
        localStorage.setItem(
          "usuario",
          JSON.stringify({
            nombre: "Alumno",
            apellido1: "",
            apellido2: "",
          })
        );

        mostrarExito("Bienvenido Alumno");
        setIsLoading(false);

        setTimeout(() => {
          navigate("/");
        }, 800);

        return; // STOP → No llamar al backend
      }

      // ---------------------------------------------------------
      // 🔵 LOGIN NORMAL (SI NO ES “alumno”)
      // ---------------------------------------------------------
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: formData.usuario,
          password: formData.contrasena,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        const decoded = jwtDecode(data.token);

        localStorage.setItem(
          "usuario",
          JSON.stringify({
            nombre: decoded.data.nombre,
            apellido1: decoded.data.apellido1,
            apellido2: decoded.data.apellido2,
          })
        );
        localStorage.setItem("rol", decoded.data.rol);

        mostrarExito("¡Autenticación exitosa!");

        setTimeout(() => {
          redirigirPorRol(decoded.data.rol);
        }, 1000);
      } else {
        mostrarError(data.error || "Error en la autenticación");
      }
    } catch (err) {
      console.error("Error al conectar con el backend:", err);
      mostrarError("No se pudo conectar al servidor. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={10}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              color: "white",
              padding: 3,
              textAlign: "center",
            }}
          >
            <LoginIcon sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Iniciar Sesión
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Ingresa tus credenciales para acceder al sistema
            </Typography>
          </Box>

          <CardContent sx={{ padding: 4 }}>
            <Box component="form" onSubmit={manejarEnvio} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="usuario"
                label="Usuario"
                name="usuario"
                autoComplete="username"
                autoFocus
                value={formData.usuario}
                onChange={manejarCambioInput("usuario")}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="contrasena"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                id="contrasena"
                autoComplete="current-password"
                value={formData.contrasena}
                onChange={manejarCambioInput("contrasena")}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="alternar visibilidad de contraseña"
                        onClick={alternarVisibilidadContrasena}
                        disabled={isLoading}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  mt: 2,
                  mb: 2,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #1976D2 30%, #1BA3D3 90%)",
                  },
                }}
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <LoginIcon />
                  )
                }
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
