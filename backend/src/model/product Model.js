import mongoose from "mongoose";

const productAdminSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: 'consumabels'
    },
    brand: {
        type: String,
    },
    // adding this to track the seller who posted the product
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'sellerAuth'
    },
    buyers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userAuth'
    }]
});

export default mongoose.model('Product', productAdminSchema);
