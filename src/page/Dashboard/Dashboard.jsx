import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import URL from "../../configuration/URL";
import axios from "axios";

const Dashboard = () => {
  
    return(
        <Navbar nombre="Dashboard">
      <div class="container-fluid px-4">
        <div class="row g-3 my-2">
          <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 class="fs-2">Actividades</h3>
                <p class="fs-5">Actividades</p>
              </div>
              <i class="fas fa-gift fs-1 primary-text border rounded-full secondary-bg p-3"></i>
            </div>
          </div>

          <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 class="fs-2">Bodega</h3>
                <p class="fs-5">Bodega</p>
              </div>
              <i class="fas fa-hand-holding-usd fs-1 primary-text border rounded-full secondary-bg p-3"></i>
            </div>
          </div>

          <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 class="fs-2">Usuarios</h3>
                <p class="fs-5">Usuarios</p>
              </div>
              <i class="fas fa-truck fs-1 primary-text border rounded-full secondary-bg p-3"></i>
            </div>
          </div>
        </div>

        <div class="row my-5">
         
        </div>
      </div>
    </Navbar>
    )
}

export default Dashboard