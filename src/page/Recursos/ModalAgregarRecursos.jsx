import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../components/Modals/Modal";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import URL from "../../configuration/URL";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";

const useStyles = makeStyles((theme) => ({
  inputMaterial: {
    width: "100%",
  },
}));

const ModalAgregarRecursos = ({
  modalInsertar,
  abrirCerrarModalInsertar,
  setRecursosSeleccionado,
  recursosSeleccionado,
  listaRecurso,
  setListaRecurso
}) => {
  const styles = useStyles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecursosSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const agregarRecurso = async () => {
    await axios
      .post(`${URL}/crearRecurso`, recursosSeleccionado)
      .then((response) => {
        setListaRecurso(listaRecurso.concat(response.data.data[0]));
        Alerta.fire({
          icon: "success",
          title: "Registro agregado.",
        });
        abrirCerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <Modal open={modalInsertar} close={abrirCerrarModalInsertar}>
      <h3>Nuevo Recursos</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="nombre"
        onChange={handleChange}
      />
      
      <br />
      
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Descripcion"
        name="caracteristica"
        onChange={handleChange}
      />
      
      <br />
      <br />
      <div align="right">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => agregarRecurso()}
        >
          {" "}
          <AddCircleIcon />
          Insertar
        </Button>{" "}
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => abrirCerrarModalInsertar()}
        >
          <CancelIcon />
          Cancelar
        </Button>
      </div>
    </Modal>
  );
};

export default ModalAgregarRecursos;