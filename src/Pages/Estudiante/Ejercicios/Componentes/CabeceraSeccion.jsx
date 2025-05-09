import { Avatar, Box, Typography } from "@mui/material"

function CabeceraSeccion({ currentCourse }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Avatar sx={{ bgcolor: currentCourse.color, mr: 2 }}>
        <Typography variant="h6">{currentCourse.icon}</Typography>
      </Avatar>
      <Typography variant="h5" component="h2">
        Curso: {currentCourse.name}
      </Typography>
    </Box>
  )
}

export default CabeceraSeccion
