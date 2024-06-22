const express = require('express');
const cors = require('cors'); // Import the cors package
const mongoDB = require('./db');

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
mongoDB();

// Middleware to set CORS headers
app.use(cors({
  origin: 'https://go-food-kartiksaini2410s-projects.vercel.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));

// Middleware to set Referrer-Policy header
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Parse JSON bodies for POST requests
app.use(express.json());

// Routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));
app.use('/api', require('./Routes/MyOrderData'));

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
