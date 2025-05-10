import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Slider,
  Divider,
  IconButton,
  Fade,
  Grow,
  useTheme,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Check as CheckIcon,
  Timeline as TimelineIcon,
  AccessTime as AccessTimeIcon,
  RotateRight as RotateRightIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  SettingsBackupRestore as ResetIcon,
} from "@mui/icons-material";

// Componente para configurar ejercicios
const ConfiguracionEjercicios = ({
  numEjercicios,
  setNumEjercicios,
  generarEjercicios,
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      alignItems: "center",
      justifyContent: "space-between",
      mb: 4,
      gap: 2,
      p: 2,
      borderRadius: 2,
      backgroundColor: "rgba(99, 102, 241, 0.05)",
      border: "1px solid rgba(99, 102, 241, 0.1)",
    }}
  >
    <Box sx={{ width: "100%", maxWidth: { xs: "100%", sm: "60%" } }}>
      <Typography variant="body1" gutterBottom>
        Cantidad de ejercicios: {numEjercicios}
      </Typography>
      <Slider
        value={numEjercicios}
        onChange={(e, newValue) => setNumEjercicios(newValue)}
        min={1}
        max={20}
        marks={[
          { value: 1, label: "1" },
          { value: 5, label: "5" },
          { value: 10, label: "10" },
          { value: 20, label: "20" },
        ]}
        valueLabelDisplay="auto"
        sx={{
          color: "#6366F1",
          "& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible": {
            boxShadow: "0 0 0 8px rgba(99, 102, 241, 0.16)",
          },
        }}
      />
    </Box>
    <Button
      variant="contained"
      startIcon={<RefreshIcon />}
      onClick={generarEjercicios}
      sx={{
        background: "linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)",
        borderRadius: 2,
        px: 3,
        py: 1,
        fontWeight: 600,
        textTransform: "none",
        boxShadow: "0 4px 10px rgba(99, 102, 241, 0.3)",
        "&:hover": { boxShadow: "0 6px 15px rgba(99, 102, 241, 0.4)" },
      }}
    >
      Generar Ejercicios
    </Button>
  </Box>
);

// Componente para mostrar el resumen de puntuación
const PuntuacionResumen = ({ puntuacion }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      mb: 4,
      opacity: puntuacion.verificados > 0 ? 1 : 0,
      transition: "opacity 0.3s ease-in-out",
    }}
  >
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        backgroundColor: "rgba(99, 102, 241, 0.08)",
        border: "1px solid rgba(99, 102, 241, 0.2)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CheckIcon sx={{ color: "#10B981", mr: 0.5 }} />
        <Typography variant="body1">
          <strong>{puntuacion.correctos}</strong> correctos
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Typography variant="body1">
        <strong>{puntuacion.verificados}</strong> de{" "}
        <strong>{puntuacion.total}</strong> completados
      </Typography>
    </Paper>
  </Box>
);

// Componente para renderizar cada ejercicio
const EjercicioCard = ({
  ejercicio,
  respuesta,
  resultado,
  handleRespuestaChange,
  verificar,
  resetearEjercicio,
  animate,
}) => (
  <Grow
    in={animate}
    timeout={(ejercicio.id + 1) * 200}
    style={{ transformOrigin: "0 0 0" }}
  >
    <Card
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: "visible",
        position: "relative",
        transition: "all 0.3s ease-in-out",
        border: resultado?.verificado
          ? resultado.correcto
            ? "1px solid rgba(16, 185, 129, 0.5)"
            : "1px solid rgba(239, 68, 68, 0.5)"
          : "1px solid transparent",
        "&:hover": { boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -15,
          right: 20,
          backgroundColor: "white",
          borderRadius: "15px",
          px: 2,
          py: 0.5,
          display: "flex",
          alignItems: "center",
          gap: 1,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(99, 102, 241, 0.2)",
        }}
      >
        {ejercicio.iconoTipo}
        <Typography variant="caption" fontWeight={600} color="#6366F1">
          {ejercicio.tipoTexto}
        </Typography>
      </Box>

      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 600, color: "#4B5563" }}
        >
          Ejercicio {ejercicio.id + 1}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AccessTimeIcon sx={{ color: "#6366F1", mr: 1 }} />
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: ejercicio.enunciado }}
          />
        </Box>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {["g", "m", "s"].map((campo) => (
            <Grid item xs={12} sm={4} key={campo}>
              <TextField
                label={
                  campo === "g"
                    ? "Grados"
                    : campo === "m"
                    ? "Minutos"
                    : "Segundos"
                }
                type="number"
                value={respuesta[campo] || ""}
                onChange={(e) =>
                  handleRespuestaChange(
                    ejercicio.id,
                    campo,
                    e.target.value || 0
                  )
                }
                fullWidth
                InputProps={{
                  placeholder: "0",
                  endAdornment: (
                    <InputAdornment position="end">
                      {campo === "g" ? "°" : campo === "m" ? "'" : '"'}
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
              />
            </Grid>
          ))}
        </Grid>

        {resultado?.verificado && (
          <Fade in={true}>
            <Box
              sx={{
                mt: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: resultado.correcto
                  ? "rgba(16, 185, 129, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
                border: resultado.correcto
                  ? "1px solid rgba(16, 185, 129, 0.3)"
                  : "1px solid rgba(239, 68, 68, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {resultado.correcto ? (
                <>
                  <CheckIcon sx={{ color: "#10B981" }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "#10B981", fontWeight: 600 }}
                  >
                    ¡Correcto! {resultado.respuestaCorrecta.g}°{" "}
                    {resultado.respuestaCorrecta.m}'{" "}
                    {resultado.respuestaCorrecta.s}"
                  </Typography>
                </>
              ) : (
                <>
                  <RotateRightIcon sx={{ color: "#EF4444" }} />
                  <Typography variant="body2" sx={{ color: "#EF4444" }}>
                    Incorrecto. La respuesta correcta es{" "}
                    {resultado.respuestaCorrecta.g}°{" "}
                    {resultado.respuestaCorrecta.m}'{" "}
                    {resultado.respuestaCorrecta.s}"
                  </Typography>
                </>
              )}
            </Box>
          </Fade>
        )}
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CheckIcon />}
          onClick={() => verificar(ejercicio.id)}
          disabled={resultado?.verificado}
          sx={{
            background: resultado?.verificado
              ? "rgba(99, 102, 241, 0.5)"
              : "linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: resultado?.verificado
              ? "none"
              : "0 4px 10px rgba(99, 102, 241, 0.3)",
          }}
        >
          Verificar
        </Button>
        <IconButton
          size="small"
          onClick={() => resetearEjercicio(ejercicio.id)}
          sx={{ ml: 1 }}
        >
          <ResetIcon />
        </IconButton>
      </CardActions>
    </Card>
  </Grow>
);

// Componente principal
function ConversionSexagesimal() {
  const [numEjercicios, setNumEjercicios] = useState(5);
  const [ejercicios, setEjercicios] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [resultados, setResultados] = useState({});
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    generarEjercicios();
  }, []);

  const generarEjercicios = () => {
    setAnimateCards(false);
    setTimeout(() => {
      const nuevosEjercicios = [];
      const nuevasRespuestas = {};
      for (let i = 0; i < numEjercicios; i++) {
        const ejercicio = generarUno(i);
        nuevosEjercicios.push(ejercicio);
        nuevasRespuestas[i] = { g: 0, m: 0, s: 0 };
      }
      setEjercicios(nuevosEjercicios);
      setRespuestas(nuevasRespuestas);
      setResultados({});
      setAnimateCards(true);
    }, 300);
  };

  const generarUno = (id) => {
    const tipos = ["g-m", "m-s", "s-g"];
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const data = {
      "g-m": {
        enunciado: (g) => `Convertir ${g}° a minutos.`,
        resp: (g) => ({ g: 0, m: g * 60, s: 0 }),
        icono: <ArrowDownwardIcon />,
        texto: "Grados a Minutos",
      },
      "m-s": {
        enunciado: (m) => `Convertir ${m}' a segundos.`,
        resp: (m) => ({ g: 0, m: 0, s: m * 60 }),
        icono: <ArrowDownwardIcon />,
        texto: "Minutos a Segundos",
      },
      "s-g": {
        enunciado: (s0) => `Convertir ${s0}" a grados, minutos y segundos.`,
        resp: (s0) => {
          const g = Math.floor(s0 / 3600);
          const resto = s0 % 3600;
          const m = Math.floor(resto / 60);
          const s = resto % 60;
          return { g, m, s };
        },
        icono: <ArrowUpwardIcon />,
        texto: "Segundos a GMS",
      },
    };
    const valor = Math.floor(Math.random() * 90) + 1;
    return {
      id,
      enunciado: data[tipo].enunciado(valor),
      resp: data[tipo].resp(valor),
      tipo,
      tipoTexto: data[tipo].texto,
      iconoTipo: data[tipo].icono,
    };
  };

  const handleRespuestaChange = (id, campo, valor) => {
    setRespuestas((prev) => ({
      ...prev,
      [id]: { ...prev[id], [campo]: parseInt(valor) || 0 },
    }));
  };

  const verificar = (id) => {
    const ejercicio = ejercicios.find((e) => e.id === id);
    const respuesta = respuestas[id];
    const esCorrecta =
      respuesta.g === ejercicio.resp.g &&
      respuesta.m === ejercicio.resp.m &&
      respuesta.s === ejercicio.resp.s;
    setResultados((prev) => ({
      ...prev,
      [id]: {
        verificado: true,
        correcto: esCorrecta,
        respuestaCorrecta: ejercicio.resp,
      },
    }));
  };

  const resetearEjercicio = (id) => {
    setRespuestas((prev) => ({ ...prev, [id]: { g: 0, m: 0, s: 0 } }));
    setResultados((prev) => {
      const newResults = { ...prev };
      delete newResults[id];
      return newResults;
    });
  };

  const calcularPuntuacion = () => {
    const ejerciciosVerificados = Object.values(resultados).filter(
      (r) => r.verificado
    );
    const ejerciciosCorrectos = ejerciciosVerificados.filter((r) => r.correcto);
    return {
      total: ejercicios.length,
      verificados: ejerciciosVerificados.length,
      correctos: ejerciciosCorrectos.length,
    };
  };

  const puntuacion = calcularPuntuacion();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f5f7fa, #e4e8f0)",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TimelineIcon
              sx={{
                fontSize: 40,
                mr: { xs: 0, sm: 2 },
                mb: { xs: 1, sm: 0 },
                color: "#6366F1",
              }}
            />
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Práctica de Conversión Sexagesimal
            </Typography>
          </Box>

          <ConfiguracionEjercicios
            numEjercicios={numEjercicios}
            setNumEjercicios={setNumEjercicios}
            generarEjercicios={generarEjercicios}
          />

          <PuntuacionResumen puntuacion={puntuacion} />

          <Grid container spacing={3}>
            {ejercicios.map((ejercicio) => (
              <Grid item xs={12} key={ejercicio.id}>
                <EjercicioCard
                  ejercicio={ejercicio}
                  respuesta={respuestas[ejercicio.id]}
                  resultado={resultados[ejercicio.id]}
                  handleRespuestaChange={handleRespuestaChange}
                  verificar={verificar}
                  resetearEjercicio={resetearEjercicio}
                  animate={animateCards}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default ConversionSexagesimal;
