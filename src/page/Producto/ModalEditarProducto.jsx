import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../components/Modals/Modal";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from '@material-ui/icons/Edit';
import URL from "../../configuration/URL";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import valorToken from "../../configuration/valorToken";
import validacionEntrada from "../../configuration/validacionEntrada";

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
  listaProducto,
  setListaProducto

}) => {

  const token = valorToken();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const styles = useStyles();

  const editarProducto = async() => {
    

    if((validacionEntrada(productoSeleccionado.nombre)) || (validacionEntrada(productoSeleccionado.descripcion)) ||
      (validacionEntrada(productoSeleccionado.precio)) || (validacionEntrada(productoSeleccionado.cantidad))) {
      
      Alerta.fire({
        icon: "error",
        title: "LLene todos los campos.",
      });
    } else {

    await axios.put(`${URL}/editarProducto/`+ productoSeleccionado.id, productoSeleccionado, {
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
          },
    })
    .then(response => {
      let productoNuevo = listaProducto;
      productoNuevo.map(producto => {
        if(producto.id === productoSeleccionado.id) {
          producto.nombre = productoSeleccionado.nombre;
          producto.fecha_compra = productoSeleccionado.fecha_compra;
          producto.fecha_caducidad = productoSeleccionado.fecha_caducidad;
          producto.precio = productoSeleccionado.precio;
          producto.cantidad = productoSeleccionado.cantidad;
          producto.descripcion = productoSeleccionado.descripcion;
        }
      });
      console.log(productoNuevo)
      setListaProducto(productoNuevo);
      Alerta.fire({
        icon: "success",
        title: "Registro editado.",
      });
      abrirCerrarModalEditar();
    }).catch(error => {
      console.log(error);
    })
  }
  }  

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
      <br />
      <TextField
        id="date"
        className={styles.inputMaterial}
        label="Fecha de Compra"
        type="date"
        name="fecha_compra"
        defaultValue="2017-05-24"
        value={productoSeleccionado.fecha_compra}
        onChange={handleChange}
        
      />
      
      <br />
      <TextField
        id="date"
        className={styles.inputMaterial}
        label="Fecha de Caducidad"
        type="date"
        name="fecha_caducidad"
        defaultValue="2017-05-24"
        value={productoSeleccionado.fecha_caducidad}
        onChange={handleChange}
        
      />
      <br />
      
      <TextField
        className={styles.inputMaterial}
        label="Precio"
        name="precio"
        value={productoSeleccionado.precio}
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Cantidad"
        name="cantidad"
        value={productoSeleccionado.cantidad}
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Descripción"
        name="descripcion"
        value={productoSeleccionado.descripcion}
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => editarProducto()}
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
