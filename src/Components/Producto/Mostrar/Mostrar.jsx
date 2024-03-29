/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import NavBar from "../../NavBar/Nav.jsx";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"

function Mostrar() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [typeProduct, setTypeProduct] = useState([]);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [searchValue, setSearchValue] = useState('');
  const [userRole , setUserRole] = useState(0);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleOpenModal = (rowData) => {
    setValue("id", rowData.ID_PRODUCTO);
    setValue("nombre", rowData.NOMBRE_PRODUCTO);
    setValue("tipoProducto", rowData.ID_TIPO_PRODUCTO);
    setValue("cantidad", rowData.CANTIDAD);
    setValue("precio", rowData.PRECIO);
  };

  const deleteProduct = async (data) => {
    Swal.fire({
      title: 'Seguro que desea eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const url = "http://192.168.1.32:3000/deleteProduct";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ "id": data })
        });
        const { error } = await response.json();
        if (error === null) {
          Swal.fire(
            'Eliminado!',
            'Producto a sido eliminado.',
            'success'
          ).then(() => {
            fetchData();
          })

        } else {
          Swal.fire(
            'Error!',
            'Error al eliminar el producto.',
            'error'
          )
        }
      }
    })
  };

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

  const changeProduct = async (data) => {
    const url = 'http://192.168.1.32:3000/changeHistory';
    const response = await fetch(url , {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id:1, // CHANGE ID USER LOGIN
        idProducto: data.id,
        cantidad: data.cantidad
      })
    });

    const {error} = await response.json();

    if( error === null){
      return true;
    }
  };

  const onSubmit = async (data) => {
    const url = "http://192.168.1.32:3000/updateProduct";
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data)
    });

    if(!changeProduct(data)){
      Swal.fire(
        'Error',
        'Registro historico con error',
        'error'
      );
      return;
    }

    const { error } = await response.json();
    if (error === null) {
      Swal.fire(
        'Exito!',
        'Producto actualizado correctamente',
        'success'
      ).then(() => {
        window.location.reload();
      })
    }
  };

  const fetchData = async () => {
    const url = "http://192.168.1.32:3000/viewProducts";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const { data } = await response.json();
    setProductos(data);
  };

  const viewTypeProduct = async () => {
    const url = "http://192.168.1.32:3000/viewTypeProduct";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    const { data } = await response.json();
    setTypeProduct(data);
  };

  useEffect(() => {
    validateToken();
    fetchData();
    viewTypeProduct();
  }, []);

  return (
    <>
      <NavBar role={userRole}/>
      <div className="container d-flex justify-content-center pt-5">
        <div className="table-responsive pt-5">
          {/* INPUT BUSQUEDA */}
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar"
              style={{ width: 150 }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          {/* TABLE */}
          <div className="mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NOMBRE PRODUCTO</th>
                  <th scope="col">TIPO PRODUCTO</th>
                  <th scope="col">FECHA INGRESO</th>
                  <th scope="col">FECHA MODIFICACION</th>
                  <th scope="col">CANTIDAD</th>
                  <th scope="col">PRECIO</th>
                  <th scope="col">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {productos.filter((producto) =>
                  producto.NOMBRE_PRODUCTO.toLowerCase().includes(searchValue.toLowerCase())
                ).map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.ID_PRODUCTO}</td>
                    <td>{producto.NOMBRE_PRODUCTO}</td>
                    <td>{producto.GLOSA}</td>
                    <td style={{ color: "green" }}>
                      {new Date(producto.FECHA_INGRESO).toLocaleDateString()}
                    </td>
                    <td style={{ color: "red" }}>
                      {new Date(producto.FECHA_UPDATE).toLocaleDateString()}
                    </td>
                    <td style={{ color: producto.CANTIDAD <= 2 ? "red" : "green" }}>
                      {producto.CANTIDAD}
                    </td>
                    <td>
                      {producto.PRECIO.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => handleOpenModal(producto)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteProduct(producto.ID_PRODUCTO)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
      {/* MODAL */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Editar producto</h5>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>Codigo:</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    {...register("id")}
                  >
                  </input>
                </div>

                <div className="form-group mt-3">
                  <label>Nombre Producto</label>
                  <input
                    type="text"
                    className="form-control "
                    {...register("nombre")}
                  >
                  </input>
                </div>

                <div className="form-group mt-3">
                  <label>Tipo Producto</label>
                  <select
                    className="form-control"
                    {...register("tipoProducto")}
                  >
                    {typeProduct.map((item) => (
                      <option key={item.ID_TIPO_PRODUCTO} value={item.ID_TIPO_PRODUCTO}>
                        {item.GLOSA}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group mt-3">
                  <label>Cantidad: </label>
                  <input
                    type="number"
                    className="form-control "
                    {...register("cantidad")}
                  >
                  </input>
                </div>

                <div className="form-group mt-3">
                  <label>Precio:</label>
                  <input
                    type="number"
                    className="form-control "
                    {...register("precio")}
                  >
                  </input>
                </div>

                <div className="d-flex justify-content-start">
                  <button
                    type="submit"
                    className="btn btn-success mt-3 me-2"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-3"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mostrar;
