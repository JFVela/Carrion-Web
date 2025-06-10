import { styled } from "@mui/material/styles"
import { Paper, Box, Typography } from "@mui/material"

const TarjetaEstilizada = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  display: "flex",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  flex: "1 1 220px",
  minWidth: "220px",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
  },
}))

const ContenedorIcono = styled(Box)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor,
  borderRadius: theme.shape.borderRadius,
  width: 56,
  height: 56,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(2),
  color: "#fff",
  opacity: 0.9,
}))

export default function TarjetaEstadistica({ titulo, valor, icono, color }) {
  return (
    <TarjetaEstilizada>
      <ContenedorIcono bgcolor={color}>{icono}</ContenedorIcono>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          {titulo}
        </Typography>
        <Typography variant="h4" fontWeight="700" color="text.primary">
          {valor}
        </Typography>
      </Box>
    </TarjetaEstilizada>
  )
}
