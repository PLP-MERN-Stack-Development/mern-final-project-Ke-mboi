import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const PostJob = () => {
  const [form, setForm] = useState({
    title: "", description: "", budget: "", location: ""
  })
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  if (!token) {
    navigate("/login")
    return null
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/api/jobs", form, {
        headers: { "x-auth-token": token }  // ← THIS LINE FIXES IT
      })
      setMsg("Job posted successfully!")
      setTimeout(() => navigate("/jobs"), 1500)
    } catch (err) {
      setMsg("Failed to post job")
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Post a Job</h1>
        <p className="subtitle">Hire a trusted fundi today</p>

        <form onSubmit={handleSubmit}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title (e.g. Fix leaking roof)" required />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the job..."
            rows="5"
            style={{ width: "100%", padding: "16px", margin: "10px 0", borderRadius: "12px", border: "2px solid #e5e7eb" }}
            required
          />
          <input name="budget" type="number" value={form.budget} onChange={handleChange} placeholder="Budget (KSh)" required />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location (e.g. Ngong Road)" required />

          <button type="submit" className="btn-primary">Post Job</button>
        </form>
        {msg && <p className={msg.includes("success") ? "success" : "error"}>{msg}</p>}
      </div>
    </div>
  )
}

export default PostJob