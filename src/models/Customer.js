import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  createdAt: {
    type: Date
  },
  title: {
    type: String,
    required: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    addressNumber: {
      type: String,
      required: true
    },
    addressComplement: {
      type: String,
      required: false
    }
  },
  contact: {
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  }
}, { versionKey: false})

const customer = mongoose.model('customers', customerSchema)

export {
  customer, customerSchema
};