const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const router = express.Router();
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const registerRoute = require('./routes/RegisterRoute')
const loginRoute = require('./routes/loginRoute')
const blogRoute = require('./routes/blogRoute')


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())

const PORT = process.env.PORT
const corsOption = {
    origin :['http://localhost:4200'],
    optionSucessStatus:200
  }
app.use(cors(corsOption))

app.use(express.static(path.join(__dirname, "public")));



  app.use('/blog',blogRoute)
  app.use('/register',registerRoute)
  app.use('/login',loginRoute)


mongoose.connect('mongodb://localhost/fakeusers').then(()=>{
    app.listen(3000,()=>{
        console.log(`Express server is running in port ${PORT}`);
    })
}).catch(err=>{
    console.log('Error conneceting to DB ', err);
})