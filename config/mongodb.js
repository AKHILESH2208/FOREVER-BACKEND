import mongoose from 'mongoose'

const connectDB=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("DB connected")
    })
    
    mongoose.connection.on('error',(err)=>{
        console.log("DB connection error:", err.message)
    })

    try {
        await mongoose.connect(`${process.env.MONGO_DB_URI}/e-commerce`)
    } catch (error) {
        console.log("Failed to connect to MongoDB:", error.message)
        process.exit(1)
    }
}

export default connectDB;