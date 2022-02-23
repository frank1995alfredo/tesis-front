import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import Modal from "../../components/Modals/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";

import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import URL from "../../configuration/URL";
import Navbar from "../../components/Navbar/Navbar";
import jsPDF from "jspdf";
import valorToken from "../../configuration/valorToken";
import "jspdf-autotable";


const ModalReporte_2 = ({
  setProductoSeleccionado,
  productoSeleccionado,
  modalReporte,
  abrirCerrarModalReporte,
}) => {
  const [seleccion, setSeleccion] = useState([]);
  const [listaProducto, setListaProducto] = useState([]);
  const [listaPDF, setListaPDF] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const useStyles = makeStyles((theme) => ({
    inputMaterial: {
      width: "100%",
    },
  }));

  const token = valorToken();

  const SelectChangex = function (e) {
    const opcion = e.target.value;
    setSeleccion(opcion);

    setSeleccion(opcion);
    console.log(opcion);
  };
  async function listaProductoFechaCompra() {
    try {
      let response = await fetch(
        `${URL}/buscarProductoFechaCompra/${productoSeleccionado.fecha_compra}`,{
           headers: {
            Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
          },
        }
      );
      response = await response.json();
      console.log(seleccion == 1);

      setListaProducto(response.data);
      setListaPDF(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function listaProducto2() {
    try {
      let response = await fetch(`${URL}/listaProducto`, { headers: {
            Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
          },});
      response = await response.json();
      console.log(seleccion == 1);
      if (seleccion == 0) {
        console.log("res");
        const arreglos = response.data.filter((Ser) => Ser.cantidad > 0);
        setListaProducto(arreglos);
        setListaPDF(arreglos);
      } else {
        if (seleccion == 1) {
          const arreglos = response.data.filter((Ser) => Ser.cantidad === 0);
          setListaProducto(arreglos);
          setListaPDF(arreglos);
        } else {
          if (seleccion == 2) {
            setListaProducto(response.data);
            setListaPDF(response.data);
          } else {
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    //LISTAR ACTIVIDAD

    //LISTAR Producto
    const listaProducto = async () => {
      try {
        let response = await fetch(`${URL}/listaProducto`, {
          signal: abortController.signal,
           headers: {
            Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
          },
        });
        response = await response.json();
        console.log(seleccion);
        if (seleccion === 0) {
          const arreglos = response.data.filter((Ser) => Ser.cantidad === 0);
          setListaProducto(arreglos);
          setListaPDF(arreglos);
        } else {
          if (seleccion[0] === 1) {
          } else {
          }
        }
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    listaProducto();
    return () => abortController.abort();
  }, []);

  const genera = (e) => {
    listaProducto2();
    pdfActividades();
  };
  const genera2 = (e) => {
    listaProductoFechaCompra();
    pdfActividades();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const select = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(0),
      minWidth: 140,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const styles = useStyles();
  const pdfAnio2 = (anio1) => {
    const doc = new jsPDF();
    let hoy = new Date();
    let fechaActual =
      hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    doc.text("Reporte de actividades", 74, 10); //le damos las coordenadas x = 70, y = 10
    doc.text("Fecha: " + `${fechaActual}`, 10, 20);
    doc.text("Persona a cargo: " + usuario, 114, 20);
    doc.autoTable({
      startY: 30,
      styles: {
        halign: "center",
      },
      head: [["#", "Labor", "Trabajador", "Recurso", "Total Recurso", "Año"]],
      body: listaPDF
        .filter((list) => list.anio === anio1)
        .map((lista, index) => [
          index + 1,
          lista.nombre,
          lista.precio,
          lista.cantidad,
          lista.descripcion,
        ]),
    });

    let fechaActual2 =
      hoy.getFullYear() + "_" + (hoy.getMonth() + 1) + "_" + hoy.getDate();
    doc.save("reporteActividades" + `${fechaActual2}` + ".pdf");
  };
  const pdfActividades = () => {
    const doc = new jsPDF();
    let hoy = new Date();
    let fechaActual =
      hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    doc.text("Reporte de productos", 74, 10); //le damos las coordenadas x = 70, y = 10
    doc.text("Fecha: " + `${fechaActual}`, 10, 20);
    doc.text("Persona a cargo: " + usuario, 114, 20);
    doc.autoTable({
      startY: 30,
      styles: {
        halign: "center",
      },
      head: [
        [
          "#",
          "Producto",
          "Existencia",
          "Precio",
          "Fecha Compra",
          "Fecha Caducidad",
        ],
      ],
      body: listaPDF.map((lista, index) => [
        index + 1,
        lista.nombre,
        lista.cantidad,
        lista.precio,
        lista.fecha_compra,
        lista.fecha_caducidad,
      ]),
    });
    let fechaActual2 =
      hoy.getFullYear() + "_" + (hoy.getMonth() + 1) + "_" + hoy.getDate();
    doc.save("reporteActividades" + `${fechaActual2}` + ".pdf");
  };

  const classesSelect = select();
  return (
    <Modal open={modalReporte} close={abrirCerrarModalReporte}>
      <div className="row my-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <Grid container spacing={2}>
                <Grid item xs={12} lg={12} sm={12}>
                  <h8>Reporte de Afectaciones</h8>
                </Grid>
                <Grid item xs={12} lg={6} sm={6}>
                  <TextField
                    id="date"
                    label="Desde"
                    type="date"
                    defaultValue="2017-05-24"
                    name="fecha_compra"
                    onChange={handleChange}
                    className={styles.inputMaterial}
                  />
                </Grid>
                <Grid item xs={12} lg={1} sm={1}></Grid>
                <Grid item xs={12} lg={5} sm={5}>
                  <div>
                    <br></br>
                  </div>
                  <div align="right">
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={genera}
                    >
                      Generar
                    </Button>
                  </div>
                </Grid>

                <Grid item xs={12} lg={6} sm={6}>
                  <TextField
                    id="date"
                    label="hasta"
                    type="date"
                    defaultValue="2017-05-24"
                    name="fecha_compra"
                    onChange={handleChange}
                    className={styles.inputMaterial}
                  />
                </Grid>
                <Grid item xs={12} lg={1} sm={1}></Grid>
              </Grid>
            </div>
          </div>
          <Grid item xs={12} lg={2} sm={3}>
            <div>
              <br></br>
            </div>
            <div align="right">
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => abrirCerrarModalReporte()}
              >
                <CancelIcon /> Cancelar
              </Button>
            </div>
          </Grid>
        </div>
      </div>
    </Modal>
  );
};

export default ModalReporte_2;
