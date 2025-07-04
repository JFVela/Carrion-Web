import { useState } from "react";
import { SectionSelector } from "./Components/section-selector";
import { StudentsTable } from "./Components/students-table";
import { GradesTables } from "./Components/grades-tables";
import { generatePDF } from "./lib/pdf-generator";

export default function GradesManagement() {
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addGrade = (studentId, studentName, grade, type) => {
    const newGrade = {
      studentId,
      studentName,
      grade,
      type,
    };
    setGrades((prev) => [...prev, newGrade]);
    showNotification(`Nota de ${type} registrada correctamente`);
  };

  const handleGeneratePDF = () => {
    if (grades.length === 0) {
      showNotification("No hay calificaciones para generar el PDF", "error");
      return;
    }

    generatePDF(grades, selectedSection);
    showNotification("PDF generado correctamente");
  };

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "24px",
    overflow: "hidden",
  };

  const headerStyle = {
    padding: "24px",
    borderBottom: "1px solid #e0e0e0",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    margin: "0 0 8px 0",
  };

  const subtitleStyle = {
    color: "#666",
    margin: 0,
  };

  const outlineButtonStyle = {
    backgroundColor: "transparent",
    color: "#2196f3",
    border: "2px solid #2196f3",
    borderRadius: "8px",
    padding: "10px 22px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s",
  };

  const greenButtonStyle = {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "16px 32px",
    fontSize: "18px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: "0 auto",
  };

  if (!selectedSection) {
    return (
      <div style={containerStyle}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ ...cardStyle, marginTop: "80px" }}>
            <div style={{ ...headerStyle, textAlign: "center" }}>
              <h1 style={{ ...titleStyle, fontSize: "36px" }}>
                Sistema de Gestión de Calificaciones
              </h1>
              <p style={subtitleStyle}>
                Seleccione la sección de clase para comenzar
              </p>
            </div>
            <div style={{ padding: "24px" }}>
              <SectionSelector
                onSectionSelect={setSelectedSection}
                onStudentsLoad={setStudents}
              />
            </div>
          </div>
        </div>
        {notification && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              backgroundColor:
                notification.type === "error" ? "#f44336" : "#4caf50",
              color: "white",
              padding: "16px 24px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            {notification.message}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={cardStyle}>
          <div style={headerStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <h1 style={titleStyle}>
                  Gestión de Calificaciones - {selectedSection}
                </h1>
                <p style={subtitleStyle}>
                  Total de estudiantes: {students.length}
                </p>
              </div>
              <button
                style={outlineButtonStyle}
                onClick={() => {
                  setSelectedSection("");
                  setStudents([]);
                  setGrades([]);
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#2196f3";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#2196f3";
                }}
              >
                Cambiar Sección
              </button>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <StudentsTable
          students={students}
          onAddGrade={addGrade}
          showNotification={showNotification}
        />

        {/* Grades Tables */}
        <GradesTables grades={grades} />

        {/* Generate PDF Button */}
        {grades.length > 0 && (
          <div style={cardStyle}>
            <div style={{ padding: "24px", textAlign: "center" }}>
              <button
                style={greenButtonStyle}
                onClick={handleGeneratePDF}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#45a049";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#4caf50";
                }}
              >
                📄 Generar PDF de Calificaciones
              </button>
            </div>
          </div>
        )}
      </div>

      {notification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor:
              notification.type === "error" ? "#f44336" : "#4caf50",
            color: "white",
            padding: "16px 24px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}
