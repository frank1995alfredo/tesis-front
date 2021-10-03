

import { Button } from "@material-ui/core";
import Modal from "../../components/Modals/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import URL from "../../configuration/URL";
import valorToken from "../../configuration/valorToken";

const ModalEliminarRecursos = ({
  recursosSeleccionado,
  modalEliminar,
  abrirCerrarModalEliminar,
  listaRecurso,
  setListaRecurso
 
}) => {

  const token = valorToken()

  const eliminarRecurso = async () => {

    await axios.delete(`${URL}/eliminarRecurso/` + recursosSeleccionado.id, {
      headers: 
      {
        Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
      }
    })
      .then((response) => {
        setListaRecurso(
          listaRecurso.filter((recurso) => recurso.id !== recursosSeleccionado.id)
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
        Está seguro que desea eliminar el recursos{" "}
        <b>{recursosSeleccionado.nombre}</b>?{" "}
      </p>
      <div align="right">
        <Button
          size="small" 
          variant="contained"
          color="primary"
          onClick={() => eliminarRecurso()}
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

export default ModalEliminarRecursos;