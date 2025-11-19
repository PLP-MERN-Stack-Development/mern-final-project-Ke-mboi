import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "client", skills: "", location: ""
  })
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg("")
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form)
      localStorage.setItem("token", res.data.token)
      setMsg("Account created! Welcome to JuaKali Connect")
      setTimeout(() => navigate("/dashboard"), 2000)
    } catch (err) {
      setMsg(err.response?.data?.msg || "Registration failed. Try again.")
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">JuaKali Connect</h1>
        <p className="subtitle">Create your account — Client or Fundi</p>

        <form onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" required />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password (6+ chars)" required />

          <select name="role" value={form.role} onChange={handleChange}>
            <option value="client">I'm a Client (need a fundi)</option>
            <option value="fundi">I'm a Fundi (looking for jobs)</option>
          </select>

          {form.role === "fundi" && (
            <>
              <input name="skills" value={form.skills} onChange={handleChange} placeholder="Your Skills (e.g. Plumbing, Electrical)" />
              <input name="location" value={form.location} onChange={handleChange} placeholder="Your Location (e.g. Westlands, Nairobi)" />
            </>
          )}

          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "20px" }}>
            Create Account
          </button>
        </form>

        {msg && <p className={msg.includes("created") ? "success" : "error"}>{msg}</p>}

        <p style={{ marginTop: "30px", color: "#666" }}>
          Already have an account? <a href="/login" style={{ color: "#7c3aed", fontWeight: "bold" }}>Login here</a>
        </p>
      </div>
    </div>
  )
}

export default Register