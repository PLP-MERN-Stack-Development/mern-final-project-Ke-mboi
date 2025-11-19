import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [jobs, setJobs] = useState([])
  const [myBids, setMyBids] = useState([])
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) navigate("/login")

    const fetchData = async () => {
      try {
        const userRes = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { "x-auth-token": token }
        })
        setUser(userRes.data)

        const jobsRes = await axios.get("http://localhost:5000/api/jobs", {
          headers: { "x-auth-token": token }
        })
        setJobs(jobsRes.data)

        if (userRes.data.role === "fundi") {
          const bidsRes = await axios.get("http://localhost:5000/api/jobs/my-bids", {  // ← FIXED URL
            headers: { "x-auth-token": token }
          })
          setMyBids(bidsRes.data)
        }
      } catch (err) {
        console.error("Dashboard load error:", err)
      }
    }
    fetchData()
  }, [token, navigate])

  if (!user) return <div className="container"><div className="card">Loading...</div></div>

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "900px" }}>
        <h1 className="title">Welcome back, {user.name.split(" ")[0]}</h1>
        <p className="subtitle">{user.role === "client" ? "Your posted jobs" : "Jobs you've bid on"}</p>

        {user.role === "client" ? (
          <div>
            {jobs.filter(j => j.postedBy._id === user._id).length === 0 ? (
              <p>No jobs posted yet. <a href="/post-job" style={{ color: "#7c3aed" }}>Post one!</a></p>
            ) : (
              jobs.filter(j => j.postedBy._id === user._id).map(job => (
                <div key={job._id} className="border rounded-lg p-6 my-4 bg-gray-50">
                  <h3 className="text-2xl font-bold">{job.title}</h3>
                  <p>{job.description}</p>
                  <p><strong>Budget:</strong> KSh {job.budget} • {job.location}</p>
                  <p className="text-sm text-gray-600 mt-2">{job.bids?.length || 0} bids</p>
                  <button onClick={() => navigate(`/job/${job._id}`)} className="btn-primary mt-3">
                    View Bids
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Bids</h2>
            {myBids.length === 0 ? (
              <p>No bids yet. <a href="/jobs" style={{ color: "#7c3aed" }}>Browse jobs!</a></p>
            ) : (
              myBids.map(job => (
                <div key={job._id} className="border rounded-lg p-6 my-4 bg-gray-50">
                  <h3 className="text-2xl font-bold">{job.title}</h3>
                  <p>{job.description}</p>
                  <p><strong>Your bid:</strong> KSh {job.bids.find(b => b.fundi._id === user._id)?.amount}</p>
                  <button onClick={() => navigate(`/job/${job._id}`)} className="btn-primary mt-3">
                    View Job
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        <button
          onClick={() => {
            localStorage.removeItem("token")
            navigate("/login")
          }}
          className="btn-primary mt-8"
          style={{ background: "linear-gradient(to right, #ef4444, #f87171)" }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard