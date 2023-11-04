import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

export default connectDB

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to the DB"))
//   .catch((err) => console.error(err.message));
