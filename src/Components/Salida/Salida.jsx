import NavBar from "../NavBar/Nav.jsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

function Salida() {
  const [usuarioSalida, setUsuarioSalida] = useState([]);
  const [usuarioEntrega, setUsuarioEntrega] = useState([]);
  const [productos, setProductos] = useState([]);
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [cantidad, setCantidad] = useState(0);
  const selectedProduct = watch("producto");

  const getUsuario = async () => {
    const url = "http://192.168.1.175:3000/viewUser"
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await response.json();
    setUsuarioSalida(data);
    setUsuarioEntrega(data);
  }

  const getProductos = async () => {
    const url = "http://192.168.1.175:3000/viewProducts";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const { data } = await response.json();
    setProductos(data);
  }

  const filterCantidad = (data) => {
    const filterCantidad = productos.filter((item) => item.ID_PRODUCTO === parseInt(data));

    if (filterCantidad) {
      setCantidad(filterCantidad[0].CANTIDAD);
    }
  };

  const onSubmit = async (dataSalida) => {
    const url = 'http://192.168.1.175:3000/outputProducts';
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dataSalida),
    })

    const {error} = await response.json();
    if(error === null){
      Swal.fire({
        icon:'success',
        title: 'Producto entregado correctamente',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        reset();
      })
    }
  }

  useEffect(() => {
    getUsuario();
    getProductos();
  }, []);

  useEffect(() => {
    if (selectedProduct && productos.length > 0) {
      filterCantidad(selectedProduct);
    }
  }, [selectedProduct]);

  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-center container pt-5">
        <div className="col-md-8 pt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Usuario Entrega:</label>
              <select
                className="form-control mt-2"
                {...register("userSalida", { required: true })}
                defaultValue=""
              >
                <option value="" disabled>Seleccionar:</option>
                {usuarioSalida.map((item) => (
                  <option key={item.ID_USUARIO} value={item.ID_USUARIO}>
                    {item.NOMBRE + " " + item.APELLIDO}
                  </option>
                ))}
              </select>
              {errors.userSalida && (
                <span className="text-danger">El usuario de quien entrega es requerido.</span>
              )}
            </div>

            <div className="form-group mt-4">
              <label>Producto</label>
              <select
                className="form-control mt-2"
                {...register("producto", { required: true })}
                defaultValue=""
              >
                <option value="" disabled>Seleccionar Producto:</option>
                {productos.map((item) => (
                  <option key={item.ID_PRODUCTO} value={item.ID_PRODUCTO}>
                    {item.NOMBRE_PRODUCTO}
                  </option>
                ))}
              </select>
              {errors.producto && (
                <span className="text-danger">El producto a entregar es requerido.</span>
              )}
            </div>

            <div className="form-group mt-4">
              <label>Cantidad</label>
              <input
                className="form-control mt-2"
                type="number"
                {...register("cantidad", { required: true, max: cantidad , min: 1 })}
                min={1}
                max={parseInt(cantidad)}
              />
              {errors.cantidad && (
                <span className="text-danger">Debe seleccionar cantidad del producto.</span>
              )}
            </div>

            <div className="form-group mt-4">
              <label>Usuario Recibe:</label>
              <select
                className="form-control mt-2"
                {...register("userEntrega", { required: true })}
                defaultValue=""
              >
                <option value="" disabled>Seleccionar:</option>
                {usuarioSalida.map((item) => (
                  <option key={item.ID_USUARIO} value={item.ID_USUARIO}>
                    {item.NOMBRE + " " + item.APELLIDO}
                  </option>
                ))}
              </select>
              {errors.userEntrega && (
                <span className="text-danger">El usuario a quien se entrega es requerido.</span>
              )}
            </div>

            <button type="submit" className="form-control btn btn-success mt-4">Guardar</button>
          </form>

        </div>
      </div>
    </>
  );
}

export default Salida;
