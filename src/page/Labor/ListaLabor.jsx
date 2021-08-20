import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Navbar from "../../components/Navbar/Navbar";
import ModalEliminarLabor from "./ModalEliminarLabor";
import ModalAgregarLabor from "./ModalAgregarLabor";
import ModalEditarLabor from "./ModalEditarLabor";

const columns = [
  {
    title: "#",
  },
  {
    title: "Nombre",
    field: "nombre",
  },
];
const data = [
  {
    id: 1,
    nombre: "Lavor 1",
  },
];
const ListaLabor = () => {
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [laborSeleccionado, setLaborSeleccionado] = useState({
    id: 1,
    nombre: "",
  });

  const seleccionarLabor = (labor, caso) => {
    setLaborSeleccionado(labor);

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
      <Navbar nombre="Labores">
        <div className="container-fluid px-4">
          <div className="row">
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={abrirCerrarModalInsertar}
              >
                {" "}
                <i className="fas fa-plus-circle "></i> Nuevo Labor
              </button>
            </div>
          </div>
          <div className="row my-4">
            <div className="col">
              <MaterialTable
                columns={columns}
                data={data}
                title="Lista de Labores"
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Editar Labor",
                    onClick: (event, rowData) =>
                      seleccionarLabor(rowData, "Editar"),
                  },
                  {
                    icon: "delete",
                    tooltip: "Eliminar Labor",
                    onClick: (event, rowData) =>
                      seleccionarLabor(rowData, "Eliminar"),
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
      <ModalAgregarLabor
        setLaborSeleccionado={setLaborSeleccionado}
        laborSeleccionado={laborSeleccionado}
        abrirCerrarModalInsertar={abrirCerrarModalInsertar}
        modalInsertar={modalInsertar}
      />
      <ModalEliminarLabor
        laborSeleccionado={laborSeleccionado}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        modalEliminar={modalEliminar}
      />
      <ModalEditarLabor
        setLaborSeleccionado={setLaborSeleccionado}
        laborSeleccionado={laborSeleccionado}
        abrirCerrarModalEditar={abrirCerrarModalEditar}
        modalEditar={modalEditar}
      />
    </>
  );
};

export default ListaLabor;
