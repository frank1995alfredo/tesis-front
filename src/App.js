import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import Dashboard from "./page/Dashboard/Dashboard";
import ListaLabor from "./page/Labor/ListaLabor";
import Actividades from "./page/Actividades/Actividades";
import ListaActividades from "./page/Actividades/ListaActividades";
import ListaAfectacion from "./page/Afectacion/ListaAfectacion";
import ListaUsuarios from "./page/Usuarios/ListaUsuarios";
import ListaRecursos from "./page/Recursos/ListaRecursos";
import ListaParcela from "./page/Parcela/ListaParcela";
import Bodega from "./page/Bodega/Bodega";
import FormAgregarActividad from "./page/Actividades/FormAgregarActividad";
import FormEditarActividad from "./page/Actividades/FormEditarActividad";
import ListaProducto from "./page/Producto/ListaProducto";
import Login from "./page/Login/Login";
import FormCambiarPassword from "./page/Login/FormCambiarPassword";

import FormEnviarEmailPassword from "./page/Login/FormEnviarEmailPassword";
import ListaAfectacionParela from "./page/AfectacionParcela/ListaAfectacionParcela";

import PrivateRoute from "./components/Routers/PrivateRoute";
import AuthProvider from "./auth/AuthProvider";
import NotFound from "./page/404/NotFound";
import formAgregarAfectacionParcela from "./page/AfectacionParcela/formAgregarAfectacionParcela";
import FormEditarAfectacionParcela from "./page/AfectacionParcela/FormEditarAfectacionParcela";
import FormAgregarAPProducto from "./page/approducto/ListaAPProducto";
import FormEditarAPProducto from "./page/approducto/FormEditarAPProducto";
import ListaAPProducto from "./page/approducto/ListaAPProducto";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/cambiarPassword"
            component={FormEnviarEmailPassword}
          />

          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/actividades" component={Actividades} />
          <PrivateRoute
            exact
            path="/actividades/labores"
            component={ListaLabor}
          />
          <PrivateRoute
            exact
            path="/actividades/afectaciones"
            component={ListaAfectacion}
          />
          <PrivateRoute
            exact
            path="/actividades/actividades"
            component={ListaActividades}
          />
          <PrivateRoute
            exact
            path="/actividades/actividades/agregarActividad"
            component={FormAgregarActividad}
          />
          <PrivateRoute
            exact
            path="/actividades/actividades/:id/editarActividad"
            component={FormEditarActividad}
          />

          <PrivateRoute
            exact
            path="/actividades/afectacionParcela"
            component={ListaAfectacionParela}
          />

          <PrivateRoute
            exact
            path="/actividades/actividades/agregarAfectacionParcela"
            component={formAgregarAfectacionParcela}
          />

          <PrivateRoute
            exact
            path="/actividades/actividades/:id/editarAfectacionParcela"
            component={FormEditarAfectacionParcela}
          />

          <PrivateRoute
            exact
            path="/actividades/actividades/:id/agregarAPProducto"
            component={FormAgregarAPProducto}
          />

          <PrivateRoute
            exact
            path="/actividades/actividades/:id/editarAPProducto"
            component={FormEditarAPProducto}
          />

          <PrivateRoute
            exact
            path="/actividades/actividades/listaAPProducto"
            component={ListaAPProducto}
          />

          <PrivateRoute exact path="/usuarios" component={ListaUsuarios} />
          <PrivateRoute exact path="/actividades/parcela" component={ListaParcela} />

          <PrivateRoute exact path="/bodega" component={Bodega} />
          <PrivateRoute
            exact
            path="/bodega/recursos"
            component={ListaRecursos}
          />

          <PrivateRoute
            exact
            path="/bodega/producto"
            component={ListaProducto}
          />

          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
