import { Routes, Route } from 'react-router-dom';
import Ingresar from './Components/Producto/Ingresar/Ingresar.jsx';
import Mostrar from './Components/Producto/Mostrar/Mostrar.jsx';
import IngresarCliente from './Components/Cliente/Ingresar/Ingresar.jsx';
import MostrarCliente from './Components/Cliente/Mostrar/Mostrar.jsx';
import Salida from './Components/Salida/Salida.jsx'
import MostrarSalida from './Components/Salida/Mostrar.jsx';
import Index from './Components/Dashboard/Index.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/create-product" element={<Ingresar />} />
        <Route path="/view-product" element={<Mostrar />} />
        <Route path="/create-client" element={<IngresarCliente />} />
        <Route path="/view-client" element={<MostrarCliente />} />
        <Route path="/output-product" element={<Salida />} />
        <Route path="/view-output-product" element={<MostrarSalida />} />
      </Routes>
    </div>
  );
}

export default App;
