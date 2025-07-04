import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

export function generatePDF(grades, section) {
  const doc = new jsPDF()

  // Título del documento
  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.text("Reporte de Calificaciones", 105, 20, { align: "center" })

  doc.setFontSize(14)
  doc.setFont("helvetica", "normal")
  doc.text(`Sección: ${section}`, 105, 30, { align: "center" })

  // Fecha y hora
  const now = new Date()
  const dateStr = now.toLocaleDateString("es-ES")
  const timeStr = now.toLocaleTimeString("es-ES")
  doc.setFontSize(10)
  doc.text(`Generado el: ${dateStr} a las ${timeStr}`, 105, 40, { align: "center" })

  let yPosition = 50

  // Agrupar calificaciones por tipo
  const gradeTypes = {
    cuaderno: "Nota de Cuaderno",
    tareas: "Nota de Tareas",
    libro: "Nota de Libro",
    participacion: "Nota de Participación",
    comportamiento: "Nota de Comportamiento",
  }

  Object.entries(gradeTypes).forEach(([type, label]) => {
    const typeGrades = grades.filter((grade) => grade.type === type)

    if (typeGrades.length > 0) {
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text(label, 20, yPosition)
      yPosition += 10

      const tableData = typeGrades
        .sort((a, b) => a.studentName.localeCompare(b.studentName)) // Orden alfabético por nombre
        .map((grade) => [grade.studentName, grade.grade.toString()])

      autoTable(doc, {
        startY: yPosition,
        head: [["Estudiante", "Calificación"]],
        body: tableData,
        theme: "grid",
        headStyles: {
          fillColor: [66, 139, 202],
          textColor: 255,
          fontStyle: "bold",
        },
        bodyStyles: {
          fontSize: 10,
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        margin: { left: 20, right: 20 },
      })

      yPosition = doc.lastAutoTable.finalY + 15

      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }
    }
  })

  // Resumen estadístico
  if (yPosition > 200) {
    doc.addPage()
    yPosition = 20
  }

  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Resumen Estadístico", 20, yPosition)
  yPosition += 15

  const summary = Object.entries(gradeTypes).map(([type, label]) => {
    const typeGrades = grades.filter((grade) => grade.type === type)
    const count = typeGrades.length
    const average = count > 0
      ? (typeGrades.reduce((sum, grade) => sum + grade.grade, 0) / count).toFixed(2)
      : "N/A"
    return [label, count.toString(), average]
  })

  autoTable(doc, {
    startY: yPosition,
    head: [["Tipo de Calificación", "Cantidad", "Promedio"]],
    body: summary,
    theme: "grid",
    headStyles: {
      fillColor: [76, 175, 80],
      textColor: 255,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 10,
    },
    margin: { left: 20, right: 20 },
  })

  // Generar nombre del archivo con fecha y hora
  const timestamp = now.toISOString().replace(/[:.]/g, "-").slice(0, 19)
  const filename = `calificaciones_${section.replace(/\s+/g, "_")}_${timestamp}.pdf`

  // Descargar el PDF
  doc.save(filename)
}
