
import { Button } from "@material-ui/core";
import Modal from "../../components/Modals/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import URL from "../../configuration/URL";
import valorToken from "../../configuration/valorToken";

const ModalEliminarAfectacion = ({
  afectacionSeleccionado,
  modalEliminar,
  abrirCerrarModalEliminar,
  listaAfectacion,
  setListaAfectacion
 
}) => {

  const token = valorToken()

  const eliminarAfectacion = async () => {

    await axios.delete(`${URL}/eliminarAfectacion/` + afectacionSeleccionado.id, {
      headers: 
        {
          Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
        }
    })
      .then((response) => {
        setListaAfectacion(
          listaAfectacion.filter((afectacion) => afectacion.id !== afectacionSeleccionado.id)
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
        Está seguro que desea eliminar la afectación{" "}
        <b>{afectacionSeleccionado.nombre_afectacion}</b>?{" "}
      </p>
      <div align="right">
        <Button
          size="small" 
          variant="contained"
          color="primary"
          onClick={() => eliminarAfectacion()}
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

export default ModalEliminarAfectacion;
