import mongoose from 'mongoose'

const userAuthSchema = new mongoose.Schema({
    email: {
        type: String,
        requred: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        requred: true
    },
    username: {
        type: String,
        default: 'Random Earth 2025'
    },
    // added an arrey to track all purchased by user
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('userAuth', userAuthSchema)