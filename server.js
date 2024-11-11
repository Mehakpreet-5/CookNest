
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const authController = require('./controllers/authController')
const authRoutes = require('./routes/authRoutes')
const payRoute = require('./routes/payRoute')
const Adminrouter = require('./adminPanel/routes/userRoute-A.js')
const AdminOrder = require('./adminPanel/routes/orderRoute-A.js')
const OtpRoute =  require('./routes/otp-route.js')
dotenv.config(); // Load environment variables from .env file

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

app.use('/api', authRoutes); 
app.use('/api', payRoute); 
app.use('/', Adminrouter);
app.use('/', AdminOrder);
app.use('/', OtpRoute);
const corsOption = {
  origin: "http://localhost:5173",
  methods: "GET, POST,PUT,DELETE,PATCH, HEAD",
  credentials : true,
}
app.use(cors(corsOption))
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
