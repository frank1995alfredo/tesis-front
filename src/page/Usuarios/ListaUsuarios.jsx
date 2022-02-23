import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Navbar from "../../components/Navbar/Navbar";
import ModalEliminarUsuario from "./ModalEliminarUsuario";
import ModalAgregarUsuario from "./ModalAgregarUsuario";
import ModalEditarUsuario from "./ModalEditarUsuario";
import Chip from "@material-ui/core/Chip";
import { green } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import URL from "../../configuration/URL";
import valorToken from "../../configuration/valorToken";

const columns = [
  {
    title: "#",
    render: (rowData) => rowData.tableData.id + 1,
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
  {
    title: "Tipo Usuario",
    field: "tipousuario",
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

const ListaUsuarios = () => {

  const token = valorToken()

  const [listaUsuarios, setListaUsuarios] = useState([]);
  
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    id: 0,
    usuario: "",
    nombre: "",
    apellido: "",
    cedula: "",
    tipousuario: "",
    email: ""
  });

  useEffect(() => {
    const abortController = new AbortController();

    //LISTAR RECURSO
    const listaUsuarios = async () => {
      try {
        let response = await fetch(`${URL}/listaUsuarios`, {
          signal: abortController.signal,
          headers: 
          {
            Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
          }
        });
        response = await response.json();
        setListaUsuarios(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    listaUsuarios();
    return () => abortController.abort();
  }, []);

  const seleccionarUsuario = (usuario, caso) => {
    setUsuarioSeleccionado(usuario);

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
                <i className="fas fa-plus-circle "></i> Nuevo Usuario
              </button>
            </div>
          </div>
          <div className="row my-4">
            <div className="col">
              <MaterialTable
                columns={columns}
                data={listaUsuarios}
                title="Lista de Usuarios"
                actions={[
                 
                  {
                    icon: "delete",
                    tooltip: "Eliminar Usuario",
                    onClick: (event, rowData) =>
                      seleccionarUsuario(rowData, "Eliminar"),
                  },
                ]}
                options={{
                  actionsColumnIndex: -1,
                }}
                localization={{
                  header: {
                    actions: "Acciones",
                  },
                  toolbar: {
                    searchTooltip: 'Buscar',
                    searchPlaceholder: 'Buscar'
                  },
                  pagination: {
                    labelRowsSelect: 'Registros',
                    firstTooltip: 'Primera página',
                    previousTooltip: 'Página anterior',
                    nextTooltip: 'Siguiente página',
                    lastTooltip: 'Última página',
                  }
                }}
              />
            </div>
          </div>
        </div>
      </Navbar>
      <ModalAgregarUsuario
        setUsuarioSeleccionado={setUsuarioSeleccionado}
        usuarioSeleccionado={usuarioSeleccionado}
        listaUsuarios={listaUsuarios}
        setListaUsuarios={setListaUsuarios}
        abrirCerrarModalInsertar={abrirCerrarModalInsertar}
        modalInsertar={modalInsertar}
      
      />
      <ModalEliminarUsuario
        usuarioSeleccionado={usuarioSeleccionado}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        modalEliminar={modalEliminar}
        listaUsuarios={listaUsuarios}
        setListaUsuarios={setListaUsuarios}
      />
      <ModalEditarUsuario
        setUsuarioSeleccionado={setUsuarioSeleccionado}
        usuarioSeleccionado={usuarioSeleccionado}
        abrirCerrarModalEditar={abrirCerrarModalEditar}
        modalEditar={modalEditar}
        listaUsuarios={listaUsuarios}
        setListaUsuarios={setListaUsuarios}
      />
    </>
  );
};

export default ListaUsuarios;
