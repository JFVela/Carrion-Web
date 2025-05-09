import { AppBar, Toolbar, Typography } from "@mui/material"
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function BarraNavegacion() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <AutoAwesomeIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Reforzando lo Aprendido
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default BarraNavegacion
