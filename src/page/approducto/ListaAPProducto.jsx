import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Navbar from "../../components/Navbar/Navbar";
import { green, red } from "@material-ui/core/colors";
import ModalEliminarAPProducto from "./ModalEliminarAPProducto";
import { Link } from "react-router-dom";
import URL from "../../configuration/URL";
import Chip from "@material-ui/core/Chip";
import { useHistory } from "react-router-dom";
import valorToken from "../../configuration/valorToken";

const columns = [
  {
    title: "#",
    render: (rowData) => rowData.tableData.id + 1,
  },
  {
    title: "Numero",
    field: "numero",
  },
  {
    title: "Extencion",
    field: "extencion",
  },
  {
    title: "Afectacion Parcela",
    field: "nombre_afectacion",
  },
  {
    title: "Observacion",
    field: "observacion",
  },
  {
    title: "Fecha",
    field: "fecha",
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
        <Chip
          variant="outlined"
          style={{ backgroundColor: red[500] }}
          label="Inactivo"
          size="small"
        />
      ),
  },
];

const ListaAPProducto = () => {
  const token = valorToken();

  const [listaAPProducto, setListaAPProducto] = useState([]);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [approductoSeleccionado, setAPProductoSeleccionado] = useState({
    id: 0,
    numero: 0,
    nombre_afectacion: "",
    fecha: Date,
    observacion: "",
    estado: 0,
  });

  const seleccionarAPProducto = (approducto, caso) => {
    setAPProductoSeleccionado(approducto);

    if (caso === "Eliminar") {
      abrirCerrarModalEliminar();
    } else {
      abrirCerrarModalEditar();
    }
  };
  //metodo para editar
  const history = useHistory();
  const handleUpdateClick = (id) => {
    history.push(`/actividades/actividades/${id}/editarAPProducto`);
  };
  const handleInsertClick = (id) => {
    history.push(``);
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

    //LISTAR AfectacionParcela
    const listaAPProductos = async () => {
      try {
        let response = await fetch(`${URL}/listaAfectacionParcelaProducto`, {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
          },
        });
        response = await response.json();
        setListaAPProducto(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    listaAPProductos();
    return () => abortController.abort();
  }, []);

  return (
    <>
      <Navbar nombre="Correcciones Tomadas">
        <div className="container-fluid px-4">
          <div className="row">
            <div className="col-auto"></div>
            <div className="col-auto"></div>
            <div className="col-auto">
              {" "}
              <Link
                to="/AfectacionParcela"
                type="button"
                className="btn btn-secondary btn-sm"
              >
                <i class="fas fa-arrow-left"></i> Regresar
              </Link>
            </div>
          </div>
          <div className="row my-4">
            <div className="col">
              <MaterialTable
                columns={columns}
                data={listaAPProducto}
                title="Lista de las acciones tomadas"
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Editar AfectacionParcela",
                    onClick: (event, rowData) => handleUpdateClick(rowData.id),
                  },
                  {
                    icon: "delete",
                    tooltip: "Eliminar Afectación",
                    onClick: (event, rowData) =>
                      seleccionarAPProducto(rowData, "Eliminar"),
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
                    searchTooltip: "Buscar",
                    searchPlaceholder: "Buscar",
                  },
                  pagination: {
                    labelRowsSelect: "Registros",
                    firstTooltip: "Primera página",
                    previousTooltip: "Página anterior",
                    nextTooltip: "Siguiente página",
                    lastTooltip: "Última página",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Navbar>
      <ModalEliminarAPProducto
        approductoSeleccionado={approductoSeleccionado}
        listaAPProducto={listaAPProducto}
        setListaAPProducto={setListaAPProducto}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        modalEliminar={modalEliminar}
      />
    </>
  );
};

export default ListaAPProducto;
