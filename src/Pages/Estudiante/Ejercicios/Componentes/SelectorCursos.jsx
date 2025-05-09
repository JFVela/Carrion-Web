import { Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material"

function SelectorCursos({ coursesData, selectedCourse, handleCourseChange, theme }) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Tabs
      value={selectedCourse}
      onChange={handleCourseChange}
      variant={isMobile ? "scrollable" : "fullWidth"}
      scrollButtons="auto"
      sx={{
        mb: 3,
        "& .MuiTab-root": {
          minHeight: "72px",
        },
      }}
    >
      {coursesData.map((course, index) => (
        <Tab
          key={course.id}
          label={
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="body1" sx={{ fontSize: "1.5rem", mb: 0.5 }}>
                {course.icon}
              </Typography>
              <Typography variant="body2">{course.name}</Typography>
            </Box>
          }
          sx={{
            "&.Mui-selected": {
              color: course.color,
            },
          }}
        />
      ))}
    </Tabs>
  )
}

export default SelectorCursos
