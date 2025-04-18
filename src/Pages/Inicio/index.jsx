import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "bootstrap/dist/css/bootstrap.min.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookIcon from "@mui/icons-material/Book";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { BarChart } from "@mui/x-charts/BarChart";

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
  return (
    <>
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
        <Bordes>
          <Titulo>Promedio Academico</Titulo>
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
        <Bordes>
          <Titulo>Actividades Recientes</Titulo>
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
    </>
  );
}

export default App;
