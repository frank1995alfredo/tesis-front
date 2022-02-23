import { useState, useEffect,useRef } from "react";
import React, { Component } from 'react';
import { TextField, Button, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../components/Modals/Modal";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from '@material-ui/icons/Edit';
import URL from "../../configuration/URL";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import valorToken from "../../configuration/valorToken";

const useStyles = makeStyles((theme) => ({
  inputMaterial: {
    width: "100%",
  },
}));

const ModalAgregarProd = ({
  modalEditar,
  abrirCerrarModalEditar,
  afectacionparcelaSeleccionado,
  setAfectacionParcelaSeleccionado,
  listaAfectacionParcela,
  setListaAfectacionParcela

}) => {
  const initialFormState = {
    id: null,
    idafectacion: 0,
    idparcela: 0,
    fecha: "",
    observacion: "",
    estado: 0,
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAfectacionParcelaSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleInput = (e) => {
    const {value, name} = e.target;
    console.log(e.target.value, e.target.name);
    this.setState({
        [name]: value
    });
};
  
  const styles = useStyles();
  const [editarAfectacionParcela, setEditarAfectacionParcela] = useState(initialFormState);
  const [listaParcela, setListaParcela] = useState([]);
  const [listaAfectacion, setListaAfectacion] = useState([]);
  const countRef = useRef(0);


  const editarAfectacionParcela1 = async() => {
    await axios.put(`${URL}/editarAfectacionParcela/`+ afectacionparcelaSeleccionado.id, afectacionparcelaSeleccionado, {
       headers: {
                  Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
              },
    })
    .then(response => {
      let afectacionparcelaNuevo = listaAfectacionParcela;
      afectacionparcelaNuevo.map(afectacionparcela => {
        if(afectacionparcela.id === afectacionparcelaSeleccionado.id) {
          afectacionparcela.id = afectacionparcelaSeleccionado.id;
          afectacionparcela.idparcela = afectacionparcelaSeleccionado.idparcela;
          afectacionparcela.idafectacion = afectacionparcelaSeleccionado.idafectacion;
          afectacionparcela.fecha = afectacionparcelaSeleccionado.fecha;
          afectacionparcela.observacion = afectacionparcelaSeleccionado.observacion;
          afectacionparcela.estado = afectacionparcelaSeleccionado.estado;
        }
      });
      setListaAfectacionParcela(afectacionparcelaNuevo);
      Alerta.fire({
        icon: "success",
        title: "Registro editado.",
      });
      abrirCerrarModalEditar();
    }).catch(error => {
      console.log(error);
    })
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditarAfectacionParcela({ ...editarAfectacionParcela, [name]: value });
    console.log(editarAfectacionParcela);
  };
  const handleSelect = (event,e) => {
    this.setState ({value: event.target.value});
  };

  


 /*  --------------------------------------------------------------------------------------------------------------------------------*/
 useEffect(() => {
 
 const abortController = new AbortController();
 const listaParcela = async () => {
  try {
    let response = await fetch(`${URL}/listaParcela`, {
      signal: abortController.signal,
       headers: {
                  Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
              },
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
       headers: {
                  Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
              },
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


  /*--------------------------------------------------------------------------------------------------------------------------------*/


  return (
    <Modal open={modalEditar} close={abrirCerrarModalEditar}>
      <h3>Editar AfectacionParcela</h3>
      <InputLabel id="demo-simple-select-label">
          Número parcela
          </InputLabel>
            <div className="form-group">
            <Select
                  
                  labelId="demo-simple-select-label"
                  className="form-control"
                  id="demo-simple-select"
                  name="idparcela"
                  onChange={handleChange}
                  
              >
              {listaParcela.map((parcela, index) => (
                  <MenuItem key={index} value={parcela.id}>
                    {parcela.numero}
                  </MenuItem>
              ))}
          </Select>
            </div>
            
          
      <br />
            <div className="form-group">
            <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="idafectacion"
                    className="form-control"
                    onChange={handleChange}
                    defaultValue={afectacionparcelaSeleccionado.idafectacion}
                >
              {listaAfectacion.map((afectacion, index) => (
          <MenuItem key={index} value={afectacion.id}>
              {afectacion.nombre_afectacion}
                              
          </MenuItem>
                            
                            
            ))}
         
                          
      </Select>
            </div>
         
      <br />
      <TextField
        id="fecha"
        className={styles.inputMaterial}
        label="Fecha"
        name="fecha"
        type="date"
        value={afectacionparcelaSeleccionado.fecha}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />                
      <br />
      <TextField
        className={styles.inputMaterial}
        label="observacion"
        name="observacion"
        value={afectacionparcelaSeleccionado.observacion}
        onChange={handleChange}
      />
      <br />
      <Checkbox
        className={styles.checkboxMaterial}
        label="Estado"
        name="nombre"
        value={afectacionparcelaSeleccionado.estado}
      />
      <br />
      
      <br />
      <div align="right">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => editarAfectacionParcela()}
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

export default ModalAgregarProd;
