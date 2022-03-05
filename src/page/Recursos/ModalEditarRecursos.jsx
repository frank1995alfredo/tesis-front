import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../components/Modals/Modal";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from '@material-ui/icons/Edit';
import URL from "../../configuration/URL";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import valorToken from "../../configuration/valorToken";
import soloNumeros from "../../configuration/soloNumeros";
import soloLetras from "../../configuration/soloLetras";
import validacionEntrada from "../../configuration/validacionEntrada";


const useStyles = makeStyles((theme) => ({
  inputMaterial: {
    width: "100%",
  },
}));

const ModalEditarRecursos = ({
  modalEditar,
  abrirCerrarModalEditar,
  recursosSeleccionado,
  setRecursosSeleccionado,
  listaRecurso,
  setListaRecurso

}) => {

  const token = valorToken()
  
 
  const validacionLetra = (e) => {
    
    const { name, value } = e.target;

    if(soloLetras(e)) {
      setRecursosSeleccionado((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    
  }

  const styles = useStyles();
 
  
  const editarRecurso = async() => {

    if((validacionEntrada(recursosSeleccionado.nombre)) || (validacionEntrada(recursosSeleccionado.caracteristica))) {
      
      Alerta.fire({
        icon: "error",
        title: "LLene todos los campos.",
      });
    } else {
      await axios.put(`${URL}/editarRecurso/`+ recursosSeleccionado.id, recursosSeleccionado, {
        headers: 
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
        }
      })
      .then(response => {
        let recursoNuevo = listaRecurso;
        recursoNuevo.map(recurso => {
          if(recurso.id === recursosSeleccionado.id) {
            recurso.nombre = recursosSeleccionado.nombre;
            recurso.caracteristica = recursosSeleccionado.caracteristica;
          }
        });
        setListaRecurso(recursoNuevo);
        Alerta.fire({
          icon: "success",
          title: "Registro editado.",
        });
        setRecursosSeleccionado("")
        abrirCerrarModalEditar();
      }).catch(error => {
        console.log(error);
      })
    }
  }  


  return (
    <Modal open={modalEditar} close={abrirCerrarModalEditar}>
      <h3>Editar Recursos</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="nombre"
        value={recursosSeleccionado.nombre}
        onChange={validacionLetra}
      />
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
          onClick={() => editarRecurso()}
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

export default ModalEditarRecursos;

