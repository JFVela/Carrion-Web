import { Button, Card, CardContent, Typography } from "@mui/material"
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material"

function TarjetaEjercicio({ titulo, descripcion, color }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {descripcion}
        </Typography>
        <Button size="small" endIcon={<ArrowForwardIcon />} sx={{ mt: 2, color: color }}>
          Comenzar
        </Button>
      </CardContent>
    </Card>
  )
}

export default TarjetaEjercicio
