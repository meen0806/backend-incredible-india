import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      const { connection } = await mongoose.connect(process.env.DB_URI);
      console.log(`connected with `, connection.host, connection.port);
    } catch (error) {
      console.log(error);
    }
  };



  