const express = require('express')
const app = express()
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')
const cors = require('cors');
const path = require('path');

// import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

dotenv.config()

// connect to db  => STEP 2 deployment
mongoose.connect(process.env.MONGODB_URI || process.env.DB_CONNECT,
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


// step3: deployment
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('../frontend/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/frontend/build/index.html')) //relative path
    })
}



const PORT = process.env.PORT || 8000 // step 1 deployment
app.listen(PORT, ()=> console.log('Server running on port 8000'.bgMagenta))