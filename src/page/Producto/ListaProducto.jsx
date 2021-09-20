import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { green } from "@material-ui/core/colors";
import Navbar from "../../components/Navbar/Navbar";
import ModalEliminarProducto from "./ModalEliminarProducto";
import ModalAgregarProducto from "./ModalAgregarProducto";
import ModalEditarProducto from "./ModalEditarProducto";
import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";
import URL from "../../configuration/URL";
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
  const [listaProducto, setListaProducto] = useState([]);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState({
    id: 0,
    nombre: "",
    fecha_compra: "",
    fecha_caducidad: "",
    precio: 0,
    cantidad: 0.0,
    descripcion: "",
  });

  const seleccionarProducto = (producto, caso) => {
    setProductoSeleccionado(producto);

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
    //LISTAR ARTICULOS
    const listaProductos = async () => {
      try {
        let response = await fetch(`${URL}/listaProducto`, {
          signal: abortController.signal,
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

    listaProductos();
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
                <i className="fas fa-plus-circle "></i> Nuevo Producto
              </button>
            </div>
            <div className="col-auto">
              {" "}
              <Link
                to="/actividades"
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
                data={listaProducto}
                title="Lista de Producto"
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Editar Producto",
                    onClick: (event, rowData) =>
                      seleccionarProducto(rowData, "Editar"),
                  },
                  {
                    icon: "delete",
                    tooltip: "Eliminar Producto",
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
                }}
              />
            </div>
          </div>
        </div>
      </Navbar>
      <ModalAgregarProducto
        setProductoSeleccionado={setProductoSeleccionado}
        productoSeleccionado={productoSeleccionado}
        listaProducto={listaProducto}
        setListaProducto={setListaProducto}
        abrirCerrarModalInsertar={abrirCerrarModalInsertar}
        modalInsertar={modalInsertar}
      />
      <ModalEliminarProducto
        productoSeleccionado={productoSeleccionado}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        modalEliminar={modalEliminar}
      />
      <ModalEditarProducto
        setProductoSeleccionado={setProductoSeleccionado}
        productoSeleccionado={productoSeleccionado}
        abrirCerrarModalEditar={abrirCerrarModalEditar}
        modalEditar={modalEditar}
      />
    </>
  );
};

export default ListaProducto;
