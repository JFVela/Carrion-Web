import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Paper,
  Divider,
  Chip,
  Fade,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import {
  CalculateOutlined,
  RefreshOutlined,
  EmojiEvents,
} from "@mui/icons-material";
import Swal from "sweetalert2";

// Importar tabs
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Tema personalizado
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6200ea" },
    secondary: { main: "#00e676" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    h1: { fontWeight: 700, fontSize: "2.5rem" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: "none", fontWeight: 600 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" },
      },
    },
  },
});

// Constantes reutilizables
const POINTS = ["A", "B", "C", "D", "E", "F"];
const DEFAULT_NUM_POINTS = 3;

// Componente para representar un segmento visual
const SegmentVisual = ({ segments, letters, total }) => (
  <Fade in timeout={800}>
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" color="primary" gutterBottom>
        Representación Visual
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 2,
          overflowX: "auto",
        }}
      >
        {segments.map((segment, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
            <Chip
              label={letters[index]}
              color="primary"
              sx={{
                height: 40,
                width: 40,
                borderRadius: "50%",
                fontWeight: "bold",
              }}
            />
            <Box
              sx={{
                height: 8,
                bgcolor:
                  typeof segment === "string"
                    ? "secondary.main"
                    : "primary.main",
                width: typeof segment === "string" ? 120 : Number(segment) * 10,
                minWidth: 40,
                position: "relative",
                "&::after": {
                  content: `"${segment}"`,
                  position: "absolute",
                  top: -25,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontWeight: "bold",
                  color:
                    typeof segment === "string"
                      ? "secondary.main"
                      : "primary.main",
                },
              }}
            />
            {index === segments.length - 1 && (
              <Chip
                label={letters[index + 1]}
                color="primary"
                sx={{
                  height: 40,
                  width: 40,
                  borderRadius: "50%",
                  fontWeight: "bold",
                }}
              />
            )}
          </Box>
        ))}
      </Box>
      <Typography variant="body1" sx={{ mt: 1, fontWeight: "medium" }}>
        Longitud total del segmento {letters.join("")}: {total} unidades
      </Typography>
    </Box>
  </Fade>
);

// TabPanel
function TabPanel({ children, value, index }) {
  return value === index && <Box sx={{ p: 3 }}>{children}</Box>;
}

function GeometricSegmentsExercise() {
  const [value, setValue] = useState(0);
  const [numPoints, setNumPoints] = useState(DEFAULT_NUM_POINTS);
  const [exercise, setExercise] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Generar un nuevo ejercicio
  const generateExercise = () => {
    const letters = POINTS.slice(0, numPoints);
    const segments = [];
    const posX = Math.floor(Math.random() * (numPoints - 1));
    const coefX = Math.floor(Math.random() * 5) + 2;
    let total = 0;

    for (let i = 0; i < numPoints - 1; i++) {
      if (i === posX) {
        segments.push(`${coefX}x`);
        total += coefX;
      } else {
        const value = Math.floor(Math.random() * 10) + 2;
        segments.push(value);
        total += value;
      }
    }

    const correctX = Math.floor(Math.random() * 6) + 2;
    const adjustedTotal = total - coefX + coefX * correctX;

    setExercise({ segments, letters, total: adjustedTotal, correctX });
    setUserAnswer("");
  };

  // Verificar la respuesta del usuario
  const checkAnswer = () => {
    if (!exercise) return;

    const userValue = Number(userAnswer);
    const isCorrect = userValue === exercise.correctX;

    setAttempts((prev) => prev + 1);

    Swal.fire({
      title: isCorrect ? "¡Correcto!" : "Incorrecto",
      text: isCorrect
        ? `X = ${exercise.correctX} es la respuesta correcta.`
        : `La respuesta correcta era X = ${exercise.correctX}`,
      icon: isCorrect ? "success" : "error",
      confirmButtonText: "Siguiente ejercicio",
      confirmButtonColor: theme.palette.primary.main,
    }).then(() => {
      if (isCorrect) setScore((prev) => prev + 1);
      generateExercise();
    });
  };

  useEffect(() => {
    generateExercise();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography
          variant="h1"
          align="center"
          gutterBottom
          className="gradient-text"
        >
          Ejercicios de Segmentos Geométricos
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="points-label">Número de puntos</InputLabel>
              <Select
                labelId="points-label"
                value={numPoints}
                label="Número de puntos"
                onChange={(e) => setNumPoints(Number(e.target.value))}
              >
                {[3, 4, 5, 6].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value} puntos ({POINTS.slice(0, value).join("")})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              startIcon={<RefreshOutlined />}
              onClick={generateExercise}
              size="large"
            >
              Nuevo Ejercicio
            </Button>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EmojiEvents color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                {score}/{attempts}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {exercise && (
            <Fade in timeout={500}>
              <Box>
                <Typography variant="h5" color="primary" gutterBottom>
                  Problema:
                </Typography>
                <Typography variant="body1" paragraph>
                  El segmento {exercise.letters.join("")} está formado por:
                </Typography>
                <Box sx={{ pl: 2, mb: 2 }}>
                  {exercise.segments.map((segment, index) => (
                    <Typography
                      key={index}
                      variant="body1"
                      sx={{
                        mb: 1,
                        fontWeight:
                          typeof segment === "string" ? "bold" : "normal",
                        color:
                          typeof segment === "string"
                            ? "secondary.main"
                            : "inherit",
                      }}
                    >
                      {exercise.letters[index]}
                      {exercise.letters[index + 1]} = {segment}
                    </Typography>
                  ))}
                </Box>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ fontWeight: "medium" }}
                >
                  Si se sabe que el total del segmento{" "}
                  {exercise.letters.join("")} es {exercise.total}, ¿cuánto vale
                  X?
                </Typography>
                <SegmentVisual
                  segments={exercise.segments}
                  letters={exercise.letters}
                  total={exercise.total}
                />
                <Box
                  sx={{
                    mt: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    label="Valor de X"
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    variant="outlined"
                    sx={{ mr: 2, width: "150px" }}
                    onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<CalculateOutlined />}
                    onClick={checkAnswer}
                    size="large"
                    disabled={!userAnswer}
                  >
                    Verificar
                  </Button>
                </Box>
              </Box>
            </Fade>
          )}
        </Paper>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Aprende geometría de forma divertida e interactiva
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default GeometricSegmentsExercise;
