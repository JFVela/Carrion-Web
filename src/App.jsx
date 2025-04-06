"use client";

import React, { useState, useMemo } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookIcon from "@mui/icons-material/Book";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { Container } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FloatingActionButton from "./Componentes/BotonFlotante";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styled from "styled-components";

const Encabezado = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #343a40;
`;

const Bordes = styled.div`
  border: 1px solid #343a40;
  width: 48%;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  background-color: ${(props) => (props.mode === "dark" ? "#c8c8c8" : "#f8f9fa")};

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`;

const Titulo = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #343a40;
  text-align: center;
  margin-top: 20px;
  color: ${(props) => (props.mode === "dark" ? "#000000" : "#000000")};

`;

const Titulo2 = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #7b7b7b;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Contenido = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
  margin: 10px;
  border: 1px solid #343a40;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
`;


function App() {
  const [value, setValue] = useState("1");
  const [mode, setMode] = useState("light");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FloatingActionButton />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
          minHeight: "56px",
        }}
      >
        <FormControl>
          <FormLabel id="demo-theme-toggle">Theme</FormLabel>
          <RadioGroup
            aria-labelledby="demo-theme-toggle"
            name="theme-toggle"
            row
            value={mode}
            onChange={(event) => setMode(event.target.value)}
          >
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          </RadioGroup>
        </FormControl>
      </Box>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="scrollable"
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="Resumen" value="1" />
            <Tab label="Cursos" value="2" />
            <Tab label="Asistencias" value="3" />
            <Tab label="Trucos" value="4" />
            <Tab label="Ejercicios" value="5" />
          </TabList>
        </Box>
        <Container>
          <TabPanel value="1">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <Encabezado>
                      <h5 className="card-title">Asistencia</h5>
                      <CalendarMonthIcon />
                    </Encabezado>
                    <p className="card-text">92%</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <Encabezado>
                      <h5 className="card-title">Cursos Inscritos</h5>
                      <BookIcon />
                    </Encabezado>
                    <p className="card-text">12 Cursos</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <Encabezado>
                      <h5 className="card-title">Clases Grabadas</h5>
                      <VideoCameraFrontIcon />
                    </Encabezado>
                    <p className="card-text">24 clases</p>
                  </div>
                </div>
              </div>
            </div>
            <Contenido>
              <Bordes mode={mode}>
                <Titulo mode={mode} >Promedio Academico</Titulo>
                <BarChart
                  series={[
                    { data: [16, 14, 18, 12, 15, 19, 17, 13, 16, 11, 20, 10] },
                  ]}
                  height={290}
                  xAxis={[
                    {
                      data: [
                        "Mate",
                        "Comu",
                        "Hist",
                        "Geo",
                        "Física",
                        "Química",
                        "Bio",
                        "Arte",
                        "Música",
                        "Inglés",
                        "EP",
                        "Relig",
                      ],
                      scaleType: "band",
                    },
                  ]}
                  margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
              </Bordes>
              <Bordes  mode={mode}>
                <Titulo mode={mode}>Actividades Recientes</Titulo>
                <Titulo2>Últimas actualizaciones en tus cursos</Titulo2>
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    maxHeight: 225,
                    overflow: "auto",
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Juan" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Profesor Juan Figueroa"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "text.primary", display: "inline" }}
                          >
                            17:00
                          </Typography>
                          {" Tarea para Vectores II"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Carmen" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Profesora Carmen"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "text.primary", display: "inline" }}
                          >
                            16:00
                          </Typography>
                          {" Tarea Raz. Verbal: pagina 15-25"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="D" src="/static/images/avatar/3.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Profesor David"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "text.primary", display: "inline" }}
                          >
                            15:00
                          </Typography>
                          {" Tarea en la pagina 15 al 22"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Carmen" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Profesora Carmen"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "text.primary", display: "inline" }}
                          >
                            16:00
                          </Typography>
                          {" Tarea Raz. Verbal: pagina 15-25"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Carmen" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Profesora Carmen"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "text.primary", display: "inline" }}
                          >
                            16:00
                          </Typography>
                          {" Tarea Raz. Verbal: pagina 15-25"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Carmen" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Profesora Carmen"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "text.primary", display: "inline" }}
                          >
                            16:00
                          </Typography>
                          {" Tarea Raz. Verbal: pagina 15-25"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>{" "}
                </List>
              </Bordes>
            </Contenido>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </Container>
      </TabContext>
    </ThemeProvider>
  );
}

export default App;
