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

const ModalReporte_2 = ({
  setProductoSeleccionado,
  productoSeleccionado,
  modalReporte,
  abrirCerrarModalReporte,
  setListaAfectacionParcela,
  listaAfectacionParcela,
}) => {
  const [fecha, setFecha] = useState([]);
  const [listaProducto, setListaProducto] = useState([]);
  const [listaPDF, setListaPDF] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const useStyles = makeStyles((theme) => ({
    inputMaterial: {
      width: "100%",
    },
  }));

  async function buscarFechasif() {
    let response = await fetch(
      `${URL}/buscarFechasifAfectacionParcela/${fecha.fechainicio}/${fecha.fechafinal}`,{
        headers: {
          Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
        },
      }
    );
    response = await response.json();

    setListaPDF(response.data);

    const doc = new jsPDF();

    let hoy = new Date();
    let fechaActual =
      hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    doc.text("Reporte de zonas afectadas", 74, 10); //le damos las coordenadas x = 70, y = 10
    doc.text("Fecha: " + `${fechaActual}`, 10, 20);
    doc.text("Persona a cargo: " + usuario, 114, 20);
    doc.autoTable({
      startY: 30,
      styles: {
        halign: "center",
      },
      head: [
        ["#", "Codigo", "Parcela", "Afectacion", "Fecha", "Estado Actual"],
      ],
      body: response.data.map((lista, index) => [
        index + 1,
        lista.id,
        lista.numero,
        lista.nombre_afectacion,
        lista.fecha,
        (index = lista.estado ? "Pendiente" : "Terminado"),
      ]),
    });
    let fechaActual2 =
      hoy.getFullYear() + "_" + (hoy.getMonth() + 1) + "_" + hoy.getDate();
    doc.save("reporteActividades" + `${fechaActual2}` + ".pdf");
  }

  useEffect(() => {
    const abortController = new AbortController();

    const usuarioActual = async () => {
      try {
        let response = await fetch(`${URL}/usuarioActual`, {
          signal: abortController.signal,
          headers: 
          {
            Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
          }
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

    const va = 0;
   
    usuarioActual();
    return () => abortController.abort();
  }, []);

  const token = valorToken()


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFecha({ ...fecha, [name]: value });
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
  console.log(listaAfectacionParcela);

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
                    name="fechainicio"
                    onChange={handleInputChange}
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
                      onClick={buscarFechasif}
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
                    name="fechafinal"
                    onChange={handleInputChange}
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