import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Clientes from "./pages/Clientes"
import Creditos from "./pages/Creditos"
import Layout from "./components/Layout"   
import CrearUsuario from "./pages/CrearUsuario"
import Cobradores from "./pages/Cobradores"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/crear-usuario" element={<CrearUsuario />} 
        />

        <Route path="/cobradores" element={<Cobradores />} />
        
        <Route
          path="/clientes"
          element={
            <Layout>
              <Clientes />
            </Layout>
          }
        />
        <Route
            path="/creditos"
            element={
              <Layout>
                <Creditos />
              </Layout>
            }
          />
      </Routes>
    </BrowserRouter>
  )
}

export default App

