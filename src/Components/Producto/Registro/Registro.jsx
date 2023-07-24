import NavBar from "../../NavBar/Nav.jsx"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"

function Registro () {
  const navigate = useNavigate();
  const [ productHistory , setProductHistory] = useState([]);
  const [userRole , setUserRole] = useState(0);

  const getHistory = async () => {
    const url = 'http://192.168.1.32:3000/viewChangeHistory'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { data } = await response.json();
    setProductHistory(data);
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
  useEffect(() =>{
    validateToken();
    getHistory();
  },[])

  return (
    <>
      <NavBar role={userRole}/>
      <div className="container pt-5">
        <div className="table-responsive pt-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID HISTORICO</th>
                <th scope="col">USUARIO MODIFICADOR</th>
                <th scope="col">PRODUCTO</th>
                <th scope="col">CANTIDAD</th>
                <th scope="col">FECHA MODIFICACION</th>
              </tr>
            </thead>
            <tbody>
            {productHistory.map(item => (
                <tr key={item.ID_HISTORICO}>
                  <td>{item.ID_HISTORICO}</td>
                  <td>{item.NOMBRE + ' ' +item.APELLIDO}</td>
                  <td>{item.NOMBRE_PRODUCTO}</td>
                  <td>{item.CANTIDAD}</td>
                  <td>{new Date(item.FECHA).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Registro