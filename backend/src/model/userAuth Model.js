import mongoose from 'mongoose'

const userAuthSchema = new mongoose.Schema({
    email:{
        type: String,
        requred: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        requred: true
    },
    username:{
        type:String,
        default:'Random Earth 2025'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('userAuth', userAuthSchema)