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
  CssBaseline
} from "@mui/material";
import { CalculateOutlined, RefreshOutlined, EmojiEvents } from "@mui/icons-material";
import Swal from "sweetalert2";

// Estilos CSS directamente en el componente
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', 'Roboto', 'Arial', sans-serif;
    background: linear-gradient(to bottom right, #f5f5f5, #e0e0e0);
    min-height: 100vh;
  }
  
  .segment-line {
    position: relative;
  }
  
  .segment-line::after {
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
  }
  
  .gradient-text {
    background: linear-gradient(45deg, #6200ea 30%, #00e676 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

// Tema personalizado con colores vibrantes para jóvenes
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6200ea",
    },
    secondary: {
      main: "#00e676",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        },
      },
    },
  },
});

function GeometricSegmentsExercise() {
  const [numPoints, setNumPoints] = useState(3);
  const [exercise, setExercise] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showVisual, setShowVisual] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generar un nuevo ejercicio
  const generateExercise = () => {
    const points = ["A", "B", "C", "D", "E", "F"];
    const letters = points.slice(0, numPoints);
    const segments = [];

    // Elegimos aleatoriamente en qué segmento irá la incógnita
    const posX = Math.floor(Math.random() * (numPoints - 1));
    const coefX = Math.floor(Math.random() * 5) + 2; // 2x a 6x
    let total = 0;

    for (let i = 0; i < numPoints - 1; i++) {
      if (i === posX) {
        segments.push(`${coefX}x`);
        total += coefX * 1; // Por ahora X = 1, ajustamos luego
      } else {
        const valor = Math.floor(Math.random() * 10) + 2;
        segments.push(valor);
        total += valor;
      }
    }

    // Para que X no sea siempre 1, redefinimos un valor realista
    const nuevoX = Math.floor(Math.random() * 6) + 2;
    const nuevoTotal = total - coefX + coefX * nuevoX;

    setExercise({
      segments,
      letters,
      total: nuevoTotal,
      correctX: nuevoX,
    });

    setShowInput(true);
    setUserAnswer("");

    // Manejar la visualización de manera segura
    setShowVisual(false);
    setTimeout(() => setShowVisual(true), 300);
  };

  // Verificar la respuesta del usuario
  const checkAnswer = () => {
    if (!exercise) return;

    const userValue = Number.parseFloat(userAnswer);
    const isCorrect = userValue === exercise.correctX;

    setAttempts(attempts + 1);

    if (isCorrect) {
      setScore(score + 1);
      Swal.fire({
        title: "¡Correcto!",
        text: `X = ${exercise.correctX} es la respuesta correcta.`,
        icon: "success",
        confirmButtonText: "Siguiente ejercicio",
        confirmButtonColor: theme.palette.primary.main,
      }).then((result) => {
        if (result.isConfirmed) {
          generateExercise();
        }
      });
    } else {
      Swal.fire({
        title: "Incorrecto",
        text: `La respuesta correcta era X = ${exercise.correctX}`,
        icon: "error",
        confirmButtonText: "Intentar otro",
        confirmButtonColor: theme.palette.primary.main,
      }).then((result) => {
        if (result.isConfirmed) {
          generateExercise();
        }
      });
    }
  };

  // Renderizar la representación visual de los segmentos
  const renderVisualSegments = () => {
    if (!exercise || !showVisual) return null;

    return (
      <Fade in={showVisual} timeout={800}>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
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
              width: "100%",
              overflowX: "auto",
              py: 2,
            }}
          >
            {exercise.segments.map((segment, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                <Chip
                  label={exercise.letters[index]}
                  color="primary"
                  sx={{
                    height: 40,
                    width: 40,
                    borderRadius: "50%",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                />
                <Box
                  className="segment-line"
                  sx={{
                    height: 8,
                    bgcolor: typeof segment === "string" ? "secondary.main" : "primary.main",
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
                      color: typeof segment === "string" ? "secondary.main" : "primary.main",
                    },
                  }}
                />
                {index === exercise.segments.length - 1 && (
                  <Chip
                    label={exercise.letters[index + 1]}
                    color="primary"
                    sx={{
                      height: 40,
                      width: 40,
                      borderRadius: "50%",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
          <Typography variant="body1" sx={{ mt: 1, fontWeight: "medium" }}>
            Longitud total del segmento {exercise.letters.join("")}: {exercise.total} unidades
          </Typography>
        </Box>
      </Fade>
    );
  };

  // Asegurar que el componente esté montado antes de mostrar animaciones
  useEffect(() => {
    setIsLoaded(true);

    // Generar el primer ejercicio después de que el componente esté montado
    if (isLoaded) {
      generateExercise();
    }

    // Cleanup function
    return () => {
      setIsLoaded(false);
    };
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
          <Typography variant="h4">Cargando ejercicios...</Typography>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style>{styles}</style>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h1" align="center" gutterBottom className="gradient-text">
          Ejercicios de Segmentos Geométricos
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="points-label">Número de puntos</InputLabel>
              <Select
                labelId="points-label"
                value={numPoints}
                label="Número de puntos"
                onChange={(e) => setNumPoints(Number(e.target.value))}
              >
                <MenuItem value={3}>3 puntos (ABC)</MenuItem>
                <MenuItem value={4}>4 puntos (ABCD)</MenuItem>
                <MenuItem value={5}>5 puntos (ABCDE)</MenuItem>
                <MenuItem value={6}>6 puntos (ABCDEF)</MenuItem>
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
            <Fade in={!!exercise} timeout={500}>
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
                        fontWeight: typeof segment === "string" ? "bold" : "normal",
                        color: typeof segment === "string" ? "secondary.main" : "inherit",
                      }}
                    >
                      {exercise.letters[index]}
                      {exercise.letters[index + 1]} = {segment}
                    </Typography>
                  ))}
                </Box>

                <Typography variant="body1" paragraph sx={{ fontWeight: "medium" }}>
                  Si se sabe que el total del segmento {exercise.letters.join("")} es {exercise.total}, ¿cuánto vale X?
                </Typography>

                {renderVisualSegments()}

                {showInput && (
                  <Box sx={{ mt: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <TextField
                      label="Valor de X"
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      variant="outlined"
                      sx={{ mr: 2, width: "150px" }}
                      autoFocus
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          checkAnswer();
                        }
                      }}
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
                )}
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

// Para usar este componente, simplemente renderízalo en tu aplicación React
// ReactDOM.render(<GeometricSegmentsExercise />, document.getElementById('root'));

export default GeometricSegmentsExercise;