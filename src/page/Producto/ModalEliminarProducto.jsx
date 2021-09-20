
import { Button } from "@material-ui/core";
import Modal from "../../components/Modals/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";

const ModalEliminarProducto = ({
  productoSeleccionado,
  modalEliminar,
  abrirCerrarModalEliminar,
}) => {

  return (
    <Modal open={modalEliminar} close={abrirCerrarModalEliminar}>
      <p>
        Está seguro que desea eliminar el producto{" "}
        <b>{productoSeleccionado.nombre}</b>?{" "}
      </p>
      <div align="right">
        <Button
          size="small" 
          variant="contained"
          color="primary"
         // onClick={() => eliminarCliente()}
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

export default ModalEliminarProducto;