
import { Button } from "@material-ui/core";
import Modal from "../../components/Modals/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import URL from "../../configuration/URL";
import valorToken from "../../configuration/valorToken";

const ModalEliminarUsuario = ({
  usuarioSeleccionado,
  modalEliminar,
  abrirCerrarModalEliminar,
  listaUsuarios,
  setListaUsuarios
 
}) => {

  const token = valorToken()

  const eliminarUsuario = async () => {

    await axios.delete(`${URL}/eliminarUsuario/` + usuarioSeleccionado.id, {
      headers: 
        {
          Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
        }
    })
      .then((response) => {
        setListaUsuarios(
          listaUsuarios.filter((usuario) => usuario.id !== usuarioSeleccionado.id)
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
        Está seguro que desea eliminar al usuario{" "}
        <b>{usuarioSeleccionado.usuario}</b>?{" "}
      </p>
      <div align="right">
        <Button
          size="small" 
          variant="contained"
          color="primary"
          onClick={() => eliminarUsuario()}
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

export default ModalEliminarUsuario;
