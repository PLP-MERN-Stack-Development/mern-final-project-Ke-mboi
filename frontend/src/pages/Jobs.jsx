import { useState, useEffect } from "react"
import axios from "axios"

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs", {
          headers: { "x-auth-token": token }  // ← THIS LINE FIXES IT
        })
        setJobs(res.data)
      } catch (err) {
        console.error(err)
        alert("Failed to load jobs — are you logged in?")
      }
    }
    fetchJobs()
  }, [])

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "800px" }}>
        <h1 className="title">Available Jobs</h1>
        <p className="subtitle">Fundis, pick your next gig</p>

        {jobs.length === 0 ? (
          <p className="text-xl">No jobs posted yet</p>
        ) : (
          jobs.map(job => (
            <div key={job._id} style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", margin: "16px 0" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{job.title}</h3>
              <p>{job.description}</p>
              <p><strong>Budget:</strong> KSh {job.budget}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <button className="btn-primary" style={{ width: "auto", marginTop: "10px" }}>
                Place Bid
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Jobs