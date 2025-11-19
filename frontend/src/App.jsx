import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import PostJob from "./pages/PostJob"
import Jobs from "./pages/Jobs"
import Dashboard from "./pages/Dashboard"
import JobDetails from "./pages/JobDetails"

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/job/:id" element={<JobDetails />} /> 
    </Routes>
  )
}

export default App