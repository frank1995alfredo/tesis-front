
import { Button } from "@material-ui/core";
import Modal from "../../components/Modals/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import URL from "../../configuration/URL";

const ModalEliminarAfectacionParcela = ({
  afectacionparcelaSeleccionado,
  modalEliminar,
  abrirCerrarModalEliminar,
  listaAfectacionParcela,
  setListaAfectacionParcela
 
}) => {

  const eliminarAfectacionParcela = async () => {

    await axios.delete(`${URL}/eliminarAfectacionParcela/` + afectacionparcelaSeleccionado.id)
    
      .then((response) => {
        setListaAfectacionParcela(
          listaAfectacionParcela.filter((afectacionparcela) => afectacionparcela.id !== afectacionparcelaSeleccionado.id)
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
        <b>{afectacionparcelaSeleccionado.numero}</b>?{" "}
      </p>
      <div align="right">
        <Button
          size="small" 
          variant="contained"
          color="primary"
          onClick={() => eliminarAfectacionParcela()}
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

export default ModalEliminarAfectacionParcela;

