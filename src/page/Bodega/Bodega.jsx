import Navbar from "../../components/Navbar/Navbar";

import { Link } from "react-router-dom";


const Bodega = () => {
  return (
    <Navbar nombre="Bodega">
      <div class="container-fluid px-4">
        <div class="row g-3 my-2">
        

          <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <Link
                  to="/bodega/producto"
                  className="list-group-item list-group-item-action bg-transparent second-text active"
                >
                  <p className="text-center">Productos (Insumos)</p>
                </Link>
              </div>
              <i class="fas fa-gift fs-1 primary-text border rounded-full secondary-bg p-3"></i>
            </div>
          </div>

          <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <Link
                  to="/bodega/recursos"
                  className="list-group-item list-group-item-action bg-transparent second-text active"
                >
                  <p className="text-center">Recursos (Herramientas)</p>
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
export default Bodega;