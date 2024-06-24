const express = require('express');
const cors = require('cors');
const mongoDB = require('./db');

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
mongoDB();

// Enable CORS for the specific origin
app.use(cors({
  origin: 'https://go-food-self.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials : true
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Handle OPTIONS requests for CORS preflight
app.options('*', cors());

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));
app.use('/api', require('./Routes/MyOrderData'));

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
