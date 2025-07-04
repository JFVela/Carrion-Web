import { useState, useEffect } from "react"

export function GradeModal({ open, onOpenChange, student, gradeType, gradeTypes, onSubmit, showNotification }) {
  const [grade, setGrade] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (open) {
      setGrade("")
      setError("")
    }
  }, [open])

  const gradeTypeLabel = gradeTypes.find((gt) => gt.key === gradeType)?.label || ""

  const handleSubmit = (e) => {
    e.preventDefault()

    const numericGrade = Number.parseFloat(grade)

    if (isNaN(numericGrade)) {
      setError("Por favor ingrese un número válido")
      return
    }

    if (numericGrade < 6) {
      setError("La nota debe ser mayor a 5")
      showNotification("La nota debe ser mayor a 5", "error")
      return
    }

    if (numericGrade > 20) {
      setError("La nota debe ser menor a 21")
      showNotification("La nota debe ser menor a 21", "error")
      return
    }

    setError("")
    onSubmit(numericGrade)
  }

  if (!open || !student || !gradeType) return null

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  }

  const modalStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    width: "100%",
    maxWidth: "500px",
    maxHeight: "90vh",
    overflow: "auto",
  }

  const headerStyle = {
    padding: "24px 24px 0 24px",
    borderBottom: "1px solid #e0e0e0",
    marginBottom: "24px",
  }

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    margin: "0 0 16px 0",
  }

  const contentStyle = {
    padding: "0 24px 24px 24px",
  }

  const infoBoxStyle = {
    backgroundColor: "#e3f2fd",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "16px",
  }

  const gradeBoxStyle = {
    backgroundColor: "#e8f5e8",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "24px",
  }

  const labelStyle = {
    fontSize: "12px",
    color: "#666",
    marginBottom: "4px",
    display: "block",
  }

  const valueStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    margin: 0,
  }

  const gradeValueStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2e7d32",
    margin: 0,
  }

  const inputLabelStyle = {
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "8px",
    display: "block",
  }

  const inputStyle = {
    width: "100%",
    padding: "16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "18px",
    outline: "none",
    transition: "border-color 0.3s",
    boxSizing: "border-box",
  }

  const errorStyle = {
    backgroundColor: "#ffebee",
    color: "#c62828",
    padding: "12px 16px",
    borderRadius: "8px",
    marginTop: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
  }

  const buttonContainerStyle = {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
  }

  const cancelButtonStyle = {
    flex: 1,
    padding: "16px",
    backgroundColor: "transparent",
    color: "#666",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s",
  }

  const submitButtonStyle = {
    flex: 1,
    padding: "16px",
    backgroundColor: "#2196f3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  }

  return (
    <div style={overlayStyle} onClick={() => onOpenChange(false)}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Ingresar Calificación</h2>
        </div>

        <div style={contentStyle}>
          <div style={infoBoxStyle}>
            <span style={labelStyle}>Estudiante:</span>
            <p style={valueStyle}>
              {student.nombre} {student.apellido}
            </p>
            <span style={labelStyle}>ID: {student.id}</span>
          </div>

          <div style={gradeBoxStyle}>
            <span style={labelStyle}>Tipo de calificación:</span>
            <p style={gradeValueStyle}>
              {gradeTypeLabel}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <label style={inputLabelStyle} htmlFor="grade">
                Ingrese la nota (6-20):
              </label>
              <input
                id="grade"
                type="number"
                min="6"
                max="20"
                step="0.1"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="Ej: 15.5"
                style={inputStyle}
                autoFocus
                onFocus={(e) => {
                  e.target.style.borderColor = "#2196f3"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e0e0e0"
                }}
              />
            </div>

            {error && <div style={errorStyle}>⚠️ {error}</div>}

            <div style={buttonContainerStyle}>
              <button
                type="button"
                style={cancelButtonStyle}
                onClick={() => onOpenChange(false)}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#f5f5f5"
                  e.target.style.borderColor = "#ccc"
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent"
                  e.target.style.borderColor = "#e0e0e0"
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                style={submitButtonStyle}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#1976d2"
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#2196f3"
                }}
              >
                Registrar Nota
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
