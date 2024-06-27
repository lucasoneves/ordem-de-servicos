import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true
  }
}, { versionKey: false})

const customers = mongoose.model('customers', customerSchema)

export default customers;