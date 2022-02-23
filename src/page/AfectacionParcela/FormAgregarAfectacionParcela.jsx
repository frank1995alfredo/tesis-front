import { useState, useEffect } from "react";
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

const FormAgregarAfectacionParcela = () => {
  const initialFormState = {
    id: null,
    idafectacion: 0,
    idparcela: 0,
    fecha: Date,
    observacion: "",
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
  const [agregarAfectacionParcela, setAgregarAfectacionParcela] = useState(initialFormState);
  const [listaParcela, setListaParcela] = useState([]);
  const [listaAfectacion, setListaAfectacion] = useState([]);
  

  const history = useHistory();
  const cancelar = () => {
    history.push(``);
  };
  const PeticionRegresa = () => {
    history.push(`/AfectacionParcela`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgregarAfectacionParcela({ ...agregarAfectacionParcela, [name]: value });
    console.log(agregarAfectacionParcela);
  };

  //LISTAS
  useEffect(() => {
    const abortController = new AbortController();

    

    const listaParcela = async () => {
      try {
        let response = await fetch(`${URL}/listaParcela`, {
          signal: abortController.signal,
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

    const listaAfectacion = async () => {
      try {
        let response = await fetch(`${URL}/listaAfectacion`, {
          signal: abortController.signal,
        });
        response = await response.json();
        setListaAfectacion(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    
    listaParcela();
    listaAfectacion();

    return () => abortController.abort();
  }, []);

  const peticionAgregar = async () => {
    await axios
      .post(`${URL}/crearAfectacionParcela`, agregarAfectacionParcela)
      .then((response) => {
        setAgregarAfectacionParcela(initialFormState);
        Alerta.fire({
          icon: "success",
          title: "Registro agregado.",
          
        });
        PeticionRegresa()
        
      })
      .catch((error) => {
        console.log(error);
      });
    
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
      <Navbar nombre="Agregar Zona Afectada">
        <div className="container-fluid px-4">
          <div className="row">
            <div className="col-auto">
              {" "}
              <Link
                to="/actividades/afectacionParcela"
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
                          Afectacion
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="idafectacion"
                          onChange={handleInputChange}
                        >
                          {listaAfectacion.map((afectacion, index) => (
                            <MenuItem key={index} value={afectacion.id}>
                              {afectacion.nombre_afectacion}
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
                          label="Fecha"
                          type="date"
                          defaultValue="2017-05-24"
                          name="fecha"
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
                        id="observacion"
                        name="observacion"
                        label="Observacion"
                        onChange={handleInputChange}
                        fullWidth
                      />
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
                        onClick={() => PeticionRegresa()}
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

export default FormAgregarAfectacionParcela;