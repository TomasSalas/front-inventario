import { useEffect, useState } from "react";
import NavBar from "../../NavBar/Nav.jsx"
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"

function IngresarCliente() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [clientesType, setClientesType] = useState([]);
  const [userRole , setUserRole] = useState(0);

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
  }

  const onSubmit = async (dataClient) => {
    const url = "http://192.168.1.32:3000/createUser"
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(dataClient),
    })

    const data = await response.json();

    if( data.error === null){
      Swal.fire({
        icon:'success',
        title: 'Usuario creado correctamente',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        reset();
      })
    }else if (data.message.includes("Duplicate entry")){
      Swal.fire({
        icon: 'error',
        title: 'Usuario no creado por que correo ya existe',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        reset();
      })
    }
  };

  const tipoUsario = async () => {
    const url = "http://192.168.1.32:3000/viewTypeUser";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    const { data } = await response.json();
    setClientesType(data);
  }

  useEffect(() => {
    validateToken();
    tipoUsario();
  }, [])
  return (
    <>
      <NavBar role={userRole}/>
      <div className="container d-flex justify-content-center pt-5">
        <div className="row col-md-6">
          <form className=" pt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Nombre"
                className="form-control"
                {...register("nombre", { required: true })}
              />
              {errors.nombre && (
                <span className="text-danger">El nombre del cliente u usuario es requerido.</span>
              )}
            </div>

            <div className="form-group pt-3">
              <input
                type="text"
                placeholder="Apellido"
                className="form-control"
                {...register("apellido", { required: true })}
              />
              {errors.apellido && (
                <span className="text-danger">El apellido del cliente u usuario es requerido.</span>
              )}
            </div>

            <div className="form-group pt-3">
              <input
                type="text"
                placeholder="Correo"
                className="form-control"
                {...register("email", { required: true , pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "El correo electrónico no es válido"
                }})}
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message || 'El correo del cliente u usuario es requerido.'}</span>
              )}
            </div>


            <div className="form-group pt-3">
              <select
                className="form-control"
                {...register("tipoUsuario", { required: true })}
              >
                {clientesType.map((item) => (
                  <option key={item.ID_TIPO_USUARIO} value={item.ID_TIPO_USUARIO}>
                    {item.DESC_TIPO_USUARIO}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group pt-3">
              <input
                type="password"
                placeholder="Contraseña"
                className="form-control"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-danger">La contraseña del cliente u usuario es requerido.</span>
              )}
            </div>

            <div className="d-flex justify-content-center form-group pt-3">
              <button className="btn btn-success" type="submit">Guardar Cliente</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}


export default IngresarCliente;