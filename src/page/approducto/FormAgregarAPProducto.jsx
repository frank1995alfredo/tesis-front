import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MaskedInput from "react-text-mask";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CancelIcon from "@material-ui/icons/Cancel";
import FormControl from "@material-ui/core/FormControl";
import MaterialTable from "material-table";
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
import { Checkbox, DialogActions } from "@material-ui/core";
import React from "react";
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
const columns = [
  {
    title: "#",
    render: (rowData) => rowData.tableData.id + 1,
  },
  {
    title: "Codigo",
    field: "Codigo",
  },
  {
    title: "Producto",
    field: "Producto",
  },
  {
    title: "Cantidad",
    field: "Cantidad",
  },
  {
    title: "Precio",
    field: "precio",
  },
  {
    title: "Total",
    field: "Total",
  },
];

const FormAgregarAPProducto = ({
  modalInsertar,
  abrirCerrarModalInsertar,
  abrirCerrarModalEditar,
  setLaborSeleccionado,
  laborSeleccionado,
  listaLabor,
  setListaLabor,
}) => {
  const initialFormState = {
    id: null,
    idproducto: 0,
    idafectacionparcela: 0,
    cantidad: 0,
    costo: 0.0,
    total_parcial: 0.0,
    existencia: 0,
  };

  let { id } = useParams();
  const [valor, setValor] = useState({
    xcantidad: "",
    xtotal: "",
  });

  const token = valorToken();

  const [agregarAPProducto, setAgregarAPProducto] = useState(initialFormState);
  const [listaAfectacionParcela, setListaAfectacionParcela] = useState([]);
  const [buscarProducto, setBuscarProducto] = useState([]);
  const [producto, setProducto] = useState([]);

  const [recurso, setRecurso] = useState([]);
  const [temporal, setTemporal] = useState({});
  const countRef = useRef(0);
  const [productoSeleccionado, setProductoSeleccionado] = useState({
    Codigo: 0,
    Producto: "",
    Cantidad: 0,
    precio: 0.0,
    Total: 0.0,
  });
  const [afectacionparcelaSeleccionado, setAfectacionParcelaSeleccionado] =
    useState({
      id: 0,
      numero: 0,
      nombre_afectacion: "",
      fecha: Date,
      observacion: "",
      estado: 0,
    });

  async function peticionAgregar() {
    if (listaAfectacionParcela.length > 0) {
      for (let index = 0; index < listaAfectacionParcela.length; index++) {
        let parcela = producto.filter(
          (pro) => pro.id == listaAfectacionParcela[index].Codigo
        );
        let resul =
          parcela[0].cantidad - listaAfectacionParcela[index].Cantidad;
        const call = {
          id: buscarProducto.id,
          cantidad: resul,
        };
        setRecurso(call);
        await axios
          .put(
            `${URL}/editarProductox/` + listaAfectacionParcela[index].Codigo,
            call,
            {
              headers: {
                Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
              },
            }
          )
          .then((response) => {})
          .catch((error) => {
            console.log(error);
          });
        let data = {
          idproducto: listaAfectacionParcela[index].Codigo,
          idafectacionparcela: id,
          cantidad: listaAfectacionParcela[index].Cantidad,
          costo: listaAfectacionParcela[index].precio,
          total_parcial: listaAfectacionParcela[index].Total,
        };
        await axios
          .post(`${URL}/crearAfectacionParcelaProducto`, data, {
            headers: {
              Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
            },
          })
          .then((response) => {
            setAgregarAPProducto(initialFormState);
          })
          .catch((error) => {
            console.log(error);
          });
        setRecurso(call);
      }
      Alerta.fire({
        icon: "success",
        title: "Registro agregado.",
      });
      PeticionRegresa();
    } else {
      Alerta.fire({
        icon: "info",
        title: "Agregar productos a la lista.",
      });
    }
  }

  const PeticionRegresa = () => {
    history.push(`/AfectacionParcela`);
  };
  useEffect(() => {
    const abortController = new AbortController();

    //LISTAR AfectacionParcela
    const listaAfectacionParcelas = async () => {
      try {
        let response = await fetch(`${URL}/listaAfectacionParcela`, {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
          },
        });
        response = await response.json();
        setListaAfectacionParcela(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    return () => abortController.abort();
  }, []);

  //////////////////////////////////////////////////////////////
  //Codigo funciona
  //funcion para listar los labores
  async function Producto() {
    try {
      let response = await fetch(`${URL}/listaProducto`, {
        headers: {
          Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
        },
      });
      response = await response.json();
      setProducto(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  //funcion para listar las parcelas

  ///////////////////////////////////////////////////////////
  //funcion para listar los recursos

  useEffect(() => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgregarAPProducto({ ...agregarAPProducto, [name]: value });
  };

  const handleInputChangex = (e) => {
    setValor({
      ...valor,
      [e.target.name]: e.target.value,
    });
  };

  const SelectChangex = function (e) {
    if (e.target.value === -1) {
      zero();
    } else {
      const opcion = e.target.value;

      buscarProductos(opcion);
    }
  };
  const HandleRemoveProducto = (produc) => {
    setProductoSeleccionado(produc);
    const arreglos = listaAfectacionParcela.filter(
      (Ser) => Ser.Codigo !== productoSeleccionado.Codigo
    );
    setListaAfectacionParcela(arreglos);
  };

  const HandleAddInsert = function () {
    const arreglo = {
      Codigo: buscarProducto.id,
      Producto: buscarProducto.nombre,
      Cantidad: valor.xcantidad,
      precio: buscarProducto.precio,
      Total: valor.xcantidad * buscarProducto.precio,
    };
    if (
      (buscarProducto.cantidad >= arreglo.Cantidad) &
      (arreglo.Cantidad > 0)
    ) {
      if (listaAfectacionParcela.length === 0) {
        setListaAfectacionParcela([...listaAfectacionParcela, arreglo]);
      } else {
      }

      let M = 0;
      listaAfectacionParcela.map((item) => {
        if (item.Codigo === arreglo.Codigo) {
          M = 1;
        } else {
        }
      });

      if (M === 0) {
        setListaAfectacionParcela([...listaAfectacionParcela, arreglo]);
      } else {
        Alerta.fire({
          icon: "info",
          title: "Producto ya agregado.",
        });
      }
    } else {
      Alerta.fire({
        icon: "info",
        title: "no hay suficiente producto en existencia.",
      });
    }
  };
  const zero = function () {
    let dall = {
      id: "",
      nombre: "",
      fecha_compra: "",
      fecha_caducidad: "",
      precio: 0,
      cantidad: 0,
      descripcion: "",
      estado: 0,
    };
    setBuscarProducto(dall);
    let doc = {
      xcantidad: 0,
      xtotal: 0,
    };
    setValor(doc);
    console.log(valor);
  };

  function agrega() {}
  ///////// obten dato
  async function buscarProductos(codigo) {
    try {
      let response = await fetch(`${URL}/buscarProducto/${codigo}`, {
        headers: {
          Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
        },
      });
      response = await response.json();

      let dall = {
        id: response.data[0].id,
        nombre: response.data[0].nombre,
        fecha_compra: response.data[0].fecha_compra,
        fecha_caducidad: response.data[0].fecha_caducidad,
        precio: response.data[0].precio,
        cantidad: response.data[0].cantidad,
        descripcion: response.data[0].descripcion,
        estado: response.data[0].cantidad,
      };

      setBuscarProducto(dall);
    } catch (error) {
      console.log(error);
    }
  }
  const handleUpdateClick = (id) => {
    history.push(`/actividades/actividades/${id}/editarAfectacionparcela`);
  };
  const handleInsertClick = (id) => {
    history.push(`/actividades/actividades/${id}/agregarAPProducto`);
  };
  const seleccionarAfectacionParcela = (afectacionparcela, caso) => {
    setAfectacionParcelaSeleccionado(afectacionparcela);
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
      <Navbar nombre="Productos para corregir la afectacion">
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
                      <php>
                        <h5>Producto</h5>
                      </php>
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
                          {producto.map((parce, index) => (
                            <MenuItem value={parce.id} key={index}>
                              {parce.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={2} sm={3}>
                      <php>
                        <h5>Existencia</h5>
                      </php>
                      <form className={classes.container} noValidate>
                        <TextField
                          required
                          id="existencia"
                          name="existencia"
                          disabled={true}
                          onChange={handleInputChange}
                          value={buscarProducto.cantidad}
                          fullWidth
                        />
                      </form>
                    </Grid>
                    <Grid item xs={12} lg={2} sm={3}>
                      <php>
                        <h5>Cantidad</h5>
                      </php>
                      <form className={classes.container} noValidate>
                        <TextField
                          required
                          id="Cantidad"
                          name="xcantidad"
                          onChange={handleInputChangex}
                          fullWidth
                        />
                      </form>
                    </Grid>
                    <Grid item xs={5} lg={2} sm={3}>
                      <php>
                        <h5>Costo Unitario</h5>
                      </php>
                      <form className={classes.container} noValidate>
                        <TextField
                          required
                          id="Costo"
                          name="Costo"
                          disabled={true}
                          onChange={handleInputChange}
                          value={buscarProducto.precio}
                          fullWidth
                        />
                      </form>
                    </Grid>
                    <Grid item xs={12} lg={2} sm={3}>
                      <php>
                        <h5>Total</h5>
                      </php>
                      <form className={classes.container} noValidate>
                        <TextField
                          required
                          id="Total_Parcial"
                          name="xtotal"
                          value={valor.xcantidad * buscarProducto.precio}
                          disabled={true}
                          onChange={handleInputChangex}
                          fullWidth
                        />
                      </form>
                    </Grid>
                    <Grid item xs={12} lg={2} sm={3}>
                      <php>
                        <h5>.......................</h5>
                      </php>

                      <button onClick={HandleAddInsert}>Agregar lista</button>
                    </Grid>
                    <Grid item xs={12} lg={12} sm={3}>
                      <div className="row my-4">
                        <div className="col">
                          <MaterialTable
                            columns={columns}
                            data={listaAfectacionParcela}
                            title="Productos utilizados"
                            actions={[
                              {
                                icon: "delete",
                                tooltip: "Eliminar Afectación",
                                onClick: (event, rowData) =>
                                  HandleRemoveProducto(rowData),
                              },
                            ]}
                            options={{
                              actionsColumnIndex: -1,
                            }}
                            localization={{
                              header: {
                                actions: "Acciones",
                              },
                              toolbar: {
                                searchTooltip: "Buscar",
                                searchPlaceholder: "Buscar",
                              },
                              pagination: {
                                labelRowsSelect: "Registros",
                                firstTooltip: "Primera página",
                                previousTooltip: "Página anterior",
                                nextTooltip: "Siguiente página",
                                lastTooltip: "Última página",
                              },
                            }}
                          />
                        </div>
                      </div>
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
    </>
  );
};

export default FormAgregarAPProducto;
