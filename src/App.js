import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListarCliente from "./pages/ListarCliente";
import CadastrarCliente from "./pages/CadastrarCliente";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListarCliente />} />
        <Route path="/novo" element={<CadastrarCliente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
