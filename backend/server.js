const express = require('express')
const app = express()
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')
const cors = require('cors');

// import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

dotenv.config()

// connect to db
mongoose.connect(process.env.DB_CONNECT,
{ useUnifiedTopology: true }, 
()=> console.log('Connected to database'.bgCyan))

// middlewares
// body-parser.json() now as express.json()
app.use(express.json())
app.use(cors());

//route middleware
// means /api/user/register is a route
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(8000, ()=> console.log('Server running on port 8000'.bgMagenta))