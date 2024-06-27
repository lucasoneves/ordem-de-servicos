import mongoose from "mongoose";

async function connectToDatabase() {
  mongoose.connect('mongodb+srv://casluhc:j%40ck855sow577@cluster0.ufftdvu.mongodb.net/orders?retryWrites=true&w=majority&appName=Cluster0');
  return mongoose.connection;
}

export default connectToDatabase;

