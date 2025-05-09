import { Paper, Tab, Tabs, useMediaQuery } from "@mui/material"

function SelectorTemas({ currentCourse, selectedTopic, handleTopicChange, theme }) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Paper elevation={1} sx={{ mb: 3 }}>
      <Tabs
        value={selectedTopic}
        onChange={handleTopicChange}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons="auto"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          "& .Mui-selected": {
            color: `${currentCourse.color} !important`,
          },
          "& .MuiTabs-indicator": {
            backgroundColor: currentCourse.color,
          },
        }}
      >
        {currentCourse.topics.map((topic, index) => (
          <Tab key={topic.id} label={topic.name} />
        ))}
      </Tabs>
    </Paper>
  )
}

export default SelectorTemas
