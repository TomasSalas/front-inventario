import NavBar from "../../NavBar/Nav.jsx"
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'


function MostrarCliente() {

  const { register, handleSubmit, formState: { errors }, setValue , reset} = useForm();
  const [clientes, setClientes] = useState([]);
  const [clientesType, setClientesType] = useState([]);

  const getCliente = async () => {
    const url = 'http://192.168.1.175:3000/viewUser';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { data } = await response.json();
    setClientes(data);
  }

  const tipoUsario = async () => {
    const url = "http://192.168.1.175:3000/viewTypeUser";
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

  const onSubmit = async (editData) => {
    const url = "http://192.168.1.175:3000/updateUser";
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(editData)
    })
    const {error} = await response.json();
    console.log(error);

    if( error === null){
      Swal.fire({
        icon:'success',
        title: 'Cliente editado con éxito',
        showConfirmButton: false,
        timer: 1000
      }).then(()=>{
        reset();
        window.location.reload();
      })
    }
  }

  const handleOpenModal = (rowData) => {
    setValue("id", rowData.ID_USUARIO);
    setValue("nombre", rowData.NOMBRE);
    setValue("apellido", rowData.APELLIDO);
    setValue("email", rowData.EMAIL);
    setValue("idTipoUsuario", rowData.ID_TIPO_USUARIO);

  };

  const deleteClient = async (rowData) => {
    Swal.fire({
      title: 'Seguro que desea eliminar el cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const url = "http://192.168.1.175:3000/deleteUser";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ "id": rowData })
        });
        const { error } = await response.json();
        if (error === null) {
          Swal.fire(
            'Eliminado!',
            'Cliente a sido eliminado.',
            'success'
          ).then(() => {
            getCliente();
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
  }

  useEffect(() => {
    getCliente();
    tipoUsario();
  }, [])
  return (
    <>
      <NavBar />
      <div className="container pt-5">
        <div className="table-responsive pt-5">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NOMBRE COMPLETO</th>
                <th scope="col">EMAIL</th>
                <th scope="col">TIPO USUARIO</th>
                <th scope="col">ACCIONES</th>

              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.ID_USUARIO}>
                  <td>{cliente.ID_USUARIO}</td>
                  <td>{cliente.NOMBRE} {cliente.APELLIDO}</td>
                  <td>{cliente.EMAIL}</td>
                  <td>{cliente.DESC_TIPO_USUARIO}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#modalCliente"
                      onClick={() => handleOpenModal(cliente)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteClient(cliente.ID_USUARIO)}
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


      <div className="modal fade" id="modalCliente" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Editar cliente</h5>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>ID USUARIO:</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    {...register("id")}
                  >
                  </input>
                </div>

                <div className="form-group">
                  <label>NOMBRE:</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("nombre")}
                  >
                  </input>
                </div>

                <div className="form-group">
                  <label>APELLIDO:</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("apellido")}
                  >
                  </input>
                </div>

                <div className="form-group">
                  <label>CORREO:</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("email")}
                  >
                  </input>
                </div>
                <div className="form-group">
                  <label>TIPO USUARIO:</label>
                  <select
                    className="form-control"
                    {...register("idTipoUsuario")}
                  >
                    {clientesType.map((item) => (
                      <option key={item.ID_TIPO_USUARIO} value={item.ID_TIPO_USUARIO}>
                        {item.DESC_TIPO_USUARIO}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex justify-content-start">
                  <button type="submit" className="btn btn-success mt-3 me-2"> Editar </button>
                  <button type="button"className="btn btn-danger mt-3" data-bs-dismiss="modal"> Cerrar </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MostrarCliente;