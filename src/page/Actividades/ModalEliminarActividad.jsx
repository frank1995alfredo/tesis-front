import { Button } from "@material-ui/core";
import Modal from "../../components/Modals/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import URL from "../../configuration/URL";
import valorToken from "../../configuration/valorToken";

const ModalEliminarActividad = ({
  actividadSeleccionada,
  modalEliminar,
  abrirCerrarModalEliminar,
  listaActividad,
  setListaActividad
 
}) => {

  const token = valorToken()


  const eliminarActividad = async () => {

    await axios.delete(`${URL}/eliminarActividad/` + actividadSeleccionada.id, {
      headers: 
      {
        Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
      }
    })
      .then((response) => {
        setListaActividad(
          listaActividad.filter((actividad) => actividad.id !== actividadSeleccionada.id)
        );
        Alerta.fire({
          icon: "success",
          title: "Registro eliminado.",
        });
        abrirCerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal open={modalEliminar} close={abrirCerrarModalEliminar}>
      <p>
        Está seguro que desea eliminar la actividad{" "}
        <b>{actividadSeleccionada.nombre}</b>?{" "}
      </p>
      <div align="right">
        <Button
          size="small" 
          variant="contained"
          color="primary"
          onClick={() => eliminarActividad()}
        >
          <DeleteIcon /> Eliminar{" "}
        </Button>{" "}
        <Button
          size="small" 
          variant="contained"
          color="secondary"
          onClick={() => abrirCerrarModalEliminar()}
        >
          <CancelIcon /> Cancelar
        </Button>
      </div>
    </Modal>
  );
};

export default ModalEliminarActividad;
