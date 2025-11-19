import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const JobDetails = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [bidAmount, setBidAmount] = useState("")
  const [message, setMessage] = useState("")
  const [msg, setMsg] = useState("")
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [userRes, jobRes] = await Promise.all([
          axios.get("http://localhost:5000/api/auth/me", { headers: { "x-auth-token": token } }),
          axios.get(`http://localhost:5000/api/jobs/${id}`, { headers: { "x-auth-token": token } })
        ])
        setCurrentUser(userRes.data)
        setJob(jobRes.data)
      } catch (err) {
        setMsg("Failed to load job")
      }
    }
    load()
  }, [id, token])

  const handleBid = async (e) => {
    e.preventDefault()
    setMsg("")

    const amount = Number(bidAmount)
    if (!amount || amount <= 0) {
      setMsg("Please enter a valid amount")
      return
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/jobs/${id}/bids`,
        { amount, message: message.trim() },
        { headers: { "x-auth-token": token } }
      )
      setJob(res.data)
      setMsg("Bid placed successfully!")
      setBidAmount("")
      setMessage("")
    } catch (err) {
      setMsg(err.response?.data?.msg || "Failed to place bid")
    }
  }

  const acceptBid = async (fundiId) => {
    setMsg("Accepting bid...")
    try {
      const res = await axios.post(
        `http://localhost:5000/api/jobs/${id}/accept`,
        { fundiId },
        { headers: { "x-auth-token": token } }
      )
      setJob(res.data)
      setMsg("Bid accepted! Job awarded")
    } catch (err) {
      setMsg(err.response?.data?.msg || "Failed to accept bid")
    }
  }

  if (!job || !currentUser) return <div className="container"><div className="card">Loading...</div></div>

  const isOwner = currentUser._id === job.postedBy._id

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "900px" }}>
        <h1 className="title">{job.title}</h1>
        <p className="subtitle">Posted by {job.postedBy?.name}</p>

        <div className="p-6 bg-gray-50 rounded-xl my-6">
          <p className="text-lg mb-4">{job.description}</p>
          <p><strong>Budget:</strong> KSh {job.budget} • <strong>Location:</strong> {job.location}</p>
          {job.acceptedBid && (
            <div className="mt-6 p-6 bg-green-100 border-4 border-green-600 rounded-2xl text-center">
              <p className="text-3xl font-bold text-green-800">
                JOB AWARDED TO: {job.acceptedBid.name}
              </p>
            </div>
          )}
        </div>

        {/* BIDS LIST */}
        {job.bids?.length > 0 && (
          <div className="my-10">
            <h3 className="text-3xl font-bold mb-8 text-purple-800">Bids ({job.bids.length})</h3>
            {job.bids.map((bid) => (
              <div key={bid._id} className="border-4 border-purple-300 rounded-3xl p-8 mb-8 bg-gradient-to-r from-purple-50 to-pink-50 shadow-xl flex justify-between items-center">
                <div>
                  <p className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    KSh {bid.amount.toLocaleString()}
                  </p>
                  <p className="text-2xl font-bold mt-3">by {bid.fundi?.name}</p>
                  {bid.message && <p className="text-gray-700 italic text-lg mt-3">"{bid.message}"</p>}
                  {job.acceptedBid?._id === bid.fundi._id && (
                    <div className="mt-5 inline-block px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-3xl font-bold rounded-full shadow-2xl animate-pulse">
                      WINNER
                    </div>
                  )}
                </div>

                {/* GORGEOUS ACCEPT BUTTON */}
                {isOwner && !job.acceptedBid && (
                  <button
                    onClick={() => acceptBid(bid.fundi._id)}
                    className="group relative overflow-hidden bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white font-black text-2xl px-16 py-8 rounded-3xl shadow-2xl transform hover:scale-110 transition-all duration-300"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white opacity-30 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                    <span className="relative z-10 flex items-center gap-4">
                      ACCEPT THIS BID
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 rounded-3xl animate-ping bg-green-400 opacity-75"></span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ORIGINAL CLEAN SUBMIT BID BUTTON — BACK TO PERFECTION */}
        {!isOwner && !job.acceptedBid && (
          <form onSubmit={handleBid} className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-purple-800">Place Your Bid</h3>
            <input
              type="number"
              placeholder="Your bid amount (KSh)"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              required
              className="w-full p-4 mb-4 text-lg border-2 border-purple-400 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            <textarea
              placeholder="Message to client (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full p-4 mb-6 text-lg border-2 border-purple-400 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            <button
              type="submit"
              className="btn-primary w-full text-xl py-4"
              style={{ background: "linear-gradient(to right, #7c3aed, #ec4899)" }}
            >
              Submit Bid
            </button>
          </form>
        )}

        {/* SUCCESS / ERROR MESSAGE */}
        {msg && (
          <div className={`mt-8 p-6 rounded-xl text-center text-xl font-bold ${msg.includes("success") || msg.includes("awarded") ? "bg-green-100 text-green-800 border-2 border-green-600" : "bg-red-100 text-red-800 border-2 border-red-600"}`}>
            {msg}
          </div>
        )}

        <button onClick={() => navigate(-1)} className="mt-8 text-purple-600 hover:underline text-lg">
          ← Back
        </button>
      </div>
    </div>
  )
}

export default JobDetails