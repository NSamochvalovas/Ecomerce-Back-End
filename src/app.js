const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Db conected"))
.catch((err) => {
  console.log(err);
})


const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req , res) => {
  res.send({ msg:'Server is runing' })
}); 

app.listen(process.env.PORT || 8080, () => console.log('server is runing'));