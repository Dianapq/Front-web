import { useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useTenant } from "../context/TenantContext"
import api from "../services/api"

export default function Login() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { loginAdmin } = useContext(AuthContext)
  const { saveTenant } = useTenant()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [mostrarModal, setMostrarModal] = useState(false)

  const [form, setForm] = useState({
    nombre: "", cedula: "", celular: "",
    direccion: "", email: "", password: "", rol: "COBRADOR"
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    try {
      // Guarda el tenant antes del login para que api.js inyecte el slug
      saveTenant({ slug })
      await loginAdmin(email.trim(), password, slug)
      navigate(`/offices/${slug}/clientes`)
    } catch (err) {
      setError("Credenciales incorrectas")
    }
  }

  const handleCrearUsuario = async (e) => {
    e.preventDefault()
    try {
      await api.post("/users", form)
      alert("Usuario creado correctamente")
      setMostrarModal(false)
    } catch (err) {
      alert("Error creando usuario")
    }
  }

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ textAlign: "center", color: "#2f386b" }}>Panel Administrativo</h2>
        <p style={{ textAlign: "center", color: "#888", fontSize: 13, margin: 0 }}>
          Oficina: <strong>{slug}</strong>
        </p>

        {error && <p style={errorStyle}>{error}</p>}

        <form onSubmit={handleLogin} style={formStyle}>
          <input
            style={input} type="email" placeholder="Correo"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={input} type="password" placeholder="Contraseña"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <button style={buttonPrimary} type="submit">Ingresar</button>
        </form>

        <button style={buttonSecondary} onClick={() => setMostrarModal(true)}>
          Crear Usuario
        </button>
      </div>

      {mostrarModal && (
        <div style={overlay}>
          <div style={modal}>
            <h3 style={{ textAlign: "center" }}>Nuevo Usuario</h3>
            <form onSubmit={handleCrearUsuario} style={formStyle}>
              <input style={input} placeholder="Nombre"
                onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
              <input style={input} placeholder="Cédula"
                onChange={(e) => setForm({ ...form, cedula: e.target.value })} />
              <input style={input} placeholder="Celular"
                onChange={(e) => setForm({ ...form, celular: e.target.value })} />
              <input style={input} placeholder="Dirección"
                onChange={(e) => setForm({ ...form, direccion: e.target.value })} />
              <input style={input} placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input style={input} type="password" placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <select style={input} onChange={(e) => setForm({ ...form, rol: e.target.value })}>
                <option value="COBRADOR">COBRADOR</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              <button style={buttonPrimary} type="submit">Guardar</button>
              <button style={buttonDanger} type="button" onClick={() => setMostrarModal(false)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const container = { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#2f386bff" }
const card = { backgroundColor: "white", padding: 40, borderRadius: 12, width: 350, boxShadow: "0 10px 30px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", gap: 15 }
const formStyle = { display: "flex", flexDirection: "column", gap: 10 }
const input = { padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 14 }
const buttonPrimary = { padding: 10, borderRadius: 6, border: "none", backgroundColor: "#565bbaff", color: "white", fontWeight: "bold", cursor: "pointer" }
const buttonSecondary = { padding: 10, borderRadius: 6, border: "none", backgroundColor: "#7a62a9ff", color: "white", cursor: "pointer" }
const buttonDanger = { padding: 10, borderRadius: 6, border: "none", backgroundColor: "#878ed9ff", color: "white", cursor: "pointer" }
const errorStyle = { color: "red", textAlign: "center" }
const overlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }
const modal = { backgroundColor: "white", padding: 30, borderRadius: 10, width: 400, display: "flex", flexDirection: "column", gap: 10, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }