# JuaKali Connect — Kenya's Full-Stack Fundi Marketplace

**Live Demo:** https://juakali-connect.vercel.app/  
**Backend API:** https://juakali-backend.onrender.com  

VIDEO DEMONSTRATION LINKS.

https://drive.google.com/file/d/1wKWk_r3R7XdAMH0fVDer4pwUJcVCJbb8/view?usp=sharing    **client**
https://drive.google.com/file/d/1J_6w3IpeDbniOUN7Gk-tKrdu5Crq-Ult/view?usp=sharing    **Fundi**

---

### Project Overview
JuaKali Connect is a full-stack MERN (MongoDB, Express, React, Node.js) marketplace that connects clients who need repair/handyman services with skilled fundis (artisans) in Kenya.

- Clients post jobs with title, description, budget, and location
- Fundis browse jobs and place bids with amount and message
- Clients review bids and accept the best one
- Winner is clearly shown with a green banner
- Role-based system: Client vs Fundi accounts

---

### Features Implemented
- User registration & login (with JWT authentication)
- Role-based dashboards (Client sees "Post Job", Fundi sees "My Bids")
- Post new jobs
- View all available jobs
- Place bids on jobs
- Accept bid (client only) → marks winner
- Beautiful responsive UI with custom background image
- Success/error messages
- Protected routes

---

### Tech Stack
| Layer        | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React 18 + Vite + Tailwind CSS      |
| Backend     | Node.js + Express.js                |
| Database    | MongoDB Atlas (cloud)               |
| Auth        | JWT tokens + localStorage           |
| Deployment  | Netlify (frontend) + Render (backend) |
| CI/CD       | Netlify auto-deploy on GitHub push  |

---

### Live URLs
- **Frontend (Netlify):** https://juakali-connect-yourname.netlify.app
- **Backend (Render):** https://juakali-backend.onrender.com
- **API Test:** `GET https://juakali-backend.onrender.com/api/jobs` → returns all jobs

---

### Deployment & CI/CD
- **Frontend:** Deployed on Netlify with automatic builds on every GitHub push
- **Backend:** Deployed on Render (free tier) with MongoDB Atlas
- **Environment Variables Used:**
  - `VITE_API_URL` → points to live Render backend
  - `MONGO_URI` & `JWT_SECRET` → securely stored in Render dashboard

Every push to `main` branch triggers automatic redeploy — true CI/CD!

---

### Screenshots
![Login Page](screenshots/login.png)
![Client Dashboard](screenshots/client-dashboard.png)
![Post Job](screenshots/post-job.png)
![Job Details + Bids](screenshots/job-bids.png)
![Bid Accepted - Winner](screenshots/winner.png)

*(Add your actual screenshots in a `screenshots/` folder)*

---

### How to Run Locally
```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
