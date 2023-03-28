import mongoose  from "mongoose";


// const connection = mongoose.createConnection("mongodb+srv://chowdeswari:chow123@cluster0.extegca.mongodb.net/?retryWrites=true&w=majority")

const UserSchema = mongoose.Schema({
    name:{
        type:'String',
        required:true
    },
    email:{
        type:'String',
        required:true,
        unique:true
    },
    password:{
        type:'String',
        required:true
    },
    picturePath:{
        type:'String',
        required:true
    }
},{timestamps:true})


export default mongoose.model('User', UserSchema)
