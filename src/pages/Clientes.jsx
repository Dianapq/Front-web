import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

export default function Clientes() {

  const navigate = useNavigate()

  const [clientes, setClientes] = useState([])
  const [cobradores, setCobradores] = useState([])

  const [nombre, setNombre] = useState("")
  const [cedula, setCedula] = useState("")
  const [direccion, setDireccion] = useState("")
  const [telefono, setTelefono] = useState("")
  const [cobradorId, setCobradorId] = useState("")

  const obtenerCobradores = async () => {
    try {
      const res = await api.get("/users")
      const soloCobradores = res.data.filter(u => u.rol === "COBRADOR")
      setCobradores(soloCobradores)
    } catch (error) {
      console.error("Error cargando cobradores")
    }
  }

  const obtenerClientes = async () => {
    try {
      const res = await api.get("/clientes")
      setClientes(res.data)
    } catch (error) {
      console.error("Error cargando clientes")
    }
  }

  useEffect(() => {
    obtenerCobradores()
    obtenerClientes()
  }, [])

  const crearCliente = async (e) => {
    e.preventDefault()

    if (!cobradorId) {
      alert("Seleccione un cobrador")
      return
    }

    try {
      await api.post("/clientes", {
        nombre,
        cedula,
        direccion,
        telefono,
        cobrador: cobradorId
      })

      setNombre("")
      setCedula("")
      setDireccion("")
      setTelefono("")

      obtenerClientes()
    } catch (error) {
      console.error("Error creando cliente")
    }
  }

  const cerrarSesion = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div style={{ padding: "20px" }}>

      <div style={{ fontSize: "20px", fontFamily: "Arial",color: "#16283aff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Clientes</h2>

        <button
          onClick={cerrarSesion}
          style={{
            backgroundColor: "#334298ff",
            color: "white",
            border: "none",
            padding: "8px 12px",
            cursor: "pointer"
          }}
        >
          Cerrar sesión
        </button>
      </div>

      <select
        value={cobradorId}
        onChange={(e) => setCobradorId(e.target.value)}
      >
        <option value="">Seleccionar cobrador</option>
        {cobradores.map(c => (
          <option key={c._id} value={c._id}>
            {c.nombre}
          </option>
        ))}
      </select>

      <form onSubmit={crearCliente}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          placeholder="Cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        />

        <input
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />

        <input
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        <button type="submit">Crear Cliente</button>
      </form>

      <hr />

      <ul>
        {clientes.map(c => (
          <li key={c._id}>
            {c.nombre} - {c.direccion}
            {c.cobrador && ` (Cobrador: ${c.cobrador.nombre})`}
          </li>
        ))}
      </ul>

    </div>
  )
}