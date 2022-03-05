
import { Button } from "@material-ui/core";
import Modal from "../../components/Modals/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import URL from "../../configuration/URL";
import valorToken from "../../configuration/valorToken";

const ModalEliminarLabor = ({
  laborSeleccionado,
  modalEliminar,
  abrirCerrarModalEliminar,
  listaLabor,
  setListaLabor
 
}) => {

  const token = valorToken()
 
  const eliminarLabor = async () => {

    await axios.delete(`${URL}/eliminarTipoLabor/` + laborSeleccionado.id, {
      headers: 
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
        }
    })
      .then((response) => {
        setListaLabor(
          listaLabor.filter((labor) => labor.id !== laborSeleccionado.id)
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
        Está seguro que desea eliminar el labor{" "}
        <b>{laborSeleccionado.nombre}</b>?{" "}
      </p>
      <div align="right">
        <Button
          size="small" 
          variant="contained"
          color="primary"
          onClick={() => eliminarLabor()}
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

export default ModalEliminarLabor;
