import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { green } from "@material-ui/core/colors";
import Navbar from "../../components/Navbar/Navbar";
import ModalEliminarActividad from "./ModalEliminarActividad";
import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";
import URL from "../../configuration/URL";
import { useHistory } from "react-router-dom";
import axios from "axios";
import valorToken from "../../configuration/valorToken";
import jsPDF from "jspdf";
import "jspdf-autotable";

const columns = [
  {
    title: "#",
    render: (rowData) => rowData.tableData.id + 1,
  },
  {
    title: "Tipo Labor",
    field: "nombre",
  },
  {
    title: "Parcela",
    field: "numero",
  },
  {
    title: "Recurso",
    field: "recurso",
  },
  {
    title: "Fecha Inicio",
    field: "fecha_inicio",
  },
  {
    title: "Fecha Fin",
    field: "fecha_fin",
  },
  {
    title: "Avance",
    field: "avance",
  },
  {
    title: "Total",
    field: "total_actividad",
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

const ListaActividades = () => {
  const token = valorToken();

  const [listaActividad, setListaActividad] = useState([]);
  const [listaPDF, setListaPDF] = useState([]);
  const [listaPDFAnio, setListaPDFAnio] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [listaAnio, setListaAnio] = useState([]);
  const [anio, setAnio] = useState({ anio: null });

  //reporte en pdf de la lista de actividades
  const pdfActividades = () => {

    let suma = 0
    const sumaTotal = () => {   
      listaPDF.map(lista => suma += lista.total_parcial_recurso)
      return suma
    }

    const doc = new jsPDF();
    let hoy = new Date();
    let fechaActual =
      hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    doc.text("Reporte de actividades", 74, 10); //le damos las coordenadas x = 70, y = 10
    doc.text("Fecha: " + `${fechaActual}`, 10, 20);
    doc.text("Persona a cargo: " + usuario, 114, 20);
    
    doc.autoTable({
      startY: 30,
      styles: {
        halign: "center",
      },
      head: [["#", "Labor", "Trabajador", "Recurso", "Total Recurso", "Anio"]],
      body: listaPDF.map((lista, index) => [
        index + 1,
        lista.labor,
        lista.trabajador,
        lista.recurso,
        `$`+lista.total_parcial_recurso,
        lista.anio
      ]),
    });

    let finalY = (doc).lastAutoTable.finalY;
    doc.text("Gran total recurso: $" + `${sumaTotal()}`, 110, finalY + 10);

    let fechaActual2 =
      hoy.getFullYear() + "_" + (hoy.getMonth() + 1) + "_" + hoy.getDate();
    doc.save("reporteActividades" + `${fechaActual2}` + ".pdf");
  };

  const [modalEliminar, setModalEliminar] = useState(false);
  const [actividadSeleccionada, setActividadSeleccionada] = useState({
    id: 0,
    nombre: "",
    numero: "",
    fecha_inicio: "",
    fecha_fin: "",
    avance: "",
    total_actividad: 0.0,
  });


  const seleccionarActividad = (actividad, caso) => {
    setActividadSeleccionada(actividad);

    if (caso === "Eliminar") {
      abrirCerrarModalEliminar();
    } else {
      return;
    }
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

 


  const pdfAnio2 = (anio1) => {

    let suma = 0
    const sumaTotal = () => {   
      listaPDF.filter(list => list.anio === anio1).map(lista => suma += lista.total_parcial_recurso)
      return suma
    }

    const doc = new jsPDF();
    let hoy = new Date();
    let fechaActual =
    hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    doc.text("Reporte de actividades", 74, 10); //le damos las coordenadas x = 70, y = 10
    doc.text("Fecha: " + `${fechaActual}`, 10, 20);
    doc.text("Persona a cargo: " + usuario, 114, 20);    
    doc.autoTable({
      startY: 30,
      styles: {
        halign: "center",
      },
      head: [["#", "Labor", "Trabajador", "Recurso", "Total Recurso", "Año"]],
      body: listaPDF.filter(list => list.anio === anio1).map((lista, index) => [
        index + 1,
        lista.labor,
        lista.trabajador,
        lista.recurso,
        `$`+lista.total_parcial_recurso,
        lista.anio,
      ]), 
    });
   
    let finalY = (doc).lastAutoTable.finalY;
    doc.text("Gran total recurso: $" + `${sumaTotal()}`, 110, finalY + 10);

    let fechaActual2 =
      hoy.getFullYear() + "_" + (hoy.getMonth() + 1) + "_" + hoy.getDate();
    doc.save("reporteActividades" + `${fechaActual2}` + ".pdf");
  }

 
  useEffect(() => {
    const abortController = new AbortController();

    //LISTAR ACTIVIDAD
    const listaActividad = async () => {
      try {
        let response = await fetch(`${URL}/listaActividad`, {
          signal: abortController.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
          },
        });

        response = await response.json();

        setListaActividad(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    //LISTAR ACTIVIDAD
    const listaActividadPDF = async () => {
      try {
        let response = await fetch(`${URL}/listaActividadPDF`, {
          signal: abortController.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
          },
        });

        response = await response.json();

        setListaPDF(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    //USUARIO ACTUAL
    const usuarioActual = async () => {
      try {
        let response = await fetch(`${URL}/usuarioActual`, {
          signal: abortController.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
          },
        });

        response = await response.json();
        setUsuario(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    const listaAnios = async () => {
      try {
        let response = await fetch(`${URL}/listaActividadAnio`, {
          signal: abortController.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
          },
        });

        response = await response.json();

        setListaAnio(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    listaActividad();
    listaActividadPDF();
    usuarioActual();
    listaAnios();
   

    return () => abortController.abort();
  }, []);

  //metodo para editar
  const history = useHistory();
  const handleUpdateClick = (id) => {
    history.push(`/actividades/actividades/${id}/editarActividad`);
  };

  return (
    <>
      <Navbar nombre="Actividades">
        <div className="container-fluid px-4">
          <div className="row">
            <div className="col-auto">
              <Link
                to="/actividades/actividades/agregarActividad"
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
                onClick={pdfActividades}
              >
                Reporte Total
              </button>
            </div>

            <div className="col-auto">
              <div class="dropdown">
                <a
                  class="btn btn-secondary  btn-sm dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Reportes anuales
                </a>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  {listaAnio.map((anio, index) => (
                      <a class="dropdown-item" key={index} onClick={() => pdfAnio2(anio.anio)}>
                           Reporte del {anio.anio}
                     </a>
                  ))}
                  </li>
              
                </ul>
              </div>
            </div>
          </div>
          <div className="row my-4">
            <div className="col">
              <MaterialTable
                columns={columns}
                data={listaActividad}
                title="Lista de Actividades"
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Editar Actividad",
                    onClick: (event, rowData) => handleUpdateClick(rowData.id),
                  },
                  {
                    icon: "delete",
                    tooltip: "Eliminar Actividad",
                    onClick: (event, rowData) =>
                      seleccionarActividad(rowData, "Eliminar"),
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
      <ModalEliminarActividad
        actividadSeleccionada={actividadSeleccionada}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        modalEliminar={modalEliminar}
        listaActividad={listaActividad}
        setListaActividad={setListaActividad}
      />
    </>
  );
};

export default ListaActividades;
