import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../components/Modals/Modal";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
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

const ModalAgregarRecursos = ({
  modalInsertar,
  abrirCerrarModalInsertar,
  setRecursosSeleccionado,
  recursosSeleccionado,
  listaRecurso,
  setListaRecurso
}) => {

  
  const token = valorToken()

  const styles = useStyles();



  const validacionLetra = (e) => {
    
    const { name, value } = e.target;
    
    if(soloLetras(e)) {
      setRecursosSeleccionado((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    
  }

  const agregarRecurso = async () => {
   
    if((validacionEntrada(recursosSeleccionado.nombre)) || (validacionEntrada(recursosSeleccionado.caracteristica))) {
      Alerta.fire({
        icon: "error",
        title: "LLene todos los campos.",
      });
    } else {
      await axios.post(`${URL}/crearRecurso`, recursosSeleccionado, {
        headers: 
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
        }
      })
      .then((response) => {
        setListaRecurso(listaRecurso.concat(response.data.data[0]));
        Alerta.fire({
          icon: "success",
          title: "Registro agregado.",
        });
        setRecursosSeleccionado("")
        abrirCerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
    }  
  };


  return (
    <Modal open={modalInsertar} close={abrirCerrarModalInsertar}>
      <h3>Nuevo Recursos</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="nombre"
        value={recursosSeleccionado.nombre}
        onChange={validacionLetra}
      />
      
      <br />
      
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Descripcion"
        name="caracteristica"
        value={recursosSeleccionado.caracteristica}
        onChange={validacionLetra}
      />
      
      <br />
      <br />
      <div align="right">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => agregarRecurso()}
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

export default ModalAgregarRecursos;