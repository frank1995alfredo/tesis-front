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
import "jspdf-autotable";
import valorToken from "../../configuration/valorToken";

const ModalReporte_1 = ({
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
        `${URL}/buscarProductoFechaCompra/${productoSeleccionado.fecha_compra}`, {
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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

    let response = await fetch(`${URL}/listaProducto`, {
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
          Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
        },
    });
    response = await response.json();
    console.log(seleccion == 1);
    
    let suma = 0
    const sumaTotal = () => {   
      response.data.map(lista => suma += lista.precio)
      return suma
    }
    const doc = new jsPDF();
    
    let hoy = new Date();
    let fechaActual =
      hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    doc.text("Reporte de productos", 74, 10); //le damos las coordenadas x = 70, y = 10
    doc.text("Fecha: " + `${fechaActual}`, 10, 20);
    doc.text("Persona a cargo: " + usuario, 114, 20);
    if (seleccion === 0) {
      console.log("res");
      
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
            "Estado"
          ],
        ],
        body: response.data.filter((Ser) => Ser.cantidad > 0 || Ser.cantidad < 1 ).map((lista, index) => [
          index + 1,
          lista.nombre,
          lista.cantidad,
          lista.precio,
          lista.fecha_compra,
          lista.fecha_caducidad,
          ( lista.estado ? "En existencia" : "Agotado"),
        ]),
        
      });
      
    } else {
      if (seleccion === 1) {
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
              "Estado"
            ],
          ],
          body: response.data.filter((Ser) => Ser.cantidad === 0).map((lista, index) => [
            index + 1,
            lista.nombre,
            lista.cantidad,
            lista.precio,
            lista.fecha_compra,
            lista.fecha_caducidad,
            (index = lista.estado ? "En existencia" : "Agotado"),
          ]),
        });
      } else {
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
                "Estado"
              ],
            ],
            body: response.data.filter((Ser) => Ser.cantidad >= 1).map((lista, index) => [
              index + 1,
              lista.nombre,
              lista.cantidad,
              `$`+lista.precio,
              lista.fecha_compra,
              lista.fecha_caducidad,
              (lista.estado ? "En existencia" : "Agotado"),
            ]),
          });
          
         
      }
      let finalY = (doc).lastAutoTable.finalY;
      doc.text("Gran total productos: $" + `${sumaTotal()}`, 70, finalY + 10);    
    }

    
    
    let fechaActual2 =
      hoy.getFullYear() + "" + (hoy.getMonth() + 1) + "" + hoy.getDate();
    doc.save("reporteActividades" + `${fechaActual2}` + ".pdf");
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
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
          },
        });
        response = await response.json();
        console.log(response.data);
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

       //USUARIO ACTUAL
       const usuarioActual = async () => {
        try {
          let response = await fetch(`${URL}/usuarioActual`, {
            signal: abortController.signal,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
            },
          });
  
          response = await response.json();
          setUsuario(response.data);
        } catch (error) {
          console.log(error);
          if (abortController.signal.aborted) {
            console.log(abortController.signal.aborted);
          } else throw error;
        }
      };
  
    usuarioActual()
    listaProducto();
    return () => abortController.abort();
  }, []);

  const genera = (e) => {
    listaProducto2();
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
                  <h8>Reporte de Existencias</h8>
                </Grid>
                <Grid item xs={12} lg={6} sm={6}>
                  <FormControl className={classesSelect.formControl}>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="producto"
                      name="idproducto"
                      onClick={SelectChangex}
                      defaultValue={-1}
                    >
                      <option value={-1}>Seleccione un item</option>
                      <option value={0}>Total de Existencias</option>
                      <option value={1}>Productos Agotados</option>
                      <option value={2}>Todos los Productos</option>
                    </Select>
                  </FormControl>
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
                <Grid item xs={12} lg={12} sm={12}>
                  {" "}
                  <h5>___________________________________</h5>
                </Grid>

                <Grid item xs={12} lg={6} sm={6}>
                  <TextField
                    id="date"
                    label="Fecha de Compra"
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
                      onClick={genera2}
                    >
                      Generar
                    </Button>
                  </div>
                </Grid>
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

export default ModalReporte_1;
