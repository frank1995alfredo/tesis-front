import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MaskedInput from "react-text-mask";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CancelIcon from "@material-ui/icons/Cancel";
import FormControl from "@material-ui/core/FormControl";

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
import { Checkbox } from "@material-ui/core";
import valorToken from "../../configuration/valorToken";

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

const FormeditarAfectacionParcela = () => {
  const initialFormState = {
    id: null,
    idafectacion: 0,
    idparcela: 0,
    fecha: "",
    observacion: "",
    estado: 0,
  };
  const selecciona = [
    {
      value:-1,label:'Selecciona una opcion'
    },
    {
      value:0,label:'Inactivo'
    },{
      value:1,label:'Activo'
    }
  ]

   const token = valorToken();

  let { id } = useParams();
  const [editarAfectacionParcela, setEditarAfectacionParcela] = useState(initialFormState);
  const [producto, setProducto] = useState([]);
  const [afectacion, setAfectacion] = useState([]);
  const [parcela, setParcela] = useState([]);
  const [recurso, setRecurso] = useState([]);

  const countRef = useRef(0);
const va = 0;
  async function buscarAfectacionParcela() {
    try {
      let response = await fetch(`${URL}/buscarAfectacionParcela/${id}`);
      response = await response.json();
     
          setEditarAfectacionParcela(response.data[0]);
          console.log(response.data)    
      
    } catch (error) {
      console.log(error);
    }
  };
  const peticionEditar = async () => {
    try {
      await axios
        .put(`${URL}/editarAfectacionParcela/${id}`, editarAfectacionParcela, {
            headers: {
                  Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
              },
        })
        .then((response) => {
            setEditarAfectacionParcela(initialFormState);
          Alerta.fire({
            icon: "success",
            title: "Registro editado.",
          });
         
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  //////////////////////////////////////////////////////////////
  //Codigo funciona
  //funcion para listar los labores
  async function Afectacion() {
    try {
      let response = await fetch(`${URL}/listaAfectacion`, {
         headers: {
                  Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
              },
      });
      response = await response.json();
      setAfectacion(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  //funcion para listar las parcelas
  async function Parcela() {
    try {
      let response = await fetch(`${URL}/listaParcela`, {
         headers: {
                  Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
              },
      });
      response = await response.json();
      setParcela(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  ///////////////////////////////////////////////////////////
  //funcion para listar los recursos

  useEffect(() => {
    buscarAfectacionParcela();
    Afectacion();
    Parcela();
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
    setEditarAfectacionParcela({ ...editarAfectacionParcela, [name]: value });
    console.log(editarAfectacionParcela);
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
                          Parcela Afectada
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="idparcela"
                          value={editarAfectacionParcela.idparcela}
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
                    <Grid item xs={12} lg={2} sm={3}>
                      <FormControl className={classesSelect.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Afectacion
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="idafectacion"
                          value={editarAfectacionParcela.idafectacion}
                          onChange={handleInputChange}
                        >
                          {afectacion.map((afec, index) => (
                            <MenuItem value={afec.id} key={index}>
                              {afec.nombre_afectacion}
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
                          value={editarAfectacionParcela.fecha}
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
                          required
                          id="observacion"
                          name="observacion"
                          label="Obasevacion"
                          value={editarAfectacionParcela.observacion}
                          onChange={handleInputChange}
                          className={classes.textField}
                          fullWidth
                        />
                      </form>
                    </Grid>
                    

                    <Grid item xs={12} sm={12}>
                      <Button
                        variant="contained"
                        onClick={() => peticionEditar()}
                        size="small"
                        color="primary"
                      >
                        <AddCircleIcon /> Editar
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

export default FormeditarAfectacionParcela;
