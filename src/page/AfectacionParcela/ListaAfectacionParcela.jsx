import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Navbar from "../../components/Navbar/Navbar";
import { green, red } from "@material-ui/core/colors";
import ModalEliminarAfectacionParcela from "./ModalEliminarAfectacionParcela";
import ModalAgregarAfectacionParcela from "./ModalAgregarAfectacionParcela";
import ModalEditarAfectacionParcela from "./ModalEditarAfectacionParcela";
import ModalReporte_2 from "./ModalReporte_2";
import { Link } from "react-router-dom";
import URL from "../../configuration/URL";
import Chip from "@material-ui/core/Chip";
import { useHistory } from "react-router-dom";
import Alerta from "../../components/Alerts/Alerta";
import jsPDF from "jspdf";
import valorToken from "../../configuration/valorToken";
import "jspdf-autotable";


const columns = [
  {
    title: "#",
    render: (rowData) => rowData.tableData.id + 1,
  },
  {
    title: "parcela",
    field: "numero",
  },
  {
    title: "afectacion",
    field: "nombre_afectacion",
  },
  {
    title: "fecha",
    field: "fecha",
  },
  {
    title: "observacion",
    field: "observacion",
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

const ListaAfectacionParcela = () => {

  const token = valorToken()

  const [listaProducto, setListaProducto] = useState([]);
  const [listaPDF, setListaPDF] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [listaAfectacionParcela, setListaAfectacionParcela] = useState([]);
  const [buscarProducto, setBuscarProducto] = useState([]);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [editarAfectacionParcela, setEditarAfectacionParcela] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState({
    id: 0,
    nombre_producto: "",
    decripcion: "",
  });
  const [modalReporte, setModalReporte] = useState(false);
  const [afectacionparcelaSeleccionado, setAfectacionParcelaSeleccionado] =
    useState({
      numero: 0,
      nombre_afectacion: "",
      fecha: Date,
      observacion: "",
      estado: 0,
    });

  async function buscarAfectacionParcela(identificador) {
    try {
      let response = await fetch(
        `${URL}/buscarAfectacionParcelax/${identificador}`, {
           headers: 
        {
          Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
        }
        });
      response = await response.json();
      setEditarAfectacionParcela(response.data[0]);
      console.log(editarAfectacionParcela);
    } catch (error) {
      console.log(error);
    }
    listaAPProductospro(editarAfectacionParcela.id);
    pdfActividades();
  }

  const seleccionarAfectacionParcela = (afectacionparcela, caso) => {
    setAfectacionParcelaSeleccionado(afectacionparcela);

    if (caso === "Eliminar") {
      abrirCerrarModalEliminar();
    } else {
      abrirCerrarModalEditar();
    }
  };
  const pdfActividades = () => {
    const doc = new jsPDF();
    let hoy = new Date();
    let esta = "";
    let calcular = 0.0;
    if (editarAfectacionParcela.estado === 0) {
      esta = "Tarea Concluida";
    } else {
      esta = "Tarea Pendiente";
    }
    listaPDF.map((iten, index) => {
      calcular = calcular + iten.total_parcial;
    });

    let fechaActual =
      hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    doc.text("Reporte de productos", 74, 10); //le damos las coordenadas x = 70, y = 10
    doc.text("Fecha de reporte: " + `${fechaActual}`, 10, 20);
    doc.text("Persona a cargo: " + usuario, 114, 20);

    doc.text("Detalle de la zona afectada", 10, 30); //le damos las coordenadas x = 70, y = 10
    doc.text(
      "____________________________________________________________",
      10,
      40
    ); //le damos las coordenadas x = 70, y = 10
    doc.text(
      "Fecha de afectacion: " + `${editarAfectacionParcela.fecha}`,
      10,
      50
    );
    doc.text("Parcela: " + editarAfectacionParcela.numero, 10, 60);
    doc.text(
      "Afectacion: " + editarAfectacionParcela.nombre_afectacion,
      60,
      60
    );
    doc.text("Estado: " + esta, 140, 60);
    doc.text("Observacion: " + editarAfectacionParcela.observacion, 10, 70);

    doc.autoTable({
      startY: 80,
      styles: {
        halign: "center",
      },
      head: [["#", "Producto", "Cantidad", "Precio", "Total"]],
      body: listaPDF.map((lista, index) => [
        index + 1,
        lista.nombre,
        lista.cantidad,
        lista.costo,
        lista.total_parcial,
      ]),
    });
    doc.text(
      "____________________________________________________________",
      10,
      260
    );
    doc.text("Total: " + calcular, 140, 270);
    let fechaActual2 =
      hoy.getFullYear() + "_" + (hoy.getMonth() + 1) + "_" + hoy.getDate();
    doc.save("reporteActividades" + `${fechaActual2}` + ".pdf");
  };

  //metodo para editar
  const history = useHistory();
  const listaAPProductospro = async (id_1) => {
    try {
      let response = await fetch(
        `${URL}/buscarAfectacionParcelaProductox/${id_1}`, {
             headers: 
        {
          Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
        }
        }
      );
      response = await response.json();
      setListaPDF(response.data);
      console.log(id_1);
    } catch (error) {
      console.log(error);
    }
  };

  const listaAPProductos = async (id_1) => {
    try {
      let response = await fetch(
        `${URL}/buscarAfectacionParcelaProductox/${id_1}`, {
           headers: 
        {
          Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
        }
        });
      response = await response.json();
      console.log(id_1);

      if (response.data.length > 0) {
        history.push(`/actividades/actividades/${id_1}/editarAPProducto`);
      } else {
        Alerta.fire({
          icon: "info",
          title: "Para editar agregar productos",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const agregarValidacion = async (id) => {
    try {
      let response = await fetch(
        `${URL}/buscarAfectacionParcelaProductox/${id}`, {
           headers: 
        {
          Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
        }
        });
      response = await response.json();
      console.log(response.data);
      if (response.data.length > 0) {
        Alerta.fire({
          icon: "info",
          title:
            "Ya tiene poductos agregados para agregar mas debe editar los productos",
        });
      } else {
        history.push(`/actividades/actividades/${id}/agregarAPProducto`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateClick = (id) => {
    history.push(`/actividades/actividades/${id}/editarAfectacionparcela`);
  };
  const handleInsertClick = (id) => {
    agregarValidacion(id);
  };

  const handleeditClick = (id) => {
    listaAPProductos(id);
  };
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };
  const abrirCerrarModalReporte = () => {
    setModalReporte(!modalReporte);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  useEffect(() => {
    const abortController = new AbortController();

    //LISTAR AfectacionParcela
    const listaAfectacionParcelas = async () => {
      try {
        let response = await fetch(`${URL}/listaAfectacionParcela`, {
          signal: abortController.signal,
           headers: {
            Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
          },
        });
        response = await response.json();
        setListaAfectacionParcela(response.data);
        setListaPDF(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    listaAfectacionParcelas();
    return () => abortController.abort();
  }, []);

  return (
    <>
      <Navbar nombre="Zona Afectada">
        <div className="container-fluid px-4">
          <div className="row">
            <div className="col-auto">
              <Link
                to="/actividades/actividades/agregarAfectacionParcela"
                className="btn btn-primary btn-sm"
              >
                <i className="fas fa-plus-circle "></i> Nueva Actividad
              </Link>
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
                data={listaAfectacionParcela}
                title="Lista de las zonas afectadas"
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
                      seleccionarAfectacionParcela(rowData, "Eliminar"),
                  },
                  {
                    icon: "add",
                    tooltip: "Inserta una coreccion",
                    onClick: (event, rowData) => handleInsertClick(rowData.id),
                  },
                  {
                    icon: "search",
                    tooltip: "Editar lista de productos",
                    onClick: (event, rowData) => handleeditClick(rowData.id),
                  },
                  {
                    icon: "folder",
                    tooltip: "Reporte de afectaciones individual",
                    onClick: (event, rowData) =>
                      buscarAfectacionParcela(rowData.id),
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
      <ModalAgregarAfectacionParcela
        setAfectacionParcelaSeleccionado={setAfectacionParcelaSeleccionado}
        afectacionparcelaSeleccionado={afectacionparcelaSeleccionado}
        listaAfectacionParcela={listaAfectacionParcela}
        setListaAfectacionParcela={setListaAfectacionParcela}
        abrirCerrarModalInsertar={abrirCerrarModalInsertar}
        modalInsertar={modalInsertar}
      />

      <ModalEditarAfectacionParcela
        setAfectacionParcelaSeleccionado={setAfectacionParcelaSeleccionado}
        afectacionparcelaSeleccionado={afectacionparcelaSeleccionado}
        abrirCerrarModalEditar={abrirCerrarModalEditar}
        modalEditar={modalEditar}
        listaAfectacionParcela={listaAfectacionParcela}
        setListaAfectacionParcela={setListaAfectacionParcela}
      />
      <ModalEliminarAfectacionParcela
        afectacionparcelaSeleccionado={afectacionparcelaSeleccionado}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        modalEliminar={modalEliminar}
        listaAfectacionParcela={listaAfectacionParcela}
        setListaAfectacionParcela={setListaAfectacionParcela}
      />
      <ModalReporte_2
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

export default ListaAfectacionParcela;
