import { Box, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material"
import { Assignment as AssignmentIcon } from "@mui/icons-material"
import TarjetaEjercicio from "./TarjetaEjercicio"

function ContenidoTema({ currentCourse, currentTopic }) {
  return (
    <Card elevation={2}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AssignmentIcon sx={{ mr: 1, color: currentCourse.color }} />
            <Typography variant="h6">Ejercicios de {currentTopic.name}</Typography>
          </Box>
        }
        sx={{
          bgcolor: "rgba(0,0,0,0.03)",
          borderBottom: `3px solid ${currentCourse.color}`,
        }}
      />
      <CardContent>
        <Typography variant="body1" paragraph>
          {currentTopic.exercises}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TarjetaEjercicio
              titulo="Ejercicio 1"
              descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt."
              color={currentCourse.color}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TarjetaEjercicio
              titulo="Ejercicio 2"
              descripcion="Praesent eget risus vitae massa semper aliquam quis mattis quam. Morbi vitae tortor tempus."
              color={currentCourse.color}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TarjetaEjercicio
              titulo="Ejercicio 3"
              descripcion="Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae."
              color={currentCourse.color}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ContenidoTema
