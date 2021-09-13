import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MaskedInput from "react-text-mask";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CancelIcon from "@material-ui/icons/Cancel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";

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

const FormEditarActividad = () => {
  const initialFormState = {
    id: null,
    idtipolabor: 0,
    idparcela_1: 0,
    fecha_inicio: "",
    fecha_fin: "",
    avance: "",
    total_actividad: 0.0,
    idrecurso: 0,
    cantidad: 0,
    costo: 0.0,
  };

  let { id } = useParams();
  const [editarActividad, setEditarActividad] = useState(initialFormState);

  const [tipoLabor, setTipoLabor] = useState([]);
  const [parcela, setParcela] = useState([]);
  const [recurso, setRecurso] = useState([]);

  const countRef = useRef(0);

  const buscarActividad = async () => {
    try {
      await axios.get(`${URL}/buscarActividad/${id}`, {}).then((response) => {
        setEditarActividad({
          id: response.data.data[0].id,
          idtipolabor: response.data.data[0].idtipolabor,
          idparcela_1: response.data.data[0].idparcela,
          idrecurso: response.data.data[0].idrecurso,
          fecha_inicio: response.data.data[0].fecha_inicio,
          fecha_fin: response.data.data[0].fecha_fin,
          avance: response.data.data[0].avance,
          total_actividad: response.data.data[0].total_actividad,
          cantidad: response.data.data[0].cantidad,
          costo: response.data.data[0].costo,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  //funcion para listar los labores
  async function TipoLabor() {
    try {
      let response = await fetch(`${URL}/listaTipoLabor`);
      response = await response.json();
      setTipoLabor(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  //funcion para listar las parcelas
  async function Parcela() {
    try {
      let response = await fetch(`${URL}/listaParcela`);
      response = await response.json();
      setParcela(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  //funcion para listar los recursos
  async function Recurso() {
    try {
      let response = await fetch(`${URL}/listaRecurso`);
      response = await response.json();
      setRecurso(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    buscarActividad();
    TipoLabor();
    Parcela();
    Recurso();
  }, [countRef]);

  const select = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(0),
      minWidth: 140,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const history = useHistory();
  const cancelar = () => {
    history.push(``);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditarActividad({ ...editarActividad, [name]: value });
    console.log(editarActividad);
  };

  var hoy = new Date();
  var fecha =
    hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();

  const classes = useStyles();

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
      <Navbar nombre="Editar Actividad">
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
                          value={editarActividad.idtipolabor}
                          onChange={handleInputChange}
                        >
                          {tipoLabor.map((labor, index) => (
                            <MenuItem value={labor.id} key={index}>
                              {labor.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={2} sm={3}>
                      <FormControl className={classesSelect.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Número parcela
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="idparcela"
                          value={editarActividad.idparcela_1}
                          onChange={handleInputChange}
                        >
                          {parcela.map((parce, index) => (
                            <MenuItem value={parce.id} key={index}>
                              {parce.numero}
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
                          value={editarActividad.fecha_inicio}
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
                          value={editarActividad.fecha_fin}
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
                        value={editarActividad.avance}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} lg={2} sm={2}>
                      <TextField
                        required
                        id="total_actividad"
                        name="total_actividad"
                        label="Total Actividad"
                        value={editarActividad.total_actividad}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} lg={2} sm={3}>
                      <FormControl className={classesSelect.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Recurso
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="idrecurso"
                          value={editarActividad.idrecurso}
                          onChange={handleInputChange}
                        >
                          {recurso.map((recur, index) => (
                            <MenuItem value={recur.id} key={index}>
                              {recur.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={2} sm={3}>
                      <TextField
                        label="Cantidad"
                        pattern="[0-9]{0,13}"
                        onChange={handleInputChange}
                        value={editarActividad.cantidad}
                        name="cantidad"
                        id="formatted-numberformat-input"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Button
                        variant="contained"
                        //onClick={() => peticionAgregar()}
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
    </>
  );
};

export default FormEditarActividad;
