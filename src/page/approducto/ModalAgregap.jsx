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

const ModalAgregap = ({
  modalInsertar,
  abrirCerrarModalInsertar,
  abrirCerrarModalEditar,
  setLaborSeleccionado,
  laborSeleccionado,
  listaLabor,
  setListaLabor
}) => {
  const styles = useStyles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaborSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  };
  

  

  const editarLabor = async() => {
    await axios.put(`${URL}/editarProducto/`+ laborSeleccionado.id, laborSeleccionado)
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
  };

  


  return (
    <Modal open={modalInsertar} close={abrirCerrarModalInsertar}>
      <h3>Producto</h3>
      <TextField
        className={styles.inputMaterial}
        label="Codigo"
        name="id"
        onChange={handleChange}
        value={laborSeleccionado.id}
      />
      
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Producto"
        name="nombre"
        onChange={handleChange}
        value={laborSeleccionado.nombre}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Cantidad"
        name="cantidad"
        onChange={handleChange}
        
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Precio"
        name="precio"
        onChange={handleChange}
        value={laborSeleccionado.precio}
      />
      <br />
      <br />
      <div align="right">
        <Button
          variant="contained"
          color="primary"
          size="small"
          
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

export default ModalAgregap;
