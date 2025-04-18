// PaginaBase.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Box,
  Tab,
} from "@mui/material";
import { TabContext, TabList } from "@mui/lab";


function PaginaBase() {
  const location = useLocation();
  const navigate = useNavigate();

  // Controla el tab activo basado en la ruta
  const getTabValue = () => {
    switch (location.pathname) {
      case "/":
        return "1";
      case "/cursos":
        return "2";
      case "/asistencias":
        return "3";
      case "/trucos":
        return "4";
      case "/ejercicios":
        return "5";
      default:
        return false;
    }
  };

  const handleChange = (event, newValue) => {
    // Navega a la ruta asociada
    switch (newValue) {
      case "1":
        navigate("/");
        break;
      case "2":
        navigate("/cursos");
        break;
      case "3":
        navigate("/asistencias");
        break;
      case "4":
        navigate("/trucos");
        break;
      case "5":
        navigate("/ejercicios");
        break;
      default:
        break;
    }
  };

  return (
    <TabContext value={getTabValue()}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          onChange={handleChange}
          variant="scrollable"
          aria-label="Tabs de navegación"
        >
          <Tab label="Resumen" value="1" />
          <Tab label="Cursos" value="2" />
          <Tab label="Asistencias" value="3" />
          <Tab label="Trucos" value="4" />
          <Tab label="Ejercicios" value="5" />
        </TabList>
      </Box>

      <Container sx={{ mt: 2 }}>
        <Outlet /> {/* Aquí aparecerán tus páginas */}
      </Container>
    </TabContext>
  );
}

export default PaginaBase;
