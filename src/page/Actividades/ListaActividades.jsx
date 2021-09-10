import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { green } from "@material-ui/core/colors";
import Navbar from "../../components/Navbar/Navbar";
import ModalEliminarActividad from "./ModalEliminarActividad";
import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";
import URL from "../../configuration/URL";

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

const data = [
  {
    id: 1,
    nombre: "nuevo",
    numero: 4,
    nombre_recurso: "recurso nuevo",
    fecha_inicio: "2021-09-05",
    fecha_fin: "2021-12-08",
    avance: "25%",
    total_actividad: 280.95,
    estado: 1
  },
];

const ListaActividades = () => {
  const [listaActividad, setListaActividad] = useState([]);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [actividadSeleccionada, setActividadSeleccionada] = useState({
    id: 0,
    nombre: "",
    numero: "",
    fecha_inicio: "",
    fecha_fin: "",
    avance: "",
    total_actividad: 0.0
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

  useEffect(() => {
    const abortController = new AbortController();
    
    //LISTAR AFECTACION
    const listaActividad = async () => {
      try {
        let response = await fetch(`${URL}/listaActividad`, {
          signal: abortController.signal,
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

    listaActividad();
    return () => abortController.abort();
  }, []);

 
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
                    onClick: (event, rowData) =>
                      seleccionarActividad(rowData, "Editar"),
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
