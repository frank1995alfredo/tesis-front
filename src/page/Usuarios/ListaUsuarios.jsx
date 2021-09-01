import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Navbar from "../../components/Navbar/Navbar";
import ModalEliminarUsuario from "./ModalEliminarUsuario";
import ModalAgregarUsuario from "./ModalAgregarUsuario";
import ModalEditarUsuario from "./ModalEditarUsuario";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "#",
  },
  {
    title: "Usuario",
    field: "usuario",
  },
  {
    title: "Nombre",
    field: "nombre",
  },
  {
    title: "Apellido",
    field: "apellido",
  },
  {
    title: "Cédula",
    field: "cedula",
  },
  
];
const data = [
  {
    id: 1,
    usuario: "usuario 1",
    nombre: "nombre 1",
    apellido: "apellido 1",
    cedula: "2100373873"
  },
];
const ListaUsuarios = () => {
  
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    id: 0,
    usuario: "",
    nombre: "",
    apellido: "",
    cedula: "",
  });

  const seleccionarLabor = (labor, caso) => {
    setUsuarioSeleccionado(labor);

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
      <Navbar nombre="Usuarios">
        <div className="container-fluid px-4">
          <div className="row">
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={abrirCerrarModalInsertar}
              >
                {" "}
                <i className="fas fa-plus-circle "></i> Nueva Labor
              </button>
            </div>
          </div>
          <div className="row my-4">
            <div className="col">
              <MaterialTable
                columns={columns}
                data={data}
                title="Lista de Usuarios"
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Editar Usuario",
                    onClick: (event, rowData) =>
                      seleccionarLabor(rowData, "Editar"),
                  },
                  {
                    icon: "delete",
                    tooltip: "Eliminar Usuario",
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
      <ModalAgregarUsuario
        setUsuarioSeleccionado={setUsuarioSeleccionado}
        abrirCerrarModalInsertar={abrirCerrarModalInsertar}
        modalInsertar={modalInsertar}
      />
      <ModalEliminarUsuario
        usuarioSeleccionado={usuarioSeleccionado}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        modalEliminar={modalEliminar}
      />
      <ModalEditarUsuario
        setUsuarioSeleccionado={setUsuarioSeleccionado}
        usuarioSeleccionado={usuarioSeleccionado}
        abrirCerrarModalEditar={abrirCerrarModalEditar}
        modalEditar={modalEditar}
      />
    </>
  );
};

export default ListaUsuarios;
