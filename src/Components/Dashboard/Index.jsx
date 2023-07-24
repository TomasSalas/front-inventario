import NavBar from "../NavBar/Nav"
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();
  const [cantidadSalidas, setCantidadSalidas] = useState(0);
  const [cantidadProductos, setcantidadProductos] = useState(0);
  const [cantidadUsuarios, setcantidadUsuarios] = useState(0);
  const [dataUser , setDataUser] = useState([]);
  const [userRole , setUserRole] = useState(0);
  
  const fetchCantOutProducts = async () => {
    const url = 'http://192.168.1.32:3000/cantOutProducts'
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
    const url = 'http://192.168.1.32:3000/cantProducts'
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
    const url = 'http://192.168.1.32:3000/cantUser'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { data } = await response.json();
    setcantidadUsuarios(data);
  }

  const validateToken = async () => {
    const token = localStorage.getItem('token');
    if (token != null) {
      const decoded = jwt_decode(token);
      setDataUser(decoded.data)
      setUserRole(decoded.role)
      const currentTime = Math.round(new Date().getTime() / 1000);

      if(currentTime > decoded.exp){
        Swal.fire({
          icon:'warning',
          title: 'Sesión expirada',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          localStorage.removeItem('token');
          return navigate('/');
        })
      }
    }else{
      return navigate('/');
    }
  }
  

  useEffect(() => {
    validateToken();
    fetchCantOutProducts();
    fetchCantProducts();
    fetchCantUsuarios();
  }, []);

  return (
    <>
      <NavBar role={userRole}/>

      <div className="container pt-5">
        <div className="row pt-5">
          <div>
            <h2>Bienvenido: <span style={{color:"green"}}>{dataUser.Nombre + ' ' + dataUser.APELLIDO}</span></h2>
          </div>
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