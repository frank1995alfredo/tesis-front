import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../components/Modals/Modal";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import URL from "../../configuration/URL";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import valorToken from "../../configuration/valorToken";
import soloNumeros from "../../configuration/soloNumeros";
import validacionEntrada from "../../configuration/validacionEntrada";

const useStyles = makeStyles((theme) => ({
  inputMaterial: {
    width: "100%",
  },
}));

const ModalAgregarParcela = ({
  modalInsertar,
  abrirCerrarModalInsertar,
  setParcelaSeleccionado,
  parcelaSeleccionado,
  listaParcela,
  setListaParcela
}) => {

  const token = valorToken()
  const styles = useStyles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParcelaSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const validacionNumero = (e) => {
   const { name, value } = e.target;
    if(soloNumeros(e)) {
      setParcelaSeleccionado((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }
  
  const agregarParcela = async () => {

    if((validacionEntrada(parcelaSeleccionado.numero)) || (validacionEntrada(parcelaSeleccionado.extencion)) ||
      (validacionEntrada(parcelaSeleccionado.descripcion))) {
      Alerta.fire({
        icon: "error",
        title: "LLene todos los campos.",
      });
    } else {
        await axios.post(`${URL}/crearParcela`, parcelaSeleccionado, {
        headers: 
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
        }
      })
      .then((response) => {
        setListaParcela(listaParcela.concat(response.data.data[0]));
        Alerta.fire({
          icon: "success",
          title: "Registro agregado.",
        });
        setParcelaSeleccionado("")
        abrirCerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <Modal open={modalInsertar} close={abrirCerrarModalInsertar}>
      <h3>Nuevo Parcela</h3>
      <TextField
        className={styles.inputMaterial}
        label="Numero"
        name="numero"
        value={parcelaSeleccionado.numero}
        onChange={validacionNumero}
      />
      
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Extencion"
        name="extencion"
        onChange={handleChange}
      />
      
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Descripcion"
        name="descripcion"
        onChange={handleChange}
      />
      
      <br />
      <br />
      <div align="right">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => agregarParcela()}
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

export default ModalAgregarParcela;
