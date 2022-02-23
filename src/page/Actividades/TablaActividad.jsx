
import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { green } from "@material-ui/core/colors";
import Navbar from "../../components/Navbar/Navbar";
import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";
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


const TablaActividad = () => {

  const [listaActividades, setListaActividades] = useState([]);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [actividadSeleccionada, setActividadSeleccionada] = useState({
    id: 0,
    nombre_afectacion: "",
    decripcion: "",
  });

  const seleccionarActividad = (actividad, caso) => {
    setActividadSeleccionada(actividad);

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

  const datosActividad = [
    {id: 1,nombre_actividad: "franklin", descripcion: "canadas", estado: 1},
    {id: 2,nombre_actividad: "franklin2", descripcion: "canadas2", estado: 1},
    {id: 3,nombre_actividad: "franklin3", descripcion: "canadas3", estado: 1},
  ]
  

  return (
    <>   
          <div className="row my-4">
            <div className="col">
              <MaterialTable
                columns={columns}
                data={datosActividad}
                title="Lista de Afectaciones"
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Editar Afectación",
                    onClick: (event, rowData) =>
                      seleccionarActividad(rowData, "Editar"),
                  },
                  {
                    icon: "delete",
                    tooltip: "Eliminar Afectación",
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
    
      
    </>
  );
};

export default TablaActividad;
