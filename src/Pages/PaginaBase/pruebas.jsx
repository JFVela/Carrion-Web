// PaginaBase.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Container, Box, Tab, Typography, useTheme, useMediaQuery, Paper, AppBar } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { 
  Dashboard as DashboardIcon, 
  School as SchoolIcon, 
  EventNote as EventNoteIcon, 
  Lightbulb as LightbulbIcon, 
  Assignment as AssignmentIcon 
} from "@mui/icons-material";
import { useState, useEffect } from "react";

const tabs = [
  { label: "Resumen", value: "1", icon: <DashboardIcon />, path: "/" },
  { label: "Cursos", value: "2", icon: <SchoolIcon />, path: "/cursos" },
  { label: "Asistencias", value: "3", icon: <EventNoteIcon />, path: "/asistencias" },
  { label: "Trucos", value: "4", icon: <LightbulbIcon />, path: "/trucos" },
  { label: "Ejercicios", value: "5", icon: <AssignmentIcon />, path: "/ejercicios" }
];

function PaginaBase() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getTabValue = () => tabs.find(tab => tab.path === location.pathname)?.value || false;

  const handleChange = (event, newValue) => {
    const selectedTab = tabs.find(tab => tab.value === newValue);
    if (selectedTab) navigate(selectedTab.path);
  };

  const renderTabLabel = (tab) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
      {tab.icon}
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: getTabValue() === tab.value ? 700 : 500,
          fontSize: { xs: '0.75rem', sm: '0.875rem' }
        }}
      >
        {tab.label}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f5f7fa, #e4e8f0)',
      opacity: mounted ? 1 : 0,
      transition: 'opacity 0.5s ease-in-out'
    }}>
      <TabContext value={getTabValue()}>
        <AppBar 
          position="sticky" 
          color="default" 
          elevation={3}
          sx={{ 
            background: 'rgba(255, 255, 255, 0.9)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
          }}
        >
          <Box sx={{ 
            maxWidth: '1200px', 
            width: '100%', 
            margin: '0 auto',
            px: { xs: 1, sm: 2 }
          }}>
            <TabList 
              onChange={handleChange} 
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons={isMobile ? "auto" : false}
              allowScrollButtonsMobile
              centered={!isMobile}
              sx={{
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                  background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)',
                },
                '& .MuiTab-root': {
                  minHeight: 64,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  color: 'rgba(0, 0, 0, 0.6)',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    color: '#6366F1',
                    backgroundColor: 'rgba(99, 102, 241, 0.04)',
                  },
                  '&.Mui-selected': {
                    color: '#6366F1',
                    fontWeight: 700,
                  },
                  '& .MuiTab-iconWrapper': {
                    marginBottom: '4px',
                  }
                }
              }}
            >
              {tabs.map((tab) => (
                <Tab 
                  key={tab.value}
                  label={renderTabLabel(tab)} 
                  value={tab.value}
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': getTabValue() === tab.value ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '40%',
                      height: '3px',
                      borderRadius: '3px 3px 0 0',
                      backgroundColor: 'transparent',
                      boxShadow: '0 0 8px 2px rgba(99, 102, 241, 0.3)',
                    } : {}
                  }}
                />
              ))}
            </TabList>
          </Box>
        </AppBar>

        <Container 
          maxWidth="lg" 
          sx={{ 
            mt: 4, 
            mb: 4, 
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Paper 
            elevation={2} 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              borderRadius: 2,
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 6px 25px rgba(0, 0, 0, 0.08)',
              }
            }}
          >
            <Outlet />
          </Paper>
        </Container>
      </TabContext>
    </Box>
  );
}

export default PaginaBase;