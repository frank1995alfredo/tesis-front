import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./login.css";
import URL from "../../configuration/URL";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  inputMaterial: {
    width: "100%",
  },
}));

const Login = () => {


  const inititalFormState = {
    usuario: "",
    password: "",
  }

  const [token, setToken] = useState("")
  const [dataLogin, setDataLogin] = useState(inititalFormState);

  const classes = useStyles();


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

  const login = async () => {

    await axios.post(`${URL}/login`, dataLogin)
      .then((response) => {
        setToken(response);
        console.log(response.data.access_token)
        setDataLogin(inititalFormState)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(dataLogin)

  };

  return (
    <body>
      <section className="ftco-section">
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
                    value={dataLogin.usuario}
                    onChange={handleChange}
                  />
                    <FormControl
                    className={clsx(classes.margin, classes.textField)}
                  >
                   
                    <InputLabel htmlFor="standard-adornment-password">
                      Ingrese su contraseña
                    </InputLabel>

                    <Input
                      id="standard-adornment-password"
                      type={mostrarPassword.showPassword ? "text" : "password"}
                      value={dataLogin.password}
                      name="password"
                     
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
                 
                  <button type="button" class="btn btn-success btn-sm" onClick={() => login()}>
                    Ingresar
                  </button>
                </div>
                <div className="text-center">
                  <Link to="/cambiarPassword" type="button">
                     ¿Se olvidó la contraseña?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
};

export default Login;
