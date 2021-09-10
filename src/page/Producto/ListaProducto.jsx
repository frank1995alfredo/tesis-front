import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Navbar from "../../components/Navbar/Navbar";
import ModalEliminarRecursos from "./ModalEliminarRecursos";
import ModalAgregarRecursos from "./ModalAgregarRecursos";
import ModalEditarRecursos from "./ModalEditarRecursos";

const columns = [
  {
    title: "#",
  },
  {
    title: "nombre",
    field: "nombre",
  },
  {
    title: "F. Compra",
    field: "fecha_compra",
  },
  {
    title: "F. Caducidad",
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
    title: "Descripción",
    field: "descripcion",
  },
  
];
const data = [
  {
    id: 1,
    nombre: "Ejemplo",
    fecha_compra: "2021-07-08",
    fecha_caducidad: "2022-07-08",
    precio: 30.50,
    cantidad: 4,
    descripcion: "ejemplo"
  },
];
const ListaProducto = () => {
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState({
    id: 1,
    nombre: "",
    fecha_compra: "",
    fecha_caducidad: "",
    precio: 0.0,
    cantidad: 0,
    descripcion: "",
    estado: 1
  });

  const seleccionarProducto = (productos, caso) => {
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

  return (
    <>
      <Navbar nombre="Productos">
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
          </div>
          <div className="row my-4">
            <div className="col">
              <MaterialTable
                columns={columns}
                data={data}
                title="Lista de Recursos"
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
      />
      <ModalEliminarRecursos
        recursosSeleccionado={recursosSeleccionado}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        modalEliminar={modalEliminar}
      />
      <ModalEditarRecursos
        setRecursosSeleccionado={setRecursosSeleccionado}
        recursosSeleccionado={recursosSeleccionado}
        abrirCerrarModalEditar={abrirCerrarModalEditar}
        modalEditar={modalEditar}
      />
    </>
  );
};

export default ListaProducto;
