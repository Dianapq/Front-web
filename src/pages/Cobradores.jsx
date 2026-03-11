import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../services/api"

export default function Cobradores() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [cobradores, setCobradores] = useState([])
  const [clientes, setClientes] = useState([])

  const cargarCobradores = async () => {
    try {
      const res = await api.get("/users")
      const solo = res.data.filter(u => u.rol === "COBRADOR")
      setCobradores(solo)
    } catch (error) {
      console.error("Error cargando cobradores", error)
    }
  }

  const verClientes = async (id) => {
    try {
      const res = await api.get("/clientes/cobrador/" + id)
      setClientes(res.data)
    } catch (error) {
      console.error("Error cargando clientes", error)
    }
  }

  const cambiarEstado = async (id, estado) => {
    try {
      await api.put("/users/habilitar/" + id, { habilitado: estado })
      cargarCobradores()
    } catch (error) {
      console.error("Error cambiando estado", error)
    }
  }

  useEffect(() => {
    cargarCobradores()
  }, [])

  return (
    <div style={{ fontSize: "20px", fontFamily: "Arial", color: "#16283aff" }}>
      <h2>Cobradores</h2>

      <button
        onClick={() => navigate(`/offices/${slug}/clientes`)}  // ← usa slug
        style={{ marginBottom: "20px", padding: "8px 14px", cursor: "pointer" }}
      >
        Volver al inicio
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {cobradores.map(c => (
          <li key={c._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", borderBottom: "1px solid #ddd" }}>
            <span>{c.nombre}</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => verClientes(c._id)} style={{ padding: "6px 10px", cursor: "pointer" }}>
                Ver clientes
              </button>
              {c.habilitado ? (
                <button onClick={() => cambiarEstado(c._id, false)}
                  style={{ padding: "6px 10px", cursor: "pointer", backgroundColor: "#819ed1ff", color: "white", border: "none" }}>
                  Deshabilitar
                </button>
              ) : (
                <button onClick={() => cambiarEstado(c._id, true)}
                  style={{ padding: "6px 10px", cursor: "pointer", backgroundColor: "#3962b2ff", color: "white", border: "none" }}>
                  Habilitar
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <hr style={{ margin: "25px 0" }} />

      <h3>Clientes asignados</h3>
      <ul>
        {clientes.map(cl => (
          <li key={cl._id}>{cl.nombre} - {cl.cedula} - {cl.telefono}</li>
        ))}
      </ul>
    </div>
  )
}