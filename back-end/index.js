const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
require('dotenv').config();
const app = express();
const multer = require('multer');
const path = require('path');
const { productRouter } = require('./router/productRouter');
const { commentRouter } = require('./router/commentRouter');
const port = 3001 
const mongo_url=process.env.DB_CONNECTION_STR;
// middelwares
app.use(cors(
  {
    methods: ['GET', 'POST'], 
    credentials: true
  }
))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// routres
app.use('/product', productRouter)
app.use('/comment', commentRouter)
 

// connection db
mongoose.connect("mongodb://127.0.0.1:27017/hotel")
  .then(() => console.log('Connected!'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.use((req, res, next) => {

  setImmediate(() => {
    next(new Error("Something went wrong"));
  });
});
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});