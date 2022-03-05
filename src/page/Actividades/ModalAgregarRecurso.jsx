import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../../components/Modals/Modal2";
import valorToken from "../../configuration/valorToken";
import URL from "../../configuration/URL";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  inputMaterial: {
    width: "100%",
  },
}));

const select = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 140,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ModalAgregarRecurso = ({ abrirCerrarModalInsertar, modalInsertar }) => {
  const token = valorToken();

  const styles = useStyles();

  const initialFormState = {
    id: null,
    idrecurso: 0, 
    recurso: "",
    cantidad: 0,
    costo: 0.0,
    idtrabajador: 0,
    trabajador: ""
  };
  const [data, setData] = useState(initialFormState);
  const [listaRecurso, setListaRecurso] = useState([]);
  const [listaTipoTrabajador, setListaTipoTrabajador] = useState([]);

  const datosUsuario = [
    { id: 1, nombre: "franklin", apellido: "canadas" },
    { id: 2, nombre: "franklin2", apellido: "canadas2" },
    { id: 3, nombre: "franklin3", apellido: "canadas3" },
  ];

  const [datos, setDatos] = useState(datosUsuario);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    console.log(e.target.name);
  };


  const agregarData = (e) => {
    e.preventDefault();
    data.id = datos.length + 1;
    setDatos([...datos, data]);
    setData(initialFormState);
  };

  const eliminarData = (id) => {
    setDatos(datos.filter((dato) => dato.id !== id));
  };

  //LISTAS
  useEffect(() => {
    const abortController = new AbortController();

    const listaRecurso = async () => {
      try {
        let response = await fetch(`${URL}/listaRecursos`, {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
          },
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

    const listaTrabajor = async () => {
      try {
        let response = await fetch(`${URL}/listaTipoTrabajador`, {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
          },
        });
        response = await response.json();
        setListaTipoTrabajador(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log(abortController.signal.aborted);
        } else throw error;
      }
    };

    listaRecurso();
    listaTrabajor();

    return () => abortController.abort();
  }, []);

  const classesSelect = select();

  return (
    <>
      <Modal open={modalInsertar} close={abrirCerrarModalInsertar}>
        <form onSubmit={agregarData}>
          <div class="mb-3">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={3} sm={3}>
                <FormControl className={classesSelect.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Tipo Recurso
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
              <Grid item xs={12} lg={3} sm={3}>
                <FormControl className={classesSelect.formControl}>
                  <TextField
                    label="Cantidad de recurso"
                    pattern="[0-9]{0,13}"
                    onChange={handleInputChange}
                    name="cantidad"
                    id="formatted-numberformat-input"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={3} sm={3}>
                <TextField
                  label="Costo del recurso"
                  pattern="[0-9]{0,13}"
                  onChange={handleInputChange}
                  name="costo"
                  id="formatted-numberformat-input"
                />
              </Grid>
              <Grid item xs={12} lg={3} sm={3}>
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
            </Grid>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Apellido
            </label>
            <input
              type="text"
              class="form-control form-control-sm"
              id="exampleInputPassword1"
              name="apellido"
              onChange={handleInputChange}
              value={data.apellido}
            />
          </div>

          <button class="btn btn-primary btn-sm">Agregar</button>
        </form>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Recurso</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Costo</th>
              <th scope="col">Trabajador</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.length > 0 &&
              datos.map((p, index) => (
                <tr key={index}>
                  <th scope="row">{p.id}</th>
                  <td>{p.nombre}</td>
                  <td>{p.apellido}</td>
                  <td>{p.nombre}</td>
                  <td>{p.apellido}</td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarData(p.id)}
                    >
                      Eliminar
                    </button>{" "}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Modal>
    </>
  );
};

export default ModalAgregarRecurso;
