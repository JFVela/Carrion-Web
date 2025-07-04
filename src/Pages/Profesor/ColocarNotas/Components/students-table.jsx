import { useState } from "react"
import { GradeModal } from "./grade-modal"

export function StudentsTable({ students, onAddGrade, showNotification }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedGradeType, setSelectedGradeType] = useState(null)

  const gradeTypes = [
    { key: "cuaderno", label: "📓 Cuaderno", icon: "📓", tooltip: "Nota de Cuaderno" },
    { key: "tareas", label: "📋 Tareas", icon: "📋", tooltip: "Nota de Tareas" },
    { key: "libro", label: "📚 Libro", icon: "📚", tooltip: "Nota de Libro" },
    { key: "participacion", label: "🙋‍♂️ Participación", icon: "🙋‍♂️", tooltip: "Nota de Participación" },
    { key: "comportamiento", label: "⭐ Comportamiento", icon: "⭐", tooltip: "Nota de Comportamiento" },
  ]

  const filteredStudents = students.filter(
    (student) =>
      `${student.nombre} ${student.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + rowsPerPage)

  const handleAddGrade = (student, gradeType) => {
    setSelectedStudent(student)
    setSelectedGradeType(gradeType)
    setModalOpen(true)
  }

  const handleGradeSubmit = (grade) => {
    if (selectedStudent && selectedGradeType) {
      onAddGrade(selectedStudent.id, `${selectedStudent.nombre} ${selectedStudent.apellido}`, grade, selectedGradeType)
      setModalOpen(false)
      setSelectedStudent(null)
      setSelectedGradeType(null)
    }
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
  }

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    margin: "0 0 16px 0",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }

  const controlsStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  }

  const inputStyle = {
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s",
    maxWidth: "400px",
  }

  const selectStyle = {
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "white",
    cursor: "pointer",
    width: "150px",
  }

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  }

  const thStyle = {
    backgroundColor: "#f5f5f5",
    padding: "16px 12px",
    textAlign: "left",
    fontWeight: "600",
    borderBottom: "2px solid #e0e0e0",
    color: "#333",
  }

  const tdStyle = {
    padding: "16px 12px",
    borderBottom: "1px solid #e0e0e0",
  }

  const buttonStyle = {
    backgroundColor: "#2196f3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    width: "32px",
    height: "32px",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s",
    margin: "0 auto",
  }

  const paginationStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    flexWrap: "wrap",
    gap: "16px",
  }

  const paginationButtonStyle = {
    backgroundColor: "#f5f5f5",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s",
  }

  return (
    <>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>🔍 Lista de Estudiantes</h2>
          <div style={controlsStyle}>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
              <input
                style={inputStyle}
                placeholder="Buscar por nombre o ID..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#2196f3"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e0e0e0"
                }}
              />
              <select
                style={selectStyle}
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
              >
                <option value={10}>10 filas</option>
                <option value={20}>20 filas</option>
                <option value={30}>30 filas</option>
              </select>
            </div>
          </div>
        </div>
        <div style={{ padding: "24px" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: "100px" }}>ID</th>
                  <th style={{ ...thStyle, minWidth: "200px" }}>Nombre Completo</th>
                  {gradeTypes.map((gradeType) => (
                    <th
                      key={gradeType.key}
                      style={{ ...thStyle, textAlign: "center", minWidth: "80px", fontSize: "20px" }}
                    >
                      <span title={gradeType.tooltip}>{gradeType.icon}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.map((student) => (
                  <tr key={student.id} style={{ transition: "background-color 0.3s" }}>
                    <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: "12px" }}>{student.id}</td>
                    <td style={{ ...tdStyle, fontWeight: "500" }}>
                      {student.nombre} {student.apellido}
                    </td>
                    {gradeTypes.map((gradeType) => (
                      <td key={gradeType.key} style={{ ...tdStyle, textAlign: "center" }}>
                        <button
                          onClick={() => handleAddGrade(student, gradeType.key)}
                          style={buttonStyle}
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = "#1976d2"
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#2196f3"
                          }}
                          title={`Añadir ${gradeType.tooltip}`}
                        >
                          +
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={paginationStyle}>
              <p style={{ color: "#666", margin: 0, fontSize: "14px" }}>
                Mostrando {startIndex + 1} a {Math.min(startIndex + rowsPerPage, filteredStudents.length)} de{" "}
                {filteredStudents.length} estudiantes
              </p>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{
                    ...paginationButtonStyle,
                    opacity: currentPage === 1 ? 0.5 : 1,
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  Anterior
                </button>
                <span style={{ padding: "8px 16px", fontSize: "14px", color: "#666" }}>
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  style={{
                    ...paginationButtonStyle,
                    opacity: currentPage === totalPages ? 0.5 : 1,
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <GradeModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        student={selectedStudent}
        gradeType={selectedGradeType}
        gradeTypes={gradeTypes}
        onSubmit={handleGradeSubmit}
        showNotification={showNotification}
      />
    </>
  )
}
