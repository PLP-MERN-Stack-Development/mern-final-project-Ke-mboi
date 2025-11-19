const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();
const app = express();

// ALLOW EVERYTHING FIRST
app.use(cors());
app.use(express.json());

// IMPORT ROUTES
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const protect = require('./middleware/auth');

// ROUTES — AUTH FIRST, THEN PROTECTED
app.use('/api/auth', authRoutes);                    // ← register & login (NO protect)
app.use('/api/jobs', protect, jobRoutes);            // ← only jobs protected

// TEST ROUTE
app.get('/', (req, res) => {
  res.send('JuaKali Connect Backend Running!');
});

// CONNECT DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB ERROR:', err));

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));