import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../components/Modals/Modal";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from '@material-ui/icons/Edit';
import URL from "../../configuration/URL";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import valorToken from "../../configuration/valorToken";
import soloLetras from "../../configuration/soloLetras";
import validacionEntrada from "../../configuration/validacionEntrada";

const useStyles = makeStyles((theme) => ({
  inputMaterial: {
    width: "100%",
  },
}));

const ModalEditarLabor = ({
  modalEditar,
  abrirCerrarModalEditar,
  laborSeleccionado,
  setLaborSeleccionado,
  listaLabor,
  setListaLabor

}) => {
  
  const token = valorToken()

  const handleChange = (e) => {
    
    if(soloLetras(e)) {
      const { name, value } = e.target;
      setLaborSeleccionado((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  
  };
  const styles = useStyles();


  const editarLabor = async() => {

    if((validacionEntrada(laborSeleccionado.nombre))) {
      Alerta.fire({
        icon: "error",
        title: "LLene todos los campos.",
      });
    } else {

    await axios.put(`${URL}/editarTipoLabor/`+ laborSeleccionado.id, laborSeleccionado, {
      headers: 
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
      }
    })
    .then(response => {
      let laborNuevo = listaLabor;
      laborNuevo.map(labor => {
        if(labor.id === laborSeleccionado.id) {
          labor.nombre = laborSeleccionado.nombre;
        }
      });
      setListaLabor(laborNuevo);
      Alerta.fire({
        icon: "success",
        title: "Registro editado.",
      });
      abrirCerrarModalEditar();
    }).catch(error => {
      console.log(error);
    })
  }
  }


  return (
    <Modal open={modalEditar} close={abrirCerrarModalEditar}>
      <h3>Editar Labor</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="nombre"
        value={laborSeleccionado.nombre}
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => editarLabor()}
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

export default ModalEditarLabor;
