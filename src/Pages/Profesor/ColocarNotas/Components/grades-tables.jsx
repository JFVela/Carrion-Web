"use client"

export function GradesTables({ grades }) {
  const gradeTypes = [
    { key: "cuaderno", label: "📓 Cuaderno", icon: "📓", tooltip: "Nota de Cuaderno" },
    { key: "tareas", label: "📋 Tareas", icon: "📋", tooltip: "Nota de Tareas" },
    { key: "libro", label: "📚 Libro", icon: "📚", tooltip: "Nota de Libro" },
    { key: "participacion", label: "🙋‍♂️ Participación", icon: "🙋‍♂️", tooltip: "Nota de Participación" },
    { key: "comportamiento", label: "⭐ Comportamiento", icon: "⭐", tooltip: "Nota de Comportamiento" },
  ]

  const getGradesByType = (type) => {
    return grades.filter((grade) => grade.type === type)
  }

  const getGradeColor = (grade) => {
    if (grade >= 18) return { backgroundColor: "#e8f5e8", color: "#2e7d32" }
    if (grade >= 14) return { backgroundColor: "#e3f2fd", color: "#1565c0" }
    if (grade >= 11) return { backgroundColor: "#fff3e0", color: "#ef6c00" }
    return { backgroundColor: "#ffebee", color: "#c62828" }
  }

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "24px",
  }

  const headerStyle = {
    padding: "24px",
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
  }

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    margin: 0,
  }

  const badgeStyle = {
    backgroundColor: "#f5f5f5",
    color: "#666",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500",
  }

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  }

  const thStyle = {
    backgroundColor: "#f5f5f5",
    padding: "16px",
    textAlign: "left",
    fontWeight: "600",
    borderBottom: "2px solid #e0e0e0",
    color: "#333",
  }

  const tdStyle = {
    padding: "16px",
    borderBottom: "1px solid #e0e0e0",
  }

  const gradeStyle = {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
    display: "inline-block",
    minWidth: "40px",
    textAlign: "center",
  }

  if (grades.length === 0) {
    return (
      <div style={cardStyle}>
        <div style={{ padding: "48px", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📊</div>
          <h3 style={{ color: "#666", margin: "0 0 8px 0" }}>No hay calificaciones registradas</h3>
          <p style={{ color: "#999", margin: 0 }}>Las calificaciones aparecerán aquí una vez que las registres</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {gradeTypes.map((gradeType) => {
        const typeGrades = getGradesByType(gradeType.key)

        if (typeGrades.length === 0) return null

        return (
          <div key={gradeType.key} style={cardStyle}>
            <div style={headerStyle}>
              <h3 style={titleStyle}>
                {gradeType.icon} {gradeType.label.split(" ").slice(1).join(" ")}
              </h3>
              <span style={badgeStyle}>
                {typeGrades.length} estudiante{typeGrades.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div style={{ padding: "24px" }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Estudiante</th>
                    <th style={{ ...thStyle, textAlign: "center" }}>Calificación</th>
                  </tr>
                </thead>
                <tbody>
                  {typeGrades.map((grade, index) => (
                    <tr key={`${grade.studentId}-${index}`}>
                      <td style={{ ...tdStyle, fontWeight: "500" }}>{grade.studentName}</td>
                      <td style={{ ...tdStyle, textAlign: "center" }}>
                        <span style={{ ...gradeStyle, ...getGradeColor(grade.grade) }}>{grade.grade}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}
