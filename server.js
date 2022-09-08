const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const router = express.Router();
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const registerRoute = require('./routes/RegisterRoute')
const loginRoute = require('./routes/loginRoute')
const blogRoute = require('./routes/blogRoute')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


const PORT = process.env.PORT
const corsOption = {
    origin :['http://localhost:4200'],
    optionSucessStatus:200
  }
app.use(cors(corsOption))


const authMiddleWare = (req , res , next) => {
  const secretKey = process.env.SECRET_KEY;
  const token = req.header('Authorization') || '';
  if (!token) {
      return res.status(401).json({ message: 'Unauthorized access' });
  }
  const decode = jwt.decode(token, secretKey);
  if (!decode) {
      return res.status(401).json({ message: 'Unauthorized access' });
  }
  req.user = decode;
  console.log("DECODE :",req.user)
  next();
}

  app.use('/blog',authMiddleWare,blogRoute)
  app.use('/register',registerRoute)
  app.use('/login',loginRoute)


mongoose.connect('mongodb://localhost/fakeusers').then(()=>{
    app.listen(3000,()=>{
        console.log(`Express server is running in port ${PORT}`);
    })
}).catch(err=>{
    console.log('Error conneceting to DB ', err);
})