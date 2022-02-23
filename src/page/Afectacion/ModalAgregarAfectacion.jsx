import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../components/Modals/Modal";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import URL from "../../configuration/URL";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import valorToken from "../../configuration/valorToken";
import soloLetras from "../../configuration/soloLetras"


const useStyles = makeStyles((theme) => ({
  inputMaterial: {
    width: "100%",
  },
}));

const ModalAgregarAfectacion = ({
  modalInsertar,
  abrirCerrarModalInsertar,
  setAfectacionSeleccionado,
  afectacionSeleccionado,
  listaAfectacion,
  setListaAfectacion
}) => {

  const token = valorToken()

  const styles = useStyles();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(soloLetras(e)){
      setAfectacionSeleccionado((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
   
  };

  const agregarAfectacion = async () => {
    await axios
      .post(`${URL}/crearAfectacion`, afectacionSeleccionado, {
        headers: 
        {
          Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
        }
      })
      .then((response) => {
        setListaAfectacion(listaAfectacion.concat(response.data.data[0]));
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
      <h3>Nuevo Afectación</h3>
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
          onClick={() => agregarAfectacion()}
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

export default ModalAgregarAfectacion;
