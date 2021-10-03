import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../components/Modals/Modal";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from '@material-ui/icons/Edit';
import URL from "../../configuration/URL";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import valorToken from "../../configuration/valorToken";

const useStyles = makeStyles((theme) => ({
  inputMaterial: {
    width: "100%",
  },
}));

const ModalEditarParcela = ({
  modalEditar,
  abrirCerrarModalEditar,
  parcelaSeleccionado,
  setParcelaSeleccionado,
  listaParcela,
  setListaParcela

}) => {

  const token = valorToken()
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParcelaSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const styles = useStyles();

  const editarParcela = async() => {
    await axios.put(`${URL}/editarParcela/`+ parcelaSeleccionado.id, parcelaSeleccionado, {
      headers: 
      {
        Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
      }
    })
    .then(response => {
      let parcelaNuevo = listaParcela;
      parcelaNuevo.map(parcela => {
        if(parcela.id === parcelaSeleccionado.id) {
          parcela.numero = parcelaSeleccionado.numero;
          parcela.extencion = parcelaSeleccionado.extencion;
          parcela.descripcion = parcelaSeleccionado.descripcion;
        }
      });
      setListaParcela(parcelaNuevo);
      Alerta.fire({
        icon: "success",
        title: "Registro editado.",
      });
      abrirCerrarModalEditar();
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <Modal open={modalEditar} close={abrirCerrarModalEditar}>
      <h3>Editar Parcela</h3>
      <TextField
        className={styles.inputMaterial}
        label="Numero"
        name="numero"
        value={parcelaSeleccionado.numero}
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Extencion"
        name="extencion"
        value={parcelaSeleccionado.extencion}
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Descripcion"
        name="descripcion"
        value={parcelaSeleccionado.descripcion}
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => editarParcela()}
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

export default ModalEditarParcela;
