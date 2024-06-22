const express = require('express');
const cors = require('cors'); // Import the cors package
const mongoDB = require('./db');

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://go-food-kqsa1amqg-kartiksaini2410s-projects.vercel.app");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use(express.json())

app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));
app.use('/api', require('./Routes/MyOrderData'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
