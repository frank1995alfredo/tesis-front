
import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { green } from "@material-ui/core/colors";
import Navbar from "../../components/Navbar/Navbar";
import ModalEliminarAfectacion from "./ModalEliminarAfectacion";
import ModalAgregarAfectacion from "./ModalAgregarAfectacion";
import ModalEditarAfectacion from "./ModalEditarAfectacion";
import Chip from "@material-ui/core/Chip";
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


const ListaAfectacion = () => {

  const token = valorToken()

  const [listaAfectacion, setListaAfectacion] = useState([]);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [afectacionSeleccionado, setAfectacionSeleccionado] = useState({
    id: 0,
    nombre_afectacion: "",
    decripcion: "",
    
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

  useEffect(() => {
    const abortController = new AbortController();
    
    //LISTAR AFECTACION
    const listaAfectacion = async () => {
      try {
        let response = await fetch(`${URL}/listaAfectacion`, {
          signal: abortController.signal,
          headers: 
          {
            Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
          }
        });
        response = await response.json();
        setListaAfectacion(response.data);
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
                data={listaAfectacion}
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
      <ModalAgregarAfectacion
        setAfectacionSeleccionado={setAfectacionSeleccionado}
        afectacionSeleccionado={afectacionSeleccionado}
        abrirCerrarModalInsertar={abrirCerrarModalInsertar}
        modalInsertar={modalInsertar}
        listaAfectacion={listaAfectacion}
        setListaAfectacion={setListaAfectacion}
      />
      <ModalEliminarAfectacion
        afectacionSeleccionado={afectacionSeleccionado}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        modalEliminar={modalEliminar}
        listaAfectacion={listaAfectacion}
        setListaAfectacion={setListaAfectacion}
       
      />
      <ModalEditarAfectacion
        setAfectacionSeleccionado={setAfectacionSeleccionado}
        afectacionSeleccionado={afectacionSeleccionado}
        abrirCerrarModalEditar={abrirCerrarModalEditar}
        modalEditar={modalEditar}
        listaAfectacion={listaAfectacion}
        setListaAfectacion={setListaAfectacion}
      />
    </>
  );
};

export default ListaAfectacion;
