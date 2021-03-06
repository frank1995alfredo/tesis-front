import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MaskedInput from "react-text-mask";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CancelIcon from "@material-ui/icons/Cancel";
import FormControl from "@material-ui/core/FormControl";

import NumberFormat from "react-number-format";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import PropTypes from "prop-types";
import URL from "../../configuration/URL";
import { useHistory } from "react-router-dom";
import valorToken from "../../configuration/valorToken";
import soloNumeros from "../../configuration/soloNumeros";
import ModalAgregarRecurso from "../Actividades/ModalAgregarRecurso";

import validacionEntrada from "../../configuration/validacionEntrada";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const FormAgregarActividad = () => {

  const token = valorToken()

  const initialFormState = {
    id: null,
    idtipolabor: 0,
    idparcela_1: 0,
    fecha_inicio: "",
    fecha_fin: "",
    avance: "",
    total_actividad: 0.0,
    idrecurso: "",
    cantidad: "",
    costo: "",
    idtrabajador: null
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
  const [agregarActividad, setAgregarActividad] = useState(initialFormState);
  const [listaParcela, setListaParcela] = useState([]);
  const [listaRecurso, setListaRecurso] = useState([]);
  const [listaLabor, setListaLabor] = useState([]);
  const [listaTipoTrabajador, setListaTipoTrabajador] = useState([]);

  const [modalInsertar, setModalInsertar] = useState(false);

  //METODO PARA ABRIR EL MODAL
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  
  const history = useHistory();
  const cancelar = () => {
    history.push(`/actividades/actividades`);
  };

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setAgregarActividad({ ...agregarActividad, [name]: value });

  };

  const validacionNumero = (e) => {
    
    const { name, value } = e.target;

    if(soloNumeros(e)) {
      setAgregarActividad({ ...agregarActividad, [name]: value });
    }
    
  }

  //LISTAS
  useEffect(() => {
    
    const abortController = new AbortController();

    const listaRecurso = async () => {
      try {
        let response = await fetch(`${URL}/listaRecursos`, {
          signal: abortController.signal,
          headers: 
          {
            Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
          }
        });
        response = await response.json();
        setListaRecurso(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    const listaLabores = async () => {
      try {
        let response = await fetch(`${URL}/listaLabores`, {
          signal: abortController.signal,
          headers: 
          {
            Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
          }
        });
        response = await response.json();
        setListaLabor(response.data);
       
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    const listaParcela = async () => {
      try {
        let response = await fetch(`${URL}/listaParcelas`, {
          signal: abortController.signal,
          headers: 
          {
            Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
          }
        });
        response = await response.json();
        setListaParcela(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };


    const listaTrabajor = async () => {
      try {
        let response = await fetch(`${URL}/listaTipoTrabajador`, {
          signal: abortController.signal,
          headers: 
          {
            Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
          }
        });
        response = await response.json();
        setListaTipoTrabajador(response.data);
     
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    listaLabores();
    listaParcela();
    listaRecurso();
    listaTrabajor();

    return () => abortController.abort();
  }, []);

  const peticionAgregar = async () => {

    if((validacionEntrada(agregarActividad.idtipolabor)) || (validacionEntrada(agregarActividad.idparcela_1)) ||
      (validacionEntrada(agregarActividad.avance)) || (validacionEntrada(agregarActividad.total_actividad)) ||
      (validacionEntrada(agregarActividad.idtrabajador))) {
      Alerta.fire({
        icon: "error",
        title: "LLene todos los campos.",
      });
    } else { 

    await axios
      .post(`${URL}/crearActividad`, agregarActividad, {
        headers: 
        {
          Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
        }  
      })
      .then((response) => {
        setAgregarActividad(initialFormState);
        Alerta.fire({
          icon: "success",
          title: "Registro agregado.",
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  var hoy = new Date();
  var fecha =
    hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();

  const classes = useStyles();

  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);

  function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[
          "(",
          /[1-9]/,
          /\d/,
          /\d/,
          ")",
          " ",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
        placeholderChar={"\u2000"}
        showMask
      />
    );
  }

  TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
  };

  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix=""
      />
    );
  }

  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  const classesSelect = select();
  return (
    <>
      <Navbar nombre="Agregar Actividad">
        <div className="container-fluid px-4">
          <div className="row">
            <div className="col-auto">
              {" "}
              <Link
                to="/actividades/actividades"
                type="button"
                className="btn btn-secondary btn-sm"
              >
                <i className="fas fa-arrow-left"></i> Regresar
              </Link>
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={abrirCerrarModalInsertar}
              >
                {" "}
                <i className="fas fa-plus-circle "></i> Agregar recursos
              </button>
            </div>
          </div>
          <div className="row my-4">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <Grid container spacing={3}>
                    <Grid item xs={12} lg={2} sm={3}>
                      <FormControl className={classesSelect.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Tipo labor
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="idtipolabor"
                          onChange={handleInputChange}
                        >
                          {listaLabor.map((labor, index) => (
                            <MenuItem key={index} value={labor.id}>
                              {labor.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={2} sm={3}>
                      <FormControl className={classesSelect.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          N??mero parcela
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="idparcela_1"
                          onChange={handleInputChange}
                        >
                          {listaParcela.map((parcela, index) => (
                            <MenuItem key={index} value={parcela.id}>
                              {parcela.numero}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={5} lg={2} sm={3}>
                      <form className={classes.container} noValidate>
                        <TextField
                          id="date"
                          label="Fecha inicio"
                          type="date"
                          defaultValue="2017-05-24"
                          name="fecha_inicio"
                          onChange={handleInputChange}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </form>
                    </Grid>
                    <Grid item xs={12} lg={2} sm={3}>
                      <form className={classes.container} noValidate>
                        <TextField
                          id="date"
                          label="Fecha fin"
                          type="date"
                          defaultValue="2017-05-24"
                          name="fecha_fin"
                          onChange={handleInputChange}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </form>
                    </Grid>
                    <Grid item xs={12} lg={2} sm={2}>
                      <TextField
                        required
                        id="avance"
                        name="avance"
                        label="Avance"
                        onChange={validacionNumero}
                        value={agregarActividad.avance}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} lg={2} sm={2}>
                      <TextField
                        required
                        id="total_actividad"
                        name="total_actividad"
                        label="Total Actividad"
                        onChange={validacionNumero}
                        value={agregarActividad.total_actividad}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} lg={2} sm={3}>
                      <FormControl className={classesSelect.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Tipo de recurso
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="idrecurso"
                          onChange={handleInputChange}
                        >
                          {listaRecurso.map((recurso, index) => (
                            <MenuItem key={index} value={recurso.id}>
                              {recurso.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={2} sm={3}>
                      <TextField
                        label="Cantidad de recurso"
                        pattern="[0-9]{0,13}"
                        name="cantidad"
                        onChange={validacionNumero}
                        value={agregarActividad.cantidad}
                        id="formatted-numberformat-input"
                      />
                    </Grid>
                    <Grid item xs={12} lg={2} sm={3}>
                      <TextField
                        label="Costo del recurso"
                        pattern="[0-9]{0,13}"
                        name="costo"
                        onChange={validacionNumero}
                        value={agregarActividad.costo}
                        id="formatted-numberformat-input"
                      />
                    </Grid>
                    <Grid item xs={12} lg={4} sm={4}>
                      <FormControl className={classesSelect.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Trabajador
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="idtrabajador"
                          onChange={handleInputChange}
                        >
                          {listaTipoTrabajador.map((trabajador, index) => (
                            <MenuItem key={index} value={trabajador.id}>
                              {trabajador.nombre} 
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                  
                      </Grid>
                    <Grid item xs={12} sm={12}>
                      <Button
                        variant="contained"
                        onClick={() => peticionAgregar()}
                        size="small"
                        color="primary"
                      >
                        <AddCircleIcon /> Agregar
                      </Button>{" "}
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => cancelar()}
                      >
                        <CancelIcon /> Cancelar
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </Navbar>
      <ModalAgregarRecurso
        abrirCerrarModalInsertar={abrirCerrarModalInsertar}
        modalInsertar = {modalInsertar}
      />
    </>
  );
};

export default FormAgregarActividad;
