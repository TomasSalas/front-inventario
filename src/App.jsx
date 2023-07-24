import { Routes, Route } from 'react-router-dom';
import Ingresar from './Components/Producto/Ingresar/Ingresar.jsx';
import Mostrar from './Components/Producto/Mostrar/Mostrar.jsx';
import IngresarCliente from './Components/Cliente/Ingresar/Ingresar.jsx';
import MostrarCliente from './Components/Cliente/Mostrar/Mostrar.jsx';
import Salida from './Components/Salida/Salida.jsx'
import MostrarSalida from './Components/Salida/Mostrar.jsx';
import Index from './Components/Dashboard/Index.jsx';
import Registro from './Components/Producto/Registro/Registro.jsx';
import Login from './Components/Login/Login.jsx';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Index />} />
        <Route path="/create-product" element={<Ingresar />} />
        <Route path="/view-product" element={<Mostrar />} />
        <Route path="/change-history" element={<Registro />} />
        <Route path="/create-client" element={<IngresarCliente />} />
        <Route path="/view-client" element={<MostrarCliente />} />
        <Route path="/output-product" element={<Salida />} />
        <Route path="/view-output-product" element={<MostrarSalida />} />
      </Routes>
    </div>
  );
}

export default App;
