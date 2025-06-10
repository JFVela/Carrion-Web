import { useEffect, useRef } from "react"
import { Box } from "@mui/material"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function GraficoCalificaciones() {
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
      type: "doughnut",
      data: {
        labels: [
          "Excelente (90-100)",
          "Bueno (80-89)",
          "Satisfactorio (70-79)",
          "Regular (60-69)",
          "Insuficiente (<60)",
        ],
        datasets: [
          {
            data: [25, 35, 20, 15, 5],
            backgroundColor: ["#2e7d32", "#1565c0", "#ed6c02", "#d32f2f", "#37474f"],
            borderColor: "#ffffff",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 12,
              font: {
                size: 11,
              },
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
