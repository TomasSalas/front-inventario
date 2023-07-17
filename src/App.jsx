import { Routes, Route } from 'react-router-dom';
import Ingresar from './Components/Producto/Ingresar/Ingresar.jsx';
import Mostrar from './Components/Producto/Mostrar/Mostrar.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Ingresar />} />
        <Route path="/view-product" element={<Mostrar />} />
      </Routes>
    </div>
  );
}

export default App;
