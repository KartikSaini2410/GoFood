const express = require('express');
const mongoDB = require('./db');

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "https://nimble-stardust-93d950.netlify.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

// Parse JSON bodies for POST requests
app.use(express.json());

// Routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));
app.use('/api', require('./Routes/MyOrderData'));


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
