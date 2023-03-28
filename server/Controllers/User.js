import bcrypt, { hash } from 'bcrypt'
// import { JsonWebTokenError } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
 import User from '../models/User.js'
export const  Register = async(req,res,next)=>{
    try{

    //   const {name,email,password,picturePath} = req.body 
    //   const salt = await bcrypt.genSalt() 
    //   const hashedPasseword =await bcrypt.hash(password, salt) 
    // //   return res.send(hashedPasseword)
    
    //   const user = new User({name,email,password:hashedPasseword,picturePath})  

    //   const savedUser = await user.save() 
    //   return res.status(201).json({user:savedUser})
    const {name,email,password,picturePath} = req.body 
    const salt = await bcrypt.genSalt() 
    const hashedPasseword  = await bcrypt.hash(password,salt) 
    const user  = new User({name,email,password:hashedPasseword,picturePath}) 
    const savedUser = await user.save() 
    return res.status(201).json({user:savedUser})

    }
    catch(err){
        next(err)
    }
}

export const  Login = async(req,res,next)=>{
    try{
        // const {email,password} =req.body 
        // const isUser = await User.findOne({email}) 
        // if(!isUser){
        //     return res.status(404).json("User is not Found")
        // }
        // const matchedUser = await bcrypt.compare(password,isUser.password)
        // if(!matchedUser){
        //     return res.status(404).json("Wrong Credentials")
        // }
        // const token  =jwt.sign({id:isUser._id},process.env.SECREAT_KEY) 
        // return res.status(201).cookie('token',{token},{httpOnly:true}).json({user:isUser})

        const {email,password} = req.body 
        const isUser = await User.findOne({email}) 
        if(!isUser){
            return res.status(404).json("User is not found")
        }
        const matchedUser  = await bcrypt.compare(password,isUser.password)
        if(!matchedUser){
            return res.status(401).json("Wrong Credentials")
        }
        const token = jwt.sign({id:isUser._id},process.env.SECREAT_KEY) 

        console.log(token)
        
        if(isUser){
            const {password,...userRes}  = isUser._doc
            return res.status(201).cookie('token',{token},{httpOnly:true}).json({user:userRes})

        }
       

    }
    catch(err){
        next(err)
        
    }
}
