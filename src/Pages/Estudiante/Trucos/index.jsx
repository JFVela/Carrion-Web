import { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  InputAdornment,
  ThemeProvider,
  createTheme,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  useMediaQuery,
} from "@mui/material";
import {
  Search as SearchIcon,
  PlayArrow as PlayArrowIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const COURSE_COLORS = ["#7c4dff", "#9c27b0", "#673ab7"];

const theme = createTheme({
  palette: {
    primary: {
      main: "#7c4dff",
      light: "#b47cff",
      dark: "#3f1dcb",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9c27b0",
      light: "#d05ce3",
      dark: "#6a0080",
      contrastText: "#ffffff",
    },
    background: { default: "#f5f5f5", paper: "#ffffff" },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 20px rgba(124,77,255,0.15)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: "none", fontWeight: 500 },
      },
    },
  },
});

const MOCK_DATA = [
  {
    id: 1,
    curso: "Geometría",
    seccion: "Segmentos",
    titulo: "Operemos juntos",
    videoId: "iVrhFVtG9IE",
  },
  {
    id: 2,
    curso: "Álgebra",
    seccion: "Ecuaciones",
    titulo: "Ecuaciones de primer grado",
    videoId: "j6nXscNccr4",
  },
  {
    id: 3,
    curso: "Trigonometría",
    seccion: "Funciones",
    titulo: "Funciones trigonométricas",
    videoId: "I_izvAbhExY",
  },
  {
    id: 4,
    curso: "Geometría",
    seccion: "Segmentos",
    titulo: "Operemos juntos",
    videoId: "oRdxUFDoQe0",
  },
  {
    id: 5,
    curso: "Álgebra",
    seccion: "Ecuaciones",
    titulo: "Ecuaciones de primer grado",
    videoId: "5mfDzBeeBSI",
  },
  {
    id: 6,
    curso: "Trigonometría",
    seccion: "Funciones",
    titulo: "Funciones trigonométricas",
    videoId: "55dzY6Xc4OQ",
  },
  {
    id: 7,
    curso: "Geometría",
    seccion: "Segmentos",
    titulo: "Operemos juntos",
    videoId: "2KuWjZD6PBA",
  },
  {
    id: 8,
    curso: "Álgebra",
    seccion: "Ecuaciones",
    titulo: "Ecuaciones de primer grado",
    videoId: "yM6-QVxIXTs",
  },
  {
    id: 9,
    curso: "Trigonometría",
    seccion: "Funciones",
    titulo: "Funciones trigonométricas",
    videoId: "NvIfbZhvZm4",
  },
];

const getCourseColor = (courseName) => {
  const courseIndex = MOCK_DATA.findIndex((item) => item.curso === courseName);
  return COURSE_COLORS[courseIndex % COURSE_COLORS.length];
};

const VideoCard = ({ item, onVideoClick }) => {
  const courseColor = getCourseColor(item.curso);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          height: "100%",
          width: "100%",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: (theme) => `0 12px 20px ${theme.palette.primary.main}33`,
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "6px",
            background: courseColor,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          },
        }}
      >
        <CardContent sx={{ pt: 3, pb: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ color: courseColor, fontWeight: 600 }}
            >
              {item.curso}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                bgcolor: `${courseColor}15`,
                color: courseColor,
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                fontWeight: 500,
                fontSize: "0.75rem",
              }}
            >
              {item.seccion}
            </Typography>
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              lineHeight: 1.3,
              fontWeight: 600,
              mb: 2,
              height: "2.6em",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.titulo}
          </Typography>
        </CardContent>

        <CardMedia
          component="img"
          image={`https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`}
          alt={`Miniatura de ${item.titulo}`}
          sx={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
        />

        <CardActions sx={{ p: 2 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<PlayArrowIcon />}
            onClick={() => onVideoClick(item.videoId, item.titulo)}
            sx={{
              py: 1,
              background: `linear-gradient(45deg, ${courseColor} 0%, ${courseColor}CC 100%)`,
              boxShadow: `0 4px 8px ${courseColor}33`,
              "&:hover": {
                boxShadow: `0 6px 12px ${courseColor}66`,
              },
            }}
          >
            Ver video
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default function DataCardGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(MOCK_DATA);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const lowercasedSearch = searchTerm.toLowerCase();
      setFilteredData(
        searchTerm
          ? MOCK_DATA.filter(
              (item) =>
                item.curso.toLowerCase().includes(lowercasedSearch) ||
                item.seccion.toLowerCase().includes(lowercasedSearch) ||
                item.titulo.toLowerCase().includes(lowercasedSearch)
            )
          : MOCK_DATA
      );
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleVideoClick = (videoId, title) => {
    setSelectedVideo(videoId);
    setSelectedTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          mx: "auto",
          p: { xs: 2, sm: 3, md: 4 },
          background:
            "linear-gradient(135deg, rgba(124,77,255,0.05) 0%, rgba(156,39,176,0.05) 100%)",
          minHeight: "100vh",
          borderRadius: { xs: 0, sm: 2 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              color: "primary.dark",
              textAlign: "center",
              position: "relative",
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -8,
                left: "50%",
                transform: "translateX(-50%)",
                width: { xs: "60px", sm: "80px" },
                height: "4px",
                background: "linear-gradient(90deg, #7c4dff, #9c27b0)",
                borderRadius: "2px",
              },
            }}
          >
            Biblioteca de Videos Educativos
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar por curso, sección o título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                bgcolor: "white",
                "&:hover": { boxShadow: "0 0 0 2px rgba(124,77,255,0.2)" },
                "&.Mui-focused": {
                  boxShadow: "0 0 0 2px rgba(124,77,255,0.3)",
                },
              },
            }}
            sx={{ mb: 3 }}
          />
        </Box>

        {filteredData.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {filteredData.map((item) => (
              <VideoCard
                key={item.id}
                item={item}
                onVideoClick={handleVideoClick}
              />
            ))}
          </Grid>
        ) : (
          <Paper
            elevation={2}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              background: "rgba(255,255,255,0.8)",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No se encontraron resultados para "{searchTerm}"
            </Typography>
          </Paper>
        )}

        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          maxWidth="md"
          fullWidth
          fullScreen={isMobile}
          PaperProps={{
            sx: {
              borderRadius: isMobile ? 0 : 3,
              overflow: "hidden",
              boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
              margin: isMobile ? 0 : 2,
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "primary.main",
              color: "white",
              py: 2,
              px: { xs: 2, sm: 3 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.95rem", sm: "1.25rem" },
                maxWidth: { xs: "80%", sm: "90%" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {selectedTitle}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={closeModal}
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0, bgcolor: "#000" }}>
            {selectedVideo && (
              <Box
                sx={{
                  position: "relative",
                  paddingTop: "56.25%",
                  width: "100%",
                  bgcolor: "#000",
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo}?rel=0&modestbranding=1`}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
