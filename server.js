const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config()

//Import Routes
const authRoute = require('./routes/auth')
const datesRoute = require('./routes/dates')
const notesRoute = require('./routes/notes')
const plansRoute = require('./routes/plans')

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
app.use('/api/date', datesRoute)
app.use('/api/note', notesRoute)
app.use('/api/plan', plansRoute)

app.listen(3001, () => console.log('Server is running!!!'))