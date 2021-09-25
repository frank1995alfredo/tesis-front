import "./login.css";
import { useState } from "react";
import URL from "../../configuration/URL";
import axios from "axios";
import Alerta from "../../components/Alerts/Alerta";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import { Link } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(0),
  },

  withoutLabel: {
    marginTop: theme.spacing(2),
  },
  textField: {
    width: "25ch",
  },
  inputMaterial: {
    width: "100%",
  },
}));

const FormCambiarPassword = () => {
  const inititalFormState = {
    usuario: "",
    password: "",
  };

  const classes = useStyles();

  const [dataPassword, setDataPassword] = useState(inititalFormState);

  const cambiarPassword = async () => {
    await axios
      .put(`${URL}/editarPassword/${dataPassword.usuario}`, dataPassword)
      .then((response) => {
        Alerta.fire({
          icon: "success",
          title: response.data.data,
        });
        console.log(response)
        setDataPassword(inititalFormState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [mostrarPassword, setMostrarPassword] = useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setMostrarPassword({
      ...mostrarPassword,
      showPassword: !mostrarPassword.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
   console.log(dataPassword)
  };

  return (
    <body>
      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-md-3 col-ls-3 position-absolute top-50 start-50 translate-middle">
            <div className="card">
              <div className="card-body">
                <div class="mb-3">
                  <TextField
                    className={classes.inputMaterial}
                    label="Ingrese su usuario"
                    name="usuario"
                    value={dataPassword.usuario}
                    onChange={handleChange}
                  />
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                  >
                   
                    <InputLabel htmlFor="standard-adornment-password">
                     Nueva contraseña
                    </InputLabel>

                    <Input
                      id="standard-adornment-password"
                      type={mostrarPassword.showPassword ? "text" : "password"}
                      value={dataPassword.password}
                      name="password"
                      //style={{ width: "130%" }}
                      fullWidth
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {mostrarPassword.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <button
                  type="button"
                  class="btn btn-success btn-sm"
                  onClick={() => cambiarPassword()}
                >
                  Actualizar contraseña
                </button>
                {" "}
                <Link to="/login" type="button" className="btn btn-secondary btn-sm">
                <i class="fas fa-arrow-left"></i> Regresar
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default FormCambiarPassword;
