import { Link } from 'react-router-dom';
function NavBar() {
  return (
    <>
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"> 
            Inventario 
            <img
              src="../../src/assets/inventario-disponible.png"
              alt="Imagen de SalidaProducto"
              style={{ width: '35px', height: '35px', marginBottom: '5px' }}
            /> 
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Inventario</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Producto
                  </a>
                  <ul className="dropdown-menu">
                    <Link className="dropdown-item" to="/create-product">Ingresar</Link>
                    <Link className="dropdown-item" to="/view-product">Mostrar</Link>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Usuario
                  </a>
                  <ul className="dropdown-menu">
                    <Link className="dropdown-item" to="/create-client">Crear</Link>
                    <Link className="dropdown-item" to="/view-client">Mostrar</Link>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Salida
                  </a>
                  <ul className="dropdown-menu">
                    <Link className="dropdown-item" to="/output-product">Generar salida</Link>
                    <Link className="dropdown-item" to="/view-output-product">Mostrar salidas</Link>

                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
