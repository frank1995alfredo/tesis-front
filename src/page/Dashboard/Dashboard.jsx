import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Bar, Pie } from "react-chartjs-2";
import URL from "../../configuration/URL";
import axios from "axios";
import valorToken from "../../configuration/valorToken";
import validadCedula from "../../configuration/validarCedula";

const Dashboard = () => {

  validadCedula("2100373873")

  const token = valorToken()

  var y = new Date().getFullYear();

 const [listaCompras, setListaCompras] = useState([]);
 const [listaGastos, setListaGastos] = useState([]);

 useEffect(() => {
  const abortController = new AbortController();

  //LISTAR COMPRAS
  const listaCompras = async () => {
    try {
      let response = await fetch(`${URL}/listaProductoPorMes`, {
        signal: abortController.signal,
        headers: 
        {
          Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
        }
      });
      response = await response.json();
      setListaCompras(response.data);
    } catch (error) {
      console.log(error);
      if (abortController.signal.aborted) {
        console.log(abortController.signal.aborted);
      } else throw error;
    }
  };

  //LISTAR GASTOS
  const listaGastos = async () => {
    try {
      let response = await fetch(`${URL}/listaProductoGastosPorMes`, {
        signal: abortController.signal,
        headers: 
        {
          Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
        }
      });
      response = await response.json();
      setListaGastos(response.data);
    } catch (error) {
      console.log(error);
      if (abortController.signal.aborted) {
        console.log(abortController.signal.aborted);
      } else throw error;
    }
  };
   
  listaCompras();
  listaGastos();
  return () => abortController.abort();
}, []);


  const data = {
    labels:    
        listaCompras.map(compra => (compra.mes))  
    ,
    datasets: [
      {
        label: `Compras de productos por mes del año ${y}`,
        data: listaCompras.map(compra => (compra.num)),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const data3 = {
    labels: 
    listaGastos.map(gasto => (gasto.mes)),
    datasets: [
      {
        label: `Gastos de productos por mes del año ${y}`,
        data: listaGastos.map(gasto => (gasto.total)),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options3 = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Navbar nombre="Estadísticas">
      <div class="container-fluid px-4">
        <div className="row g-3 my-2">
          <div class="col-md-12">
            <Bar data={data} options={options} />
          </div>
        </div>
        <div className="row g-3 my-2">
          <div class="col-md-12">
            <Bar data={data3} options={options3} />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Dashboard;
