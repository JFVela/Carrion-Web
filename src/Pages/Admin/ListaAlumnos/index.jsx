import { useState, useEffect } from "react";
import TablaCrud from "../../../Componentes/TablaCrud";
import ModalFormulario from "../../../Componentes/ModalFormulario";
import Swal from "sweetalert2";
import Estilos from "./Estilos.module.css";

function ListaAlumnos() {
  // Estado para almacenar los datos de los alumnos (inicialmente vacío)
  const [alumnos, setAlumnos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  // Al montar el componente, obtenemos los datos del backend PHP
  useEffect(() => {
    fetch("http://localhost:3000/Admin/crudAlumnos/listarAlumnos.php")
      .then((response) => response.json())
      .then((data) => setAlumnos(data))
      .catch((error) => {
        console.error("Error al obtener los alumnos:", error);
        Swal.fire({
          title: "Error",
          text: "No se pudieron cargar los datos de los alumnos",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  }, []);

  // Verificamos que existan datos para calcular las columnas dinamicamente
  const columnas = alumnos.length > 0 ? Object.keys(alumnos[0]) : [];

  // Función para filtrar alumnos
  const alumnosFiltrados = alumnos.filter((alumno) =>
    Object.values(alumno).some((valor) =>
      String(valor).toLowerCase().includes(filtro.toLowerCase())
    )
  );

  // Función para abrir el modal de agregar
  const abrirModalAgregar = () => {
    const nuevoAlumno = { id: 0 }; // Solo id por defecto
    columnas.forEach((col) => {
      if (col !== "id") nuevoAlumno[col] = "";
    });
    setAlumnoSeleccionado(nuevoAlumno);
    setModalAbierto(true);
  };

  // Función para abrir el modal de editar
  const abrirModalEditar = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setModalAbierto(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalAbierto(false);
    setAlumnoSeleccionado(null);
  };

  // Función para guardar un alumno (agregar o editar)
  const guardarAlumno = (alumno) => {
    console.log(JSON.stringify(alumno));
    const metodo =
      alumno.id && alumno.id !== "0" && alumno.id !== 0 ? "PUT" : "POST";
    const url = alumno.id
      ? `http://localhost:3000/Admin/crudAlumnos/editarAlumnos.php`
      : `http://localhost:3000/Admin/crudAlumnos/agregarAlumnos.php`;

    fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alumno),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensaje) {
          Swal.fire({
            title: "¡Éxito!",
            text: data.mensaje,
            icon: "success",
            confirmButtonText: "Ok",
          });

          // Actualizar lista de alumnos después de agregar
          fetch("http://localhost:3000/Admin/crudAlumnos/listarAlumnos.php")
            .then((response) => response.json())
            .then((data) => setAlumnos(data));
        } else {
          Swal.fire({
            title: "Error",
            text: data.error || "No se pudo procesar la solicitud",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        Swal.fire({
          title: "Error",
          text: "No se pudo conectar con el servidor",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });

    cerrarModal();
  };

  // Función para eliminar un alumno
  const eliminarAlumno = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (!result.isConfirmed) return;

      // Función para llamar al endpoint con opcional force
      const callDelete = (force = false) => {
        fetch("http://localhost:3000/Admin/crudAlumnos/eliminarAlumno.php", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, force }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.mensaje) {
              Swal.fire("¡Eliminado!", data.mensaje, "success");
              setAlumnos((prev) => prev.filter((a) => a.id !== id));
            } else if (data.code === 1451) {
              // FK constraint: preguntar si fuerza
              Swal.fire({
                title: "¿Forzar eliminación?",
                text:
                  data.error +
                  " ¿Deseas forzar y eliminar todas las referencias?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, forzar",
                cancelButtonText: "No, cancelar",
              }).then((sec) => {
                if (sec.isConfirmed) {
                  callDelete(true);
                }
              });
            } else {
              Swal.fire("Error", data.error || "No se pudo eliminar", "error");
            }
          })
          .catch((error) => {
            console.error("Error al eliminar el alumno:", error);
            Swal.fire("Error", "No se pudo conectar con el servidor", "error");
          });
      };

      // Primera llamada sin forzar
      callDelete(false);
    });
  };

  return (
    <div className={Estilos.contenedor}>
      <h1>Gestión de Alumnos</h1>

      <div className={Estilos.controles}>
        <input
          type="text"
          placeholder="Buscar alumno..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className={Estilos.buscador}
        />
        <button onClick={abrirModalAgregar} className={Estilos.botonAgregar}>
          Agregar Alumno
        </button>
      </div>

      <TablaCrud
        alumnos={alumnosFiltrados}
        onEditar={abrirModalEditar}
        onEliminar={eliminarAlumno}
      />

      {modalAbierto && (
        <ModalFormulario
          alumno={alumnoSeleccionado}
          columnas={columnas} // Ahora el formulario es dinámico
          onGuardar={guardarAlumno}
          onCerrar={cerrarModal}
        />
      )}
    </div>
  );
}

export default ListaAlumnos;
