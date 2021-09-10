import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Navbar from "../../components/Navbar/Navbar";
import ModalEliminarParcela from "./ModalEliminarParcela";
import ModalAgregarParcela from "./ModalAgregarParcela";
import ModalEditarParcela from "./ModalEditarParcela";
import { Link } from "react-router-dom";
import URL from "../../configuration/URL";

const columns = [
  {
    title: "#",
    render: (rowData) => rowData.tableData.id + 1,
  },
  {
    title: "Número",
    field: "numero",
  },
  {
    title: "Extención",
    field: "extencion",
  },
  {
    title: "Descripción",
    field: "descripcion",
  },
];

const ListaParcela = () => {

  const [listaParcela, setListaParcela] = useState([]);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [parcelaSeleccionado, setParcelaSeleccionado] = useState({
    id: 0,
    numero: 0,
    extencion: "",
    descripcion: "",
  });

  const seleccionarParcela = (parcela, caso) => {
    setParcelaSeleccionado(parcela);

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

    //LISTAR PARCELA
    const listaParcelas = async () => {
      try {
        let response = await fetch(`${URL}/listaParcela`, {
          signal: abortController.signal,
        });
        response = await response.json();
        setListaParcela(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    listaParcelas();
    return () => abortController.abort();
  }, []);

  return (
    <>
      <Navbar nombre="Parcela">
        <div className="container-fluid px-4">
          <div className="row">
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={abrirCerrarModalInsertar}
              >
                {" "}
                <i className="fas fa-plus-circle "></i> Nueva Parcela
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
                data={listaParcela}
                title="Lista de Parcela"
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Editar Parcela",
                    onClick: (event, rowData) =>
                      seleccionarParcela(rowData, "Editar"),
                  },
                  {
                    icon: "delete",
                    tooltip: "Eliminar Parcela",
                    onClick: (event, rowData) =>
                      seleccionarParcela(rowData, "Eliminar"),
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
      <ModalAgregarParcela
        setParcelaSeleccionado={setParcelaSeleccionado}
        parcelaSeleccionado={parcelaSeleccionado}
        abrirCerrarModalInsertar={abrirCerrarModalInsertar}
        modalInsertar={modalInsertar}
        listaParcela={listaParcela}
        setListaParcela={setListaParcela}
      />
      <ModalEliminarParcela
        parcelaSeleccionado={parcelaSeleccionado}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        modalEliminar={modalEliminar}
        listaParcela={listaParcela}
        setListaParcela={setListaParcela}
      />
      <ModalEditarParcela
        setParcelaSeleccionado={setParcelaSeleccionado}
        parcelaSeleccionado={parcelaSeleccionado}
        abrirCerrarModalEditar={abrirCerrarModalEditar}
        modalEditar={modalEditar}
        listaParcela={listaParcela}
        setListaParcela={setListaParcela}
      />
    </>
  );
};

export default ListaParcela;
