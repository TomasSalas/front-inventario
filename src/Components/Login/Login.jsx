import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const jwt = localStorage.getItem('token');

  const onSubmit = async (dataClient) => {
    const url = "http://192.168.1.32:3000/login"
    const response = await fetch(url,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(dataClient)
    })
    const data = await response.json();

    if(data.error === null){
      Swal.fire({
        icon:'success',
        title: 'Acceso valido',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        localStorage.setItem('token', data.data);
        navigate('/dashboard');
      })
    }
  }

  const verifyToken = async () => {
    if(jwt){
      return navigate('/dashboard')
    }else{
      return navigate('/')
    }
  }
  
  useEffect(() => {
    verifyToken();
  },[])

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="col-md-4">
          <div className="container d-flex flex-column align-items-center justify-content-center">
            <img
              src="../../src/assets/inventario-disponible.png"
              alt="Imagen de SalidaProducto"
              style={{ width: '70px', height: '70px' }}
            />
            <h4 className="mt-3">
              Inicio de sesión
            </h4>
          </div>
          <form className="pt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-danger">El correo es necesario</span>
              )}
            </div>

            <div className="form-group pt-3">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-danger">La contraseña es necesaria</span>
              )}
            </div>

            <div className="form-group pt-3">
              <button
                className="form-control btn btn-success"
                type="submit"
              >Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;