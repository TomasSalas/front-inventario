import { useEffect, useState } from "react";
import NavBar from "../../NavBar/Nav.jsx"
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

function Ingresar() {
  const [data, setData] = useState("");
  const { register, handleSubmit, formState: { errors } , reset } = useForm();
  
  const onSubmit = async (data) => {
    const url = "http://192.168.1.175:3000/addProduct";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })

    const { error } = await response.json();
    

    if(error == null) {
      Swal.fire({
        icon:'success',
        title: 'Producto agregado correctamente',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        reset();
      })
    }

  }
  const fetchData = async () => {
    const url = "http://192.168.1.175:3000/viewTypeProduct";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    const { data } = await response.json();
    setData(data);
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <NavBar />
      <div className="container d-flex justify-content-center pt-5">
        <div className="row col-md-6">
          <form className=" pt-5" onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Nombre Producto"
                {...register("nombre_producto", { required: true })}
              />

              {errors.nombre_producto && (
                <span className="text-danger">El nombre del producto es requerido.</span>
              )}
            </div>

            <div className="form-group">
              {data.length > 0 && (
                <select
                  className="form-control mt-4"
                  {...register("tipoProducto", { required: true })}
                >
                  {data.map((item) => (
                    <option key={item.ID_TIPO_PRODUCTO} value={item.ID_TIPO_PRODUCTO}>
                      {item.GLOSA}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="form-group">
              <input
                placeholder="Cantidad"
                className="form-control mt-4"
                type="number"
                {...register("cantidad", { min: 1, required: true })}
              />
              {errors.cantidad && (
                <span className="text-danger">La cantidad es requerida y debe ser mayor a 0.</span>
              )}
            </div>

            <div className="form-group">
              <input
                placeholder="Precio"
                className="form-control mt-4"
                type="number"
                {...register("precio", { min: 1000, required: true })}
              />
              {errors.precio && (
                <span className="text-danger">El precio es requerido!</span>
              )}
            </div>

            <input
              className="form-control btn btn-success mt-4"
              type="submit"
              title="Guardar"
            />
            
          </form>
        </div>
      </div>
    </>
  )
}

export default Ingresar