const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRouter = require('./routes/users');
const AuthRouter = require('./routes/auth');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Db conected'))
.catch((err) => {console.log(err)});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req , res) => {
  res.send({ msg:'Server is runing' })
}); 

app.use('/users', UserRouter);
app.use('/auth', AuthRouter);

app.all('*', (req, res) => {
  res.status(404).send({ err:'pagen ot found' });
})

app.listen(process.env.PORT || 8080, () => console.log('server is runing'));