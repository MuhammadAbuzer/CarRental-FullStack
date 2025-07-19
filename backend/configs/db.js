import mongoose from "mongoose";

const connectingDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("connected to db successfully");
    });
  } catch (error) {
    console.log(`Error connecting db${error}`);
  }
};

export default connectingDb;
