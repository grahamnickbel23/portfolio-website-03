// ./models/categoryModel.js
import mongoose from "mongoose";

const categoryModel = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true,
    }
});

export default mongoose.model("Category", categoryModel);
