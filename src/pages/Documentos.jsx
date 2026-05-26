import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import api from "../services/api"

export default function Documentos() {
  const { slug } = useParams()
  const [archivo, setArchivo] = useState(null)
  const [mensaje, setMensaje] = useState("")
  const [cargando, setCargando] = useState(false)
  const [docs, setDocs] = useState([])

  useEffect(() => {
    cargarDocs()
  }, [])

  const cargarDocs = async () => {
    try {
      const res = await api.get("/documentos")
      setDocs(res.data)
    } catch {}
  }

  const subirPDF = async (e) => {
    e.preventDefault()
    if (!archivo) return alert("Selecciona un archivo PDF")

    setCargando(true)
    setMensaje("")

    try {
      const formData = new FormData()
      formData.append("file", archivo)
      formData.append("oficina", slug)

      const res = await api.post("/documentos/subir", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      setMensaje(`✅ ${res.data.filename} subido — ${res.data.chunks} secciones indexadas`)
      setArchivo(null)
      cargarDocs()
    } catch {
      setMensaje("❌ Error subiendo el PDF")
    } finally {
      setCargando(false)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>📄 Documentos</h2>
      <p style={{ color: "#555", fontSize: 14 }}>
        Sube documentos PDF para que los cobradores puedan consultarlos desde Telegram.
      </p>

      <form onSubmit={subirPDF} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setArchivo(e.target.files[0])}
          style={{ padding: 6 }}
        />
        <button
          type="submit"
          disabled={cargando}
          style={{ padding: "8px 16px", backgroundColor: "#565bba", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}
        >
          {cargando ? "Subiendo..." : "Subir PDF"}
        </button>
      </form>

      {mensaje && <p style={{ color: mensaje.startsWith("✅") ? "green" : "red" }}>{mensaje}</p>}

      <hr />
      <h3>Documentos subidos</h3>
      {docs.length === 0 ? (
        <p style={{ color: "#888" }}>No hay documentos aún.</p>
      ) : (
        <ul>
          {[...new Map(docs.map(d => [d.filename, d])).values()].map(d => (
            <li key={d._id}>
              📄 <b>{d.filename}</b> — {new Date(d.fechaSubida).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}