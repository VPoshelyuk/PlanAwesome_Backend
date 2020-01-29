const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config()

//Import Routes
const authRoute = require('./routes/auth')

//Connect to DB
mongoose.connect(
    process.env.CONNECT_STR,
{   useNewUrlParser: true,
    useUnifiedTopology: true 
},
() => console.log('Connected to DB!')
)

//Middleware
app.use(express.json())

//Route Middlewares
app.use('/api/user', authRoute)

app.listen(3001, () => console.log('Server is running!!!'))