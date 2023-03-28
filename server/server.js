
import express from 'express' 

import mongoose   from 'mongoose' 

import dotenv from 'dotenv' 
import cookieParser from 'cookie-parser'

import cors from 'cors' 
import multer  from 'multer' 

import {fileURLToPath} from 'url' 
import path from 'path'

import UserRoute from './Routes/User.js'
import TaskRoute from './Routes/Task.js'

import { Register } from './Controllers/User.js'


// import TaskRoute from './Routes/Task..js'
 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
 
const app = express() 
app.use(express.json()) 
app.use(cors()) 
app.use(cookieParser()) 

app.use('/assets',express.static(path.join(__dirname,'public/assets')))

const storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb( null,'public/assets')
    },filename:function(req,file,cb){
        const picturePath  = new Date().toISOString().replace(/:/g,'-')+file.originalname
        req.body.picturePath = picturePath 
        cb(null,'public/assets')
    }
})
const upload = multer({storage})

app.use('/auth/register',upload.single('picture'),Register)
// app.use('/title')
app.use('/auth',UserRoute)
app.use('/task' ,TaskRoute)
dotenv.config() 

app.use((err,req,res,next)=>{
    const status  = err.status || 500
    const message  =err.message || 'Something went Wrong'
    return res.status(status).json({message})
})
mongoose.connect(process.env.MONGO_DB).then(()=>{
    app.listen(process.env.PORT , ()=>{
        console.log(`App is connected to port ${process.env.PORT}`)
    })

}).catch((err)=>{
    console.log(err)
})