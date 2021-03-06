import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Navbar from "../../components/Navbar/Navbar";
import ModalEliminarRecursos from "./ModalEliminarRecursos";
import ModalAgregarRecursos from "./ModalAgregarRecursos";
import ModalEditarRecursos from "./ModalEditarRecursos";
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
  {
    title: "Características",
    field: "caracteristica",
  },
];

const ListaRecursos = () => {

  const token = valorToken()

  const [listaRecurso, setListaRecurso] = useState([]);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [recursosSeleccionado, setRecursosSeleccionado] = useState({
    id: 1,
    nombre: "",
    caracteristicas: "",
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

  useEffect(() => {
    const abortController = new AbortController();

    //LISTAR RECURSO
    const listaAfectacion = async () => {
      try {
        let response = await fetch(`${URL}/listaRecurso`, {
          signal: abortController.signal,
          headers: 
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
          }
        });
        response = await response.json();
        setListaRecurso(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    listaAfectacion();
    return () => abortController.abort();
  }, []);

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
                <i className="fas fa-plus-circle "></i> Nuevo Recurso
              </button>
            </div>
            <div className="col-auto">
            {" "}
              <Link to="/bodega" type="button" className="btn btn-secondary btn-sm">
                <i class="fas fa-arrow-left"></i> Regresar
              </Link>
            </div>
          </div>
          <div className="row my-4">
            <div className="col">
              <MaterialTable
                columns={columns}
                data={listaRecurso}
                title="Lista de Recursos"
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Editar Recurso",
                    onClick: (event, rowData) =>
                      seleccionarRecursos(rowData, "Editar"),
                  },
                  {
                    icon: "delete",
                    tooltip: "Eliminar Recurso",
                    onClick: (event, rowData) =>
                      seleccionarRecursos(rowData, "Eliminar"),
                  }
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
      <ModalAgregarRecursos
        setRecursosSeleccionado={setRecursosSeleccionado}
        recursosSeleccionado={recursosSeleccionado}
        abrirCerrarModalInsertar={abrirCerrarModalInsertar}
        modalInsertar={modalInsertar}
        listaRecurso={listaRecurso}
        setListaRecurso={setListaRecurso}
      />
      <ModalEliminarRecursos
        recursosSeleccionado={recursosSeleccionado}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        modalEliminar={modalEliminar}
        listaRecurso={listaRecurso}
        setListaRecurso={setListaRecurso}
        setRecursosSeleccionado={setRecursosSeleccionado}
      />
      <ModalEditarRecursos
        setRecursosSeleccionado={setRecursosSeleccionado}
        recursosSeleccionado={recursosSeleccionado}
        abrirCerrarModalEditar={abrirCerrarModalEditar}
        modalEditar={modalEditar}
        listaRecurso={listaRecurso}
        setListaRecurso={setListaRecurso}
      />
    </>
  );
};

export default ListaRecursos;
