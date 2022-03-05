import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { green } from "@material-ui/core/colors";
import Navbar from "../../components/Navbar/Navbar";
import ModalEliminarProducto from "./ModalEliminarProducto";
import ModalAgregarProducto from "./ModalAgregarProducto";
import ModalEditarProducto from "./ModalEditarProducto";
import ModalReporte_1 from "./ModalReporte_1";
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
    field: "nombre",
  },
  {
    title: "Fecha_compra",
    field: "fecha_compra",
  },
  {
    title: "Fecha_caducidad",
    field: "fecha_caducidad",
  },
  {
    title: "Precio",
    field: "precio",
  },
  {
    title: "Cantidad",
    field: "cantidad",
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

const ListaProducto = () => {

  const token = valorToken();
  const [listaProducto, setListaProducto] = useState([]);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalReporte, setModalReporte] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    fecha_compra: "",
    fecha_caducidad: "",
    precio: 0.0,
    cantidad: 0,


  });

  const seleccionarProducto = (producto, caso) => {
    setProductoSeleccionado(producto);

    if (caso === "Eliminar") {
      abrirCerrarModalEliminar();
    } else {
      if (caso === "Reporte") {
        console.log("este");
        abrirCerrarModalReporte();
      } else {
        abrirCerrarModalEditar();
      }
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
  const abrirCerrarModalReporte = () => {
    setModalReporte(!modalReporte);
  };

  useEffect(() => {
    const abortController = new AbortController();
    //LISTAR ACTIVIDAD

    //LISTAR Producto
    const listaProducto = async () => {
      try {
        let response = await fetch(`${URL}/listaProducto`, {
          signal: abortController.signal,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
          },
        });
        response = await response.json();
        setListaProducto(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    listaProducto();
    return () => abortController.abort();
  }, []);

  return (
    <>
      <Navbar nombre="Producto">
        <div className="container-fluid px-4">
          <div className="row">
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={abrirCerrarModalInsertar}
              >
                {" "}
                <i className="fas fa-plus-circle "></i> Nuevo producto
              </button>
            </div>
            <div className="col-auto">
              {" "}
              <Link
                to="/bodega"
                type="button"
                className="btn btn-secondary btn-sm"
              >
                <i class="fas fa-arrow-left"></i> Regresar
              </Link>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-secondary btn-sm"
                target="_blank"
                onClick={abrirCerrarModalReporte}
              >
                Reporte de Existencias
              </button>
            </div>
          </div>
          <div className="row my-4">
            <div className="col">
              <MaterialTable
                columns={columns}
                data={listaProducto}
                title="Lista de Productos"
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Editar Afectación",
                    onClick: (event, rowData) =>
                      seleccionarProducto(rowData, "Editar"),
                  },
                  {
                    icon: "delete",
                    tooltip: "Eliminar Afectación",
                    onClick: (event, rowData) =>
                      seleccionarProducto(rowData, "Eliminar"),
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
      <ModalAgregarProducto
        setProductoSeleccionado={setProductoSeleccionado}
        productoSeleccionado={productoSeleccionado}
        abrirCerrarModalInsertar={abrirCerrarModalInsertar}
        modalInsertar={modalInsertar}
        listaProducto={listaProducto}
        setListaProducto={setListaProducto}
      />
      <ModalEliminarProducto
        productoSeleccionado={productoSeleccionado}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        modalEliminar={modalEliminar}
        listaProducto={listaProducto}
        setListaProducto={setListaProducto}
      />
      <ModalEditarProducto
        setProductoSeleccionado={setProductoSeleccionado}
        productoSeleccionado={productoSeleccionado}
        abrirCerrarModalEditar={abrirCerrarModalEditar}
        modalEditar={modalEditar}
        listaProducto={listaProducto}
        setListaProducto={setListaProducto}
      />
      <ModalReporte_1
        setProductoSeleccionado={setProductoSeleccionado}
        productoSeleccionado={productoSeleccionado}
        abrirCerrarModalReporte={abrirCerrarModalReporte}
        modalReporte={modalReporte}
        listaProducto={listaProducto}
        setListaProducto={setListaProducto}
      />
    </>
  );
};

export default ListaProducto;
