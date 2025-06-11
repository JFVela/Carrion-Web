import { useEffect, useRef } from "react"
import { Box } from "@mui/material"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function GraficoMatricula() {
  const referenciaGrafico = useRef(null)
  const instanciaGrafico = useRef(null)

  useEffect(() => {
    if (!referenciaGrafico.current) return

    if (instanciaGrafico.current) {
      instanciaGrafico.current.destroy()
    }

    const contexto = referenciaGrafico.current.getContext("2d")
    if (!contexto) return

    instanciaGrafico.current = new Chart(contexto, {
      type: "bar",
      data: {
        labels: ["Primer Grado", "Segundo Grado", "Tercer Grado", "Cuarto Grado", "Quinto Grado", "Sexto Grado"],
        datasets: [
          {
            label: "Número de Estudiantes",
            data: [210, 195, 225, 190, 220, 210],
            backgroundColor: "rgba(21, 101, 192, 0.8)",
            borderColor: "rgba(21, 101, 192, 1)",
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              color: "#757575",
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#757575",
            },
          },
        },
      },
    })

    return () => {
      if (instanciaGrafico.current) {
        instanciaGrafico.current.destroy()
      }
    }
  }, [])

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <canvas ref={referenciaGrafico} />
    </Box>
  )
}
