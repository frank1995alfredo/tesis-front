import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Navbar from "../../components/Navbar/Navbar";
import ModalEliminarRecursos from "./ModalEliminarRecursos";
import ModalAgregarRecursos from "./ModalAgregarRecursos";
import ModalEditarRecursos from "./ModalEditarRecursos";

const columns = [
  {
    title: "#",
  },
  {
    title: "nombre",
    field: "nombre",
  },
  {
    title: "descripcion",
    field: "descripcion",
  },
];
const data = [
  {
    id: 1,
    nombre: "Lavor 1",
    descripcion: "Semilla de arroz largo",
  },
];
const ListaRecursos = () => {
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [recursosSeleccionado, setRecursosSeleccionado] = useState({
    id: 1,
    nombre: "",
    descripcion: "",
  });

  const seleccionarRecursos = (recursos, caso) => {
    setRecursosSeleccionado(recursos);

    if (caso === "Eliminar") {
      abrirCerrarModalEliminar();
    } else {
      abrirCerrarModalEditar();
    }
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  return (
    <>
      <Navbar nombre="Recursos">
        <div className="container-fluid px-4">
          <div className="row">
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={abrirCerrarModalInsertar}
              >
                {" "}
                <i className="fas fa-plus-circle "></i> Nueva Recursos
              </button>
            </div>
          </div>
          <div className="row my-4">
            <div className="col">
              <MaterialTable
                columns={columns}
                data={data}
                title="Lista de Recursos"
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Editar Recursos",
                    onClick: (event, rowData) =>
                      seleccionarRecursos(rowData, "Editar"),
                  },
                  {
                    icon: "delete",
                    tooltip: "Eliminar Recursos",
                    onClick: (event, rowData) =>
                      seleccionarRecursos(rowData, "Eliminar"),
                  },
                ]}
                options={{
                  actionsColumnIndex: -1,
                }}
                localization={{
                  header: {
                    actions: "Acciones",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Navbar>
      <ModalAgregarRecursos
        setRecursosSeleccionado={setRecursosSeleccionado}
        recursosSeleccionado={recursosSeleccionado}
        abrirCerrarModalInsertar={abrirCerrarModalInsertar}
        modalInsertar={modalInsertar}
      />
      <ModalEliminarRecursos
        recursosSeleccionado={recursosSeleccionado}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        modalEliminar={modalEliminar}
      />
      <ModalEditarRecursos
        setRecursosSeleccionado={setRecursosSeleccionado}
        recursosSeleccionado={recursosSeleccionado}
        abrirCerrarModalEditar={abrirCerrarModalEditar}
        modalEditar={modalEditar}
      />
    </>
  );
};

export default ListaRecursos;
