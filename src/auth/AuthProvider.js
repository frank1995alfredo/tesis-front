import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('token')) || null
  );

  const [tipoUser, setTipoUser] = useState(
    JSON.parse(localStorage.getItem('tipouser')) || null
  )

  const [nombreUsuario, setNombreUsuario] = useState(
    JSON.parse(localStorage.getItem('nombreUsuario')) || null
  )
  
  useEffect(() => {
    try {
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('tipouser', JSON.stringify(tipoUser));
      localStorage.setItem('usuario', JSON.stringify(nombreUsuario));
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("tipouser");
      localStorage.removeItem("nombreUsuario");
    }
  }, [token]);

  const contextValue = {
    token,
    tipoUser,
    nombreUsuario,
    login() {
      setToken(localStorage.getItem('token'));
      setTipoUser(localStorage.getItem('tipouser'))
      setNombreUsuario(localStorage.getItem('nombreUsuario'))
    },
    logout() {
      setToken(null);
      setTipoUser(null);
      setNombreUsuario(null);
    },
    isLogged() {
      return !!token;
    },
    isAdmin() {
      return JSON.parse(localStorage.getItem('tipouser')) === 'Admin' ? true : false
    },
    isTrabajador() {
      return JSON.parse(localStorage.getItem('tipouser')) === 'Trabajador' ? true : false
    }

  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
