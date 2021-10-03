
import { Button } from "@material-ui/core";
import Modal from "../../components/Modals/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import URL from "../../configuration/URL";

const ModalEliminarAPProducto = ({
  approductoSeleccionado,
  modalEliminar,
  abrirCerrarModalEliminar,
  listaAPProducto,
  setListaAPProducto
 
}) => {

  const eliminarAPProducto = async () => {

    await axios.delete(`${URL}/eliminarAfectacionParcelaProducto/` + approductoSeleccionado.id)
    
      .then((response) => {
        setListaAPProducto(
          listaAPProducto.filter((approducto) => approducto.id !== approductoSeleccionado.id)
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
        <b>{approductoSeleccionado.numero}</b>?{" "}
      </p>
      <div align="right">
        <Button
          size="small" 
          variant="contained"
          color="primary"
          onClick={() => eliminarAPProducto()}
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

export default ModalEliminarAPProducto;