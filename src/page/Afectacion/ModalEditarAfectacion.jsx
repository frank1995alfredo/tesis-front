import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../components/Modals/Modal";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from '@material-ui/icons/Edit';
import URL from "../../configuration/URL";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import valorToken from "../../configuration/valorToken";
import soloLetras from "../../configuration/soloLetras"
import validacionEntrada from "../../configuration/validacionEntrada";

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
  listaAfectacion,
  setListaAfectacion

}) => {

  const token = valorToken()
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    if(soloLetras(e)) {
      setAfectacionSeleccionado((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
 
  };
  const styles = useStyles();

  const editarAfectacion = async() => {

    if((validacionEntrada(afectacionSeleccionado.nombre_afectacion)) || (validacionEntrada(afectacionSeleccionado.descripcion))) {
      Alerta.fire({
        icon: "error",
        title: "LLene todos los campos.",
      });
    } else {

    await axios.put(`${URL}/editarAfectacion/`+ afectacionSeleccionado.id, afectacionSeleccionado, {
      headers: 
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
      }
    })
    .then(response => {
      let afectacionNuevo = listaAfectacion;
      afectacionNuevo.map(afectacion => {
        if(afectacion.id === afectacionSeleccionado.id) {
          afectacion.nombre_afectacion = afectacionSeleccionado.nombre_afectacion;
          afectacion.descripcion = afectacionSeleccionado.descripcion;
        }
      });
      setListaAfectacion(afectacionNuevo);
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
      <h3>Editar Afectaci??n</h3>
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
        label="Descripci??n"
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
          onClick={() => editarAfectacion()}
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
