import { useState, useEffect, useRef } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../components/Modals/Modal";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from '@material-ui/icons/Edit';
import URL from "../../configuration/URL";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";

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
  listaUsuarios,
  setListaUsuarios

}) => {

  const initialFormState = {
    id: null,
    nombre: "",
    apellido: "",
    usuario: "",
    password: "",
    cedula: ""
  };
  
  const [editarUsuario, setEditarUsuario] = useState(initialFormState);
  const countRef = useRef(0);
  const buscarUsuario = async () => {
    
      try {
        await axios.get(`${URL}/buscarUsuario/${usuarioSeleccionado.id}`, {}).then((response) => {
          setEditarUsuario({
            nombre: response.data.data[0].nombre,
            apellido: response.data.data[0].apellido,
            usuario: response.data.data[0].usuario,
            cedula: response.data.data[0].cedula,
            password: response.data.data[0][0],
          });
          console.log(response.data.data[0])
        });
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    if(usuarioSeleccionado.id === 0){
      return
    } else {
      buscarUsuario()
    }
    
  }, [countRef]);

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
        value={editarUsuario.usuario}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Contraseña"
        name="password"
        onChange={handleChange}
        value={editarUsuario.password}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="nombre"
        onChange={handleChange}
        value={editarUsuario.nombre}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Apellido"
        name="apellido"
        onChange={handleChange}
        value={editarUsuario.apellido}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Cédula"
        name="cedula"
        onChange={handleChange}
        value={editarUsuario.cedula}
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
