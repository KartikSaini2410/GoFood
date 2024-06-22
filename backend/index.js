const express = require('express');
const cors = require('cors'); // Import the cors package
const mongoDB = require('./db');

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
mongoDB();

// Middleware to enable CORS
app.use(cors({
  origin: 'https://go-food-kqsa1amqg-kartiksaini2410s-projects.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

// Middleware to parse JSON bodies
app.use(express.json());

// API routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));
app.use('/api', require('./Routes/MyOrderData'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
