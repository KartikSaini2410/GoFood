const express = require('express');
const cors = require('cors');
const mongoDB = require('./db');
const { body, validationResult } = require('express-validator');
const user = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = "MyFirstMernStackWebAplliation_GoFood$";

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

// Root route
app.get('/', (req, res) => {
  res.json('Hello World!');
});

// API routes
// POST request to handle user login
app.post('/loginuser', [
  body('email', 'Incorrect email').isEmail(),
  body('password', 'Incorrect password').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
      let userData = await user.findOne({ email });

      if (!userData) {
          return res.status(400).json({ errors: 'Invalid credentials' });
      }

      const pwdCompare = await bcrypt.compare(password, userData.password);

      if (!pwdCompare) {
          return res.status(400).json({ errors: 'Invalid credentials' });
      }

      const payload = {
          user: {
              id: userData._id
          }
      };

      const authToken = jwt.sign(payload, jwtSecret);

      return res.json({
          success: true,
          authToken: authToken
      });
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
});
// app.use('/api', require('./Routes/CreateUser'));
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
