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
import ListaAfectacion from "./page/Afectacion/ListaAfectacion";

function App() {
  return (
    <Router>
      <Switch>
      
        <Route exact path="/" component={ Dashboard }/>
        <Route exact path="/actividades/labores" component={ ListaLabor }/>
        <Route exact path="/actividades/afectaciones" component={ ListaAfectacion }/>
        <Route exact path="/actividades" component={ Actividades }/>
 
      </Switch>
    </Router>
     
  
  )
 
}

export default App;
