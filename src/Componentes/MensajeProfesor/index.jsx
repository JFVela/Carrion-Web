import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
  } from "@mui/material";
  import { Bordes, Titulo, Titulo2 } from "../estilos";
import React from "react";
  
  const MensajeProfesor = ({ nombres, mensajes }) => {
    return (
        <Bordes>
          <Titulo>Actividades Recientes</Titulo>
          <Titulo2>Últimas actualizaciones en tus cursos</Titulo2>
          <List sx={{ width: "100%", bgcolor: "background.paper", maxHeight: 225, overflow: "auto" }}>
            {nombres.map((nombre, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={nombre} src={`/static/images/avatar/${(index % 3) + 1}.jpg`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={nombre}
                    secondary={
                      <Typography component="span" variant="body2" sx={{ color: "text.primary", display: "inline" }}>
                        {`${17 - index}:00`} {/* Solo para variar la hora */}
                        {" " + mensajes[index]}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < nombres.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Bordes>
    );
  };
  
  export default MensajeProfesor;
  