import mongoose from "mongoose";

const sellerAuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        requred: true
    },
    username: {
        type: String,
        default: 'Random Seller 2025'
    },
    type: {
        type: String,
        required: true,
        default: 'seller'
    },
    // added to grack sold product
    sold: [
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

export default mongoose.model('sellerAuth', sellerAuthSchema)