import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../components/Modals/Modal";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import URL from "../../configuration/URL";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import valorToken from "../../configuration/valorToken";

const useStyles = makeStyles((theme) => ({
  inputMaterial: {
    width: "100%",
  },
}));

const ModalAgregarLabor = ({
  modalInsertar,
  abrirCerrarModalInsertar,
  setLaborSeleccionado,
  laborSeleccionado,
  listaLabor,
  setListaLabor
}) => {

  const token = valorToken()
  
  const styles = useStyles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaborSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const agregarLabor = async () => {
    await axios
      .post(`${URL}/crearTipoLabor`, laborSeleccionado, {
        headers: 
        {
          Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
        }
      })
      .then((response) => {
        setListaLabor(listaLabor.concat(response.data.data[0]));
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
      <h3>Nueva Labor</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="nombre"
        onChange={handleChange}
      />
      
      <br />
      <br />
      <div align="right">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => agregarLabor()}
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

export default ModalAgregarLabor;
