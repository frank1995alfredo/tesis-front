import Navbar from "../../components/Navbar/Navbar";

import { Link } from "react-router-dom";


const Actividades = () => {
  return (
    <Navbar nombre="Actividades">
      <div class="container-fluid px-4">
        <div class="row g-3 my-2">
        

          <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <Link
                  to="/actividades/labores"
                  className="list-group-item list-group-item-action bg-transparent second-text active"
                >
                  <p className="text-center">Labores</p>
                </Link>
              </div>
              <i class="fas fa-gift fs-1 primary-text border rounded-full secondary-bg p-3"></i>
            </div>
          </div>

          <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <Link
                  to="/actividades/actividades"
                  className="list-group-item list-group-item-action bg-transparent second-text active"
                >
                  <p className="text-center">Actividades</p>
                </Link>
              </div>
              <i class="fas fa-gift fs-1 primary-text border rounded-full secondary-bg p-3"></i>
            </div>
          </div>

          <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <Link
                  to="/parcela"
                  className="list-group-item list-group-item-action bg-transparent second-text active"
                >
                  <p className="text-center">Parcelas</p>
                </Link>
              </div>
              <i class="fas fa-gift fs-1 primary-text border rounded-full secondary-bg p-3"></i>
            </div>
          </div>

          <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <Link
                  to="/actividades/afectaciones"
                  className="list-group-item list-group-item-action bg-transparent second-text active"
                >
                  <p className="text-center">Afectación</p>
                </Link>
              </div>
              <i class="fas fa-gift fs-1 primary-text border rounded-full secondary-bg p-3"></i>
            </div>
          </div>


        </div>

        <div class="row my-5"></div>
      </div>
    </Navbar>
  );
};

export default Actividades;