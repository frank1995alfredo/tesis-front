
import { Button } from "@material-ui/core";
import Modal from "../../components/Modals/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import URL from "../../configuration/URL";

const ModalEliminarParcela = ({
  parcelaSeleccionado,
  modalEliminar,
  abrirCerrarModalEliminar,
  listaParcela,
  setListaParcela
 
}) => {

  const eliminarParcela = async () => {

    await axios.delete(`${URL}/eliminarParcela/` + parcelaSeleccionado.id)
      .then((response) => {
        setListaParcela(
          listaParcela.filter((parcela) => parcela.id !== parcelaSeleccionado.id)
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
        Está seguro que desea eliminar el parcela{" "}
        <b>{parcelaSeleccionado.numero}</b>?{" "}
      </p>
      <div align="right">
        <Button
          size="small" 
          variant="contained"
          color="primary"
          onClick={() => eliminarParcela()}
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

export default ModalEliminarParcela;