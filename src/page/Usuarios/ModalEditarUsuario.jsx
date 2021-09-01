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

const ModalEditarUsuario = ({
  modalEditar,
  abrirCerrarModalEditar,
  usuarioSeleccionado,
  setUsuarioSeleccionado,

}) => {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const styles = useStyles();

  return (
    <Modal open={modalEditar} close={abrirCerrarModalEditar}>
      <h3>Editar Usuario</h3>
      <TextField
        className={styles.inputMaterial}
        label="Usuario"
        name="usuario"
        onChange={handleChange}
        value={usuarioSeleccionado.usuario}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Contraseña"
        name="password"
        onChange={handleChange}
        value={usuarioSeleccionado.password}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="nombre"
        onChange={handleChange}
        value={usuarioSeleccionado.nombre}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Apellido"
        name="apellido"
        onChange={handleChange}
        value={usuarioSeleccionado.apellido}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Cédula"
        name="cedula"
        onChange={handleChange}
        value={usuarioSeleccionado.cedula}
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

export default ModalEditarUsuario;
