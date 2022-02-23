import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../components/Modals/Modal";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import URL from "../../configuration/URL";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import valorToken from "../../configuration/valorToken";
import soloLetras from "../../configuration/soloLetras";



const useStyles = makeStyles((theme) => ({
  inputMaterial: {
    width: "100%",
  },
}));

const ModalAgregarUsuario = ({
  modalInsertar,
  abrirCerrarModalInsertar,
  setUsuarioSeleccionado,
  usuarioSeleccionado,
  listaUsuarios,
  setListaUsuarios,
}) => {

  const token = valorToken()

  const styles = useStyles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validacionLetra = (e) => {
    
    const { name, value } = e.target;

    if(soloLetras(e)) {
      setUsuarioSeleccionado((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    
  }


  const agregarUsuario = async () => {
    await axios
      .post(`${URL}/agregarUsuario`, usuarioSeleccionado, {
        headers: 
        {
          Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
        }
      })
      .then((response) => {
        setListaUsuarios(listaUsuarios.concat(response.data.data[0]));
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

  const select = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(0),
      minWidth: 140,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classesSelect = select();
  return (
    <Modal open={modalInsertar} close={abrirCerrarModalInsertar}>
      <h3>Nuevo usuario</h3>
      <TextField
        className={styles.inputMaterial}
        label="Usuario"
        name="usuario"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Contraseña"
        name="password"
        type="password"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="nombre"
        value={usuarioSeleccionado.nombre}
        onChange={validacionLetra}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Apellido"
        name="apellido"
        value={usuarioSeleccionado.apellido}
        onChange={validacionLetra}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Cédula"
        name="cedula"
        onChange={handleChange}
      />
       <br />
      <TextField
        className={styles.inputMaterial}
        label="Email"
        name="email"
        onChange={handleChange}
      />
      <br />

      <FormControl className={classesSelect.formControl}>
        <InputLabel id="demo-simple-select-label">Tipo usuario</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="tipousuario"
          onChange={handleChange}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Trabajador">Trabajador</MenuItem>
        </Select>
      </FormControl>

      <br />
      <br />
      <div align="right">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => agregarUsuario()}
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

export default ModalAgregarUsuario;
