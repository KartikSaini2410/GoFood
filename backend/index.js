
const express = require('express')
const app = express()
const port = 4000
const mongoDB = require('./db')
mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "https://go-food-kqsa1amqg-kartiksaini2410s-projects.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.use(express.json())

app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));
app.use('/api', require('./Routes/MyOrderData'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
