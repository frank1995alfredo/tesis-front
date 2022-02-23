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

const ModalAgregarAfectacionParcela = ({
  modalInsertar,
  abrirCerrarModalInsertar,
  setAfectacionParcelaSeleccionado,
  afectacionparcelaSeleccionado,
  listaAfectacionParcela,
  setListaAfectacionParcela
}) => {
  const styles = useStyles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAfectacionParcelaSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const agregarAfectacionParcela = async () => {
    await axios
      .post(`${URL}/crearAfectacionParcela`, afectacionparcelaSeleccionado)
      .then((response) => {
        setListaAfectacionParcela(listaAfectacionParcela.concat(response.data.data[0]));
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
      <h3>Nueva afectacionparcela</h3>
      <TextField
        className={styles.inputMaterial}
        label="parcela"
        name="numero"
        onChange={handleChange}
      />
      
      <br />
      <TextField
        className={styles.inputMaterial}
        label="afectacion"
        name="nombre_afectacion"
        onChange={handleChange}
      />
      
      <br />
      <TextField
        className={styles.inputMaterial}
        label="fecha"
        name="fecha"
        onChange={handleChange}
      />
      
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Observacion"
        name="observacion"
        onChange={handleChange}
      />
      
      <br />
      <br />
      <div align="right">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => agregarAfectacionParcela()}
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

export default ModalAgregarAfectacionParcela;