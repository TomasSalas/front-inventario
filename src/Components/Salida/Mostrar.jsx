import NavBar from "../NavBar/Nav.jsx"
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";

function MostrarSalida() {
  const navigate = useNavigate();
  const [salida, setSalida] = useState([]);
  const [userRole , setUserRole] = useState(0);

  const getOutputProducts = async () => {
    const url = 'http://192.168.1.32:3000/viewOutputProducts'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const { data } = await response.json()
    setSalida(data[0])
  }

  const validateToken = async () => {
    const token = localStorage.getItem('token');
    if (token != null) {
      const decoded = jwt_decode(token);
      //setDataUser(decoded.data)
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
  };

  useEffect(() => {
    validateToken();
    getOutputProducts()
  }, [])
  return (
    <>
      <NavBar role={userRole}/>
      <div className="container d-flex justify-content-center pt-5">
        <div className="table-responsive pt-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">USUARIO ENTREGA</th>
                <th scope="col">PRODUCTO</th>
                <th scope="col">CANTIDAD</th>
                <th scope="col">SALIDA</th>
                <th scope="col">FECHA SALIDA</th>
              </tr>
            </thead>
            <tbody>
              {salida.map(salida => (
                <tr key={salida.ID_SALIDA}>
                  <td>{salida.ID_SALIDA}</td>
                  <td>{salida.USUARIO_ENTREGA}</td>
                  <td>{salida.NOMBRE_PRODUCTO}</td>
                  <td>{salida.CANTIDAD}</td>
                  <td>{salida.USUARIO_SALIDA}</td>
                  <td>{new Date(salida.FECHA_SALIDA).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default MostrarSalida