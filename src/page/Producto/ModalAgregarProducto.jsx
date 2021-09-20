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

const ModalAgregarProducto = ({
  modalInsertar,
  abrirCerrarModalInsertar,
  setProductoSeleccionado,
  productoSeleccionado,
  listaProducto,
  setListaProducto,
}) => {
  const styles = useStyles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(productoSeleccionado);
  };

  const agregarProducto = async () => {
    await axios
      .post(`${URL}/crearProducto`, productoSeleccionado)
      .then((response) => {
        setListaProducto(listaProducto.concat(response.data.data[0]));
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
      <h3>Nuevo Producto</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="nombre"
        onChange={handleChange}
      />

      <TextField
        id="date"
        label="Fecha de Compra"
        type="date"
        defaultValue="2017-05-24"
        name="fecha_compra"
        onChange={handleChange}
        className={styles.inputMaterial}
      />
      
      <TextField
        id="date"
        label="Fecha_caducidad"
        type="date"
        defaultValue="2017-05-24"
        name="fecha_caducidad"
        onChange={handleChange}
        className={styles.inputMaterial}
      />

      <TextField
        className={styles.inputMaterial}
        label="Precio"
        name="precio"
        onChange={handleChange}
      />
      <TextField
        className={styles.inputMaterial}
        label="Cantidad"
        name="cantidad"
        onChange={handleChange}
      />
      <TextField
        className={styles.inputMaterial}
        label="Descripcion"
        name="descripcion"
        onChange={handleChange}
      />
      <TextField
        className={styles.inputMaterial}
        label="Estado"
        name="estado"
        onChange={handleChange}
      />

      <br />
      <br />
      <div align="right">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => agregarProducto()}
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

export default ModalAgregarProducto;
