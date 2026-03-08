import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [mostrarModal, setMostrarModal] = useState(false)

  const [form, setForm] = useState({
    nombre: "",
    cedula: "",
    celular: "",
    direccion: "",
    email: "",
    password: "",
    rol: "COBRADOR"
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const res = await api.post("/auth/login-admin", {
        email: email.trim(),
        password
      })

      const { token, user } = res.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      navigate("/clientes")

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
    <div style={{ padding: 20 }}>
      <h2>Login Admin</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Ingresar</button>
      </form>

      <br />

      <button onClick={() => setMostrarModal(true)}>
        Crear Usuario
      </button>

      {mostrarModal && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Nuevo Usuario</h3>

            <form onSubmit={handleCrearUsuario}>
              <input
                placeholder="Nombre"
                onChange={(e) =>
                  setForm({ ...form, nombre: e.target.value })
                }
              />

              <input
                placeholder="Cédula"
                onChange={(e) =>
                  setForm({ ...form, cedula: e.target.value })
                }
              />

              <input
                placeholder="Celular"
                onChange={(e) =>
                  setForm({ ...form, celular: e.target.value })
                }
              />

              <input
                placeholder="Dirección"
                onChange={(e) =>
                  setForm({ ...form, direccion: e.target.value })
                }
              />

              <input
                placeholder="Email"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <select
                onChange={(e) =>
                  setForm({ ...form, rol: e.target.value })
                }
              >
                <option value="COBRADOR">COBRADOR</option>
                <option value="ADMIN">ADMIN</option>
              </select>

              <button type="submit">Guardar</button>
              <button
                type="button"
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

const modal = {
  backgroundColor: "white",
  padding: 20,
  borderRadius: 10,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  width: 400
}