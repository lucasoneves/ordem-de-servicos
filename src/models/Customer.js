import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  title: {
    type: String,
    required: [true, "O nome do cliente é obrigatório"]
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
      required: [true, "O email do cliente é obrigatório"]
    },
    phone: {
      type: String,
      required: [true, "O telefone do cliente é obrigatório"]
    }
  }
}, { versionKey: false})

const customer = mongoose.model('customers', customerSchema)

export {
  customer, customerSchema
};