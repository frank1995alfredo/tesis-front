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

const FormEditarAPProducto = ({
   
    ValorSeleccionado,
    setValorSeleccionado,
    
  
  }) => {
  const initialFormState = {
    id: null,
    idproducto: 0,
    idafectacionparcela: 0,
    cantidad: 0,
    costo: 0.0,
    total_parcial: 0.0,
  };
  
  let { id } = useParams();
  const [editarAPProducto, setEditarAPProducto] = useState(initialFormState);
  
  const [producto, setProducto] = useState([]);
  const [parcela, setParcela] = useState([]);
  const [recurso, setRecurso] = useState([]);

  const countRef = useRef(0);
  

  
    async function buscarAPProducto() {
        try {
            let response = await fetch(`${URL}/buscarAfectacionParcelaProducto`);
            response = await response.json();
            setProducto(response.data);

            for(let i = 0; i < response.data.length; i++) {
                
                if(response.data[i].id==id){
                    let dall = { 
                        id: response.data[i].id,
                        idproducto: response.data[i].idproducto,
                        idafectacionparcela:response.data[i].idafectacionparcela,
                        cantidad: response.data[i].cantidad,
                        costo: response.data[i].costo,
                        total_parcial: response.data[i].total_parcial,
                    }
                    setEditarAPProducto(dall);
                    
                }
               
            }
 
          } catch (error) {
            console.log(error);
          }
      }
  
  

  const peticionEditar = async () => {
    try {
      await axios
        .put(`${URL}/editarAfectacionParcelaProducto/${id}`, editarAPProducto, {})
        .then((response) => {
            setEditarAPProducto(initialFormState);
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
  async function Producto() {
    try {
      let response = await fetch(`${URL}/listaProducto`);
      response = await response.json();
      setProducto(response.data);
      
      
    } catch (error) {
      
    }
  }
///////////////////////////////////////////////////////////
  //funcion para listar los recursos
  

  useEffect(() => {
    buscarAPProducto();
    Producto();
    
    
    
   
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
const bussArry = () =>{
    
      
}
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditarAPProducto({ ...editarAPProducto, [name]: value });
    console.log(editarAPProducto);
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
      <Navbar nombre="Editar ">
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
                          name="idproducto"
                          value = {editarAPProducto.idproducto}
                          onChange={handleInputChange}
                        >
                          {producto.map((parce, index) => (
                            <MenuItem value={parce.id} key={index}>
                              {parce.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={2} sm={3}>
                    <form className={classes.container} noValidate>
                      <TextField
                        required
                        id="Cantidad"
                        name="cantidad"
                        label="Cantidad"
                        value={editarAPProducto.cantidad}
                        
                        
                        onChange={handleInputChange}
                        fullWidth
                      />
                      </form>
                    </Grid>
                    <Grid item xs={5} lg={2} sm={3}>
                    <form className={classes.container} noValidate>
                      <TextField
                        required
                        id="Costo"
                        name="costo"
                        label="costo"
                        value={editarAPProducto.costo}
                        onChange={handleInputChange}
                        fullWidth
                      />
                      </form>
                    </Grid>
                    <Grid item xs={12} lg={2} sm={3}>
                    <form className={classes.container} noValidate>
                      <TextField
                        required
                        id="Total_Parcial"
                        name="total_parcial"
                        label="Total Parcial"
                        value={editarAPProducto.total_parcial}
                        onChange={handleInputChange}
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

export default FormEditarAPProducto;