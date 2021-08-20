import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../components/Modals/Modal";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  inputMaterial: {
    width: "100%",
  },
}));

const ModalEditarAfectacion = ({
  modalEditar,
  abrirCerrarModalEditar,
  afectacionSeleccionado,
  setAfectacionSeleccionado,

}) => {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAfectacionSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const styles = useStyles();

  return (
    <Modal open={modalEditar} close={abrirCerrarModalEditar}>
      <h3>Editar Afectación</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="nombre_afectacion"
        value={afectacionSeleccionado.nombre_afectacion}
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Descripción"
        name="descripcion"
        value={afectacionSeleccionado.descripcion}
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button
          variant="contained"
          color="primary"
          size="small"
          //onClick={() => editarCategoria()}
        >
          {" "}
          <EditIcon/>
          Editar
        </Button>{" "}
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => abrirCerrarModalEditar()}
        >
          <CancelIcon />
          Cancelar
        </Button>
      </div>
    </Modal>
  );
};

export default ModalEditarAfectacion;
