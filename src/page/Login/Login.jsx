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
import useAuth from "../../auth/useAuth";
import useToken from "../../configuration/useToken"
import useUser from "../../configuration/useUser";
import { useHistory } from "react-router-dom";
import Alerta from "../../components/Alerts/Alerta";

const useStyles = makeStyles((theme) => ({
  inputMaterial: {
    width: "100%",
  },
}));


const Login = () => {
  const auth = useAuth();  

  
  const data = localStorage.getItem('user');
  //console.log(data)

   const history = useHistory()
 


  const inititalFormState = {
    usuario: "",
    password: "",
  }

  const {token, setToken} = useToken()
  const {tipoUser, setTipoUser} = useUser()

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
    auth.login() 
    console.log(dataLogin)
    await axios.post(`${URL}/login`, dataLogin, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    })
      .then((response) => {
      
        setToken(response.data.token)
        setTipoUser(response.data.tipouser)
        
        if(auth) {
          history.push('/')
        }
        console.log(token)
        console.log(response.data.tipouser)
        setDataLogin(inititalFormState)
      })
      .catch((error) => {
        Alerta.fire({
          icon: "error",
          title: "Datos incorrectos.",
        });
        console.log(error)
      });
  };

  const login2 = async() => {
    auth.login() 
    try {
      let config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'applciation/json',
        },
        body: JSON.stringify(dataLogin)
      }
      console.log(dataLogin)
      
      let res = await fetch(`${URL}/login`, config)
      let json = await res.json()
      console.log(json)
    }catch(error) {
      Alerta.fire({
        icon: "error",
        title: "Datos incorrectos.",
      });
      console.log(error)
    }
  }
  
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
                 
                  <button type="submit" class="btn btn-success btn-sm" onClick={() => login2()}>
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
