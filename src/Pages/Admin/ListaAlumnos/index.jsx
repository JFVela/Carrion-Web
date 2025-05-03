import { useState } from "react";
import TablaAlumnos from "../../../Componentes/TablaAlumnos";
import ModalFormulario from "../../../Componentes/ModalFormulario";
import Swal from "sweetalert2";
import Estilos from "./Estilos.module.css";

function ListaAlumnos() {
  // Estado para almacenar los datos de los alumnos
  const [alumnos, setAlumnos] = useState([
    {
      id: 1,
      nombre: "Juan",
      apellido: "Pérez",
      edad: 20,
      promedio: 8.5,
      idioma: "español",
    },
    { id: 2, nombre: "María", apellido: "González", edad: 22, promedio: 9.2 },
    { id: 3, nombre: "Carlos", apellido: "Rodríguez", edad: 21, promedio: 7.8 },
    { id: 4, nombre: "Ana", apellido: "López", edad: 23, promedio: 8.9 },
    { id: 5, nombre: "Pedro", apellido: "Martínez", edad: 20, promedio: 7.5 },
  ]);

  // Estado para el filtro de búsqueda
  const [filtro, setFiltro] = useState("");

  // Estado para el modal
  const [modalAbierto, setModalAbierto] = useState(false);

  // Estado para el alumno seleccionado (para editar)
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  // Función para filtrar alumnos
  const alumnosFiltrados = alumnos.filter((alumno) =>
    Object.values(alumno).some((valor) =>
      String(valor).toLowerCase().includes(filtro.toLowerCase())
    )
  );

  // Función para abrir el modal de agregar
  const abrirModalAgregar = () => {
    setAlumnoSeleccionado(null);
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
    if (alumno.id) {
      // Editar alumno existente
      setAlumnos(alumnos.map((a) => (a.id === alumno.id ? alumno : a)));
      Swal.fire({
        title: "¡Actualizado!",
        text: "El alumno ha sido actualizado correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else {
      // Agregar nuevo alumno
      const nuevoAlumno = {
        ...alumno,
        id: alumnos.length > 0 ? Math.max(...alumnos.map((a) => a.id)) + 1 : 1,
      };
      setAlumnos([...alumnos, nuevoAlumno]);
      Swal.fire({
        title: "¡Agregado!",
        text: "El alumno ha sido agregado correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
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
      if (result.isConfirmed) {
        setAlumnos(alumnos.filter((alumno) => alumno.id !== id));
        Swal.fire(
          "¡Eliminado!",
          "El alumno ha sido eliminado correctamente",
          "success"
        );
      }
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

      <TablaAlumnos
        alumnos={alumnosFiltrados}
        onEditar={abrirModalEditar}
        onEliminar={eliminarAlumno}
      />

      {modalAbierto && (
        <ModalFormulario
          alumno={alumnoSeleccionado}
          onGuardar={guardarAlumno}
          onCerrar={cerrarModal}
        />
      )}
    </div>
  );
}

export default ListaAlumnos;
