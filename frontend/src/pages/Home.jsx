import { useNavigate } from "react-router-dom"

const Home = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">JuaKali Connect</h1>
        <p className="subtitle">Kenya's #1 platform connecting clients with trusted fundis</p>

        {token ? (
          <div>
            <p className="success text-2xl mb-8">You are logged in</p>

            <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <a href="/post-job">
                <button className="btn-primary" style={{ background: "linear-gradient(to right, #10b981, #34d399)" }}>
                  Post a New Job
                </button>
              </a>

              <a href="/jobs">
                <button className="btn-primary" style={{ background: "linear-gradient(to right, #f59e0b, #fbbf24)" }}>
                  View All Jobs
                </button>
              </a>

              <a href="/dashboard">
                <button className="btn-primary" style={{ background: "linear-gradient(to right, #7c3aed, #ec4899)" }}>
                  My Dashboard
                </button>
              </a>

              <button onClick={handleLogout} className="btn-primary" style={{ background: "linear-gradient(to right, #ef4444, #f87171)" }}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-xl mb-10 text-gray-700">
              Join thousands of clients and fundis across Kenya
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <a href="/register">
                <button className="btn-primary">Create Free Account</button>
              </a>
              <a href="/login">
                <button className="btn-primary" style={{ background: "linear-gradient(to right, #6b7280, #9ca3af)" }}>
                  Login
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home