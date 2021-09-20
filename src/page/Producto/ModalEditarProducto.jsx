import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../components/Modals/Modal";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  inputMaterial: {
    width: "100%",
  },
}));

const ModalEditarProducto = ({
  modalEditar,
  abrirCerrarModalEditar,
  productoSeleccionado,
  setProductoSeleccionado,

}) => {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const styles = useStyles();

  return (
    <Modal open={modalEditar} close={abrirCerrarModalEditar}>
      <h3>Editar Producto</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="nombre"
        value={productoSeleccionado.nombre}
        onChange={handleChange}
      />
      <TextField
        className={styles.inputMaterial}
        label="Fecha_compra"
        name="fecha_compra"
        value={productoSeleccionado.nombre}
        onChange={handleChange}
      />
      <TextField
        className={styles.inputMaterial}
        label="Fecha_caducidad"
        name="fecha_caducidad"
        value={productoSeleccionado.nombre}
        onChange={handleChange}
      />
      <TextField
        className={styles.inputMaterial}
        label="Precio"
        name="precio"
        value={productoSeleccionado.nombre}
        onChange={handleChange}
      />
      <TextField
        className={styles.inputMaterial}
        label="Cantidad"
        name="cantidad"
        value={productoSeleccionado.nombre}
        onChange={handleChange}
      />
      <TextField
        className={styles.inputMaterial}
        label="Descripcion"
        name="descripcion"
        value={productoSeleccionado.nombre}
        onChange={handleChange}
      />
      <TextField
        className={styles.inputMaterial}
        label="Estado"
        name="estado"
        value={productoSeleccionado.nombre}
        onChange={handleChange}
      />
      
      <br />
      <br />
      <div align="right">
        <Button
          variant="contained"
          color="primary"
          size="small"
          //onClick={() => editarCategoria()}
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

export default ModalEditarProducto;
