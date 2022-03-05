

import { Button } from "@material-ui/core";
import Modal from "../../components/Modals/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import URL from "../../configuration/URL";
import valorToken from "../../configuration/valorToken";

const ModalEliminarProducto = ({
  productoSeleccionado,
  modalEliminar,
  abrirCerrarModalEliminar,
  listaProducto,
  setListaProducto
 
}) => {

  const eliminarProducto = async () => {

    const token = valorToken();
    await axios.delete(`${URL}/eliminarProducto/` + productoSeleccionado.id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
    },
    })
      .then((response) => {
        setListaProducto(
          listaProducto.filter((producto) => producto.id !== productoSeleccionado.id)
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
        <b>{productoSeleccionado.nombre}</b>?{" "}
      </p>
      <div align="right">
        <Button
          size="small" 
          variant="contained"
          color="primary"
          onClick={() => eliminarProducto()}
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
