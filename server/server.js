dotenv.config()
import express from 'express'
import cors from  'cors'
import dotenv from 'dotenv'
import CookieParser from 'cookie-parser'
import databseConnection from "./db/database.js"

const app = express()
const PORT = process.env.PORT || 5000


databseConnection() 

// middlewers
app.use(cors({
    origin : 'http://localhost:5173' ,
    methods :['GET','POST','DELETE','PUT'] ,
    allowedHeaders :[
        "Content-Type",
        'Authorization',
        'Cache-control',
        'Expires',
        'Pragma'],
        credentials: true,

    }))
app.use(express.json())
app.use(CookieParser())


//calling router from routers file
import router from './routers/auth/authRoute.js'

app.use('/api/auth' , router)

// /api/auth/register -> registeruser
// /api/auth/login ->loginuser
app.listen(PORT ,()=>{
    console.log(`Your Server is Running at port ${PORT} `);
    
})