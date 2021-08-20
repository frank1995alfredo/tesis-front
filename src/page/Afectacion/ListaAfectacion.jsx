
import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { green } from "@material-ui/core/colors";
import Navbar from "../../components/Navbar/Navbar";
import ModalEliminarAfectacion from "./ModalEliminarAfectacion";
import ModalAgregarAfectacion from "./ModalAgregarAfectacion";
import ModalEditarAfectacion from "./ModalEditarAfectacion";
import Chip from "@material-ui/core/Chip";

const columns = [
  {
    title: "#",
  },
  {
    title: "Nombre",
    field: "nombre_afectacion",
  },
  {
    title: "Descripcion",
    field: "descripcion",
  },
  {
    title: "Estado",
    render: (rowData) =>
      rowData.estado === 1 ? (
        <Chip
          variant="outlined"
          style={{ backgroundColor: green[500] }}
          label="Activo"
          size="small"
        />
      ) : (
        ""
      ),
  },
];
const data = [
  {
    id: 1,
    nombre_afectacion: "Afectacion1",
    descripcion: "ejemplo",
    estado: 1
  },
];

const ListaAfectacion = () => {
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [afectacionSeleccionado, setAfectacionSeleccionado] = useState({
    id: 1,
    nombre_afectacion: "",
    decripcion: "",
    estado: 1,
  });

  const seleccionarAfectacion = (afectacion, caso) => {
    setAfectacionSeleccionado(afectacion);

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
      <Navbar nombre="Afectación">
        <div className="container-fluid px-4">
          <div className="row">
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={abrirCerrarModalInsertar}
              >
                {" "}
                <i className="fas fa-plus-circle "></i> Nueva Afectación
              </button>
            </div>
          </div>
          <div className="row my-4">
            <div className="col">
              <MaterialTable
                columns={columns}
                data={data}
                title="Lista de Afectaciones"
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Editar Afectación",
                    onClick: (event, rowData) =>
                      seleccionarAfectacion(rowData, "Editar"),
                  },
                  {
                    icon: "delete",
                    tooltip: "Eliminar Afectación",
                    onClick: (event, rowData) =>
                      seleccionarAfectacion(rowData, "Eliminar"),
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
      <ModalAgregarAfectacion
        setAfectacionSeleccionado={setAfectacionSeleccionado}
        afectacionSeleccionado={afectacionSeleccionado}
        abrirCerrarModalInsertar={abrirCerrarModalInsertar}
        modalInsertar={modalInsertar}
      />
      <ModalEliminarAfectacion
        afectacionSeleccionado={afectacionSeleccionado}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        modalEliminar={modalEliminar}
      />
      <ModalEditarAfectacion
        setLaborSeleccionado={setAfectacionSeleccionado}
        afectacionSeleccionado={afectacionSeleccionado}
        abrirCerrarModalEditar={abrirCerrarModalEditar}
        modalEditar={modalEditar}
      />
    </>
  );
};

export default ListaAfectacion;
