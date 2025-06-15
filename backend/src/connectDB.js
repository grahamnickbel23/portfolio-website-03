import mongoose from 'mongoose'

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('MongoDB connected successfully!');
    }catch(err){
        console.error('MongoDB Connection Error:', err.message);
        process.exit(1);
    }
}

export default connectDB;