import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Navbar from "../../components/Navbar/Navbar";
import ModalEliminarLabor from "./ModalEliminarLabor";
import ModalAgregarLabor from "./ModalAgregarLabor";
import ModalEditarLabor from "./ModalEditarLabor";
import { Link } from "react-router-dom";
import URL from "../../configuration/URL";
import valorToken from "../../configuration/valorToken";

const columns = [
  {
    title: "#",
    render: (rowData) => rowData.tableData.id + 1,
  },
  {
    title: "Nombre",
    field: "nombre",
  },
];


const ListaLabor = () => {

  const token = valorToken()
  
  const [listaLabor, setListaLabor] = useState([]);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [laborSeleccionado, setLaborSeleccionado] = useState({
    id: 0,
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

  useEffect(() => {
    const abortController = new AbortController();

    //LISTAR LABORES
    const listaLabores = async () => {
      try {
        let response = await fetch(`${URL}/listaTipoLabor`, {
          signal: abortController.signal,
          headers: 
          {
            Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
          }
        });
        response = await response.json();
        setListaLabor(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    listaLabores();
    return () => abortController.abort();
  }, []);

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
                <i className="fas fa-plus-circle "></i> Nueva Labor
              </button>
            </div>
            <div className="col-auto">
            {" "}
              <Link to="/actividades" type="button" className="btn btn-secondary btn-sm">
                <i class="fas fa-arrow-left"></i> Regresar
              </Link>
            </div>
          </div>
          <div className="row my-4">
            <div className="col">
              <MaterialTable
                columns={columns}
                data={listaLabor}
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
      <ModalAgregarLabor
        setLaborSeleccionado={setLaborSeleccionado}
        laborSeleccionado={laborSeleccionado}
        listaLabor={listaLabor}
        setListaLabor={setListaLabor}
        abrirCerrarModalInsertar={abrirCerrarModalInsertar}
        modalInsertar={modalInsertar}
      />
      <ModalEliminarLabor
        laborSeleccionado={laborSeleccionado}
        listaLabor={listaLabor}
        setListaLabor={setListaLabor}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        modalEliminar={modalEliminar}
      />
      <ModalEditarLabor
        setLaborSeleccionado={setLaborSeleccionado}
        laborSeleccionado={laborSeleccionado}
        abrirCerrarModalEditar={abrirCerrarModalEditar}
        modalEditar={modalEditar}
        listaLabor={listaLabor}
        setListaLabor={setListaLabor}
      />
    </>
  );
};

export default ListaLabor;
