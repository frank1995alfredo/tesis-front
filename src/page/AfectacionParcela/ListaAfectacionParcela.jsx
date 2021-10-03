import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Navbar from "../../components/Navbar/Navbar";
import { green, red } from "@material-ui/core/colors";
import ModalEliminarAfectacionParcela from "./ModalEliminarAfectacionParcela";
import { Link } from "react-router-dom";
import URL from "../../configuration/URL";
import Chip from "@material-ui/core/Chip";
import { useHistory } from "react-router-dom";
import valorToken from "../../configuration/valorToken";
import jsPDF from "jspdf";

const columns = [
  {
    title: "#",
    render: (rowData) => rowData.tableData.id + 1,
  },
  {
    title: "Parcela",
    field: "numero",
  },
  {
    title: "Afectación",
    field: "nombre_afectacion",
  },
  {
    title: "Fecha",
    field: "fecha",
  },
  {
    title: "Observación",
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
  
  const [listaAfectacionParcela, setListaAfectacionParcela] = useState([]);


  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [afectacionparcelaSeleccionado, setAfectacionParcelaSeleccionado] = useState({
    id: 0,
    numero: 0,
    nombre_afectacion: "",
    fecha: Date,
    observacion: "",
    estado: 0,
  });

  const [listaPDF, setListaPDF] = useState([]);
  const [usuario, setUsuario] = useState([]);


  //reporte en pdf de la lista de afectaciones
  const pdfAfectacion = () => {
    const doc = new jsPDF();
    let hoy = new Date();
    let fechaActual =
      hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    doc.text("Reporte de afectaciones", 74, 10); //le damos las coordenadas x = 70, y = 10
    doc.text("Fecha: " + `${fechaActual}`, 10, 20);
    doc.text("Persona a cargo: " + usuario, 114, 20)
    doc.autoTable({
      startY: 30,
      styles: {
        halign: 'center'
    },
      head: [["#", "Número Parcela", "Afectación", "Producto Usado", "Fecha Fumigación"]],
      body: listaPDF.map((lista, index) => [
        index + 1,
        lista.numero,
        lista.nombre_afectacion,
        lista.nombre,
        lista.fecha
      ]),
    });
    let fechaActual2 =
      hoy.getFullYear() + "_" + (hoy.getMonth() + 1) + "_" + hoy.getDate();
    doc.save("reporteAfectaciones" + `${fechaActual2}` + ".pdf");
  };

  const seleccionarAfectacionParcela = (afectacionparcela, caso) => {
    setAfectacionParcelaSeleccionado(afectacionparcela);

    if (caso === "Eliminar") {
      abrirCerrarModalEliminar();
    } else{
      abrirCerrarModalEditar();
    }
    
  };
  //metodo para editar
  const history = useHistory();
  const handleUpdateClick = (id) => {
    history.push(`/actividades/afectacionParcela/${id}/editarAfectacionparcela`);
  };
  const handleInsertClick = (id) => {
    history.push(`/actividades/afectacionParcela/${id}/agregarAPProducto`);
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
    const listaAfectacionParcelas = async () => {
      try {
        let response = await fetch(`${URL}/listaAfectacionParcela`, {
          signal: abortController.signal,
          headers: 
          {
            Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
          }
        });
        response = await response.json();
        setListaAfectacionParcela(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }

    };

    //LISTAR AfectacionParcela
    const listaAfectacionParcelasPDF = async () => {
      try {
        let response = await fetch(`${URL}/listaAfectacionPDF`, {
          signal: abortController.signal,
          headers: 
          {
            Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
          }
        });
        response = await response.json();
        setListaPDF(response.data);
        setUsuario(response.usuario)
        console.log(response.usuario)
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    listaAfectacionParcelas();
    listaAfectacionParcelasPDF();
    
    return () => abortController.abort();
  }, []);

  return (
    <>
      <Navbar nombre="Zona Afectada">
        <div className="container-fluid px-4">
          <div className="row">
            <div className="col-auto">
            <Link
                to="/actividades/afectacionParcela/agregarAfectacionParcela"
                className="btn btn-primary btn-sm"
              >
                <i className="fas fa-plus-circle "></i> Nueva Actividad
              </Link>
            </div>
            <div className="col-auto">
            <Link
                to="/actividades/afectacionParcela/ListaAPProducto"
                className="btn btn-primary btn-sm"
              >
                <i className="fas fa-eye "></i> Ver Corecciones
              </Link>
            </div>
            <div className="col-auto">
            {" "}
              <Link to="/actividades" type="button" className="btn btn-secondary btn-sm">
                <i class="fas fa-arrow-left"></i> Regresar
              </Link>
            </div>
            <div className="col-auto">
               <button className="btn btn-secondary btn-sm"  target="_blank" onClick={ pdfAfectacion } >
                   Reporte PDF
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
                    onClick: (event, rowData) =>
                      handleUpdateClick(rowData.id),
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
                    onClick: (event, rowData) =>
                    handleInsertClick(rowData.id),
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
     
     <ModalEliminarAfectacionParcela
        afectacionparcelaSeleccionado={afectacionparcelaSeleccionado}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        modalEliminar={modalEliminar}
        listaAfectacionParcela={listaAfectacionParcela}
        setListaAfectacionParcela={setListaAfectacionParcela}
       
      />
    </>
  );
};

export default ListaAfectacionParcela;