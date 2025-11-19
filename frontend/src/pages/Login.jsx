import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" })
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg("")
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form)
      localStorage.setItem("token", res.data.token)
      setMsg("Welcome back! Taking you to your dashboard...")
      setTimeout(() => navigate("/dashboard"), 1500)
    } catch (err) {
      setMsg(err.response?.data?.msg || "Wrong email or password")
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">JuaKali Connect</h1>
        <p className="subtitle">Login to continue</p>

        <form onSubmit={handleSubmit}>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" required />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />

          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "20px" }}>
            Login Now
          </button>
        </form>

        {msg && <p className={msg.includes("Welcome") ? "success" : "error"}>{msg}</p>}

        <p style={{ marginTop: "30px", color: "#666" }}>
          New here? <a href="/register" style={{ color: "#7c3aed", fontWeight: "bold" }}>Create account</a>
        </p>
      </div>
    </div>
  )
}

export default Login