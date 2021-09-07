import Wrapper from "../Wrapper/Wrapper";
import { Link } from "react-router-dom";

const Sidebar = ({ children }) => (

    <Wrapper>
      <div className="bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
          <i className="fas fa-user-secret me-2"></i>SisArroz
        </div>
        <div className="list-group list-group-flush my-3">
          <Link
            to="/"
            className="list-group-item list-group-item-action bg-transparent second-text active"
          >
            <i className="fas fa-tachometer-alt me-2"></i>Dashboard
          </Link>

          <Link
            to="/actividades"
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <i className="fas fa-boxes"></i> Actividades
          </Link>

          <Link
            to="/bodega"
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <i className="fas fa-users me-2"></i> Bodega
          </Link>
          <Link
            to="/usuarios"
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <i className="fas fa-users me-2"></i> Usuarios
          </Link>
        </div>
      </div>

      {children}
    </Wrapper>
  );


export default Sidebar;