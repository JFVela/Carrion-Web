import { useEffect, useRef } from "react"
import { Box } from "@mui/material"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function GraficoAsistencia() {
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
      type: "line",
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
        datasets: [
          {
            label: "Porcentaje de Asistencia",
            data: [91, 89, 93, 94, 92, 95],
            fill: true,
            backgroundColor: "rgba(21, 101, 192, 0.1)",
            borderColor: "rgba(21, 101, 192, 1)",
            tension: 0.3,
            pointBackgroundColor: "rgba(21, 101, 192, 1)",
            pointBorderColor: "#ffffff",
            pointRadius: 5,
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 80,
            max: 100,
            ticks: {
              stepSize: 5,
              color: "#757575",
            },
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
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
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => `Asistencia: ${context.parsed.y}%`,
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
