import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

import Dashboard from "./page/Dashboard/Dashboard";
import ListaLabor from "./page/Labor/ListaLabor"
import Actividades from "./page/Actividades/Actividades";
import ListaActividades from "./page/Actividades/ListaActividades";
import ListaAfectacion from "./page/Afectacion/ListaAfectacion";
import ListaUsuarios from "./page/Usuarios/ListaUsuarios";
import ListaRecursos from "./page/Recursos/ListaRecursos"
import ListaParcela from "./page/Parcela/ListaParcela";
import Bodega from "./page/Bodega/Bodega";
import FormAgregarActividad from "./page/Actividades/FormAgregarActividad"

function App() {
  
  return (
    <Router>
      <Switch>
      
        <Route exact path="/" component={ Dashboard }/>
        <Route exact path="/actividades/labores" component={ ListaLabor }/>
        <Route exact path="/actividades/afectaciones" component={ ListaAfectacion }/>
        <Route exact path="/actividades/actividades" component={ ListaActividades }/>
        <Route exact path="/actividades/actividades/agregarActividad" component={ FormAgregarActividad }/>
        <Route exact path="/actividades" component={ Actividades }/>
       

        <Route exact path="/usuarios" component={ ListaUsuarios }/>         
        <Route exact path="/parcela" component={ ListaParcela }/>   
        
        
        <Route exact path="/bodega" component={ Bodega }/>   
        <Route exact path="/bodega/recursos" component={ ListaRecursos }/>  

 
      </Switch>
    </Router>
     
  
  )
 
}

export default App;
