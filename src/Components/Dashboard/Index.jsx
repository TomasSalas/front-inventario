import NavBar from "../NavBar/Nav"
import { useEffect, useState } from "react";
import './style.css'

function Index() {
  const [cantidadSalidas, setCantidadSalidas] = useState(0);
  const [cantidadProductos, setcantidadProductos] = useState(0);
  const [cantidadUsuarios, setcantidadUsuarios] = useState(0);


  const fetchCantOutProducts = async () => {
    const url = 'http://192.168.1.175:3000/cantOutProducts'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { data } = await response.json();
    setCantidadSalidas(data);
  }

  const fetchCantProducts = async () => {
    const url = 'http://192.168.1.175:3000/cantProducts'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { data } = await response.json();
    setcantidadProductos(data);
  }

  const fetchCantUsuarios = async () => {
    const url = 'http://192.168.1.175:3000/cantUser'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { data } = await response.json();
    setcantidadUsuarios(data);
  }

  useEffect(() => {
    fetchCantOutProducts();
    fetchCantProducts();
    fetchCantUsuarios();
  }, []);

  return (
    <>
      <NavBar />

      <div className="container pt-5">
        <div className="row pt-5">
          <div className="d-flex justify-content-center col-md-4 pt-5">
            <div className="card flex-fill" style={{ height: '100%' }}>
              <div className="card-body">
                <div className="card-text d-flex justify-content-between">
                  Salida Producto
                  <img
                    src="../../src/assets/cerrar-sesion.png"
                    alt="Imagen de SalidaProducto"
                    style={{ width: '70px', height: '70px' }}
                  />
                </div>
                <h2>{cantidadSalidas}</h2>
              </div>
            </div>
          </div>


          <div className="d-flex justify-content-center col-md-4 pt-5">
            <div className="card flex-fill" style={{ height: '100%' }}>
              <div className="card-body">
                <div className="card-text d-flex justify-content-between">
                  Cantidad de Productos
                  <img
                    src="../../src/assets/producto.png"
                    alt="Imagen de SalidaProducto"
                    style={{ width: '70px', height: '70px' }}
                  />
                </div>
                <h2>{cantidadProductos}</h2>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center col-md-4 pt-5">
            <div className="card flex-fill" style={{ height: '100%' }}>
              <div className="card-body">
                <div className="card-text d-flex justify-content-between">
                  Cantidad de Usuarios
                  <img
                    src="../../src/assets/trabajando.png"
                    alt="Imagen de SalidaProducto"
                    style={{ width: '70px', height: '70px' }}
                  />
                </div>
                <h2>{cantidadUsuarios}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Index